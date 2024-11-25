import { Transaction } from '../models/transaction.js';
import { Cart } from '../models/cart.js';
import { Product } from '../models/product.js';
import jwt from "jsonwebtoken";

export const createTransaction = async (req, res) => {
    try {
        const authToken = req.headers.authorization && req.headers.authorization.split(" ")[1];
        const { id } = jwt.verify(authToken, process.env.SECRET_KEY);
        let { type, value } = req.body;
        if (type === 'compra' || type === 'retiro') {
            value *= -1;
        }
        const transaction = await Transaction.create({
            type,
            value,
            user: id
        });
        return res.status(200).json({ transaction });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error de server" });
    }
};

export const getTransactionByUser = async (req, res) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        const alltransactions = await Transaction.find({ user: id }).lean();
        return res.status(200).json({ alltransactions });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error de server" });
    }
};

// ---------------Cart controllers----------------------
export const addToCart = async (req, res) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        const { productId, quantity } = req.body;

        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ user: id });

        if (cart) {
            // Update existing cart
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (productIndex > -1) {
                const newQuantity = cart.products[productIndex].quantity + quantity;
                if (newQuantity > product.stock) {
                    return res.status(400).json({ message: 'Quantity exceeds stock' });
                }
                cart.products[productIndex].quantity = newQuantity;
            } else {
                if (quantity > product.stock) {
                    return res.status(400).json({ message: 'Quantity exceeds stock' });
                }
                cart.products.push({ product: productId, quantity });
            }
        } else {
            // Create new cart
            if (quantity > product.stock) {
                return res.status(400).json({ message: 'Quantity exceeds stock' });
            }
            cart = new Cart({
                user: id,
                products: [{ product: productId, quantity }]
            });
        }

        // Populate products to access prices and calculate total
        await cart.populate('products.product');
        cart.calculateTotal();

        // Save the cart with the updated total
        await cart.save();

        return res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getCartDetails = async (req, res) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        const cart = await Cart.findOne({ user: id }).populate('products.product').lean();

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartDetails = cart.products.map(item => ({
            productId: item.product._id,
            name: item.product.name,
            price: item.product.price,
            image: item.product.image,
            quantity: item.quantity
        }));

        return res.status(200).json({ cartDetails });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        const { productId } = req.body;

        let cart = await Cart.findOne({ user: id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);
        } else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Calculate total price
        const productPromises = cart.products.map(async item => {
            const product = await Product.findById(item.product);
            return product.price * item.quantity;
        });

        const productPrices = await Promise.all(productPromises);
        cart.total = productPrices.reduce((acc, price) => acc + price, 0);

        await cart.save();

        return res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const clearCart = async (req, res) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        const { id } = jwt.verify(token, process.env.SECRET_KEY);

        let cart = await Cart.findOne({ user: id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.products = [];
        cart.total = 0;
        await cart.save();

        return res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Check user credits before proceeding with the purchase
export const checkoutWithCredits = async (req, res) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        const cart = await Cart.findOne({ user: id }).populate('products.product');

        if (!cart) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        // Calculate total price
        cart.total = cart.products.reduce((acc, item) => {
            return acc + (item.product.price * item.quantity);
        }, 0);

        // Check user credits
        const user = await user.findById(id);
        if (user.credits < cart.total) {
            return res.status(400).json({ message: 'Not enough credits for this purchase' });
        }

        // Deduct credits from user
        user.credits -= cart.total;
        await user.save();

        // Create a transaction
        const transaction = await Transaction.create({
            type: 'purchase',
            value: cart.total,
            user: id,
            products: cart.products
        });

        // Clear the cart
        cart.products = [];
        cart.total = 0;
        await cart.save();

        return res.status(200).json({ message: 'Purchase completed', transaction });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    total: {
        type: Number,
        required: true,
        default: 0.0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

cartSchema.pre('save', async function(next) {
    const populatedCart = await this.populate('products.product');
    this.total = populatedCart.products.reduce((acc, item) => acc + (item.quantity * item.product.price), 0);
    this.updatedAt = Date.now();
    next();
});

cartSchema.methods.calculateTotal = function() {
    this.total = this.products.reduce((acc, item) => {
        // Verificamos si el precio está disponible (producto poblado)
        if (item.product.price) {
            return acc + (item.quantity * item.product.price);
        }
        return acc;
    }, 0);
    return this.total;
};


export const Cart = model("Cart", cartSchema);
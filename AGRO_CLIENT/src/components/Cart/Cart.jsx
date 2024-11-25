import React, { useEffect, useState } from 'react';
import {tokenRefresh} from '../../helpers/tokenRefresh';

// Función para obtener el token, similar a tu ejemplo
const getToken = async () => {
  const restoken = await tokenRefresh();
  return restoken ? restoken : localStorage.getItem('token');
};

export const Cart = () => {
  const [cart, setCart] = useState(null);

  // Obtener la información del carrito desde la API con token
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = await getToken(); // Obtener el token
        const response = await fetch(`${import.meta.env.VITE_AGRO_API}transactions/cart`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Error al obtener el carrito');
        }

        const data = await response.json();
        setCart(data.cart);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCart();
  }, []);

  if (!cart) {
    return <div>Cargando...</div>; // Opcional, para mostrar un estado de carga
  }

  return (
    <div className="font-sans md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
          <h2 className="text-2xl font-bold text-gray-800">Carrito</h2>
          <hr className="border-gray-300 mt-4 mb-8" />

          <div className="space-y-4">
            {cart.products.map((item) => (
              <div key={item._id} className="grid grid-cols-3 items-center gap-4">
                <div className="col-span-2 flex items-center gap-4">
                  <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                    <img src={item.img} className="w-full h-full object-contain" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-800">Nombre del Producto</h3>
                    <div className="flex gap-4 mt-4">
                      <div>
                        <button
                          type="button"
                          className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 124 124">
                            <path
                              d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                            ></path>
                          </svg>

                          <span className="mx-2.5">{item.quantity}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 42 42">
                            <path
                              d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-auto">
                  <h4 className="text-base font-bold text-gray-800">${item.productPrice}</h4>
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="flex justify-between mt-8">
              <span className="text-base font-bold">Total</span>
              <span className="text-base font-bold">${cart.total}</span>
            </div>
          </div>
        </div>

        {/* Resumen de la compra */}
        <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
          <ul className="text-gray-800 mt-8 space-y-4">
            <li className="flex flex-wrap gap-4 text-base">
              Discount <span className="ml-auto font-bold">$0.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base">
              Shipping <span className="ml-auto font-bold">$2.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base">
              Tax <span className="ml-auto font-bold">$0.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base font-bold">
              Total <span className="ml-auto">${cart.total + 2}</span>
            </li>
          </ul>

          <div className="mt-8 space-y-2">
            <button
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

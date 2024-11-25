import {Request} from './validate';
import {tokenRefresh} from './tokenRefresh';
import Swal from 'sweetalert2';

export const getProduct = async () => {
    const uri = import.meta.env.VITE_AGRO_API;
    const LastPath = window.location.pathname.split('/').pop();
    const config = {
        method: 'GET',
        url: `${uri}products/${LastPath}`,
    }
    const response = await Request(config);
    if (response) {
        return response.data;
    }
};

export const buyproduct = async (product) => {
    const restoken = await tokenRefresh();

    const uri = import.meta.env.VITE_AGRO_API;
    const data = JSON.stringify({
        productId: product._id,
        quantity: 1
    });
    const config = {
        method: 'POST',
        url: `${uri}transactions/cart/add`,
        headers: {
            authorization: `Bearer ${restoken ? restoken : localStorage.getItem('token')}`,
        },
        data: data
    }
    const response = await Request(config);

    if (response.status === 200){
        const modal = await Swal.fire({
            title: 'Compra exitosa',
            text: 'El producto se ha comprado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
    }
};

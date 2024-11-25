import './pView.style.css';
import {useState, useEffect} from 'react';
import {getProduct, buyproduct} from '../../helpers/pView';

const productView = ({...props }) => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    getProduct().then((res) => {
      setProduct(res.product);
    });
  }, []);
  return (
    <div className='font-sans' {...props}>
      <div className='p-4 lg:max-w-5xl max-w-lg mx-auto'>
        <div className='grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12'>
          <div className='w-full lg:sticky top-0 sm:flex gap-2'>
            <img src={product.image} alt={product.name} className='w-4/5 rounded-md object-cover'/>
          </div>
          <div>
            <h2 className='text-2xl font-bold text-gray-800'>{product.name}</h2>
            <div className='flex flex-wrap gap-4 mt-4'>
              <p className='text-gray-800 text-xl font-bold'>${product.price}</p>
            </div>
            <p className='text-gray-800 text-xl font-bold'>{product.category?.name}</p>
            <p className='text-gray-800 text-xl font-bold'>{product.measureUnit?.name} {product.quantity}</p>
            <div class="flex space-x-2 mt-4">
                <svg class="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg class="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg class="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg class="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg class="w-5 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
            </div>
            <button className='w-full mt-8 px-6 py-3 bg-primary-color hover:bg-primary-alt text-white text-sm font-semibold rounded-md' onClick={() => buyproduct(product)}>agregar al carrito</button>
            <div className='mt-8'>
              <h3 className='text-xl font-bold text-gray-800'>Acerca del producto:</h3>
              <p className='text-gray-800 text-xl font-bold'>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='product-info'>
      </div>
    </div>
  )
};//✅

export default productView;
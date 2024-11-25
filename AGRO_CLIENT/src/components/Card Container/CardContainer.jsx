import './CardContainer.style.css';
import { useOutletContext } from 'react-router-dom';
import { getFeed } from '../../helpers/feed'
import { useState, useEffect } from "react";
import Card from "../card/card";

//✅
const CardContainer = ({ hookNavigate, typeref }) => {
    const [products, setProducts] = useState([]);
    const [contextValue, setContextValue] = useOutletContext();
    useEffect(() => {
        getFeed(typeref, contextValue).then((res) => {
            res.products.reverse();
            setProducts(res.products);
        });
    }, [typeref]);
    return (
        <div className="font-[sans-serif] bg-gray-100 max-h-[calc(100vh-50px)] overflow-y-auto">
            <div className='p-4 mx-auto lg:max-w-7xl sm:max-w-full'>
                <h2 className='text-4xl font-extrabold text-gray-800 mb-12'> productos a la venta</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
                    {products?.map((product) => (
                        <Card card={product} key={product._id} owner={(typeref === 'user')} hookNavigate={hookNavigate} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardContainer;
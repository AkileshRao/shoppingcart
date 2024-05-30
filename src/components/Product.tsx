import { useState } from 'react';
import { addToCart } from '../utils/featureUtils'
import { CartProductType } from './Cart'
import type { ProductType } from './ProductList'

const Product = ({ product, handleAddToCartCallback }: { product: CartProductType, handleAddToCartCallback: (product: CartProductType) => void }) => {
    return (
        <div className='bg-white p-2 rounded'>
            <img src={product?.thumbnail} alt="" className='border-b-2 mb-2 w-full' />
            <div className='flex justify-between items-center'>
                <div>
                    <p>{product?.title}</p>
                    <p className='font-bold'>{product?.price}</p>
                </div>

                <button className='bg-blue-700 text-white p-2 rounded' onClick={() => handleAddToCartCallback(product!)}>Add to cart</button>
            </div>
        </div>
    )
}

export default Product
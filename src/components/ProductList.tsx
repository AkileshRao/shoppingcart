import React from 'react'
import Product from './Product'
import { CartProductType } from './Cart';

export type ProductType = {
    price: number;
    title: string;
    thumbnail: string;
    id: number;
    discountPercentage: number;
}

type ProductListProps = {
    products: CartProductType[];
    handleAddToCartCallback: (product: CartProductType) => void
}

const ProductList = ({ products, handleAddToCartCallback }: ProductListProps) => {
    return (
        <div className='grid md:grid-cols-3 grid-cols-1 gap-4' >
            {products && products.map((product: any) => {
                return <Product product={product} key={product.id} handleAddToCartCallback={handleAddToCartCallback} />
            })}
        </div>
    )
}

export default ProductList
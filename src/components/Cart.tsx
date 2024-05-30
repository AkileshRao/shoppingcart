import React, { useCallback, useEffect, useState } from 'react'
import { getCart } from '../utils/featureUtils';
import { ProductType } from './ProductList';

export type CartProductType = {
    count: number;
} & ProductType;
type CartType = {
    items: CartProductType[];
    totalCount: number;
}

const Cart = () => {
    const [total, setTotal] = useState(0);
    const [cart, setCart] = useState<CartType | null>(null);

    const updateTotal = useCallback((cart: any) => {
        let total = 0;
        cart?.items.map((item: CartProductType) => {
            total += item.price * item.count;
        })
        setTotal(total);
    }, [cart])

    const handleReduceCartItemCount = (item: CartProductType) => {
        const cartFromStore = getCart();
        const itemToUpdate = cartFromStore.items.find((prod: CartProductType) => prod.id === item.id);
        if (itemToUpdate.count === 1) {
            cartFromStore.items = cartFromStore.items.filter((prod: CartProductType) => prod.id !== item.id)
        } else {
            itemToUpdate.count -= 1;
        }
        cartFromStore.totalCount -= 1;
        localStorage.setItem('cart', JSON.stringify(cartFromStore));
        setCart(cartFromStore)
        updateTotal(cartFromStore)
    }

    const handleIncreaseCartItemCount = (item: CartProductType) => {
        const cartFromStore = getCart();
        const itemToUpdate = cartFromStore.items.find((prod: CartProductType) => prod.id === item.id);
        itemToUpdate.count += 1;
        cartFromStore.totalCount += 1;
        localStorage.setItem('cart', JSON.stringify(cartFromStore));
        setCart(cartFromStore)
        updateTotal(cartFromStore)
    }

    useEffect(() => {
        const cartFromStore = getCart();
        setCart(cartFromStore);
        updateTotal(cartFromStore);
    }, [])
    return (
        <div className='p-2 bg-gray-200 w-screen h-screen'>
            <h3 className='text-xl font-bold'>Cart</h3>
            <div>
                {cart && cart.items?.map(item => {
                    return (
                        <div className='flex border p-2 bg-white mb-2 rounded'>
                            <img src={item.thumbnail} alt="" className='border-r-2 mb-2 w-[150px] h-[150px]' />
                            <div className='flex flex-col justify-center ps-2'>
                                <div>
                                    <p>{item.title}</p>
                                    <p className='font-bold'>{item.price}</p>
                                </div>
                                <div className='flex items-center font-bold gap-2'>
                                    <button className='bg-blue-700 text-white p-2 rounded' onClick={e => handleReduceCartItemCount(item)}>Reduce count</button>
                                    <p>{item.count}</p>
                                    <button className='bg-blue-700 text-white p-2 rounded' onClick={e => handleIncreaseCartItemCount(item)}>Increase count</button>
                                </div>
                            </div>
                        </div>
                    )
                })}

                {
                    cart?.totalCount === 0 && <p>No items found!</p>
                }
            </div>
            <p className='font-bold text-xl'>Total: {total}</p>
        </div>
    )
}

export default Cart
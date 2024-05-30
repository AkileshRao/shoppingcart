import { CartProductType } from "../components/Cart";
import { ProductType } from "../components/ProductList";

export const getCart = () => {
    const cart = localStorage.getItem('cart');
    if (!cart) {
        localStorage.setItem('cart', JSON.stringify({ items: [], totalCount: 0 }));
    }
    return JSON.parse(cart as string);
}

export const addToCart = (product: CartProductType) => {
    const cart = getCart();
    const productInCart = cart.items.find((item: CartProductType) => item.id === product.id);
    if (productInCart) {
        productInCart.count += 1;
    } else {
        cart.items.push({ ...product, count: 1 });
    }
    cart.totalCount += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const removeFromCart = (productId: number) => {
    const cart = getCart();
    cart.items = cart.items.filter((item: CartProductType) => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
}

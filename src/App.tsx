import { useEffect, useState } from 'react'
import './App.css'
import { fetchProducts } from './utils/fetcher';
import ProductList from './components/ProductList';
import { Link } from 'react-router-dom';
import { addToCart, getCart } from './utils/featureUtils';
import { CartProductType } from './components/Cart';

function App() {
  const [products, setProducts] = useState<CartProductType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const cart = getCart();
    if (cart) setTotalCount(cart.totalCount);
    (async () => {
      setLoading(true)
      try {
        const { products, total } = await fetchProducts();
        setLoading(false);
        setProducts(products);
      } catch (err: any) {
        setLoading(false);
        setError(err);
      }
    })()
  }, [])

  const handleAddToCartCallback = (prod: CartProductType) => {
    const updatedProduct = products.find((item: CartProductType) => prod.id === item.id);
    if (updatedProduct) updatedProduct.count += 1;
    setProducts(products);
    addToCart(prod);
    setTotalCount(totalCount + 1);
  }

  if (loading) {
    return <p className='font-bold text-3xl m-5'>Loading items</p>
  }
  if (error) {
    return <p>Something went wrong! Try reloading the page!</p>
  }

  return (
    <div className='bg-gray-200'>
      <div className='header bg-blue-700 rounded p-4 text-white font-bold m-2'>
        <Link to={'/cart'} className='bg-white text-blue-700 px-2 py-1 rounded'>Go to Cart({totalCount})</Link>
      </div>
      <ProductList products={products} handleAddToCartCallback={handleAddToCartCallback} />
    </div>
  )
}

export default App

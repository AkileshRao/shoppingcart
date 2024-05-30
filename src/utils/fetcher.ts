//URL can be extracted to a different file with constansts. 
//For the time being, it's hardcoded to this function.
export const fetchProducts = async () => {
    const response = await fetch('https://dummyjson.com/products');
    return await response.json();
}
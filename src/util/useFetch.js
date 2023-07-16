const BASE_URL="https://fakestoreapi.com/"
const fetchProducts=async(url)=>{
    const response=await fetch(`${BASE_URL}${url}`)
    const data=await response.json()
    return data
  }

  export default fetchProducts;
const BASE_URL="http://localhost:5000/api"
const fetchProducts=async(url)=>{
    const response=await fetch(`${BASE_URL}${url}`)
    const data=await response.json()
    return data
  }

  export default fetchProducts;
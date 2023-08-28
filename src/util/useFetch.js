const BASE_URL="http://localhost:5000/api"
const fetchGET=async(url)=>{
    const response=await fetch(`${BASE_URL}${url}`)
    const data=await response.json()
    return data
  }
const fetchPOSTPUT=async(url,method,typeOfUser,body)=>{
  const response=await fetch(`${BASE_URL}${url}`,
  {
    method:method,
    headers:{
      'Content-Type':'application/json',
      'Authorization':'Bearer '+localStorage.getItem(typeOfUser)
    },
    body:JSON.stringify(
      body
    )
  })
  const data=await response.json()
  return data

}
  export {fetchGET,fetchPOSTPUT};
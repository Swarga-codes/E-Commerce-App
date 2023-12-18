const BASE_URL=`${import.meta.env.VITE_SERVER_API}api`
const fetchGET=async(url,method,typeOfUser)=>{
    const response=await fetch(`${BASE_URL}${url}`,{
      method:method,
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem(typeOfUser)
      }
    })
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
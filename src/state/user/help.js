export const getCity = async()=>{
  try {
    const response = await fetch('https://mesh.if.iqiyi.com/aid/ip/info?version=1.1.1&src=Cashier')
    if(!response.ok){
      throw new Error('Fail to fetch')
      // throw {
      //   message:'Fail to fetch',
      //   status: 500
      // }
    }
    return response.json()
  } catch (error) {
    throw new Error('Fail to fetch')
  }
}

export const timeDelay = ()=>{
  return new Promise((res,rej)=>{
    setTimeout(()=>{
      res("hh")
    },2000)
  })
}
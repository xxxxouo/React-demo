let timer = null

const delay =  async (ms) =>{
  await new Promise((res)=>{
   timer = setTimeout(()=>res(),ms)
  }) 
  return 1
}
export default delay

let a = '5000'
export { a ,timer}
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

export default function useResize(){
  const [width ,setWidth] = useState(null)
  const debounce = useDebounce((e)=>{
    setWidth(e)
  },2000)
  window.onresize = ()=>{
    debounce(window.innerWidth)
  }
  return width?? '请改变页面尺寸'
}
// js 写法
// const debounce = (delay,fn) =>{
//   let timer;
//   return function(e){
//     if(timer) clearTimeout(timer);
//     timer = setTimeout(()=>{
//       fn(e)
//     },delay)
//   }
// }
// let testDebounce = debounce(1000,(e)=>{
//   console.log('我尺寸变了'+e);
// })
// window.onresize = function(e){
//   testDebounce('and传值了')
// }
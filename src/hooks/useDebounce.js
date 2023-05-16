import { useMemo, useRef } from "react";

export default function useDebounce(fn, delay) {
  const time = useRef(null)
  const debounce = useMemo(()=>{
    return (e)=>{
      if(time.current) clearTimeout(time.current)
      time.current = setTimeout(() => {
        fn(e)
        time.current = null
      }, delay);
    }
    
  },[fn, delay])
  return debounce
}


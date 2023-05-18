import { useState,useEffect, useCallback,useRef } from "react"

export default function useThrottle(fn,ms){
  const timer = useRef(null)
  const throttle = useCallback(()=>{
    if(timer.current){
      return;
    }
    timer.current = setTimeout(()=>{
      fn()
      clearTimeout(timer.current)
    },ms)
  },[fn,ms])
  return throttle
}
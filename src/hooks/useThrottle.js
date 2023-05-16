import { useState,useEffect, useCallback,useRef } from "react"

export default function useThrottle(fn,ms){
  const timer = useRef(-1)
  const throttle = useCallback(()=>{
    if(timer.current > -1){
      return;
    }
    timer.current = setTimeout(()=>{
      fn()
      timer.current = -1
      clearTimeout(timer.current)
    },ms)
  },[fn,ms])
  return throttle
}
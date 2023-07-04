import React, { useEffect } from 'react'

export default function usePullToRefresh() {

  useEffect(() => {
    const el = document.documentElement
    let startY = 0
    let moveY = 0
    let distance = 0
    let isPull = false
    const handleTouchStart = (e) => {
      startY = e.touches[0].pageY
      isPull = el.scrollTop === 0
    }
    const handleTouchMove = (e) => {
      moveY = e.touches[0].pageY
      distance = moveY - startY
      if (isPull && distance > 160) {
        // e.preventDefault()
        console.log('刷新')
        el.style.transform = `translate3d(0, ${distance}px, 0)`
      }
    }
    const handleTouchEnd = () => {
      if (isPull && distance > 60) {
        el.style.transform = `translate3d(0, 0, 0)`
        el.style.transition = `transform 0.3s ease`
        el.addEventListener('transitionend', () => {
          el.style.transition = ''
        }, { once: true })
      }
    }
    el.addEventListener('touchmove', handleTouchMove, false)
    el.addEventListener('touchend', handleTouchEnd, false)
    el.addEventListener('touchstart', handleTouchStart, false)
  }, [])
  return null
}

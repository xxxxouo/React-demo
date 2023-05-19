import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const ChildrenSubMenu = styled.div`
visibility:visible;
background-color: #f1f5f9;
pointer-events:auto;
border-bottom-left-radius:10px;
border-bottom-right-radius:10px;
width: 150px;
padding: 6px 0;
${( {$isOpen}) => !$isOpen && `
visibility:hidden;
pointer-events:none;
`}
`
function RenderMenuItem({route}) {
  const [ isOpen, setIsOpen ] = useState(false)
  const [ targetRef, setTargetRef] = useState(null)

  const classN = ({ isActive }) => {
    return isActive ? `text-purple-500 font-bold leading-3rem` : 'leading-3rem'
  }

  useEffect(()=>{
    const showMenu = (e)=>{
      setIsOpen(true)
    }

    const hideMenu = (e)=>{
      setIsOpen(false)
    }

    targetRef?.addEventListener("mouseenter",showMenu)
    targetRef?.addEventListener("mouseleave",hideMenu)

    return ()=>{
      targetRef?.removeEventListener("mouseenter",showMenu)
      targetRef?.removeEventListener("mouseleave",hideMenu)
    }
  },[targetRef,setTargetRef,isOpen,setIsOpen]) 
  return (
    <div ref={setTargetRef} >
      <NavLink className={classN} to={route.href} end>
        {route.label}
      </NavLink>
      <ChildrenSubMenu className=' absolute' $isOpen={isOpen}>
        {
          route.children.map(item => (
            <NavLink className={classN} key={item.href} to={item.href}>
              {item.label}
            </NavLink>
          ))
        }
      </ChildrenSubMenu>
    </div>
  )
}

export default RenderMenuItem
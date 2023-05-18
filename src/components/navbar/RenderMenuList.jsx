import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import RenderMenuItem from './RenderMenuItem'
import { menuList } from '@/config'
import useTranslation from '@/contexts/localization/useTranslation'

const ChildrenSubMenu = styled.div`
visibility:visible;
background-color: #dbe5e0;
pointer-events:auto;
${( {$isOpen}) => !$isOpen && `
visibility:hidden;
pointer-events:none;
`}
background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='%230f5247' fill-opacity='0.31' fill-rule='evenodd'/%3E%3C/svg%3E");
`
function RenderMenuList() {
  const { t } = useTranslation()
  const MemuList = menuList(t)
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
  return MemuList.map(route => {
    if (route.children) {
      return (
        // <div ref={setTargetRef} key={route.href}>
        //   <NavLink className={classN} to={route.href} >
        //     {route.label}
        //   </NavLink>
        //   <ChildrenSubMenu $isOpen={isOpen}>
        //     {
        //       route.children.map(item => (
        //         <NavLink className={classN} key={item.href} to={item.href}>
        //           {item.label}
        //         </NavLink>
        //       ))
        //     }
        //   </ChildrenSubMenu>
        // </div>
        <RenderMenuItem key={route.href} route={route }/>
      )
    }
    return (
      <NavLink className={classN} key={route.href} to={route.href}>
        {route.label}
      </NavLink>
    )
  })
}

export default RenderMenuList
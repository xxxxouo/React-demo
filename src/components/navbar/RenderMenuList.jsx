import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import RenderMenuItem from './RenderMenuItem'
import { menuList } from '@/config'
import useTranslation from '@/contexts/localization/useTranslation'

function RenderMenuList() {
  const { t } = useTranslation()
  const MemuList = menuList(t)

  const classN = ({ isActive }) => {
    return isActive ? `text-purple-500 font-bold leading-3rem px-6` : 'leading-3rem px-6'
  }

  return MemuList.map(route => {
    if (route.children) {
      return (
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
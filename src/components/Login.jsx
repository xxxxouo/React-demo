import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import PageMeta from './PageMeta'
import { login } from '../state/user/reducer'
import useTranslation from '@/contexts/localization/useTranslation'
function Login() {
  const dispath = useDispatch()
  const {state} = useLocation()
  const navigate = useNavigate()
  const {t} = useTranslation()
  return (
    <PageMeta>
      <h1>糟糕,您还没有{t('登陆')}</h1>
      <button onClick={
        ()=> {
          dispath(login())
          navigate(state?.path?? '/home',{
            replace:true
          })
        }
      }>请{t('登陆')}</button>
    </PageMeta>
  )
}

export default Login
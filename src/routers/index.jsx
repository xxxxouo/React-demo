import * as React from 'react'
import { lazy } from 'react'
import { useRoutes,Navigate } from 'react-router-dom'
import { useLoginState } from '../state/user/hooks'
import Home from '../components/Home'
// const Home = lazy(()=> import('../App'))
const Lodash = lazy(()=>import('../components/Lodash'))
const Training = lazy(()=>import('../components/Training'))
const Login = lazy(()=>import('@/components/Login'))

// 登陆拦截
export const PrivateRoute = ({ element,path })=>{
  const islogin = useLoginState()
  return islogin?(element):(
    <Navigate to={'/login'} state={{path}}  replace/>
  )
}

const GetRoutes = [
    {
      path:'/lodash',
      element: <PrivateRoute 
                element={ <Lodash />}
                path='/lodash'
              />
    },
    {
      path:'/home/',
      element: <Home />
    },
    {
      path:'/training',
      element: <PrivateRoute 
                element={ <Training />}
                path='/training'
              />
    },
    {
      path:'/login',
      element: <Login />
    },
    {
      path:'/*',
      element: <Navigate  to="/home"/>
    }
  ]

export default GetRoutes
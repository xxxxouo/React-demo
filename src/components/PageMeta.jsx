import React from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';

export default function PageMeta({children}) {
  // React.Children.map(children,child =>{
  //   const a= React.cloneElement(child, {
  //     className: 'new-class',
  //   })
  //   console.log(a);
  // })

  const { pathname } = useLocation()
  return (
    <div>
      <Helmet>
        <title>{pathname?.substring(1,pathname?.length + 1)} -- 洁神</title>
        <link rel="icon" href="/icon.png" type='image/png' />
      </Helmet>
      {children}
    </div>
  )
}

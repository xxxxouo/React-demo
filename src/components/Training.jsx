import React, { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useNavigate,Navigate,Outlet, NavLink } from 'react-router-dom';
import PageMeta from './PageMeta';

function Training() {
  const ref1 = useRef(null)
  const refRect = useRef(null)
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  });
  const handleClick = (e) => {
    setCount(count+1)
  }
  // 事件委托
  const bindEvent = (elem,type,fn)=>{
    elem.current.addEventListener(type,fn)
  }
  useEffect(()=>{
    bindEvent(ref1,'click',(e)=>{
       let target = e.target;
       e.preventDefault()
       if(target.nodeName.toLowerCase()==="a"){
        alert(target.innerHTML);
      }
    })
  },[ref1])

  // 会造成内存泄漏 
//   const fn = ()=>{
//     let n = 1
//     return ()=>{
//       n++
//       console.log(n);
//     }
//   }
//  const result = fn()
//  result()  //2
//  result()  //3

  useEffect(()=>{
    let isUnMount = false
    const getPost = async()=>{
      try {
        const response = await fetch('https://mesh.if.iqiyi.com/aid/ip/info?version=1.1.1&src=Cashier')
        if(!response.ok){
          throw new Error('Fail to fetch')
          // throw {
          //   message:'Fail to fetch',
          //   status: 500
          // }
        }
        return response.json()
      } catch (error) {
        throw {
          message:'Fail to fetch',
          status: 500
        }
        // console.log(error);
      } finally{
        // console.log('finally');
      }

    }

    if(!isUnMount){
     getPost()
    }
    return ()=>{
      isUnMount = true
    }
  },[])

//  useLayoutEffect(()=>{
//   const {width} = refRect.current.getBoundingClientRect()
//   console.log(width);
//  },[])
  const vdom =  React.createElement('h1',{className:'mt-2',id:'1'},'测试虚拟dom')
  // console.log(vdom);
  const process = (deadline)=>{
    // console.log(deadline.timeRemaining());
  }

  window.requestIdleCallback(process)

  const active = ({isActive}) =>{
    return isActive?'text-red-400 mt-2 border border-solid rounded-md px-3 py-1 border-green-400  hover:scale-125 duration-150 ease-in-out transition':`mt-2 border border-solid rounded-md px-3 py-1 border-green-400  hover:scale-125 duration-150 ease-in-out transition`
  }
  return (
    <PageMeta>
        <>
          <div id='div3' ref={ref1}>
            <a href="#">a1</a><br/>
            <a href="#">a2</a><br/>
            <a href="#">a3</a><br/>
            <a href="#">a4</a><br/>
            <button onClick={handleClick}>+1</button>
            <h4>Now{count}, before:{prevCountRef.current}</h4>
            {/* <iframe src="https://www.tailwindcss.cn/docs" ref={refRect} allow='fullscreen' width={'100%'} style={{'height':'100vh'}}></iframe> */}
          </div>
          <div className=' mt-2 flex gap-3'>
            <NavLink to={'/home'} state={{ title:'洁神'}} className={`mt-2 border border-solid rounded-md px-3 py-1 border-green-400  hover:scale-125 duration-150 ease-in-out transition `}>点击跳转到首页</NavLink>
            <NavLink to={'/training/hook-form'}  className={active}>React-Hook-From</NavLink>
          </div>
          <Outlet />
        </>
    </PageMeta>
  )
}

export default Training
import React,{ useEffect,useMemo,useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { timeout,time,timer } from '../assets/common'
import useThrottle from '../hooks/usethrottle'
import { useDebounceScreen } from '../utils'
import PageMeta from './PageMeta'
export default function Lodash() {
  const width = useDebounceScreen()
  const inputR = useRef(null)
  const inputL = useRef(null)
  const [num ,setnum] = useState(0)
  const add = ()=>{
    setnum(num+1)
  }

  const handleClick = useThrottle(add,1000)

  // proxy
  // #region 
  // const a = {
  //   _a: 99,
  //   ss: 11
  // }
  // var obj = new Proxy(a, {
  //   get: function(target,propKey){
  //     return Reflect.get(target, propKey);
  //   },
  //   has: function(target,props){
  //     if (props[0] === '_') {
  //       return false;
  //     }
  //     return props in target;
  //   },
  //   deleteProperty: function(target,propKey){
  //     if (propKey[0] === '_'){
  //       return false;
  //     }
  //     return true
  //   },
  //   ownKeys: function(target){
  //     return []
  //   }
  // }); 
  // console.log( '_a' in obj); // has
  // console.log(delete obj._a); 
  // console.log(Object.keys(obj));  // ownKeys
  // ---------------------------------
  // let target = {};
  // let handler = {};

  // let {proxy, revoke} = Proxy.revocable(target, handler);

  // proxy.foo = 123;
  // proxy.foo // 123

  // revoke();
  // console.log(proxy); 
  //#endregion

  // 类数组
  //#region 
  // const length = 3;
  // const init   = 0;
  // const result = Array.from({ length }, (x) => x=init);
  // console.log(result)
  //#endregion
  
  // async 
  //#region 
  // const a = async()=>{
  //   try {
  //     await Promise.reject("11")
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   return await Promise.resolve('成功了')
  // }
  // a().then(i=>console.log(i,'i')).catch(e =>console.log(e,'e'))  
  //#endregion
  
  // class
  //#region 
  // let method = "xj"
  // class Point {
  //   _init = 0
  //   static init = 0
  //   static obj = {a:0}
  //   #count = 0
  //   constructor(x, y) {
  //     this.x = x;
  //     this.y = y;
  //     this.hah = function(){}
  //     // return ()=>{}
  //   }
    
  //   toString() {
  //     return '(' + this.x + ', ' + this.y + ')';
  //   }
  //   [method](){
  //     console.log(this.#count);
  //     return Point.name;
  //   }
  // }
 
  // const run = () =>{
  //   console.log('run');
  // }
  // Object.assign(Point.prototype,{run})

  // const a = new Point(1,2)
  // // console.log(a[method]());
  //  console.log(a.toString(),a.constructor === Point.prototype.constructor);

  // // console.log(Point.init);
  // // console.log(Point.prototype);
  // // console.log(Point.prototype[method]());
  // // console.log(new Point() instanceof Point);
  // // console.log(new Point().hasOwnProperty("_init")); // true
  // // console.log(new Point().__proto__.hasOwnProperty('toString')); // true

  // class Point2 extends Point{
  //   constructor(x,y,color){
  //     super(x,y)
  //     this.color = color
  //     Point2.init++
  //     Point.obj.a++
  //   }
  //   toString(){
  //     return this.color + ' ' + super.toString() 
  //   }
  //   nim(){
  //     return this._init
  //   }
  // }
  // const m = new Point2(1,2,'red')
  // // console.log(Point2.init,Point.init); //1 0
  // // console.log(Point2.obj,Point.obj); // 1 1
  // // console.log(Object.getPrototypeOf(Point2) === Point); // true

  // class A {
  //   constructor() {
  //     this.x = 1;
  //   }
    
  // }
  
  // class B extends A {
  //   constructor() {
  //     super();
  //     this.x = 2;
  //     super.x = 3;
  //   }
  //   hah(){
  //     return this.x
  //   }
  // }
  // console.log(B.__proto__ == A) // true
  // console.log(B.prototype.__proto__ == A.prototype); // true
  // console.log(new B().__proto__.__proto__ === new A().__proto__);
  //#endregion
  
  // const getKey = (e)=>{
  //   return e
  // }
  // const obj = {
  //   id: 5,
  //   name: 'San Francisco',
  //   [getKey('enabled')]: true,
  // };

  // input1 防抖
  const iDebounce = (delay,fn)=>{
    let timer;
    return (e)=>{
      if(timer) clearTimeout(timer);
      timer = setTimeout(()=>{
        fn(e)
      },delay)
    }
  }
  let inputDebounce = iDebounce(2000,(e)=>{
    console.log(e);
  })
  useEffect(()=>{
    inputR.current.focus()
    inputR.current.addEventListener('input',(e)=>{
      inputDebounce(e.target.value)
    },false)
  },[inputR])

  // input2 节流

  const throttle = (delay,fn)=>{
    let timer1;
    return function(e){
      if(timer1) return;
      timer1 = setTimeout(()=>{
        fn(e)
        timer1 = null
      },delay)
    }
  }
  let inputThrottle = throttle(2000,(e)=>{
    console.log(e);
  })
  useEffect(()=>{
    inputL.current.addEventListener('input',(e)=>{
      inputThrottle(e.target.value)
    })
  },[inputL])

  //  柯里化函数
  function addMethod (x,y){
    return x + y
  }

  // const curry = (fn)=>{
  //   return (x)=>{
  //     return (y)=>{
  //       return fn(x,y)
  //     }
  //   }
  // }
  const curry = (fn)=>{
    return function curried(...args){
      if(args.length >= fn.length){
        return fn.apply(this,args)
      }else {
        return function(...args2){
          return curried.apply(this,args.concat(args2))
        }
      }
    }
  }

  const curryAdd = curry(addMethod)

  // console.log(curryAdd(2)(3));

  useEffect(() => {
    let isUnMount = false
    const start = async() =>{
      await timeout(time)
      // const foo = document.querySelectorAll('.foo');
      // const nodes = Array.from(foo);
      // console.log(nodes); 
      console.log(time/1000 + '秒后执行');
    }
    if(!isUnMount) start()
    return () => {
      isUnMount = true
      clearTimeout(timer)
    }
  }, [])
  
  return (
    <PageMeta>
      <h2>当前页面宽度(带有两秒防抖): 
        <span className=' text-red-400'>{width}</span>
      </h2>

      <div>
        <label htmlFor="input1">防抖:</label>
        <input type="text" className=' border-red-400 border border-solid' id='input1'  ref={inputR} />
        <label htmlFor="input2">节流:</label>
        <input type="text" id='input2'   className=' border-red-400 border border-solid' ref={inputL} />
        <button className=' bg-green-400' id='btn1' onClick={handleClick}>{num}--节流</button>
      </div>
    </PageMeta>
  )
}

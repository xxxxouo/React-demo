import React, { Fragment, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import moment from 'moment'
import styled  from 'styled-components'

let count = 0

const Button = styled.button`
 &:disabled{
  opacity:0.5;
  cursor: not-allowed;
 }
`

// react-hook-from 采用的是非受控组件形式 不会造成页面渲染
 function YoutubeForm() {
  const { 
    register, control, handleSubmit, watch ,getValues, setValue , reset, trigger, formState:
    { 
      errors, touchedFields, dirtyFields, isDirty, isValid, isSubmitSuccessful, isSubmitted, isSubmitting, submitCount	
    }} = useForm({
      mode:"all",
      defaultValues: async()=>{
        const res = await fetch("https://jsonplaceholder.typicode.com/users/1")
        if(res.ok){
          const {username, email, phone} = await res.json()
          return {
            username,
            email:'admin@example.com',
            age: "",
            birthday: moment().format("YYYY-MM-DD"),
            phone:[phone,""],
            hobby:[{
              text:"鸡你太美"
            }]
          }
        }
      }
    // {
    //   username:'洁神',
    //   email:'admin@example.com',
    //   age: 18
    // }
  })
  /**
   *  touchedFields<Object> 但凡有修改过的 就是显示在里面
   *  dirtyFields<Object>   但凡不跟默认值相同 就是显示在里面
   *  isDirty<Boolean>      修改任何输入值后 变true
   *  isValid<Boolean>      表单没有任何错误 变true   
   *  isSubmitting<Boolean> true 为正在提交
   *  isSubmitted<Boolean>  true为表单已提交
   *  isSubmitSuccessful    true 为表单成功提交并切没有抛出报错
   *  submitCount           提交次数
   */ 
  // console.log({touchedFields, dirtyFields, isDirty, isValid});   // 判断表单是否是初始值 以及 是否输入过
  // console.log({isSubmitSuccessful, isSubmitted, isSubmitting, submitCount});
  const { fields, append, remove } = useFieldArray({
    name:"hobby",
    control
  })
  count ++
  const watchForm = watch(["username",'age'])  // 不传值监听整个表单
  const onSubmit = (data) =>{
    console.log('onSubmit',data);
  }
  const onError = (error)=>{
    console.log("onerror",error);
  }
  const handleGetValue = ()=>{
    console.log("getValus",getValues(["username","phone.0"]));
  }
  const handleSetValue = ()=>{
    setValue("username","",{
      shouldValidate: true,
      shouldDirty:true,
      shouldTouch:true
    })
  }
  // useEffect(()=>{
  //   const subscription = watch((value)=>{
  //     console.log(value);
  //   })
  //   return ()=> subscription.unsubscribe()
  // },[watchForm])
  useEffect(()=>{
    // 提交成功恢复默认
    if(isSubmitSuccessful) reset()
  },[isSubmitSuccessful])
  return (
    <div className='mt-2'>
      <hr />
      <h1 className=' font-bold text-3xl'>React-hook-form({ count/2 })</h1>
      <h2 className=' font-bold text-xl text-pink-400'>watch username:{watchForm[0] }</h2>
      {/* form 的noValidate 属性 会关闭表单验证 */}
      <form onSubmit={handleSubmit(onSubmit, onError)} className=' flex flex-col items-center'>
        <label htmlFor="username">username:</label>
        <input type="text" className=' border border-solid border-gray-200' id='username' {...register('username',{
          maxLength: {
            value:4,
            message:"最大长度为4位"
          },
          required:'this is required',
          validate:value => value === '洁神牛逼' || '用户名只能输入洁神牛逼'
        })} />
        <p className=' my-1 text-red-600'>{errors?.username?.message}</p>
        <label htmlFor="email">email:</label>
        <input type="email" {...register('email',{
          required:{
            value:true,
            message:"这是必填项"
          },
          validate:{
            noAdmin:(value)=> value !== 'admin@example.com' || "请输入不同的电子邮箱",
            notBlackList: (value)=> !value.endsWith("qq.com") || "qq邮箱是黑名单",
            emailIsRegister: async(value)=>{ // 异步验证
              const response = await fetch(`https://jsonplaceholder.typicode.com/users?email=${value}`)
              const data = await response.json()
              return data.length == 0 || "该用户已经注册" 
            }
          }
        })} className=' border border-solid border-gray-200' id='email'  />
        <p className=' my-1 text-red-600'>{errors?.email?.message}</p>
        <label htmlFor="age">age:</label>
        <input type="number" className=' border border-solid border-gray-200' id='age' {...register('age',{
          required:{
            value:true,
            message:'pls enter age'
          },
          max:{
            value:100,
            message:"最大100岁"
          },
          valueAsNumber:true, // 这种转换发生在验证之前
          validate: value => value > 0 || '年龄不能小于0'
        })}/>
        <p className=' my-1 text-red-600 float-left'>{errors?.age?.message}</p>

        <label htmlFor="birthday">birthday:</label>
        <input type="date" className=' border border-solid border-gray-200' id='birthday' {...register('birthday',{
          required:{
            value:true,
            message:'pls enter birthday'
          },
          valueAsDate:true
        })}/>
        <p className=' my-1 text-red-600 float-left'>{errors?.birthday?.message}</p>

        <label htmlFor="MainPhone">主用手机号:</label>
        <input type="text" className=' border border-solid border-gray-200' id='MainPhone' {...register("phone.0")} />
        <label htmlFor="SparePhone">副用手机号:</label>
        <input type="text" className=' border border-solid border-gray-200' id='SparePhone' {...register("phone.1",{
          disabled:watch("phone.0") !== "", // 当 主手机号不为空的时候它才显示
          required:{
            value:true,
            message:"必填项"
          }
        })} />
        
        <div>
          <label htmlFor="hobby">Hobby</label>
          <div className=' flex flex-col gap-1'>
            {
              fields.map((field, index) =>(
                <div key={field.id} className=" flex items-center relative" >
                  <input type="text" className=' border border-solid border-gray-200' {...register(`hobby.${index}.text`)} />
                  { index>0 && 
                    <button type='button'className='bg-gray-400 absolute' style={{right:"-60px"}}  onClick={()=> remove(index)}>Delete</button>
                  }
                </div>
              ))
            }
          </div>
          <button type='button' className=' bg-green-400 mt-2 px-6 py-1' onClick={()=> append({text:"唱跳rap"})}>Add Hobby</button>
        </div>
        <div className='flex gap-4 '>
          <button className=' bg-purple-400 mt-2 px-6 py-1' type='button' onClick={handleGetValue}>GetValue</button>
          <button className=' bg-yellow-400 mt-2 px-6 py-1' type='button' onClick={handleSetValue}>SetValue</button>
          <button className=' bg-blue-400 mt-2 px-6 py-1' type='button' onClick={()=> reset()}>Reset</button>
          <button className=' bg-pink-400 mt-2 px-6 py-1' type='button' onClick={()=> trigger()}>手动验证</button>
          <Button type='submit' disabled={!isDirty || !isValid || isSubmitting} className=' bg-orange-400 mt-2 px-6 py-1'>Submit</Button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  )
}

export default YoutubeForm
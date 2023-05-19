import React, { Fragment } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

let count = 0

// react-hook-from 采用的是非受控组件形式 不会造成页面渲染
 function YoutubeForm() {
  const { register, control, handleSubmit, formState:{errors} } = useForm({
    defaultValues: async()=>{
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1")
      if(res.ok){
        const {username, email, phone} = await res.json()
        return {
          username,
          email:'admin@example.com',
          age: 18,
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
  const { fields, append, remove } = useFieldArray({
    name:"hobby",
    control
  })
  count ++

  const onSubmit = (data) =>{
    console.log('onSubmit',data);
  }
  return (
    <div className='mt-2'>
      <hr />
      <h1 className=' font-bold text-3xl'>React-hook-form({ count/2 })</h1>
      {/* form 的noValidate 属性 会关闭表单验证 */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className=' flex flex-col items-center'>
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
            notBlackList: (value)=> !value.endsWith("qq.com") || "qq邮箱是黑名单"
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
          valueAsNumber:true,
          validate: value => Number(value) > 0 || '年龄不能小于0'
        })}/>
        <p className=' my-1 text-red-600 float-left'>{errors?.age?.message}</p>
        <label htmlFor="MainPhone">主用手机号:</label>
        <input type="text" className=' border border-solid border-gray-200' id='MainPhone' {...register("phone.0")} />
        <label htmlFor="SparePhone">副用手机号:</label>
        <input type="text" className=' border border-solid border-gray-200' id='SparePhone' {...register("phone.1")} />
        
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
        <button className=' bg-orange-400 mt-2 px-6 py-1'>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  )
}

export default YoutubeForm
import React from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

let count = 0

// react-hook-from 采用的是非受控组件形式 不会造成页面渲染
function YoutubeForm() {
  const { register, control, handleSubmit, formState:{errors} } = useForm({
    defaultValues:{
      username:'洁神',
      email:'4854374@qq.com',
      age: 18
    }
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
            message:"maxLength is 2 "
          },
          required:'this is required',
          validate:value => value === '洁神牛逼' || '用户名只能输入洁神牛逼'
        })} />
        <p className=' my-1 text-red-600'>{errors?.username?.message}</p>
        <label htmlFor="email">email:</label>
        <input type="email" {...register('email')} className=' border border-solid border-gray-200' id='email'  />
      
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
        <button className=' bg-orange-400 mt-2 px-6 py-1'>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  )
}

export default YoutubeForm
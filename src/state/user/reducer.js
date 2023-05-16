import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'
import { getCity,timeDelay } from "./help";
const initialState = {
  isLogin: Cookies.get('demoLogin')?? false,
  fetchInfo: null
}

// createAsyncThunk 专门处理异步操作的action  调用的时候 用  **dispath(fetchList())**
export const fetchList = createAsyncThunk("user/fetchListStatus", async()=>{
    const [city , b] = await Promise.all([getCity(),timeDelay()])
    return city.data
})

const user = createSlice({
  name:'user',
  initialState,
  reducers:{
    login: (state) =>{
      state.isLogin = true
      Cookies.set('demoLogin',true,{ expires: 7 })
    },
    logout: (state)=>{
      state.isLogin = false
      Cookies.remove('demoLogin')
    }
  },
  // 以下是 createAsyncThunk 的固定写法格式
  extraReducers:(build)=>{
    build.addCase(fetchList.fulfilled,(state,action)=>{
      state.fetchInfo = action.payload
    });
    build.addCase(fetchList.pending,(state,action)=>{
      // console.log("fetchList.pending");
    });
    build.addCase(fetchList.rejected,(state,action)=>{
      console.log("fetchList.rejected",action.payload);
    });
  }
})

export const {login, logout} = user.actions
export default user.reducer
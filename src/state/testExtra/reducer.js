import { createSlice } from "@reduxjs/toolkit";
import { login,logout } from "../user/reducer";

const initialState = {
  "salary":null
}

const testReducer = createSlice({
  name:"testReducer",
  initialState,
  reducers:{
  
  },
  extraReducers:(build)=>{
    build
    .addCase( login ,(state)=>{
      state.salary  = "给我加薪阿啊阿啊"
    })
    .addCase( logout ,(state)=>{
      state.salary  = ""
    })
  }
})
export default testReducer.reducer
// export const { add } = testReducer.actions
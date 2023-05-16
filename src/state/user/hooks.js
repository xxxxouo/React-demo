import { useSelector } from 'react-redux'

export const useLoginState = ()=>{ return useSelector((state)=> state.user.isLogin) } 

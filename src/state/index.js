import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import user from './user/reducer'
const reducer = {
  user
}

const store = configureStore({
  reducer,
  devTools: import.meta.env.MODE !== 'production',
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})  

export default store
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import user from './user/reducer'
import test from './testExtra/reducer'
const reducer = {
  user,
  test
}

const store = configureStore({
  reducer,
  devTools: import.meta.env.MODE !== 'production',
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})  

export default store
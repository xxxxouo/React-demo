import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import Providers from './Providers'
import './utils/auto-update'  // 检测自动更新
import './index.css'
import './tailwind.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Providers>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Providers>
  </React.StrictMode>
)

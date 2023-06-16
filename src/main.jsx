import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import Providers from './Providers'
import './index.css'
import './tailwind.css'
console.log("%c欲买桂花同载酒,终不似少年游 \n金鳞岂是池中物,一遇风云便化龙","color:red;font-size:28px");
console.log("%c访问另一个域名:https://xxxxouo.live","");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Providers>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Providers>
  </React.StrictMode>
)

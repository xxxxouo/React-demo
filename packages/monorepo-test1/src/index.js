import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import XJNB from 'xjnb';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
const conss = ()=>{
  return 1
}
conss()
export default function XJButton() {
  return (
    <button style={{color:'red'}}> {XJNB()} </button>
  )
}

reportWebVitals();

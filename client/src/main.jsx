import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//purely option strictmode, we can just use App, and we will have no react errors poping up
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

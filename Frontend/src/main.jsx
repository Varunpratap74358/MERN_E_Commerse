import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import AppState from './Context/AppState.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppState>
    <App />
  </AppState>
)

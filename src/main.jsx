import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/bootstrap.min.css'
import App from './App.jsx'
import Content from './Content.jsx'
import Footer from './Footer.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter><App /></BrowserRouter>
    
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Tela_Principal from './Tela_Principal/Tela_Principal.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
    <Routes>

     <Route path='/' element={<App/>}/>
      <Route path='/Tela_Principal' element={<Tela_Principal/>}/>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)

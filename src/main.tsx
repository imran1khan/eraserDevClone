import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import LandingPage from './Pages/LandingPage.tsx'
import Dashboard from './Pages/Dashboard.tsx'
import { Toaster } from 'react-hot-toast'
import {  Routes, Route, BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/editor/:id' element={<App />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
    </RecoilRoot>
  </React.StrictMode>,
)

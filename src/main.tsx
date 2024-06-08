import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import LandingPage from './Pages/LandingPage.tsx'
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import Dashboard from './Pages/Dashboard.tsx'
import { Toaster } from 'react-hot-toast'
import {  Routes, Route, HashRouter } from 'react-router-dom'

const onRedirectCallback = (user: any, app_state: any) => {
  console.log({ user, app_state });
  // Redirect to a dashboard or home page
  const sendFile = async () => {
    try {
      const response = await fetch('/api/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id || '',
          userEmail: user?.email || ''
        })
      });
      console.log(await response.json());
    } catch (error) {
      console.log(error)
    }
  }
  sendFile();
  window.location.href = '/dashboard';
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <KindeProvider
        clientId="9932afa04b9241b3bf005becd78c82be"
        domain="https://exceladrawclone.kinde.com"
        redirectUri="https://eraser-dev-clone.vercel.app/"
        logoutUri="https://eraser-dev-clone.vercel.app/"
        onRedirectCallback={onRedirectCallback}
      >
        <HashRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/editor/:id' element={<App />} />
          </Routes>
        </HashRouter>
        <Toaster />
      </KindeProvider>
    </RecoilRoot>
  </React.StrictMode>,
)

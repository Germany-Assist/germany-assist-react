import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'

import App from './App.jsx'
import { AuthProvider } from './pages/AuthProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
 <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)

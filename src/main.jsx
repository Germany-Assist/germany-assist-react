import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'

import App from './App.jsx'
import { AuthProvider } from './pages/AuthProvider.jsx'
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProvider>
    <App />
    </AuthProvider>
  </React.StrictMode>,
)

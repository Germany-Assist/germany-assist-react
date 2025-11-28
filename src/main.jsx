import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import { AuthProvider } from './pages/AuthProvider.jsx'
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);



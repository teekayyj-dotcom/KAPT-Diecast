import 'aws-amplify/auth/enable-oauth-listener'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

const isLocalHost = (hostname) =>
  hostname === 'localhost' || hostname === '127.0.0.1'

const Router = typeof window !== 'undefined' && !isLocalHost(window.location.hostname)
  ? HashRouter
  : BrowserRouter

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <Router>
          <App />
        </Router>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)

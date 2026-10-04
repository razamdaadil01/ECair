import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { AppDataProvider } from './context/AppDataContext.jsx'
import Toast from './components/ui/Toast.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <AppDataProvider>
          <App />
          <Toast />
        </AppDataProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
)

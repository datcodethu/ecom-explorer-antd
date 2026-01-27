import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRoutes from './routes'
import App from './App'
import { AppContextProvider } from './context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AppContextProvider>
    <App>
      <AppRoutes />
    </App>
  </AppContextProvider>
)

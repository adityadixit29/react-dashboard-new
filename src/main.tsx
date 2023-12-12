import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
export const server = "https://react-dashboard-backend-l8io.onrender.com/api/v1/sector";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
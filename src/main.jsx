//Import React features
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';

// Import Google Firebase features
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

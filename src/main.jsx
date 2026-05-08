import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerSW } from "virtual:pwa-register";

registerSW({
  onOfflineReady() {
    console.log("DailyLex offline işləməyə hazırdır.");
  },
  onNeedRefresh() {
    console.log("Yeni versiya var.");
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

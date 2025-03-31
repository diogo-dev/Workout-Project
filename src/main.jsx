import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
/* Importing the provider */
import { CalendarContextProvider } from './context/CalendarContext.jsx'
import { PopUpProvider } from './context/PopUpContext.jsx'

/* Remember that <StrictMode> runs useEffect() twice in development mode, but not in production mode */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CalendarContextProvider >
      <PopUpProvider>
        <App />
      </PopUpProvider>
    </CalendarContextProvider>
  </StrictMode>,
)

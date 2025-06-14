import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './Context/AuthContext.jsx'
import UserContext from './Context/UserContext.jsx'
import PermiumToolsContext from './Context/PermiumToolsContext.jsx'
import AppointmentContext from './Context/AppointmentContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <PermiumToolsContext>
      <AppointmentContext>
        <AuthContext>
          <UserContext>
            <App />
          </UserContext>
        </AuthContext>
      </AppointmentContext>
    </PermiumToolsContext>
  </BrowserRouter>
)

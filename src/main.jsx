import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './Context/AuthContext.jsx'
import UserContext from './Context/UserContext.jsx'
import PermiumToolsContext from './Context/PermiumToolsContext.jsx'
import AppointmentContext from './Context/AppointmentContext.jsx'
import ContactFromContext from './Context/ContactFromContext.jsx'
import OurTamsContext from './Context/OurTamsContext.jsx'
import CategoriesContext from './Context/CategoriesContext.jsx'
import FreeToolsContext from './Context/FreeToolsContext.jsx'
import ProductOrderContext from './Context/ProductOrderContext.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <ContactFromContext>
      <CategoriesContext>
        <PermiumToolsContext>
          <FreeToolsContext>
            <ProductOrderContext>
              <AppointmentContext>
                <OurTamsContext>
                  <AuthContext>
                    <UserContext>
                      <App />
                    </UserContext>
                  </AuthContext>
                </OurTamsContext>
              </AppointmentContext>
            </ProductOrderContext>
          </FreeToolsContext>
        </PermiumToolsContext>
      </CategoriesContext>
    </ContactFromContext>
  </BrowserRouter>
)

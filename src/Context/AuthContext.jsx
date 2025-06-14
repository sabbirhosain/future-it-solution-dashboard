import CryptoJS from 'crypto-js';
import axios from 'axios';
import { createContext, useContext } from 'react';
const AuthContextProvider = createContext();

const AuthContext = ({ children }) => {






















    
    
    return (
        <AuthContextProvider.Provider value={{  }}>
            {children}
        </AuthContextProvider.Provider>
    )
}

export default AuthContext;

// coustom hooks
export const useAuthContextProvider = () => {
    return useContext(AuthContextProvider)
};




import { createContext, useContext } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
const AuthContextProvider = createContext();
import { jwtDecode } from 'jwt-decode';
import CryptoJS from 'crypto-js';

const AuthContext = ({ children }) => {
    const navigate = useNavigate();
    const SECRET_KEY = import.meta.env.VITE_CRYPTOJS_SECRET_KEY || 'YourFallbackSecretKey';

    // encrypt localstroge data
    const encryptData = (data) => {
        try {
            if (!data) { console.log("No data found to encrypt."); return null }
            return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
        } catch (error) {
            console.error("Encryption error:", error);
            return null;
        }
    }

    // decrypt localstroge data
    const decryptData = (encryptedData) => {
        try {
            if (!encryptedData) { console.log("No data found to decrypt."); return null }
            const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (error) {
            console.error('Decryption failed:', error);
            return null;
        }
    }



    return (
        <AuthContextProvider.Provider value={{ encryptData, decryptData }}>
            {children}
        </AuthContextProvider.Provider>
    )
}

export default AuthContext;

// coustom hooks
export const useAuthContextProvider = () => {
    return useContext(AuthContextProvider)
};


// Protected Route Component
export const ProtectedRoute = ({ children }) => {
    const { decryptData } = useAuthContextProvider();
    const encryptedToken = localStorage.getItem("root");
    const decryptToken = encryptedToken ? decryptData(encryptedToken) : null;
    if (!decryptToken?.accessToken) { return <Navigate to="/login" /> }

    try {
        // Decode the token to check expiration
        const decodedToken = jwtDecode(decryptToken.accessToken);
        const currentTime = Date.now() / 1000; // Convert to seconds

        // Check if token is expired
        if (decodedToken.exp && decodedToken.exp < currentTime) {
            console.log(decodedToken.exp);
            localStorage.removeItem("root");
            return <Navigate to="/login" />;
        } else {
            return children ? children : <Outlet />;
        }

    } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("root");
        return <Navigate to="/login" />;
    }
};

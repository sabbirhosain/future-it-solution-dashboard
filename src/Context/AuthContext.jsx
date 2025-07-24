import { createContext, useContext } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
const AuthContextProvider = createContext();
import { jwtDecode } from 'jwt-decode';
import CryptoJS from 'crypto-js';
import { generateAccessToken } from './Api_Base_Url';

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

    const generateNewToken = async (refreshToken) => {
        try {
            const response = await fetch(generateAccessToken, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken }),
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem('root', encryptData(data));
            } else {
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error("Refresh token failed:", error);
        }
    };



    return (
        <AuthContextProvider.Provider value={{ encryptData, decryptData, generateNewToken }}>
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
    const { decryptData, generateNewToken } = useAuthContextProvider();
    const encryptedToken = localStorage.getItem("root");
    const decryptToken = encryptedToken ? decryptData(encryptedToken) : null;

    // If no tokens exist, redirect to login
    if (!decryptToken?.accessToken || !decryptToken?.refreshToken) {
        return <Navigate to="/login" />;
    }

    try {
        const decodedAccessToken = jwtDecode(decryptToken.accessToken);
        const decodedRefreshToken = jwtDecode(decryptToken.refreshToken);
        const currentTime = Date.now() / 1000; // Convert to seconds

        // Case 1: Access token is expired but refresh token is still valid → Attempt refresh
        if (decodedAccessToken.exp < currentTime && decodedRefreshToken.exp > currentTime) {
            const newTokens = generateNewToken(decryptToken.refreshToken); //Generate New Token

            if (newTokens?.accessToken) {
                return children ? children : <Outlet />;
            } else {
                localStorage.removeItem("root");
                return <Navigate to="/login" />;
            }
        }
        // Case 2: Both tokens are expired → Force logout
        else if (decodedAccessToken.exp < currentTime && decodedRefreshToken.exp < currentTime) {
            localStorage.removeItem("root");
            return <Navigate to="/login" />;
        }
        else {
            return children ? children : <Outlet />;
        }
    } catch (error) {
        console.error("Token verification error:", error);
        localStorage.removeItem("root");
        return <Navigate to="/login" />;
    }
}

import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { PremiumToolsShow } from './Api_Base_Url';
const PremiumToolsContextProvider = createContext();

const PermiumToolsContext = ({ children }) => {
    // All Permium Tools List
    const [handleError, setHandleError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [premiumTools, setPremiumTools] = useState({});
    const [searchFilter, setSearchFilter] = useState('');
    const [available, setAvailable] = useState('');
    const [status, setStatus] = useState('');

    const getPermiumTools = async (page) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${PremiumToolsShow}?search=${searchFilter}&available=${available}&status=${status}&page=${page}`);
            if (response && response.data) {
                setPremiumTools(response.data);
            }

        } catch (error) {
            console.log(error.message);
            setHandleError(error.response.data || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }








    return (
        <PremiumToolsContextProvider.Provider value={{ getPermiumTools, handleError, isLoading, premiumTools, searchFilter, setSearchFilter, available, setAvailable, status, setStatus }}>
            {children}
        </PremiumToolsContextProvider.Provider>
    )
}

export default PermiumToolsContext
// coustom hooks
export const usePremiumToolsContextProvider = () => {
    return useContext(PremiumToolsContextProvider)
};
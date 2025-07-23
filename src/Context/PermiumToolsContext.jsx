import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { PremiumToolsDestroy, PremiumToolsShow } from './Api_Base_Url';
import Swal from 'sweetalert2';
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
            const response = await axios.get(`${PremiumToolsShow}?search=${searchFilter}&availability=${available}&status=${status}&page=${page}`);
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


    // Permium Tools Delete
    const permiumToolsDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#09684f",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`${PremiumToolsDestroy}${id}`);
                    if (response && response.data) {
                        Swal.fire({
                            title: "Deleted!",
                            text: response.data.message || 'User has been deleted success',
                            icon: "success"
                        });
                        await getPermiumTools(1);
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: response.data.message || "Something went wrong.",
                            icon: "error"
                        });
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: "Error!",
                        text: error.response.data.message || "Server error occurred.",
                        icon: "error"
                    });
                }
            }
        });
    };








    return (
        <PremiumToolsContextProvider.Provider value={{ getPermiumTools, handleError, isLoading, premiumTools, searchFilter, setSearchFilter, available, setAvailable, status, setStatus, permiumToolsDelete }}>
            {children}
        </PremiumToolsContextProvider.Provider>
    )
}

export default PermiumToolsContext
// coustom hooks
export const usePremiumToolsContextProvider = () => {
    return useContext(PremiumToolsContextProvider)
};
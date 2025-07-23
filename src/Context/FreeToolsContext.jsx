import { useCategoriesContextProvider } from './CategoriesContext';
import { createContext, useContext, useState } from 'react';
const FreeToolsContextProvider = createContext();
import { FreeToolsDestroy, FreeToolsShow } from './Api_Base_Url';
import Swal from 'sweetalert2';
import axios from 'axios';

const FreeToolsContext = ({ children }) => {
    // All Free Tools List
    const { optionSelectValue } = useCategoriesContextProvider()
    const [handleError, setHandleError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [freeTools, setFreeTools] = useState([]);
    const [searchFilter, setSearchFilter] = useState('');
    const [available, setAvailable] = useState('');
    const [status, setStatus] = useState('');

    const getFreeTools = async (page) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${FreeToolsShow}?search=${searchFilter}&categories=${optionSelectValue?.value}&availability=${available}&status=${status}&page=${page}`);
            if (response && response.data) {
                setFreeTools(response.data);
            }
        } catch (error) {
            console.log(error.message);
            setHandleError(error.response.data || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }


    // Free Tools Delete
    const freeToolsDelete = (id) => {
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
                    const response = await axios.delete(`${FreeToolsDestroy}${id}`);
                    if (response && response.data) {
                        Swal.fire({
                            title: "Deleted!",
                            text: response.data.message || 'User has been deleted success',
                            icon: "success"
                        });
                        await getFreeTools(1);
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
        <FreeToolsContextProvider.Provider value={{ handleError, isLoading, freeTools, searchFilter, setSearchFilter, available, setAvailable, status, setStatus, getFreeTools, freeToolsDelete }}>
            {children}
        </FreeToolsContextProvider.Provider>
    )
}

export default FreeToolsContext
// coustom hooks
export const useFreeToolsContextProvider = () => {
    return useContext(FreeToolsContextProvider)
};
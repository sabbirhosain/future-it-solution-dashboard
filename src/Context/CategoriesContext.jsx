import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
import { CategoriesShow } from './Api_Base_Url';
const CategoriesContextProvider = createContext();

const CategoriesContext = ({ children }) => {

    // All Categories List
    const [handleError, setHandleError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCatrgories] = useState([]);
    const [searchFilter, setSearchFilter] = useState('');

    const getCategories = async (page) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${CategoriesShow}?search=${searchFilter}&page=${page}`);
            if (response && response.data) {
                setCatrgories(response.data);
            }
        } catch (error) {
            console.log(error.message);
            setHandleError(error.response.data || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }












    return (
        <CategoriesContextProvider.Provider value={{ handleError, isLoading, categories, searchFilter, setSearchFilter, getCategories }}>
            {children}
        </CategoriesContextProvider.Provider>
    )
}

export default CategoriesContext
// coustom hooks
export const useCategoriesContextProvider = () => {
    return useContext(CategoriesContextProvider)
};
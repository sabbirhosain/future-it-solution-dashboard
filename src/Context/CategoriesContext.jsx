import React, { createContext, useContext, useState } from 'react'
import { CategoriesDestroy, CategoriesShow } from './Api_Base_Url';
const CategoriesContextProvider = createContext();
import Swal from 'sweetalert2';
import axios from 'axios';

const CategoriesContext = ({ children }) => {

    // All Categories List
    const [handleError, setHandleError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCatrgories] = useState([]);
    const [searchFilter, setSearchFilter] = useState('');
    const [optionSelectValue, setOptionSelectValue] = useState(null);
    const [optionList, setOptionList] = useState({});

    const getCategories = async (page) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${CategoriesShow}?search=${searchFilter}&page=${page}`);
            if (response && response.data) {
                setCatrgories(response.data);
                // get option filter data
                const data = response.data.payload;
                const selectOption = data.map(item => ({ value: item._id, label: item.categories }));
                setOptionList(selectOption);
            }
        } catch (error) {
            console.log(error.message);
            setHandleError(error.response.data || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    // ===== for react select dropdown ====================
    const optionOnChange = (selectedOption) => { setOptionSelectValue(selectedOption) };
    const optionInputChange = (searchOption) => { setSearchFilter(searchOption) };


    const deleteCategories = (id) => {
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
                    const response = await axios.delete(`${CategoriesDestroy}${id}`);
                    if (response && response.data) {
                        Swal.fire({
                            title: "Deleted!",
                            text: response.data.message || 'Categories has been deleted success',
                            icon: "success"
                        });
                        await getCategories(1);
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
        <CategoriesContextProvider.Provider value={{ handleError, isLoading, categories, searchFilter, setSearchFilter, getCategories, deleteCategories, optionList, optionSelectValue, setOptionSelectValue, optionOnChange, optionInputChange }}>
            {children}
        </CategoriesContextProvider.Provider>
    )
}

export default CategoriesContext
// coustom hooks
export const useCategoriesContextProvider = () => {
    return useContext(CategoriesContextProvider)
};
import React, { createContext, useContext, useState } from 'react'
import { FreeProductOrderShow, PremiumProductOrderShow } from './Api_Base_Url';
const ProductOrderContextProvider = createContext();
import axios from 'axios';

const ProductOrderContext = ({ children }) => {

  const [premiumOrder, setPremiumOrder] = useState({
    isLoading: false,
    error_message: null,
    data: [],
    search: '',
    active_date: '',
    expire_date: '',
    status: ''
  });

  const premiumOrderFilter = (field, value) => {
    setPremiumOrder(prev => ({ ...prev, [field]: value }));
  };

  const getPermiumOrder = async (page) => {
    try {
      setPremiumOrder(prev => ({ ...prev, isLoading: true, error_message: null }));
      const { search, active_date, expire_date, status } = premiumOrder;
      const response = await axios.get(`${PremiumProductOrderShow}?search=${search}&active_date=${active_date}&expire_date=${expire_date}&status=${status}&page=${page}`);

      if (response && response.data) {
        setPremiumOrder(prev => ({ ...prev, data: response.data }));
      }
    } catch (error) {
      console.log(error.message);
      setPremiumOrder(prev => ({ ...prev, error_message: error.response?.data || "Something went wrong" }));
    } finally {
      setPremiumOrder(prev => ({ ...prev, isLoading: false }));
    }
  }

// Free Order
  const [freeOrder, setFreeOrder] = useState({
    isLoading: false,
    error_message: null,
    data: [],
    search: '',
    active_date: '',
    expire_date: '',
    status: ''
  });

  const freeOrderFilter = (field, value) => {
    setFreeOrder(prev => ({ ...prev, [field]: value }));
  };

  const getFreeOrder = async (page) => {
    try {
      setFreeOrder(prev => ({ ...prev, isLoading: true, error_message: null }));
      const { search, active_date, expire_date, status } = premiumOrder;
      const response = await axios.get(`${FreeProductOrderShow}?search=${search}&active_date=${active_date}&expire_date=${expire_date}&status=${status}&page=${page}`);

      if (response && response.data) {
        setFreeOrder(prev => ({ ...prev, data: response.data }));
      }
    } catch (error) {
      console.log(error.message);
      setFreeOrder(prev => ({ ...prev, error_message: error.response?.data || "Something went wrong" }));
    } finally {
      setFreeOrder(prev => ({ ...prev, isLoading: false }));
    }
  }







  return (
    <ProductOrderContextProvider.Provider value={{ premiumOrder, getPermiumOrder, premiumOrderFilter, freeOrder, getFreeOrder, freeOrderFilter }}>
      {children}
    </ProductOrderContextProvider.Provider>
  )
}

export default ProductOrderContext
// coustom hooks
export const useProductOrderContextProvider = () => {
  return useContext(ProductOrderContextProvider)
};
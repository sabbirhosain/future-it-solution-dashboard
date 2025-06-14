import React, { createContext, useContext, useState } from 'react'
import { AppointmentShow } from './Api_Base_Url';
import axios from 'axios';

const AppointmentContextProvider = createContext();
const AppointmentContext = ({ children }) => {

  // All Permium Tools List
  const [handleError, setHandleError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [appointment, setAppointment] = useState({});
  const [searchFilter, setSearchFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [status, setStatus] = useState('');

  const getAppointment = async (page) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${AppointmentShow}?search=${searchFilter}&from_date=${fromDate}&to_date=${toDate}&status=${status}&page=${page}`);
      if (response && response.data) {
        setAppointment(response.data);
      }

    } catch (error) {
      console.log(error.message);
      setHandleError(error.response.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }




  return (
    <AppointmentContextProvider.Provider value={{
      getAppointment, handleError, isLoading, appointment, searchFilter, setSearchFilter, fromDate, setFromDate, toDate, setToDate, status, setStatus
    }}>
      {children}
    </AppointmentContextProvider.Provider>
  )
}

export default AppointmentContext

// coustom hooks
export const useAppointmentContextProvider = () => {
  return useContext(AppointmentContextProvider)
};
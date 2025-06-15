import axios from 'axios';
import { createContext, useContext, useState } from 'react';
const ContactFromContextProvider = createContext();

const ContactFromContext = ({ children }) => {

    const [handleError, setHandleError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [contactFrom, setContactFrom] = useState({});
    const [searchFilter, setSearchFilter] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [status, setStatus] = useState('');

    const getContactFrom = async (page) => {
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
        <ContactFromContextProvider.Provider value={{}}>
            {children}
        </ContactFromContextProvider.Provider>
    )
}

export default ContactFromContext

// coustom hooks
export const useContactFromContextProvider = () => {
    return useContext(ContactFromContextProvider)
};
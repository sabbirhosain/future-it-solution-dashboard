import { createContext, useContext, useState } from "react";
import { OurTeamsShow } from "./Api_Base_Url";
import axios from "axios";

const OurTeamsContextProvider = createContext();
const OurTamsContext = ({ children }) => {

    // All teams List
    const [handleError, setHandleError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [ourTeams, setOurTeams] = useState({});
    const [searchFilter, setSearchFilter] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [status, setStatus] = useState('');

    const getOurTeams = async (page) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${OurTeamsShow}?search=${searchFilter}&from_date=${fromDate}&to_date=${toDate}&status=${status}&page=${page}`);
            if (response && response.data) {
                setOurTeams(response.data);
            }

        } catch (error) {
            console.log(error.message);
            setHandleError(error.response.data || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }





    return (
        <OurTeamsContextProvider.Provider value={{ getOurTeams, handleError, isLoading, ourTeams, searchFilter, setSearchFilter, fromDate, setFromDate, toDate, setToDate, status, setStatus }}>
            {children}
        </OurTeamsContextProvider.Provider>
    )
}

export default OurTamsContext

// coustom hooks
export const useOurTeamContextProvider = () => {
    return useContext(OurTeamsContextProvider)
};
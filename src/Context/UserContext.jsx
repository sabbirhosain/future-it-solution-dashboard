import { createContext, useContext, useState } from "react";
import axios from "axios";
import { destroyUser, showUser, UserStatus, UserVerified } from "./Api_Base_Url";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const UserContextProvider = createContext();

const UserContext = ({ children }) => {

    // All User List
    const [userError, setUserError] = useState(null);
    const [isLoadingUser, setIsLoadingUser] = useState(false);
    const [userList, setUserList] = useState({});
    const [userSearchFilter, setUserSearchFilter] = useState('');
    const [userJoinFrom, setUserJoinFrom] = useState('');
    const [userJoinTo, setUserJoinTo] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [userVerified, setUserVerified] = useState('');

    const userDataFetch = async (page) => {
        try {
            setIsLoadingUser(true);
            const response = await axios.get(`${showUser}?search=${userSearchFilter}&join_date_from=${userJoinFrom}&join_date_to=${userJoinTo}&status=${userStatus}&verified=${userVerified}&page=${page}`);

            if (response && response.data) {
                setUserList(response.data);
            }

        } catch (error) {
            setUserError(error);
            console.log(error.message);
        } finally {
            setIsLoadingUser(false);
        }
    }

    // User Delete
    const userDelete = (id) => {
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
                    const response = await axios.delete(`${destroyUser}${id}`);
                    if (response && response.data) {
                        Swal.fire({
                            title: "Deleted!",
                            text: response.data.message || 'User has been deleted success',
                            icon: "success"
                        });
                        await userDataFetch(1);
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

    // Verified User Active
    const verifiedUser = async (id) => {
        try {
            // Confirmation dialog
            const confirmMessage = `Are you sure you want to active users.`;
            const isConfirmed = window.confirm(confirmMessage);
            if (!isConfirmed) { return toast.info("Status change cancelled") }

            const response = await axios.patch(`${UserVerified}${id}`);

            if (response && response.data) {
                toast.success(response.data.message || "Status Updated Success");
                await userDataFetch(1);
            }
        } catch (error) {
            console.error("Status update failed:", error);
            toast.error(error.response.data.message || "Failed to update status");
        }
    }

    // Change User Status
    const userStatusChange = async (id, currentStatus) => {
        try {

            const newStatus = currentStatus === "active" ? "hold" : "active";

            // Confirmation dialog
            const confirmMessage = `Are you sure you want to change this user's status to ${newStatus}?`;
            const isConfirmed = window.confirm(confirmMessage);
            if (!isConfirmed) { return toast.info("Status change cancelled") }

            const response = await axios.patch(`${UserStatus}${id}`, {
                status: newStatus
            });

            if (response && response.data) {
                toast.success(response.data.message || "Status Updated Success");
                await userDataFetch(1);
            }
        } catch (error) {
            console.error("Status update failed:", error);
            toast.error(error.response.data.message || "Failed to update status");
        }
    };



























    return (
        <UserContextProvider.Provider value={{ userDataFetch, userError, isLoadingUser, userList, userSearchFilter, setUserSearchFilter, userJoinFrom, setUserJoinFrom, userJoinTo, setUserJoinTo, userStatus, setUserStatus, userVerified, setUserVerified, userDelete, userStatusChange, verifiedUser }}>
            {children}
        </UserContextProvider.Provider>
    )
}

export default UserContext

// coustom hooks
export const useUserContextProvider = () => {
    return useContext(UserContextProvider)
};
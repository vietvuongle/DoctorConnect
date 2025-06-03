import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : false);

    const [departmentData, setDepartmentData] = useState([]);
    const [doctorData, setDoctorData] = useState([]);
    const [allUserData, setAllUserData] = useState([]);

    const [userProfile, setUserProfile] = useState({});

    const [appointmentData, setAppointmentData] = useState([]);

    const getAllUser = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/user/all-user");

            if (data !== false) {
                setAllUserData(data.result);
            } else {
                toast.error("Error");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getDepartment = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/admin/all-department");
            if (data !== false) {
                setDepartmentData(data.result);
            } else {
                toast.error("Error");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getDoctorData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/admin/all-doctor");
            if (data !== false) {
                setDoctorData(data.result);
            } else {
                toast.error("Error");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getAppointments = async () => {
        try {
            const url = backendUrl + "/api/user/appointments";

            let headers = {
                Authorization: "Bearer " + token,
            };

            const { data } = await axios.get(url, {
                headers: headers,
            });

            if (data !== false) {
                setAppointmentData(data);
            } else {
                toast.error("Error");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getUserProfile = async () => {
        try {
            const url = backendUrl + "/api/user/profile";
            let headers = {
                Authorization: "Bearer " + token,
            };
            const { data } = await axios.get(url, {
                headers: headers,
            });

            if (data !== null) {
                setUserProfile(data.result);
                console.log("userprofile", data.result);

                localStorage.setItem("userId", data.result._id);
            } else {
                toast.error("Error");
            }
        } catch (error) {
            console.error("Lỗi khi gọi API user profile:", error.message);
        }
    };

    const formatDateHeader = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // tháng bắt đầu từ 0
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const value = {
        backendUrl,
        token,
        setToken,
        departmentData,
        doctorData,
        appointmentData,
        formatDateHeader,
        getAppointments,
        allUserData,
        userProfile,
        getUserProfile,
    };

    useEffect(() => {
        getDepartment();
        getDoctorData();
        getAllUser();
    }, []);

    useEffect(() => {
        if (token) {
            getAppointments();
            getUserProfile();
        }
    }, [token]);

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;

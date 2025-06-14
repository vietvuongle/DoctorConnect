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

    const [topReview, setTopReview] = useState([]);

    const [clinicData, setClinicData] = useState([]);

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

    const getClinicData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/admin/all-clinic");
            if (data !== false) {
                setClinicData(data.result);
                console.log("clinicData", data.result);
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
        } catch (error) {}
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

                localStorage.setItem("userId", data.result._id);
            } else {
                toast.error("Error");
            }
        } catch (error) {
            console.error("Lỗi khi gọi API user profile:", error.message);
        }
    };

    const getTopReview = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/user/top-review");

            if (data !== null) {
                setTopReview(data.result);
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

    const handleSmoothScroll = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
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
        topReview,
        getTopReview,
        handleSmoothScroll,
        clinicData,
    };

    useEffect(() => {
        getDepartment();
        getDoctorData();
        getAllUser();
        getTopReview();
        getClinicData();
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

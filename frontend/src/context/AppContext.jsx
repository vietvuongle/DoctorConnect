import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : false);

    const [departmentData, setDepartmentData] = useState([]);

    const [doctorData, setDoctorData] = useState([]);

    const [appointmentData, setAppointmentData] = useState([]);

    const getDepartment = async () => {
        try {
            // const url = backendUrl + "/api/admin/all-department";

            // let headers = {
            //     Authorization: "Bearer " + token,
            // };

            // const { data } = await axios.get(url, {
            //     headers: headers,
            // });

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
            // const url = backendUrl + "/api/admin/all-doctor";
            // let headers = {
            //     Authorization: "Bearer " + token,
            // };
            // const { data } = await axios.get(url, {
            //     headers: headers,
            // });

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
    };

    useEffect(() => {
        getDepartment();
        getDoctorData();
    }, []);

    useEffect(() => {
        if (token) {
            getAppointments();
        }
    }, [token, appointmentData]);

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;

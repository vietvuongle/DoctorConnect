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

    const value = {
        backendUrl,
        token,
        setToken,
        departmentData,
        doctorData,
    };

    useEffect(() => {
        getDepartment();
        getDoctorData();
    }, []);

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;

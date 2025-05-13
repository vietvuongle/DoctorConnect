import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "");
    const [departmentData, setDepartmentData] = useState([]);
    const [doctorData, setDoctorData] = useState([]);

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

    const getDepartment = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/admin/all-department", { headers: { aToken } });

            if (data !== false) {
                setDepartmentData(data.result);
            } else {
                toast.error("Error");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const value = {
        backendUrl,
        aToken,
        setAToken,
        departmentData,
        setDepartmentData,
        doctorData,
        getDepartment,
    };

    useEffect(() => {
        getDepartment();
        getDoctorData();
    }, []);

    return <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>;
};

export default AdminContextProvider;

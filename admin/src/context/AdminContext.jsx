import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "");
    const [departmentData, setDepartmentData] = useState([]);

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
    };

    useEffect(() => {
        getDepartment();
    }, []);

    return <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>;
};

export default AdminContextProvider;

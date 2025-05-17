import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : false);
    const [departmentData, setDepartmentData] = useState([]);
    const [doctorData, setDoctorData] = useState([]);
    const [appointmentData, setAppointmentData] = useState([]);

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
            const { data } = await axios.get(backendUrl + "/api/admin/all-department");

            if (data !== false) {
                setDepartmentData(data.result);
            } else {
                toast.error("Đã xảy ra lỗi");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getAllAppointment = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/admin/all-appointment", { headers: { Authorization: `Bearer ${aToken}` } });

            console.log("data", data);

            if (data !== false) {
                setAppointmentData(data.result);
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
        appointmentData,
        getDepartment,
        getDoctorData,
    };

    useEffect(() => {
        getDepartment();
        getDoctorData();
    }, []); // chỉ chạy 1 lần khi mount

    useEffect(() => {
        if (aToken) {
            getAllAppointment();
        }
    }, [aToken]); // chạy mỗi khi aToken thay đổi

    return <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>;
};

export default AdminContextProvider;

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

    const calculateAge = (dobString) => {
        const dob = new Date(dobString);
        const today = new Date();

        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        return age;
    };

    const formatDateHeader = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // tháng bắt đầu từ 0
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    function removeVietnameseTones(str) {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D");
    }

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
        formatDateHeader,
        calculateAge,
        removeVietnameseTones,
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

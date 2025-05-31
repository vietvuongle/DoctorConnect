import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [dToken, setDToken] = useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken") : false);

    const [doctorUser, setDoctorUser] = useState({});
    const [appointmentData, setAppointmentData] = useState([]);

    const getdoctorByUserId = async () => {
        try {
            const url = backendUrl + "/api/doctor/getDoctor";
            let headers = {
                Authorization: "Bearer " + dToken,
            };
            const { data } = await axios.get(url, {
                headers: headers,
            });
            if (data !== false) {
                localStorage.setItem("doctorId", data.result.id);
                setDoctorUser(data.result);
            } else {
                toast.error("Có lỗi xảy ra");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getAllAppointment = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/doctor/appointments", { headers: { Authorization: `Bearer ${dToken}` } });

            if (data !== false) {
                setAppointmentData(data);
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
        dToken,
        setDToken,
        backendUrl,
        doctorUser,
        appointmentData,
        getAllAppointment,
        calculateAge,
        formatDateHeader,
        removeVietnameseTones,
    };

    useEffect(() => {
        if (dToken) {
            getdoctorByUserId();
            getAllAppointment();
        }
    }, [dToken]);

    return <DoctorContext.Provider value={value}>{props.children}</DoctorContext.Provider>;
};

export default DoctorContextProvider;

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ClinicContext = createContext();

const ClinicContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [cToken, setCToken] = useState(localStorage.getItem("cToken") ? localStorage.getItem("cToken") : false);

    const [clinicUser, setClinicUser] = useState({});
    const [doctorData, setDoctorData] = useState([]);
    const [appointmentData, setAppointmentData] = useState([]);

    const getClinicByClinicId = async () => {
        try {
            const url = backendUrl + "/api/clinic/getClinic";
            let headers = {
                Authorization: "Bearer " + cToken,
            };
            const { data } = await axios.get(url, {
                headers: headers,
            });
            if (data !== false) {
                localStorage.setItem("clinicId", data.result.id);
                setClinicUser(data.result);
            } else {
                toast.error("Có lỗi xảy ra");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getDoctorDataByClinicId = async () => {
        try {
            const url = backendUrl + "/api/clinic/all-doctor";
            let headers = {
                Authorization: "Bearer " + cToken,
            };
            const { data } = await axios.get(url, {
                headers: headers,
            });

            if (data !== false) {
                setDoctorData(data.result);
            } else {
                toast.error("Error");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getAllAppointmentByClinicId = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/clinic/appointments", { headers: { Authorization: `Bearer ${cToken}` } });

            if (data !== false) {
                setAppointmentData(data.result);
                console.log("appointmentData ", data);
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
        cToken,
        setCToken,
        clinicUser,
        doctorData,
        backendUrl,
        getClinicByClinicId,
        getDoctorDataByClinicId,
        getAllAppointmentByClinicId,
        appointmentData,
        formatDateHeader,
        removeVietnameseTones,
        calculateAge,
    };

    useEffect(() => {
        if (cToken) {
            getClinicByClinicId();
            getDoctorDataByClinicId();
            getAllAppointmentByClinicId();
        }
    }, [cToken]);

    return <ClinicContext.Provider value={value}>{props.children}</ClinicContext.Provider>;
};

export default ClinicContextProvider;

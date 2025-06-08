import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ClinicContext = createContext();

const ClinicContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [cToken, setCToken] = useState(localStorage.getItem("cToken") ? localStorage.getItem("cToken") : false);

    const [clinicUser, setClinicUser] = useState({});

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

    const value = {
        cToken,
        setCToken,
        clinicUser,
    };

    useEffect(() => {
        if (cToken) {
            getClinicByClinicId();
        }
    }, [cToken]);

    return <ClinicContext.Provider value={value}>{props.children}</ClinicContext.Provider>;
};

export default ClinicContextProvider;

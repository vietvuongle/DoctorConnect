import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken") : false);

  const [doctorUser, setDoctorUser] = useState({});

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
        setDoctorUser(data.result);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    doctorUser,
  };

  useEffect(() => {
    if (dToken) {
      getdoctorByUserId();
    }
  }, []);

  return <DoctorContext.Provider value={value}>{props.children}</DoctorContext.Provider>;
};

export default DoctorContextProvider;
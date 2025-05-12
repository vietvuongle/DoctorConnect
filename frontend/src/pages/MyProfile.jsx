import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const MyProfile = () => {
    const { token, backendUrl } = useContext(AppContext);
    const [userProfile, setUserProfile] = useState({});

    const getUserProfile = async () => {
        try {
            console.log("token: ", token);

            const { data } = await axios.get(backendUrl + "/api/user/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(data);

            if (data !== null) {
                setUserProfile(data.result);
            } else {
                toast.error("Error");
            }
        } catch (error) {
            console.error("Lỗi khi gọi API user profile:", error.message);
        }
    };

    useEffect(() => {
        getUserProfile();
    }, []);

    return (
        <div>
            <p>Email: {userProfile.email}</p>
        </div>
    );
};
export default MyProfile;

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const MyProfile = () => {
    const { token, backendUrl } = useContext(AppContext);
    const [userProfile, setUserProfile] = useState({});

    const getUserProfile = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/user/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

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

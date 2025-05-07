import React from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext);

    const logout = () => {
        localStorage.removeItem("aToken");
        setAToken(false);
    };

    return (
        <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
            <div className="flex items-center gap-2 text-xs">
                <img className="w-36 sm:w-40 cursor-pointer" src={assets.logo5} alt="" />
                <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">Admin</p>
            </div>

            <button onClick={logout} className="bg-primary text-white text-sm px-10 py-2 my-3 rounded-full">
                Đăng xuất
            </button>
        </div>
    );
};

export default Navbar;

import React from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";

import { UserIcon, UsersIcon, CalendarIcon, ClipboardListIcon, SettingsIcon, LogOutIcon, PlusIcon, CheckIcon, XIcon, BarChartIcon, PieChartIcon, TrendingUpIcon, AlertCircleIcon } from "lucide-react";

import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
// import { LogOut as LogOutIcon } from "lucide-react";

const Sidebar = () => {
    const { aToken, setAToken } = useContext(AdminContext);
    const { dToken, setDToken } = useContext(DoctorContext);
    const navigate = useNavigate();

    const logout = () => {
        if (aToken) {
            localStorage.removeItem("aToken");
            setAToken(false);
        } else if (dToken) {
            localStorage.removeItem("dToken");
            setDToken(false);
        }
        navigate("/login");
    };

    return (
        <div>
            {aToken ? (
                <div className=" md:flex md:w-64 md:flex-col">
                    <div className="flex flex-col flex-grow pt-5 bg-white border-r overflow-y-auto h-screen">
                        <nav className="flex-1 px-2 pb-4 space-y-1.5">
                            <NavLink to={"/admin/home"} className={({ isActive }) => `ml-1 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                                <BarChartIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                                <p className="hidden md:block">Dashboard</p>
                            </NavLink>
                            <NavLink to={"/admin/schedule"} className={({ isActive }) => `ml-1 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                                <CalendarIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                                <p className="hidden md:block">Lịch hẹn</p>
                            </NavLink>
                            <NavLink to={"/admin/add-doctor"} className={({ isActive }) => `ml-1 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                                <UserIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                                <p className="hidden md:block">Bác sĩ</p>
                            </NavLink>
                            <NavLink to={"/admin/patient"} className={({ isActive }) => `ml-1 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                                <UsersIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                                <p className="hidden md:block">Bệnh nhân</p>
                            </NavLink>

                            <NavLink to={"/admin/department"} className={({ isActive }) => `ml-1 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                                <ClipboardListIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                                <p className="hidden md:block">Khoa</p>
                            </NavLink>
                            <NavLink to={"/admin/setting"} className={({ isActive }) => `ml-1 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                                <SettingsIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                                <p className="hidden md:block">Cài đặt</p>
                            </NavLink>
                            <NavLink to={"/admin/chat"} className={({ isActive }) => `ml-1 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                                <ChatBubbleOutlineIcon sx={{ fontSize: 25, color: "#4b5563" }} className="mr-3 flex-shrink-0 h-6 w-6" />
                                <p className="hidden md:block">Chat</p>
                            </NavLink>
                            <button onClick={logout} className="ml-1 mt-2 group flex items-center px-2 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50">
                                <LogOutIcon className="flex-shrink-0 mr-3 h-6 w-6" />
                                <p className="hidden md:block">Đăng xuất</p>
                            </button>
                        </nav>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Sidebar;

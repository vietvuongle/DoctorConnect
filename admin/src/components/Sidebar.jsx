import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { UserIcon, UsersIcon, CalendarIcon, ClipboardListIcon, SettingsIcon, LogOutIcon, PlusIcon, CheckIcon, XIcon, BarChartIcon, PieChartIcon, TrendingUpIcon, AlertCircleIcon, FileTextIcon, BellIcon } from "lucide-react";

import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
    const { aToken, setAToken } = useContext(AdminContext);
    const { dToken, setDToken, doctorUser } = useContext(DoctorContext);

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
            {aToken && (
                <div className="lg:col-span-1 mt-5 ml-5 md:flex md:w-72 md:flex-col">
                    <div className="rounded-lg shadow overflow-hidden">
                        <nav className="flex-1 px-2 pb-4 space-y-1.5">
                            <NavLink to={"/"} className={({ isActive }) => `ml-1 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                                <BarChartIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                                <p className="hidden md:block">Dashboard</p>
                            </NavLink>
                            <NavLink to={"/admin/schedule"} className={({ isActive }) => `ml-1 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                                <CalendarIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                                <p className="hidden md:block">Lịch hẹn</p>
                            </NavLink>
                            <NavLink to={"/admin/doctor"} className={({ isActive }) => `ml-1 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
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
                            <button onClick={logout} className="ml-1 mt-2 group w-full flex items-center px-2 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50">
                                <LogOutIcon className="flex-shrink-0 mr-3 h-6 w-6" />
                                <p className="hidden md:block">Đăng xuất</p>
                            </button>
                        </nav>
                    </div>
                </div>
            )}
            {dToken && (
                <div className="lg:col-span-1 mt-5 ml-5 mr-5 md:flex md:w-72 md:flex-col">
                    <div className="rounded-lg shadow overflow-hidden">
                        <div className="p-6 bg-blue-600 text-white">
                            <div className="flex items-center">
                                <div className="text-blue-600 flex items-center justify-center text-2xl font-bold">
                                    <img className="w-16 h-16 rounded-full" src={doctorUser.image} alt="" />
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-lg font-semibold">BS. {doctorUser.name}</h2>
                                    <p className="text-blue-200">{doctorUser.speciality}</p>
                                </div>
                            </div>
                        </div>
                        <nav className="flex-1 px-4 space-y-1 my-4 ">
                            <NavLink to={"/doctor/home"} className={({ isActive }) => `ml-1 group flex items-center px-2 py-3 text-sm font-medium rounded-md w-full ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                                <CalendarIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                                <p className="hidden md:block">Lịch khám</p>
                            </NavLink>

                            <NavLink to={"/doctor/patient"} className={({ isActive }) => `ml-1 group flex items-center px-2 py-3 text-sm font-medium rounded-md w-full ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                                <UserIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                                <p className="hidden md:block">Bệnh nhân</p>
                            </NavLink>

                            <NavLink to={"/doctor/view-medical"} className={({ isActive }) => `ml-1 group flex items-center px-2 py-3 text-sm font-medium rounded-md w-full ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                                <FileTextIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                                <p className="hidden md:block">Hồ sơ y tế</p>
                            </NavLink>

                            <NavLink to={"/doctor/notification"} className={({ isActive }) => `ml-1 group flex items-center px-2 py-3 text-sm font-medium rounded-md w-full ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                                <BellIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                                <p className="hidden md:block">Thông báo</p>
                                <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
                            </NavLink>

                            <NavLink to={"/doctor/setting"} className={({ isActive }) => `ml-1 group flex items-center px-2 py-3 text-sm font-medium rounded-md w-full ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                                <SettingsIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                                <p className="hidden md:block">Cài đặt</p>
                            </NavLink>

                            <button onClick={logout} className="ml-1 mt-4 group flex items-center px-2 py-3 text-sm font-medium rounded-md w-full text-red-600 hover:bg-red-50">
                                <LogOutIcon className="flex-shrink-0 mr-3 h-6 w-6" />
                                <p className="hidden md:block">Đăng xuất</p>
                            </button>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;

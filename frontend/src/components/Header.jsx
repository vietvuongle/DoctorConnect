import React, { useState } from "react";
import { MenuIcon, X as CloseIcon, PhoneCall as PhoneCallIcon, Clock as ClockIcon } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { token, setToken, userProfile } = useContext(AppContext);

    const logout = () => {
        setToken(false);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    };

    return (
        <header className="w-full bg-white shadow-sm">
            {/* Main navigation */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img onClick={() => navigate("/")} className="w-44 cursor-pointer" src={assets.logo5} alt="" />
                    </div>
                    {/* Desktop navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <NavLink to="/" className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600 transition-colors")}>
                            Trang chủ
                        </NavLink>

                        <NavLink to="/services" className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600 transition-colors")}>
                            Dịch vụ
                        </NavLink>

                        <NavLink to="/doctors" className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600 transition-colors")}>
                            Bác sĩ
                        </NavLink>

                        <NavLink to="/appointment" className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600 transition-colors")}>
                            Đặt lịch
                        </NavLink>

                        <NavLink to="/contact" className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600 transition-colors")}>
                            Liên hệ
                        </NavLink>

                        {token ? (
                            <div className="flex items-center gap-4 cursor-pointer group relative">
                                <img className="w-10 rounded-full" src={userProfile.image ? userProfile.image : assets.upload_area} alt="" />
                                <img className="w-2.5" src={assets.dropdown_icon} alt="" />
                                <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                                    <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                                        <p onClick={() => navigate("/my-profile")} className="hover:text-black cursor-pointer">
                                            Hồ sơ
                                        </p>
                                        <p onClick={() => navigate("/my-appointments")} className="hover:text-black cursor-pointer">
                                            Lịch đặt của tôi
                                        </p>
                                        <p onClick={logout} className="hover:text-black cursor-pointer">
                                            Đăng xuất
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => navigate("/login")} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                                Đặt lịch ngay
                            </button>
                        )}
                    </nav>
                    {/* Mobile menu button */}
                    <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <MenuIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>
            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white w-full absolute z-10 shadow-lg">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex justify-end">
                            <button onClick={() => setIsMenuOpen(false)}>
                                <CloseIcon className="h-6 w-6 text-gray-600" />
                            </button>
                        </div>
                        <nav className="flex flex-col space-y-4 mt-4 pb-6">
                            <Link to="/" className="text-blue-600 font-medium">
                                Trang chủ
                            </Link>
                            <Link to="#services" className="text-gray-600 hover:text-blue-600 transition-colors">
                                Dịch vụ
                            </Link>
                            <Link to="/doctors" className="text-gray-600 hover:text-blue-600 transition-colors">
                                Bác sĩ
                            </Link>
                            <Link to="#booking" className="text-gray-600 hover:text-blue-600 transition-colors">
                                Đặt lịch
                            </Link>
                            <Link to="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                                Liên hệ
                            </Link>
                            <button onClick={() => navigate("/login")} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full">
                                Đặt lịch ngay
                            </button>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}

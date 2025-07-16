import React from "react";
import { Facebook as FacebookIcon, Instagram as InstagramIcon, Youtube as YoutubeIcon, PhoneCall as PhoneCallIcon, MapPin as MapPinIcon, Mail as MailIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export function Footer() {
    const handleSmoothScroll = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="bg-gray-800 text-white pt-12 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">DoctorConnect</h3>
                        <p className="text-gray-300 mb-4">Phòng khám đa khoa chất lượng cao với đội ngũ y bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <FacebookIcon className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <InstagramIcon className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <YoutubeIcon className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Dịch vụ</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Khám tổng quát
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Khám chuyên khoa
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Xét nghiệm
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Chẩn đoán hình ảnh
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Tư vấn sức khỏe
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Liên kết nhanh</h3>
                        <ul className="space-y-2">
                            <li>
                                <NavLink to="/" onClick={handleSmoothScroll} className="text-gray-300 hover:text-white transition-colors">
                                    Trang chủ
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/services" onClick={handleSmoothScroll} className="text-gray-300 hover:text-white transition-colors">
                                    Dịch vụ
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/doctors" onClick={handleSmoothScroll} className="text-gray-300 hover:text-white transition-colors">
                                    Bác sĩ
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/appointment" onClick={handleSmoothScroll} className="text-gray-300 hover:text-white transition-colors">
                                    Đặt lịch
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" onClick={handleSmoothScroll} className="text-gray-300 hover:text-white transition-colors">
                                    Hợp tác
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Liên hệ</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <MapPinIcon className="h-5 w-5 mr-2 text-gray-300" />
                                <span className="text-gray-300">75 Nguyễn Huệ, Thừa Thiên Huế</span>
                            </li>
                            <li className="flex items-center">
                                <PhoneCallIcon className="h-5 w-5 mr-2 text-gray-300" />
                                <span className="text-gray-300">079.679.4969</span>
                            </li>
                            <li className="flex items-center">
                                <MailIcon className="h-5 w-5 mr-2 text-gray-300" />
                                <span className="text-gray-300">vietvuongf@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-6 text-center">
                    <p className="text-gray-400">© {new Date().getFullYear()} DoctorConnect. Lê Viết Vương</p>
                </div>
            </div>
        </footer>
    );
}

import React, { useState } from "react";
import { MapPin as MapPinIcon, Phone as PhoneIcon, Mail as MailIcon, Clock as ClockIcon } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMsg("");
        setErrorMsg("");

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setErrorMsg("Bạn cần đăng nhập để gửi tin nhắn.");
                setLoading(false);
                return;
            }

            const res = await fetch("http://localhost:8081/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Gửi token ở đây
                },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setSuccessMsg("Cảm ơn bạn đã gửi tin nhắn. Chúng tôi sẽ phản hồi sớm!");
                setForm({ name: "", email: "", phone: "", message: "" });
            } else {
                const data = await res.json();
                setErrorMsg(data.message || "Gửi tin nhắn thất bại, vui lòng thử lại.");
            }
        } catch (error) {
            setErrorMsg("Lỗi kết nối server, vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section id="contact" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Liên hệ với chúng tôi</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Có thắc mắc hoặc cần hỗ trợ? Hãy liên hệ với chúng tôi qua thông tin bên dưới hoặc gửi tin nhắn trực tiếp.</p>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/2 bg-blue-50 p-8 rounded-lg">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Thông tin liên hệ</h3>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <MapPinIcon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Địa chỉ</h4>
                                        <p className="text-gray-600">75 Nguyễn Huệ, Thừa Thiên, Huế</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <PhoneIcon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Điện thoại</h4>
                                        <p className="text-gray-600">1900 1234</p>
                                        <p className="text-gray-600">079.679.4969</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <MailIcon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Email</h4>
                                        <p className="text-gray-600">vietvuongf@gmail.com</p>
                                        <p className="text-gray-600">hotro@phongkham.vn</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <ClockIcon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Giờ làm việc</h4>
                                        <p className="text-gray-600">Thứ 2 - Thứ 7: 7:00 - 20:00</p>
                                        <p className="text-gray-600">Chủ nhật: 7:00 - 12:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Gửi tin nhắn cho chúng tôi</h3>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                                        Họ và tên
                                    </label>
                                    <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="name" placeholder="Nhập họ và tên của bạn" value={form.name} onChange={handleChange} required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" id="email" placeholder="Nhập email của bạn" value={form.email} onChange={handleChange} required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                                        Số điện thoại
                                    </label>
                                    <input className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="tel" id="phone" placeholder="Nhập số điện thoại của bạn" value={form.phone} onChange={handleChange} />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="message">
                                        Tin nhắn
                                    </label>
                                    <textarea className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" id="message" rows={4} placeholder="Nhập nội dung tin nhắn" value={form.message} onChange={handleChange} required></textarea>
                                </div>

                                {successMsg && <p className="mb-4 text-green-600">{successMsg}</p>}
                                {errorMsg && <p className="mb-4 text-red-600">{errorMsg}</p>}

                                <button type="submit" disabled={loading} className={`w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
                                    {loading ? "Đang gửi..." : "Gửi tin nhắn"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Contact;

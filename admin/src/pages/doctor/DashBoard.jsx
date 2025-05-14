import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CalendarIcon, ClockIcon, UserIcon, FileTextIcon, BellIcon, SettingsIcon, LogOutIcon, CheckIcon, XIcon } from "lucide-react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
const Dashboard = () => {
    const { setDToken, doctorUser } = useContext(DoctorContext);

    const [activeTab, setActiveTab] = useState("appointments");
    const [currentDate, setCurrentDate] = useState(new Date());
    // Mock data
    const upcomingAppointments = [
        {
            id: 1,
            patientName: "Nguyễn Văn X",
            patientAge: 45,
            service: "Khám tim mạch",
            date: "15/06/2023",
            time: "09:30",
            status: "confirmed",
        },
        {
            id: 2,
            patientName: "Trần Thị Y",
            patientAge: 32,
            service: "Tư vấn dinh dưỡng",
            date: "15/06/2023",
            time: "10:30",
            status: "confirmed",
        },
        {
            id: 3,
            patientName: "Lê Văn Z",
            patientAge: 28,
            service: "Khám tổng quát",
            date: "15/06/2023",
            time: "11:30",
            status: "confirmed",
        },
    ];
    const pendingAppointments = [
        {
            id: 4,
            patientName: "Phạm Văn A",
            patientAge: 50,
            service: "Khám tim mạch",
            date: "16/06/2023",
            time: "09:00",
            status: "pending",
        },
        {
            id: 5,
            patientName: "Hoàng Thị B",
            patientAge: 35,
            service: "Khám tổng quát",
            date: "16/06/2023",
            time: "10:00",
            status: "pending",
        },
    ];
    const renderStatusBadge = (status) => {
        switch (status) {
            case "confirmed":
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Đã xác nhận</span>;
            case "pending":
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Chờ xác nhận</span>;
            case "completed":
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Hoàn thành</span>;
            case "cancelled":
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Đã hủy</span>;
            default:
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
        }
    };
    const formatDateHeader = (date) => {
        return new Intl.DateTimeFormat("vi-VN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);
    };

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("aToken");
        localStorage.removeItem("dToken");
        setDToken(false);
        navigate("/login");
    };

    return (
        <div className="bg-gray-100 max-h-screen overflow-y-auto">
            <div className="container mx-auto py-8 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
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
                            <nav className="p-4">
                                <ul className="space-y-2">
                                    <li>
                                        <button onClick={() => setActiveTab("appointments")} className={`w-full flex items-center px-4 py-2 rounded-lg ${activeTab === "appointments" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}>
                                            <CalendarIcon className="w-5 h-5 mr-3" />
                                            <span>Lịch khám</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => setActiveTab("patients")} className={`w-full flex items-center px-4 py-2 rounded-lg ${activeTab === "patients" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}>
                                            <UserIcon className="w-5 h-5 mr-3" />
                                            <span>Bệnh nhân</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => setActiveTab("medical-records")} className={`w-full flex items-center px-4 py-2 rounded-lg ${activeTab === "medical-records" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}>
                                            <FileTextIcon className="w-5 h-5 mr-3" />
                                            <span>Hồ sơ y tế</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => setActiveTab("notifications")} className={`w-full flex items-center px-4 py-2 rounded-lg ${activeTab === "notifications" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}>
                                            <BellIcon className="w-5 h-5 mr-3" />
                                            <span>Thông báo</span>
                                            <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => setActiveTab("settings")} className={`w-full flex items-center px-4 py-2 rounded-lg ${activeTab === "settings" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}>
                                            <SettingsIcon className="w-5 h-5 mr-3" />
                                            <span>Cài đặt</span>
                                        </button>
                                    </li>
                                    <li className="pt-4 border-t">
                                        <button onClick={logout} className="w-full flex items-center px-4 py-2 rounded-lg text-red-600 hover:bg-red-50">
                                            <LogOutIcon className="w-5 h-5 mr-3" />
                                            <span>Đăng xuất</span>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    {/* Main content */}
                    <div className="lg:col-span-3">
                        {activeTab === "appointments" && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-lg shadow overflow-hidden">
                                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                        <h3 className="text-lg font-medium text-gray-800">Lịch khám ngày: {formatDateHeader(currentDate)}</h3>
                                        <div className="flex space-x-2">
                                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Hôm nay</button>
                                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">&lt; Trước</button>
                                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Sau &gt;</button>
                                        </div>
                                    </div>
                                    <div className="divide-y divide-gray-200">
                                        {upcomingAppointments.map((appointment) => (
                                            <div key={appointment.id} className="p-6">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
                                                        <p className="text-sm text-gray-500">
                                                            {appointment.patientAge} tuổi • {appointment.service}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div className="text-right mr-4">
                                                            <div className="text-gray-900 font-medium">{appointment.time}</div>
                                                            <div className="text-sm text-gray-500">{appointment.date}</div>
                                                        </div>
                                                        <div>{renderStatusBadge(appointment.status)}</div>
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex space-x-3">
                                                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Xem hồ sơ</button>
                                                    <button className="text-sm text-green-600 hover:text-green-800 font-medium">Bắt đầu khám</button>
                                                    <button className="text-sm text-red-600 hover:text-red-800 font-medium">Hoãn lịch</button>
                                                </div>
                                            </div>
                                        ))}
                                        {upcomingAppointments.length === 0 && <div className="p-6 text-center text-gray-500">Không có lịch khám nào trong ngày hôm nay.</div>}
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg shadow overflow-hidden">
                                    <div className="px-6 py-4 border-b border-gray-200">
                                        <h3 className="text-lg font-medium text-gray-800">Lịch hẹn chờ xác nhận</h3>
                                    </div>
                                    <div className="divide-y divide-gray-200">
                                        {pendingAppointments.map((appointment) => (
                                            <div key={appointment.id} className="p-6">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
                                                        <p className="text-sm text-gray-500">
                                                            {appointment.patientAge} tuổi • {appointment.service}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div className="text-right mr-4">
                                                            <div className="text-gray-900 font-medium">{appointment.time}</div>
                                                            <div className="text-sm text-gray-500">{appointment.date}</div>
                                                        </div>
                                                        <div>{renderStatusBadge(appointment.status)}</div>
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex space-x-3">
                                                    <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                                        <CheckIcon className="w-4 h-4 mr-1" />
                                                        Xác nhận
                                                    </button>
                                                    <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                        <XIcon className="w-4 h-4 mr-1" />
                                                        Từ chối
                                                    </button>
                                                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Xem hồ sơ</button>
                                                </div>
                                            </div>
                                        ))}
                                        {pendingAppointments.length === 0 && <div className="p-6 text-center text-gray-500">Không có lịch hẹn nào đang chờ xác nhận.</div>}
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "patients" && (
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Danh sách bệnh nhân</h2>
                                <div className="mb-4">
                                    <div className="relative">
                                        <input type="text" placeholder="Tìm kiếm bệnh nhân..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Bệnh nhân
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Thông tin liên hệ
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Lịch sử khám
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Thao tác
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">NX</div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">Nguyễn Văn X</div>
                                                            <div className="text-sm text-gray-500">45 tuổi, Nam</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">nguyenvanx@example.com</div>
                                                    <div className="text-sm text-gray-500">0987654321</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">3 lần khám</div>
                                                    <div className="text-sm text-gray-500">Gần nhất: 15/05/2023</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <button className="text-blue-600 hover:text-blue-800 mr-3">Xem hồ sơ</button>
                                                    <button className="text-green-600 hover:text-green-800">Lịch sử khám</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">TY</div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">Trần Thị Y</div>
                                                            <div className="text-sm text-gray-500">32 tuổi, Nữ</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">tranthiy@example.com</div>
                                                    <div className="text-sm text-gray-500">0912345678</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">1 lần khám</div>
                                                    <div className="text-sm text-gray-500">Gần nhất: 10/06/2023</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <button className="text-blue-600 hover:text-blue-800 mr-3">Xem hồ sơ</button>
                                                    <button className="text-green-600 hover:text-green-800">Lịch sử khám</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">LZ</div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">Lê Văn Z</div>
                                                            <div className="text-sm text-gray-500">28 tuổi, Nam</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">levanz@example.com</div>
                                                    <div className="text-sm text-gray-500">0978123456</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">2 lần khám</div>
                                                    <div className="text-sm text-gray-500">Gần nhất: 01/06/2023</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <button className="text-blue-600 hover:text-blue-800 mr-3">Xem hồ sơ</button>
                                                    <button className="text-green-600 hover:text-green-800">Lịch sử khám</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="text-sm text-gray-700">Hiển thị 1-3 của 25 bệnh nhân</div>
                                    <div className="flex space-x-2">
                                        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">Trước</button>
                                        <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">1</button>
                                        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">2</button>
                                        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">3</button>
                                        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Sau</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "medical-records" && (
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Hồ sơ y tế</h2>
                                <p className="text-gray-600 mb-4">Quản lý hồ sơ y tế của bệnh nhân. Bạn có thể xem và cập nhật thông tin y tế, kết quả xét nghiệm, và lịch sử điều trị.</p>
                                <div className="mb-6">
                                    <div className="relative">
                                        <input type="text" placeholder="Tìm kiếm hồ sơ theo tên bệnh nhân..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-blue-700">Chọn bệnh nhân từ danh sách để xem hồ sơ y tế chi tiết.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-8 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">Chưa có hồ sơ nào được chọn</h3>
                                    <p className="mt-1 text-sm text-gray-500">Chọn bệnh nhân từ danh sách để xem và quản lý hồ sơ y tế.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;

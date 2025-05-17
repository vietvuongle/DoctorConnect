import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserIcon, UsersIcon, CalendarIcon, ClipboardListIcon, SettingsIcon, LogOutIcon, PlusIcon, CheckIcon, XIcon, BarChartIcon, PieChartIcon, TrendingUpIcon, AlertCircleIcon } from "lucide-react";
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    // Mock data
    const stats = [
        {
            label: "Tổng số lịch hẹn",
            value: "1,248",
            change: "+12%",
            icon: <CalendarIcon className="w-8 h-8 text-blue-600" />,
        },
        {
            label: "Tổng số bệnh nhân",
            value: "854",
            change: "+7%",
            icon: <UsersIcon className="w-8 h-8 text-green-600" />,
        },
        {
            label: "Tổng số bác sĩ",
            value: "32",
            change: "+2",
            icon: <UserIcon className="w-8 h-8 text-purple-600" />,
        },
        {
            label: "Tỷ lệ hoàn thành",
            value: "94%",
            change: "+3%",
            icon: <CheckIcon className="w-8 h-8 text-yellow-600" />,
        },
    ];
    const pendingDoctors = [
        {
            id: 1,
            name: "Bác sĩ Đỗ Thị M",
            specialty: "Nhi khoa",
            email: "dothim@example.com",
            phone: "0912345678",
            status: "pending",
        },
        {
            id: 2,
            name: "Bác sĩ Vũ Văn N",
            specialty: "Mắt",
            email: "vuvann@example.com",
            phone: "0987654321",
            status: "pending",
        },
    ];
    const recentAppointments = [
        {
            id: 1,
            patient: "Nguyễn Văn X",
            doctor: "Bác sĩ Nguyễn Văn A",
            service: "Khám tim mạch",
            date: "15/06/2023",
            status: "confirmed",
        },
        {
            id: 2,
            patient: "Trần Thị Y",
            doctor: "Bác sĩ Trần Thị B",
            service: "Da liễu",
            date: "15/06/2023",
            status: "completed",
        },
        {
            id: 3,
            patient: "Lê Văn Z",
            doctor: "Bác sĩ Lê Văn C",
            service: "Khám tổng quát",
            date: "14/06/2023",
            status: "cancelled",
        },
        {
            id: 4,
            patient: "Phạm Văn A",
            doctor: "Bác sĩ Nguyễn Văn A",
            service: "Khám tim mạch",
            date: "14/06/2023",
            status: "confirmed",
        },
        {
            id: 5,
            patient: "Hoàng Thị B",
            doctor: "Bác sĩ Lê Văn C",
            service: "Khám tổng quát",
            date: "13/06/2023",
            status: "completed",
        },
    ];
    const doctors = [
        {
            id: 1,
            name: "Bác sĩ Nguyễn Văn A",
            specialty: "Tim mạch",
            patients: 145,
            rating: 4.8,
        },
        {
            id: 2,
            name: "Bác sĩ Trần Thị B",
            specialty: "Da liễu",
            patients: 120,
            rating: 4.7,
        },
        {
            id: 3,
            name: "Bác sĩ Lê Văn C",
            specialty: "Nội tổng quát",
            patients: 98,
            rating: 4.9,
        },
        {
            id: 4,
            name: "Bác sĩ Phạm Thị D",
            specialty: "Tai mũi họng",
            patients: 87,
            rating: 4.6,
        },
        {
            id: 5,
            name: "Bác sĩ Hoàng Văn E",
            specialty: "Xương khớp",
            patients: 76,
            rating: 4.5,
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
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="flex">
                {/* Sidebar */}
                <div className="hidden md:flex md:w-64 md:flex-col">
                    <div className="flex flex-col flex-grow pt-5 bg-white border-r overflow-y-auto h-screen">
                        <div className="mt-8 flex-grow flex flex-col">
                            <nav className="flex-1 px-2 pb-4 space-y-1">
                                <button onClick={() => setActiveTab("dashboard")} className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${activeTab === "dashboard" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                                    <BarChartIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                                    Dashboard
                                </button>
                                <button onClick={() => setActiveTab("appointments")} className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${activeTab === "appointments" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                                    <CalendarIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                                    Lịch hẹn
                                </button>
                                <button onClick={() => setActiveTab("doctors")} className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${activeTab === "doctors" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                                    <UserIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                                    Bác sĩ
                                    {pendingDoctors.length > 0 && <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{pendingDoctors.length}</span>}
                                </button>
                                <button onClick={() => setActiveTab("patients")} className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${activeTab === "patients" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                                    <UsersIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                                    Bệnh nhân
                                </button>
                                <button onClick={() => setActiveTab("reports")} className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${activeTab === "reports" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                                    <ClipboardListIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                                    Báo cáo
                                </button>
                                <button onClick={() => setActiveTab("settings")} className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${activeTab === "settings" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                                    <SettingsIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                                    Cài đặt
                                </button>
                                <div className="pt-8">
                                    <div className="px-2 space-y-1">
                                        <Link to="/login" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50">
                                            <LogOutIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                                            Đăng xuất
                                        </Link>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                {/* Main content */}
                <div className="flex-1">
                    <main className="p-6">
                        {activeTab === "dashboard" && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                                    <div className="flex space-x-3">
                                        <select className="border border-gray-300 rounded-md text-sm p-2">
                                            <option>7 ngày qua</option>
                                            <option>30 ngày qua</option>
                                            <option>3 tháng qua</option>
                                            <option>Năm nay</option>
                                        </select>
                                        <button className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium">Tạo báo cáo</button>
                                    </div>
                                </div>
                                {/* Stats */}
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                    {stats.map((stat, index) => (
                                        <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                                            <div className="p-5">
                                                <div className="flex items-start">
                                                    <div className="flex-shrink-0">{stat.icon}</div>
                                                    <div className="ml-5 w-0 flex-1">
                                                        <dl>
                                                            <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
                                                            <dd>
                                                                <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                                                            </dd>
                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 px-5 py-3">
                                                <div className="text-sm">
                                                    <span className="font-medium text-green-600">{stat.change}</span>
                                                    <span className="text-gray-500">{" so với tháng trước"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Charts */}
                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 mt-6">
                                    <div className="bg-white overflow-hidden shadow rounded-lg">
                                        <div className="px-5 py-3 border-b border-gray-200">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">Lịch hẹn theo ngày</h3>
                                        </div>
                                        <div className="p-5">
                                            <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
                                                <TrendingUpIcon className="h-12 w-12 text-gray-400" />
                                                <span className="ml-2 text-gray-500">Biểu đồ lịch hẹn theo ngày</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white overflow-hidden shadow rounded-lg">
                                        <div className="px-5 py-3 border-b border-gray-200">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">Phân bổ theo chuyên khoa</h3>
                                        </div>
                                        <div className="p-5">
                                            <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
                                                <PieChartIcon className="h-12 w-12 text-gray-400" />
                                                <span className="ml-2 text-gray-500">Biểu đồ phân bổ theo chuyên khoa</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Recent appointments */}
                                <div className="mt-6">
                                    <h2 className="text-lg font-medium text-gray-900 mb-4">Lịch hẹn gần đây</h2>
                                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                        <ul className="divide-y divide-gray-200">
                                            {recentAppointments.map((appointment) => (
                                                <li key={appointment.id}>
                                                    <div className="px-4 py-4 flex items-center sm:px-6">
                                                        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                                            <div>
                                                                <div className="flex text-sm">
                                                                    <p className="font-medium text-blue-600 truncate">{appointment.patient}</p>
                                                                    <p className="ml-1 flex-shrink-0 font-normal text-gray-500">với {appointment.doctor}</p>
                                                                </div>
                                                                <div className="mt-2 flex">
                                                                    <div className="flex items-center text-sm text-gray-500">
                                                                        <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                                                        <p>
                                                                            {appointment.date} • {appointment.service}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">{renderStatusBadge(appointment.status)}</div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                            <button
                                                onClick={() => setActiveTab("appointments")}
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Xem tất cả
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "doctors" && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-2xl font-bold text-gray-900">Quản lý bác sĩ</h1>
                                    <button className="flex items-center bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium">
                                        <PlusIcon className="h-5 w-5 mr-1" />
                                        Thêm bác sĩ mới
                                    </button>
                                </div>
                                {pendingDoctors.length > 0 && (
                                    <div className="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                                        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Yêu cầu đăng ký mới ({pendingDoctors.length})</h3>
                                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Các bác sĩ đang chờ xác nhận để tham gia hệ thống.</p>
                                        </div>
                                        <ul className="divide-y divide-gray-200">
                                            {pendingDoctors.map((doctor) => (
                                                <li key={doctor.id}>
                                                    <div className="px-4 py-4 sm:px-6">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0">
                                                                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">{doctor.name.charAt(0)}</div>
                                                                </div>
                                                                <div className="ml-4">
                                                                    <h4 className="text-lg font-medium text-gray-900">{doctor.name}</h4>
                                                                    <p className="text-sm text-gray-500">Chuyên khoa: {doctor.specialty}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex">
                                                                <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2">
                                                                    <CheckIcon className="h-4 w-4 mr-1" />
                                                                    Xác nhận
                                                                </button>
                                                                <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                                    <XIcon className="h-4 w-4 mr-1" />
                                                                    Từ chối
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2 sm:flex sm:justify-between">
                                                            <div className="sm:flex">
                                                                <p className="flex items-center text-sm text-gray-500">
                                                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                                    </svg>
                                                                    {doctor.email}
                                                                </p>
                                                                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                                    </svg>
                                                                    {doctor.phone}
                                                                </p>
                                                            </div>
                                                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                </svg>
                                                                <p>Đang chờ xác nhận</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                    <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Danh sách bác sĩ</h3>
                                            <div>
                                                <input type="text" placeholder="Tìm kiếm bác sĩ..." className="border border-gray-300 rounded-md px-3 py-2 text-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Bác sĩ
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Chuyên khoa
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Số bệnh nhân
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Đánh giá
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Trạng thái
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Thao tác
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {doctors.map((doctor) => (
                                                    <tr key={doctor.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">{doctor.name.charAt(7)}</div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{doctor.specialty}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.patients}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <span className="text-sm text-gray-900 mr-2">{doctor.rating}</span>
                                                                <div className="flex">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <svg key={i} className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? "text-yellow-400" : "text-gray-300"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                        </svg>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Hoạt động</span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <button className="text-blue-600 hover:text-blue-900 mr-3">Xem</button>
                                                            <button className="text-blue-600 hover:text-blue-900 mr-3">Sửa</button>
                                                            <button className="text-red-600 hover:text-red-900">Vô hiệu</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-700">
                                                    Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">5</span> của <span className="font-medium">32</span> bác sĩ
                                                </p>
                                            </div>
                                            <div className="flex-1 flex justify-between sm:justify-end">
                                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Trước</button>
                                                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Sau</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "appointments" && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-2xl font-bold text-gray-900">Quản lý lịch hẹn</h1>
                                    <div className="flex space-x-3">
                                        <input type="date" className="border border-gray-300 rounded-md text-sm p-2" />
                                        <select className="border border-gray-300 rounded-md text-sm p-2">
                                            <option value="">Tất cả trạng thái</option>
                                            <option value="confirmed">Đã xác nhận</option>
                                            <option value="pending">Chờ xác nhận</option>
                                            <option value="completed">Hoàn thành</option>
                                            <option value="cancelled">Đã hủy</option>
                                        </select>
                                        <button className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium">Tìm kiếm</button>
                                    </div>
                                </div>
                                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        ID
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Bệnh nhân
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Bác sĩ
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Dịch vụ
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Ngày giờ
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Trạng thái
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Thao tác
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {recentAppointments.map((appointment) => (
                                                    <tr key={appointment.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{appointment.id}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-900">{appointment.patient}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{appointment.doctor}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{appointment.service}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{appointment.date}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{renderStatusBadge(appointment.status)}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <button className="text-blue-600 hover:text-blue-900 mr-3">Xem</button>
                                                            <button className="text-blue-600 hover:text-blue-900 mr-3">Sửa</button>
                                                            <button className="text-red-600 hover:text-red-900">Hủy</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-700">
                                                    Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">5</span> của <span className="font-medium">1,248</span> lịch hẹn
                                                </p>
                                            </div>
                                            <div className="flex-1 flex justify-between sm:justify-end">
                                                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Trước</button>
                                                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Sau</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "patients" && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-2xl font-bold text-gray-900">Quản lý bệnh nhân</h1>
                                    <div className="flex space-x-3">
                                        <input type="text" placeholder="Tìm kiếm bệnh nhân..." className="border border-gray-300 rounded-md text-sm p-2" />
                                        <button className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium">Tìm kiếm</button>
                                    </div>
                                </div>
                                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                    <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Danh sách bệnh nhân</h3>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Quản lý thông tin và lịch sử khám bệnh của tất cả bệnh nhân.</p>
                                    </div>
                                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 m-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <AlertCircleIcon className="h-5 w-5 text-yellow-400" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-yellow-700">Nội dung này đang được phát triển. Chức năng quản lý bệnh nhân sẽ sớm được hoàn thiện.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "reports" && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-2xl font-bold text-gray-900">Báo cáo & Thống kê</h1>
                                    <div className="flex space-x-3">
                                        <select className="border border-gray-300 rounded-md text-sm p-2">
                                            <option>7 ngày qua</option>
                                            <option>30 ngày qua</option>
                                            <option>3 tháng qua</option>
                                            <option>Năm nay</option>
                                        </select>
                                        <button className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium">Xuất báo cáo</button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Lịch hẹn theo chuyên khoa</h3>
                                        </div>
                                        <div className="p-5">
                                            <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
                                                <PieChartIcon className="h-12 w-12 text-gray-400" />
                                                <span className="ml-2 text-gray-500">Biểu đồ phân bổ theo chuyên khoa</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Doanh thu theo tháng</h3>
                                        </div>
                                        <div className="p-5">
                                            <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
                                                <BarChartIcon className="h-12 w-12 text-gray-400" />
                                                <span className="ml-2 text-gray-500">Biểu đồ doanh thu theo tháng</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
                                    <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Top bác sĩ có nhiều lịch hẹn nhất</h3>
                                    </div>
                                    <div className="p-5">
                                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <AlertCircleIcon className="h-5 w-5 text-yellow-400" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm text-yellow-700">Nội dung này đang được phát triển. Báo cáo chi tiết sẽ sớm được hoàn thiện.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "settings" && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-2xl font-bold text-gray-900">Cài đặt hệ thống</h1>
                                </div>
                                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                    <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Cài đặt chung</h3>
                                    </div>
                                    <div className="px-4 py-5 sm:p-6">
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-md font-medium text-gray-900">Thông tin cơ sở y tế</h3>
                                                <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="facility-name" className="block text-sm font-medium text-gray-700">
                                                            Tên cơ sở
                                                        </label>
                                                        <div className="mt-1">
                                                            <input type="text" name="facility-name" id="facility-name" defaultValue="MedSchedule Clinic" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                                                            Số điện thoại
                                                        </label>
                                                        <div className="mt-1">
                                                            <input type="text" name="phone-number" id="phone-number" defaultValue="(028) 1234 5678" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-6">
                                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                                            Địa chỉ
                                                        </label>
                                                        <div className="mt-1">
                                                            <input type="text" name="address" id="address" defaultValue="123 Đường Y Tế, Quận Khỏe Mạnh, TP. Hồ Chí Minh" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-md font-medium text-gray-900">Cài đặt lịch hẹn</h3>
                                                <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="appointment-duration" className="block text-sm font-medium text-gray-700">
                                                            Thời lượng mặc định (phút)
                                                        </label>
                                                        <div className="mt-1">
                                                            <input type="number" name="appointment-duration" id="appointment-duration" defaultValue="30" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="working-hours-start" className="block text-sm font-medium text-gray-700">
                                                            Giờ làm việc (bắt đầu)
                                                        </label>
                                                        <div className="mt-1">
                                                            <input type="time" name="working-hours-start" id="working-hours-start" defaultValue="08:00" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="working-hours-end" className="block text-sm font-medium text-gray-700">
                                                            Giờ làm việc (kết thúc)
                                                        </label>
                                                        <div className="mt-1">
                                                            <input type="time" name="working-hours-end" id="working-hours-end" defaultValue="17:30" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="max-appointments" className="block text-sm font-medium text-gray-700">
                                                            Số lượng lịch hẹn tối đa mỗi ngày
                                                        </label>
                                                        <div className="mt-1">
                                                            <input type="number" name="max-appointments" id="max-appointments" defaultValue="50" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-md font-medium text-gray-900">Cài đặt thông báo</h3>
                                                <div className="mt-2 space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <input id="email-notifications" name="email-notifications" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                                                            <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-900">
                                                                Gửi thông báo qua email
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <input id="sms-notifications" name="sms-notifications" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                                                            <label htmlFor="sms-notifications" className="ml-2 block text-sm text-gray-900">
                                                                Gửi thông báo qua SMS
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <input id="appointment-reminders" name="appointment-reminders" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                                                            <label htmlFor="appointment-reminders" className="ml-2 block text-sm text-gray-900">
                                                                Gửi nhắc lịch hẹn (24 giờ trước)
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            Lưu thay đổi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};
export default AdminDashboard;
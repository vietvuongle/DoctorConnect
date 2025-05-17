import React, { useState } from "react";
import { CheckIcon, XIcon } from "lucide-react";

const Home = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

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

    return (
        <div className="space-y-6 w-full my-5 mx-5">
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
    );
};

export default Home;
import React, { useContext, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const Patient = () => {
    const { appointmentData, calculateAge, formatDateHeader, removeVietnameseTones } = useContext(DoctorContext);

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");

    const seenUserIds = new Set();

    const completedAppointments = appointmentData.filter((appointment) => {
        if (appointment.completed && !seenUserIds.has(appointment.userId)) {
            seenUserIds.add(appointment.userId);
            return true;
        }
        return false;
    });

    console.log("completed", completedAppointments);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalItems = completedAppointments.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const filteredAppointments = completedAppointments.filter((appointment) =>
        removeVietnameseTones(appointment.patientName || "")
            .toLowerCase()
            .includes(removeVietnameseTones(searchTerm).toLowerCase())
    );

    // Lấy phần tử cho trang hiện tại
    const currentPatients = filteredAppointments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Hàm chuyển trang
    function goToPage(page) {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    }

    // Hàm đếm số lần khám của user
    function countCompletedAppointmentsByUser(userId, appointments) {
        return appointments.filter((appt) => appt.userId === userId && appt.completed === true).length;
    }

    // Hàm chuyển "dd/MM/yyyy" sang Date
    function parseDate_ddMMyyyy(dateStr) {
        const [day, month, year] = dateStr.split("/").map(Number);
        return new Date(year, month - 1, day);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Tìm ngày khám gần nhất so với hôm nay (ví dụ lấy cho toàn bộ completedAppointments)
    const closestAppointment = completedAppointments.reduce((closest, current) => {
        const currentDate = parseDate_ddMMyyyy(current.slotDate);
        const closestDate = closest ? parseDate_ddMMyyyy(closest.slotDate) : null;

        if (!closest || Math.abs(currentDate - today) < Math.abs(closestDate - today)) {
            return current;
        }
        return closest;
    }, null);

    return (
        <div className="bg-white rounded-lg shadow p-6 w-full m-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Danh sách bệnh nhân</h2>
            <div className="mb-4">
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset về trang đầu mỗi khi tìm kiếm
                        }}
                        placeholder="Tìm kiếm bệnh nhân..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
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
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentPatients.map((appointment) => (
                            <tr key={appointment._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">{appointment.patientName?.split(" ").pop()?.charAt(0)?.toUpperCase()}</div>

                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                                            <div className="text-sm text-gray-500 mt-2">
                                                {calculateAge(appointment.dob)} tuổi, {appointment.gender}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{appointment.email}</div>
                                    <div className="text-sm text-gray-500 mt-2">{appointment.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">Tổng số lần khám: {countCompletedAppointmentsByUser(appointment.userId, appointmentData)} lần</div>
                                    <div className="text-sm text-gray-500 mt-2">Gần nhất: {formatDateHeader(closestAppointment?.slotDate)}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button
                                        onClick={() => {
                                            navigate(`/doctor/patient/${appointment.userId}`);
                                            scrollTo(0, 0);
                                        }}
                                        className="text-white bg-primary border p-2 ml-6 rounded-full hover:opacity-80"
                                    >
                                        Lịch sử khám bệnh
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Thanh phân trang */}
            <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    Hiển thị {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} của {totalItems} bệnh nhân
                </div>
                <div className="flex space-x-2 mr-11">
                    <button className="px-3 py-1 border cursor-pointer border-gray-300 rounded-md text-sm disabled:opacity-50" disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>
                        Trước
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button key={i + 1} className={`px-3 py-1 rounded-md text-sm ${currentPage === i + 1 ? "bg-blue-600 text-white" : "border border-gray-300"}`} onClick={() => goToPage(i + 1)}>
                            {i + 1}
                        </button>
                    ))}

                    <button className="px-3 py-1 border cursor-pointer border-gray-300 rounded-md text-sm disabled:opacity-50" disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)}>
                        Sau
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Patient;

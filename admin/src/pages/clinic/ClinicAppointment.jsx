import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { ClinicContext } from "../../context/ClinicContext";

const ClinicAppointment = () => {
    const { getDepartment } = useContext(AdminContext);

    const { doctorData, appointmentData, formatDateHeader, cToken, backendUrl, getAllAppointmentByClinicId } = useContext(ClinicContext);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of appointments per page
    const totalItems = appointmentData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    const fakeAppointment = appointmentData.sort((a, b) => {
        return new Date(b.slotDate) - new Date(a.slotDate);
    });

    const currentAppointments = fakeAppointment.slice(startIndex, endIndex).sort((a, b) => {
        return new Date(b.slotDate) - new Date(a.slotDate);
    });

    const confirmAppointment = async (id) => {
        try {
            const { data } = await axios.put(
                `${backendUrl}/api/doctor/appointment/confirm/${id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${cToken}` },
                }
            );
            toast.success("Đã xác nhận thành công");
            getAllAppointmentByClinicId();
            getDepartment();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Xác nhận thất bại");
        }
    };

    const cancelAppointment = async (id) => {
        try {
            const { data } = await axios.put(
                `${backendUrl}/api/doctor/appointment/cancel/${id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${cToken}` },
                }
            );
            toast.success("Đã hủy thành công");
            getDepartment();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Hủy thất bại");
        }
    };

    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="mt-5 mr-2 overflow-x-auto max-w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Quản lý lịch hẹn</h1>
                <div className="flex space-x-3">
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
                    <table className="divide-y divide-gray-200 w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    STT
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bệnh nhân
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Liên hệ
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bác sĩ
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ngày khám
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentAppointments.map((appointment, index) => (
                                <tr key={appointment._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{startIndex + index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{appointment.patientName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 w-[185px]">{appointment.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{doctorData.find((doc) => doc.id === appointment.doctorId)?.name || "Không tìm thấy bác sĩ"}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{formatDateHeader(appointment.slotDate)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {!appointment.confirm && !appointment.completed && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-black">Chờ xác nhận</span>}
                                        {appointment.cancelled && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Đã hủy</span>}
                                        {!appointment.cancelled && appointment.confirm && !appointment.payment && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-600 text-white">Đã xác nhận</span>}
                                        {!appointment.cancelled && !appointment.completed && appointment.payment && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-blue-600">Đã thanh toán</span>}
                                        {appointment.payment && appointment.confirm && appointment.completed && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-600 text-white">Hoàn thành</span>}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        {!appointment.confirm && (
                                            <button onClick={() => confirmAppointment(appointment._id)} className="text-blue-600 hover:text-blue-900 mr-3">
                                                Xác nhận
                                            </button>
                                        )}
                                        {!appointment.confirm && (
                                            <button onClick={() => cancelAppointment(appointment._id)} className="text-red-600 hover:text-red-900">
                                                Hủy
                                            </button>
                                        )}
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
                                Hiển thị <span className="font-medium">{startIndex + 1}</span> đến <span className="font-medium">{endIndex}</span> của <span className="font-medium">{totalItems}</span> lịch hẹn
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Trước
                            </button>

                            <div className="mx-2 flex items-center text-sm text-gray-700">
                                Trang {currentPage} / {totalPages}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Sau
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClinicAppointment;

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, SearchIcon, CalendarIcon, ClockIcon, FilterIcon } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
const MyAppointments = () => {
    const { appointmentData, doctorData, formatDateHeader, token, backendUrl, getAppointments } = useContext(AppContext);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const removeVietnameseTones = (str) =>
        str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

    const filteredAppointments = appointmentData
        .filter((appointment) => {
            const doctor = doctorData.find((doc) => doc.id === appointment.doctorId);
            if (!doctor) return false;

            const doctorName = removeVietnameseTones(doctor.name);
            const search = removeVietnameseTones(searchTerm.trim());
            return doctorName.includes(search);
        })
        .filter((appointment) => {
            if (statusFilter === "all") return true;

            const [field, value] = statusFilter.split("-");

            // Chuyển giá trị thành kiểu boolean thực sự
            const boolValue = value === "true" ? true : false;

            // Kiểm tra field tồn tại và so sánh
            return field in appointment && appointment[field] === boolValue;
        });

    function getDoctorNameById(doctorId, doctorData) {
        const doctor = doctorData.find((doc) => doc.id === doctorId);
        return doctor?.name ?? null;
    }

    function getDoctorSpecialityById(doctorId, doctorData) {
        const doctor = doctorData.find((doc) => doc.id === doctorId);
        return doctor?.speciality ?? null;
    }

    const paymentByMomo = async (appointmentId) => {
        try {
            let headers = {
                Authorization: "Bearer " + token,
            };

            const { data } = await axios.post(backendUrl + `/api/momo/create/${appointmentId}`, null, { headers: headers });
            window.open(data.payUrl, "_blank");
            console.log(data);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const cancelAppointment = async (id) => {
        try {
            const { data } = await axios.put(
                `${backendUrl}/api/doctor/appointment/cancel/${id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            toast.success("Đã từ chối thành công");
            getAppointments(); // load lại danh sách
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Xác nhận thất bại");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
                            <ArrowLeftIcon className="w-5 h-5 mr-2" />
                            Quay lại trang chủ
                        </Link>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900">Lịch sử khám bệnh</h2>
                    </div>
                    <div className="pt-6 pl-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 lg:mr-10">
                            <div className="relative">
                                <input type="text" placeholder="Tìm kiếm theo tên bác sĩ..." className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                            <div className="relative">
                                <FilterIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-10" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                    <option value="all">Tất cả trạng thái</option>
                                    <option value="completed-true">Đã hoàn thành</option>
                                    <option value="payment-true">Đã thanh toán</option>
                                    <option value="confirm-true">Đã xác nhận</option>
                                    <option value="cancelled-true">Đã hủy</option>
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                                    Bác sĩ
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                                    Thời gian
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                                    Chi phí
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                                    Trạng thái
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                                    Thao tác
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredAppointments.map((appointment) => (
                                                <tr key={appointment._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{getDoctorNameById(appointment.doctorId, doctorData)}</div>
                                                        <div className="text-sm text-gray-500">{getDoctorSpecialityById(appointment.doctorId, doctorData)}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center mb-2 text-sm text-gray-900">
                                                            <CalendarIcon className="h-5 w-5 text-gray-600 mr-2" />
                                                            {formatDateHeader(appointment.slotDate)}
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <ClockIcon className="h-5 w-5 text-gray-600 mr-2" />
                                                            {appointment.slotTime}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{appointment.price.toLocaleString("vi-VN")} VNĐ</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div>
                                                            <div>{!appointment.confirm && !appointment.cancelled && !appointment.payment && <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-200 text-black">Chờ xác nhận</span>}</div>
                                                            <div>{appointment.payment && <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-600 text-white">Đã thanh toán</span>}</div>
                                                            <div>{appointment.cancelled && <span className="flex justify-center px-3 py-1 w-20 ml-1.5 text-xs leading-5 font-semibold rounded-full bg-red-600 text-white">Đã hủy</span>}</div>
                                                        </div>
                                                    </td>
                                                    <td className="flex flex-col gap-2 justify-center items-center py-2">
                                                        {!appointment.payment && !appointment.cancelled && (
                                                            <button onClick={() => paymentByMomo(appointment._id)} className="text-sm text-gray-900 text-center sm:min-w-10 w-36 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                                                                Thanh toán
                                                            </button>
                                                        )}
                                                        {appointment.payment && (
                                                            <button type="button" className="text-sm text-gray-900 text-center sm:min-w-10 w-36 py-2 my-7  border rounded cursor-default transition-all duration-300">
                                                                Đã thanh toán
                                                            </button>
                                                        )}
                                                        {!appointment.payment && !appointment.cancelled && (
                                                            <button onClick={() => cancelAppointment(appointment._id)} className=" text-sm text-gray-900 sm:min-w-10 w-36 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">
                                                                Hủy
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {filteredAppointments.length === 0 && (
                            <div className="text-center py-4">
                                <p className="text-gray-500">Không tìm thấy lịch hẹn nào phù hợp với tìm kiếm của bạn.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MyAppointments;

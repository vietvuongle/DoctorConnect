import React, { useContext, useState } from "react";
import { CheckIcon, XIcon } from "lucide-react";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";
import axios from "axios";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { appointmentData, backendUrl, getAllAppointment, dToken, calculateAge, formatDateHeader } = useContext(DoctorContext);

    const navigate = useNavigate();

    const [currentDate, setCurrentDate] = useState(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Xoá giờ để so sánh chuẩn hơn
        return today;
    });

    const changeDate = (days) => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(prevDate.getDate() + days);
            setCurrentDate(newDate);

            return newDate;
        });
    };
    const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    //Appointment is confirmed
    const confirmedAppointments = appointmentData.filter((appointment) => appointment.confirm === true && formatDateHeader(appointment.slotDate) === formatDateHeader(currentDate)).sort((a, b) => timeToMinutes(a.slotTime) - timeToMinutes(b.slotTime));

    const pendingAppointments = appointmentData.filter((appointment) => appointment.confirm === false);

    const confirmAppointment = async (id) => {
        try {
            const { data } = await axios.put(
                `${backendUrl}/api/doctor/appointment/confirm/${id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${dToken}` },
                }
            );
            toast.success("Đã xác nhận thành công");
            getAllAppointment(); // load lại danh sách
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
                    headers: { Authorization: `Bearer ${dToken}` },
                }
            );
            toast.success("Đã từ chối thành công");
            getAllAppointment(); // load lại danh sách
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Xác nhận thất bại");
        }
    };

    const compleAppointment = async (id) => {
        try {
            const { data } = await axios.put(
                `${backendUrl}/api/doctor/appointment/completed/${id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${dToken}` },
                }
            );
            toast.success("Đã hoàn thành lịch khám");
            getAllAppointment(); // load lại danh sách
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Xác nhận thất bại");
        }
    };

    return (
        <div className="space-y-6 w-full my-5 mx-5">
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-800">Lịch khám ngày: {formatDateHeader(currentDate)}</h3>
                    <div className="flex space-x-2">
                        <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                            Hôm nay
                        </button>
                        <button onClick={() => changeDate(-1)} className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                            &lt; Trước
                        </button>
                        <button onClick={() => changeDate(1)} className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                            Sau &gt;
                        </button>
                    </div>
                </div>
                <div className="divide-y divide-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bệnh nhân
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
                            {confirmedAppointments.map((appointment) => (
                                <tr key={appointment._id} className="p-6 min-h-[70px] align-middle">
                                    <td className="px-6 py-4 whitespace-nowrap w-[300px]">
                                        <div>
                                            <h4 className="font-medium text-gray-900">
                                                {appointment.patientName} {"("}
                                                {calculateAge(appointment.dob)} tuổi{")"}
                                            </h4>
                                        </div>
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
                                        {appointment.confirm && !appointment.completed && !appointment.payment && !appointment.payment && (
                                            <div>
                                                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Đã xác nhận</span>
                                            </div>
                                        )}
                                        {appointment.payment && !appointment.completed && (
                                            <div>
                                                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full text-white bg-blue-600">Đã thanh toán</span>
                                            </div>
                                        )}
                                        {appointment.completed && (
                                            <div>
                                                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Đã hoàn thành</span>
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <div className="flex flex-col items-center gap-y-2 py-4">
                                            {appointment.payment && !appointment.completed && (
                                                <button
                                                    onClick={() => {
                                                        navigate(`/doctor/create-medical/${appointment.userId}`);
                                                        scrollTo(0, 0);
                                                    }}
                                                    className="inline-flex items-center justify-center w-[105px] px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                >
                                                    Tạo bệnh án
                                                </button>
                                            )}
                                            {!appointment.completed && appointment.payment && (
                                                <button
                                                    onClick={() => {
                                                        const confirmComplete = window.confirm("Bạn có chắc chắn muốn đánh dấu cuộc hẹn này là 'Hoàn thành'?");
                                                        if (confirmComplete) {
                                                            compleAppointment(appointment._id);
                                                        }
                                                    }}
                                                    className="inline-flex items-center justify-center w-[105px] px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                >
                                                    Hoàn thành
                                                </button>
                                            )}

                                            {/* <button className="text-sm text-red-600 hover:text-red-800 font-medium">Hoãn lịch</button> */}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {confirmedAppointments.length === 0 && <div className="p-6 text-center text-gray-500">Không có lịch khám nào trong ngày hôm nay.</div>}
                </div>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800">Lịch hẹn chờ xác nhận</h3>
                </div>

                <div className="divide-y divide-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bệnh nhân
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
                            {pendingAppointments.map((appointment) => (
                                <tr key={appointment._id} className="p-6 min-h-[70px] align-middle">
                                    <td className="px-6 py-4 whitespace-nowrap w-[300px]">
                                        <div>
                                            <h4 className="font-medium text-gray-900">
                                                {appointment.patientName} {"("}
                                                {calculateAge(appointment.dob)} tuổi{")"}
                                            </h4>
                                        </div>
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
                                        <div>
                                            <div>{!appointment.confirm && !appointment.cancelled && <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-200 text-black">Chờ xác nhận</span>}</div>
                                            <div>{appointment.cancelled && <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-600 text-white">Đã hủy</span>}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col items-center gap-y-2">
                                            {!appointment.cancelled && (
                                                <button
                                                    onClick={() => confirmAppointment(appointment._id)}
                                                    className="inline-flex items-center justify-center w-[105px] px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                >
                                                    <CheckIcon className="w-4 h-4 mr-1" />
                                                    Xác nhận
                                                </button>
                                            )}

                                            {!appointment.cancelled && (
                                                <button
                                                    onClick={() => {
                                                        const confirmCancelled = window.confirm("Bạn có chắc chắn muốn hủy lịch hẹn");
                                                        if (confirmCancelled) {
                                                            cancelAppointment(appointment._id);
                                                        }
                                                    }}
                                                    className="inline-flex items-center justify-center w-[105px] px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                >
                                                    <XIcon className="w-4 h-4 mr-1" />
                                                    Từ chối
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {pendingAppointments.length === 0 && <div className="p-6 text-center text-gray-500">Không có lịch khám nào trong ngày hôm nay.</div>}
            </div>
        </div>
    );
};

export default Home;

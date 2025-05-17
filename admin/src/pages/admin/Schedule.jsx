import React from "react";
import { AdminContext } from "../../context/AdminContext";
import { useContext } from "react";

const Schedule = () => {
    const { appointmentData, doctorData } = useContext(AdminContext);

    return (
        <div className="w-full m-5">
            <div className="flex justify-between items-center mb-6 mr-5">
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
                    <table className=" divide-y divide-gray-200 w-[95%]">
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
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {appointmentData.map((appointment, index) => (
                                <tr key={appointment._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{appointment.patientName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{doctorData.find((doc) => doc.id === appointment.doctorId) ? doctorData.find((doc) => doc.id === appointment.doctorId).name : "Không tìm thấy bác sĩ"}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{appointment.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{appointment.slotDate}</div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {!appointment.confirm && !appointment.completed && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-black">Chờ xác nhận</span>}

                                        {appointment.cancelled && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Đã hủy</span>}

                                        {!appointment.cancelled && appointment.confirm && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Đã xác nhận</span>}

                                        {!appointment.cancelled && !appointment.confirm && !appointment.completed && appointment.payment && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Đã thanh toán</span>}

                                        {!appointment.cancelled && !appointment.confirm && appointment.completed && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-600 text-blue-800">Hoàn thành</span>}
                                    </td>
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
    );
};

export default Schedule;

import React, { useContext } from "react";
import MonthlySalesChart from "../../components/MonthlySalesChart";
import { UserIcon, UsersIcon, CalendarIcon, ClipboardListIcon, SettingsIcon, LogOutIcon, PlusIcon, CheckIcon, XIcon, BarChartIcon, PieChartIcon, TrendingUpIcon, AlertCircleIcon } from "lucide-react";
import { AdminContext } from "../../context/AdminContext";

const Home = () => {
    const { doctorData, appointmentData } = useContext(AdminContext);

    const completedAppointments = appointmentData.filter((appointment) => {
        if (appointment.completed) {
            return true;
        }
        return false;
    });

    const totalPrice = completedAppointments.reduce((sum, app) => sum + app.price, 0);

    const lengthPatient = completedAppointments.length;

    const lengthDoctor = doctorData.length;
    const lengthAppointment = appointmentData.length;

    return (
        <div className="my-5 w-full">
            <div className="flex justify-center">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white overflow-hidden p-3.5 shadow rounded-lg">
                        <div className="p-2">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <CalendarIcon className="w-8 h-8 text-blue-600" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-900">Tổng số lịch hẹn</dt>
                                        <dd>
                                            <div className="text-sm font-medium text-gray-500">{lengthAppointment}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm">
                                <span className="font-medium text-green-600">12%</span>
                                <span className="text-gray-500">{" so với tháng trước"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden p-3.5 shadow rounded-lg">
                        <div className="p-2">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <UsersIcon className="w-8 h-8 text-green-600" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className=" text-sm font-medium text-gray-900">Tổng bệnh nhân</dt>
                                        <dd>
                                            <div className="text-sm font-medium text-gray-500">{lengthPatient}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm">
                                <span className="font-medium text-green-600">12%</span>
                                <span className="text-gray-500">{" so với tháng trước"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden p-3.5 shadow rounded-lg">
                        <div className="p-2">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <UserIcon className="w-8 h-8 text-purple-600" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-900">Tổng số bác sĩ</dt>
                                        <dd>
                                            <div className="text-sm font-medium text-gray-500">{lengthDoctor}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm">
                                <span className="font-medium text-green-600">12%</span>
                                <span className="text-gray-500">{" so với tháng trước"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden p-3.5 shadow rounded-lg">
                        <div className="p-2">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <CheckIcon className="w-8 h-8 text-yellow-600" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className=" text-sm font-medium text-gray-900">Doanh thu</dt>
                                        <dd>
                                            <div className="text-sm font-medium text-gray-500">{Number(totalPrice).toLocaleString("vi-VN")} vnd</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm">
                                <span className="font-medium text-green-600">12%</span>
                                <span className="text-gray-500">{" so với tháng trước"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-7xl mx-auto">
                <MonthlySalesChart appointmentData={appointmentData} />
            </div>
        </div>
    );
};

export default Home;

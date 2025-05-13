import React from "react";
import MonthlySalesChart from "../../components/MonthlySalesChart";
import { UserIcon, UsersIcon, CalendarIcon, ClipboardListIcon, SettingsIcon, LogOutIcon, PlusIcon, CheckIcon, XIcon, BarChartIcon, PieChartIcon, TrendingUpIcon, AlertCircleIcon } from "lucide-react";

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

const Home = () => {
    return (
        <div className="my-5 w-full">
            <div className="flex justify-center">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white overflow-hidden p-3.5 shadow rounded-lg">
                            <div className="p-2">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">{stat.icon}</div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 ">{stat.label}</dt>
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
            </div>
            <div className="w-full max-w-7xl mx-auto">
                <MonthlySalesChart />
            </div>
        </div>
    );
};

export default Home;

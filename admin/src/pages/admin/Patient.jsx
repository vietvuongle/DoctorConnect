import React from "react";
import { AlertCircleIcon } from "lucide-react";

const Patient = () => {
    return (
        <div className="w-full m-5">
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
    );
};

export default Patient;

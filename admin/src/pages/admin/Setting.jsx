import React from "react";

const Setting = () => {
    return (
        <div className="w-full m-5">
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
                                        <input
                                            type="text"
                                            name="facility-name"
                                            id="facility-name"
                                            defaultValue="DoctorConnect"
                                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                                        Số điện thoại
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="phone-number"
                                            id="phone-number"
                                            defaultValue="079.679.4969"
                                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                        Địa chỉ
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            defaultValue="75 Nguyễn Huệ, Thừa Thiên Huế"
                                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            name="address"
                                            id="address"
                                            defaultValue="vietvuongf@gmail.com"
                                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-md font-medium text-gray-900">Cài đặt lịch hẹn</h3>
                            <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="working-hours-start" className="block text-sm font-medium text-gray-700">
                                        Giờ làm việc (bắt đầu)
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="time"
                                            name="working-hours-start"
                                            id="working-hours-start"
                                            defaultValue="08:00"
                                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="working-hours-end" className="block text-sm font-medium text-gray-700">
                                        Giờ làm việc (kết thúc)
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="time"
                                            name="working-hours-end"
                                            id="working-hours-end"
                                            defaultValue="17:30"
                                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="appointment-duration" className="block text-sm font-medium text-gray-700">
                                        Thời lượng mặc định (phút)
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="number"
                                            name="appointment-duration"
                                            id="appointment-duration"
                                            defaultValue="30"
                                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="max-appointments" className="block text-sm font-medium text-gray-700">
                                        Số lượng lịch hẹn tối đa mỗi ngày
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="number"
                                            name="max-appointments"
                                            id="max-appointments"
                                            defaultValue="50"
                                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                                        />
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
    );
};

export default Setting;

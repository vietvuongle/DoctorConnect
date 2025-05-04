import React from 'react'
import {
    CalendarCheck as CalendarCheckIcon,
    UserCheck as UserCheckIcon,
    ClipboardCheck as ClipboardCheckIcon,
    CheckCircle as CheckCircleIcon,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
export function BookingSteps() {

    const navigate = useNavigate()

    const steps = [

        {
            icon: <UserCheckIcon className="h-10 w-10 text-blue-600" />,
            title: 'Chọn bác sĩ',
            description: 'Lựa chọn bác sĩ chuyên khoa phù hợp với nhu cầu',
        },
        {
            icon: <CalendarCheckIcon className="h-10 w-10 text-blue-600" />,
            title: 'Chọn ngày và giờ',
            description: 'Lựa chọn thời gian phù hợp với lịch trình của bạn',
        },
        {
            icon: <ClipboardCheckIcon className="h-10 w-10 text-blue-600" />,
            title: 'Điền thông tin',
            description: 'Cung cấp thông tin cá nhân và triệu chứng',
        },
        {
            icon: <CheckCircleIcon className="h-10 w-10 text-blue-600" />,
            title: 'Xác nhận lịch hẹn',
            description: 'Nhận xác nhận qua email hoặc SMS',
        },
    ]
    return (
        <section id="booking" className="py-16 bg-blue-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Quy trình đặt lịch đơn giản
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Chỉ với 4 bước đơn giản, bạn có thể đặt lịch khám tại phòng khám của
                        chúng tôi một cách nhanh chóng và thuận tiện.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center relative">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                                {index + 1}
                            </div>
                            <div className="flex justify-center mb-4 mt-4">{step.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {step.title}
                            </h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <button onClick={() => navigate('/doctors')} className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                        Đặt lịch ngay
                    </button>
                </div>
            </div>
        </section>
    )
}

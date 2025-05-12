import React, { useContext, useState } from "react";
import { Calendar as CalendarIcon, Clock as ClockIcon, ChevronRight as ChevronRightIcon, CheckCircle as CheckCircleIcon } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const steps = [
    { title: "Chọn chuyên khoa", description: "Chọn chuyên khoa phù hợp với nhu cầu khám" },
    { title: "Chọn bác sĩ", description: "Chọn bác sĩ và thời gian khám" },
    { title: "Thông tin cá nhân", description: "Điền thông tin cá nhân của bạn" },
    { title: "Xác nhận", description: "Xác nhận thông tin đặt lịch" },
];

export function BookingPage() {
    const { departmentData, doctorData, backendUrl, token } = useContext(AppContext);

    const userId = localStorage.getItem("userId");

    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(0);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [reason, setReason] = useState("");
    const [patientName, setPatientName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("Nam");
    const [dob, setDob] = useState("");
    const [price, setPrice] = useState(0);

    const timeSlots = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

    const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("patientName", patientName);
            formData.append("phone", phone);
            formData.append("email", email);
            formData.append("dob", dob);
            formData.append("gender", gender);
            formData.append("reason", reason);
            formData.append("slotTime", selectedTime);
            formData.append("slotDate", selectedDate);
            formData.append("doctorId", selectedDoctor);
            formData.append("price", Number(price));
            formData.append("userId", userId);
            console.log([...formData]);
            console.log("Token: ", token);

            const response = await axios.post(backendUrl + "/api/user/appointment", formData, { headers: { token } });
            console.log("Response: ", response);

            const { code, result } = response.data;

            if (code === 1000 && result) {
                toast.success("Đăng kí thành công");
            } else {
                toast.error("Đăng kí thất bại");
            }
        } catch (error) {
            toast.error("Đặt lịch khám thất bại");
        }
    };

    const renderStepContent = () => {
        if (currentStep === 0) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {departmentData.map((dept) => (
                        <button
                            key={dept.id}
                            onClick={() => {
                                setSelectedDepartment(dept.name);
                                handleNext();
                            }}
                            className={`p-4 border rounded-lg text-left transition-colors ${selectedDepartment === dept.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"}`}
                        >
                            <h3 className="font-semibold text-gray-800">{dept.name}</h3>
                            <p className="text-gray-600 text-sm mt-1">{dept.description}</p>
                        </button>
                    ))}
                </div>
            );
        }

        if (currentStep === 1) {
            return (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {doctorData
                            .filter((doc) => doc.speciality === selectedDepartment)
                            .map((doctor) => (
                                <button
                                    key={doctor.id}
                                    onClick={() => (setSelectedDoctor(doctor.id.toString()), setPrice(doctor.fees))}
                                    className={`flex items-center p-4 border rounded-lg transition-colors ${selectedDoctor === doctor.id.toString() ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"}`}
                                >
                                    <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-full object-cover mr-4" />
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-800 mb-3">{doctor.name}</h3>
                                        <p className="text-gray-600 mb-3">{doctor.speciality}</p>
                                        <p className="text-gray-600 mb-3">Giá: {Number(doctor.fees).toLocaleString("vi-VN")} vnđ</p>
                                    </div>
                                </button>
                            ))}
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Chọn ngày khám</label>
                            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} min={new Date().toISOString().split("T")[0]} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        {selectedDate && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Chọn giờ khám</label>
                                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                                    {timeSlots.map((time) => (
                                        <button key={time} onClick={() => setSelectedTime(time)} className={`px-4 py-2 border rounded-md text-sm ${selectedTime === time ? "bg-blue-500 text-white border-blue-500" : "border-gray-300 hover:border-blue-500"}`}>
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        if (currentStep === 2) {
            return (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                            <input type="text" required value={patientName} onChange={(e) => setPatientName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                            <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ngày sinh</label>
                            <input type="date" required value={dob} onChange={(e) => setDob(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
                            <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="other">Khác</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Triệu chứng</label>
                        <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Mô tả triệu chứng của bạn" />
                    </div>
                </form>
            );
        }

        if (currentStep === 3) {
            const selectedDoctorData = doctorData.find((d) => d.id.toString() === selectedDoctor);
            const selectedDepartmentData = departmentData.find((d) => d.name === selectedDepartment);

            return (
                <div className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                        <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
                        <p className="text-green-700">Bạn đã đặt lịch khám thành công!</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                        <h3 className="font-semibold text-lg text-gray-800">Thông tin lịch khám</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="font-medium text-xl">Chuyên khoa</p>
                                <p className="text-sm text-gray-600">{selectedDepartmentData?.name}</p>
                            </div>
                            <div>
                                <p className="font-medium text-xl">Bác sĩ</p>
                                <p className="text-sm text-gray-600">{selectedDoctorData?.name}</p>
                            </div>
                            <div>
                                <p className="font-medium text-xl">Ngày khám</p>
                                <p className="text-sm text-gray-600">{new Date(selectedDate).toLocaleDateString("vi-VN")}</p>
                            </div>
                            <div>
                                <p className="font-medium text-xl">Giờ khám</p>
                                <p className="text-sm text-gray-600">{selectedTime}</p>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 pt-4 mt-4">
                            <h4 className="font-medium text-2xl mb-2">Thông tin bệnh nhân</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-medium text-xl">Họ và tên</p>
                                    <p className="text-sm text-gray-600">{patientName}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-xl">Số điện thoại</p>
                                    <p className="text-sm text-gray-600">{phone}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-xl">Email</p>
                                    <p className="text-sm text-gray-600">{email}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-xl">Ngày sinh</p>
                                    <p className="text-sm text-gray-600">{dob}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="py-8 bg-gray-50 min-h-screen flex items-center justify-center px-2">
            <div className="w-full max-w-6xl">
                {" "}
                {/* Thay container bằng w-full và max-w-3xl */}
                <nav className="mb-8">
                    <ol className="flex items-center w-full">
                        {steps.map((step, index) => (
                            <li key={index} className={`flex items-center ${index < steps.length - 1 ? "w-full" : ""}`}>
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${index <= currentStep ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 bg-white text-gray-500"}`}>{index + 1}</div>
                                <div className="hidden sm:block ml-4 truncate">
                                    <p className={`text-xl mb-2 font-medium ${index <= currentStep ? "text-blue-600" : "text-gray-800"}`}>{step.title}</p>
                                    <p className="text-sm text-gray-500">{step.description}</p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="flex-1 hidden sm:block">
                                        <div className={`h-0.5 ml-2 mr-2 ${index < currentStep ? "bg-blue-600" : "bg-gray-300"}`}></div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold text-gray-800">{steps[currentStep].title}</h2>
                        <p className="text-gray-600">{steps[currentStep].description}</p>
                    </div>
                    {renderStepContent()}
                </div>
                {currentStep < steps.length - 1 && (
                    <div className="flex justify-between">
                        <button onClick={handleBack} className={`px-6 py-2 rounded-md ${currentStep === 0 ? "invisible" : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
                            Quay lại
                        </button>
                        <button
                            onClick={() => {
                                if (currentStep === steps.length - 2) {
                                    handleSubmit(new Event("submit")); // gọi hàm submit
                                    setCurrentStep(currentStep + 1); // chuyển sang bước xác nhận
                                } else {
                                    handleNext();
                                }
                            }}
                            disabled={(currentStep === 0 && !selectedDepartment) || (currentStep === 1 && (!selectedDoctor || !selectedDate || !selectedTime))}
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {currentStep === steps.length - 2 ? "Hoàn tất" : "Tiếp tục"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

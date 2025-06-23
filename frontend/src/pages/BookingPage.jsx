import React, { useContext, useState } from "react";
import { Calendar as CalendarIcon, Clock as ClockIcon, ChevronRight as ChevronRightIcon, CheckCircle as CheckCircleIcon } from "lucide-react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const steps = [
    { title: "Chọn chuyên khoa", description: "Chọn chuyên khoa phù hợp với nhu cầu khám" },
    { title: "Chọn bác sĩ", description: "Chọn bác sĩ và thời gian khám" },
    { title: "Thông tin cá nhân", description: "Điền thông tin cá nhân của bạn" },
    { title: "Xác nhận", description: "Xác nhận thông tin đặt lịch" },
];

export function BookingPage() {
    const { departmentData, doctorData, backendUrl, token, getAppointments } = useContext(AppContext);
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");

    const [appointmentWithDoctor, setAppointmentWithDoctor] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [selectedTime, setSelectedTime] = useState("");
    const [reason, setReason] = useState("");
    const [patientName, setPatientName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [price, setPrice] = useState(0);
    const [errors, setErrors] = useState({}); // State to track validation errors

    const [slotOptions, setSlotOptions] = useState([]);

    const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const handleBack = () => {
        setErrors({}); // Clear errors when going back
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const validateForm = () => {
        const newErrors = {};

        if (currentStep === 1) {
            if (!selectedDoctor) newErrors.selectedDoctor = "Vui lòng chọn bác sĩ.";
            if (!selectedDate) newErrors.selectedDate = "Vui lòng chọn ngày khám.";
            if (!selectedTime) newErrors.selectedTime = "Vui lòng chọn giờ khám.";
        }

        if (currentStep === 2) {
            if (!patientName.trim()) newErrors.patientName = "Vui lòng nhập họ tên bệnh nhân.";
            const phoneRegex = /^0\d{9}$/;
            if (!phoneRegex.test(phone)) newErrors.phone = "Số điện thoại không hợp lệ. Phải có 10 chữ số và bắt đầu bằng số 0.";
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) newErrors.email = "Email không hợp lệ.";
            const today = new Date();
            const dobDate = new Date(dob);
            if (!dob || dobDate > today) newErrors.dob = "Ngày sinh không hợp lệ.";
            if (!gender) newErrors.gender = "Vui lòng chọn giới tính.";
            if (!reason.trim()) newErrors.reason = "Vui lòng nhập lý do khám.";
            if (!price || Number(price) <= 0) newErrors.price = "Giá khám không hợp lệ.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Stop if validation fails
        }

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

            let headers = {
                Authorization: "Bearer " + token,
            };

            const response = await axios.post(backendUrl + "/api/user/appointment", formData, { headers });
            const { code, result } = response.data;

            if (code === 1000 && result) {
                getAppointments();
                setErrors({}); // Clear errors on success
                toast.success("Đặt lịch thành công");
                setCurrentStep(currentStep + 1);
            } else {
                setErrors({ general: "Đặt lịch thất bại. Vui lòng thử lại." });
            }
        } catch (error) {
            setErrors({ general: "Đặt lịch khám thất bại. Vui lòng kiểm tra kết nối và thử lại." });
        }
    };

    const fetchSchedulesFromDB = async (dateStr, doctorId) => {
        try {
            const url = `${backendUrl}/api/doctor/available/${doctorId}?slotDate=${dateStr}`;
            const headers = { Authorization: `Bearer ${token}` };
            const { data } = await axios.get(url, { headers });

            const slots = data.result;

            const now = new Date();
            const currentTimeStr = now.toTimeString().slice(0, 5); // "HH:mm"

            const slotTimes = slots
                .filter((slot) => {
                    const slotTime = slot.startTime.slice(0, 5); // "HH:mm"
                    return !slot.booked && slotTime > currentTimeStr;
                })
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map((slot) => `${slot.startTime.slice(0, 5)} - ${slot.endTime.slice(0, 5)}`);

            setSlotOptions(slotTimes);
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            return [];
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
                                setErrors({}); // Clear errors
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
                    {errors.general && <p className="text-red-500 mb-4">{errors.general}</p>}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {doctorData.filter((doc) => doc.speciality === selectedDepartment).length === 0 ? (
                            <p className="text-red-400 col-span-full text-lg">Không có bác sĩ cho chuyên khoa này.</p>
                        ) : (
                            doctorData
                                .filter((doc) => doc.speciality === selectedDepartment)
                                .map((doctor) => (
                                    <button
                                        key={doctor.id}
                                        onClick={() => {
                                            setSelectedDoctor(doctor.id);
                                            fetchSchedulesFromDB(selectedDate, doctor.id);
                                            setPrice(doctor.fees);
                                            fetchSchedulesFromDB(selectedDate, doctor.id);
                                            setErrors({}); // Clear errors
                                        }}
                                        className={`flex items-center p-4 border rounded-lg transition-colors ${selectedDoctor === doctor.id.toString() ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"}`}
                                    >
                                        <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-full object-cover mr-4" />
                                        <div className="text-left">
                                            <h3 className="font-semibold text-gray-800 mb-3">{doctor.name}</h3>
                                            <p className="text-blue-600 mb-3">{doctor.speciality}</p>
                                            <p className="text-gray-600 mb-3">Giá: {Number(doctor.fees).toLocaleString("vi-VN")} vnđ</p>
                                        </div>
                                    </button>
                                ))
                        )}
                    </div>
                    <div className="space-y-6">
                        {selectedDoctor && (
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Chọn ngày khám</label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => {
                                        setSelectedDate(e.target.value);
                                        fetchSchedulesFromDB(e.target.value ? e.target.value : selectedDate, selectedDoctor);
                                        setErrors((prev) => ({ ...prev, selectedDate: "" }));
                                    }}
                                    min={new Date().toISOString().split("T")[0]}
                                    className={`w-[25%] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.selectedDate ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.selectedDate && <p className="text-red-500 text-sm mt-1">{errors.selectedDate}</p>}
                            </div>
                        )}

                        {selectedDate && selectedDoctor && (
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Chọn giờ khám</label>
                                {slotOptions.length === 0 && selectedDoctor !== "" && <div className="text-red-500 text-lg mt-5">Không có lịch trống của ngày hôm nay</div>}
                                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                                    {slotOptions.map((time, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setSelectedTime(time);
                                                setErrors((prev) => ({ ...prev, selectedTime: "" }));
                                            }}
                                            className={`px-4 py-2 border rounded-md text-sm ${selectedTime === time ? "bg-blue-500 text-white border-blue-500" : "border-gray-300 hover:border-blue-500"}`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                                {errors.selectedTime && <p className="text-red-500 text-sm mt-2">{errors.selectedTime}</p>}
                            </div>
                        )}
                        {errors.selectedDoctor && <p className="text-red-500 text-sm mt-2">{errors.selectedDoctor}</p>}
                    </div>
                </div>
            );
        }

        if (currentStep === 2) {
            return (
                <div>
                    {errors.general && <p className="text-red-500 mb-4">{errors.general}</p>}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg shadow-sm mb-6">
                        <div className="flex items-start gap-3">
                            <svg className="h-6 w-6 text-blue-500 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="text-lg font-semibold text-blue-800 mb-1">LƯU Ý</h3>
                                <p className="text-gray-700 text-sm">Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám bệnh, khi điền thông tin anh/chị vui lòng:</p>
                                <ul className="list-disc list-inside text-gray-700 text-sm mt-1 space-y-1">
                                    <li>
                                        Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ: <span className="font-medium">Trần Văn Phú</span>
                                    </li>
                                    <li>Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi ấn "Đặt lịch khám"</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                                <input
                                    type="text"
                                    value={patientName}
                                    onChange={(e) => {
                                        setPatientName(e.target.value);
                                        setErrors((prev) => ({ ...prev, patientName: "" }));
                                    }}
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.patientName ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.patientName && <p className="text-red-500 text-sm mt-1">{errors.patientName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                        setErrors((prev) => ({ ...prev, phone: "" }));
                                    }}
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrors((prev) => ({ ...prev, email: "" }));
                                    }}
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Ngày sinh</label>
                                <input
                                    type="date"
                                    value={dob}
                                    onChange={(e) => {
                                        setDob(e.target.value);
                                        setErrors((prev) => ({ ...prev, dob: "" }));
                                    }}
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.dob ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
                                <div className="relative w-full">
                                    <select
                                        value={gender}
                                        onChange={(e) => {
                                            setGender(e.target.value);
                                            setErrors((prev) => ({ ...prev, gender: "" }));
                                        }}
                                        className={`w-full appearance-none px-4 py-2 pr-10 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.gender ? "border-red-500" : "border-gray-300"}`}
                                    >
                                        <option value="">Chọn giới tính</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="other">Khác</option>
                                    </select>
                                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Triệu chứng</label>
                            <textarea
                                value={reason}
                                onChange={(e) => {
                                    setReason(e.target.value);
                                    setErrors((prev) => ({ ...prev, reason: "" }));
                                }}
                                rows={4}
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.reason ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Mô tả triệu chứng của bạn"
                            />
                            {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
                        </div>
                        {currentStep === 2 && (
                            <div className="flex justify-between pt-4">
                                <button onClick={handleBack} className={`px-6 py-2 rounded-md ${currentStep === 0 ? "invisible" : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
                                    Quay lại
                                </button>
                                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
                                    Đặt lịch khám
                                </button>
                            </div>
                        )}
                    </form>
                </div>
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
                {currentStep < steps.length - 1 && currentStep !== 2 && (
                    <div className="flex justify-between">
                        <button
                            onClick={() => {
                                setSlotOptions([]);
                                handleBack();
                            }}
                            className={`px-6 py-2 rounded-md ${currentStep === 0 ? "invisible" : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                        >
                            Quay lại
                        </button>
                        <button
                            onClick={() => {
                                if (currentStep === steps.length - 2) {
                                    handleSubmit(new Event("submit"));
                                } else {
                                    if (validateForm()) {
                                        handleNext();
                                    }
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

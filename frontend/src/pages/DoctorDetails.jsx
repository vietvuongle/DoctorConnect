import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { MapPinIcon, MailIcon, ClockIcon, PhoneIcon, StethoscopeIcon } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export function DoctorDetails() {
    const { id } = useParams();
    const { doctorData, getAppointments, handleSmoothScroll, token, backendUrl, clinicData } = useContext(AppContext);
    const userId = localStorage.getItem("userId");
    const [showBooking, setShowBooking] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [slotDate, setSlotDate] = useState(null);
    const [step, setStep] = useState(1);
    const [appointmentWithDoctor, setAppointmentWithDoctor] = useState([]);

    const navigate = useNavigate();

    // Form đặt lịch
    const [patientName, setPatientName] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [reason, setReason] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const doctor = doctorData.find((d) => d.id === id);

    const clinic = clinicData.find((c) => c.id === doctor?.clinicId);

    console.log("clinic", clinic);

    if (!doctor) {
        return <div className="container mx-auto px-4 py-8 text-center text-red-600 font-semibold text-lg">Không tìm thấy bác sĩ</div>;
    }

    const getAppointmentByDoctorId = async (doctorId) => {
        try {
            if (!token) {
                navigate("/login");
                return;
            }

            const url = backendUrl + `/api/user/appointments/${doctorId}`;
            let headers = {
                Authorization: "Bearer " + token,
            };
            const { data } = await axios.get(url, { headers });
            setAppointmentWithDoctor(data);
        } catch (error) {
            console.log(error);
        }
    };

    const slots = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

    const bookedTimes = appointmentWithDoctor.filter((app) => app.doctorId === id && app.slotDate === slotDate).map((app) => app.slotTime);

    const availableTimeSlots = slots.filter((time) => !bookedTimes.includes(time));

    const handleBookingSubmit = async () => {
        try {
            if (!token) {
                alert("Bạn cần đăng nhập để đặt lịch!");
                return;
            }

            const payload = {
                userId: userId || "",
                doctorId: doctor.id,
                slotDate,
                slotTime: selectedSlot,
                reason,
                price: doctor.fees,
                patientName,
                email,
                phone,
                dob,
                gender,
                dateBooking: new Date().toISOString(),
            };

            const response = await fetch("http://localhost:8081/api/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast.success("Đặt lịch thành công");
                getAppointments();
            } else {
                let errorMessage = "Đặt lịch thất bại";
                try {
                    const errorData = await response.json();
                    if (errorData.message) errorMessage = errorData.message;
                } catch {}
                throw new Error(errorMessage);
            }

            setShowBooking(false);
            setSelectedSlot(null);
            setSlotDate(null);
            setStep(1);
            setPatientName("");
            setDob("");
            setGender("");
            setReason("");
            setPhone("");
            setEmail("");
        } catch (error) {
            alert(error.message || "Có lỗi xảy ra khi đặt lịch");
        }
    };

    return (
        doctor && (
            <>
                <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen">
                    {/* Main Content */}
                    <div className="flex flex-col lg:flex-row gap-10">
                        <div className="w-full">
                            {/* About Section */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <div className="flex flex-col ">
                                    <div className="flex justify-between lg:flex-row items-center gap-6 mb-8">
                                        <div className="flex lg:flex-row items-center gap-6 mb-8">
                                            <div>
                                                <img src={doctor.image} alt={doctor.name} className="w-40 h-40 object-cover rounded-full border-4 border-blue-100 shadow-md" />
                                            </div>
                                            <div className="space-y-3 text-center lg:text-left">
                                                <h1 className="text-3xl font-bold text-gray-800">BS. {doctor.name}</h1>
                                                <p className="text-xl font-semibold text-green-600">Phí khám: {Number(doctor.fees).toLocaleString("vi-VN")} VNĐ</p>
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-lg shadow-sm p-6 mr-8">
                                            <h2 className="text-3xl font-bold mb-4">Địa chỉ khám</h2>
                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-2xl text-blue-600"> {clinic?.name}</p>
                                                </div>
                                                <div className="flex items-start">
                                                    <MapPinIcon className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                                                    <div className="flex">
                                                        <p className="font-medium mr-3">Địa chỉ: </p>
                                                        <p className="text-gray-600">{clinic?.address}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start">
                                                    <MailIcon className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                                                    <div className="flex">
                                                        <p className="font-medium mr-3">Email: </p>
                                                        <p className="text-gray-600">{clinic?.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h2 className="text-4xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2 border-gray-200">Giới thiệu</h2>
                                <div className="font-calibri overflow-y-auto p-4 bg-gray-50 rounded-md border border-gray-200 shadow-sm tiptap-content" dangerouslySetInnerHTML={{ __html: doctor.about }} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-lg shadow-sm mb-6">
                        <div className="flex items-start gap-3">
                            <svg className="h-6 w-6 text-blue-500 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="text-lg font-semibold text-blue-800 mb-1">LƯU Ý</h3>
                                <p className="text-gray-700 text-lg">Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám bệnh, khi điền thông tin anh/chị vui lòng:</p>
                                <ul className="list-disc list-inside text-gray-700 text-lg mt-1 space-y-1">
                                    <li>
                                        Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ: <span className="font-medium">Trần Văn Phú</span>
                                    </li>
                                    <li>Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi ấn "Đặt lịch khám bệnh"</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Action Button */}
                    <div className="flex justify-between mt-5 mx-5">
                        <button onClick={() => (navigate("/doctors"), handleSmoothScroll())} className={`px-6 py-2 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transform transition-all duration-300 hover:scale-105`}>
                            Quay lại
                        </button>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
                            onClick={() => {
                                setShowBooking(true);
                                getAppointmentByDoctorId(id);
                                if (!token) {
                                    navigate("/login");
                                }
                            }}
                        >
                            Đặt lịch khám bệnh
                        </button>
                    </div>
                </div>

                {/* Modal đặt lịch */}
                {showBooking && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-lg max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Đặt lịch khám với {doctor.name}</h2>
                                <button onClick={() => setShowBooking(false)} className="text-gray-500 hover:text-gray-700 text-3xl font-bold">
                                    ×
                                </button>
                            </div>

                            {/* Step Indicator */}
                            <div className="flex justify-center mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${step === 1 ? "bg-blue-600" : "bg-gray-300"}`}>1</div>
                                    <div className="h-1 w-12 bg-gray-300">
                                        <div className={`h-full ${step === 2 ? "bg-blue-600" : "bg-gray-300"}`} />
                                    </div>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${step === 2 ? "bg-blue-600" : "bg-gray-300"}`}>2</div>
                                </div>
                            </div>

                            {step === 1 && (
                                <>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 font-medium mb-2">Chọn ngày khám:</label>
                                        <input
                                            type="date"
                                            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                            value={slotDate || ""}
                                            onChange={(e) => setSlotDate(e.target.value)}
                                            min={new Date().toISOString().split("T")[0]} // Prevent past dates
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 font-medium mb-2">Chọn khung giờ:</label>
                                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                            {availableTimeSlots.map((slot) => (
                                                <button
                                                    key={slot}
                                                    className={`py-2 px-3 rounded-xl border text-sm font-medium transition-all duration-200
                                                    ${selectedSlot === slot ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"}`}
                                                    onClick={() => setSelectedSlot(slot)}
                                                >
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <button className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition duration-200" onClick={() => setShowBooking(false)}>
                                            Hủy
                                        </button>
                                        <button className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition duration-200 disabled:bg-gray-400" onClick={() => setStep(2)} disabled={!slotDate || !selectedSlot}>
                                            Tiếp tục
                                        </button>
                                    </div>
                                </>
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-700 font-medium mb-2">Họ và tên bệnh nhân:</label>
                                            <input type="text" className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Nhập họ và tên" />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-medium mb-2">Ngày sinh:</label>
                                            <input
                                                type="date"
                                                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                                value={dob}
                                                onChange={(e) => setDob(e.target.value)}
                                                max={new Date().toISOString().split("T")[0]} // Prevent future dates
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-medium mb-2">Giới tính:</label>
                                            <select className="w-full border border-gray-300 rounded-xl p-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" value={gender} onChange={(e) => setGender(e.target.value)}>
                                                <option value="">Chọn giới tính</option>
                                                <option value="Nam">Nam</option>
                                                <option value="Nữ">Nữ</option>
                                                <option value="Khác">Khác</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-medium mb-2">Email:</label>
                                            <input type="email" className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email" />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-medium mb-2">Số điện thoại:</label>
                                            <input type="tel" className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Nhập số điện thoại" />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-medium mb-2">Phí khám:</label>
                                            <input type="text" className="w-full border border-gray-300 rounded-xl p-3 bg-gray-100 text-gray-700" value={`${Number(doctor.fees).toLocaleString("vi-VN")} VNĐ`} readOnly />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-gray-700 font-medium mb-2">Lý do khám:</label>
                                            <textarea className="w-full h-32 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Mô tả lý do khám bệnh" />
                                        </div>
                                    </div>

                                    <div className="flex justify-between gap-3">
                                        <button className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition duration-200" onClick={() => setStep(1)}>
                                            Quay lại
                                        </button>
                                        <button className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition duration-200 disabled:bg-gray-400" onClick={handleBookingSubmit} disabled={!patientName || !dob || !gender || !reason || !phone || !email}>
                                            Xác nhận đặt lịch
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </>
        )
    );
}

export default DoctorDetails;

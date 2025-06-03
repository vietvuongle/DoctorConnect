import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext, useState } from "react";

export function DoctorDetails() {
    const { id } = useParams();
    const { doctorData, userId } = useContext(AppContext);
    console.log(id);
    const [showBooking, setShowBooking] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [slotDate, setSlotDate] = useState(null);
    const [step, setStep] = useState(1);

    // Form đặt lịch
    const [patientName, setPatientName] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [reason, setReason] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [symptoms, setSymptoms] = useState("");

    // Giá khám có 3 lựa chọn, mặc định là phí bác sĩ nếu có, else 100000
    // const [price, setPrice] = useState(doctorData.find((d) => d.id === id)?.fees || "100000");

    const doctor = doctorData.find((d) => d.id === id);

    if (!doctor)
        return (
            <>
                <div className="container mx-auto px-4 py-8 text-center text-red-600">Không tìm thấy bác sĩ</div>
            </>
        );

    const slots = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

    const handleBookingSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
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

            if (!response.ok) {
                let errorMessage = "Đặt lịch thất bại";
                try {
                    const errorData = await response.json();
                    if (errorData.message) errorMessage = errorData.message;
                } catch { }
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
            setSymptoms("");
            setPrice(doctor.fees);
            setPhone("");
            setEmail("");

            alert("Đặt lịch thành công!");
        } catch (error) {
            alert(error.message || "Có lỗi xảy ra khi đặt lịch");
        }
    };

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left - Thông tin bác sĩ */}
                    <div className="w-full md:w-1/3 flex flex-col items-center md:items-start gap-4">
                        <img src={doctor.image} alt={doctor.name} className="w-48 h-48 md:w-60 md:h-60 object-cover rounded-xl shadow-md border" />
                        <div className="space-y-2 text-center md:text-left">
                            <h1 className="text-4xl font-bold text-gray-800">{doctor.name}</h1>
                            <p className="text-xl text-gray-600">{doctor.specialty}</p>
                            <p className="text-base text-gray-500">Kinh nghiệm: {doctor.experience}</p>
                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                <span className="text-yellow-500 font-semibold">{doctor.rating} ★</span>
                                <span className="text-gray-500">({doctor.reviewCount} đánh giá)</span>
                            </div>
                        </div>
                    </div>

                    {/* Right - Chi tiết bác sĩ */}
                    <div className="w-full md:w-2/3 space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-lg text-gray-700">
                            <p>
                                <strong>Học vấn:</strong> {doctor.degree}
                            </p>
                            <p>
                                <strong>Email:</strong> {doctor.email || "Đang cập nhật"}
                            </p>
                            <p>
                                <strong>Điện thoại:</strong> {doctor.phone || "Đang cập nhật"}
                            </p>
                            <p>
                                <strong>Địa chỉ:</strong> {doctor.address || "Đang cập nhật"}
                            </p>
                            <p>
                                <strong>Giới tính:</strong> {doctor.sex || "Đang cập nhật"}
                            </p>
                            <p>
                                <strong>Phí khám:</strong> {doctor.fees ? doctor.fees.toLocaleString("vi-VN") + " VNĐ" : "Đang cập nhật"}
                            </p>
                            <p>
                                <strong>Trường:</strong> {doctor.school || "Đang cập nhật"}
                            </p>
                            <p>
                                <strong>Chứng chỉ:</strong> {doctor.certifications?.join(", ") || "Đang cập nhật"}
                            </p>
                            <p>
                                <strong>Mô tả:</strong> {doctor.description || "Đang cập nhật"}
                            </p>
                        </div>
                        <div className="text-center">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl shadow-lg" onClick={() => setShowBooking(true)}>
                                Đặt lịch khám bệnh
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal đặt lịch */}
            {showBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Đặt lịch khám với {doctor.name}</h2>

                        {step === 1 && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-1">Chọn ngày:</label>
                                    <input type="date" className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" value={slotDate || ""} onChange={(e) => setSlotDate(e.target.value)} />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 font-medium mb-2">Chọn khung giờ:</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {slots.map((slot) => (
                                            <button
                                                key={slot}
                                                className={`py-2 px-3 rounded-xl border text-sm text-gray-700 hover:bg-blue-100
                                                ${selectedSlot === slot ? "bg-blue-500 text-white font-semibold" : ""}`}
                                                onClick={() => setSelectedSlot(slot)}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700" onClick={() => setShowBooking(false)}>
                                        Hủy
                                    </button>
                                    <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setStep(2)} disabled={!slotDate || !selectedSlot}>
                                        Tiếp tục
                                    </button>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <div className="max-w-4xl mx-auto px-4 py-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Họ và tên bệnh nhân:</label>
                                        <input type="text" className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Ngày sinh:</label>
                                        <input type="date" className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" value={dob} onChange={(e) => setDob(e.target.value)} />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Giới tính:</label>
                                        <select className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" value={gender} onChange={(e) => setGender(e.target.value)}>
                                            <option value="">Chọn giới tính</option>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Email:</label>
                                        <input type="email" className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Số điện thoại:</label>
                                        <input type="tel" className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Chi phí khám:</label>
                                        <p className="p-3 bg-gray-100 rounded-xl">
                                            {doctor.fees
                                                ? doctor.fees.toLocaleString("vi-VN") + " VNĐ"
                                                : "Đang cập nhật"}
                                        </p>
                                    </div>


                                    <div className="col-span-2">
                                        <label className="block text-gray-700 font-medium mb-1">Lý do khám:</label>
                                        <textarea className="w-full h-32 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" value={reason} onChange={(e) => setReason(e.target.value)} />
                                    </div>
                                </div>

                                <div className="flex justify-between gap-3 mt-6">
                                    <button className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700" onClick={() => setStep(1)}>
                                        Quay lại
                                    </button>
                                    <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white" onClick={handleBookingSubmit} disabled={!patientName || !dob || !gender || !reason}>
                                        Xác nhận đặt lịch
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
export default DoctorDetails;

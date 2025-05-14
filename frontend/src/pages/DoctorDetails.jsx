import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function DoctorDetails() {
    const { id } = useParams();
    const { doctorData } = useContext(AppContext);
    const [showBooking, setShowBooking] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [bookingDate, setBookingDate] = useState(null);
    const navigate = useNavigate();

    const doctor = doctorData.find((d) => d.id === id);

    if (!doctor)
        return (
            <>
                <Header />
                <div className="container mx-auto px-4 py-8 text-center text-red-600">
                    Không tìm thấy bác sĩ
                </div>
                <Footer />
            </>
        );

    const slots = [
        "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00",
        "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00"
    ];

    const handleConfirmBooking = () => {
        if (selectedSlot && bookingDate) {
            navigate("/my-appointments", {
                state: {
                    doctor,
                    selectedSlot,
                    bookingDate,
                    fees: doctor.fees
                }
            });
        }
    };

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/3 flex flex-col items-center md:items-start gap-4">
                        <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-48 h-48 md:w-60 md:h-60 object-cover rounded-xl shadow-md border"
                        />
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

                    <div className="w-full md:w-2/3 mx-auto space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-lg text-gray-700">
                            <p><i className="fas fa-graduation-cap mr-2 text-blue-600"></i><span className="font-medium">Học vấn:</span> {doctor.degree}</p>
                            <p><i className="fas fa-envelope mr-2 text-blue-600"></i><span className="font-medium">Email:</span> {doctor.email || "Đang cập nhật"}</p>
                            <p><i className="fas fa-phone-alt mr-2 text-blue-600"></i><span className="font-medium">Số điện thoại:</span> {doctor.phone || "Đang cập nhật"}</p>

                            <p><i className="fas fa-map-marker-alt mr-2 text-blue-600"></i><span className="font-medium">Địa chỉ:</span> {doctor.address || "Đang cập nhật"}</p>
                            <p><i className="fas fa-genderless mr-2 text-blue-600"></i><span className="font-medium">Giới tính:</span> {doctor.sex || "Đang cập nhật"}</p>
                            <p><i className="fas fa-dollar-sign mr-2 text-blue-600"></i><span className="font-medium">Phí khám:</span> {doctor.fees || "Đang cập nhật"}</p>

                            <p><i className="fas fa-university mr-2 text-blue-600"></i><span className="font-medium">Trường:</span> {doctor.school || "Đang cập nhật"}</p>
                            <p><i className="fas fa-certificate mr-2 text-blue-600"></i><span className="font-medium">Chứng chỉ:</span> {doctor.certifications?.join(", ") || "Đang cập nhật"}</p>
                            <p><i className="fas fa-align-left mr-2 text-blue-600"></i><span className="font-medium">Mô tả:</span> {doctor.description || "Đang cập nhật"}</p>
                        </div>

                        <div className="text-center mt-6">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl shadow-lg transition-transform transform hover:scale-105"
                                onClick={() => setShowBooking(true)}
                            >
                                <i className="fas fa-calendar-check mr-2"></i> Đặt lịch khám bệnh
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            {/* Modal đặt lịch */}
            {showBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div
                        className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md space-y-6"
                        style={{
                            animation: 'fadeIn 0.3s ease-out forwards'
                        }}
                    >
                        <h2 className="text-2xl font-bold text-center text-gray-800">Đặt lịch khám bệnh</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Chọn ngày:</label>
                                <input
                                    type="date"
                                    className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => setBookingDate(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Chọn khung giờ:</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {slots.map((slot) => (
                                        <button
                                            key={slot}
                                            className={`py-2 px-3 rounded-xl border text-sm text-gray-700 hover:bg-blue-100
                                                ${selectedSlot === slot ? 'bg-blue-500 text-white font-semibold' : ''}`
                                            }
                                            onClick={() => setSelectedSlot(slot)}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
                                onClick={() => setShowBooking(false)}
                            >
                                <i className="fas fa-times mr-2"></i> Hủy
                            </button>
                            <button
                                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition"
                                onClick={handleConfirmBooking}  // Xử lý xác nhận và chuyển trang
                                disabled={!selectedSlot || !bookingDate}  // Kiểm tra điều kiện để xác nhận
                            >
                                <i className="fas fa-check mr-2"></i> Xác nhận
                            </button>
                        </div>
                    </div>

                    {/* Inline CSS animation */}
                    <style>{`
                        @keyframes fadeIn {
                            from { opacity: 0; transform: translateY(20px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                    `}</style>
                </div>
            )}
        </>
    );
}

export default DoctorDetails;

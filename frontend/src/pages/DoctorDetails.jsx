import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function DoctorDetails() {
    const { id } = useParams();
    const { doctorData } = useContext(AppContext);

    const doctor = doctorData.find((d) => d.id === id);

    if (!doctor) return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-16 text-center text-red-600 text-xl font-semibold">
                Không tìm thấy bác sĩ
            </div>
            <Footer />
        </>
    );

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 flex flex-col md:flex-row items-center gap-8">
                    <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-48 h-48 object-cover rounded-full border-4 border-blue-500 shadow-lg"
                    />
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{doctor.name}</h1>
                        <p className="text-blue-600 font-medium text-lg mb-4">{doctor.specialty}</p>

                        <div className="space-y-2 text-gray-700 text-sm md:text-base">
                            <p><span className="font-semibold">Kinh nghiệm:</span> {doctor.experience}</p>
                            <p><span className="font-semibold">Đánh giá:</span> ⭐ {doctor.rating} ({doctor.reviewCount} đánh giá)</p>
                            <p><span className="font-semibold">Học vấn:</span> {doctor.education}</p>
                            <p><span className="font-semibold">Chứng chỉ:</span> {doctor.certifications?.join(", ") || "Đang cập nhật"}</p>
                            <p><span className="font-semibold">Ngôn ngữ:</span> {doctor.languages?.join(", ") || "Đang cập nhật"}</p>
                            <p><span className="font-semibold">Lịch trống gần nhất:</span> {doctor.nextAvailable}</p>
                        </div>

                        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200">
                            Đặt lịch ngay
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

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
            <div className="container mx-auto px-4 py-8 text-center text-red-600">
                Không tìm thấy bác sĩ
            </div>
            <Footer />
        </>
    );

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-semibold mb-4">Thông tin bác sĩ: {doctor.name}</h1>
                <img src={doctor.image} alt={doctor.name} className="w-48 h-48 object-cover rounded-lg mb-4" />
                <p><strong>Chuyên khoa:</strong> {doctor.specialty}</p>
                <p><strong>Kinh nghiệm:</strong> {doctor.experience}</p>
                <p><strong>Đánh giá:</strong> {doctor.rating} ({doctor.reviewCount} đánh giá)</p>
                <p><strong>Học vấn:</strong> {doctor.education}</p>
                <p><strong>Chứng chỉ:</strong> {doctor.certifications?.join(", ") || "Đang cập nhật"}</p>
                <p><strong>Ngôn ngữ:</strong> {doctor.languages?.join(", ") || "Đang cập nhật"}</p>
                <p><strong>Lịch trống:</strong> {doctor.nextAvailable}</p>
            </div>
            <Footer />
        </>
    );
}

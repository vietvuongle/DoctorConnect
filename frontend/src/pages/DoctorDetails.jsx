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
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Bên trái: Ảnh + Kinh nghiệm */}
                    <div className="w-full md:w-1/3 flex flex-col items-center md:items-start gap-4">
                        <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-48 h-48 md:w-60 md:h-60 object-cover rounded-xl shadow-md border"
                        />

                        <div className="space-y-2 text-center md:text-left">
                            <h1 className="text-4xl font-bold text-gray-800">{doctor.name}</h1> {/* Tăng size chữ */}
                            <p className="text-xl text-gray-600">{doctor.specialty}</p> {/* Tăng size chữ */}
                            <p className="text-base text-gray-500">Kinh nghiệm: {doctor.experience}</p> {/* Tăng size chữ */}
                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                <span className="text-yellow-500 font-semibold">{doctor.rating} ★</span>
                                <span className="text-gray-500">({doctor.reviewCount} đánh giá)</span>
                            </div>
                        </div>
                    </div>

                    {/* Bên phải: Thông tin bác sĩ */}
                    <div className="w-full md:w-2/3 mx-auto space-y-8">
                        {/* Nhóm 1: 3 cột đầu tiên */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-lg text-gray-700">
                            <p><span className="font-medium">Học vấn:</span> {doctor.degree}</p>
                            <p><span className="font-medium">Email:</span> {doctor.email || "Đang cập nhật"}</p>
                            <p><span className="font-medium">Số điện thoại:</span> {doctor.phone || "Đang cập nhật"}</p>

                            <p><span className="font-medium">Địa chỉ:</span> {doctor.address || "Đang cập nhật"}</p>
                            <p><span className="font-medium">Giới tính:</span> {doctor.sex || "Đang cập nhật"}</p>
                            <p><span className="font-medium">Phí khám:</span> {doctor.fees || "Đang cập nhật"}</p>

                            <p><span className="font-medium">Trường:</span> {doctor.school || "Đang cập nhật"}</p> {/* Thêm trường trường học */}
                            <p><span className="font-medium">Chứng chỉ:</span> {doctor.certifications?.join(", ") || "Đang cập nhật"}</p> {/* Thêm chứng chỉ */}
                            <p><span className="font-medium">Mô tả:</span> {doctor.description || "Đang cập nhật"}</p> {/* Thêm mô tả */}
                        </div>
                    </div>

                </div>
            </div>
            <Footer />



        </>
    );
}

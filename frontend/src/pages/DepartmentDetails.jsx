import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ArrowLeft } from "lucide-react";

export function DepartmentDetails() {
    const { id } = useParams();
    const { departmentData, doctorData, handleSmoothScroll } = useContext(AppContext);

    const department = departmentData.find((item) => item.id === id);
    const departmentDoctors = doctorData.filter((doctor) => doctor.speciality === department.name);

    if (!department) {
        return (
            <>
                <div className="container mx-auto px-4 py-12">
                    <h2 className="text-2xl font-semibold text-red-600 text-center">Không tìm thấy chuyên khoa</h2>
                    <div className="text-center mt-6">
                        <Link to="/departments" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Quay lại
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="container mx-auto px-4 py-12">
                {/* Back Button */}
                <div className="mb-6">
                    <Link to="/departments" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Quay lại
                    </Link>
                </div>

                {/* Department Details */}
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-12">
                    <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
                        <img src={department.iconImage} alt={department.name} className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full shadow-md" />
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{department.name}</h1>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">{department.description}</p>
                            <h1 className="text-3xl md:text-3xl font-extrabold text-gray-900 mb-4">Giới thiệu</h1>

                            <div className="text-gray-700 prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: department.about }} />
                        </div>
                    </div>
                </div>

                {/* Doctors Section */}
                <div className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Đội ngũ bác sĩ</h2>
                    {departmentDoctors.length === 0 ? (
                        <p className="text-gray-600 text-lg text-center">Hiện tại chưa có bác sĩ nào thuộc chuyên khoa này.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {departmentDoctors.map((doctor) => (
                                <div key={doctor.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow">
                                    <img src={doctor.image || "https://via.placeholder.com/150"} alt={doctor.name} className="w-24 h-24 object-cover rounded-full mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{doctor.name}</h3>
                                    <p className="text-gray-600 text-center">Bác sĩ chuyên khoa {department.name}</p>
                                    <Link to={`/doctor/${doctor.id}`} onClick={() => handleSmoothScroll()} className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                                        Xem chi tiết
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default DepartmentDetails;

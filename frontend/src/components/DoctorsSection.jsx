import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
export function DoctorsSection() {
    const { handleSmoothScroll } = useContext(AppContext);

    const navigate = useNavigate();

    const { doctorData } = useContext(AppContext);

    return (
        <section id="doctors" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Đội ngũ bác sĩ</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Phòng khám của chúng tôi có đội ngũ bác sĩ giàu kinh nghiệm, tận tâm và chuyên môn cao trong nhiều lĩnh vực.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {doctorData.slice(0, 6).map((item, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <img src={item.image} alt={item.name} className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h3>
                                <p className="text-blue-600 font-medium mb-2">{item.speciality}</p>
                                <p className="text-gray-600 text-sm mb-4">{item.experience} kinh nghiệm</p>
                                <button
                                    onClick={() => {
                                        navigate(`/doctor/${item.id}`);
                                        handleSmoothScroll();
                                    }}
                                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Đặt lịch với bác sĩ
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

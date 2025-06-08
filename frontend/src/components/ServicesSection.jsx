import React from "react";
import { Stethoscope as StethoscopeIcon, Heart as HeartIcon, Brain as BrainIcon, Pill as PillIcon, Baby as BabyIcon, Eye as EyeIcon } from "lucide-react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

export function ServicesSection() {
    const { handleSmoothScroll } = useContext(AppContext);

    const services = [
        {
            icon: <StethoscopeIcon className="h-8 w-8 text-blue-600" />,
            title: "Khám tổng quát",
            description: "Dịch vụ khám sức khỏe tổng quát định kỳ với các gói khám phù hợp với mọi đối tượng.",
        },
        {
            icon: <HeartIcon className="h-8 w-8 text-blue-600" />,
            title: "Khám tim mạch",
            description: "Chẩn đoán và điều trị các bệnh lý tim mạch với trang thiết bị hiện đại.",
        },
        {
            icon: <BrainIcon className="h-8 w-8 text-blue-600" />,
            title: "Thần kinh",
            description: "Chuyên khoa thần kinh với đội ngũ bác sĩ giàu kinh nghiệm và chuyên môn cao.",
        },
        {
            icon: <PillIcon className="h-8 w-8 text-blue-600" />,
            title: "Nội khoa",
            description: "Chẩn đoán và điều trị các bệnh lý nội khoa thường gặp và chuyên sâu.",
        },
        {
            icon: <BabyIcon className="h-8 w-8 text-blue-600" />,
            title: "Nhi khoa",
            description: "Chăm sóc sức khỏe toàn diện cho trẻ em với môi trường thân thiện.",
        },
        {
            icon: <EyeIcon className="h-8 w-8 text-blue-600" />,
            title: "Mắt",
            description: "Khám và điều trị các bệnh về mắt với công nghệ và thiết bị hiện đại.",
        },
    ];

    const { departmentData } = useContext(AppContext);

    return (
        <section id="services" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Dịch vụ chuyên khoa</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Phòng khám của chúng tôi cung cấp nhiều dịch vụ y tế chất lượng cao với đội ngũ bác sĩ chuyên môn và trang thiết bị hiện đại.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {departmentData.slice(0, 6).map((item, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-start">
                            <img src={item.iconImage} className="bg-blue-50 ml-3 rounded-full w-20 h-20 mt-5 mb-4" alt="" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                                <p className="text-gray-600">{item.description}</p>
                                <Link to={`/department/${item.id}`} onClick={() => handleSmoothScroll()} className="mt-4 inline-block text-blue-600 font-medium hover:text-blue-700">
                                    Chi tiết →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

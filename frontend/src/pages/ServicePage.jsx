import React, { useState, cloneElement } from "react";
import { Link } from "react-router-dom";
import { Stethoscope as StethoscopeIcon, Heart as HeartIcon, Brain as BrainIcon, Baby as BabyIcon, Eye as EyeIcon, Bone as BoneIcon, Ear as EarIcon, PlusCircle as PlusCircleIcon, ChevronRight as ChevronRightIcon, ChevronDown as ChevronDownIcon, Search as SearchIcon } from "lucide-react";

export function ServicePage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [openFaq, setOpenFaq] = useState(null);

    const services = [
        {
            id: "kham-tong-quat",
            icon: <StethoscopeIcon className="h-6 w-6" />,
            name: "Khám tổng quát",
            description: "Dịch vụ khám sức khỏe tổng quát toàn diện, giúp phát hiện sớm các vấn đề sức khỏe tiềm ẩn.",
            benefits: ["Phát hiện sớm bệnh lý", "Đánh giá tổng thể sức khỏe", "Tư vấn chế độ sinh hoạt", "Theo dõi định kỳ"],
            packages: [
                {
                    name: "Cơ bản",
                    price: "1.200.000đ",
                    features: ["Khám tổng quát", "Xét nghiệm máu cơ bản", "Chụp X-quang ngực", "Điện tim"],
                },
                {
                    name: "Nâng cao",
                    price: "2.500.000đ",
                    features: ["Tất cả gói cơ bản", "Siêu âm ổ bụng", "Xét nghiệm nước tiểu", "Đo mật độ xương", "Tư vấn dinh dưỡng"],
                },
            ],
            faqs: [
                {
                    question: "Khi nào nên khám sức khỏe tổng quát?",
                    answer: "Bạn nên khám sức khỏe tổng quát định kỳ 6 tháng/lần hoặc ít nhất 1 lần/năm để theo dõi tình trạng sức khỏe.",
                },
                {
                    question: "Cần chuẩn bị gì khi đi khám?",
                    answer: "Bạn nên nhịn ăn 6-8 tiếng trước khi khám để đảm bảo kết quả xét nghiệm máu chính xác. Mang theo các kết quả khám trước đó nếu có.",
                },
            ],
        },
        {
            id: "tim-mach",
            icon: <HeartIcon className="h-6 w-6" />,
            name: "Tim mạch",
            description: "Chẩn đoán và điều trị các bệnh lý tim mạch với đội ngũ bác sĩ chuyên khoa giàu kinh nghiệm.",
            benefits: ["Tầm soát bệnh tim mạch", "Điều trị chuyên sâu", "Theo dõi liên tục", "Tư vấn phòng ngừa"],
            packages: [
                {
                    name: "Tầm soát cơ bản",
                    price: "1.500.000đ",
                    features: ["Khám chuyên khoa tim mạch", "Điện tim", "Siêu âm tim", "Xét nghiệm máu"],
                },
                {
                    name: "Chuyên sâu",
                    price: "3.500.000đ",
                    features: ["Tất cả gói cơ bản", "Holter điện tim 24h", "Đo huyết áp 24h", "Chụp mạch vành", "Tư vấn chuyên sâu"],
                },
            ],
            faqs: [
                {
                    question: "Những dấu hiệu nào cần đi khám tim mạch ngay?",
                    answer: "Đau thắt ngực, khó thở, hồi hộp đánh trống ngực, chóng mặt thường xuyên là những dấu hiệu cần đi khám ngay.",
                },
            ],
        },
    ];

    const categories = [
        {
            id: "all",
            name: "Tất cả dịch vụ",
        },
        {
            id: "kham-benh",
            name: "Khám bệnh",
        },
        {
            id: "xet-nghiem",
            name: "Xét nghiệm",
        },
        {
            id: "phau-thuat",
            name: "Phẫu thuật",
        },
        {
            id: "chuyen-khoa",
            name: "Chuyên khoa",
        },
    ];
    const filteredServices = services.filter((service) => {
        const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" || service.id.includes(selectedCategory);
        return matchesSearch && matchesCategory;
    });
    return (
        <div className="py-8 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Dịch vụ y tế</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">Chúng tôi cung cấp đa dạng các dịch vụ y tế chất lượng cao, đáp ứng mọi nhu cầu chăm sóc sức khỏe của bạn và gia đình.</p>
                </div>
                {/* Search and Filter */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input type="text" placeholder="Tìm kiếm dịch vụ..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {categories.map((category) => (
                                <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`px-4 py-2 rounded-md whitespace-nowrap ${selectedCategory === category.id ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Services List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredServices.map((service) => (
                        <div key={service.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-start mb-4">
                                    <div className="bg-blue-100 p-3 rounded-lg">{cloneElement(service.icon, { className: "h-6 w-6 text-blue-600" })}</div>
                                    <div className="ml-4">
                                        <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
                                        <p className="text-gray-600 mt-1">{service.description}</p>
                                    </div>
                                </div>
                                {/* Benefits */}
                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Lợi ích</h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {service.benefits.map((benefit, index) => (
                                            <li key={index} className="flex items-center text-gray-600">
                                                <PlusCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* Packages */}
                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Gói dịch vụ</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {service.packages.map((pkg, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h5 className="font-semibold text-gray-800">{pkg.name}</h5>
                                                    <span className="text-blue-600 font-semibold">{pkg.price}</span>
                                                </div>
                                                <ul className="space-y-2">
                                                    {pkg.features.map((feature, idx) => (
                                                        <li key={idx} className="flex items-center text-sm text-gray-600">
                                                            <ChevronRightIcon className="h-4 w-4 text-blue-600 mr-2" />
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* FAQs */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Câu hỏi thường gặp</h4>
                                    <div className="space-y-2">
                                        {service.faqs.map((faq, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg">
                                                <button className="w-full px-4 py-3 text-left flex justify-between items-center" onClick={() => setOpenFaq(openFaq === `${service.id}-${index}` ? null : `${service.id}-${index}`)}>
                                                    <span className="font-medium text-gray-800">{faq.question}</span>
                                                    <ChevronDownIcon className={`h-5 w-5 text-gray-500 transition-transform ${openFaq === `${service.id}-${index}` ? "transform rotate-180" : ""}`} />
                                                </button>
                                                {openFaq === `${service.id}-${index}` && (
                                                    <div className="px-4 py-3 border-t border-gray-200">
                                                        <p className="text-gray-600">{faq.answer}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Book Button */}
                                <div className="mt-6">
                                    <Link to={`/booking?service=${service.id}`} className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                                        Đặt lịch ngay
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
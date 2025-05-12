// import React, { useContext, useState } from "react";
// import { Search as SearchIcon, Filter as FilterIcon, Star as StarIcon, Calendar as CalendarIcon } from "lucide-react";
// import { Header } from "../components/Header";
// import { Footer } from "../components/Footer";
// import { AppContext } from "../context/AppContext";
// export function Doctors() {
//     const { departmentData } = useContext(AppContext);
//     const { doctorData } = useContext(AppContext);

//     const specialties = ["Tất cả chuyên khoa", "Tim mạch", "Nhi khoa", "Thần kinh", "Nội khoa", "Da liễu", "Mắt", "Tai Mũi Họng", "Cột sống"];
//     const doctors = [
//         {
//             id: 1,
//             name: "BS. Nguyễn Văn A",
//             specialty: "Tim mạch",
//             image: "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg",
//             experience: "15 năm kinh nghiệm",
//             rating: 4.9,
//             reviewCount: 124,
//             education: "Đại học Y Hà Nội",
//             certifications: ["Chứng chỉ Tim mạch Hoa Kỳ", "Thành viên Hội Tim mạch Việt Nam"],
//             languages: ["Tiếng Việt", "Tiếng Anh"],
//             nextAvailable: "Hôm nay, 14:00",
//         },
//         {
//             id: 2,
//             name: "BS. Trần Thị B",
//             specialty: "Nhi khoa",
//             image: "https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827776.jpg",
//             experience: "10 năm kinh nghiệm",
//             rating: 4.8,
//             reviewCount: 98,
//             education: "Đại học Y Dược TP.HCM",
//             certifications: ["Chuyên khoa Nhi", "Thành viên Hội Nhi khoa Việt Nam"],
//             languages: ["Tiếng Việt", "Tiếng Anh", "Tiếng Pháp"],
//             nextAvailable: "Mai, 09:30",
//         },
//         {
//             id: 3,
//             name: "BS. Lê Văn C",
//             specialty: "Thần kinh",
//             image: "https://img.freepik.com/free-photo/portrait-smiling-handsome-male-doctor-man_171337-5055.jpg",
//             experience: "12 năm kinh nghiệm",
//             rating: 4.7,
//             reviewCount: 156,
//             education: "Đại học Y Huế",
//             certifications: ["Chuyên khoa Thần kinh", "Nghiên cứu sinh tại Đức"],
//             languages: ["Tiếng Việt", "Tiếng Anh", "Tiếng Đức"],
//             nextAvailable: "Hôm nay, 16:30",
//         },
//         {
//             id: 4,
//             name: "BS. Phạm Thị D",
//             specialty: "Nội khoa",
//             image: "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg",
//             experience: "8 năm kinh nghiệm",
//             rating: 4.9,
//             reviewCount: 87,
//             education: "Đại học Y Dược TP.HCM",
//             certifications: ["Chuyên khoa Nội", "Tu nghiệp tại Singapore"],
//             languages: ["Tiếng Việt", "Tiếng Anh"],
//             nextAvailable: "Mai, 11:00",
//         },
//     ];

//     console.log(doctorData);

//     const [selectedSpecialty, setSelectedSpecialty] = useState("Tất cả chuyên khoa");
//     const [searchQuery, setSearchQuery] = useState("");

//     const filteredDoctors = doctorData.filter((doctor) => {
//         const specialtyIsAll = selectedSpecialty === "Tất cả chuyên khoa";
//         const specialtyMatches = doctor.specialty === selectedSpecialty;

//         // Kiểm tra điều kiện chuyên khoa
//         const matchesSpecialty = specialtyIsAll || specialtyMatches;

//         // Tìm kiếm tên hoặc chuyên khoa chứa từ khóa
//         const nameMatches = doctor.name.toLowerCase().includes(searchQuery.toLowerCase());
//         const specialtyContainsQuery = doctor.speciality.toLowerCase().includes(searchQuery.toLowerCase());

//         const matchesSearch = nameMatches || specialtyContainsQuery;

//         // Chỉ giữ lại bác sĩ thỏa cả 2 điều kiện
//         return matchesSpecialty && matchesSearch;
//     });

//     return (
//         <>
//             <Header />
//             <div className="py-8 bg-gray-50 mb-10">
//                 <div className="container mx-auto px-4">
//                     {/* Page Header */}
//                     <div className="mb-8 text-center">
//                         <p className="text-gray-800 text-3xl font-semibold">Tìm kiếm và đặt lịch với bác sĩ chuyên khoa</p>
//                     </div>
//                     {/* Search and Filter */}
//                     <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
//                         <div className="flex flex-col md:flex-row gap-4">
//                             <div className="flex-1 relative">
//                                 <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                                 <input
//                                     type="text"
//                                     placeholder="Tìm kiếm theo tên bác sĩ hoặc chuyên khoa..."
//                                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     value={searchQuery}
//                                     onChange={(e) => setSearchQuery(e.target.value)}
//                                 />
//                             </div>
//                             <div className="relative">
//                                 <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                                 <select className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white" value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)}>
//                                     {specialties.map((specialty) => (
//                                         <option key={specialty} value={specialty}>
//                                             {specialty}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                     {/* Doctors List */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-[4%]">
//                         {filteredDoctors.map((doctor, index) => (
//                             <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
//                                 <div className="flex flex-col md:flex-row">
//                                     <div>
//                                         <img src={doctor.image} alt={doctor.name} className="lg:w-60 lg:h-60  sm:w-36 sm:h-36 object-cover" />
//                                     </div>
//                                     <div className="md:w-2/3 p-6">
//                                         <div className="flex justify-between items-start mb-2">
//                                             <div>
//                                                 <h2 className="text-xl font-semibold text-gray-800">Bác Sĩ: {doctor.name}</h2>
//                                                 <p className="text-blue-600">{doctor.speciality}</p>
//                                             </div>
//                                             <div className="flex items-center">
//                                                 <StarIcon className="h-5 w-5 text-yellow-400 fill-yellow-400" />
//                                                 <span className="ml-1 text-gray-600">{doctor.rating}</span>
//                                                 <span className="text-gray-400 text-sm ml-1">({doctor.reviewCount})</span>
//                                             </div>
//                                         </div>
//                                         <div className="mb-4">
//                                             <p className="text-gray-600 text-sm mb-1">{doctor.experience} kinh nghiệm</p>
//                                             <p className="text-gray-600 text-sm mb-1">Trường đại học y dược Huế</p>
//                                             <div className="flex flex-wrap gap-2 mt-2">
//                                                 <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">{doctor.degree}</span>
//                                                 <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">{doctor.degree}</span>
//                                             </div>
//                                         </div>
//                                         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                                             <div className="flex items-center text-green-600">
//                                                 <CalendarIcon className="h-5 w-5 mr-1" />
//                                                 <span className="text-sm">Lịch trống: {doctor.nextAvailable}</span>
//                                             </div>
//                                             <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto">Đặt lịch khám</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             <Footer />
//         </>
//     );
// }

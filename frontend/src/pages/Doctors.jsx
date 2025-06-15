import React, { useContext, useState } from "react";
import { Search as SearchIcon, Filter as FilterIcon, Star as StarIcon, Calendar as CalendarIcon } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

export function Doctors() {
    const { departmentData, handleSmoothScroll } = useContext(AppContext);
    const { doctorData } = useContext(AppContext);

    const [selectedSpecialty, setSelectedSpecialty] = useState("Tất cả chuyên khoa");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredDoctors = doctorData.filter((doctor) => {
        const specialtyIsAll = selectedSpecialty === "Tất cả chuyên khoa";
        const specialtyMatches = doctor.speciality === selectedSpecialty;

        // Kiểm tra điều kiện chuyên khoa
        const matchesSpecialty = specialtyIsAll || specialtyMatches;

        // Tìm kiếm tên hoặc chuyên khoa chứa từ khóa
        const nameMatches = doctor.name.toLowerCase().includes(searchQuery.toLowerCase());
        const specialtyContainsQuery = doctor.speciality.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesSearch = nameMatches || specialtyContainsQuery;

        // Chỉ giữ lại bác sĩ thỏa cả 2 điều kiện
        return matchesSpecialty && matchesSearch;
    });

    return (
        <div className="py-8 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Page Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Đội ngũ bác sĩ</h1>
                </div>
                {/* Search and Filter */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input type="text" placeholder="Tìm kiếm theo tên bác sĩ hoặc chuyên khoa..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <div className="relative">
                            <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <select className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white" value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)}>
                                <option value="Tất cả chuyên khoa">Tất cả chuyên khoa</option>
                                {departmentData.map((item, index) => (
                                    <option key={index} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {/* Doctors List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredDoctors.map((doctor, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/3">
                                    <img src={doctor.image} alt={doctor.name} className="w-full md:h-full sm:w-48 sm:h-48 object-cover" />
                                </div>
                                <div className="md:w-2/3 p-6">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                {/* <Link to={`/doctor/${doctor.id}`}> */}
                                                <h2 className="text-xl font-semibold text-gray-800 hover:underline">Bác Sĩ: {doctor.name}</h2>
                                                {/* </Link> */}
                                                <p className="text-blue-600">{doctor.speciality}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <StarIcon className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                                <span className="ml-1 text-gray-600">{doctor.rating}</span>
                                                <span className="text-gray-400 text-sm ml-1">({doctor.reviewCount})</span>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <p className="text-gray-600 text-sm mb-1">{doctor.experience} kinh nghiệm</p>
                                            <p className="text-gray-600 text-sm mb-1">Trường đại học y dược Huế</p>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">{doctor.degree}</span>
                                                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">{doctor.degree}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <div className="flex items-center text-green-600"></div>
                                            <Link to={`/doctor/${doctor.id}`}>
                                                <button onClick={() => handleSmoothScroll()} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto">
                                                    Xem chi tiết
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

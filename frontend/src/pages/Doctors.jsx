import React, { useContext, useState } from "react";
import { Search as SearchIcon, Filter as FilterIcon, Star as StarIcon, Calendar as CalendarIcon } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

export function Doctors() {
    const { departmentData, handleSmoothScroll, clinicData } = useContext(AppContext);
    const { doctorData } = useContext(AppContext);

    const navigate = useNavigate();

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

    const getClinicNameById = (id) => {
        const clinic = clinicData.find((c) => c.id === id);
        return clinic ? clinic.address : "Không rõ";
    };

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredDoctors.map((item, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <img
                                onClick={() => {
                                    navigate(`/doctor/${item.id}`);
                                    handleSmoothScroll();
                                }}
                                src={item.image}
                                alt={item.name}
                                className="w-full h-64 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h3>
                                <p className="text-blue-600 font-medium mb-2">{item.speciality}</p>
                                <p className="text-gray-600 mb-3">Địa chỉ: {getClinicNameById(item.clinicId)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

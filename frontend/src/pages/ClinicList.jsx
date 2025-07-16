import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export function ClinicList() {
    const { clinicData, removeVietnameseTones, handleSmoothScroll } = useContext(AppContext);

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [clinicsPerPage] = useState(5);

    const filteredClinics = clinicData.filter((clinic) =>
        removeVietnameseTones(clinic.name || "")
            .toLowerCase()
            .includes(removeVietnameseTones(searchTerm).toLowerCase())
    );

    // Phân trang
    const indexOfLastClinic = currentPage * clinicsPerPage;
    const indexOfFirstClinic = indexOfLastClinic - clinicsPerPage;
    const currentClinics = filteredClinics.slice(indexOfFirstClinic, indexOfLastClinic);
    const totalPages = Math.ceil(filteredClinics.length / clinicsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        filteredClinics && (
            <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Danh sách phòng khám</h1>

                {/* Thanh tìm kiếm */}
                <div className="mb-6 flex justify-end">
                    <input type="text" className="w-full md:w-1/2 lg:w-1/3 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" placeholder="Nhập tên phòng khám ..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>

                {/* Danh sách phòng khám */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentClinics.map((clinic) => (
                        <div key={clinic.id} className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition duration-300 text-center">
                            <img src={clinic.image} alt={clinic.name} className="w-full h-40 mx-auto object-cover rounded-lg mb-4" />
                            <h2 className="text-xl font-semibold text-gray-800">{clinic.name}</h2>
                            <Link to={`/clinic/${clinic.id}`}>
                                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200" onClick={() => handleSmoothScroll()}>
                                    Xem chi tiết
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Phân trang */}
                {filteredClinics.length > clinicsPerPage && (
                    <div className="mt-6 flex justify-center">
                        <nav>
                            <ul className="flex space-x-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                    <li key={number}>
                                        <button onClick={() => paginate(number)} className={`px-3 py-1 rounded-full ${currentPage === number ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                                            {number}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        )
    );
}
export default ClinicList;

import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const HealthcareFacilities = () => {
    const { clinicData, handleSmoothScroll } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 mb-10 bg-white">
            <h2 className="text-2xl font-bold my-6 text-center text-gray-800">Danh sách cơ sở y tế</h2>
            {/* Danh sách phòng khám */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clinicData.map((clinic) => (
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
            <div className="mt-12 text-center">
                <button
                    onClick={() => {
                        navigate("/clinics");
                        handleSmoothScroll();
                    }}
                    className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                    Xem thêm
                </button>
            </div>
        </div>
    );
};

export default HealthcareFacilities;

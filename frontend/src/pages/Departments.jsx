import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ArrowRight } from "lucide-react";

export function Departments() {
    const { departmentData, handleSmoothScroll } = useContext(AppContext);

    return (
        <>
            <div className="container mx-auto px-4 py-12">
                {/* Page Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Danh Sách Chuyên Khoa</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">Khám phá các chuyên khoa của chúng tôi, nơi cung cấp dịch vụ y tế chuyên sâu với đội ngũ bác sĩ hàng đầu.</p>
                </div>

                {/* Departments Grid */}
                {departmentData.length === 0 ? (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-semibold text-red-600">Hiện tại chưa có chuyên khoa nào.</h2>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {departmentData.map((item) => (
                            <div key={item.id} className="bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-start">
                                <img src={item.iconImage} className="bg-blue-50 ml-3 rounded-full w-20 h-20 mt-5 mb-4" alt="" />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                    <Link to={`/department/${item.id}`} onClick={() => handleSmoothScroll()} className="mt-4 flex text-blue-600 font-medium hover:text-blue-700">
                                        Chi tiết
                                        <ArrowRight className="w-5 h-5 ml-2 mt-0.5" />
                                    </Link>
                                </div>
                            </div>

                            // <div key={department.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow">
                            //     <img src={department.iconImage} alt={department.name} className="w-24 h-24 object-cover rounded-full mb-4" />
                            //     <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">{department.name}</h2>
                            //     <p className="text-gray-600 text-sm text-center mb-4">{department.description}</p>
                            //     <div className="text-gray-700 text-sm text-center line-clamp-3 mb-4" dangerouslySetInnerHTML={{ __html: department.about }} />
                            //     <Link to={`/departments/${department.id}`} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                            //         Xem chi tiết
                            //     </Link>
                            // </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Departments;

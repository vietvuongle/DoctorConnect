import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function DepartmentDetails() {
    const { id } = useParams();
    const { departmentData } = useContext(AppContext);

    const department = departmentData.find(item => String(item.id) === id);

    if (!department) {
        return (
            <>

                <div className="container mx-auto p-4">
                    <h2 className="text-xl font-semibold text-red-500 text-center">Không tìm thấy chuyên khoa</h2>
                </div>

            </>
        );
    }

    return (
        <>
            <div className="container mx-auto p-6 max-w-md flex flex-col items-center">
                <img
                    src={department.iconImage}
                    alt={department.name}
                    className="w-48 h-48 object-cover rounded-full shadow-md mb-6"
                />
                <h1 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">{department.name}</h1>
                <p className="text-gray-700 text-base leading-relaxed text-center">{department.description}</p>
            </div>
        </>
    );
}

export default DepartmentDetails;

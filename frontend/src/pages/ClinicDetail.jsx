import React, { useContext, useEffect, useState } from "react";
import { MapPinIcon, MailIcon, ClockIcon, PhoneIcon, StethoscopeIcon } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import DoctorByClinicSection from "../components/DoctorByClinicSection";

const ClinicDetail = () => {
    const { clinicData, token, backendUrl } = useContext(AppContext);

    const [doctorData, setDoctorData] = useState([]);

    const { id } = useParams();

    const getDoctorDataByClinicId = async () => {
        try {
            const { data } = await axios.get(backendUrl + `/api/clinic/all-doctor/${id}`);

            if (data !== false) {
                setDoctorData(data.result);
                console.log("doctorData", data.result);
            } else {
                toast.error("Error");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const clinicDataByClinicId = clinicData.find((clinic) => clinic.id === id);

    // Mock data for doctors

    useEffect(() => {
        getDoctorDataByClinicId();
    }, []);

    return (
        clinicDataByClinicId && (
            <div className="min-h-screen bg-gray-100">
                {/* Hero Section */}
                <div className="relative h-[300px]">
                    <img src={clinicDataByClinicId.image} alt={clinicDataByClinicId.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h1 className="text-3xl font-bold mb-2">{clinicDataByClinicId.name}</h1>
                        <div className=" items-center space-x-4">
                            <div className="flex items-center ml-4">
                                <MapPinIcon className="w-5 h-5 mr-2 " />
                                <span>{clinicDataByClinicId.address}</span>
                            </div>
                            <div className="flex items-center ">
                                <MailIcon className="w-5 h-5 mr-2" />
                                <span>{clinicDataByClinicId.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Description */}
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                                <div
                                    className="font-calibri overflow-y-auto p-4 bg-gray-50 rounded-md border border-gray-200 shadow-sm tiptap-content"
                                    dangerouslySetInnerHTML={{
                                        __html: clinicDataByClinicId.description,
                                    }}
                                />
                            </div>
                        </div>
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            {/* Contact Info */}
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                                <h2 className="text-xl font-bold mb-4">Thông tin liên hệ</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <MapPinIcon className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="font-medium">Địa chỉ</p>
                                            <p className="text-gray-600">{clinicDataByClinicId.address}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <MailIcon className="w-5 h-5 mr-3 text-blue-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <p className="text-gray-600">{clinicDataByClinicId.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Doctors Section */}
                    <DoctorByClinicSection doctorData={doctorData} />
                </div>

                <style>
                    {`
          .font-calibri {
            font-family: 'Calibri', 'Arial', sans-serif;
          }
          .tiptap-content {
            font-family: 'Calibri', 'Arial', sans-serif !important;
            font-size: 13pt;
            line-height: 1.15;
            color: #2E2E2E;
          }
          .tiptap-content p {
            margin: 0 0 4pt 0;
          }
          .tiptap-content h1 {
            font-size: 26pt;
            font-weight: bold;
            margin: 22pt 0 12pt 0;
            line-height: 1.1;
            color: #2E2E2E;
          }
          .tiptap-content h2 {
            font-size: 20pt;
            font-weight: bold;
            margin: 18pt 0 10pt 0;
            line-height: 1.1;
            color: #2E2E2E;
          }
          .tiptap-content h3 {
            font-size: 16pt;
            font-weight: bold;
            margin: 14pt 0 8pt 0;
            line-height: 1.1;
            color: #2E2E2E;
          }
          .tiptap-content ul,
          .tiptap-content ol {
            padding-left: 36pt;
            margin: 11pt 0;
          }
          .tiptap-content ul li,
          .tiptap-content ol li {
            margin-bottom: 6pt;
            line-height: 1.15;
          }
          .tiptap-content ul {
            list-style-type: disc;
          }
          .tiptap-content ol {
            list-style-type: decimal;
          }
        `}
                </style>
            </div>
        )
    );
};
export default ClinicDetail;

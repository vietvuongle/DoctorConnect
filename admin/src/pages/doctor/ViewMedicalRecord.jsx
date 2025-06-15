import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon, SearchIcon, FilterIcon, PrinterIcon, DownloadIcon, ChevronDownIcon, FileTextIcon, CalendarIcon, UserIcon } from "lucide-react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";

const ViewMedicalRecord = () => {
    const { backendUrl, dToken, formatDateHeader, appointmentData } = useContext(DoctorContext);
    const { doctorData } = useContext(AdminContext);

    const { patientId } = useParams();

    const [userData, setUserData] = useState({});
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRecord, setSelectedRecord] = useState(null);
    // const medicalRecords = [
    //     {
    //         id: 1,
    //         date: "2024-03-15",
    //         doctor: "Bs. Lê Văn Minh Toàn",
    //         department: "Khám tổng quát",
    //         diagnosis: "Viêm đường hô hấp trên",
    //         symptoms: "Ho, sốt nhẹ, đau họng",
    //         examination: "Nhiệt độ 37.8°C, họng đỏ, hạch lympho cổ không sưng, phổi không ran",
    //         treatment: "Điều trị triệu chứng, nghỉ ngơi",
    //         prescriptions: [
    //             {
    //                 medicine: "Paracetamol 500mg",
    //                 dosage: "1 viên",
    //                 frequency: "4 lần/ngày",
    //                 duration: "5 ngày",
    //             },
    //             {
    //                 medicine: "Vitamin C 500mg",
    //                 dosage: "1 viên",
    //                 frequency: "1 lần/ngày",
    //                 duration: "7 ngày",
    //             },
    //         ],
    //         notes: "Tái khám sau 1 tuần nếu không đỡ",
    //         attachments: ["xquang.pdf", "xetnghiem.pdf"],
    //     },
    //     {
    //         id: 2,
    //         date: "2024-02-20",
    //         doctor: "Bs. Nguyễn Thị Hương",
    //         department: "Da liễu",
    //         diagnosis: "Viêm da cơ địa",
    //         symptoms: "Ngứa, phát ban da",
    //         examination: "Phát ban da vùng cánh tay, không sốt",
    //         treatment: "Bôi thuốc, uống thuốc",
    //         prescriptions: [
    //             {
    //                 medicine: "Kem Hydrocortisone 1%",
    //                 dosage: "Bôi nhẹ",
    //                 frequency: "2 lần/ngày",
    //                 duration: "7 ngày",
    //             },
    //         ],
    //         notes: "Tránh các chất kích ứng da",
    //         attachments: [],
    //     },
    // ];

    const userInfomation = appointmentData.find((app) => app.userId === patientId);

    const getMedicalRecord = async (patientId) => {
        try {
            const url = backendUrl + `/api/medicalRecords/getRecord/${patientId}`;
            let headers = {
                Authorization: "Bearer " + dToken,
            };
            const { data } = await axios.get(url, {
                headers: headers,
            });

            setMedicalRecords(data);
        } catch (error) {}
    };

    const getUserByUserId = async (patientId) => {
        try {
            let headers = { Authorization: "Bearer " + dToken };
            const { data } = await axios.get(`${backendUrl}/api/doctor/getUser/${patientId}`, {
                headers,
            });
            if (data !== false) {
                setUserData(data.result);
            } else {
                toast.error("Có lỗi xảy ra khi lấy thông tin bệnh nhân");
            }
        } catch (error) {
            toast.error("Lỗi khi gọi API: " + error.message);
        }
    };

    useEffect(() => {
        if (patientId) {
            getUserByUserId(patientId);
        }
    }, [patientId, dToken]);

    useEffect(() => {
        getMedicalRecord(patientId);
    }, [patientId, dToken]);

    return (
        userInfomation && (
            <div className="min-h-screen bg-gray-100 py-8 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center">
                            <Link to="/doctor/patient" className="flex items-center text-blue-600 hover:text-blue-800">
                                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                                Quay lại
                            </Link>
                        </div>
                        <div className="flex space-x-3">
                            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                                <PrinterIcon className="w-5 h-5 mr-2" />
                                In hồ sơ
                            </button>
                            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                                <DownloadIcon className="w-5 h-5 mr-2" />
                                Xuất PDF
                            </button>
                        </div>
                    </div>
                    <div className="">
                        {/* userData Information */}
                        <div className="p-6 space-y-6 my-5 bg-white">
                            <div className="flex flex-col lg:flex-row items-center gap-12">
                                {/* Avatar */}
                                <div className="flex justify-center lg:justify-start w-full lg:w-auto">
                                    <div className="h-32 w-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-bold">{userData && userData.name ? userData.name.charAt(0) : "?"}</div>
                                </div>

                                {/* Patient Info */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-xl flex-1 w-full">
                                    <div>
                                        <label className="text-base font-semibold text-gray-800">Họ và tên</label>
                                        <p className="mt-1 text-sm text-gray-700">{userInfomation.patientName}</p>
                                    </div>
                                    <div>
                                        <label className="text-base font-semibold text-gray-800">Mã bệnh nhân</label>
                                        <p className="mt-1 text-sm text-gray-700 truncate overflow-hidden whitespace-nowrap">{userInfomation.userId}</p>
                                    </div>
                                    <div>
                                        <label className="text-base font-semibold text-gray-800">Ngày sinh</label>
                                        <p className="mt-1 text-sm text-gray-700">{formatDateHeader(userInfomation.dob)}</p>
                                    </div>
                                    <div>
                                        <label className="text-base font-semibold text-gray-800">Giới tính</label>
                                        <p className="mt-1 text-sm text-gray-700">{userInfomation.gender}</p>
                                    </div>

                                    <div>
                                        <label className="text-base font-semibold text-gray-800">Số điện thoại</label>
                                        <p className="mt-1 text-sm text-gray-700">{userInfomation.phone}</p>
                                    </div>
                                    <div>
                                        <label className="text-base font-semibold text-gray-800">Email</label>
                                        <p className="mt-1 text-sm text-gray-700">{userData.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Medical Records */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow">
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                                        <h2 className="text-xl font-bold text-gray-900">Lịch sử khám bệnh</h2>
                                        <div className="flex space-x-4">
                                            <div className="relative">
                                                <input type="text" placeholder="Tìm kiếm..." className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                                <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-4">
                                        {medicalRecords.map((record) => (
                                            <div key={record.medicalRecord.id} className="border rounded-lg overflow-hidden">
                                                <div
                                                    className={`px-4 py-3 flex items-center justify-between cursor-pointer ${selectedRecord === record.medicalRecord.id ? "bg-blue-50" : "bg-gray-50"}`}
                                                    onClick={() => setSelectedRecord(selectedRecord === record.medicalRecord.id ? null : record.medicalRecord.id)}
                                                >
                                                    <div className="flex items-center space-x-4">
                                                        <CalendarIcon className="w-5 h-5 text-gray-400" />
                                                        <div>
                                                            <p className="font-medium text-gray-900">{formatDateHeader(record.medicalRecord.createdAt)}</p>
                                                            <p className="text-sm text-gray-500">
                                                                {(() => {
                                                                    const doctor = doctorData.find((d) => d.id.toString() === record.medicalRecord.doctorId.toString());
                                                                    return doctor ? `${doctor.name} • ${doctor.speciality}` : "Không tìm thấy bác sĩ";
                                                                })()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <ChevronDownIcon className={`w-5 h-5 text-gray-400 transform transition-transform ${selectedRecord === record.id ? "rotate-180" : ""}`} />
                                                </div>

                                                {selectedRecord === record.medicalRecord.id && (
                                                    <div className="px-4 py-3 border-t space-y-4">
                                                        <div>
                                                            <label className="text-base font-semibold text-gray-800">Chẩn đoán</label>
                                                            <p className="mt-1 text-sm text-gray-700">{record.medicalRecord.diagnosis}</p>
                                                        </div>

                                                        <div>
                                                            <label className="text-base font-semibold text-gray-800">Triệu chứng</label>
                                                            <p className="mt-1 text-sm text-gray-700">{record.medicalRecord.symptoms}</p>
                                                        </div>

                                                        <div>
                                                            <label className="text-base font-semibold text-gray-800">Khám lâm sàng</label>
                                                            <p className="mt-1 text-sm text-gray-700">{record.medicalRecord.examination}</p>
                                                        </div>

                                                        <div>
                                                            <label className="text-base font-semibold text-gray-800">Phương pháp điều trị</label>
                                                            <p className="mt-1 text-sm text-gray-700">{record.medicalRecord.treatment}</p>
                                                        </div>

                                                        {/* Đơn thuốc */}
                                                        <div>
                                                            <label className="text-base font-semibold text-gray-800 mb-2 block">Đơn thuốc</label>
                                                            <div className="overflow-x-auto">
                                                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                                                    <thead className="bg-gray-50">
                                                                        <tr>
                                                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Thuốc</th>
                                                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Liều lượng</th>
                                                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tần suất</th>
                                                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Thời gian</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                                        {record.prescriptions.map((prescription, index) => (
                                                                            <tr key={index}>
                                                                                <td className="px-3 py-2 whitespace-nowrap text-gray-700">{prescription.medicineName}</td>
                                                                                <td className="px-3 py-2 whitespace-nowrap text-gray-700">{prescription.dosage}</td>
                                                                                <td className="px-3 py-2 whitespace-nowrap text-gray-700">{prescription.frequency}</td>
                                                                                <td className="px-3 py-2 whitespace-nowrap text-gray-700">{prescription.duration}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>

                                                        {/* Ghi chú */}
                                                        {record.medicalRecord.notes && (
                                                            <div>
                                                                <label className="text-base font-semibold text-gray-800">Ghi chú</label>
                                                                <p className="mt-1 text-sm text-gray-700">{record.medicalRecord.notes}</p>
                                                            </div>
                                                        )}

                                                        {/* Tài liệu đính kèm */}
                                                        {/* {record.length > 0 && (
                                                        <div>
                                                            <label className="text-base font-semibold text-gray-800 mb-2 block">Tài liệu đính kèm</label>
                                                            <div className="flex flex-wrap gap-2">
                                                                {record.attachments.map((file, index) => (
                                                                    <a key={index} href="#" className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200">
                                                                        <FileTextIcon className="w-4 h-4 mr-1" />
                                                                        {file}
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )} */}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
export default ViewMedicalRecord;

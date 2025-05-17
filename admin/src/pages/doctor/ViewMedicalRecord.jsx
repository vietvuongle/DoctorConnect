import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, SearchIcon, FilterIcon, PrinterIcon, DownloadIcon, ChevronDownIcon, FileTextIcon, CalendarIcon, UserIcon } from "lucide-react";
const ViewMedicalRecord = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRecord, setSelectedRecord] = useState(null);
    // Mock data
    const patient = {
        id: "BN001",
        name: "Nguyễn Văn A",
        dateOfBirth: "15/05/1990",
        gender: "Nam",
        address: "Hà Nội",
        phone: "0987654321",
        bloodType: "O+",
        allergies: "Không",
    };
    const medicalRecords = [
        {
            id: 1,
            date: "2024-03-15",
            doctor: "Bs. Lê Văn Minh Toàn",
            department: "Khám tổng quát",
            diagnosis: "Viêm đường hô hấp trên",
            symptoms: "Ho, sốt nhẹ, đau họng",
            examination: "Nhiệt độ 37.8°C, họng đỏ, hạch lympho cổ không sưng, phổi không ran",
            treatment: "Điều trị triệu chứng, nghỉ ngơi",
            prescriptions: [
                {
                    medicine: "Paracetamol 500mg",
                    dosage: "1 viên",
                    frequency: "4 lần/ngày",
                    duration: "5 ngày",
                },
                {
                    medicine: "Vitamin C 500mg",
                    dosage: "1 viên",
                    frequency: "1 lần/ngày",
                    duration: "7 ngày",
                },
            ],
            notes: "Tái khám sau 1 tuần nếu không đỡ",
            attachments: ["xquang.pdf", "xetnghiem.pdf"],
        },
        {
            id: 2,
            date: "2024-02-20",
            doctor: "Bs. Nguyễn Thị Hương",
            department: "Da liễu",
            diagnosis: "Viêm da cơ địa",
            symptoms: "Ngứa, phát ban da",
            examination: "Phát ban da vùng cánh tay, không sốt",
            treatment: "Bôi thuốc, uống thuốc",
            prescriptions: [
                {
                    medicine: "Kem Hydrocortisone 1%",
                    dosage: "Bôi nhẹ",
                    frequency: "2 lần/ngày",
                    duration: "7 ngày",
                },
            ],
            notes: "Tránh các chất kích ứng da",
            attachments: [],
        },
    ];
    const filteredRecords = medicalRecords.filter((record) => record.doctor.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
        <div className="min-h-screen bg-gray-100 py-8 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/doctor/dashboard" className="flex items-center text-blue-600 hover:text-blue-800">
                            <ArrowLeftIcon className="w-5 h-5 mr-2" />
                            Quay lại Dashboard
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
                    {/* Patient Information */}
                    <div className="p-6 space-y-6 my-5 bg-white">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            {/* Avatar */}
                            <div className="flex justify-center lg:justify-start w-full lg:w-auto">
                                <div className="h-32 w-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-bold">{patient.name.charAt(0)}</div>
                            </div>

                            {/* Patient Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-xl flex-1 w-full">
                                <div>
                                    <label className="text-base font-semibold text-gray-800">Họ và tên</label>
                                    <p className="mt-1 text-sm text-gray-700">{patient.name}</p>
                                </div>
                                <div>
                                    <label className="text-base font-semibold text-gray-800">Mã bệnh nhân</label>
                                    <p className="mt-1 text-sm text-gray-700">{patient.id}</p>
                                </div>
                                <div>
                                    <label className="text-base font-semibold text-gray-800">Ngày sinh</label>
                                    <p className="mt-1 text-sm text-gray-700">{patient.dateOfBirth}</p>
                                </div>
                                <div>
                                    <label className="text-base font-semibold text-gray-800">Giới tính</label>
                                    <p className="mt-1 text-sm text-gray-700">{patient.gender}</p>
                                </div>
                                <div>
                                    <label className="text-base font-semibold text-gray-800">Địa chỉ</label>
                                    <p className="mt-1 text-sm text-gray-700">{patient.address}</p>
                                </div>
                                <div>
                                    <label className="text-base font-semibold text-gray-800">Số điện thoại</label>
                                    <p className="mt-1 text-sm text-gray-700">{patient.phone}</p>
                                </div>
                                <div>
                                    <label className="text-base font-semibold text-gray-800">Nhóm máu</label>
                                    <p className="mt-1 text-sm text-gray-700">{patient.bloodType}</p>
                                </div>
                                <div>
                                    <label className="text-base font-semibold text-gray-800">Dị ứng</label>
                                    <p className="mt-1 text-sm text-gray-700">{patient.allergies}</p>
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
                                        <Link to="/doctor/create-medical/" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                            Tạo mới
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4">
                                    {filteredRecords.map((record) => (
                                        <div key={record.id} className="border rounded-lg overflow-hidden">
                                            <div className={`px-4 py-3 flex items-center justify-between cursor-pointer ${selectedRecord === record.id ? "bg-blue-50" : "bg-gray-50"}`} onClick={() => setSelectedRecord(selectedRecord === record.id ? null : record.id)}>
                                                <div className="flex items-center space-x-4">
                                                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                                                    <div>
                                                        <p className="font-medium text-gray-900">{new Date(record.date).toLocaleDateString("vi-VN")}</p>
                                                        <p className="text-sm text-gray-500">
                                                            {record.doctor} • {record.department}
                                                        </p>
                                                    </div>
                                                </div>
                                                <ChevronDownIcon className={`w-5 h-5 text-gray-400 transform transition-transform ${selectedRecord === record.id ? "rotate-180" : ""}`} />
                                            </div>

                                            {selectedRecord === record.id && (
                                                <div className="px-4 py-3 border-t space-y-4">
                                                    <div>
                                                        <label className="text-base font-semibold text-gray-800">Chẩn đoán</label>
                                                        <p className="mt-1 text-sm text-gray-700">{record.diagnosis}</p>
                                                    </div>

                                                    <div>
                                                        <label className="text-base font-semibold text-gray-800">Triệu chứng</label>
                                                        <p className="mt-1 text-sm text-gray-700">{record.symptoms}</p>
                                                    </div>

                                                    <div>
                                                        <label className="text-base font-semibold text-gray-800">Khám lâm sàng</label>
                                                        <p className="mt-1 text-sm text-gray-700">{record.examination}</p>
                                                    </div>

                                                    <div>
                                                        <label className="text-base font-semibold text-gray-800">Phương pháp điều trị</label>
                                                        <p className="mt-1 text-sm text-gray-700">{record.treatment}</p>
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
                                                                            <td className="px-3 py-2 whitespace-nowrap text-gray-700">{prescription.medicine}</td>
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
                                                    {record.notes && (
                                                        <div>
                                                            <label className="text-base font-semibold text-gray-800">Ghi chú</label>
                                                            <p className="mt-1 text-sm text-gray-700">{record.notes}</p>
                                                        </div>
                                                    )}

                                                    {/* Tài liệu đính kèm */}
                                                    {record.attachments.length > 0 && (
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
                                                    )}
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
    );
};
export default ViewMedicalRecord;

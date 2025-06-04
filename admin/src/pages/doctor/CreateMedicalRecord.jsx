import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon, SaveIcon, PlusIcon, UploadIcon } from "lucide-react";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";
import axios from "axios";

const CreateMedicalRecord = () => {
    const { appointmentId } = useParams();
    const { backendUrl, dToken, appointmentData, formatDateHeader, getAllAppointment } = useContext(DoctorContext);

    const doctorId = localStorage.getItem("doctorId");

    const userInfomation = appointmentData.find((app) => app._id === appointmentId);

    console.log("userInfomation", userInfomation);

    const [formData, setFormData] = useState({
        appointmentId: appointmentId,
        patientName: userInfomation?.patientName,
        patientId: userInfomation?.userId,
        dateOfBirth: userInfomation?.dob,
        gender: userInfomation?.gender,
        phone: userInfomation?.phone,
        doctorId,
        diagnosis: "",
        symptoms: "",
        examination: "",
        treatment: "",
        notes: "",
    });

    const [prescriptions, setPrescriptions] = useState([
        {
            medicine: "",
            dosage: "",
            frequency: "",
            duration: "",
        },
    ]);

    // Xử lý input form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Xử lý đơn thuốc
    const handlePrescriptionChange = (index, field, value) => {
        const newPrescriptions = [...prescriptions];
        newPrescriptions[index][field] = value;
        setPrescriptions(newPrescriptions);
    };

    const addPrescriptionRow = () => {
        setPrescriptions((prev) => [...prev, { medicine: "", dosage: "", frequency: "", duration: "" }]);
    };

    // Gửi dữ liệu lên backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            prescriptions: prescriptions.filter((p) => p.medicine.trim() !== ""),
        };

        try {
            let headers = { Authorization: "Bearer " + dToken };
            const response = await axios.post(`${backendUrl}/api/medicalRecords`, payload, {
                headers,
            });
            getAllAppointment();
            toast.success("Tạo hồ sơ bệnh án thành công!");
            console.log("Response:", response.data);
            // Có thể reset form hoặc redirect nếu cần
        } catch (error) {
            toast.error("Tạo hồ sơ bệnh án thất bại: " + error.message);
        }
    };

    return (
        userInfomation && (
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center">
                            <Link to="/doctor/home" className="flex items-center text-blue-600 hover:text-blue-800">
                                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                                Quay lại Dashboard
                            </Link>
                        </div>
                        <button onClick={handleSubmit} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            <SaveIcon className="w-5 h-5 mr-2" />
                            Lưu hồ sơ
                        </button>
                    </div>
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">Tạo hồ sơ bệnh án mới</h2>
                        </div>
                        <form className="p-6 space-y-8" onSubmit={handleSubmit}>
                            {/* Patient Information */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin bệnh nhân</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                                        <input type="text" name="patientName" value={userInfomation.patientName} readOnly className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100 cursor-not-allowed" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Mã bệnh nhân</label>
                                        <input type="text" name="patientId" value={userInfomation.userId} readOnly className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100 cursor-not-allowed" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                                        <input type="text" name="dateOfBirth" value={formatDateHeader(userInfomation.dob)} readOnly className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100 cursor-not-allowed" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Giới tính</label>
                                        <input type="text" name="gender" value={userInfomation.gender} readOnly className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100 cursor-not-allowed" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                                        <input type="text" name="phone" value={userInfomation.phone} readOnly className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100 cursor-not-allowed" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input type="text" name="email" value={userInfomation.email} readOnly className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100 cursor-not-allowed" />
                                    </div>
                                </div>
                            </div>

                            {/* Medical Examination */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin khám bệnh</h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Triệu chứng</label>
                                        <textarea name="symptoms" value={formData.symptoms} onChange={handleInputChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Mô tả các triệu chứng của bệnh nhân" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Kết quả khám</label>
                                        <textarea name="examination" value={formData.examination} onChange={handleInputChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Nhập kết quả khám" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Chẩn đoán</label>
                                        <textarea name="diagnosis" value={formData.diagnosis} onChange={handleInputChange} rows={2} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Nhập chẩn đoán" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Phương pháp điều trị</label>
                                        <textarea name="treatment" value={formData.treatment} onChange={handleInputChange} rows={2} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Nhập phương pháp điều trị" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Ghi chú</label>
                                        <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={2} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Ghi chú thêm nếu có" />
                                    </div>
                                </div>
                            </div>
                            {/* Prescriptions */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Đơn thuốc</h3>
                                {prescriptions.map((prescription, index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                        <input type="text" placeholder="Tên thuốc" value={prescription.medicine} onChange={(e) => handlePrescriptionChange(index, "medicine", e.target.value)} className="border border-gray-300 rounded-md p-2" />
                                        <input type="text" placeholder="Liều lượng" value={prescription.dosage} onChange={(e) => handlePrescriptionChange(index, "dosage", e.target.value)} className="border border-gray-300 rounded-md p-2" />
                                        <input type="text" placeholder="Tần suất" value={prescription.frequency} onChange={(e) => handlePrescriptionChange(index, "frequency", e.target.value)} className="border border-gray-300 rounded-md p-2" />
                                        <input type="text" placeholder="Thời gian sử dụng" value={prescription.duration} onChange={(e) => handlePrescriptionChange(index, "duration", e.target.value)} className="border border-gray-300 rounded-md p-2" />
                                    </div>
                                ))}
                                <button type="button" onClick={addPrescriptionRow} className="mt-2 flex items-center text-blue-600 hover:text-blue-800">
                                    <PlusIcon className="w-4 h-4 mr-1" />
                                    Thêm đơn thuốc
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
};

export default CreateMedicalRecord;

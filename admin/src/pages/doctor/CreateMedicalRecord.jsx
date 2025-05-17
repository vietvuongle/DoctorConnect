import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon, SaveIcon, PlusIcon, FileTextIcon, UploadIcon, AlertCircleIcon } from "lucide-react";
import { useEffect } from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";
import axios from "axios";

const CreateMedicalRecord = () => {
    const { userId } = useParams();

    const [userData, setUserData] = useState({});
    const { backendUrl, dToken } = useContext(DoctorContext);

    console.log("userData", userData);

    const [formData, setFormData] = useState({
        patientName: "Nguyễn Văn A",
        patientId: "BN001",
        dateOfBirth: "1990-05-15",
        gender: "Nam",
        address: "Hà Nội",
        phone: "0987654321",
        diagnosis: "",
        symptoms: "",
        examination: "",
        treatment: "",
        prescription: "",
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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handlePrescriptionChange = (index, field, value) => {
        const newPrescriptions = [...prescriptions];
        newPrescriptions[index] = {
            ...newPrescriptions[index],
            [field]: value,
        };
        setPrescriptions(newPrescriptions);
    };
    const addPrescriptionRow = () => {
        setPrescriptions([
            ...prescriptions,
            {
                medicine: "",
                dosage: "",
                frequency: "",
                duration: "",
            },
        ]);
    };

    const getUserByUserId = async (userId) => {
        try {
            let headers = {
                Authorization: "Bearer " + dToken,
            };
            const { data } = await axios.get(backendUrl + `/api/doctor/getUser/${userId}`, {
                headers: headers,
            });
            if (data !== false) {
                setUserData(data.result);
            } else {
                toast.error("Có lỗi xảy ra");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log("Form submitted:", {
            ...formData,
            prescriptions,
        });
    };

    useEffect(() => {
        if (userId) {
            getUserByUserId(userId);
        }
    }, [dToken]);

    return (
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
                                    <input type="text" name="patientName" value={userData.name} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mã bệnh nhân</label>
                                    <input type="text" name="patientId" value={userData._id} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                                    <input type="date" name="dateOfBirth" value={userData?.dob} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Giới tính</label>
                                    <input type="text" name="gender" value={userData?.gender} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                                    <input type="text" name="address" value={userData?.address} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                                    <input type="text" name="phone" value={userData?.phone} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
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
                                    <textarea name="treatment" value={formData.treatment} onChange={handleInputChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Nhập phương pháp điều trị" />
                                </div>
                            </div>
                        </div>
                        {/* Prescription */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Đơn thuốc</h3>
                                <button type="button" onClick={addPrescriptionRow} className="flex items-center text-blue-600 hover:text-blue-800">
                                    <PlusIcon className="w-5 h-5 mr-1" />
                                    Thêm thuốc
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên thuốc</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Liều lượng</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tần suất</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian dùng</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {prescriptions.map((prescription, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4">
                                                    <input type="text" value={prescription.medicine} onChange={(e) => handlePrescriptionChange(index, "medicine", e.target.value)} className="block w-full border-gray-300 rounded-md shadow-sm p-2" placeholder="Tên thuốc" />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input type="text" value={prescription.dosage} onChange={(e) => handlePrescriptionChange(index, "dosage", e.target.value)} className="block w-full border-gray-300 rounded-md shadow-sm p-2" placeholder="Liều lượng" />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input type="text" value={prescription.frequency} onChange={(e) => handlePrescriptionChange(index, "frequency", e.target.value)} className="block w-full border-gray-300 rounded-md shadow-sm p-2" placeholder="Tần suất" />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input type="text" value={prescription.duration} onChange={(e) => handlePrescriptionChange(index, "duration", e.target.value)} className="block w-full border-gray-300 rounded-md shadow-sm p-2" placeholder="Thời gian" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Additional Notes */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Ghi chú bổ sung</h3>
                            <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Nhập các ghi chú bổ sung" />
                        </div>
                        {/* File Attachments */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Tài liệu đính kèm</h3>
                            <div className="flex items-center space-x-6">
                                <div className="flex-1">
                                    <label className="flex justify-center px-6 py-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-500">
                                        <div className="space-y-1 text-center">
                                            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="text-sm text-gray-600">
                                                <span className="text-blue-600 hover:text-blue-500">Tải lên tệp</span> hoặc kéo thả vào đây
                                            </div>
                                            <p className="text-xs text-gray-500">PDF, PNG, JPG tối đa 10MB</p>
                                        </div>
                                        <input type="file" className="hidden" multiple />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default CreateMedicalRecord;

import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, SaveIcon, PlusIcon } from "lucide-react";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";
import axios from "axios";

const CreateMedicalRecord = () => {
    const { appointmentId } = useParams();
    const navigate = useNavigate();
    const { backendUrl, dToken, appointmentData, formatDateHeader, getAllAppointment } = useContext(DoctorContext);

    const doctorId = localStorage.getItem("doctorId");

    const userInfomation = appointmentData.find((app) => app._id === appointmentId);

    const [formData, setFormData] = useState({
        appointmentId: appointmentId,
        patientName: userInfomation?.patientName || "",
        patientId: userInfomation?.userId || "",
        dateOfBirth: userInfomation?.dob || "",
        gender: userInfomation?.gender || "",
        phone: userInfomation?.phone || "",
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

    const [errors, setErrors] = useState({}); // State for validation errors

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        // Validate Symptoms
        if (!formData.symptoms.trim()) {
            newErrors.symptoms = "Triệu chứng là bắt buộc";
        } else if (formData.symptoms.length < 10) {
            newErrors.symptoms = "Triệu chứng phải có ít nhất 10 ký tự";
        } else if (formData.symptoms.length > 1000) {
            newErrors.symptoms = "Triệu chứng không được vượt quá 1000 ký tự";
        }

        // Validate Examination
        if (!formData.examination.trim()) {
            newErrors.examination = "Kết quả khám là bắt buộc";
        } else if (formData.examination.length < 10) {
            newErrors.examination = "Kết quả khám phải có ít nhất 10 ký tự";
        } else if (formData.examination.length > 1000) {
            newErrors.examination = "Kết quả khám không được vượt quá 1000 ký tự";
        }

        // Validate Diagnosis
        if (!formData.diagnosis.trim()) {
            newErrors.diagnosis = "Chẩn đoán là bắt buộc";
        } else if (formData.diagnosis.length < 5) {
            newErrors.diagnosis = "Chẩn đoán phải có ít nhất 5 ký tự";
        } else if (formData.diagnosis.length > 500) {
            newErrors.diagnosis = "Chẩn đoán không được vượt quá 500 ký tự";
        }

        // Validate Treatment
        if (!formData.treatment.trim()) {
            newErrors.treatment = "Phương pháp điều trị là bắt buộc";
        } else if (formData.treatment.length < 5) {
            newErrors.treatment = "Phương pháp điều trị phải có ít nhất 5 ký tự";
        } else if (formData.treatment.length > 1000) {
            newErrors.treatment = "Phương pháp điều trị không được vượt quá 1000 ký tự";
        }

        // Validate Notes (optional)
        if (formData.notes && formData.notes.length > 1000) {
            newErrors.notes = "Ghi chú không được vượt quá 1000 ký tự";
        }

        // Validate Prescriptions
        const validPrescriptions = prescriptions.filter((p) => p.medicine.trim() && p.dosage.trim() && p.frequency.trim() && p.duration.trim());
        if (validPrescriptions.length === 0) {
            newErrors.prescriptions = "Phải có ít nhất một đơn thuốc hợp lệ";
        } else {
            const prescriptionErrors = prescriptions.map((p, index) => {
                const errors = {};
                if (p.medicine && (!p.medicine.trim() || p.medicine.length < 2 || p.medicine.length > 100)) {
                    errors.medicine = "Tên thuốc phải từ 2-100 ký tự";
                }
                if (p.dosage && (!p.dosage.trim() || p.dosage.length < 2 || p.dosage.length > 50)) {
                    errors.dosage = "Liều lượng phải từ 2-50 ký tự";
                }
                if (p.frequency && (!p.frequency.trim() || p.frequency.length < 2 || p.frequency.length > 50)) {
                    errors.frequency = "Tần suất phải từ 2-50 ký tự";
                }
                if (p.duration && (!p.duration.trim() || p.duration.length < 2 || p.duration.length > 50)) {
                    errors.duration = "Thời gian sử dụng phải từ 2-50 ký tự";
                }
                return errors;
            });
            if (prescriptionErrors.some((e) => Object.keys(e).length > 0)) {
                newErrors.prescriptionDetails = prescriptionErrors;
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error for the field being edited
        setErrors((prev) => ({ ...prev, [name]: null }));
    };

    // Handle prescription change
    const handlePrescriptionChange = (index, field, value) => {
        const newPrescriptions = [...prescriptions];
        newPrescriptions[index][field] = value;
        setPrescriptions(newPrescriptions);
        // Clear prescription error for the edited field
        setErrors((prev) => ({
            ...prev,
            prescriptions: null,
            prescriptionDetails: prev.prescriptionDetails ? prev.prescriptionDetails.map((e, i) => (i === index ? { ...e, [field]: null } : e)) : null,
        }));
    };

    const addPrescriptionRow = () => {
        setPrescriptions((prev) => [...prev, { medicine: "", dosage: "", frequency: "", duration: "" }]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Run validation
        if (!validateForm()) {
            return;
        }

        const payload = {
            ...formData,
            prescriptions: prescriptions.filter((p) => p.medicine.trim() && p.dosage.trim() && p.frequency.trim() && p.duration.trim()),
        };

        try {
            const headers = { Authorization: `Bearer ${dToken}` };
            const response = await axios.post(`${backendUrl}/api/medicalRecords`, payload, { headers });
            getAllAppointment();
            toast.success("Tạo hồ sơ bệnh án thành công!");
            setFormData({
                appointmentId: appointmentId,
                patientName: userInfomation?.patientName || "",
                patientId: userInfomation?.userId || "",
                dateOfBirth: userInfomation?.dob || "",
                gender: userInfomation?.gender || "",
                phone: userInfomation?.phone || "",
                doctorId,
                diagnosis: "",
                symptoms: "",
                examination: "",
                treatment: "",
                notes: "",
            });
            setPrescriptions([{ medicine: "", dosage: "", frequency: "", duration: "" }]);
            setErrors({});
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
                                Quay lại
                            </Link>
                        </div>
                        {!userInfomation.completed && (
                            <button onClick={handleSubmit} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                <SaveIcon className="w-5 h-5 mr-2" />
                                Lưu hồ sơ
                            </button>
                        )}
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
                                        <textarea
                                            name="symptoms"
                                            value={formData.symptoms}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className={`mt-1 block w-full border ${errors.symptoms ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`}
                                            placeholder="Mô tả các triệu chứng của bệnh nhân"
                                        />
                                        {errors.symptoms && <p className="text-red-500 text-sm mt-1">{errors.symptoms}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Kết quả khám</label>
                                        <textarea name="examination" value={formData.examination} onChange={handleInputChange} rows={3} className={`mt-1 block w-full border ${errors.examination ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`} placeholder="Nhập kết quả khám" />
                                        {errors.examination && <p className="text-red-500 text-sm mt-1">{errors.examination}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Chẩn đoán</label>
                                        <textarea name="diagnosis" value={formData.diagnosis} onChange={handleInputChange} rows={2} className={`mt-1 block w-full border ${errors.diagnosis ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`} placeholder="Nhập chẩn đoán" />
                                        {errors.diagnosis && <p className="text-red-500 text-sm mt-1">{errors.diagnosis}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Phương pháp điều trị</label>
                                        <textarea name="treatment" value={formData.treatment} onChange={handleInputChange} rows={2} className={`mt-1 block w-full border ${errors.treatment ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`} placeholder="Nhập phương pháp điều trị" />
                                        {errors.treatment && <p className="text-red-500 text-sm mt-1">{errors.treatment}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Ghi chú</label>
                                        <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={2} className={`mt-1 block w-full border ${errors.notes ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`} placeholder="Ghi chú thêm nếu có" />
                                        {errors.notes && <p className="text-red-500 text-sm mt-1">{errors.notes}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Prescriptions */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Đơn thuốc</h3>
                                {errors.prescriptions && <p className="text-red-500 text-sm mb-2">{errors.prescriptions}</p>}
                                {prescriptions.map((prescription, index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Tên thuốc"
                                                value={prescription.medicine}
                                                onChange={(e) => handlePrescriptionChange(index, "medicine", e.target.value)}
                                                className={`border ${errors.prescriptionDetails?.[index]?.medicine ? "border-red-500" : "border-gray-300"} rounded-md p-2 w-full`}
                                            />
                                            {errors.prescriptionDetails?.[index]?.medicine && <p className="text-red-500 text-sm mt-1">{errors.prescriptionDetails[index].medicine}</p>}
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Liều lượng"
                                                value={prescription.dosage}
                                                onChange={(e) => handlePrescriptionChange(index, "dosage", e.target.value)}
                                                className={`border ${errors.prescriptionDetails?.[index]?.dosage ? "border-red-500" : "border-gray-300"} rounded-md p-2 w-full`}
                                            />
                                            {errors.prescriptionDetails?.[index]?.dosage && <p className="text-red-500 text-sm mt-1">{errors.prescriptionDetails[index].dosage}</p>}
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Tần suất"
                                                value={prescription.frequency}
                                                onChange={(e) => handlePrescriptionChange(index, "frequency", e.target.value)}
                                                className={`border ${errors.prescriptionDetails?.[index]?.frequency ? "border-red-500" : "border-gray-300"} rounded-md p-2 w-full`}
                                            />
                                            {errors.prescriptionDetails?.[index]?.frequency && <p className="text-red-500 text-sm mt-1">{errors.prescriptionDetails[index].frequency}</p>}
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Thời gian sử dụng"
                                                value={prescription.duration}
                                                onChange={(e) => handlePrescriptionChange(index, "duration", e.target.value)}
                                                className={`border ${errors.prescriptionDetails?.[index]?.duration ? "border-red-500" : "border-gray-300"} rounded-md p-2 w-full`}
                                            />
                                            {errors.prescriptionDetails?.[index]?.duration && <p className="text-red-500 text-sm mt-1">{errors.prescriptionDetails[index].duration}</p>}
                                        </div>
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

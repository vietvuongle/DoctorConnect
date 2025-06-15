import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import { ArrowLeftIcon, EditIcon, SaveIcon, LockIcon } from "lucide-react";
import { assets } from "../../assets/assets";
import axios from "axios";
import TiptapEditor from "../../components/TiptapEditor";

const ClinicDetail = () => {
    const { clinicId } = useParams();
    const navigate = useNavigate();
    const { backendUrl, aToken, clinicData, getAllClinic } = useContext(AdminContext);

    // Find the clinic from clinicData
    const clinic = clinicData.find((clinic) => clinic.id === clinicId);

    // State for edit mode
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(clinic?.name || "");
    const [email, setEmail] = useState(clinic?.email || "");
    const [address, setAddress] = useState(clinic?.address || "");
    const [description, setDescription] = useState(clinic?.description || "");
    const [docImg, setDocImg] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Validate form inputs
    const validateForm = () => {
        const errors = {};
        if (!name.trim()) errors.name = "Tên phòng khám là bắt buộc";

        if (!address.trim()) errors.address = "Địa chỉ là bắt buộc";
        return errors;
    };

    // Handle update clinic
    const handleUpdateClinic = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            toast.error("Vui lòng kiểm tra các trường thông tin");
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            if (docImg) formData.append("image", docImg);
            formData.append("id", clinicId);
            formData.append("name", name);
            formData.append("address", address);
            formData.append("description", description);

            const { data } = await axios.post(`${backendUrl}/api/admin/update-clinic`, formData, {
                headers: {
                    Authorization: `Bearer ${aToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (data !== false) {
                getAllClinic();
                toast.success("Cập nhật phòng khám thành công");
                setIsEditing(false);
                setFormErrors({});
                setDocImg(null);
                // Note: clinicData should be updated in AdminContext
            } else {
                toast.error("Cập nhật phòng khám thất bại");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Đã xảy ra lỗi khi cập nhật phòng khám");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle lock clinic
    const handleLockClinic = async () => {
        if (!clinic) return;

        setIsLoading(true);
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/lock-clinic/${id}`, {}, { headers: { Authorization: `Bearer ${aToken}` } });
            if (data.success) {
                toast.success("Khóa phòng khám thành công");
            } else {
                toast.error("Khóa phòng khám thất bại");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Đã xảy ra lỗi khi khóa phòng khám");
        } finally {
            setIsLoading(false);
        }
    };

    if (!clinic) {
        return (
            <div className="container mx-auto p-6 max-w-7xl">
                <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow-md">Không tìm thấy thông tin phòng khám</div>
                <button onClick={() => navigate("/admin/clinics")} className="mt-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Quay lại danh sách
                </button>
            </div>
        );
    }

    return (
        clinicData && (
            <div className="container mx-auto mt-5 max-w-7xl">
                <div className="bg-white shadow-xl rounded-lg p-8 transition-all duration-300 hover:shadow-2xl">
                    {isEditing ? (
                        <form onSubmit={handleUpdateClinic} className="space-y-6">
                            <div className="flex items-center gap-6 mb-6">
                                <label htmlFor="doc-img" className="cursor-pointer relative group">
                                    <img className="w-28 h-28 rounded-full object-cover bg-gray-100 border-2 border-gray-200 group-hover:border-blue-500 transition-colors" src={docImg ? URL.createObjectURL(docImg) : clinic.image || assets.upload_area} alt="Clinic" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white text-sm">Thay ảnh</span>
                                    </div>
                                </label>
                                <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" accept="image/*" hidden aria-describedby="doc-img-error" />
                                <p className="text-gray-600 text-sm">Tải lên ảnh phòng khám</p>
                                {formErrors.docImg && (
                                    <p id="doc-img-error" className="text-red-600 text-sm">
                                        {formErrors.docImg}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Tên phòng khám</label>
                                        <input
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                            type="text"
                                            placeholder="Tên phòng khám"
                                            required
                                            aria-invalid={formErrors.name ? "true" : "false"}
                                            aria-describedby="name-error"
                                        />
                                        {formErrors.name && (
                                            <p id="name-error" className="text-red-600 text-sm mt-1">
                                                {formErrors.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                                        <input
                                            onChange={(e) => setAddress(e.target.value)}
                                            value={address}
                                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                            type="text"
                                            placeholder="Địa chỉ"
                                            required
                                            aria-invalid={formErrors.address ? "true" : "false"}
                                            aria-describedby="address-error"
                                        />
                                        {formErrors.address && (
                                            <p id="address-error" className="text-red-600 text-sm mt-1">
                                                {formErrors.address}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Giới thiệu</label>
                                <div className="mt-2 overflow-y-auto border border-gray-300 rounded-md shadow-sm">
                                    <TiptapEditor value={description} onChange={setDescription} />
                                </div>
                            </div>

                            <div className="flex gap-4 justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormErrors({});
                                        setName(clinic.name);
                                        setEmail(clinic.email);
                                        setAddress(clinic.address);
                                        setDescription(clinic.description);
                                        setDocImg(null);
                                    }}
                                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                                >
                                    Hủy
                                </button>
                                <button type="submit" disabled={isLoading} className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
                                    <SaveIcon className="h-5 w-5 mr-2" />
                                    {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <div className="flex items-center gap-6 mb-8">
                                <img src={clinic?.image ? clinic.image : assets.upload_area} alt={clinic.name} className="w-28 h-28 rounded-full object-cover bg-blue-100 border-2 border-gray-200" />
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-900">{clinic.name}</h2>
                                    <p className="mt-2">
                                        <span className="font-medium text-gray-900 mr-7">Địa chỉ:</span> {clinic.address}
                                    </p>
                                    <p className="mt-2">
                                        <span className="font-medium text-gray-900">Trạng thái:</span>{" "}
                                        {clinic.status === "APPROVED" ? <span className="px-3 py-1 ml-2 text-xs font-semibold rounded-full bg-green-100 text-green-800">Hoạt động</span> : <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Đã khóa</span>}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1  gap-8">
                                <div>
                                    <h3 className="text-3xl font-medium text-gray-700 mb-4">Giới thiệu</h3>
                                    <div className="font-calibri overflow-y-auto p-4 bg-gray-50 rounded-md border border-gray-200 shadow-sm tiptap-content" dangerouslySetInnerHTML={{ __html: clinic.description }} />
                                </div>
                            </div>

                            <div className="mt-8 flex gap-4 justify-between">
                                <div className="mt-1">
                                    <button type="button" onClick={() => navigate("/admin/clinic")} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium">
                                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                                        Quay lại
                                    </button>
                                </div>
                                <div className="flex gap-4 ">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-6 h-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={clinic.status === "LOCKED" || isLoading}
                                    >
                                        <SaveIcon className="h-5 w-5 mr-2" />
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        onClick={handleLockClinic}
                                        className="px-6 h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={clinic.status === "LOCKED" || isLoading}
                                    >
                                        <LockIcon className="h-5 w-5 mr-2" />
                                        {clinic.status === "LOCKED" ? "Đã khóa" : "Khóa phòng khám"}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <style>
                    {`
          .font-calibri {
            font-family: 'Calibri', 'Arial', sans-serif;
          }
          .tiptap-content {
            font-family: 'Calibri', 'Arial', sans-serif !important;
            font-size: 11pt;
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

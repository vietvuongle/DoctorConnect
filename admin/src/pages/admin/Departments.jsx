import React, { useContext, useState } from "react";
import { Plus as PlusIcon, Pencil as PencilIcon, Trash2 as TrashIcon, X as CloseIcon, Save as SaveIcon } from "lucide-react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import TiptapEditor from "../../components/TiptapEditor";
import { useNavigate } from "react-router-dom";

export function Departments() {
    const { backendUrl, aToken, departmentData, getDepartment } = useContext(AdminContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [about, setAbout] = useState("");
    const [iconImage, setIconImage] = useState(false);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [errors, setErrors] = useState({}); // State for validation errors

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        // Validate Name
        if (!name.trim()) {
            newErrors.name = "Tên khoa là bắt buộc";
        } else if (name.length < 2) {
            newErrors.name = "Tên khoa phải có ít nhất 2 ký tự";
        } else if (name.length > 100) {
            newErrors.name = "Tên khoa không được vượt quá 100 ký tự";
        }

        // Validate Description
        if (!description.trim()) {
            newErrors.description = "Tiêu đề là bắt buộc";
        } else if (description.length < 10) {
            newErrors.description = "Tiêu đề phải có ít nhất 10 ký tự";
        } else if (description.length > 500) {
            newErrors.description = "Tiêu đề không được vượt quá 500 ký tự";
        }

        // Validate About (assuming TiptapEditor returns plain text or HTML string)
        const aboutText = about.replace(/<[^>]+>/g, "").trim(); // Strip HTML tags for length check
        if (!aboutText) {
            newErrors.about = "Mô tả là bắt buộc";
        } else if (aboutText.length < 20) {
            newErrors.about = "Mô tả phải có ít nhất 20 ký tự";
        } else if (aboutText.length > 2000) {
            newErrors.about = "Mô tả không được vượt quá 2000 ký tự";
        }

        // Validate Icon Image
        if (!iconImage) {
            newErrors.iconImage = "Vui lòng chọn ảnh";
        } else {
            const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];
            if (!validImageTypes.includes(iconImage.type)) {
                newErrors.iconImage = "Ảnh phải có định dạng JPG hoặc PNG";
            } else if (iconImage.size > 5 * 1024 * 1024) {
                newErrors.iconImage = "Ảnh không được lớn hơn 5MB";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleStartEdit = (department) => {
        navigate(`/admin/departments/edit/${department.id}`, { state: { department } });
    };

    const handleStartDelete = async (departmentId) => {
        try {
            const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa khoa này?");
            if (confirmDelete) {
                const { data } = await axios.delete(`${backendUrl}/api/admin/delete-department/${departmentId}`, {
                    headers: {
                        Authorization: `Bearer ${aToken}`,
                    },
                });

                if (data !== false) {
                    toast.success("Xóa khoa thành công");
                    getDepartment();
                } else {
                    toast.error("Xóa khoa thất bại");
                }
            }
        } catch (err) {
            console.error(err);
            toast.error("Có lỗi xảy ra khi xóa khoa");
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // Run validation
        if (!validateForm()) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append("iconImage", iconImage);
            formData.append("description", description);
            formData.append("name", name);
            formData.append("about", about);

            const { data } = await axios.post(`${backendUrl}/api/admin/add-department`, formData, {
                headers: { Authorization: `Bearer ${aToken}` },
            });

            if (data !== false) {
                toast.success("Thêm khoa thành công");
                setIconImage(false);
                setName("");
                setDescription("");
                setAbout("");
                setIsAddingNew(false);
                setErrors({});
                getDepartment();
            } else {
                toast.error("Thêm khoa thất bại");
            }
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra khi thêm khoa");
        }
    };

    return (
        <div className="py-5 bg-gray-50 w-full px-4">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Quản lý khoa</h1>
                        <button onClick={() => setIsAddingNew(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center" disabled={isAddingNew}>
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Thêm khoa mới
                        </button>
                    </div>

                    {/* Add Form */}
                    {isAddingNew && (
                        <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-medium text-gray-800">Thêm khoa mới</h2>
                                <button
                                    onClick={() => {
                                        setIsAddingNew(false);
                                        setIconImage(false);
                                        setName("");
                                        setDescription("");
                                        setAbout("");
                                        setErrors({});
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <CloseIcon className="h-5 w-5" />
                                </button>
                            </div>
                            <form onSubmit={onSubmitHandler} className="grid grid-cols-1 gap-4">
                                <div className="col-span-1">
                                    <div className="flex items-center gap-4 mb-4 text-gray-500">
                                        <label htmlFor="doc-img" className="cursor-pointer">
                                            <img className="w-16 h-16 bg-gray-100 rounded-full object-cover" src={iconImage ? URL.createObjectURL(iconImage) : assets.upload_area} alt="Upload Icon" />
                                        </label>
                                        <input onChange={(e) => setIconImage(e.target.files[0])} type="file" id="doc-img" hidden accept="image/jpeg,image/jpg,image/png" />
                                        <p className="text-sm leading-tight">
                                            Upload
                                            <br />
                                            Icon
                                        </p>
                                    </div>
                                    {errors.iconImage && <p className="text-red-500 text-sm mt-1">{errors.iconImage}</p>}
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên khoa</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={`w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`} placeholder="Nhập tên khoa" />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                                    <input
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className={`w-full px-3 py-2 border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Nhập mô tả về khoa"
                                    />
                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                </div>

                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                                    <TiptapEditor value={about} onChange={setAbout} />
                                    {errors.about && <p className="text-red-500 text-sm mt-1">{errors.about}</p>}
                                </div>

                                <div className="col-span-full flex justify-end">
                                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
                                        <SaveIcon className="h-5 w-5 mr-2" />
                                        Lưu
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên khoa</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Mô tả</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {departmentData.map((department) => (
                                    <tr key={department.id}>
                                        <td className="px-4 py-4">
                                            <img className="w-16 h-16 rounded-full object-cover" src={department.iconImage} alt="" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm font-medium text-gray-900">{department.name}</div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm text-gray-500 w-full sm:w-auto break-words">{department.description}</div>
                                        </td>
                                        <td className="px-4 py-4 text-right whitespace-nowrap">
                                            <div className="flex justify-end space-x-3">
                                                <button onClick={() => handleStartEdit(department)} className="text-blue-600 hover:text-blue-900">
                                                    <PencilIcon className="h-5 w-5" />
                                                </button>
                                                <button onClick={() => handleStartDelete(department.id)} className="text-red-600 hover:text-red-900">
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

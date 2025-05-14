import React, { use, useContext, useState } from "react";
import { Plus as PlusIcon, Pencil as PencilIcon, Trash2 as TrashIcon, X as CloseIcon, Save as SaveIcon } from "lucide-react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";

export function Departments() {
    const { backendUrl, aToken, departmentData, getDepartment } = useContext(AdminContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [iconImage, setIconImage] = useState(false);

    const [isAddingNew, setIsAddingNew] = useState(false);

    const [editingDepartment, setEditingIdDepartment] = useState(null);
    const [editForm, setEditForm] = useState({ name: "", description: "", iconImage: null });

    const handleStartEdit = (department) => {
        setEditingIdDepartment(department.id);
        setEditForm({
            name: department.name,
            description: department.description,
            iconImage: null, // không có ảnh mới, mặc định null
        });
    };

    const handleStartDelete = async (departmentId) => {
        try {
            const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa khoa này?");
            if (confirmDelete) {
                const { data } = await axios.delete(backendUrl + `/api/admin/delete-department/${departmentId}`, {
                    Authorization: "Bearer " + aToken,
                });

                if (data !== false) {
                    toast.success("Xóa khoa thành công");
                    getDepartment(); // Tải lại danh sách khoa
                } else {
                    toast.error("Xóa khoa thất bại");
                }
            }
        } catch (err) {
            console.error(err);
            toast.error("Có lỗi xảy ra khi xóa khoa");
        }
    };

    const handleImageChange = (e) => {
        setEditForm((prev) => ({ ...prev, iconImage: e.target.files[0] }));
    };

    const handleUpdate = async (department) => {
        try {
            const formData = new FormData();
            formData.append("id", department.id); // gửi id để backend biết record nào cần update
            formData.append("name", editForm.name);
            formData.append("description", editForm.description);
            if (editForm.iconImage) {
                formData.append("iconImage", editForm.iconImage);
            }

            const { data } = await axios.post(backendUrl + "/api/admin/update-department", formData, {
                headers: {
                    Authorization: `Bearer ${aToken}`,
                },
            });

            if (data !== null) {
                toast.success("Cập nhật khoa thành công");

                // gọi lại API để load lại danh sách khoa
                getDepartment();
                setEditingIdDepartment(null);
            } else {
                toast.error("Có lỗi đã xảy ra");
            }
        } catch (err) {
            console.error(err);
            toast.error("Có lỗi xảy ra");
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (!iconImage) {
                toast.error("Vui lòng chọn ảnh");
            }
            const formData = new FormData();
            formData.append("iconImage", iconImage);
            formData.append("description", description);
            formData.append("name", name);

            const { data } = await axios.post(backendUrl + "/api/admin/add-department", formData, { headers: { aToken } });

            if (data !== false) {
                toast.success("Thêm khoa thành công");
                setIconImage(false);
                setName("");
                setDescription("");
                getDepartment();
            } else {
                toast.error("Thêm khoa thất bại");
            }
        } catch (error) {}
    };

    return (
        <div className="py-8 bg-gray-50 w-full px-4">
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
                                        setFormError("");
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
                                        <input onChange={(e) => setIconImage(e.target.files[0])} type="file" id="doc-img" hidden />
                                        <p className="text-sm leading-tight">
                                            Upload
                                            <br />
                                            Icon
                                        </p>
                                    </div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên khoa</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập tên khoa" />
                                </div>

                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập mô tả về khoa" />
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
                                            {editingDepartment === department.id ? (
                                                <label className="cursor-pointer">
                                                    <img className="w-16 h-16 rounded-full object-cover" src={editForm.iconImage ? URL.createObjectURL(editForm.iconImage) : department.iconImage} alt="" />
                                                    <input type="file" onChange={handleImageChange} className="hidden" />
                                                </label>
                                            ) : (
                                                <img className="w-16 h-16 rounded-full object-cover" src={department.iconImage} alt="" />
                                            )}
                                        </td>
                                        <td className="px-4 py-4">
                                            {editingDepartment === department.id ? (
                                                <input type="text" value={editForm.name} onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))} className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                            ) : (
                                                <div className="text-sm font-medium text-gray-900">{department.name}</div>
                                            )}
                                        </td>
                                        <td className="px-4 py-4">
                                            {editingDepartment === department.id ? (
                                                <input type="text" value={editForm.description} onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))} className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                            ) : (
                                                <div className="text-sm text-gray-500 w-full sm:w-auto break-words">{department.description}</div>
                                            )}
                                        </td>
                                        <td className="px-4 py-4 text-right whitespace-nowrap">
                                            {editingDepartment === department.id ? (
                                                <div className="flex justify-end space-x-2">
                                                    <button onClick={() => handleUpdate(department)} className="text-green-600 hover:text-green-900">
                                                        <SaveIcon className="h-5 w-5" />
                                                    </button>
                                                    <button onClick={() => setEditingIdDepartment(null)} className="text-gray-600 hover:text-gray-900">
                                                        <CloseIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex justify-end space-x-3">
                                                    <button onClick={() => handleStartEdit(department)} className="text-blue-600 hover:text-blue-900">
                                                        <PencilIcon className="h-5 w-5" />
                                                    </button>
                                                    <button onClick={() => handleStartDelete(department.id)} className="text-red-600 hover:text-red-900">
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            )}
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

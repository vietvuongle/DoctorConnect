import React, { use, useContext, useState } from "react";
import { Plus as PlusIcon, Pencil as PencilIcon, Trash2 as TrashIcon, X as CloseIcon, Save as SaveIcon } from "lucide-react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";

export function Departments() {
    const [departments, setDepartments] = useState([
        {
            id: 1,
            name: "Tim mạch",
            description: "Chuyên khoa về bệnh lý tim mạch và tuần hoàn",
            icon: "heart",
            active: true,
        },
        {
            id: 2,
            name: "Nhi khoa",
            description: "Chăm sóc sức khỏe trẻ em từ sơ sinh đến 15 tuổi",
            icon: "baby",
            active: true,
        },
        {
            id: 3,
            name: "Thần kinh",
            description: "Điều trị các bệnh lý về hệ thần kinh",
            icon: "brain",
            active: true,
        },
    ]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [iconImage, setIconImage] = useState(false);
    const { backendUrl, aToken } = useContext(AdminContext);

    const [isAddingNew, setIsAddingNew] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formError, setFormError] = useState("");
    const [newDepartment, setNewDepartment] = useState({
        name: "",
        description: "",
        icon: "",
        active: true,
    });

    const handleAddNew = () => {
        if (!newDepartment.name || !newDepartment.description) {
            setFormError("Vui lòng điền đầy đủ thông tin");
            return;
        }
        setDepartments((prev) => [
            ...prev,
            {
                ...newDepartment,
                id: Math.max(...prev.map((d) => d.id), 0) + 1,
            },
        ]);
        setIsAddingNew(false);
        setNewDepartment({
            name: "",
            description: "",
            icon: "",
            active: true,
        });
        setFormError("");
    };

    const handleEdit = (dept) => {
        const updatedDepartments = departments.map((d) => (d.id === dept.id ? { ...dept } : d));
        setDepartments(updatedDepartments);
        setEditingId(null);
    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa khoa này?")) {
            setDepartments((prev) => prev.filter((dept) => dept.id !== id));
        }
    };

    const handleToggleStatus = (id) => {
        setDepartments((prev) => prev.map((dept) => (dept.id === id ? { ...dept, active: !dept.active } : dept)));
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
            } else {
                toast.error("Thêm khoa thất bại");
            }
        } catch (error) {}
    };

    return (
        <div className="py-8 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Quản lý khoa</h1>
                        </div>
                        <button onClick={() => setIsAddingNew(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center" disabled={isAddingNew}>
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Thêm khoa mới
                        </button>
                    </div>

                    {/* Add Form */}
                    {isAddingNew && (
                        <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">Thêm khoa mới</h2>
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
                                <div>
                                    <div className="flex items-center gap-4 mb-8 text-gray-500">
                                        <label htmlFor="doc-img">
                                            <img className="w-16 bg-gray-100  rounded-full cursor-pointer" src={iconImage ? URL.createObjectURL(iconImage) : assets.upload_area} alt="" />
                                        </label>
                                        <input onChange={(e) => setIconImage(e.target.files[0])} type="file" id="doc-img" hidden />
                                        <p>
                                            Upload <br /> Icon{" "}
                                        </p>
                                    </div>

                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên khoa</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập tên khoa" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập mô tả về khoa" />
                                </div>

                                <div className="flex justify-end">
                                    <button type="submit" onClick={handleAddNew} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên khoa</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {departments.map((department) => (
                                    <tr key={department.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editingId === department.id ? (
                                                <input
                                                    type="text"
                                                    value={department.name}
                                                    onChange={(e) => {
                                                        const updated = departments.map((d) =>
                                                            d.id === department.id
                                                                ? {
                                                                      ...d,
                                                                      name: e.target.value,
                                                                  }
                                                                : d
                                                        );
                                                        setDepartments(updated);
                                                    }}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            ) : (
                                                <div className="text-sm font-medium text-gray-900">{department.name}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {editingId === department.id ? (
                                                <input
                                                    type="text"
                                                    value={department.description}
                                                    onChange={(e) => {
                                                        const updated = departments.map((d) =>
                                                            d.id === department.id
                                                                ? {
                                                                      ...d,
                                                                      description: e.target.value,
                                                                  }
                                                                : d
                                                        );
                                                        setDepartments(updated);
                                                    }}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            ) : (
                                                <div className="text-sm text-gray-500">{department.description}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button onClick={() => handleToggleStatus(department.id)} className={`px-3 py-1 rounded-full text-xs font-medium ${department.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                                {department.active ? "Đang hoạt động" : "Ngừng hoạt động"}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {editingId === department.id ? (
                                                <div className="flex justify-end space-x-2">
                                                    <button onClick={() => handleEdit(department)} className="text-green-600 hover:text-green-900">
                                                        <SaveIcon className="h-5 w-5" />
                                                    </button>
                                                    <button onClick={() => setEditingId(null)} className="text-gray-600 hover:text-gray-900">
                                                        <CloseIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex justify-end space-x-2">
                                                    <button onClick={() => setEditingId(department.id)} className="text-blue-600 hover:text-blue-900">
                                                        <PencilIcon className="h-5 w-5" />
                                                    </button>
                                                    <button onClick={() => handleDelete(department.id)} className="text-red-600 hover:text-red-900">
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

import React, { useContext, useState } from "react";
import { Save as SaveIcon, X as CloseIcon } from "lucide-react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import TiptapEditor from "../../components/TiptapEditor";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const EditDepartment = () => {
    const { backendUrl, aToken, getDepartment } = useContext(AdminContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const { state } = useLocation();
    const department = state?.department;

    const [formData, setFormData] = useState({
        name: department?.name || "",
        description: department?.description || "",
        about: department?.about || "",
        iconImage: null,
    });

    const handleImageChange = (e) => {
        setFormData((prev) => ({ ...prev, iconImage: e.target.files[0] }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("id", id);
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("about", formData.about);
            if (formData.iconImage) {
                data.append("iconImage", formData.iconImage);
            }

            const response = await axios.post(`${backendUrl}/api/admin/update-department`, data, {
                headers: {
                    Authorization: `Bearer ${aToken}`,
                },
            });

            if (response.data !== null) {
                toast.success("Cập nhật khoa thành công");
                getDepartment();
                navigate("/admin/department");
            } else {
                toast.error("Có lỗi đã xảy ra");
            }
        } catch (err) {
            console.error(err);
            toast.error("Có lỗi xảy ra khi cập nhật khoa");
        }
    };

    return (
        <div className="py-5 bg-gray-50 w-full px-4">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">Sửa khoa</h1>
                        <button onClick={() => navigate("/departments")} className="text-gray-500 hover:text-gray-700">
                            <CloseIcon className="h-5 w-5" />
                        </button>
                    </div>
                    <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-4">
                        <div className="col-span-1">
                            <div className="flex items-center gap-4 mb-4 text-gray-500">
                                <label htmlFor="edit-img" className="cursor-pointer">
                                    <img className="w-16 h-16 bg-gray-100 rounded-full object-cover" src={formData.iconImage ? URL.createObjectURL(formData.iconImage) : department?.iconImage || assets.upload_area} alt="Upload Icon" />
                                </label>
                                <input onChange={handleImageChange} type="file" id="edit-img" hidden />
                                <p className="text-sm leading-tight">
                                    Upload
                                    <br />
                                    Icon
                                </p>
                            </div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tên khoa</label>
                            <input type="text" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nhập tên khoa" />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                            <input
                                type="text"
                                value={formData.description}
                                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập mô tả về khoa"
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                            <TiptapEditor value={formData.about} onChange={(value) => setFormData((prev) => ({ ...prev, about: value }))} />
                        </div>

                        <div className="col-span-full flex justify-between mx-1">
                            <button onClick={() => navigate("/admin/department")} type="button" className="bg-slate-300 text-black px-4 py-2 rounded-md hover:opacity-80 transition-colors flex items-center">
                                Quay lại
                            </button>
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
                                <SaveIcon className="h-5 w-5 mr-2" />
                                Lưu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditDepartment;

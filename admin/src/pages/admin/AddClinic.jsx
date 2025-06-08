import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TiptapEditor from "../../components/TiptapEditor";

const AddClinic = () => {
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [docImg, setDocImg] = useState(null);
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");

    const { backendUrl, aToken, clinicData } = useContext(AdminContext);

    const validateForm = () => {
        const errors = {};
        if (!name.trim()) errors.name = "Tên phòng khám là bắt buộc";
        if (!email.trim()) errors.email = "Email là bắt buộc";
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email không hợp lệ";
        if (!password.trim()) errors.password = "Mật khẩu là bắt buộc";
        else if (password.length < 6) errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        if (!address.trim()) errors.address = "Địa chỉ là bắt buộc";
        if (!docImg) errors.docImg = "Vui lòng chọn ảnh";
        return errors;
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            toast.error("Vui lòng kiểm tra các trường thông tin");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("image", docImg);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("address", address);
            formData.append("description", description);

            const { data } = await axios.post(`${backendUrl}/api/admin/add-clinic`, formData, {
                headers: {
                    Authorization: `Bearer ${aToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (data.success) {
                toast.success("Thêm phòng khám thành công");
                setDocImg(null);
                setName("");
                setEmail("");
                setPassword("");
                setAddress("");
                setDescription("");
                setCurrentPage(1);
                setFormErrors({});
                setIsAddingNew(false);
            } else {
                toast.error("Thêm phòng khám thất bại!");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Đã xảy ra lỗi khi thêm phòng khám!");
        }
    };

    const filteredClinics = clinicData.filter((clinic) => clinic.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const indexOfLastClinic = currentPage * itemsPerPage;
    const indexOfFirstClinic = indexOfLastClinic - itemsPerPage;
    const currentClinics = filteredClinics.slice(indexOfFirstClinic, indexOfLastClinic);
    const totalPages = Math.ceil(filteredClinics.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="container mx-auto p-6">
            <form onSubmit={onSubmitHandler} className="space-y-6">
                <div className="flex flex-col border rounded-lg md:flex-row px-4 py-4 justify-between bg-white items-start md:items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý phòng khám</h1>
                    <button type="button" onClick={() => setIsAddingNew(!isAddingNew)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
                        <PlusIcon className="h-5 w-5 mr-2" />
                        {isAddingNew ? "Hủy thêm" : "Thêm phòng khám"}
                    </button>
                </div>

                {isAddingNew && (
                    <div className="bg-white p-8 rounded-lg shadow-md max-w-5xl mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <label htmlFor="doc-img" className="cursor-pointer">
                                <img className="w-16 h-16 rounded-full object-cover bg-gray-100" src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="Clinic" />
                            </label>
                            <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" accept="image/*" hidden aria-describedby="doc-img-error" />
                            <p className="text-gray-600">Tải lên ảnh phòng khám</p>
                            {formErrors.docImg && (
                                <p id="doc-img-error" className="text-red-600 text-sm">
                                    {formErrors.docImg}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700">Tên phòng khám</label>
                                    <input
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="text"
                                        placeholder="Tên phòng khám"
                                        aria-invalid={formErrors.name ? "true" : "false"}
                                        aria-describedby="name-error"
                                    />
                                    {formErrors.name && (
                                        <p id="name-error" className="text-red-600 text-sm">
                                            {formErrors.name}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700">Email</label>
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="email"
                                        placeholder="Email"
                                        aria-invalid={formErrors.email ? "true" : "false"}
                                        aria-describedby="email-error"
                                    />
                                    {formErrors.email && (
                                        <p id="email-error" className="text-red-600 text-sm">
                                            {formErrors.email}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700">Địa chỉ</label>
                                    <input
                                        onChange={(e) => setAddress(e.target.value)}
                                        value={address}
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="text"
                                        placeholder="Địa chỉ"
                                        aria-invalid={formErrors.address ? "true" : "false"}
                                        aria-describedby="address-error"
                                    />
                                    {formErrors.address && (
                                        <p id="address-error" className="text-red-600 text-sm">
                                            {formErrors.address}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700">Mật khẩu</label>
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="password"
                                        placeholder="Mật khẩu"
                                        aria-invalid={formErrors.password ? "true" : "false"}
                                        aria-describedby="password-error"
                                    />
                                    {formErrors.password && (
                                        <p id="password-error" className="text-red-600 text-sm">
                                            {formErrors.password}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-gray-700">Giới thiệu</label>
                            <TiptapEditor value={description} onChange={setDescription} />
                        </div>

                        <div className="flex justify-end">
                            <button type="submit" className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                                Thêm phòng khám
                            </button>
                        </div>
                    </div>
                )}
            </form>

            <div className="bg-white shadow rounded-lg mt-6">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">Danh sách phòng khám</h3>
                        <input type="text" placeholder="Tìm kiếm phòng khám..." className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên phòng khám</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Địa chỉ</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentClinics.map((clinic) => (
                                <tr key={clinic.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img src={clinic?.image ? clinic.image : assets.upload_area} alt={clinic.name} className="h-10 w-10 rounded-full object-cover bg-blue-100" />
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{clinic.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{clinic.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{clinic.address}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{clinic.status === "APPROVED" && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Hoạt động</span>}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => navigate(`/admin/clinic/${clinic.id}`)} className="text-blue-600 hover:text-blue-900 mr-3">
                                            Xem
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">Khóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-700">
                            Hiển thị <span className="font-medium">{indexOfFirstClinic + 1}</span> đến <span className="font-medium">{Math.min(indexOfLastClinic, filteredClinics.length)}</span> của <span className="font-medium">{filteredClinics.length}</span> phòng khám
                        </p>
                        <div className="flex items-center gap-2">
                            <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Trước
                            </button>
                            <span className="text-sm text-gray-700">
                                Trang {currentPage} / {totalPages}
                            </span>
                            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Sau
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddClinic;

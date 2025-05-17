import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon, SaveIcon, UserIcon, MailIcon, CircleDollarSign, PhoneIcon, MapPinIcon, BookOpenIcon, StethoscopeIcon, GraduationCapIcon, BriefcaseIcon, FileTextIcon } from "lucide-react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
const DoctorDetail = () => {
    const { doctorId } = useParams();

    const { aToken, backendUrl, doctorData, getDoctorData } = useContext(AdminContext);

    const [isEditing, setIsEditing] = useState(false);
    const [docInfo, setDocInfo] = useState(null);

    const fetchDocInfo = async () => {
        const docInfo = doctorData.find((doc) => doc.id === doctorId);
        setDocInfo(docInfo);
    };

    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        experience: "",
        fees: "",
        description: "",
        about: "",
        speciality: "",
        degree: "",
        address: "",
        phone: "",
        sex: "",
        school: "",
        image: null,
    });

    const handleStartEdit = () => {
        setEditForm({
            name: docInfo.name,
            image: docInfo.image,
            email: docInfo.email,
            experience: docInfo.experience,
            fees: docInfo.fees,
            speciality: docInfo.speciality,
            about: docInfo.about,
            degree: docInfo.degree,
            sex: docInfo.sex,
            phone: docInfo.phone,
            address: docInfo.address,
            school: docInfo.school,
        });
    };

    const updateDoctor = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("id", doctorId);
            formData.append("name", editForm.name);
            formData.append("email", editForm.email);
            formData.append("experience", editForm.experience);
            formData.append("fees", editForm.fees);
            formData.append("about", editForm.about);
            formData.append("speciality", editForm.speciality);
            formData.append("degree", editForm.degree);
            formData.append("address", editForm.address);
            formData.append("phone", editForm.phone);
            formData.append("sex", editForm.sex);
            formData.append("school", editForm.school);
            if (editForm.image instanceof File) {
                formData.append("image", editForm.image);
            }

            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const { data } = await axios.post(backendUrl + "/api/admin/update-doctor", formData, {
                headers: {
                    Authorization: `Bearer ${aToken}`,
                },
            });

            console.log("data", data);

            if (data !== null) {
                toast.success("Cập nhật bác sĩ thành công");
                getDoctorData();
                setIsEditing(false);
            } else {
                toast.error("Có lỗi đã xảy ra");
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            toast.error("Cập nhật thất bại");
        }
    };

    const handleImageChange = (e) => {
        setEditForm((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    useEffect(() => {
        fetchDocInfo();
    }, [doctorData, doctorId]);

    return (
        docInfo && (
            <div className="min-h-screen bg-gray-100 py-8 w-full">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center">
                            <Link to="/admin/doctor" className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                                Quay lại
                            </Link>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">Thông tin chi tiết bác sĩ</h2>
                        </div>
                        <form className="p-6 space-y-8" onSubmit={updateDoctor}>
                            {/* Basic Information */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-1">
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="relative">
                                            {!isEditing && <img className="w-48 h-48 bg-gray-100 rounded-full object-cover" src={docInfo.image} alt="Upload Icon" />}

                                            {isEditing && (
                                                <div className="flex items-center gap-4 text-gray-500">
                                                    <label htmlFor="doc-img" className="cursor-pointer">
                                                        <img className="w-48 h-48 bg-gray-100 rounded-full object-cover" src={editForm.image instanceof File ? URL.createObjectURL(editForm.image) : docInfo.image} alt="Upload Icon" />
                                                    </label>
                                                    <input onChange={handleImageChange} type="file" id="doc-img" hidden />
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-xl items-center font-semibold text-gray-900">{docInfo.name}</h3>
                                        <p className="text-blue-600 font-medium">{docInfo.degree}</p>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <div className="flex mb-2 text-lg items-center font-medium text-gray-700">
                                                <UserIcon className="w-5 h-5 inline-block mr-2" />
                                                <p>Họ và tên</p>
                                            </div>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editForm.name}
                                                    onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                                                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                                                />
                                            ) : (
                                                <p className="mt-1 text-gray-600">{docInfo.name}</p>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex mb-2 text-lg items-center font-medium text-gray-700">
                                                <MailIcon className="w-5 h-5 inline-block mr-2" />
                                                <p>Email</p>
                                            </div>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editForm.email}
                                                    onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                                                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                                                />
                                            ) : (
                                                <p className="mt-1 text-gray-600">{docInfo.email}</p>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex text-lg items-center font-medium text-gray-700">
                                                <PhoneIcon className="w-5 h-5 inline-block mr-2" />
                                                <p className="mb-2">Số điện thoại</p>
                                            </div>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editForm.phone}
                                                    onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))}
                                                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                                                />
                                            ) : (
                                                <p className="mt-1 text-gray-600">{docInfo.phone}</p>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex mb-2 text-lg items-center font-medium text-gray-700">
                                                <MapPinIcon className="w-5 h-5 inline-block mr-2" />
                                                <p>Địa chỉ</p>
                                            </div>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editForm.address}
                                                    onChange={(e) => setEditForm((prev) => ({ ...prev, address: e.target.value }))}
                                                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                                                />
                                            ) : (
                                                <p className="mt-1 text-gray-600">{docInfo.address}</p>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex text-lg items-center font-medium text-gray-700">
                                                <UserIcon className="w-5 h-5 inline-block mr-2" />
                                                <p>Giới tính</p>
                                            </div>
                                            {isEditing ? (
                                                <div className="relative">
                                                    <select
                                                        name="sex"
                                                        value={editForm.sex}
                                                        onChange={(e) => setEditForm((prev) => ({ ...prev, sex: e.target.value }))}
                                                        className="mt-2 block w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                    >
                                                        <option value="Nam">Nam</option>
                                                        <option value="Nữ">Nữ</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="mt-1 text-gray-600">{docInfo.sex}</p>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex mb-2 text-lg items-center font-medium text-gray-700">
                                                <StethoscopeIcon className="w-5 h-5 inline-block mr-2" />
                                                <p>Chuyên khoa</p>
                                            </div>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editForm.speciality}
                                                    onChange={(e) => setEditForm((prev) => ({ ...prev, speciality: e.target.value }))}
                                                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                                                />
                                            ) : (
                                                <p className="mt-1 text-gray-600">{docInfo.speciality}</p>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex mb-2 text-lg items-center font-medium text-gray-700">
                                                <GraduationCapIcon className="w-5 h-5 inline-block mr-2" />
                                                <p>Học vấn</p>
                                            </div>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editForm.degree}
                                                    onChange={(e) => setEditForm((prev) => ({ ...prev, degree: e.target.value }))}
                                                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                                                />
                                            ) : (
                                                <p className="mt-1 text-gray-600">{docInfo.degree}</p>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex mb-2 text-lg items-center font-medium text-gray-700">
                                                <BookOpenIcon className="w-5 h-5 inline-block mr-2" />
                                                <p>Trường học</p>
                                            </div>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="school"
                                                    value={editForm.school}
                                                    onChange={(e) => setEditForm((prev) => ({ ...prev, school: e.target.value }))}
                                                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                                                />
                                            ) : (
                                                <p className="mt-1 text-gray-600">{docInfo.school}</p>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex text-lg items-center font-medium text-gray-700">
                                                <BriefcaseIcon className="w-5 h-5 inline-block mr-2" />
                                                <p>Kinh nghiệm</p>
                                            </div>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editForm.experience}
                                                    onChange={(e) => setEditForm((prev) => ({ ...prev, experience: e.target.value }))}
                                                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                                                />
                                            ) : (
                                                <p className="mt-1 text-gray-600">{docInfo.experience}</p>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex text-lg items-center font-medium text-gray-700">
                                                <CircleDollarSign className="w-5 h-5 inline-block mr-2" />
                                                <p>Phí khám</p>
                                            </div>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="fees"
                                                    value={editForm.fees}
                                                    onChange={(e) => setEditForm((prev) => ({ ...prev, fees: e.target.value }))}
                                                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                                                />
                                            ) : (
                                                <p className="mt-1 text-gray-600">{parseInt(docInfo.fees).toLocaleString("vi-VN")} VNĐ</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <div className="flex mb-2 text-lg items-center font-medium text-gray-700">
                                            <FileTextIcon className="w-5 h-5 inline-block mr-2" />
                                            <p>Giới thiệu</p>
                                        </div>
                                        {isEditing ? (
                                            <textarea
                                                name="about"
                                                value={editForm.about}
                                                onChange={(e) => setEditForm((prev) => ({ ...prev, about: e.target.value }))}
                                                rows={4}
                                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
                                            />
                                        ) : (
                                            <p className="mt-1 text-gray-600">{docInfo.about}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div></div>
                            <div className="flex justify-end items-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(!isEditing);
                                        handleStartEdit();
                                    }}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Chỉnh sửa
                                </button>
                                <button type="submit" className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                                    <SaveIcon className="w-5 h-5 mr-2" />
                                    <p>Lưu thay đổi</p>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
};
export default DoctorDetail;
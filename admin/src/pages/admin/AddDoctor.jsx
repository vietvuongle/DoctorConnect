import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { PlusIcon } from "lucide-react";

const AddDoctor = () => {
    const [isAddingNew, setIsAddingNew] = useState(false);

    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [experience, setExperience] = useState("1 năm");
    const [fees, setFees] = useState("");
    const [about, setAbout] = useState("");
    const [speciality, setSpeciality] = useState("Khoa mắt");
    const [degree, setDegree] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [sex, setSex] = useState("");
    const [school, setSchool] = useState("");

    const { backendUrl, aToken, departmentData, doctorData } = useContext(AdminContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (!docImg) {
                toast.error("Vui lòng chọn ảnh");
            }

            const cleanedFees = fees.replace(/\./g, "");

            const formData = new FormData();
            formData.append("image", docImg);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("experience", experience);
            formData.append("fees", cleanedFees);
            formData.append("about", about);
            formData.append("speciality", speciality);
            formData.append("degree", degree);
            formData.append("address", address);
            formData.append("phone", phone);
            formData.append("school", school);
            formData.append("sex", sex);

            formData.forEach((value, key) => {
                console.log(`${key}:`, value);
            });

            const { data } = await axios.post(backendUrl + "/api/admin/add-doctor", formData, { headers: { aToken } });

            if (data !== false) {
                toast.success("Thêm bác sĩ thành công");
                setDocImg(false);
                setName("");
                setEmail("");
                setPassword("");
                setExperience("1 Năm");
                setFees("");
                setAbout("");
                setPhone("");
                setSex("Nam");
                setSpeciality("Da liễu");
                setDegree("");
                setAddress("");
                setSchool("");
            } else {
                toast.error("Thêm bác sĩ thất bại!");
            }
        } catch (error) { }
    };

    const handleFeesChange = (e) => {
        const rawValue = e.target.value.replace(/\./g, ""); // Xoá dấu chấm
        if (!/^\d*$/.test(rawValue)) return; // Ngăn nhập ký tự không phải số

        const formatted = Number(rawValue).toLocaleString("vi-VN");
        setFees(formatted);
    };

    return (
        <div className="w-full">
            <form onSubmit={onSubmitHandler} className="m-5 ">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý bác sĩ</h1>
                    <button type="button" onClick={() => setIsAddingNew(!isAddingNew)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Thêm bác sĩ
                    </button>
                </div>

                {isAddingNew && (
                    <div className="bg-white px-8 border py-8 rounded w-full max-w-5xl  overflow-y-scroll">
                        <div className="flex items-center gap-4 mb-8 text-gray-500">
                            <label htmlFor="doc-img">
                                <img className="w-16 bg-gray-100  rounded-full cursor-pointer" src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
                            </label>
                            <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                            <p>
                                Upload <br /> Ảnh{" "}
                            </p>
                        </div>

                        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
                            <div className="w-full lg:flex-1 flex flex-col gap-4">
                                <div className="flex-1 flex flex-col gap-1">
                                    <p>Tên Bác Sĩ</p>
                                    <input onChange={(e) => setName(e.target.value)} value={name} className="border rounded px-3 py-2" type="text" placeholder="Tên" required />
                                </div>

                                <div className="flex-1 flex flex-col gap-1">
                                    <p>Email</p>
                                    <input onChange={(e) => setEmail(e.target.value)} value={email} className="border rounded px-3 py-2" type="email" placeholder="Email" required />
                                </div>

                                <div className="flex-1 flex flex-col gap-1">
                                    <p>Mật Khẩu</p>
                                    <input onChange={(e) => setPassword(e.target.value)} value={password} className="border rounded px-3 py-2" type="password" placeholder="Mật Khẩu" required />
                                </div>

                                <div className="flex-1 flex flex-col gap-1">
                                    <p>Kinh Nghiệm</p>
                                    <select onChange={(e) => setExperience(e.target.value)} value={experience} className="border rounded px-3 py-2" name="" id="">
                                        {[...Array(12)].map((_, i) => {
                                            const year = i + 1;
                                            return (
                                                <option key={year} value={`${year} Năm`}>
                                                    {year} Năm
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>

                                <div className="flex-1 flex flex-col gap-1">
                                    <p>Phí</p>
                                    <input onChange={handleFeesChange} value={fees} className="border rounded px-3 py-2" type="text" placeholder="Phí Khám Bệnh" required />
                                </div>

                                <div className="flex-1 flex flex-col gap-1">
                                    <p>Số điện thoại</p>
                                    <input onChange={(e) => setPhone(e.target.value)} value={phone} className="border rounded px-3 py-2" type="text" placeholder="Số điện thoại" required />
                                </div>
                            </div>

                            <div className="w-full lg:flex-1 flex flex-col gap-4">
                                <div className="flex-1 flex flex-col gap-1">
                                    <p>Chuyên ngành</p>
                                    <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="border rounded px-3 py-2" name="" id="">
                                        {departmentData.map((item, index) => (
                                            <option key={index} value={item.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex-1 flex flex-col gap-1">
                                    <p>Học vấn</p>
                                    <input onChange={(e) => setDegree(e.target.value)} value={degree} className="border rounded px-3 py-2" type="text" placeholder="Học vấn" required />
                                </div>

                                <div className="flex-1 flex flex-col gap-1">
                                    <p>Trường Tốt Nghiệp</p>
                                    <input onChange={(e) => setSchool(e.target.value)} value={school} className="border rounded px-3 py-2" type="text" placeholder="Trường tốt nghiệp" required />
                                </div>

                                <div className="flex-1 flex flex-col gap-1">
                                    <p>Địa Chỉ</p>
                                    <input onChange={(e) => setAddress(e.target.value)} value={address} className="border rounded px-3 py-2" type="text" placeholder="Địa Chỉ" required />
                                </div>

                                <div className="flex-1 flex flex-col gap-1">
                                    <p>Giới tính</p>
                                    <select onChange={(e) => setSex(e.target.value)} value={sex} className="border rounded px-3 py-2" name="" id="">
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="pt-4 pb-2">Mô Tả Khác</p>
                            <textarea onChange={(e) => setAbout(e.target.value)} value={about} className="w-full px-4 pt-2 border rounded" placeholder="Viết những mô tả khác của bác sĩ" rows={5} required />
                        </div>

                        <button type="submit" className="bg-primary px-10 py-3 mt-4 text-white rounded-full">
                            Thêm Bác Sĩ
                        </button>
                    </div>
                )}
            </form>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg m-5">
                <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Danh sách bác sĩ</h3>
                        <div>
                            <input type="text" placeholder="Tìm kiếm bác sĩ..." className="border border-gray-300 rounded-md px-3 py-2 text-sm" />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bác sĩ
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Chuyên khoa
                                </th>

                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Đánh giá
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {doctorData.map((doctor) => (
                                <tr key={doctor.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img src={doctor.image} alt="" className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium" />

                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{doctor.speciality}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <span className="text-sm text-gray-900 mr-2">5</span>
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className={"h-4 w-4 text-yellow-400"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Hoạt động</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">Xem</button>
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">Sửa</button>
                                        <button className="text-red-600 hover:text-red-900">Vô hiệu</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">5</span> của <span className="font-medium">{doctorData.length}</span> bác sĩ
                            </p>
                        </div>
                        <div className="flex-1 flex justify-between sm:justify-end">
                            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Trước</button>
                            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Sau</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddDoctor;
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const MyProfile = () => {
    const { token, backendUrl } = useContext(AppContext);
    const [userProfile, setUserProfile] = useState({});
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState(null); // To store the image file
    const [imagePreview, setImagePreview] = useState(null); // To store the image preview

    // For password change
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // To show error messages

    // Get user profile
    const getUserProfile = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/user/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const userData = data.result;

            setUserProfile(userData);
            setName(userData.name || "");
            setPhone(userData.phone || "");
            setDob(userData.dob || "");
            setGender(userData.gender || "");
            setAddress(userData.address || "");
            setImagePreview(userData.image || ""); // If there's an image field, show it
        } catch (error) {
            console.error("Error fetching user profile:", error.message);
        }
    };

    // Update user profile
    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("dob", dob);
        formData.append("gender", gender);
        formData.append("address", address);

        if (image) formData.append("image", image); // Add image if present

        try {
            const response = await axios.put(backendUrl + "/api/user/get-profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserProfile(response.data); // Update user profile state with the response
            alert("Thông tin cá nhân đã được cập nhật!");
        } catch (error) {
            console.error("Error updating user profile:", error.message);
            alert("Cập nhật thông tin thất bại!");
        }
    };

    // Handle image upload
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // Preview the image

            // Optionally, upload the image to a service like Cloudinary
            const formData = new FormData();
            formData.append("file", file);

            try {
                const uploadResponse = await axios.post(backendUrl + "/api/user/uploadImage", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const uploadedImageUrl = uploadResponse.data.url;
                setImagePreview(uploadedImageUrl); // Set the image preview with the URL
            } catch (error) {
                console.error("Error uploading image:", error.message);
                alert("Có lỗi xảy ra khi tải ảnh lên.");
            }
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrorMessage("Mật khẩu mới và xác nhận mật khẩu không khớp.");
            return;
        }

        try {
            const response = await axios.put(
                backendUrl + "/api/user/change-password",
                {
                    currentPassword,
                    newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Mật khẩu đã được thay đổi thành công!");
            // Optionally clear the password fields after success
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            if (error.response) {
                // In case of a server error (status code 4xx or 5xx)
                console.error("Error response from server:", error.response);
                setErrorMessage(error.response.data.message || "Có lỗi xảy ra khi đổi mật khẩu.");
            } else if (error.request) {
                // In case the request was made but no response was received
                console.error("Error request:", error.request);
                setErrorMessage("Không nhận được phản hồi từ máy chủ.");
            } else {
                // In case of any other error
                console.error("Error:", error.message);
                setErrorMessage("Có lỗi xảy ra khi đổi mật khẩu.");
            }
        }
    };

    useEffect(() => {
        getUserProfile(); // Fetch user profile when component mounts
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow bg-gray-100 py-10 flex justify-center items-start">
                <div className="max-w-7xl w-full flex space-x-8">
                    {/* Personal Info Form */}
                    <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Thông tin cá nhân</h2>

                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            {/* Avatar Display */}
                            <div>
                                <label className="text-gray-600 text-sm">Ảnh đại diện</label>
                                <div className="mb-4">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Avatar Preview" className="w-24 h-24 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-24 h-24 bg-gray-200 rounded-full flex justify-center items-center text-gray-500">
                                            <span>Chưa có ảnh</span>
                                        </div>
                                    )}
                                </div>
                                <input type="file" onChange={handleImageChange} className="w-full bg-gray-100 p-2 rounded border border-gray-300" />
                            </div>

                            {/* Name */}
                            <div>
                                <label className="text-gray-600 text-sm">Họ và tên</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-100 p-2 rounded border border-gray-300" />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-gray-600 text-sm">Email</label>
                                <input type="email" value={userProfile.email || ""} readOnly className="w-full bg-gray-100 p-2 rounded border border-gray-300" />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="text-gray-600 text-sm">Số điện thoại</label>
                                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-gray-100 p-2 rounded border border-gray-300" />
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <label className="text-gray-600 text-sm">Ngày sinh</label>
                                <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full bg-gray-100 p-2 rounded border border-gray-300" />
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="text-gray-600 text-sm">Giới tính</label>
                                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-gray-100 p-2 rounded border border-gray-300" />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="text-gray-600 text-sm">Địa chỉ</label>
                                <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} className="w-full bg-gray-100 p-2 rounded border border-gray-300" />
                            </div>

                            <div className="mt-4">
                                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                                    Cập nhật thông tin
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Change Password Form */}
                    <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Đổi mật khẩu</h2>

                        <form onSubmit={handleChangePassword} className="space-y-4">
                            {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

                            {/* Current Password */}
                            <div>
                                <label className="text-gray-600 text-sm">Mật khẩu hiện tại</label>
                                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full bg-gray-100 p-2 rounded border border-gray-300" />
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="text-gray-600 text-sm">Mật khẩu mới</label>
                                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-gray-100 p-2 roundedborder border-gray-300" />
                            </div>
                            {/* Confirm New Password */}
                            <div>
                                <label className="text-gray-600 text-sm">Xác nhận mật khẩu mới</label>
                                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-gray-100 p-2 rounded border border-gray-300" />
                            </div>

                            <div className="mt-4">
                                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                                    Đổi mật khẩu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MyProfile;

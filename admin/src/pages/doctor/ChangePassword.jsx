import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DoctorContext } from "../../context/DoctorContext";

const ChangePassword = () => {
    const { backendUrl, dToken } = useContext(DoctorContext);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp.");
            return;
        }

        try {
            const { data } = await axios.put(
                backendUrl + "/api/doctor/change-password",
                {
                    currentPassword,
                    newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${dToken}`,
                    },
                }
            );

            if (data.code === 1000) {
                toast.success("Mật khẩu đã được thay đổi thành công!");

                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                toast.error("Mật khẩu cũ không chính xác");
            }
        } catch (error) {
            toast.error("Mật khẩu cũ không chính xác");
        }
    };

    return (
        <div className="max-w-md w-full m-auto bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Đổi mật khẩu</h2>

            <form onSubmit={handleChangePassword} className="space-y-4">
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
    );
};

export default ChangePassword;

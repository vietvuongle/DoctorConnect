import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext.jsx";

const Login = () => {
    const [state, setState] = useState("Admin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { setAToken, backendUrl } = useContext(AdminContext);
    const { setDToken } = useContext(DoctorContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (state == "Admin") {
                const { data } = await axios.post(backendUrl + "/api/admin/login", { email, password });

                if (data !== false) {
                    const token = data.result.token;
                    localStorage.setItem("aToken", token);
                    setAToken(token);
                    navigate("/");
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(backendUrl + "/api/doctor/login", { email, password });

                if (data !== false) {
                    const token = data.result.token;
                    localStorage.setItem("dToken", token);
                    setDToken(token);
                    toast.success("Đăng nhập thành công");

                    navigate("/doctor/home");
                } else {
                    toast.error("Sai email hoặc mật khẩu");
                }
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="min-h-[100vh] flex items-center">
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
                <p className="text-2xl font-semibold m-auto">
                    <span className="text-primary"> {state} </span> Đăng nhập{" "}
                </p>
                <div className="w-full">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="email" required />
                </div>
                <div className="w-full">
                    <p>Mật khẩu</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="password" required />
                </div>
                <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">
                    Đăng nhập
                </button>
                {state == "Admin" ? (
                    <p>
                        Đăng nhập Bác sĩ?{" "}
                        <span className="text-primary underline cursor-pointer" onClick={() => setState("Doctor")}>
                            {" "}
                            Click Here
                        </span>
                    </p>
                ) : (
                    <p>
                        Đăng nhập Admin?{" "}
                        <span className="text-primary underline cursor-pointer" onClick={() => setState("Admin")}>
                            {" "}
                            Click Here
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default Login;

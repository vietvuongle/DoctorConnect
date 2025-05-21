import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Facebook as FacebookIcon } from "lucide-react";

const Login = () => {
    const { setToken } = useContext(AppContext);

    const [state, setState] = useState("Đăng Kí");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { backendUrl } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (state === "Đăng Kí") {
                const response = await axios.post(backendUrl + "/api/user/register", {
                    name,
                    email,
                    password,
                });

                const { code, result } = response.data;

                if (code === 1000 && result) {
                    toast.success("Đăng kí thành công");
                    navigate("/login");
                } else {
                    toast.error("Đăng kí thất bại");
                }
            } else {
                const response = await axios.post(backendUrl + "/api/user/login", {
                    email,
                    password,
                });

                const { code, result } = response.data;

                if (code === 0 && result && result.token) {
                    const token = result.token;

                    setToken(token);
                    localStorage.setItem("token", token);

                    toast.success("Đăng nhập thành công");
                    navigate("/");
                } else {
                    toast.error("Mật khẩu hoặc tài khoản không đúng");
                }
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const { code, message } = error.response.data;
                toast.error(message);
                console.error("Chi tiết lỗi:", code, message);
            } else {
                toast.error("Đã xảy ra lỗi không xác định");
                console.error("Lỗi không xác định:", error);
            }
        }
    };

    const handleGoogleRedirectLogin = () => {
        // Chuyển hướng đến URL login Google (OAuth2)
        window.location.href = backendUrl + "/oauth2/authorization/google";
    };

    return (
        <form onSubmit={onSubmitHandler} className="flex items-center h-screen">
            <div className="flex flex-col gap-3 mx-auto  border sm:min-w-96 rounded-xl p-8 min-w-[340px] text-zinc-600 text-sm shadow-lg">
                <p className="text-3xl font-semibold text-center">{state === "Đăng Kí" ? "Đăng Kí" : "Đăng Nhập"}</p>
                {state === "Đăng Kí" && (
                    <div className="w-full">
                        <p>Họ và tên</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} className="border border-zinc-300 rounded w-full p-2 mt-1" type="text" required />
                    </div>
                )}
                <div className="w-full">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className="border border-zinc-300 rounded w-full p-2 mt-1" type="email" required />
                </div>
                <div className="w-full">
                    <p>Mật Khẩu</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className="border border-zinc-300 rounded w-full p-2 mt-1" type="password" required />
                </div>
                <button type="submit" className="py-2 rounded-md bg-primary hover:scale-105 transition-all text-white text-base">
                    {state === "Đăng Kí" ? "Đăng Kí" : "Đăng Nhập"}
                </button>
                <div className="flex justify-center items-center gap-3">
                    {/* Google Button */}
                    <div>
                        <button onClick={handleGoogleRedirectLogin} type="button">
                            <a className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full shadow-sm bg-white hover:bg-gray-100">
                                <svg className="w-4 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#4285F4" d="M533.5 278.4c0-18.4-1.5-36.1-4.3-53.3H272.1v100.9h146.9c-6.3 33.8-25.1 62.5-53.6 81.8v67.9h86.7c50.7-46.7 81.4-115.5 81.4-197.3z" />
                                    <path fill="#34A853" d="M272.1 544.3c72.9 0 134-24.2 178.7-65.6l-86.7-67.9c-24.1 16.2-55 25.8-92 25.8-70.7 0-130.6-47.7-152-111.6h-90v69.9c44.9 88.9 136.3 149.4 242 149.4z" />
                                    <path fill="#FBBC05" d="M120.1 325c-10.4-30.8-10.4-63.9 0-94.7v-69.9h-90c-39.1 77.8-39.1 168.7 0 246.5l90-69.9z" />
                                    <path fill="#EA4335" d="M272.1 107.7c39.6-.6 77.8 13.8 107 39.5l80.1-80.1C423.7 24.2 362.6 0 272.1 0 166.4 0 75 60.5 30.1 149.4l90 69.9c21.4-63.9 81.3-111.6 152-111.6z" />
                                </svg>
                            </a>
                        </button>
                    </div>

                    {/* Facebook Button */}
                    <div>
                        <a href="#" className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full shadow-sm bg-white hover:bg-gray-100">
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path
                                    fillRule="evenodd"
                                    d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </div>
                </div>

                {state === "Đăng Kí" ? (
                    <p>
                        Bạn đã có tài khoản?{" "}
                        <span className="underline cursor-pointer text-primary" onClick={() => setState("Đăng Nhập")}>
                            Đăng Nhập Ngay
                        </span>
                    </p>
                ) : (
                    <p>
                        Bạn chưa có tài khoản?{" "}
                        <span className="underline cursor-pointer text-primary" onClick={() => setState("Đăng Kí")}>
                            Đăng Kí Ngay
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default Login;

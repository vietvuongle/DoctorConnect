import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const OAuth2Success = () => {
    const navigate = useNavigate();
    const { setToken } = useContext(AppContext);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            setToken(token);
            localStorage.setItem("token", token);
            toast.success("Đăng nhập Google thành công");
            navigate("/");
        } else {
            toast.error("Không lấy được token từ Google");
            navigate("/login");
        }
    }, []);

    return <div className="text-center p-10">Đang xử lý đăng nhập...</div>;
};

export default OAuth2Success;

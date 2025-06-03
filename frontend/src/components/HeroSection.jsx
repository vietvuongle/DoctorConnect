import { Calendar as CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
    const navigate = useNavigate();

    return (
        <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-16 md:py-24">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0">
                    <h1 className="text-3xl md:text-5xl font-bold mb-6">Chăm sóc sức khỏe chất lượng cao tại phòng khám của chúng tôi</h1>
                    <p className="text-lg mb-8 text-blue-100">Đặt lịch khám dễ dàng với đội ngũ bác sĩ chuyên nghiệp, giúp bạn tiết kiệm thời gian và được chăm sóc tốt nhất.</p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            onClick={() => {
                                navigate("/appointment");
                                scrollTo(0, 0);
                            }}
                            className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium flex items-center justify-center hover:bg-blue-50 transition-colors"
                        >
                            <CalendarIcon className="h-5 w-5 mr-2" />
                            Đặt lịch khám ngay
                        </button>
                        <button onClick={() => navigate("/services")} className="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors">
                            Tìm hiểu thêm
                        </button>
                    </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <img src="https://img.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg" alt="Đội ngũ y tế chuyên nghiệp" className="rounded-lg shadow-xl max-w-full h-auto" />
                </div>
            </div>
        </section>
    );
}

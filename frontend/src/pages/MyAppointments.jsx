import { useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function MyAppointments() {
  const location = useLocation();
  const { doctor, selectedSlot, bookingDate, fees } = location.state || {};

  if (!doctor) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8 text-center text-red-600">
          Không có lịch hẹn nào được chọn
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Thông tin lịch hẹn</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Doctor Information */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Thông tin bác sĩ</h2>
            <div className="space-y-4 text-gray-600">
              <p className="flex items-center">
                <i className="fas fa-user-md w-5 h-5 text-blue-500 mr-2"></i>
                <strong className="font-medium text-gray-700">Bác sĩ:</strong> {doctor.name}
              </p>
              <p className="flex items-center">
                <i className="fas fa-stethoscope w-5 h-5 text-blue-500 mr-2"></i>
                <strong className="font-medium text-gray-700">Chuyên khoa:</strong> {doctor.specialty}
              </p>
              <p className="flex items-center">
                <i className="fas fa-envelope w-5 h-5 text-blue-500 mr-2"></i>
                <strong className="font-medium text-gray-700">Email:</strong> {doctor.email || "Đang cập nhật"}
              </p>
              <p className="flex items-center">
                <i className="fas fa-phone-alt w-5 h-5 text-blue-500 mr-2"></i>
                <strong className="font-medium text-gray-700">Số điện thoại:</strong> {doctor.phone || "Đang cập nhật"}
              </p>
              <p className="flex items-center">
                <i className="fas fa-calendar-alt w-5 h-5 text-blue-500 mr-2"></i>
                <strong className="font-medium text-gray-700">Ngày:</strong> {doctor.address || "Đang cập nhật"}
              </p>
              <p className="flex items-center">
                <i className="fas fa-genderless w-5 h-5 text-blue-500 mr-2"></i>
                <strong className="font-medium text-gray-700">Giới tính:</strong> {doctor.sex || "Đang cập nhật"}
              </p>
              <p className="flex items-center">
                <i className="fas fa-money-bill-wave w-5 h-5 text-blue-500 mr-2"></i>
                <strong className="font-medium text-gray-700">Phí khám:</strong> {fees || "Đang cập nhật"}
              </p>
              <p className="flex items-center">
                <i className="fas fa-school w-5 h-5 text-blue-500 mr-2"></i>
                <strong className="font-medium text-gray-700">Trường:</strong> {doctor.school || "Đang cập nhật"}
              </p>
              <p className="flex items-center">
                <i className="fas fa-certificate w-5 h-5 text-blue-500 mr-2"></i>
                <strong className="font-medium text-gray-700">Chứng chỉ:</strong> {doctor.certifications?.join(", ") || "Đang cập nhật"}
              </p>
              <p className="flex items-center">
                <i className="fas fa-comment-alt w-5 h-5 text-blue-500 mr-2"></i>
                <strong className="font-medium text-gray-700">Mô tả:</strong> {doctor.description || "Đang cập nhật"}
              </p>
            </div>
          </div>

          {/* Appointment Information */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Thông tin lịch hẹn</h2>
            <div className="space-y-4 text-gray-600">
              <p className="flex items-center">
                <i className="fas fa-calendar-day w-5 h-5 text-green-500 mr-2"></i>
                <strong className="font-medium text-gray-700">Ngày:</strong> {bookingDate}
              </p>
              <p className="flex items-center">
                <i className="fas fa-clock w-5 h-5 text-green-500 mr-2"></i>
                <strong className="font-medium text-gray-700">Giờ:</strong> {selectedSlot}
              </p>
              <p className="flex items-center">
                <i className="fas fa-money-bill-alt w-5 h-5 text-green-500 mr-2"></i>
                <strong className="font-medium text-gray-700">Phí khám:</strong> {fees}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyAppointments;

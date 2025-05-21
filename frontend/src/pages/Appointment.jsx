import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Không có token, không thể gọi API");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:8081/api/appointments/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAppointments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API lịch hẹn:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Đang tải lịch hẹn...</div>;

  return (
    <>
      <Header />
      <div className="p-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">🗓️ Lịch hẹn của tôi</h2>
        {appointments.length === 0 ? (
          <p className="text-lg text-gray-600">Không có lịch hẹn nào.</p>
        ) : (
          <div className="space-y-6">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white border border-gray-200 rounded-xl shadow-md p-6"
              >
                <h6 className="text-blueGray-400 text-base mb-6 font-bold uppercase tracking-wide">
                  Thông tin lịch hẹn
                </h6>

                <div className="flex flex-wrap -mx-4 text-base">
                  {/* Mỗi phần tử */}
                  <div className="w-full lg:w-6/12 px-4 mb-4">
                    <label className="block text-blueGray-600 text-base font-semibold mb-2">
                      Họ tên bệnh nhân
                    </label>
                    <div className="border px-4 py-3 rounded bg-gray-50 text-base text-gray-800">
                      {appointment.patientName}
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4 mb-4">
                    <label className="block text-blueGray-600 text-base font-semibold mb-2">
                      Giới tính
                    </label>
                    <div className="border px-4 py-3 rounded bg-gray-50 text-base text-gray-800">
                      {appointment.gender}
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4 mb-4">
                    <label className="block text-blueGray-600 text-base font-semibold mb-2">
                      Ngày sinh
                    </label>
                    <div className="border px-4 py-3 rounded bg-gray-50 text-base text-gray-800">
                      {appointment.dob}
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4 mb-4">
                    <label className="block text-blueGray-600 text-base font-semibold mb-2">
                      Email
                    </label>
                    <div className="border px-4 py-3 rounded bg-gray-50 text-base text-gray-800">
                      {appointment.email}
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4 mb-4">
                    <label className="block text-blueGray-600 text-base font-semibold mb-2">
                      Lý do khám
                    </label>
                    <div className="border px-4 py-3 rounded bg-gray-50 text-base text-gray-800">
                      {appointment.reason}
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4 mb-4">
                    <label className="block text-blueGray-600 text-base font-semibold mb-2">
                      Ngày khám
                    </label>
                    <div className="border px-4 py-3 rounded bg-gray-50 text-base text-gray-800">
                      {appointment.slotDate}
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4 mb-4">
                    <label className="block text-blueGray-600 text-base font-semibold mb-2">
                      Giờ khám
                    </label>
                    <div className="border px-4 py-3 rounded bg-gray-50 text-base text-gray-800">
                      {appointment.slotTime}
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 mb-4">
                    <label className="block text-blueGray-600 text-base font-semibold mb-2">
                      Giá khám
                    </label>
                    <div className="border px-4 py-3 rounded bg-gray-50 text-base text-gray-800">
                      {appointment.price?.toLocaleString()} VNĐ
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 mb-4">
                    <label className="block text-blueGray-600 text-base font-semibold mb-2">
                      Trạng thái
                    </label>
                    <div
                      className={`border px-4 py-3 rounded text-base font-semibold ${appointment.cancelled
                        ? "text-red-600 bg-red-50"
                        : appointment.completed
                          ? "text-green-600 bg-green-50"
                          : "text-yellow-600 bg-yellow-50"
                        }`}
                    >
                      {appointment.cancelled
                        ? "Đã hủy"
                        : appointment.completed
                          ? "Đã hoàn thành"
                          : "Đang chờ khám"}
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4 mb-4">
                    <label className="block text-blueGray-600 text-base font-semibold mb-2">
                      Thanh toán
                    </label>
                    <div
                      className={`border px-4 py-3 rounded text-base font-semibold ${appointment.payment
                        ? "text-green-600 bg-green-50"
                        : "text-red-500 bg-red-50"
                        }`}
                    >
                      {appointment.payment ? "Đã thanh toán" : "Chưa thanh toán"}
                    </div>
                  </div>


                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Appointment;

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
        console.log("Dữ liệu lịch hẹn nhận được:", res.data);
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
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Lịch hẹn của tôi</h2>
        {appointments.length === 0 ? (
          <p>Không có lịch hẹn nào.</p>
        ) : (
          <ul className="space-y-4">
            {appointments.map((appointment) => (
              <li
                key={appointment._id}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition"
              >
                <p><strong>Tên bệnh nhân:</strong> {appointment.patientName}</p>
                <p><strong>Lý do khám:</strong> {appointment.reason}</p>
                <p><strong>Ngày khám:</strong> {appointment.slotDate}</p>
                <p><strong>Giờ khám:</strong> {appointment.slotTime}</p>
                <p><strong>Email:</strong> {appointment.email}</p>
                <p><strong>Điện thoại:</strong> {appointment.phone}</p>
                <p><strong>Giới tính:</strong> {appointment.gender}</p>
                <p><strong>Ngày sinh:</strong> {appointment.dob}</p>
                <p><strong>Ngày đặt:</strong> {appointment.dateBooking}</p>
                <p><strong>Giá:</strong> {appointment.price?.toLocaleString()} VNĐ</p>
                <p><strong>Trạng thái:</strong> {
                  appointment.cancelled ? "Đã hủy" :
                    appointment.completed ? "Đã hoàn thành" :
                      "Đang chờ khám"
                }</p>
                <p><strong>Thanh toán:</strong> {appointment.payment ? "Đã thanh toán" : "Chưa thanh toán"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Appointment;

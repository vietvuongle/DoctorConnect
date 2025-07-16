import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon, ClockIcon, CheckIcon, XIcon, ChevronLeftIcon, ChevronRightIcon, SaveIcon, PlusIcon, TrashIcon } from "lucide-react";
import { format, addDays, startOfWeek, addWeeks, subWeeks, isBefore, startOfDay, addHours, isAfter } from "date-fns";
import { vi } from "date-fns/locale";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ClinicContext } from "../../context/ClinicContext";

const DoctorSchedule = () => {
    const { cToken, backendUrl, doctorData } = useContext(ClinicContext);
    const { doctorId } = useParams();

    const doctorName = doctorData?.find((doc) => doc.id === doctorId)?.name;

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [schedules, setSchedules] = useState({});
    const [bookedSlotsFromDB, setBookedSlotsFromDB] = useState([]);
    const [newSlot, setNewSlot] = useState({ start: "06:30", end: "07:00" });

    const defaultTimeSlots = [
        { start: "08:00", end: "09:00", status: "available" },
        { start: "09:00", end: "10:00", status: "available" },
        { start: "10:00", end: "11:00", status: "available" },
        { start: "14:00", end: "15:00", status: "available" },
        { start: "15:00", end: "16:00", status: "available" },
        { start: "16:00", end: "17:00", status: "available" },
    ];

    const getWeekDays = (date) => {
        const start = startOfWeek(date, { weekStartsOn: 1 });
        return Array.from({ length: 7 }, (_, i) => addDays(start, i));
    };

    const weekDays = getWeekDays(currentDate);

    const handlePreviousWeek = () => {
        setCurrentDate(subWeeks(currentDate, 1));
    };

    const handleNextWeek = () => {
        setCurrentDate(addWeeks(currentDate, 1));
    };

    const isDateSelectable = (date) => {
        const today = startOfDay(new Date());
        return !isBefore(date, today);
    };

    const isTimeSlotInFuture = (date, startTime) => {
        const nowPlus2h = addHours(new Date(), 1);
        const [hour, minute] = startTime.split(":").map(Number);
        const slotDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
        return isAfter(slotDateTime, nowPlus2h);
    };

    const isSlotAlreadyBookedInDB = (start, end) => {
        return bookedSlotsFromDB.some((slot) => slot.startTime === `${start}:00` && slot.endTime === `${end}:00`);
    };

    const fetchSchedulesFromDB = async (dateStr) => {
        try {
            const url = `${backendUrl}/api/doctor/available/${doctorId}?slotDate=${dateStr}`;
            const headers = { Authorization: `Bearer ${cToken}` };
            const { data } = await axios.get(url, { headers });
            return data.code === 1000 ? data.result : [];
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            toast.error("Không thể tải lịch khám!");
            return [];
        }
    };

    const handleDateClick = async (date) => {
        if (!isDateSelectable(date)) return;

        setSelectedDate(date);
        const dateStr = format(date, "yyyy-MM-dd");

        const bookedSlots = await fetchSchedulesFromDB(dateStr);
        setBookedSlotsFromDB(bookedSlots);

        setSchedules((prev) => {
            const existingSlots = prev[dateStr] || defaultTimeSlots;
            const updatedSlots = existingSlots.map((slot) => {
                const existsInDB = bookedSlots.some((s) => s.startTime === `${slot.start}:00` && s.endTime === `${slot.end}:00`);
                const dbSlot = bookedSlots.find((s) => s.startTime === `${slot.start}:00` && s.endTime === `${slot.end}:00`);
                return {
                    ...slot,
                    status: existsInDB ? (dbSlot.booked ? "booked" : "available") : slot.status,
                };
            });
            return {
                ...prev,
                [dateStr]: updatedSlots,
            };
        });
    };

    const handleTimeSlotStatusChange = (dateStr, slotStart, newStatus) => {
        setSchedules((prev) => ({
            ...prev,
            [dateStr]: prev[dateStr].map((slot) => (slot.start === slotStart ? { ...slot, status: newStatus } : slot)),
        }));
    };

    const handleAddNewSlot = () => {
        if (!selectedDate) {
            toast.error("Vui lòng chọn ngày!");
            return;
        }

        const dateStr = format(selectedDate, "yyyy-MM-dd");
        const newSlotToAdd = { start: newSlot.start, end: newSlot.end, status: "available" };

        const isToday = dateStr === format(new Date(), "yyyy-MM-dd");
        if (isToday && !isTimeSlotInFuture(selectedDate, newSlot.start)) {
            toast.error("Khung giờ phải sau thời điểm hiện tại ít nhất 1 tiếng!");
            return;
        }

        const slotExists = schedules[dateStr]?.some((slot) => slot.start === newSlot.start && slot.end === newSlot.end) || isSlotAlreadyBookedInDB(newSlot.start, newSlot.end);

        if (slotExists) {
            toast.error("Khung giờ này đã tồn tại!");
            return;
        }

        setSchedules((prev) => ({
            ...prev,
            [dateStr]: [...(prev[dateStr] || []), newSlotToAdd].sort((a, b) => a.start.localeCompare(b.start)),
        }));
        setNewSlot({ start: "06:30", end: "07:00" });
        toast.success("Thêm khung giờ thành công!");
    };

    const handleDeleteSlot = async (slot) => {
        if (!selectedDate) return;

        const dateStr = format(selectedDate, "yyyy-MM-dd");
        const slotInDB = bookedSlotsFromDB.find((s) => s.startTime === `${slot.start}:00` && s.endTime === `${slot.end}:00`);

        if (slotInDB) {
            try {
                const url = `${backendUrl}/api/doctor/delete-schedule/${slotInDB.id}`;
                const headers = { Authorization: `Bearer ${cToken}` };
                const { data } = await axios.delete(url, { headers });

                if (data.code === 1000) {
                    toast.success("Hủy lịch thành công!");
                    // Làm mới dữ liệu từ DB
                    const bookedSlots = await fetchSchedulesFromDB(dateStr);
                    setBookedSlotsFromDB(bookedSlots);
                    // Gọi handleDateClick để đồng bộ schedules với DB
                    await handleDateClick(selectedDate);
                } else {
                    toast.error("Không thể hủy lịch: " + data.message);
                    // Khôi phục state nếu xóa thất bại
                    await handleDateClick(selectedDate);
                }
            } catch (error) {
                console.error("Error deleting slot:", error);
                toast.error("Lỗi khi hủy lịch!");
                // Khôi phục state nếu có lỗi
                await handleDateClick(selectedDate);
            }
        } else {
            // Nếu slot không có trong DB, chỉ cần làm mới giao diện
            await handleDateClick(selectedDate);
        }
    };

    const handleSaveSchedule = async () => {
        if (!selectedDate) {
            toast.error("Vui lòng chọn ngày!");
            return;
        }

        const dateStr = format(selectedDate, "yyyy-MM-dd");
        const slotsToSave = schedules[dateStr].filter((slot) => slot.status === "available" && !isSlotAlreadyBookedInDB(slot.start, slot.end) && isTimeSlotInFuture(selectedDate, slot.start));

        console.log("Slots:", slotsToSave);

        if (slotsToSave.length === 0) {
            toast.info("Không có khung giờ mới để lưu!");
            return;
        }

        try {
            const url = `${backendUrl}/api/doctor/create-schedule`;
            const headers = { Authorization: `Bearer ${cToken}` };

            const payload = {
                doctorId,
                slotDate: dateStr,
                slots: slotsToSave.map((slot) => ({
                    startTime: `${slot.start}:00`,
                    endTime: `${slot.end}:00`,
                })),
            };

            console.log("Payload to save:", payload);

            const { data } = await axios.post(url, payload, { headers });
            if (data.code === 1000) {
                toast.success("Thêm lịch khám thành công!");
                const bookedSlots = await fetchSchedulesFromDB(dateStr);
                setBookedSlotsFromDB(bookedSlots);
            } else {
                toast.error("Không thể lưu lịch: " + data.message);
            }
        } catch (error) {
            console.error("Error saving schedule:", error);
            toast.error("Lỗi khi lưu lịch!");
        }
    };

    return (
        <div className="min-h-screen mt-5 mr-5 flex-1">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Quản lý lịch làm việc</h2>
                                <h2 className="text-lg mt-3 font-bold text-gray-600">Bs. {doctorName}</h2>
                            </div>
                            <div className="flex space-x-4">
                                <button onClick={handlePreviousWeek} className="p-2 rounded-full hover:bg-gray-100">
                                    <ChevronLeftIcon className="w-5 h-5" />
                                </button>
                                <span className="text-lg font-medium">Tuần {format(currentDate, "dd/MM/yyyy", { locale: vi })}</span>
                                <button onClick={handleNextWeek} className="p-2 rounded-full hover:bg-gray-100">
                                    <ChevronRightIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-4">
                            {weekDays.map((date) => {
                                const dateStr = format(date, "yyyy-MM-dd");
                                const isSelected = selectedDate ? format(selectedDate, "yyyy-MM-dd") === dateStr : false;
                                const selectable = isDateSelectable(date);
                                return (
                                    <div key={dateStr} className={`border rounded-lg p-4 cursor-pointer transition-colors ${isSelected ? "border-blue-500 bg-blue-50" : selectable ? "hover:border-blue-300" : "opacity-40 cursor-not-allowed"}`} onClick={() => selectable && handleDateClick(date)}>
                                        <div className="text-center">
                                            <div className={`text-sm font-medium text-gray-500 ${!selectable ? "text-gray-300" : ""}`}>{format(date, "EEEE", { locale: vi })}</div>
                                            <div className={`text-lg font-semibold text-gray-900 ${!selectable ? "text-gray-300" : ""}`}>{format(date, "d", { locale: vi })}</div>
                                            <div className={`text-sm text-gray-500 ${!selectable ? "text-gray-300" : ""}`}>{format(date, "MM/yyyy", { locale: vi })}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {selectedDate && (
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Lịch làm việc ngày {format(selectedDate, "dd/MM/yyyy", { locale: vi })}</h3>
                            <div className="mb-4 flex items-center space-x-4">
                                <h4 className="text-md font-medium">Thêm khung giờ mới:</h4>
                                <input type="time" value={newSlot.start} onChange={(e) => setNewSlot({ ...newSlot, start: e.target.value })} className="border rounded-lg p-2" />
                                <span>-</span>
                                <input type="time" value={newSlot.end} onChange={(e) => setNewSlot({ ...newSlot, end: e.target.value })} className="border rounded-lg p-2" />
                                <button onClick={handleAddNewSlot} className="flex items-center bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700">
                                    <PlusIcon className="w-5 h-5 mr-2" />
                                    Thêm
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {schedules[format(selectedDate, "yyyy-MM-dd")]
                                    ?.filter((slot) => {
                                        const isToday = format(selectedDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
                                        return isToday ? isTimeSlotInFuture(selectedDate, slot.start) : true;
                                    })
                                    .map((slot) => {
                                        const dateStr = format(selectedDate, "yyyy-MM-dd");
                                        const alreadyInDB = isSlotAlreadyBookedInDB(slot.start, slot.end);
                                        const dbSlot = alreadyInDB ? bookedSlotsFromDB.find((s) => s.startTime === `${slot.start}:00` && s.endTime === `${slot.end}:00`) : null;
                                        const isBooked = dbSlot ? dbSlot.booked : false;
                                        const isEditable = !alreadyInDB;

                                        return (
                                            <div key={slot.start} className={`border gap-1 rounded-lg p-4 flex items-center justify-between ${alreadyInDB ? "bg-gray-100 border-gray-300 opacity-70 cursor-not-allowed" : "hover:border-blue-300"}`}>
                                                <div className="flex items-center">
                                                    <ClockIcon className="w-5 h-5 text-gray-400 mr-2" />
                                                    <span className={`text-gray-900 ${alreadyInDB ? "text-gray-500" : ""}`}>
                                                        {slot.start} - {slot.end}
                                                    </span>
                                                </div>
                                                <div className="flex space-x-2">
                                                    {isEditable && (
                                                        <>
                                                            <button onClick={() => handleTimeSlotStatusChange(dateStr, slot.start, "available")} className={`p-2 rounded-full ${slot.status === "available" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                                                                <CheckIcon className="w-4 h-4" />
                                                            </button>
                                                            <button onClick={() => handleTimeSlotStatusChange(dateStr, slot.start, "booked")} className={`p-2 rounded-full ${slot.status === "booked" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-400"}`}>
                                                                <XIcon className="w-4 h-4" />
                                                            </button>
                                                        </>
                                                    )}
                                                    {alreadyInDB && !isBooked && (
                                                        <button onClick={() => handleDeleteSlot(slot)} className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200">
                                                            <TrashIcon className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    {alreadyInDB && isBooked && <span className="text-sm text-gray-500">Đã đặt</span>}
                                                    {alreadyInDB && !isBooked && <span className="text-sm text-gray-500 mt-1">Đã lưu</span>}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 flex items-center justify-between">
                <div className="flex items-center">
                    <Link to="/clinic/doctor" className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Quay lại
                    </Link>
                </div>
                <button onClick={handleSaveSchedule} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <SaveIcon className="w-5 h-5 mr-2" />
                    Tạo lịch làm việc
                </button>
            </div>
        </div>
    );
};

export default DoctorSchedule;

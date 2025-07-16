import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, CalendarIcon, ClockIcon, CheckIcon, XIcon, ChevronLeftIcon, ChevronRightIcon, SaveIcon } from "lucide-react";
import { format, addDays, startOfWeek, addWeeks, subWeeks } from "date-fns";
import { vi } from "date-fns/locale";
const Test = () => {
    const [currentDate, setCurrentDate] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [schedules, setSchedules] = useState({
        start: "",
        end: "",
        status: "",
    });
    // Khung giờ mặc định
    const defaultTimeSlots = [
        {
            start: "08:00",
            end: "09:00",
            status: "available",
        },
        {
            start: "09:00",
            end: "10:00",
            status: "available",
        },
        {
            start: "10:00",
            end: "11:00",
            status: "available",
        },
        {
            start: "14:00",
            end: "15:00",
            status: "available",
        },
        {
            start: "15:00",
            end: "16:00",
            status: "available",
        },
        {
            start: "16:00",
            end: "17:00",
            status: "available",
        },
    ];
    const getWeekDays = (date) => {
        const start = startOfWeek(date, {
            weekStartsOn: 1,
        });
        return Array.from(
            {
                length: 7,
            },
            (_, i) => addDays(start, i)
        );
    };
    const weekDays = getWeekDays(currentDate);
    const handlePreviousWeek = () => {
        setCurrentDate(subWeeks(currentDate, 1));
    };
    const handleNextWeek = () => {
        setCurrentDate(addWeeks(currentDate, 1));
    };
    const handleDateClick = (date) => {
        setSelectedDate(date);
        if (!schedules[format(date, "yyyy-MM-dd")]) {
            setSchedules((prev) => ({
                ...prev,
                [format(date, "yyyy-MM-dd")]: [...defaultTimeSlots],
            }));
        }
    };
    const handleTimeSlotStatusChange = (date, index, newStatus) => {
        setSchedules((prev) => ({
            ...prev,
            [date]: prev[date].map((slot, i) =>
                i === index
                    ? {
                          ...slot,
                          status: newStatus,
                      }
                    : slot
            ),
        }));
    };
    const handleSaveSchedule = () => {
        console.log("Saving schedule:", schedules);
        // Implement API call to save schedule
    };
    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/doctor/dashboard" className="flex items-center text-blue-600 hover:text-blue-800">
                            <ArrowLeftIcon className="w-5 h-5 mr-2" />
                            Quay lại Dashboard
                        </Link>
                    </div>
                    <button onClick={handleSaveSchedule} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        <SaveIcon className="w-5 h-5 mr-2" />
                        Lưu lịch làm việc
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Quản lý lịch làm việc</h2>
                            <div className="flex space-x-4">
                                <button onClick={handlePreviousWeek} className="p-2 rounded-full hover:bg-gray-100">
                                    <ChevronLeftIcon className="w-5 h-5" />
                                </button>
                                <span className="text-lg font-medium">
                                    Tuần{" "}
                                    {format(currentDate, "dd/MM/yyyy", {
                                        locale: vi,
                                    })}
                                </span>
                                <button onClick={handleNextWeek} className="p-2 rounded-full hover:bg-gray-100">
                                    <ChevronRightIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-4">
                            {weekDays.map((date) => {
                                const dateStr = format(date, "yyyy-MM-dd");
                                const isSelected = selectedDate ? format(selectedDate, "yyyy-MM-dd") === dateStr : false;
                                return (
                                    <div key={dateStr} className={`border rounded-lg p-4 cursor-pointer transition-colors ${isSelected ? "border-blue-500 bg-blue-50" : "hover:border-blue-300"}`} onClick={() => handleDateClick(date)}>
                                        <div className="text-center">
                                            <div className="text-sm font-medium text-gray-500">
                                                {format(date, "EEEE", {
                                                    locale: vi,
                                                })}
                                            </div>
                                            <div className="text-lg font-semibold text-gray-900">
                                                {format(date, "d", {
                                                    locale: vi,
                                                })}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {format(date, "MM/yyyy", {
                                                    locale: vi,
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {selectedDate && (
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Lịch làm việc ngày{" "}
                                {format(selectedDate, "dd/MM/yyyy", {
                                    locale: vi,
                                })}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {schedules[format(selectedDate, "yyyy-MM-dd")]?.map((slot, index) => (
                                    <div key={index} className="border rounded-lg p-4 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <ClockIcon className="w-5 h-5 text-gray-400 mr-2" />
                                            <span className="text-gray-900">
                                                {slot.start} - {slot.end}
                                            </span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button onClick={() => handleTimeSlotStatusChange(format(selectedDate, "yyyy-MM-dd"), index, "available")} className={`p-2 rounded-full ${slot.status === "available" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                                                <CheckIcon className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => handleTimeSlotStatusChange(format(selectedDate, "yyyy-MM-dd"), index, "unavailable")} className={`p-2 rounded-full ${slot.status === "unavailable" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-400"}`}>
                                                <XIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Test;

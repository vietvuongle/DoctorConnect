import React, { useContext, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { DoctorContext } from "../context/DoctorContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MonthlySalesChart = ({ appointmentData }) => {
    // Tính doanh thu theo tháng
    const monthlyRevenue = useMemo(() => {
        const revenue = new Array(12).fill(0); // Mảng 12 tháng

        appointmentData.forEach((appointment) => {
            if (appointment.completed && appointment.slotDate && appointment.price) {
                const date = new Date(appointment.slotDate);
                const month = date.getMonth(); // 0 - 11
                revenue[month] += appointment.price;
            }
        });

        return revenue;
    }, [appointmentData]);

    const data = {
        labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
        datasets: [
            {
                label: "Doanh thu",
                data: monthlyRevenue,
                backgroundColor: "#3b82f6",
                borderRadius: 4,
                barThickness: 24,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 200000, color: "#6b7280" },
                grid: { color: "#e5e7eb" },
            },
            x: {
                ticks: { color: "#374151" },
                grid: { display: false },
            },
        },
    };

    return (
        <div className="w-full bg-white rounded-xl shadow p-4 sm:p-6 max-w-4xl mx-auto my-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Doanh thu theo tháng</h2>
            </div>

            <div className="relative w-full aspect-[2/1]">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default MonthlySalesChart;

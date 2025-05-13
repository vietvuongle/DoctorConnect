import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MonthlySalesChart = () => {
    const data = {
        labels: ["Tháng 1", "Tháng 2 ", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
        datasets: [
            {
                label: "Sales",
                data: [150, 370, 190, 290, 170, 180, 280, 90, 190, 370, 270, 90],
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
                ticks: { stepSize: 100, color: "#6b7280" },
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
                <button className="text-gray-400 hover:text-gray-600 self-end sm:self-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 2a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
                    </svg>
                </button>
            </div>

            {/* Chart container */}
            <div className="relative w-full aspect-[2/1]">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default MonthlySalesChart;

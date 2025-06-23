import React, { useRef, useState, useEffect, useContext } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const DoctorByClinicSection = ({ doctorData }) => {
    const { handleSmoothScroll } = useContext(AppContext);
    const navigate = useNavigate();

    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Function to check scroll position and update button states
    const checkScrollPosition = () => {
        const container = scrollContainerRef.current;
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
        }
    };

    // Handle scroll left
    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    // Handle scroll right
    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    // Update button states on scroll
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener("scroll", checkScrollPosition);
            checkScrollPosition(); // Initial check
            return () => container.removeEventListener("scroll", checkScrollPosition);
        }
    }, [doctorData]);

    return (
        <div className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Đội ngũ bác sĩ</h2>
                <div className="flex space-x-2">
                    <button onClick={scrollLeft} disabled={!canScrollLeft} className={`p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors ${!canScrollLeft ? "opacity-50 cursor-not-allowed" : ""}`} aria-label="Scroll left">
                        <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <button onClick={scrollRight} disabled={!canScrollRight} className={`p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors ${!canScrollRight ? "opacity-50 cursor-not-allowed" : ""}`} aria-label="Scroll right">
                        <ChevronRightIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div ref={scrollContainerRef} className="flex overflow-x-auto space-x-6 pb-4 snap-x snap-mandatory scrollbar-hidden">
                {doctorData.map((doctor) => (
                    <div key={doctor.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex-shrink-0 w-80 snap-start">
                        <img src={doctor.image} alt={doctor.name} className="w-full h-64 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-1">{doctor.name}</h3>
                            <p className="text-blue-600 font-medium mb-2">{doctor.speciality}</p>
                            <p className="text-gray-600 text-sm mb-4">{doctor.experience} kinh nghiệm</p>
                            <button
                                onClick={() => {
                                    navigate(`/doctor/${doctor.id}`);
                                    handleSmoothScroll();
                                }}
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Đặt lịch với bác sĩ
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <style>{`
                .scrollbar-hidden::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hidden {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default DoctorByClinicSection;

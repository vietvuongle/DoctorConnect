import React, { useContext } from "react";
import { HeroSection } from "../components/HeroSection";
import { ServicesSection } from "../components/ServicesSection";
import { BookingSteps } from "../components/BookingSteps";
import { DoctorsSection } from "../components/DoctorsSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { ContactSection } from "../components/ContactSection";
import HealthcareFacilities from "../components/HealthcareFacilities";

const Home = () => {
    return (
        <div>
            <HeroSection />
            <BookingSteps />
            <ServicesSection />
            <HealthcareFacilities />
            <DoctorsSection />
            <TestimonialsSection />
            <ContactSection />
        </div>
    );
};

export default Home;

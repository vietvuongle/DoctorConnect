import React, { useContext } from "react";
import { HeroSection } from "../components/HeroSection";
import { ServicesSection } from "../components/ServicesSection";
import { BookingSteps } from "../components/BookingSteps";
import { DoctorsSection } from "../components/DoctorsSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { ContactSection } from "../components/ContactSection";

const Home = () => {
    return (
        <div>
            <HeroSection />
            <ServicesSection />
            <BookingSteps />
            <DoctorsSection />
            <TestimonialsSection />
            <ContactSection />
        </div>
    );
};

export default Home;

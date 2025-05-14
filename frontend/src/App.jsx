import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
// import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Doctors } from "./pages/Doctors";
import { BookingPage } from "./pages/BookingPage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ServicePage } from "./pages/ServicePage";

function App() {
    const location = useLocation();
    const hideHeaderFooter = location.pathname === "/login";

    return (
        <div className="mx-4">
            <ToastContainer />
            {!hideHeaderFooter && <Header />}

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctors/:speciality" element={<Doctors />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<ServicePage />} />
                {/* <Route path="/contact" element={<Contact />} /> */}
                <Route path="/my-profile" element={<MyProfile />} />
                <Route path="/appointment" element={<BookingPage />} />
                <Route path="/my-appointments" element={<MyAppointments />} />
                <Route path="/appointment/:docId" element={<Appointment />} />
            </Routes>

            {!hideHeaderFooter && <Footer />}
        </div>
    );
}

export default App;

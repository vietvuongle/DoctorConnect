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
import OAuth2Success from "./pages/OAuth2Success ";
import Contact from "./pages/Contact";
import DoctorDetails from "./pages/DoctorDetails";
import DoctorReview from "./pages/DoctorReview";
import DepartmentDetails from "./pages/DepartmentDetails";
import Departments from "./pages/Departments";
import Test from "./pages/Test";

function App() {
    const location = useLocation();
    const hideHeaderFooter = location.pathname === "/login";

    return (
        <div className="mx-4">
            <ToastContainer />
            {!hideHeaderFooter && <Header />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctor/:id" element={<DoctorDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<ServicePage />} />
                <Route path="/oauth2-success" element={<OAuth2Success />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/my-profile" element={<MyProfile />} />
                <Route path="/review-doctor/:doctorId/:appointmentId" element={<DoctorReview />} />
                <Route path="/appointment" element={<BookingPage />} />
                <Route path="/my-appointments" element={<MyAppointments />} />
                <Route path="/appointment/:docId" element={<Appointment />} />
                <Route path="/department/:id" element={<DepartmentDetails />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/test" element={<Test />} />
            </Routes>

            {!hideHeaderFooter && <Footer />}
        </div>
    );
}

export default App;

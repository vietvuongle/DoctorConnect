import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import { AdminContext } from "./context/AdminContext";
import { DoctorContext } from "./context/DoctorContext";
import Login from "./pages/Login";
import Home from "./pages/admin/Home";
import HomeDoctor from "./pages/doctor/Home";
import AddDoctor from "./pages/admin/AddDoctor";
import { Departments } from "./pages/admin/Departments";
import Dashboard from "./pages/doctor/DashBoard";
import AdminDashboard from "./pages/Test";
import Schedule from "./pages/admin/Schedule";
import Patient from "./pages/admin/Patient";
import PatientOfDoctor from "./pages/doctor/Patient";
import Setting from "./pages/admin/Setting";
import DoctorDetail from "./pages/admin/DoctorDetail";
import CreateMedicalRecord from "./pages/doctor/CreateMedicalRecord";
import ViewMedicalRecord from "./pages/doctor/ViewMedicalRecord";
import ViewAdminMedicalRecord from "./pages/admin/ViewMedicalRecord";
import ChangePassword from "./pages/doctor/ChangePassword";

function App() {
    const { aToken } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext);

    return aToken || dToken ? (
        <div className="bg-[#F8F9FD]">
            <ToastContainer />
            <Navbar />
            <div className="flex items-start">
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin/doctor" element={<AddDoctor />} />
                    <Route path="/admin/doctor/:doctorId" element={<DoctorDetail />} />
                    <Route path="/admin/department" element={<Departments />} />
                    {/* <Route path="/admin/list-doctor" element={<ListDoctor />} /> */}
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/schedule" element={<Schedule />} />
                    <Route path="/admin/patient" element={<Patient />} />
                    <Route path="/admin/patient/:patientId" element={<ViewAdminMedicalRecord />} />
                    <Route path="/admin/setting" element={<Setting />} />

                    {/* Doctor */}

                    <Route path="/doctor/dashboard" element={<Dashboard />} />
                    <Route path="/doctor/home" element={<HomeDoctor />} />
                    <Route path="/doctor/change-password" element={<ChangePassword />} />
                    <Route path="/doctor/patient" element={<PatientOfDoctor />} />
                    <Route path="/doctor/patient/:patientId" element={<ViewMedicalRecord />} />
                    <Route path="/doctor/view-medical" element={<ViewMedicalRecord />} />
                    <Route path="/doctor/create-medical/:userId/:appointmentId" element={<CreateMedicalRecord />} />
                </Routes>
            </div>
        </div>
    ) : (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

export default App;

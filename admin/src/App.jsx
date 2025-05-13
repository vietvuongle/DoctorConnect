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
import AddDoctor from "./pages/admin/AddDoctor";
import { Departments } from "./pages/admin/Departments";
import ListDoctor from "./pages/admin/ListDoctor";
import Dashboard from "./pages/doctor/DashBoard";
import AdminDashboard from "./pages/Test";
import Schedule from "./pages/admin/Schedule";
import Patient from "./pages/admin/Patient";
import Setting from "./pages/admin/Setting";

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
                    <Route path="/admin/home" element={<Home />} />
                    <Route path="/admin/add-doctor" element={<AddDoctor />} />
                    <Route path="/admin/department" element={<Departments />} />
                    <Route path="/admin/list-doctor" element={<ListDoctor />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/schedule" element={<Schedule />} />
                    <Route path="/admin/patient" element={<Patient />} />
                    <Route path="/admin/setting" element={<Setting />} />

                    {/* Doctor */}

                    <Route path="/doctor/dashboard" element={<Dashboard />} />
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

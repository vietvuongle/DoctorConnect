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
import EditDepartment from "./pages/admin/EditDepartment";
import DoctorSchedule from "./pages/clinic/DoctorSchedule";
import { ClinicContext } from "./context/ClinicContext";
import ClinicAddDoctor from "./pages/clinic/ClinicAddDoctor";
import AddClinic from "./pages/admin/AddClinic";
import ClinicDetail from "./pages/admin/ClinicDetail";
import ClinicDoctorDetail from "./pages/clinic/ClinicDoctorDetail";
import ClinicDashBoard from "./pages/clinic/ClinicDashboard";
import ClinicAppointment from "./pages/clinic/ClinicAppointment";
import ClinicPatient from "./pages/clinic/ClinicPatient";
import ClinicViewMedicalRecord from "./pages/clinic/ClinicViewMedicalRecord";

function App() {
    const { aToken } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext);
    const { cToken } = useContext(ClinicContext);

    return aToken || dToken || cToken ? (
        <div className="bg-[#F8F9FD]">
            <ToastContainer />
            <Navbar />
            <div className="flex items-start">
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin/doctor" element={<AddDoctor />} />
                    <Route path="/admin/clinic" element={<AddClinic />} />
                    <Route path="/admin/clinic/:clinicId" element={<ClinicDetail />} />
                    <Route path="/admin/doctor/:doctorId" element={<DoctorDetail />} />
                    <Route path="/admin/department" element={<Departments />} />
                    <Route path="/admin/departments/edit/:id" element={<EditDepartment />} />
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

                    {/* Clinic */}
                    <Route path="/clinic/doctor" element={<ClinicAddDoctor />} />
                    <Route path="/clinic/dashboard" element={<ClinicDashBoard />} />
                    <Route path="/clinic/appointment" element={<ClinicAppointment />} />
                    <Route path="/clinic/patient" element={<ClinicPatient />} />
                    <Route path="/clinic/patient/:patientId" element={<ClinicViewMedicalRecord />} />
                    <Route path="/clinic/doctor/:doctorId" element={<ClinicDoctorDetail />} />
                    <Route path="/clinic/doctor-schedule/:doctorId" element={<DoctorSchedule />} />
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

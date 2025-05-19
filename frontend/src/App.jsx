import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
// import BookingPage from './pages/BookingPage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Doctors } from './pages/Doctors'
import { DoctorDetails } from './pages/DoctorDetails';
import { BookingPage } from './pages/BookingPage'

function App() {

  return (
    <div className='mx-4 '>
      <ToastContainer />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/about' element={<About />} />
        {/* <Route path="/services" element={<ServicePage />} /> */}
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/booking' element={<BookingPage />} />
        {/* <Route path="/appointment" element={<BookingPage />} /> */}
        <Route path="/appointments" element={<BookingPage />} />
        <Route path='/my-appointments' element={<Appointment />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
      </Routes>
    </div>
  )
}

export default App

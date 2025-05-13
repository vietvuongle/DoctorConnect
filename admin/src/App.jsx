import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import { AdminContext } from './context/AdminContext';
import { DoctorContext } from './context/DoctorContext';
import Login from './pages/Login';
import Home from './pages/admin/Home';
import AddDoctor from './pages/admin/AddDoctor';
import { Departments } from './pages/admin/Departments';



function App() {
  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)


  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/admin/trangchu' element={<Home/>} />
          <Route path='/admin/thembacsi' element={<AddDoctor/>} />
          <Route path='/admin/khoa' element={<Departments/>} />
          
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App

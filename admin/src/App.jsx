import React from 'react'
import Navbar from './components/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddDoctor from './pages/AddDoctor';


function App() {

  return (
    <div className='bg-[#F8F9FD]'>
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/trangchu' element={<Home/>} />
          <Route path='/thembacsi' element={<AddDoctor/>} />
        </Routes>
      </div>

      

    </div>
  )
}

export default App

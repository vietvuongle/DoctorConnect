import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';


const Sidebar = () => {
  return (
    <div className='min-h-screen bg-white border-r'>
      <ul className='text-[#515151]'>
        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/admin/trangchu'}>
          <img src={assets.home_icon} alt="" />
          <p className='hidden md:block'>Trang chủ</p>
        </NavLink>

        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/admin/lichkham'}>
          <img src={assets.appointment_icon} alt="" />
          <p className='hidden md:block'>Lịch khám</p>
        </NavLink>

        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/admin/danhsachbs'}>
          <img src={assets.people_icon} alt="" />
          <p className='hidden md:block'>Danh sách bác sĩ</p>
        </NavLink>

        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/admin/thembacsi'}>
          <img src={assets.add_icon} alt="" />
          <p className='hidden md:block'>Thêm bác sĩ</p>
        </NavLink>

        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/admin/khoa'}>
          <StickyNote2OutlinedIcon sx={{fontSize: 30, color: '#1c274c'}}/>
          <p className='hidden md:block'>Danh sách khoa</p>
        </NavLink>

        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/admin/chat'}>
          <ChatBubbleOutlineIcon sx={{fontSize: 30, color: '#1c274c'}}/>
          <p className='hidden md:block'>Chat</p>
        </NavLink>
      </ul>

    </div>
  )
}

export default Sidebar
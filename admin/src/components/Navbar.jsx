import React from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'> 
        <div className='flex items-center gap-2 text-xs'>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.logo4} alt="" />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>Admin</p>
        </div>
        <button className='bg-primary text-white text-sm px-10 py-2 my-3 rounded-full'>Đăng xuất</button>
    </div>
  )
}

export default Navbar
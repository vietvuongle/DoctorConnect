import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { AppContext } from '../context/AppContext.jsx'

const Navbar = () => {
  const { token, setToken } = useContext(AppContext)
  const [ShowMenu, setShowMenu] = useState(false)

  const navigate = useNavigate()

  const logout = () => {
    setToken(false)
    localStorage.removeItem("token")
  }

  return (
    <div className='flex items-center justify-between text-sm border-b py-4 mb-5 border-b-gray-400'>
      <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo4} alt="" />


      <form class="flex items-center">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
            </svg>
          </div>
          <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
        </div>
        <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-primary rounded-lg border border-blue-700 hover:scale-105 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg class="w-6 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <span class="sr-only">Search</span>
        </button>
      </form>


      <ul className='hidden text-lg md:flex items-start gap-3 font-medium'>
        <NavLink to={'/'}>
          <li className='py-1'>Trang chủ</li>
          <hr className='border-none outline-none bg-primary h-0.5 w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to={'/doctors'}>
          <li className='py-1'>Bác sĩ</li>
          <hr className='border-none outline-none bg-primary h-0.5 w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to={'/about'}>
          <li className='py-1'>About</li>
          <hr className='border-none outline-none bg-primary h-0.5 w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to={'/contact'}>
          <li className='py-1'>Liên hệ</li>
          <hr className='border-none outline-none bg-primary h-0.5 w-3/5 m-auto hidden' />
        </NavLink>
      </ul>
      <div>
        {
          token
            ? <div className='flex items-center gap-4 cursor-pointer group relative'>
              <img className='w-10 rounded-full' src={assets.upload_area} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>Hồ sơ</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>Lịch đặt của tôi</p>
                  <p onClick={logout} className='hover:text-black cursor-pointer'>Đăng xuất</p>
                </div>
              </div>
            </div>
            : <button onClick={() => navigate('/login')} className='bg-primary text-white px-12 py-2.5 hover:scale-105 transition-all rounded-full font-light hidden md:block'>Đăng Kí</button>
        }

        <img onClick={() => setShowMenu(true)} className='md:hidden w-6 cursor-pointer' src={assets.menu_icon} alt="" />

        <div className={`${ShowMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt="" />
            <img className='w-7 cursor-pointer' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to={'/'}><p className='px-4 py-2 rounded inline-block'>Trang chủ</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={'/doctors'}><p className='px-4 py-2 rounded inline-block'>Bác sĩ</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={'/about'}><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={'/contact'}><p className='px-4 py-2 rounded inline-block'>Liên hệ</p></NavLink>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Navbar
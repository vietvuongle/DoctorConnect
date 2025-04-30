import React from 'react'
import { assets } from '../assets/assets'
import MonthlySalesChart from '../components/MonthlySalesChart'



const Home = () => {
    return (
        <div className='m-5'>
            <div className='flex justify-end gap-3' >
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.doctor_icon} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>15</p>
                        <p className='text-gray-400'>Bác sĩ</p>
                    </div>
                </div>

                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.appointments_icon} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>32</p>
                        <p className='text-gray-400'>Lịch khám</p>
                    </div>
                </div>

                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.patients_icon} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>12</p>
                        <p className='text-gray-400'>Bệnh nhân</p>
                    </div>
                </div>

                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.earning_icon} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>32</p>
                        <p className='text-gray-400'>Tổng doanh thu</p>
                    </div>
                </div>

            </div>
            <MonthlySalesChart />

            

        </div>
    )
}

export default Home


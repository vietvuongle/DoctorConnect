import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const {setToken} = useContext(AppContext)


  const [state, setState] = useState('Đăng Kí')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const navigate = useNavigate()

  const { backendUrl } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (state === "Đăng Kí") {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if(data !== false) {
          toast.success("Đăng kí thành công")
          navigate('/login')
        } else {
          toast.error("Đăng kí thất bại")
        }
       
      } else {
        
        const { data } = await axios.post(backendUrl + '/api/user/login', {email, password })

        if(data !== false) {
          const token = data.result.token

          setToken(token)
          localStorage.setItem("token", token)

          toast.success("Đăng nhập thành công")
          navigate('/')
        } else {
          toast.error("Mật khẩu hoặc tài khoản không đúng")
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }



  return (
    <form onSubmit={onSubmitHandler} className='flex items-center'>
      <div className='flex flex-col gap-3 m-auto border sm:min-w-96 rounded-xl p-8 min-w-[340px] text-zinc-600 text-sm shadow-lg'>
        <p className='text-3xl font-semibold text-center'>{state === "Đăng Kí" ? "Đăng Kí" : "Đăng Nhập"}</p>
        {
          state === "Đăng Kí" && (
            <div className='w-full'>
              <p>Họ và tên</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" required />
            </div>
          )
        }
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full'>
          <p>Mật Khẩu</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button type='submit' className='py-2 rounded-md bg-primary hover:scale-105 transition-all text-white text-base'>{state === "Đăng Kí" ? "Đăng Kí" : "Đăng Nhập"}</button>
        {
          state === "Đăng Kí"
            ? <p>Bạn đã có tài khoản? <span className='underline cursor-pointer text-primary' onClick={() => setState('Đăng Nhập')}>Đăng Nhập Ngay</span></p>
            : <p>Bạn chưa có tài khoản? <span className='underline cursor-pointer text-primary' onClick={() => setState('Đăng Kí')}>Đăng Kí Ngay</span></p>
        }
      </div>
    </form>
  )
}

export default Login
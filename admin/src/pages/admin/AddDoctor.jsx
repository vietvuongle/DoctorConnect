import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [sex, setSex] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (!docImg) {
        toast.error("Vui lòng chọn ảnh")
      }

      const cleanedFees = fees.replace(/\./g, '');

      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', cleanedFees)
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', address)
      formData.append('phone', phone)
      formData.append('sex', sex)

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })

      if (data !== false) {
        toast.success("Thêm bác sĩ thành công")
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setExperience('1 Năm')
        setFees('')
        setAbout('')
        setPhone('')
        setSex('Nam')
        setSpeciality('Da liễu')
        setDegree('')
        setAddress('')
      } else {
        toast.error("Thêm bác sĩ thất bại!")
      }

    } catch (error) {

    }
  }

  const handleFeesChange = (e) => {
    const rawValue = e.target.value.replace(/\./g, ''); // Xoá dấu chấm
    if (!/^\d*$/.test(rawValue)) return; // Ngăn nhập ký tự không phải số

    const formatted = Number(rawValue).toLocaleString('vi-VN');
    setFees(formatted);
  };

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Thêm Bác Sĩ</p>

      <div className='bg-white px-8 border py-8 rounded w-full max-w-4xl  overflow-y-scroll'>

        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-100  rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id='doc-img' hidden />
          <p>Upload <br /> Ảnh </p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Tên Bác Sĩ</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Tên' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Mật Khẩu</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='Mật Khẩu' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Kinh Nghiệm</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2' name="" id="">
                <option value="1 Năm">1 Năm</option>
                <option value="2 Năm">2 Năm</option>
                <option value="3 Năm">3 Năm</option>
                <option value="4 Năm">4 Năm</option>
                <option value="5 Năm">5 Năm</option>
                <option value="6 Năm">6 Năm</option>
                <option value="7 Năm">7 Năm</option>
                <option value="8 Năm">8 Năm</option>
                <option value="9 Năm">9 Năm</option>
                <option value="10 Năm">10 Năm</option>

              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Phí</p>
              <input
                onChange={handleFeesChange}
                value={fees}
                className='border rounded px-3 py-2'
                type="text"
                placeholder='Phí Khám Bệnh'
                required
              />
            </div>

          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Chuyên ngành</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2' name="" id="">
                <option value="Răng hàm mặt">Răng hàm mặt</option>
                <option value="Tai mũi họng">Tai mũi họng</option>
                <option value="Thần kinh">Thần kinh</option>
                <option value="Thai sản">Thai sản</option>
                <option value="Da liễu">Da liễu</option>
                <option value="Tim mạch">Tim mạch</option>
                <option value="Cơ xương khơp">Cơ xương khớp</option>
                <option value="Tiêu hóa">Tiêu hóa</option>

              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Học vấn</p>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='Học vấn' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Địa Chỉ</p>
              <input onChange={(e) => setAddress(e.target.value)} value={address} className='border rounded px-3 py-2' type="text" placeholder='Địa Chỉ' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Giới tính</p>
              <select onChange={(e) => setSex(e.target.value)} value={sex} className='border rounded px-3 py-2' name="" id="">
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Số điện thoại</p>
              <input onChange={(e) => setPhone(e.target.value)} value={phone} className='border rounded px-3 py-2' type="text" placeholder='Số điện thoại' required />
            </div>

          </div>

        </div>

        <div>
          <p className='pt-4 pb-2'>Mô Tả Khác</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' placeholder='Viết những mô tả khác của bác sĩ' rows={5} required />
        </div>

        <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Thêm Bác Sĩ</button>

      </div>
    </form>
  )
}

export default AddDoctor
import React from 'react'
import { useNavigate } from 'react-router-dom'
export function DoctorsSection() {

    const navigate = useNavigate()

  const doctors = [
    {
      name: 'BS. Nguyễn Văn A',
      specialty: 'Tim mạch',
      image:
        'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg',
      experience: '15 năm kinh nghiệm',
    },
    {
      name: 'BS. Trần Thị B',
      specialty: 'Nhi khoa',
      image:
        'https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827776.jpg',
      experience: '10 năm kinh nghiệm',
    },
    {
      name: 'BS. Lê Văn C',
      specialty: 'Thần kinh',
      image:
        'https://img.freepik.com/free-photo/portrait-smiling-handsome-male-doctor-man_171337-5055.jpg',
      experience: '12 năm kinh nghiệm',
    },
    {
      name: 'BS. Phạm Thị D',
      specialty: 'Nội khoa',
      image:
        'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg',
      experience: '8 năm kinh nghiệm',
    },
  ]
  return (
    <section id="doctors" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Đội ngũ bác sĩ
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Phòng khám của chúng tôi có đội ngũ bác sĩ giàu kinh nghiệm, tận tâm
            và chuyên môn cao trong nhiều lĩnh vực.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {doctor.name}
                </h3>
                <p className="text-blue-600 font-medium mb-2">
                  {doctor.specialty}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {doctor.experience}
                </p>
                <button onClick={() => navigate('/doctors')} className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Đặt lịch với bác sĩ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

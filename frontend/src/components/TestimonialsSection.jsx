import React from 'react'
import { Star as StarIcon } from 'lucide-react'
export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Nguyễn Văn X',
      text: 'Tôi rất hài lòng với dịch vụ tại phòng khám. Bác sĩ tư vấn rất tận tình và chi tiết. Quy trình đặt lịch trực tuyến rất thuận tiện, giúp tôi tiết kiệm thời gian chờ đợi.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Trần Thị Y',
      text: 'Phòng khám sạch sẽ, nhân viên thân thiện và chuyên nghiệp. Bác sĩ giải thích rõ ràng về tình trạng sức khỏe và phương pháp điều trị. Tôi sẽ tiếp tục sử dụng dịch vụ tại đây.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'Lê Văn Z',
      text: 'Đặt lịch khám rất dễ dàng qua website. Không phải chờ đợi lâu khi đến khám. Bác sĩ khám rất kỹ và tư vấn chi tiết. Rất hài lòng với dịch vụ.',
      rating: 4,
      image: 'https://randomuser.me/api/portraits/men/67.jpg',
    },
  ]
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sự hài lòng của bệnh nhân là ưu tiên hàng đầu của chúng tôi. Hãy xem
            nhận xét từ những bệnh nhân đã sử dụng dịch vụ tại phòng khám.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {testimonial.name}
                  </h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon, StarIcon, ThumbsUpIcon, ThumbsDownIcon, FilterIcon, SearchIcon, UserIcon, CalendarIcon } from "lucide-react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const DoctorReview = () => {
    const { doctorData, backendUrl, token, allUserData, appointmentData } = useContext(AppContext);

    const [allReview, setAllReview] = useState([]);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [filterRating, setFilterRating] = useState("all");

    const { doctorId, appointmentId } = useParams();

    const userId = localStorage.getItem("userId");

    const doctorReview = doctorData.find((doc) => doc.id === doctorId);

    //isReview
    const isReview = appointmentData.find((app) => app._id === appointmentId)?.review;

    //lọc
    const filteredReviews = filterRating === "all" ? allReview : allReview.filter((review) => review.rating === parseInt(filterRating));

    const ratingDistribution = allReview.reduce((acc, review) => {
        const rating = review.rating; // số sao
        acc[rating] = (acc[rating] || 0) + 1;
        return acc;
    }, {});

    // Mock data for reviews
    // const reviews = [
    //     {
    //         id: 1,
    //         userName: "Nguyễn Văn A",
    //         rating: 5,
    //         date: "2024-03-15",
    //         comment: "Bác sĩ rất tận tâm và chuyên nghiệp. Tôi rất hài lòng với cách điều trị và tư vấn của bác sĩ.",
    //         helpful: 12,
    //         notHelpful: 1,
    //     },
    //     {
    //         id: 2,
    //         userName: "Trần Thị B",
    //         rating: 4,
    //         date: "2024-03-14",
    //         comment: "Bác sĩ giải thích rất rõ ràng về tình trạng bệnh và phương pháp điều trị.",
    //         helpful: 8,
    //         notHelpful: 0,
    //     },
    //     {
    //         id: 3,
    //         userName: "Phạm Văn C",
    //         rating: 3,
    //         date: "2024-03-13",
    //         comment: "Thời gian chờ đợi hơi lâu nhưng chất lượng khám chữa bệnh tốt.",
    //         helpful: 5,
    //         notHelpful: 2,
    //     },
    // ];

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(backendUrl + "/api/user/review", { rating, comment, doctorId, userId, appointmentId }, { headers: { Authorization: `Bearer ${token}` } });
            if (data !== null) {
                getAllDoctorReviewBydoctorId(doctorId);
            }
        } catch (error) {}

        console.log({
            rating,
            comment,
            doctorId,
            userId,
        });
        // Reset form
        setRating(0);
        setComment("");
    };

    const calculateRatingPercentage = (count) => {
        return (count / totalReviews) * 100;
    };

    const getAllDoctorReviewBydoctorId = async (doctorId) => {
        try {
            const url = backendUrl + `/api/user/review/${doctorId}`;
            let headers = {
                Authorization: "Bearer " + token,
            };

            const { data } = await axios.get(url, {
                headers: headers,
            });

            if (data !== null) {
                setAllReview(data);
            }
        } catch (error) {
            console.error("Lỗi khi fetch review:", error);
        }
    };
    //tổng số đánh giá
    const totalReviews = allReview.length;

    const averageRating = allReview.length > 0 ? allReview.reduce((sum, review) => sum + review.rating, 0) / allReview.length : 0;

    useEffect(() => {
        getAllDoctorReviewBydoctorId(doctorId);
    }, []);

    return (
        doctorReview && (
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center">
                            <Link to="/my-appointments" className="flex items-center text-blue-600 hover:text-blue-800">
                                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                                Quay lại
                            </Link>
                        </div>
                    </div>
                    {/* Doctor Info and Overall Rating */}
                    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                        <div className="p-6">
                            <div className="flex items-center">
                                <img src={doctorReview.image} className="w-24 h-24 rounded-full object-cover" />
                                <div className="ml-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Bs. {doctorReview.name}</h2>
                                    <p className="text-gray-600">{doctorReview.speciality}</p>
                                    <div className="flex items-center mt-2">
                                        <div className="flex items-center">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <StarIcon key={star} className={`w-5 h-5 ${star <= averageRating ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" />
                                            ))}
                                        </div>
                                        <span className="ml-2 text-gray-600">
                                            {averageRating} / 5 ({totalReviews} đánh giá)
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Rating Distribution */}
                            <div className="mt-8">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Phân bố đánh giá</h3>
                                <div className="space-y-2">
                                    {[5, 4, 3, 2, 1].map((stars) => (
                                        <div key={stars} className="flex items-center">
                                            <div className="flex items-center w-24">
                                                {[...Array(stars)].map((_, index) => (
                                                    <StarIcon key={index} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                                                ))}
                                            </div>
                                            <div className="flex-1 h-4 mx-4 bg-gray-200 rounded">
                                                <div
                                                    className="h-4 bg-blue-600 rounded"
                                                    style={{
                                                        width: `${calculateRatingPercentage(ratingDistribution[stars]) ? calculateRatingPercentage(ratingDistribution[stars]) : 0}%`,
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="w-20 text-sm text-gray-600">{ratingDistribution[stars] ? ratingDistribution[stars] : 0} đánh giá</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Write Review Section */}
                    {isReview && (
                        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Viết đánh giá của bạn</h3>
                                <form onSubmit={handleSubmitReview}>
                                    <div className="mb-4">
                                        <div className="flex items-center">
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button key={star} type="button" className="p-1" onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}>
                                                        <StarIcon className={`w-8 h-8 ${star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" />
                                                    </button>
                                                ))}
                                            </div>
                                            <span className="ml-4 text-gray-600">{rating > 0 ? `${rating} sao` : "Chọn đánh giá"}</span>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <textarea rows={4} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Chia sẻ trải nghiệm của bạn..." value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                    </div>
                                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700" disabled={!rating || !comment}>
                                        Gửi đánh giá
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                    {/* Reviews List */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex flex-col sm:flex-row justify-between items-center">
                                <h3 className="text-lg font-medium text-gray-900">Tất cả đánh giá</h3>
                                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                                    <div className="relative">
                                        <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <select className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white" value={filterRating} onChange={(e) => setFilterRating(e.target.value)}>
                                            <option value="all">Tất cả sao</option>
                                            <option value="5">5 sao</option>
                                            <option value="4">4 sao</option>
                                            <option value="3">3 sao</option>
                                            <option value="2">2 sao</option>
                                            <option value="1">1 sao</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {filteredReviews.map((review) => {
                                const user = allUserData.find((u) => u._id === review.userId);
                                return (
                                    <div key={review._id || review.id} className="p-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <UserIcon className="w-6 h-6 text-blue-600" />
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-sm font-medium text-gray-900">{user?.name || "Người dùng"}</h4>
                                                    <div className="flex items-center">
                                                        <CalendarIcon className="w-4 h-4 text-gray-6S00 mr-1" />
                                                        <span className="text-sm text-gray-500">{review.createAt}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center mt-1">
                                                    {[...Array(5)].map((_, index) => (
                                                        <StarIcon key={index} className={`w-4 h-4 ${index < review.rating ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" />
                                                    ))}
                                                </div>
                                                <p className="mt-2 text-gray-600">{review.comment}</p>
                                                {/* <div className="mt-4 flex items-center space-x-4">
                                                <button className="flex items-center text-gray-500 hover:text-blue-600">
                                                    <ThumbsUpIcon className="w-4 h-4 mr-1" />
                                                    <span className="text-sm">Hữu ích ({review.helpful})</span>
                                                </button>
                                                <button className="flex items-center text-gray-500 hover:text-red-600">
                                                    <ThumbsDownIcon className="w-4 h-4 mr-1" />
                                                    <span className="text-sm">Không hữu ích ({review.notHelpful})</span>
                                                </button>
                                            </div> */}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {/* Pagination
                        <div className="px-6 py-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">3</span> trong số <span className="font-medium">{totalReviews}</span> đánh giá
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">Trước</button>
                                    <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Sau</button>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    );
};
export default DoctorReview;

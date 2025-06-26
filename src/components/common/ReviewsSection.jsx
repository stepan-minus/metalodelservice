import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import ReviewForm from './ReviewForm';
import 'swiper/css';

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reviews');
      if (!response.ok) throw new Error('Не удалось загрузить отзывы');
      const data = await response.json();
      setReviews(data.reverse());
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const StarRating = ({ rating }) => (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${
            index < rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  if (isLoading) {
    return <div className="text-center py-12">Загрузка отзывов...</div>;
  }

  // Создаем массив с тройным повторением отзывов для более плавного перехода
  const triplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Отзывы наших клиентов
            </h2>
            <p className="text-gray-600">
              Узнайте, что говорят о нас наши клиенты
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowReviewForm(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Оставить отзыв
            </button>
            <Link
              to="/reviews"
              className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Все отзывы
            </Link>
          </div>
        </div>

        {reviews.length > 0 ? (
          <div className="relative overflow-hidden reviews-container">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              loop={true}
              speed={8000}
              allowTouchMove={false}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1280: {
                  slidesPerView: 4,
                }
              }}
              className="review-swiper"
            >
              {triplicatedReviews.map((review, index) => (
                <SwiperSlide key={`${review.id}-${index}`}>
                  <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {review.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed flex-grow">
                      {review.text}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        {review.projectType}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-600">
            Пока нет отзывов. Будьте первым!
          </div>
        )}

        {showReviewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="relative w-full max-w-2xl">
              <button
                onClick={() => setShowReviewForm(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-200"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <ReviewForm
                onClose={() => {
                  setShowReviewForm(false);
                  fetchReviews();
                }}
              />
            </div>
          </div>
        )}
      </div>

      <style>{`
        .reviews-container {
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
        .review-swiper {
          padding: 20px 5px;
          overflow: visible;
        }
        .review-swiper .swiper-slide {
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
};

export default ReviewsSection; 
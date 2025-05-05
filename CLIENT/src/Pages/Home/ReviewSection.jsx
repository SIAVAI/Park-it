import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import { Autoplay, EffectCube, Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa"; // FontAwesome Star Icons

const ReviewSection = () => {
  const reviews = [
    {
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 5,
      text: "Park IT has made parking in the city so much easier. I love how I can reserve a spot beforehand.",
    },
    {
      name: "Jane Smith",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: 4,
      text: "The app is simple to use, and I always find parking near me. Would recommend it to anyone!",
    },
    {
      name: "Samuel Lee",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 5,
      text: "Amazing service! I can find parking without any hassle. Easy to navigate and make payments.",
    },
    {
      name: "Emily Clark",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 4,
      text: "Great app, saved me a lot of time. Only wish the price range was more visible on the map.",
    },
    {
      name: "Michael Johnson",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      rating: 5,
      text: "I always know I’ll find a spot when I need it. Fast and reliable service, love it!",
    },
  ];

  return (
    <section className="px-6 py-12 bg-gray-50">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          What Our Users Say
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Hear from our happy customers about how Park IT has made their parking
          experience smooth and hassle-free.
        </p>

        {/* Swiper */}
        <Swiper
          effect={"cube"}
          grabCursor={true}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          pagination={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[EffectCube, Pagination, Autoplay]}
          className="mySwiper cursor-grab"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {review.name}
                    </h3>
                    <div className="flex items-center">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <FaStar key={idx} className="text-yellow-500" />
                      ))}
                      {Array.from({ length: 5 - review.rating }).map(
                        (_, idx) => (
                          <FaStar
                            key={idx + review.rating}
                            className="text-gray-300"
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{review.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ReviewSection;

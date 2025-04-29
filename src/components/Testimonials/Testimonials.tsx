"use client";

import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "أحمد خالد",
    role: "مطور ويب",
    feedback: "محمد يمتلك مهارة عالية واهتمام مذهل بالتفاصيل. أنصح بالتعامل معه بكل ثقة!",
  },
  {
    name: "سارة علي",
    role: "رائدة أعمال",
    feedback: "مشروعنا تحول 180 درجة بعد التعاون مع محمد. احترافية وسرعة وإنجاز مذهل.",
  },
  {
    name: "يوسف إبراهيم",
    role: "مصمم جرافيك",
    feedback: "واحد من أرقى الناس اللي تعاملت معاهم. أخلاق ومهارة والتزام بالمواعيد.",
  },
];

const TestimonialsComponent = React.memo(() => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">
          آراء العملاء
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div
                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center h-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                role="article"
                aria-label={`رأي العميل: ${testimonial.name}`}
              >
                <FaQuoteLeft className="text-primary text-4xl mb-4" />
                <p className="text-gray-800 dark:text-gray-100 mb-6">
                  {testimonial.feedback}
                </p>
                <div className="text-primary font-semibold">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.role}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
});

const Testimonials = React.memo(TestimonialsComponent);

export default Testimonials;

import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

import ReviewSliderCard from "./ReviewSliderCard";
import ScrollReveal from "../../../coponents/Motion/ScrollReveal";
import { motion } from "framer-motion";

const CustomerReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/reviews")
      .then((res) => {
        setReviews(res.data);
      });
  }, [axiosSecure]);

  const allReviews = [...reviews, ...reviews];

  return (
    <section className="relative overflow-hidden max-w-7xl mx-auto py-20 px-4">
      {/* Background Motion Effects */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/20 rounded-full blur-3xl pointer-events-none"
      />

      {/* Header */}
      <ScrollReveal className="text-center mb-14 relative z-10">
        <span className="badge badge-primary badge-lg mb-4 shadow-md">
          Testimonials
        </span>

        <h2 className="text-3xl md:text-5xl font-bold text-base-content">
          Loved by Thousands of Customers
        </h2>

        <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
          Real experiences from shoppers who trust our products and services.
        </p>
      </ScrollReveal>

      {/* Slider */}
      <ScrollReveal delay={0.2}>
        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          effect="coverflow"
          centeredSlides={true}
          grabCursor={true}
          loop={true}
          speed={4000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 120,
            modifier: 2,
            scale: 0.9,
          }}
          breakpoints={{
            320: { slidesPerView: 1.1 },
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
          }}
          onSwiper={(swiper) => {
            const container = swiper.el;
            container.addEventListener("mouseenter", () => {
              swiper.autoplay.stop();
            });
            container.addEventListener("mouseleave", () => {
              swiper.autoplay.start();
            });
          }}
        >
          {allReviews.map((review, index) => (
            <SwiperSlide key={`${review._id}-${index}`}>
              <ReviewSliderCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </ScrollReveal>
    </section>
  );
};

export default CustomerReviews;
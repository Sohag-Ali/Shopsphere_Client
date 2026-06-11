import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { NavLink } from "react-router";

import bannerImg1 from "../../../assets/ban1.jpeg";
import bannerImg2 from "../../../assets/ban2.jpeg";
import bannerImg3 from "../../../assets/ban3.jpeg";

const HeroBanner = () => {
  const slides = [
    {
      img: bannerImg1,
      title: "Shop Smarter, Live Better",
      desc: "Discover premium products at unbeatable prices and enjoy a seamless shopping experience.",
    },
    {
      img: bannerImg2,
      title: "Exclusive Deals & Discounts",
      desc: "Save more with daily offers, flash sales, and exclusive member discounts.",
    },
    {
      img: bannerImg3,
      title: "Quality Products, Trusted Brands",
      desc: "Browse thousands of products from reliable brands and verified sellers.",
    },
  ];

  return (
    <section className="w-full">
      <Carousel
        autoPlay
        infiniteLoop
        interval={4000}
        showThumbs={false}
        showStatus={false}
        stopOnHover
        showArrows={true}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            {/* Banner Image */}
            <img
              src={slide.img}
              alt={slide.title}
              className="h-[60vh] md:h-[65vh] lg:h-[70vh] w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/55 flex items-center">
              <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
                <div className="max-w-3xl text-left">

                  {/* Heading */}
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="mt-5 text-base md:text-lg text-gray-200 max-w-2xl">
                    {slide.desc}
                  </p>

                  {/* CTA Buttons */}
                  <div className="mt-8 flex flex-wrap gap-4">
                    <NavLink
                      to="/shop"
                      className="
                        px-8 py-3
                        rounded-xl
                        bg-primary
                        text-base-content
                        font-semibold
                        hover:scale-105
                        hover:shadow-xl
                        transition-all
                        duration-300
                      "
                    >
                      Shop Now
                    </NavLink>

                    <NavLink
                      to="/categories"
                      className="
                        px-8 py-3
                        rounded-xl
                        border-2
                        border-primary
                        text-primary
                        font-semibold
                        hover:bg-primary/10
                        hover:text-base-content
                        transition-all
                        duration-300
                      "
                    >
                      Browse Categories
                    </NavLink>
                  </div>

                  {/* Stats */}
                  <div className="mt-10 flex flex-wrap gap-8 text-white">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold">
                        10K+
                      </h3>
                      <p className="text-sm md:text-base text-gray-300">
                        Products
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold">
                        5K+
                      </h3>
                      <p className="text-sm md:text-base text-gray-300">
                        Customers
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold">
                        500+
                      </h3>
                      <p className="text-sm md:text-base text-gray-300">
                        Brands
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default HeroBanner;
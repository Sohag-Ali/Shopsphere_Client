import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { NavLink } from "react-router";
import { motion } from "framer-motion";

const HeroBanner = () => {
  const slides = [
    {
      img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&auto=format&fit=crop",
      title: "Shop Smarter, Live Better",
      desc: "Discover premium products at unbeatable prices and enjoy a seamless shopping experience.",
    },
    {
      img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop",
      title: "Exclusive Deals & Discounts",
      desc: "Save more with daily offers, flash sales, and exclusive member discounts.",
    },
    {
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop",
      title: "Quality Products, Trusted Brands",
      desc: "Browse thousands of products from reliable brands and verified sellers.",
    },
    {
      img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&auto=format&fit=crop",
      title: "Latest Tech Collection",
      desc: "Explore cutting-edge gadgets, smart devices, and accessories for modern living.",
    },
    {
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop",
      title: "Fashion For Every Style",
      desc: "Upgrade your wardrobe with trending fashion and timeless essentials.",
    },
    {
      img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&auto=format&fit=crop",
      title: "Fast Delivery, Easy Returns",
      desc: "Enjoy hassle-free shopping with quick shipping and customer-friendly returns.",
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
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight drop-shadow-md"
                  >
                    {slide.title}
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-5 text-base md:text-lg text-gray-200 max-w-2xl"
                  >
                    {slide.desc}
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-8 flex flex-wrap gap-4"
                  >
                    <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                      <NavLink
                        to="/shop"
                        className="px-8 py-3 rounded-xl bg-primary text-base-content font-semibold shadow-lg hover:shadow-primary/30 transition-all duration-300 inline-block"
                      >
                        Shop Now
                      </NavLink>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                      <NavLink
                        to="/categories"
                        className="px-8 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/20 hover:text-white transition-all duration-300 inline-block"
                      >
                        Browse Categories
                      </NavLink>
                    </motion.div>
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-10 flex flex-wrap gap-8 text-white"
                  >
                    <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                      <h3 className="text-2xl md:text-3xl font-bold text-primary">10K+</h3>
                      <p className="text-xs md:text-sm text-gray-300">Products</p>
                    </div>

                    <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                      <h3 className="text-2xl md:text-3xl font-bold text-primary">5K+</h3>
                      <p className="text-xs md:text-sm text-gray-300">Customers</p>
                    </div>

                    <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                      <h3 className="text-2xl md:text-3xl font-bold text-primary">500+</h3>
                      <p className="text-xs md:text-sm text-gray-300">Brands</p>
                    </div>
                  </motion.div>
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
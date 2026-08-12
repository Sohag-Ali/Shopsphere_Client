import {
  Truck,
  ShieldCheck,
  BadgeCheck,
  Headphones
} from "lucide-react";
import ScrollReveal from "../../../coponents/Motion/ScrollReveal";
import { StaggerContainer, StaggerItem } from "../../../coponents/Motion/StaggerContainer";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Truck size={40} />,
      title: "Fast Delivery",
      description:
        "Get your products delivered quickly across Bangladesh.",
    },
    {
      icon: <ShieldCheck size={40} />,
      title: "Secure Payment",
      description:
        "Safe and encrypted payment methods for hassle-free shopping.",
    },
    {
      icon: <BadgeCheck size={40} />,
      title: "Trusted Products",
      description:
        "Carefully selected quality products from verified brands.",
    },
    {
      icon: <Headphones size={40} />,
      title: "24/7 Support",
      description:
        "Our dedicated support team is always ready to help anytime.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <ScrollReveal className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-base-content">
          Why Choose Us
        </h2>
        <p className="mt-3 text-base-content/70">
          We make shopping simple, secure, and delightful.
        </p>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, index) => (
          <StaggerItem key={index}>
            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="card bg-base-100 shadow-lg border border-base-300 rounded-2xl text-center p-8 hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col items-center justify-center group"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="flex justify-center text-primary mb-4 p-4 rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-content transition-colors duration-300"
              >
                {item.icon}
              </motion.div>

              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              <p className="mt-3 text-base-content/70 text-sm">
                {item.description}
              </p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
};

export default WhyChooseUs;
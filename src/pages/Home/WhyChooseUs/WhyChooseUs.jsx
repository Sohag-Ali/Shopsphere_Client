import {
  Truck,
  ShieldCheck,
  BadgeCheck,
  Headphones
} from "lucide-react";

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
        "Safe and secure payment methods for hassle-free shopping.",
    },
    {
      icon: <BadgeCheck size={40} />,
      title: "Trusted Products",
      description:
        "Carefully selected quality products from trusted brands.",
    },
    {
      icon: <Headphones size={40} />,
      title: "24/7 Support",
      description:
        "Our support team is always ready to help anytime.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-20 px-4">

      <div className="text-center mb-12">

        <h2 className="text-4xl font-bold">
          Why Choose Us
        </h2>

        <p className="mt-3 text-gray-500">
          We make shopping simple, secure and reliable.
        </p>

      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
        "
      >
        {features.map((item, index) => (
          <div
            key={index}
            className="
              card
              bg-base-100
              shadow-lg
              rounded-xl
              text-center
              p-8
              hover:-translate-y-2
              transition
            "
          >
            <div className="flex justify-center text-primary mb-4">
              {item.icon}
            </div>

            <h3 className="text-xl font-bold">
              {item.title}
            </h3>

            <p className="mt-3 text-base-content/70">
              {item.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default WhyChooseUs;
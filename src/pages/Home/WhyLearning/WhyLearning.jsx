import { FiTarget, FiTrendingUp, FiUsers } from "react-icons/fi";


const WhyLearning = () => {
     const benefits = [
    {
      id: 1,
      title: "Personal Growth",
      desc: "Expand your mindset and gain valuable insights from real-life experiences.",
      icon: FiTarget,
    },
    {
      id: 2,
      title: "Achieve Your Goals",
      desc: "Learn practical strategies to overcome challenges and succeed.",
      icon: FiTarget,
    },
    {
      id: 3,
      title: "Build Strong Connections",
      desc: "Engage with a supportive community and share meaningful experiences.",
      icon: FiUsers,
    },
    {
      id: 4,
      title: "Stay Motivated",
      desc: "Get inspired by real stories and keep pushing forward.",
      icon: FiTrendingUp,
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Why Learning From Life Matters
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Real experiences teach lessons no textbook can. Discover how learning from life can transform your journey.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-xl transition duration-300"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary transition">
                  <Icon className="text-primary group-hover:text-white text-2xl" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};
export default WhyLearning;
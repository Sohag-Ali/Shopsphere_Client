const StatisticCard = ({ value, title, icon }) => {
  return (
    <div
      className="
      card
      bg-base-100
      shadow-lg
      rounded-xl
      p-8
      text-center
      hover:-translate-y-1
      transition-all
      duration-300
      h-full
    "
    >
      <div className="flex justify-center mb-4 text-primary">
        {icon}
      </div>

      <h3 className="text-4xl font-bold text-primary">
        {value}
      </h3>

      <p className="mt-2 text-base-content">
        {title}
      </p>
    </div>
  );
};

export default StatisticCard;
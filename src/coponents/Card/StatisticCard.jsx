import { motion } from "framer-motion";

const StatisticCard = ({ value = 0, title, icon }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="card bg-base-100 border border-base-300 shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col items-center justify-center group"
    >
      <motion.div
        whileHover={{ scale: 1.15, rotate: 5 }}
        className="flex justify-center mb-3 text-primary p-3 rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-content transition-colors duration-300"
      >
        {icon}
      </motion.div>

      <h3 className="text-3xl md:text-4xl font-extrabold text-primary">
        {value || 0}+
      </h3>

      <p className="mt-2 text-sm font-semibold text-base-content/80">
        {title}
      </p>
    </motion.div>
  );
};

export default StatisticCard;
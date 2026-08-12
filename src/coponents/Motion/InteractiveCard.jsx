import { motion } from "framer-motion";

const InteractiveCard = ({ children, className = "", onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default InteractiveCard;

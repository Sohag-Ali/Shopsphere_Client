import { motion } from "framer-motion";

const ScrollReveal = ({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 30,
  xOffset = 0,
  scale = 1,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

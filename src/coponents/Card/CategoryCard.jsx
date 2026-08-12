import { Link } from "react-router";
import { motion } from "framer-motion";

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link
        to={`/shop?category=${category.name}`}
        className="card bg-base-100 shadow-lg rounded-2xl overflow-hidden border border-base-300 hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full group"
      >
        <figure className="h-48 overflow-hidden relative">
          <motion.img
            src={category.image}
            alt={category.name}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </figure>

        <div className="card-body text-center p-5">
          <h2 className="font-bold text-xl group-hover:text-primary transition-colors">
            {category.name}
          </h2>
          <p className="text-sm text-base-content/70">
            {category.productCount} Products
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
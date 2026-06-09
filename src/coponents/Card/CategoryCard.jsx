import { Link } from "react-router";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/shop?category=${category.name}`}
      className="
      card
      bg-base-100
      shadow-lg
      rounded-xl
      overflow-hidden
      hover:scale-105
      transition
    "
    >
      <figure className="h-48">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body text-center">

        <h2 className="font-bold text-xl">
          {category.name}
        </h2>

        <p className="text-gray-500">
          {category.productCount} Products
        </p>

      </div>
    </Link>
  );
};

export default CategoryCard;
import { Link } from "react-router";


const WishlistCard = ({ item }) => {
  return (
    <div className="card bg-base-100 shadow-lg">

      <figure className="h-52">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">

        <h2 className="font-bold">
          {item.title}
        </h2>

        <p>⭐ {item.rating}</p>

        <p>৳ {item.price}</p>

        <Link
          to={`/product/${item.productId}`}
          className="btn btn-primary"
        >
          View Details
        </Link>

      </div>

    </div>
  );
};

export default WishlistCard;
const ProductInfo = ({ product }) => {

  return (
    <div>

      <h1 className="text-4xl font-bold">
        {product.title}
      </h1>

      <p className="mt-3">
        ⭐ {product.rating}
      </p>

      <p className="mt-2">
        Brand: {product.brand}
      </p>

      <p>
        Category: {product.category}
      </p>

      <p>
        📍 {product.location}
      </p>

      <div className="mt-5">

        {product.discountPrice ? (
          <>
            <span className="line-through">
              ৳{product.price}
            </span>

            <span className="text-red-500 text-2xl ml-3">
              ৳{product.discountPrice}
            </span>
          </>
        ) : (
          <span className="text-2xl">
            ৳{product.price}
          </span>
        )}

      </div>

      <p className="mt-5">
        {product.shortDescription}
      </p>

      <button className="btn btn-primary mt-6">
        Buy Now
      </button>

    </div>
  );
};

export default ProductInfo;
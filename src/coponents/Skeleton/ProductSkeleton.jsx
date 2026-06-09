const ProductSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow">

      <div className="skeleton h-52 w-full"></div>

      <div className="card-body">

        <div className="skeleton h-5 w-40"></div>

        <div className="skeleton h-4 w-full"></div>

        <div className="skeleton h-4 w-2/3"></div>

        <div className="skeleton h-10 w-full"></div>

      </div>

    </div>
  );
};

export default ProductSkeleton;
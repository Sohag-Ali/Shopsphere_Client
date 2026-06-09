import ReviewCard from "../Card/ReviewCard";


const ProductTabs = ({ product }) => {

  return (
    <div className="mt-16">

      <div className="tabs tabs-bordered">

        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="Description"
          defaultChecked
        />

        <div className="tab-content p-6">

          {product.description}

        </div>

        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="Specifications"
        />

        <div className="tab-content p-6">

          {Object.entries(
            product.specifications
          ).map(([key, value]) => (

            <p key={key}>
              <strong>{key}</strong> :
              {value}
            </p>

          ))}

        </div>

        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="Reviews"
        />

        <div className="tab-content p-6">

          <ReviewCard
            productId={product._id}
          />

        </div>

      </div>

    </div>
  );
};

export default ProductTabs;
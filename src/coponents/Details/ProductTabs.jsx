import ProductReviews from "./ProductReviews";

const ProductTabs = ({ product }) => {
  return (
    <div
      className="
        mt-10
        sm:mt-12
        lg:mt-16
      "
    >
      <div
        role="tablist"
        className="
          tabs
          tabs-bordered

          tabs-sm
          sm:tabs-md
          lg:tabs-lg

          overflow-x-auto
          whitespace-nowrap
        "
      >
        {/* Description */}

        <input
          type="radio"
          name="tabs"
          role="tab"
          className="tab"
          aria-label="Description"
          defaultChecked
        />

        <div
          role="tabpanel"
          className="
            tab-content

            bg-base-100
            border-base-300

            rounded-box

            p-4
            sm:p-6
            lg:p-8

            mt-4
          "
        >
          <div
            className="
              text-sm
              sm:text-base

              leading-relaxed

              break-words
            "
          >
            {product.description}
          </div>
        </div>

        {/* Specifications */}

        <input
          type="radio"
          name="tabs"
          role="tab"
          className="tab"
          aria-label="Specifications"
        />

        <div
          role="tabpanel"
          className="
            tab-content

            bg-base-100
            border-base-300

            rounded-box

            p-4
            sm:p-6
            lg:p-8

            mt-4
          "
        >
          <div
            className="
              grid

              grid-cols-1
              sm:grid-cols-2

              gap-3
              sm:gap-4
            "
          >
            {Object.entries(
              product.specifications || {}
            ).map(([key, value]) => (
              <div
                key={key}
                className="
                  bg-base-200

                  rounded-xl

                  p-3
                  sm:p-4
                "
              >
                <p
                  className="
                    font-semibold
                    text-sm
                    sm:text-base
                  "
                >
                  {key}
                </p>

                <p
                  className="
                    text-base-content/70

                    text-sm
                    sm:text-base

                    mt-1

                    break-words
                  "
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}

        <input
          type="radio"
          name="tabs"
          role="tab"
          className="tab"
          aria-label="Reviews"
        />

        <div
          role="tabpanel"
          className="
            tab-content

            bg-base-100
            border-base-300

            rounded-box

            p-4
            sm:p-6
            lg:p-8

            mt-4
          "
        >
          <ProductReviews
            productId={product._id}
            productTitle={product.title}
            productImage={product.images?.[0]}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
import { useState } from "react";

const ProductGallery = ({ images = [] }) => {

  const [selected, setSelected] =
    useState(images?.[0] || "");

  return (
    <div className="w-full">

      {/* Main Image */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          bg-base-200
        "
      >
        <img
          src={selected}
          alt="Product"
          className="
            w-full

            h-[250px]
            sm:h-[350px]
            md:h-[450px]
            lg:h-[500px]

            object-cover
            transition-all
            duration-300
          "
        />
      </div>

      {/* Thumbnail Images */}

      <div
        className="
          grid
          grid-cols-4
          sm:grid-cols-5
          md:grid-cols-4
          lg:grid-cols-5

          gap-2
          sm:gap-3

          mt-4
        "
      >
        {images?.map((img, index) => (

          <button
            key={index}
            type="button"
            onClick={() =>
              setSelected(img)
            }
            className={`
              overflow-hidden
              rounded-xl
              border-2
              transition-all
              duration-200

              ${
                selected === img
                  ? "border-primary"
                  : "border-base-300"
              }
            `}
          >
            <img
              src={img}
              alt={`Product ${index + 1}`}
              className="
                w-full

                h-16
                sm:h-20
                md:h-24

                object-cover

                hover:scale-105
                transition-transform
                duration-300
              "
            />
          </button>

        ))}
      </div>

    </div>
  );
};

export default ProductGallery;
import { useState } from "react";

const ProductGallery = ({ images }) => {

  const [selected, setSelected] =
    useState(images[0]);

  return (
    <div>

      <img
        src={selected}
        alt=""
        className="
          w-full
          h-[500px]
          object-cover
          rounded-xl
        "
      />

      <div className="flex gap-3 mt-4">

        {images.map((img, index) => (

          <img
            key={index}
            src={img}
            alt=""
            onClick={() => setSelected(img)}
            className="
              w-24
              h-24
              rounded-lg
              object-cover
              cursor-pointer
            "
          />

        ))}

      </div>

    </div>
  );
};

export default ProductGallery;
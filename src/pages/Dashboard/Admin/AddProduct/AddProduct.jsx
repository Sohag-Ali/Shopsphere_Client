import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AddProduct = () => {

  const axiosSecure = useAxiosSecure();

  const [isDeal, setIsDeal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {

    let specifications = {};

    try {

      specifications = JSON.parse(
        data.specifications
      );

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Invalid Specifications JSON",
        text: "Please enter valid JSON format.",
      });

      return;

    }

    const product = {

      title: data.title,

      shortDescription:
        data.shortDescription,

      description:
        data.description,

      images: [
        data.image1,
        data.image2,
        data.image3,
      ],

      category:
        data.category,

      brand:
        data.brand,

      location:
        data.location,

      price:
        Number(data.price),

      stock:
        Number(data.stock),

      rating:
        Number(data.rating),

      isDeal,

      specifications,

      createdAt:
        new Date(),

    };

    if (isDeal) {

      product.discountPrice =
        Number(
          data.discountPrice
        );

    }

    try {

      const res =
        await axiosSecure.post(
          "/products",
          product
        );

      if (res.data.insertedId) {

        Swal.fire({
          icon: "success",
          title:
            "Product Added Successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        reset();

        setIsDeal(false);

      }

    } catch (error) {

      console.log(error);

      Swal.fire({
        icon: "error",
        title:
          "Failed To Add Product",
      });

    }

  };

  return (
    <div
      className="
        max-w-6xl
        mx-auto
        bg-base-100
        rounded-2xl
        shadow-lg
        p-8
      "
    >

      <h2
        className="
          text-3xl
          font-bold
          mb-8
        "
      >
        Add Product
      </h2>

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="
          grid
          md:grid-cols-2
          gap-6
        "
      >

        {/* Product Title */}

        <input
          {...register("title", {
            required: true,
          })}
          placeholder="Product Title"
          className="input input-bordered w-full"
        />

        {/* Brand */}

        <input
          {...register("brand")}
          placeholder="Brand"
          className="input input-bordered w-full"
        />

        {/* Category */}

        <select
          {...register("category")}
          className="select select-bordered w-full"
        >
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Sports</option>
          <option>Beauty</option>
          <option>Books</option>
          <option>Home & Living</option>
        </select>

        {/* Location */}

        <input
          {...register("location")}
          placeholder="Location"
          className="input input-bordered w-full"
        />

        {/* Price */}

        <input
          type="number"
          {...register("price")}
          placeholder="Price"
          className="input input-bordered w-full"
        />

        {/* Stock */}

        <input
          type="number"
          {...register("stock")}
          placeholder="Stock"
          className="input input-bordered w-full"
        />

        {/* Rating */}

        <input
          type="number"
          step="0.1"
          {...register("rating")}
          placeholder="Rating"
          className="input input-bordered w-full"
        />

        {/* Special Deal */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <input
            type="checkbox"
            className="checkbox"
            checked={isDeal}
            onChange={(e) =>
              setIsDeal(
                e.target.checked
              )
            }
          />

          <span>
            Special Deal Product
          </span>

        </div>

        {/* Discount Price */}

        {isDeal && (

          <input
            type="number"
            {...register(
              "discountPrice"
            )}
            placeholder="Discount Price"
            className="
              input
              input-bordered
              w-full
            "
          />

        )}

        {/* Images */}

        <input
          {...register("image1")}
          placeholder="Image URL 1"
          className="input input-bordered"
        />

        <input
          {...register("image2")}
          placeholder="Image URL 2"
          className="input input-bordered"
        />

        <input
          {...register("image3")}
          placeholder="Image URL 3"
          className="
            input
            input-bordered
            md:col-span-2
          "
        />

        {/* Short Description */}

        <textarea
          {...register(
            "shortDescription"
          )}
          placeholder="Short Description"
          className="
            textarea
            textarea-bordered
            md:col-span-2
          "
        />

        {/* Full Description */}

        <textarea
          {...register(
            "description"
          )}
          placeholder="Full Description"
          className="
            textarea
            textarea-bordered
            md:col-span-2
          "
        />

        {/* Dynamic Specifications */}

        <textarea
          {...register(
            "specifications"
          )}
          placeholder={`{
  "Display":"AMOLED",
  "Battery":"7 Days",
  "Waterproof":"Yes",
  "Warranty":"1 Year"
}`}
          className="
            textarea
            textarea-bordered
            md:col-span-2
            h-40
          "
        />

        {/* Submit */}

        <button
          type="submit"
          className="
            btn
            btn-primary
            md:col-span-2
          "
        >
          Add Product
        </button>

      </form>

    </div>
  );
};

export default AddProduct;
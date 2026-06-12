import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useTitle from "../../../../hooks/useTitle";

const AddProduct = () => {
    useTitle("Add Product");

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
      rounded-3xl
      shadow-xl
      border
      border-base-300
      p-8
    "
  >

    {/* Header */}

    <div className="mb-10">

      <h2
        className="
          text-3xl
          font-bold
        "
      >
        Add Product
      </h2>

      <p
        className="
          text-base-content/60
          mt-2
        "
      >
        Create a new product for your store
      </p>

    </div>

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        grid
        md:grid-cols-2
        gap-6
      "
    >

      {/* Basic Information */}

      <div className="md:col-span-2">

        <h3
          className="
            text-xl
            font-bold
            border-b
            border-base-300
            pb-3
            mb-2
          "
        >
          Basic Information
        </h3>

      </div>

      <div>

        <label className="label">
          <span className="font-semibold">
            Product Title
          </span>
        </label>

        <input
          {...register("title", {
            required: true,
          })}
          placeholder="Enter product title"
          className="input input-bordered w-full"
        />

      </div>

      <div>

        <label className="label">
          <span className="font-semibold">
            Brand
          </span>
        </label>

        <input
          {...register("brand")}
          placeholder="Enter brand"
          className="input input-bordered w-full"
        />

      </div>

      <div>

        <label className="label">
          <span className="font-semibold">
            Category
          </span>
        </label>

        <select
          {...register("category")}
          className="select select-bordered w-full"
        >

          <option>
            Electronics
          </option>

          <option>
            Fashion
          </option>

          <option>
            Sports
          </option>

          <option>
            Beauty
          </option>

          <option>
            Books
          </option>

          <option>
            Home & Living
          </option>

        </select>

      </div>

      <div>

        <label className="label">
          <span className="font-semibold">
            Location
          </span>
        </label>

        <input
          {...register("location")}
          placeholder="Enter location"
          className="input input-bordered w-full"
        />

      </div>

      {/* Pricing */}

      <div className="md:col-span-2 mt-4">

        <h3
          className="
            text-xl
            font-bold
            border-b
            border-base-300
            pb-3
            mb-2
          "
        >
          Pricing & Inventory
        </h3>

      </div>

      <div>

        <label className="label">
          <span className="font-semibold">
            Price
          </span>
        </label>

        <input
          type="number"
          {...register("price")}
          placeholder="0.00"
          className="input input-bordered w-full"
        />

      </div>

      <div>

        <label className="label">
          <span className="font-semibold">
            Stock
          </span>
        </label>

        <input
          type="number"
          {...register("stock")}
          placeholder="Available quantity"
          className="input input-bordered w-full"
        />

      </div>

      <div>

        <label className="label">
          <span className="font-semibold">
            Rating
          </span>
        </label>

        <input
          type="number"
          step="0.1"
          {...register("rating")}
          placeholder="4.5"
          className="input input-bordered w-full"
        />

      </div>

      <div
        className="
          flex
          items-center
          justify-between
          bg-base-200
          rounded-xl
          px-4
          py-3
        "
      >

        <span className="font-medium">
          Special Deal Product
        </span>

        <input
          type="checkbox"
          className="
            toggle
            toggle-primary
          "
          checked={isDeal}
          onChange={(e) =>
            setIsDeal(
              e.target.checked
            )
          }
        />

      </div>

      {isDeal && (

        <div>

          <label className="label">
            <span className="font-semibold">
              Discount Price
            </span>
          </label>

          <input
            type="number"
            {...register(
              "discountPrice"
            )}
            placeholder="Discount price"
            className="
              input
              input-bordered
              w-full
            "
          />

        </div>

      )}

      {/* Images */}

      <div className="md:col-span-2 mt-4">

        <h3
          className="
            text-xl
            font-bold
            border-b
            border-base-300
            pb-3
            mb-2
          "
        >
          Product Images
        </h3>

      </div>

      <div>

        <label className="label">
          Image URL 1
        </label>

        <input
          {...register("image1")}
          placeholder="https://..."
          className="input input-bordered w-full"
        />

      </div>

      <div>

        <label className="label">
          Image URL 2
        </label>

        <input
          {...register("image2")}
          placeholder="https://..."
          className="input input-bordered w-full"
        />

      </div>

      <div className="md:col-span-2">

        <label className="label">
          Image URL 3
        </label>

        <input
          {...register("image3")}
          placeholder="https://..."
          className="input input-bordered w-full"
        />

      </div>

      {/* Descriptions */}

      <div className="md:col-span-2 mt-4">

        <h3
          className="
            text-xl
            font-bold
            border-b
            border-base-300
            pb-3
            mb-2
          "
        >
          Product Description
        </h3>

      </div>

      <div className="md:col-span-2">

        <label className="label">
          Short Description
        </label>

        <textarea
          {...register(
            "shortDescription"
          )}
          className="
            textarea
            textarea-bordered
            w-full
            h-24
          "
        />

      </div>

      <div className="md:col-span-2">

        <label className="label">
          Full Description
        </label>

        <textarea
          {...register(
            "description"
          )}
          className="
            textarea
            textarea-bordered
            w-full
            h-36
          "
        />

      </div>

      {/* Specifications */}

      <div className="md:col-span-2 mt-4">

        <h3
          className="
            text-xl
            font-bold
            border-b
            border-base-300
            pb-3
            mb-2
          "
        >
          Specifications
        </h3>

      </div>

      <div className="md:col-span-2">

        <label className="label">
          JSON Specifications
        </label>

        <textarea
          {...register(
            "specifications"
          )}
          placeholder={`{
  "Display":"AMOLED",
  "Battery":"5000mAh",
  "Warranty":"1 Year"
}`}
          className="
            textarea
            textarea-bordered
            w-full
            h-48
          "
        />

      </div>

      <button
        type="submit"
        className="
          btn
          btn-primary
          md:col-span-2
          h-14
          text-lg
          font-semibold
        "
      >
        Add Product
      </button>

    </form>

  </div>

);
};

export default AddProduct;
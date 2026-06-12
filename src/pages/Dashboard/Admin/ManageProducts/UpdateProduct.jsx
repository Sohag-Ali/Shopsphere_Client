import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useTitle from "../../../../hooks/useTitle";

const UpdateProduct = () => {
  useTitle("Update Product");

  const { id } = useParams();

  const navigate = useNavigate();

  const axiosSecure =
    useAxiosSecure();

  const [loading, setLoading] =
    useState(true);

  const [product, setProduct] =
    useState(null);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {

    axiosSecure
      .get(`/products/${id}`)
      .then((res) => {

        const data =
          res.data;

        setProduct(data);

        reset({

          title:
            data.title,

          brand:
            data.brand,

          category:
            data.category,

          location:
            data.location,

          price:
            data.price,

          stock:
            data.stock,

          rating:
            data.rating,

          shortDescription:
            data.shortDescription,

          description:
            data.description,

          image1:
            data.images?.[0],

          image2:
            data.images?.[1],

          image3:
            data.images?.[2],

          specifications:
            JSON.stringify(
              data.specifications,
              null,
              2
            ),

        });

        setLoading(false);

      });

  }, [id, axiosSecure, reset]);

  const onSubmit =
    async (data) => {

      let specifications =
        {};

      try {

        specifications =
          JSON.parse(
            data.specifications
          );

      } catch {

        Swal.fire({
          icon: "error",
          title:
            "Invalid Specifications JSON",
        });

        return;

      }

      const updatedProduct = {

        title:
          data.title,

        brand:
          data.brand,

        category:
          data.category,

        location:
          data.location,

        price:
          Number(
            data.price
          ),

        stock:
          Number(
            data.stock
          ),

        rating:
          Number(
            data.rating
          ),

        shortDescription:
          data.shortDescription,

        description:
          data.description,

        images: [

          data.image1,

          data.image2,

          data.image3,

        ],

        specifications,

      };

      const res =
        await axiosSecure.patch(
          `/products/${id}`,
          updatedProduct
        );

      if (
        res.data.modifiedCount
      ) {

        Swal.fire({

          icon:
            "success",

          title:
            "Product Updated",

          timer:
            1500,

          showConfirmButton:
            false,

        });

        navigate(
          "/dashboard/admin/manage-products"
        );

      }

    };

  if (loading) {

    return (
      <div
        className="
          flex
          justify-center
          py-20
        "
      >

        <span
          className="
            loading
            loading-spinner
            loading-lg
          "
        ></span>

      </div>
    );

  }

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
        Update Product
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

        <input
          {...register("title")}
          placeholder="Title"
          className="input input-bordered"
        />

        <input
          {...register("brand")}
          placeholder="Brand"
          className="input input-bordered"
        />

        <select
          {...register("category")}
          className="
            select
            select-bordered
          "
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

        <input
          {...register("location")}
          placeholder="Location"
          className="input input-bordered"
        />

        <input
          type="number"
          {...register("price")}
          placeholder="Price"
          className="input input-bordered"
        />

        <input
          type="number"
          {...register("stock")}
          placeholder="Stock"
          className="input input-bordered"
        />

        <input
          type="number"
          step="0.1"
          {...register("rating")}
          placeholder="Rating"
          className="input input-bordered"
        />

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

        <textarea
          {...register(
            "description"
          )}
          placeholder="Description"
          className="
            textarea
            textarea-bordered
            md:col-span-2
            h-32
          "
        />

        <textarea
          {...register(
            "specifications"
          )}
          placeholder="Specifications JSON"
          className="
            textarea
            textarea-bordered
            md:col-span-2
            h-52
          "
        />

        <button
          type="submit"
          className="
            btn
            btn-primary
            md:col-span-2
          "
        >
          Update Product
        </button>

      </form>

    </div>
  );
};

export default UpdateProduct;
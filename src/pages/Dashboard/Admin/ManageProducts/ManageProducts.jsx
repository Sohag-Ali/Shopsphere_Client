import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import ProductRow from "../../../../coponents/Table/ProductRow";
import { Link } from "react-router";
import useTitle from "../../../../hooks/useTitle";


const ManageProducts = () => {
    useTitle("Manage Products");

  const axiosSecure = useAxiosSecure();

  const [products, setProducts] =
    useState([]);

  const loadProducts = () => {

    axiosSecure
      .get("/admin/products")
      .then((res) => {

        setProducts(
          res.data
        );

      });

  };

  useEffect(() => {

    loadProducts();

  }, []);

  const handleDelete = async (
    id
  ) => {

    const result =
      await Swal.fire({

        title:
          "Delete Product?",

        icon:
          "warning",

        showCancelButton:
          true,

      });

    if (
      !result.isConfirmed
    )
      return;

    const res =
      await axiosSecure.delete(
        `/products/${id}`
      );

    if (
      res.data.deletedCount
    ) {

      Swal.fire(
        "Deleted!",
        "",
        "success"
      );

      loadProducts();

    }

  };

  const handleMakeDeal =
    async (product) => {

      const { value } =
        await Swal.fire({

          title:
            "Discount Price",

          input:
            "number",

          inputValue:
            product.price,

          showCancelButton:
            true,

        });

      if (!value) return;

      const res =
        await axiosSecure.patch(
          `/products/deal/${product._id}`,
          {
            discountPrice:
              value,
          }
        );

      if (
        res.data.modifiedCount
      ) {

        Swal.fire(
          "Success",
          "Added To Deals",
          "success"
        );

        loadProducts();

      }

    };

  const handleRemoveDeal =
    async (id) => {

      const res =
        await axiosSecure.patch(
          `/products/remove-deal/${id}`
        );

      if (
        res.data.modifiedCount
      ) {

        Swal.fire(
          "Removed",
          "Deal Removed",
          "success"
        );

        loadProducts();

      }

    };

  return (
  <div className="
    
    mx-auto

    px-4
    sm:px-6
    lg:px-8

    space-y-6
    sm:space-y-8
    lg:space-y-10
  ">
    {/* Header */}

    <div
      className="
        flex
        flex-col
        sm:flex-row

        sm:items-center
        justify-between

        gap-4

        mb-6
        sm:mb-8
      "
    >
      <h2
        className="
          text-2xl
          sm:text-3xl
          lg:text-4xl

          font-bold
        "
      >
        Manage Products
      </h2>

      <div
        className="
          badge
          badge-primary

          badge-md
          sm:badge-lg

          self-start
          sm:self-auto
        "
      >
        {products.length} Products
      </div>
    </div>

    {/* Desktop Table */}

    <div
      className="
        hidden
        lg:block

        bg-base-100
        rounded-3xl
        shadow-xl
        overflow-hidden
      "
    >
      <div className="overflow-x-auto">
        <table
          className="
            table
            table-zebra
          "
        >
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Deal</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map(
              (product) => (
                <ProductRow
                  key={
                    product._id
                  }
                  product={
                    product
                  }
                  handleDelete={
                    handleDelete
                  }
                  handleMakeDeal={
                    handleMakeDeal
                  }
                  handleRemoveDeal={
                    handleRemoveDeal
                  }
                />
              )
            )}
          </tbody>
        </table>
      </div>
    </div>

    {/* Mobile + Tablet Cards */}

   <div
  className="
    grid
    grid-cols-1
    md:grid-cols-2
    gap-4
    lg:hidden
  "
>
  {products.map((product) => (
    <div
      key={product._id}
      className="
        bg-base-100
        rounded-3xl
        shadow-xl
        p-4
        border
        border-base-300
      "
    >
      {/* Product Info */}

      <div className="flex gap-4">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="
            w-24
            h-24
            rounded-2xl
            object-cover
            flex-shrink-0
          "
        />

        <div className="flex-1 min-w-0">
          <h3
            className="
              font-bold
              text-lg
              line-clamp-2
            "
          >
            {product.title}
          </h3>

          <p
            className="
              text-sm
              text-base-content/60
              mt-1
            "
          >
            {product.category}
          </p>

          <div className="mt-2">
            {product.isDeal ? (
              <>
                <p
                  className="
                    line-through
                    text-gray-400
                    text-sm
                  "
                >
                  ৳ {product.price}
                </p>

                <p
                  className="
                    text-error
                    font-bold
                    text-lg
                  "
                >
                  ৳ {product.discountPrice}
                </p>
              </>
            ) : (
              <p
                className="
                  text-primary
                  font-bold
                  text-lg
                "
              >
                ৳ {product.price}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Details */}

      <div
        className="
          grid
          grid-cols-2
          gap-4
          mt-5
        "
      >
        <div>
          <p className="text-xs text-base-content/60">
            Stock
          </p>

          <p className="font-semibold">
            {product.stock}
          </p>
        </div>

        <div>
          <p className="text-xs text-base-content/60">
            Deal Status
          </p>

          {product.isDeal ? (
            <span className="badge badge-error">
              Deal
            </span>
          ) : (
            <span className="badge badge-info">
              Normal
            </span>
          )}
        </div>

        <div>
          <p className="text-xs text-base-content/60">
            Brand
          </p>

          <p className="font-medium">
            {product.brand || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-xs text-base-content/60">
            Rating
          </p>

          <p className="font-medium">
            ⭐ {product.rating || 0}
          </p>
        </div>
      </div>

      {/* Actions */}

      <div
        className="
          grid
          grid-cols-2
          gap-2
          mt-5
        "
      >
        <Link
          to={`/dashboard/update-product/${product._id}`}
          className="
            btn
            btn-info
            btn-sm
          "
        >
          Edit
        </Link>

        <button
          onClick={() =>
            handleDelete(product._id)
          }
          className="
            btn
            btn-error
            btn-sm
          "
        >
          Delete
        </button>

        {!product.isDeal ? (
          <button
            onClick={() =>
              handleMakeDeal(product)
            }
            className="
              btn
              btn-success
              btn-sm
              col-span-2
            "
          >
            Make Deal
          </button>
        ) : (
          <button
            onClick={() =>
              handleRemoveDeal(
                product._id
              )
            }
            className="
              btn
              btn-warning
              btn-sm
              col-span-2
            "
          >
            Remove Deal
          </button>
        )}
      </div>
    </div>
  ))}
</div>
  </div>
);
};

export default ManageProducts;
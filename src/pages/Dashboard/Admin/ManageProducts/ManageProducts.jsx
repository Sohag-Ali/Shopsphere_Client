import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import ProductRow from "../../../../coponents/Table/ProductRow";


const ManageProducts = () => {

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
    <div>

      <div
        className="
          flex
          justify-between
          items-center
          mb-8
        "
      >

        <h2
          className="
            text-3xl
            font-bold
          "
        >
          Manage Products
        </h2>

        <div
          className="
            badge
            badge-primary
            badge-lg
          "
        >
          {products.length}
          Products
        </div>

      </div>

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
  );
};

export default ManageProducts;
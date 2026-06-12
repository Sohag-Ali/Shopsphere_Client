import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import CategoryRow from "../../../../coponents/Table/CategoryRow";
import useTitle from "../../../../hooks/useTitle";



const ManageCategories = () => {
    useTitle("Manage Categories");

  const axiosSecure =
    useAxiosSecure();

  const [categories,
    setCategories] =
    useState([]);

  const loadCategories =
    () => {

      axiosSecure
        .get("/categories")
        .then((res) => {

          setCategories(
            res.data
          );

        });

    };

  useEffect(() => {

    loadCategories();

  }, []);

  // Add Category

  const handleAdd =
    async () => {

      const {
        value: formValues
      } = await Swal.fire({

        title:
          "Add Category",

        html: `

          <input
            id="swal-name"
            class="swal2-input"
            placeholder="Category Name"
          />

          <input
            id="swal-image"
            class="swal2-input"
            placeholder="Image URL"
          />

        `,

        focusConfirm:
          false,

        showCancelButton:
          true,

        preConfirm: () => {

          return {

            name:
              document.getElementById(
                "swal-name"
              ).value,

            image:
              document.getElementById(
                "swal-image"
              ).value,

          };

        },

      });

      if (
        !formValues?.name
      )
        return;

      const res =
        await axiosSecure.post(
          "/categories",
          formValues
        );

      if (
        res.data.insertedId
      ) {

        Swal.fire(
          "Added!",
          "",
          "success"
        );

        loadCategories();

      }

    };

  // Edit Category

  const handleEdit =
    async (
      category
    ) => {

      const {
        value: formValues
      } = await Swal.fire({

        title:
          "Update Category",

        html: `

          <input
            id="swal-name"
            class="swal2-input"
            value="${category.name}"
          />

          <input
            id="swal-image"
            class="swal2-input"
            value="${category.image}"
          />

        `,

        focusConfirm:
          false,

        showCancelButton:
          true,

        preConfirm: () => {

          return {

            name:
              document.getElementById(
                "swal-name"
              ).value,

            image:
              document.getElementById(
                "swal-image"
              ).value,

          };

        },

      });

      if (
        !formValues?.name
      )
        return;

      const res =
        await axiosSecure.patch(

          `/categories/${category._id}`,

          formValues

        );

      if (
        res.data.modifiedCount
      ) {

        Swal.fire(
          "Updated!",
          "",
          "success"
        );

        loadCategories();

      }

    };

  // Delete Category

  const handleDelete =
    async (id) => {

      const result =
        await Swal.fire({

          title:
            "Delete Category?",

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
          `/categories/${id}`
        );

      if (
        res.data.deletedCount
      ) {

        Swal.fire(
          "Deleted!",
          "",
          "success"
        );

        loadCategories();

      }

    };

  return (
    <div className="mx-auto

    px-4
    sm:px-6
    lg:px-8

    space-y-6
    sm:space-y-8
    lg:space-y-10">

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
  <div>
    <h2
      className="
        text-2xl
        sm:text-3xl
        lg:text-4xl

        font-bold
      "
    >
      Manage Categories
    </h2>

    <p
      className="
        text-sm
        sm:text-base

        text-base-content/70

        mt-1
        sm:mt-2
      "
    >
      Total: {categories.length}
    </p>
  </div>

  <button
    onClick={handleAdd}
    className="
      btn
      btn-primary

      w-full
      sm:w-auto

      btn-sm
      sm:btn-md
    "
  >
    Add Category
  </button>
</div>

    {/* Desktop Table */}

<div
  className="
    hidden
    lg:block

    bg-base-100
    rounded-2xl
    shadow-lg
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
          <th>Category</th>
          <th>Products</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {categories.map(
          (category) => (
            <CategoryRow
              key={category._id}
              category={category}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
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
  {categories.map((category) => (
    <div
      key={category._id}
      className="
        bg-base-100
        rounded-2xl
        shadow-lg
        p-4
        border
        border-base-300
      "
    >
      {/* Category Info */}

      <div className="flex gap-4">
        <img
          src={category.image}
          alt={category.name}
          className="
            w-20
            h-20
            rounded-2xl
            object-cover
            flex-shrink-0
          "
        />

        <div className="flex-1">
          <h3
            className="
              text-lg
              font-bold
            "
          >
            {category.name}
          </h3>

          <p
            className="
              text-sm
              text-base-content/60
              mt-1
            "
          >
            Products: {category.productCount || 0}
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
        <button
          onClick={() =>
            handleEdit(category)
          }
          className="
            btn
            btn-info
            btn-sm
          "
        >
          Edit
        </button>

        <button
          onClick={() =>
            handleDelete(
              category._id
            )
          }
          className="
            btn
            btn-error
            btn-sm
          "
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default ManageCategories;
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import CategoryRow from "../../../../coponents/Table/CategoryRow";



const ManageCategories = () => {

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
    <div>

      <div
        className="
          flex
          justify-between
          items-center
          mb-8
        "
      >

        <div>

          <h2
            className="
              text-3xl
              font-bold
            "
          >
            Manage Categories
          </h2>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Total:
            {categories.length}
          </p>

        </div>

        <button
          onClick={
            handleAdd
          }
          className="
            btn
            btn-primary
          "
        >
          Add Category
        </button>

      </div>

      <div
        className="
          bg-base-100
          rounded-2xl
          shadow-lg
          overflow-x-auto
        "
      >

        <table
          className="
            table
            table-zebra
          "
        >

          <thead>

            <tr>

              <th>
                Image
              </th>

              <th>
                Category
              </th>

              <th>
                Products
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {
              categories.map(
                (category) => (

                  <CategoryRow
                    key={
                      category._id
                    }
                    category={
                      category
                    }
                    handleEdit={
                      handleEdit
                    }
                    handleDelete={
                      handleDelete
                    }
                  />

                )
              )
            }

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ManageCategories;
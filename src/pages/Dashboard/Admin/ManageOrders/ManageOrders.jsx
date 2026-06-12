import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import ManageOrdersTable from "./ManageOrderTable";
import useTitle from "../../../../hooks/useTitle";



const ManageOrders = () => {
    useTitle("Manage Orders");

  const axiosSecure =
    useAxiosSecure();

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadOrders = () => {

    axiosSecure
      .get("/orders")
      .then((res) => {

        setOrders(
          res.data
        );

      })
      .finally(() => {

        setLoading(false);

      });

  };

  useEffect(() => {

    loadOrders();

  }, []);

  const handleStatusChange =
    async (id, status) => {

      const res =
        await axiosSecure.patch(
          `/orders/${id}`,
          { status }
        );

      if (
        res.data.modifiedCount
      ) {

        Swal.fire({

          icon: "success",
          title: "Status Updated",
          timer: 1200,
          showConfirmButton: false,

        });

        loadOrders();

      }

    };

  const handleDelete =
    async (id) => {

      const result =
        await Swal.fire({

          title:
            "Delete Order?",

          icon:
            "warning",

          showCancelButton:
            true,

        });

      if (
        !result.isConfirmed
      ) return;

      const res =
        await axiosSecure.delete(
          `/orders/${id}`
        );

      if (
        res.data.deletedCount
      ) {

        Swal.fire({

          icon: "success",
          title: "Order Deleted",
          timer: 1200,
          showConfirmButton: false,

        });

        loadOrders();

      }

    };

  return (
  <div
    className="mx-auto

    px-4
    sm:px-6
    lg:px-8

    space-y-6
    sm:space-y-8
    lg:space-y-10"
  >
    <div
      className="
        mb-6
        sm:mb-8

        flex
        flex-col
        sm:flex-row

        sm:items-center
        justify-between

        gap-4
      "
    >
      <div>
        <h1
          className="
            text-2xl
            sm:text-3xl
            lg:text-4xl

            font-bold
          "
        >
          Manage Orders
        </h1>

        <p
          className="
            text-sm
            sm:text-base

            text-base-content/60

            mt-2
          "
        >
          Total Orders:{" "}
          <span className="font-semibold">
            {orders.length}
          </span>
        </p>
      </div>

      {/* Mobile + Desktop Badge */}

      <div
        className="
          self-start
          sm:self-auto
        "
      >
        <span
          className="
            badge
            badge-primary

            badge-md
            sm:badge-lg
          "
        >
          {orders.length} Orders
        </span>
      </div>
    </div>

    <ManageOrdersTable
      orders={orders}
      loading={loading}
      handleDelete={handleDelete}
      handleStatusChange={
        handleStatusChange
      }
    />
  </div>
);

};

export default ManageOrders;
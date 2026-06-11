import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import ManageOrdersTable from "./ManageOrderTable";



const ManageOrders = () => {

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

    <div>

      <div className="mb-8">

        <h1
          className="
            text-4xl
            font-bold
          "
        >
          Manage Orders
        </h1>

        <p
          className="
            text-base-content/60
            mt-2
          "
        >
          Total Orders:
          {" "}
          {orders.length}
        </p>

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
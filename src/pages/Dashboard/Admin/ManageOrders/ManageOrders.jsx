import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import OrderRow from "../../../../coponents/Table/OrderRow";



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
    async (
      id,
      status
    ) => {

      const res =
        await axiosSecure.patch(
          `/orders/${id}`,
          {
            status
          }
        );

      if (
        res.data.modifiedCount
      ) {

        Swal.fire({

          icon:
            "success",

          title:
            "Status Updated",

          timer:
            1000,

          showConfirmButton:
            false,

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
      )
        return;

      const res =
        await axiosSecure.delete(
          `/orders/${id}`
        );

      if (
        res.data.deletedCount
      ) {

        Swal.fire(
          "Deleted!",
          "",
          "success"
        );

        loadOrders();

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
            Manage Orders
          </h2>

          <p
            className="
              text-gray-500
              mt-1
            "
          >
            Total Orders:
            {orders.length}
          </p>

        </div>

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
                Product
              </th>

              <th>
                Customer
              </th>

              <th>
                Product Name
              </th>

              <th>
                Price
              </th>

              <th>
                Status
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.map(
              (order) => (

                <OrderRow
                  key={
                    order._id
                  }
                  order={order}
                  handleStatusChange={
                    handleStatusChange
                  }
                  handleDelete={
                    handleDelete
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

export default ManageOrders;
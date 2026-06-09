import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const MyOrders = () => {

  const { user } = useAuth();

  const axiosSecure =
    useAxiosSecure();

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    if (user?.email) {

      axiosSecure
        .get(
          `/my-orders/${user.email}`
        )
        .then((res) => {

          setOrders(
            res.data
          );

        });

    }

  }, [
    user,
    axiosSecure
  ]);

  return (
    <div>

      <h2
        className="
          text-3xl
          font-bold
          mb-8
        "
      >
        My Orders
      </h2>

      <div className="overflow-x-auto">

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
                Price
              </th>

              <th>
                Date
              </th>

              <th>
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {
              orders.map(
                (order) => (

                  <tr
                    key={
                      order._id
                    }
                  >

                    <td>

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >

                        <img
                          src={
                            order.productImage
                          }
                          alt=""
                          className="
                            w-12
                            h-12
                            rounded-lg
                            object-cover
                          "
                        />

                        <span>
                          {
                            order.productTitle
                          }
                        </span>

                      </div>

                    </td>

                    <td>
                      ৳
                      {
                        order.price
                      }
                    </td>

                    <td>
                      {
                        order.orderDate
                      }
                    </td>

                    <td>

                      <span
                        className="
                          badge
                          badge-success
                        "
                      >

                        {
                          order.status
                        }

                      </span>

                    </td>

                  </tr>

                )
              )
            }

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default MyOrders;
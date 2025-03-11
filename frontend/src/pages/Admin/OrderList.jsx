import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
// import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h4 className="text-lg font-semibold px-6 mt-10 ml-[7rem]">Order List</h4>
          <table className="border border-gray-400 rounded-md overflow-hidden shadow-lg w-10/12 mx-auto mt-16">
            {/* <AdminMenu /> */}

            <thead className="w-full ">
              <tr className="bg-slate-300">
                <th className="text-left px-4 py-2">ITEMS</th>
                <th className="text-left px-4 py-2">ID</th>
                <th className="text-left px-4 py-2">USER</th>
                <th className="text-left px-4 py-2">DATA</th>
                <th className="text-left px-4 py-2">TOTAL</th>
                <th className="text-left px-4 py-2">PAID</th>
                <th className="text-left px-4 py-2">DELIVERED</th>
                <th></th>
              </tr>
            </thead>

            <tbody className="border border-slate-500 rounded-md">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border border-y-1 border-x-0 cursor-pointer hover:bg-teal-100/50"
                >
                  <td>
                    <img
                      src={order.orderItems[0].image}
                      alt={order._id}
                      className="w-[5rem] pt-4"
                    />
                  </td>
                  <td>{order._id}</td>

                  <td>{order.user ? order.user.username : "N/A"}</td>

                  <td>
                    {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                  </td>

                  <td>$ {order.totalPrice}</td>

                  <td className="py-2">
                    {order.isPaid ? (
                      <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                        Pending
                      </p>
                    )}
                  </td>

                  <td className="px-2 py-2">
                    {order.isDelivered ? (
                      <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                        Pending
                      </p>
                    )}
                  </td>

                  <td>
                    <Link to={`/order/${order._id}`}>
                      <button>More</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default OrderList;

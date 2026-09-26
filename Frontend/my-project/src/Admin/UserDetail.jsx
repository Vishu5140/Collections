import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const [userRes, orderRes] = await Promise.all([
          axios.get(
            `http://localhost:5000/auth/singleData/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              },
            }
          ),

          axios.get(
            `http://localhost:5000/order/admin/getorders/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              },
            }
          ),
        ]);

        setUser(userRes.data.user);
        setOrders(orderRes.data.orders);

      } catch (error) {
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-lg animate-pulse">
          Loading user details...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-red-400 text-lg">
          Products of user not found
        </div>
      </div>
    );
  }

  // Calculate total amount
  const totalSpent = orders.reduce(
    (total, order) => total + Number(order.totalPrice || 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="max-w-7xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition"
        >
          ← Back to Users
        </button>

        {/* User Profile */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">

            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold shadow-lg">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            {/* User information */}
            <div className="flex-1">

              <div className="flex flex-wrap items-center gap-3">

                <h1 className="text-2xl sm:text-3xl font-bold">
                  {user.name}
                </h1>

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {user.role}
                </span>

              </div>

              <p className="text-slate-400 mt-2">
                {user.email}
              </p>

              <p className="text-slate-500 text-sm mt-2">
                Member since{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>

            </div>

          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">

          {/* Orders */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/40 transition">

            <p className="text-slate-400 text-sm">
              Total Orders
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {orders.length}
            </h2>

            <p className="text-indigo-400 text-sm mt-1">
              Orders placed
            </p>

          </div>

          {/* Total spent */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/40 transition">

            <p className="text-slate-400 text-sm">
              Total Spent
            </p>

            <h2 className="text-3xl font-bold mt-2">
              ₹{totalSpent}
            </h2>

            <p className="text-emerald-400 text-sm mt-1">
              Order value
            </p>

          </div>

          {/* Account status */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-purple-500/40 transition">

            <p className="text-slate-400 text-sm">
              Account Status
            </p>

            <h2 className="text-2xl font-bold mt-2 text-emerald-400">
              Active
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              Registered user
            </p>

          </div>

        </div>

        {/* Orders heading */}
        <div className="flex items-center justify-between mt-10 mb-5">

          <div>
            <h2 className="text-2xl font-bold">
              Order History
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Orders placed by {user.name}
            </p>
          </div>

          <span className="bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-xl text-sm">
            {orders.length} Orders
          </span>

        </div>

        {/* No orders */}
        {orders.length === 0 ? (

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">

            <div className="text-5xl mb-4">
              📦
            </div>

            <h3 className="text-xl font-semibold">
              No orders yet
            </h3>

            <p className="text-slate-400 mt-2">
              This user hasn't placed any orders.
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition shadow-lg"
              >

                {/* Order top */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

                  <div>
                    <p className="text-xs text-slate-500">
                      ORDER ID
                    </p>

                    <p className="text-sm font-mono text-slate-300 mt-1">
                      #{order._id}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "pending"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : order.status === "shipped"
                          ? "bg-blue-500/10 text-blue-400"
                          : order.status === "delivered"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-slate-500/10 text-slate-400"
                      }`}
                    >
                      {order.status}
                    </span>

                    <span className="text-xs text-slate-500">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </span>

                  </div>

                </div>

                {/* Product */}
                <div className="flex flex-col md:flex-row gap-5">

                  {/* Product image */}
                  <img
                    src={order.productId?.imageUrl}
                    alt={order.productId?.name}
                    className="w-full md:w-28 h-28 object-cover rounded-xl bg-slate-800"
                  />

                  {/* Product details */}
                  <div className="flex-1">

                    <h3 className="text-lg font-semibold">
                      {order.productId?.name}
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">

                      <div>
                        <p className="text-xs text-slate-500">
                          PRICE
                        </p>
                        <p className="font-medium mt-1">
                          ₹{order.price}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          QUANTITY
                        </p>
                        <p className="font-medium mt-1">
                          {order.quantity}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          TOTAL
                        </p>
                        <p className="font-semibold text-indigo-400 mt-1">
                          ₹{order.totalPrice}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

                {/* Address */}
                {order.address?.length > 0 && (

                  <div className="mt-5 pt-5 border-t border-slate-800">

                    <p className="text-xs text-slate-500 mb-2">
                      DELIVERY ADDRESS
                    </p>

                    <div className="text-sm text-slate-300">

                      <p className="font-medium">
                        {order.address[0].name}
                      </p>

                      <p className="text-slate-400 mt-1">
                        {order.address[0].city},{" "}
                        {order.address[0].state}
                      </p>

                      <p className="text-slate-400">
                        PIN: {order.address[0].pincode}
                      </p>

                    </div>

                  </div>

                )}

              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
}

export default UserDetail;
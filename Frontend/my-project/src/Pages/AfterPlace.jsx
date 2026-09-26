
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AfterPlace() {
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://collections-backend-qguh.onrender.com/order/getorders", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.orders);
        setOrders(res.data.orders);
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const handleView = (id) => {
    navigate(`/user/getMyOrder/${id}`);
  };

  // Status color
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";

      case "shipped":
        return "bg-violet-100 text-violet-700 border-violet-200";

      case "out for delivery":
        return "bg-orange-100 text-orange-700 border-orange-200";

      case "confirmed":
        return "bg-blue-100 text-blue-700 border-blue-200";

      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";

      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Status message
  const getStatusMessage = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "Your order has been delivered successfully.";

      case "shipped":
        return "Your order is on the way.";

      case "out for delivery":
        return "Your order will arrive soon.";

      case "confirmed":
        return "Your order has been confirmed.";

      case "cancelled":
        return "This order has been cancelled.";

      default:
        return "Your order has been placed successfully.";
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>

          <p className="text-white/60 mt-4">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl"></div>

      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 left-1/3 w-96 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>

      {/* Page */}
      <div className="relative min-h-screen px-4 py-6 sm:px-6 lg:px-8">

        <div className="max-w-6xl mx-auto">

          {/* ================= HEADER ================= */}
          <div className="flex items-start justify-between gap-4 mb-8">

            {/* Heading */}
            <div>
              <p className="text-indigo-300 text-xs sm:text-sm uppercase tracking-[0.25em] font-medium">
                Your Shopping Journey
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2">
                My Orders
              </h1>

              <p className="text-white/50 mt-2 text-sm sm:text-base">
                Track and manage all your purchases in one place.
              </p>
            </div>

            {/* ================= BACK BUTTON ================= */}
            <button
              onClick={() => navigate(-1)}
              className="
                shrink-0
                flex items-center gap-2
                px-4 py-2.5
                rounded-xl
                bg-white/10
                backdrop-blur-xl
                border border-white/10
                text-white
                font-medium
                shadow-lg
                hover:bg-white
                hover:text-black
                hover:-translate-y-0.5
                active:scale-95
                transition-all duration-300
              "
            >
              <span className="text-lg">←</span>

              <span className="hidden sm:inline">
                Back
              </span>
            </button>

          </div>

          {/* ================= ORDER COUNT ================= */}
          <div className="flex justify-end mb-5">

            <div className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl">

              <span className="text-white font-bold">
                {orders.length}
              </span>

              <span className="text-white/50 ml-1 text-sm">
                {orders.length === 1 ? "Order" : "Orders"}
              </span>

            </div>

          </div>

          {/* ================= EMPTY ================= */}
          {orders.length === 0 ? (

            <div className="min-h-100 flex items-center justify-center">

              <div className="
                w-full max-w-md
                text-center
                bg-white/10
                backdrop-blur-2xl
                border border-white/10
                rounded-3xl
                p-8
                shadow-2xl
              ">

                <div className="text-6xl mb-5">
                  📦
                </div>

                <h2 className="text-2xl font-bold text-white">
                  No orders yet
                </h2>

                <p className="text-white/50 mt-2">
                  Your future purchases will appear here.
                </p>

                <button
                  onClick={() => navigate("/user/getAll")}
                  className="
                    mt-6
                    px-6 py-3
                    rounded-xl
                    bg-white
                    text-black
                    font-semibold
                    hover:bg-indigo-100
                    hover:-translate-y-0.5
                    active:scale-95
                    transition-all
                  "
                >
                  Start Shopping →
                </button>

              </div>

            </div>

          ) : (

            /* ================= ORDERS ================= */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              {orders.map((order) => (

                <div
                  key={order._id}
                  className="
                    group
                    bg-white/[0.07]
                    backdrop-blur-2xl
                    border border-white/10
                    rounded-3xl
                    p-4 sm:p-5
                    shadow-2xl
                    hover:bg-white/11
                    hover:border-white/20
                    hover:-translate-y-1
                    transition-all duration-300
                  "
                >

                  {/* ================= PRODUCT ================= */}
                  <div className="flex gap-4">

                    {/* Product Image */}
                    <div className="shrink-0">

                      <div className="
                        w-24 h-24
                        sm:w-28 sm:h-28
                        rounded-2xl
                        overflow-hidden
                        bg-white/10
                        border border-white/10
                      ">

                        {order.productId?.imageUrl ? (

                          <img
                            src={order.productId.imageUrl}
                            alt={order.productId?.name || "Product"}
                            className="
                              w-full h-full
                              object-cover
                              group-hover:scale-110
                              transition-transform duration-500
                            "
                          />

                        ) : (

                          <div className="w-full h-full flex items-center justify-center text-3xl">
                            📦
                          </div>

                        )}

                      </div>

                    </div>

                    {/* Product Info */}
                    <div className="min-w-0 flex-1">

                      <div className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-start
                        sm:justify-between
                        gap-2
                      ">

                        <div className="min-w-0">

                          <h2 className="
                            text-lg
                            sm:text-xl
                            font-bold
                            text-white
                            truncate
                          ">
                            {order.productId?.name || "Product"}
                          </h2>

                          <p className="text-xs text-white/40 mt-1 break-all">
                            Order #{order._id}
                          </p>

                        </div>

                        {/* Dynamic Status */}
                        <span
                          className={`
                            w-fit
                            shrink-0
                            px-3 py-1.5
                            rounded-full
                            border
                            text-xs
                            font-bold
                            ${getStatusStyle(order.status)}
                          `}
                        >
                          {order.status || "Order Placed"}
                        </span>

                      </div>

                      {/* Dynamic Message */}
                      <p className="text-sm text-white/50 mt-3 leading-relaxed">
                        {getStatusMessage(order.status)}
                      </p>

                    </div>

                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10 my-5"></div>

                  {/* ================= DETAILS ================= */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                    {/* Price */}
                    <div className="bg-white/6 rounded-2xl p-3">

                      <p className="text-xs text-white/40">
                        Price
                      </p>

                      <p className="text-white font-bold mt-1">
                        ₹{order.price}
                      </p>

                    </div>

                    {/* Quantity */}
                    <div className="bg-white/6 rounded-2xl p-3">

                      <p className="text-xs text-white/40">
                        Quantity
                      </p>

                      <p className="text-white font-bold mt-1">
                        × {order.quantity}
                      </p>

                    </div>

                    {/* Total */}
                    <div className="
                      col-span-2
                      sm:col-span-1
                      bg-white/6
                      rounded-2xl
                      p-3
                    ">

                      <p className="text-xs text-white/40">
                        Total
                      </p>

                      <p className="text-white font-black text-lg mt-1">
                        ₹{order.totalPrice}
                      </p>

                    </div>

                  </div>

                  {/* ================= BOTTOM ================= */}
                  <div className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-4
                    mt-5
                  ">

                    {/* Tracking */}
                    <div className="flex items-center gap-2 text-xs text-white/40">

                      <span className="
                        w-2 h-2
                        bg-emerald-400
                        rounded-full
                        animate-pulse
                      "></span>

                      Order is being tracked

                    </div>

                    {/* View */}
                    <button
                      onClick={() => handleView(order._id)}
                      className="
                        w-full sm:w-auto
                        px-5 py-2.5
                        rounded-xl
                        bg-white
                        text-black
                        font-semibold
                        text-sm
                        hover:bg-indigo-100
                        hover:scale-[1.02]
                        active:scale-95
                        transition-all duration-300
                      "
                    >
                      View Order →
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default AfterPlace;


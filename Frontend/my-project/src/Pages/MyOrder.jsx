
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MyOrder() {
  const [Data, setData] = useState(null);
  const [Address, setadd] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get(
          `https://collections-backend-qguh.onrender.com/order/Myorder/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data);

        setData(res.data.order);
        setadd(res.data.order.address?.[0] || null);
      } catch (error) {
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    };

    getOrder();
  }, [id, token]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>

          <p className="mt-5 text-white/70 text-sm">
            Loading your order...
          </p>
        </div>
      </div>
    );
  }

  // Order not found
  if (!Data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 px-4">
        <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-md w-full">
          <div className="text-5xl mb-4">📦</div>

          <h1 className="text-2xl font-bold text-gray-900">
            Order not found
          </h1>

          <p className="text-gray-500 mt-2">
            We couldn't find the order you're looking for.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Dynamic status
  const status = Data.status || "Order Placed";

  const statusStyle = {
    "Order Placed":
      "bg-blue-100 text-blue-700 border-blue-200",

    Confirmed:
      "bg-indigo-100 text-indigo-700 border-indigo-200",

    Shipped:
      "bg-purple-100 text-purple-700 border-purple-200",

    "Out for Delivery":
      "bg-orange-100 text-orange-700 border-orange-200",

    Delivered:
      "bg-green-100 text-green-700 border-green-200",

    Cancelled:
      "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">

      {/* Background decoration */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl"></div>

      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 left-1/3 w-96 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

      {/* Main */}
      <div className="relative min-h-screen px-4 py-6 sm:px-6 lg:px-10">

        <div className="max-w-6xl mx-auto">

          {/* Top Header */}
          <div className="flex items-start justify-between gap-4 mb-8">

            <div>
              <p className="text-sm text-white/50 uppercase tracking-widest">
                My Order
              </p>

              <h1 className="text-2xl sm:text-4xl font-bold text-white mt-2 break-all">
                Order #{Data._id}
              </h1>

              <p className="text-white/50 text-sm mt-2">
                Thank you for shopping with us.
              </p>
            </div>

            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl
              bg-white/10 border border-white/10 text-white
              hover:bg-white hover:text-black
              transition-all duration-300 shadow-lg backdrop-blur-md"
            >
              <span className="text-lg">←</span>
              <span className="hidden sm:inline">Back</span>
            </button>

          </div>

          {/* Status */}
          <div className="mb-6 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-6 shadow-2xl">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>
                <p className="text-white/50 text-sm">
                  Current Delivery Status
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {status}
                </h2>
              </div>

              <span
                className={`w-fit px-4 py-2 rounded-full border text-sm font-semibold ${
                  statusStyle[status] ||
                  "bg-gray-100 text-gray-700 border-gray-200"
                }`}
              >
                {status}
              </span>

            </div>

          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">

              {/* Address Card */}
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 sm:p-7 shadow-2xl border border-white/20">

                <div className="flex items-center gap-3 mb-6">

                  <div className="w-11 h-11 rounded-2xl bg-indigo-100 flex items-center justify-center text-xl">
                    📍
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Delivery Address
                    </h2>

                    <p className="text-sm text-gray-500">
                      Your order will be delivered here
                    </p>
                  </div>

                </div>

                {Address ? (
                  <div className="space-y-5">

                    {/* Customer */}
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <p className="text-xs uppercase tracking-wider text-gray-400">
                        Customer
                      </p>

                      <p className="text-lg font-bold text-gray-900 mt-1">
                        {Address.name || "N/A"}
                      </p>
                    </div>

                    {/* Address */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-400">
                        Address
                      </p>

                      <p className="text-gray-800 mt-1 leading-relaxed">
                        {Address.localadd || "Address not available"}
                      </p>
                    </div>

                    {/* Phone */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-400">
                        Phone Number
                      </p>

                      <p className="text-gray-900 font-medium mt-1">
                        {Address.phone || "N/A"}
                      </p>
                    </div>

                    {/* Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                      <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-xs text-gray-400">
                          City
                        </p>

                        <p className="font-semibold text-gray-900 mt-1">
                          {Address.city || "N/A"}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-xs text-gray-400">
                          State
                        </p>

                        <p className="font-semibold text-gray-900 mt-1">
                          {Address.state || "N/A"}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-xs text-gray-400">
                          Pincode
                        </p>

                        <p className="font-semibold text-gray-900 mt-1">
                          {Address.pincode || "N/A"}
                        </p>
                      </div>

                    </div>

                  </div>
                ) : (
                  <p className="text-gray-500">
                    Address information is not available.
                  </p>
                )}

              </div>

              {/* Delivery Info */}
              <div className="bg-white/95 rounded-3xl p-5 sm:p-7 shadow-2xl">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-2xl bg-green-100 flex items-center justify-center text-xl">
                    🚚
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Delivery Information
                    </h2>

                    <p className="text-sm text-gray-500">
                      Track your order status
                    </p>
                  </div>

                </div>

                <div className="mt-6 flex items-center gap-3 overflow-x-auto pb-2">

                  {[
                    "Order Placed",
                    "Confirmed",
                    "Shipped",
                    "Out for Delivery",
                    "Delivered",
                  ].map((item, index) => {

                    const statuses = [
                      "Order Placed",
                      "Confirmed",
                      "Shipped",
                      "Out for Delivery",
                      "Delivered",
                    ];

                    const currentIndex = statuses.indexOf(status);

                    const completed = index <= currentIndex;

                    return (
                      <div
                        key={item}
                        className="flex items-center shrink-0"
                      >

                        <div className="text-center">

                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                              completed
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-400"
                            }`}
                          >
                            {completed ? "✓" : index + 1}
                          </div>

                          <p className="text-[11px] sm:text-xs mt-2 text-gray-500 max-w-187.5">
                            {item}
                          </p>

                        </div>

                        {index !== 4 && (
                          <div
                            className={`w-8 sm:w-12 h-1 mx-1 rounded-full ${
                              index < currentIndex
                                ? "bg-green-500"
                                : "bg-gray-200"
                            }`}
                          ></div>
                        )}

                      </div>
                    );
                  })}

                </div>

              </div>

            </div>

            {/* RIGHT - Order Summary */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-2xl h-fit lg:sticky lg:top-6">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-11 h-11 rounded-2xl bg-gray-900 flex items-center justify-center text-xl">
                  🛍️
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Order Summary
                  </h2>

                  <p className="text-sm text-gray-500">
                    Your purchase details
                  </p>
                </div>

              </div>

              <div className="space-y-5">

                {/* Product Price */}
                <div className="flex justify-between gap-4">

                  <span className="text-gray-500">
                    Product Price
                  </span>

                  <span className="font-semibold text-gray-900">
                    ₹{Data.price}
                  </span>

                </div>

                {/* Quantity */}
                <div className="flex justify-between gap-4">

                  <span className="text-gray-500">
                    Quantity
                  </span>

                  <span className="px-3 py-1 bg-gray-100 rounded-lg font-semibold text-gray-900">
                    × {Data.quantity}
                  </span>

                </div>

                <div className="border-t border-gray-200 pt-5">

                  <div className="flex justify-between items-end">

                    <div>
                      <p className="text-sm text-gray-500">
                        Total Amount
                      </p>

                      <p className="text-3xl font-black text-gray-900 mt-1">
                        ₹{Data.totalPrice}
                      </p>
                    </div>

                    <span className="text-green-600 text-2xl">
                      ✓
                    </span>

                  </div>

                </div>

              </div>

              {/* Secure message */}
              <div className="mt-7 rounded-2xl bg-gray-50 p-4">

                <p className="text-sm text-gray-600">
                  🔒 Your order information is securely protected.
                </p>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default MyOrder;


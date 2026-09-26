import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Order() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
    const cartItem = cartItems.find((item) => item._id === id);
  const totalPrice = cartItem.price * cartItem.quantity;
  const token = localStorage.getItem("token");

const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    price: cartItem.price,
    totalPrice: totalPrice,
    quantity: cartItem.quantity,
  });

  // Check first before using cartItem
  if (!cartItem) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Product not found
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="mt-5 px-5 py-2.5 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // const totalPrice = cartItem.price * cartItem.quantity;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    axios
      .post(
        "https://collections-backend-qguh.onrender.com/order/Adorder",
        {
          formData,
          id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate("/user/getAllOrder");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden px-3 py-5 sm:px-6 sm:py-8">

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">

          <div>
            <p className="text-indigo-400 text-sm font-medium mb-1">
              Secure Checkout
            </p>

            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Order Details
            </h1>
          </div>

          {/* Back Button */}
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
            <span className="hidden sm:inline">Back</span>
          </button>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6">

          {/* Product Card */}
          <div className="lg:col-span-2">

            <div className="bg-white/[0.07] backdrop-blur-2xl border border-white/10 rounded-3xl p-4 sm:p-5 shadow-2xl sticky top-5">

              <p className="text-gray-400 text-sm mb-4">
                Your Product
              </p>

              <div className="flex gap-4 items-center">

                {/* SMALL PRODUCT IMAGE */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-white/5">

                  <img
                    src={cartItem.imageUrl}
                    alt={cartItem.name}
                    className="w-full h-full object-cover"
                  />

                </div>

                {/* Product Information */}
                <div className="min-w-0 flex-1">

                  <span className="inline-block px-2.5 py-1 mb-2 rounded-full bg-indigo-500/20 border border-indigo-400/20 text-indigo-300 text-xs">
                    {cartItem.category || "Product"}
                  </span>

                  <h2 className="text-base sm:text-lg font-bold text-white truncate">
                    {cartItem.name}
                  </h2>

                  <p className="text-gray-400 text-sm mt-1">
                    ₹{cartItem.price} × {cartItem.quantity}
                  </p>

                </div>

              </div>

              {/* Total */}
              <div className="border-t border-white/10 mt-5 pt-5">

                <div className="flex justify-between items-center">

                  <span className="text-gray-400">
                    Product Total
                  </span>

                  <span className="text-xl font-bold text-white">
                    ₹{totalPrice}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* Delivery Form */}
          <div className="lg:col-span-3">

            <div className="bg-white/[0.07] backdrop-blur-2xl border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl">

              <div className="mb-6">

                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Delivery Details
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  Enter your details for delivery
                </p>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="
                        w-full
                        bg-white/5
                        border border-white/10
                        text-white
                        placeholder-gray-500
                        rounded-xl
                        px-4 py-3
                        outline-none
                        focus:border-indigo-400
                        focus:ring-2
                        focus:ring-indigo-500/20
                        transition
                      "
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                      className="
                        w-full
                        bg-white/5
                        border border-white/10
                        text-white
                        placeholder-gray-500
                        rounded-xl
                        px-4 py-3
                        outline-none
                        focus:border-indigo-400
                        focus:ring-2
                        focus:ring-indigo-500/20
                        transition
                      "
                    />
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">

                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Address
                    </label>

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your complete address"
                      required
                      rows="3"
                      className="
                        w-full
                        bg-white/5
                        border border-white/10
                        text-white
                        placeholder-gray-500
                        rounded-xl
                        px-4 py-3
                        outline-none
                        focus:border-indigo-400
                        focus:ring-2
                        focus:ring-indigo-500/20
                        resize-none
                        transition
                      "
                    />

                  </div>

                  {/* City */}
                  <div>

                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                      required
                      className="
                        w-full
                        bg-white/5
                        border border-white/10
                        text-white
                        placeholder-gray-500
                        rounded-xl
                        px-4 py-3
                        outline-none
                        focus:border-indigo-400
                        focus:ring-2
                        focus:ring-indigo-500/20
                        transition
                      "
                    />

                  </div>

                  {/* State */}
                  <div>

                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      State
                    </label>

                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter state"
                      required
                      className="
                        w-full
                        bg-white/5
                        border border-white/10
                        text-white
                        placeholder-gray-500
                        rounded-xl
                        px-4 py-3
                        outline-none
                        focus:border-indigo-400
                        focus:ring-2
                        focus:ring-indigo-500/20
                        transition
                      "
                    />

                  </div>

                  {/* Pincode */}
                  <div className="sm:col-span-2">

                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Pincode
                    </label>

                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="Enter pincode"
                      required
                      className="
                        w-full sm:max-w-xs
                        bg-white/5
                        border border-white/10
                        text-white
                        placeholder-gray-500
                        rounded-xl
                        px-4 py-3
                        outline-none
                        focus:border-indigo-400
                        focus:ring-2
                        focus:ring-indigo-500/20
                        transition
                      "
                    />

                  </div>

                </div>

                {/* Order Total */}
                <div className="border-t border-white/10 mt-6 pt-5">

                  <div className="flex justify-between items-center">

                    <div>
                      <p className="text-gray-400 text-sm">
                        Total Amount
                      </p>

                      <p className="text-white font-medium">
                        {cartItem.quantity} item
                        {cartItem.quantity > 1 ? "s" : ""}
                      </p>
                    </div>

                    <span className="text-2xl sm:text-3xl font-bold text-white">
                      ₹{totalPrice}
                    </span>

                  </div>

                </div>

                {/* Place Order */}
                <button
                  type="submit"
                  className="
                    w-full
                    mt-6
                    bg-white
                    text-black
                    font-bold
                    py-3.5
                    rounded-xl
                    hover:bg-gray-200
                    hover:-translate-y-0.5
                    active:scale-[0.98]
                    transition-all duration-300
                    shadow-xl
                  "
                >
                  Place Order →
                </button>

                <p className="text-center text-gray-500 text-xs mt-4">
                  🔒 Your order details are securely protected
                </p>

              </form>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Order;

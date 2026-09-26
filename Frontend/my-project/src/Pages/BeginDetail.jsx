import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../Slice/cartSlice";
function BeginDetail() {
  const { id } = useParams();
  const [Item, setItem] = useState([]);
   const dispatch=useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://collections-backend-qguh.onrender.com/products/getOne/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        setItem([res.data.product]);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [id, token]);

  if (Item.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>

          <h1 className="text-white text-xl font-semibold">
            Loading product...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-6 sm:px-6 lg:px-8">

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"></div>

      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>

      {/* Back Button */}
      <div className="relative z-10 max-w-6xl mx-auto flex justify-end mb-5">
        <button
          onClick={() => navigate(-1)}
          className="
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

      {/* Main Card */}
      <div className="relative z-10 max-w-6xl mx-auto">

        {Item.map((item) => (
          <div
            key={item._id}
            className="
              bg-white/[0.07]
              backdrop-blur-2xl
              border border-white/10
              rounded-3xl
              shadow-2xl
              overflow-hidden
            "
          >

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-5 sm:p-8 lg:p-10">

              {/* ================= IMAGE ================= */}
              <div className="flex items-start justify-center">

                <div
                  className="
                    relative
                    w-full
                    max-w-sm
                    sm:max-w-md
                    rounded-2xl
                    overflow-hidden
                    border border-white/10
                    bg-white/5
                    shadow-2xl
                    group
                  "
                >

                  {/* Image */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="
                      w-full
                      h-56
                      sm:h-64
                      md:h-72
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="
                        px-3 py-1.5
                        rounded-full
                        bg-black/50
                        backdrop-blur-md
                        border border-white/10
                        text-white
                        text-xs
                        sm:text-sm
                        font-medium
                        capitalize
                      "
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4">
                    <div
                      className="
                        flex items-center gap-1
                        px-3 py-1.5
                        rounded-full
                        bg-black/50
                        backdrop-blur-md
                        border border-white/10
                        text-white
                        text-sm
                      "
                    >
                      ⭐ {item.rating || 0}
                    </div>
                  </div>

                </div>
              </div>

              {/* ================= PRODUCT INFO ================= */}
              <div className="flex flex-col justify-center">

                {/* Small Label */}
                <p className="text-indigo-400 text-sm font-semibold uppercase tracking-wider">
                  Product Details
                </p>

                {/* Product Name */}
                <h1
                  className="
                    mt-2
                    text-3xl
                    sm:text-4xl
                    lg:text-5xl
                    font-bold
                    text-white
                    wrap-break-word
                  "
                >
                  {item.name}
                </h1>

                {/* Category */}
                <p className="mt-3 text-gray-400 capitalize">
                  Category:{" "}
                  <span className="text-gray-200">
                    {item.category}
                  </span>
                </p>

                {/* Price */}
                <div className="mt-5">
                  <span className="text-gray-400 text-sm">
                    Price
                  </span>

                  <p className="text-3xl sm:text-4xl font-bold text-white">
                    ₹{item.price}
                  </p>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h2 className="text-white font-semibold text-lg">
                    Description
                  </h2>

                  <p className="mt-2 text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* ================= STATS ================= */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-7">

                  {/* Rating */}
                  <div
                    className="
                      bg-white/5
                      border border-white/10
                      rounded-2xl
                      p-3
                      sm:p-4
                    "
                  >
                    <p className="text-gray-500 text-xs sm:text-sm">
                      Rating
                    </p>

                    <div className="mt-2 text-white">
                      <h1>Rating</h1>
                    </div>
                  </div>

                  {/* Reviews */}
                  <div
                    className="
                      bg-white/5
                      border border-white/10
                      rounded-2xl
                      p-3
                      sm:p-4
                    "
                  >
                    <p className="text-gray-500 text-xs sm:text-sm">
                      Reviews
                    </p>

                    <p className="mt-2 text-white font-semibold text-lg">
                      {item.reviews || 0}
                    </p>
                  </div>

                  {/* Stock */}
                  <div
                    className="
                      bg-white/5
                      border border-white/10
                      rounded-2xl
                      p-3
                      sm:p-4
                    "
                  >
                    <p className="text-gray-500 text-xs sm:text-sm">
                      Stock
                    </p>

                    <p
                      className={`mt-2 font-semibold text-lg ${
                        item.stock > 0
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {item.stock}
                    </p>
                  </div>

                </div>

                {/* ================= BUY BUTTON ================= */}
                <div className="mt-8">

                  <button
                    onClick={() =>{dispatch(addToCart(item));
                      navigate("/user/cart")} }
                    disabled={item.stock <= 0}
                    className="
                      w-full
                      py-3.5
                      rounded-xl
                      bg-white
                      text-black
                      font-bold
                      shadow-xl
                      hover:bg-gray-200
                      hover:-translate-y-1
                      active:scale-[0.98]
                      disabled:bg-gray-500
                      disabled:text-gray-300
                      disabled:cursor-not-allowed
                      disabled:hover:translate-y-0
                      transition-all
                      duration-300
                    "
                  >
                    Add to Cart
                  </button>

                </div>

                {/* Bottom Message */}
                <div
                  className="
                    mt-4
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-sm
                    text-gray-400
                  "
                >
                  <span>🔒</span>
                  <span>Secure checkout</span>
                </div>

              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default BeginDetail;

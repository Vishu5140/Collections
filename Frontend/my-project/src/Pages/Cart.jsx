import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToCart } from "../Slice/cartSlice";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // View Product
  const handlepro = (id) => {
    navigate(`/user/detail/${id}`);
  };

  // Remove Product
  const handleRemove = (item) => {
    dispatch(removeToCart(item));
  };

  // Total Cart Price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">

      {/* ================= BACKGROUND GLOW ================= */}

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl"></div>

      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 left-1/3 w-96 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>


      {/* ================= MAIN ================= */}

      <div className="relative min-h-screen px-4 py-6 sm:px-6 lg:px-8">

        <div className="max-w-6xl mx-auto">


          {/* ================= HEADER ================= */}

          <div className="flex items-start justify-between gap-4 mb-8">

            <div>

              <p className="text-indigo-300 text-xs sm:text-sm uppercase tracking-[0.25em] font-medium">
                Your Collection
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2">
                My Cart
              </h1>

              <p className="text-white/50 mt-2 text-sm sm:text-base">
                Review your products before placing your order.
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

              <span className="text-lg">
                ←
              </span>

              <span className="hidden sm:inline">
                Back
              </span>

            </button>

          </div>


          {/* ================= CART COUNT ================= */}

          {cartItems.length > 0 && (

            <div className="flex justify-end mb-5">

              <div className="
                px-4 py-2
                rounded-2xl
                bg-white/10
                border border-white/10
                backdrop-blur-xl
              ">

                <span className="text-white font-bold">
                  {cartItems.length}
                </span>

                <span className="text-white/50 ml-1 text-sm">
                  {cartItems.length === 1
                    ? "Product"
                    : "Products"}
                </span>

              </div>

            </div>

          )}


          {/* ================= CART CONTENT ================= */}

          {cartItems.length > 0 ? (

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


              {/* ================= PRODUCTS ================= */}

              <div className="lg:col-span-2 space-y-4">

                {cartItems.map((item) => (

                  <div
                    key={item._id}
                    className="
                      group
                      bg-white/[0.07]
                      backdrop-blur-2xl
                      border border-white/10
                      rounded-3xl
                      p-4
                      shadow-2xl
                      hover:bg-white/11
                      hover:border-white/20
                      hover:-translate-y-1
                      transition-all duration-300
                    "
                  >

                    <div className="
                      flex
                      flex-col
                      sm:flex-row
                      gap-4
                      sm:items-center
                    ">


                      {/* ================= IMAGE ================= */}

                      <div className="shrink-0">

                        <div className="
                          w-full
                          sm:w-28
                          h-48
                          sm:h-28
                          rounded-2xl
                          overflow-hidden
                          bg-white/10
                          border border-white/10
                        ">

                          {item.imageUrl ? (

                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="
                                w-full
                                h-full
                                object-cover
                                group-hover:scale-110
                                transition-transform
                                duration-700
                              "
                            />

                          ) : (

                            <div className="
                              w-full
                              h-full
                              flex
                              items-center
                              justify-center
                              text-5xl
                            ">
                              🛍️
                            </div>

                          )}

                        </div>

                      </div>


                      {/* ================= PRODUCT INFO ================= */}

                      <div className="flex-1 min-w-0">

                        <p className="
                          text-xs
                          uppercase
                          tracking-wider
                          text-indigo-300
                          font-medium
                        ">
                          Product
                        </p>

                        <h2 className="
                          text-xl
                          sm:text-2xl
                          font-bold
                          text-white
                          mt-1
                          truncate
                        ">
                          {item.name}
                        </h2>


                        {/* Category */}

                        <p className="text-sm text-white/40 mt-1">
                          {item.category || "General Collection"}
                        </p>


                        {/* Price */}

                        <div className="mt-4 flex items-center gap-4">

                          <div>

                            <p className="text-xs text-white/40">
                              Price
                            </p>

                            <p className="text-xl font-black text-white">
                              ₹{item.price}
                            </p>

                          </div>


                          {/* Quantity */}

                          <div>

                            <p className="text-xs text-white/40">
                              Quantity
                            </p>

                            <p className="text-white font-bold">
                              × {item.quantity || 1}
                            </p>

                          </div>

                        </div>

                      </div>


                      {/* ================= ACTIONS ================= */}

                      <div className="
                        flex
                        sm:flex-col
                        gap-2
                        w-full
                        sm:w-auto
                      ">

                        {/* View */}

                        <button
                          onClick={() => handlepro(item._id)}
                          className="
                            flex-1
                            sm:flex-none
                            px-5
                            py-2.5
                            rounded-xl
                            bg-white/10
                            border border-white/10
                            text-white
                            text-sm
                            font-semibold
                            hover:bg-white
                            hover:text-black
                            transition-all
                            duration-300
                          "
                        >
                          View
                        </button>


                        {/* Remove */}

                        <button
                          onClick={() => handleRemove(item)}
                          className="
                            flex-1
                            sm:flex-none
                            px-5
                            py-2.5
                            rounded-xl
                            bg-red-500/10
                            border border-red-400/20
                            text-red-300
                            text-sm
                            font-semibold
                            hover:bg-red-500
                            hover:text-white
                            transition-all
                            duration-300
                          "
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>


              {/* ================= SUMMARY ================= */}

              <div className="lg:sticky lg:top-6 h-fit">

                <div className="
                  bg-white/[0.07]
                  backdrop-blur-2xl
                  border border-white/10
                  rounded-3xl
                  p-6
                  shadow-2xl
                ">

                  <p className="
                    text-indigo-300
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    font-medium
                  ">
                    Checkout
                  </p>

                  <h2 className="
                    text-2xl
                    font-bold
                    text-white
                    mt-2
                  ">
                    Order Summary
                  </h2>


                  {/* Items */}

                  <div className="
                    flex
                    justify-between
                    items-center
                    mt-6
                    text-sm
                  ">

                    <span className="text-white/50">
                      Items
                    </span>

                    <span className="text-white font-semibold">
                      {cartItems.length}
                    </span>

                  </div>


                  {/* Divider */}

                  <div className="border-t border-white/10 my-5"></div>


                  {/* Total */}

                  <div className="
                    flex
                    justify-between
                    items-center
                  ">

                    <span className="text-white/60">
                      Total
                    </span>

                    <span className="
                      text-2xl
                      font-black
                      text-white
                    ">
                      ₹{totalPrice}
                    </span>

                  </div>


                  {/* Continue Shopping */}

                  <button
                    onClick={() => navigate("/user/getAll")}
                    className="
                      w-full
                      mt-3
                      py-3
                      rounded-2xl
                      bg-white/10
                      border border-white/10
                      text-white/70
                      font-medium
                      hover:bg-white/20
                      hover:text-white
                      transition-all
                    "
                  >
                    Continue Shopping
                  </button>


                  {/* Secure Message */}

                  <div className="
                    mt-5
                    p-3
                    rounded-xl
                    bg-emerald-400/10
                    border border-emerald-400/10
                  ">

                    <p className="text-xs text-emerald-300 text-center">
                      🔒 Secure checkout • Your order is protected
                    </p>

                  </div>

                </div>

              </div>

            </div>

          ) : (

            /* ================= EMPTY CART ================= */

            <div className="
              min-h-112.5
              flex
              items-center
              justify-center
            ">

              <div className="
                w-full
                max-w-md
                text-center
                bg-white/10
                backdrop-blur-2xl
                border border-white/10
                rounded-3xl
                p-8
                shadow-2xl
              ">

                <div className="text-7xl mb-5">
                  🛒
                </div>

                <h2 className="
                  text-2xl
                  sm:text-3xl
                  font-bold
                  text-white
                ">
                  Your cart is empty
                </h2>

                <p className="
                  text-white/50
                  mt-2
                  text-sm
                  sm:text-base
                ">
                  Looks like you haven't added anything yet.
                </p>

                <button
                  onClick={() => navigate("/user/getAll")}
                  className="
                    mt-6
                    px-7
                    py-3
                    rounded-xl
                    bg-white
                    text-black
                    font-semibold
                    hover:bg-indigo-100
                    hover:-translate-y-0.5
                    active:scale-95
                    transition-all
                    duration-300
                  "
                >
                  Explore Products →
                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Cart;

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Decrement, Increment } from "../Slice/cartSlice";

function DetailPage() {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const cartItem = cartItems.find((item) => item._id === id);

  // ================= PRODUCT NOT FOUND =================

  if (!cartItem) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

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

          <div className="text-6xl mb-5">
            📦
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Product Not Found
          </h1>

          <p className="text-white/50 mt-2">
            This product is no longer available in your cart.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="
              mt-6
              px-6 py-3
              rounded-xl
              bg-white
              text-black
              font-semibold
              hover:bg-indigo-100
              active:scale-95
              transition-all
            "
          >
            ← Go Back
          </button>

        </div>

      </div>
    );
  }

  // ================= TOTAL =================

  const totalPrice =
    cartItem.price * (cartItem.quantity || 1);

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">

      {/* ================= BACKGROUND GLOW ================= */}

      <div className="
        absolute
        -top-40
        -left-40
        w-96
        h-96
        bg-indigo-600/30
        rounded-full
        blur-3xl
      "></div>

      <div className="
        absolute
        top-1/3
        -right-40
        w-96
        h-96
        bg-purple-600/20
        rounded-full
        blur-3xl
      "></div>

      <div className="
        absolute
        bottom-0
        left-1/3
        w-96
        h-72
        bg-blue-500/10
        rounded-full
        blur-3xl
      "></div>


      {/* ================= MAIN ================= */}

      <div className="
        relative
        min-h-screen
        px-4
        py-6
        sm:px-6
        lg:px-8
      ">

        <div className="max-w-6xl mx-auto">


          {/* ================= HEADER ================= */}

          <div className="
            flex
            items-start
            justify-between
            gap-4
            mb-8
          ">

            <div>

              <p className="
                text-indigo-300
                text-xs
                sm:text-sm
                uppercase
                tracking-[0.25em]
                font-medium
              ">
                Product Details
              </p>

              <h1 className="
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-black
                text-white
                mt-2
              ">
                {cartItem.name}
              </h1>

              <p className="text-white/50 mt-2 text-sm">
                Explore product information and choose your quantity.
              </p>

            </div>


            {/* ================= BACK BUTTON ================= */}

            <button
              onClick={() => navigate(-1)}
              className="
                shrink-0
                flex
                items-center
                gap-2
                px-4
                py-2.5
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
                transition-all
                duration-300
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


          {/* ================= PRODUCT CARD ================= */}

          <div className="
            bg-white/[0.07]
            backdrop-blur-2xl
            border border-white/10
            rounded-3xl
            shadow-2xl
            overflow-hidden
          ">

            <div className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-0
            ">


              {/* ================= IMAGE ================= */}

              <div className="
                relative
                min-h-87.5
                sm:min-h-112.5
                lg:min-h-150
                bg-white/5
                overflow-hidden
              ">

                {cartItem.imageUrl ? (

                  <img
                    src={cartItem.imageUrl}
                    alt={cartItem.name}
                    className="
                      absolute
                      inset-0
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-110
                      hover:scale-105
                      transition-transform
                      duration-700
                    "
                  />

                ) : (

                  <div className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    text-7xl
                  ">
                    📦
                  </div>

                )}


                {/* Image Overlay */}

                <div className="
                  absolute
                  inset-0
                  bg-linear-to-t
                  from-black/60
                  via-transparent
                  to-transparent
                "></div>


                {/* Category */}

                <div className="
                  absolute
                  top-5
                  left-5
                  px-4
                  py-2
                  rounded-full
                  bg-black/50
                  backdrop-blur-md
                  border border-white/10
                  text-white
                  text-xs
                  sm:text-sm
                  font-semibold
                  capitalize
                ">
                  {cartItem.category || "General"}
                </div>


                {/* Rating */}

                <div className="
                  absolute
                  bottom-5
                  left-5
                  px-4
                  py-2
                  rounded-xl
                  bg-black/50
                  backdrop-blur-md
                  border border-white/10
                  text-white
                  text-sm
                ">
                  ⭐ {cartItem.rating || 0}
                </div>

              </div>


              {/* ================= INFORMATION ================= */}

              <div className="
                p-5
                sm:p-8
                lg:p-10
                flex
                flex-col
                justify-center
              ">


                {/* Category */}

                <p className="
                  text-indigo-300
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  font-semibold
                ">
                  {cartItem.category || "General Collection"}
                </p>


                {/* Name */}

                <h2 className="
                  text-3xl
                  sm:text-4xl
                  font-black
                  text-white
                  mt-2
                ">
                  {cartItem.name}
                </h2>


                {/* Price */}

                <div className="mt-6">

                  <p className="text-sm text-white/40">
                    Total Price
                  </p>

                  <div className="flex items-end gap-3">

                    <p className="
                      text-4xl
                      sm:text-5xl
                      font-black
                      text-white
                    ">
                      ₹{totalPrice}
                    </p>

                    {cartItem.quantity > 1 && (
                      <p className="
                        text-sm
                        text-white/40
                        pb-2
                      ">
                        ₹{cartItem.price} × {cartItem.quantity}
                      </p>
                    )}

                  </div>

                </div>


                {/* ================= QUANTITY ================= */}

                <div className="mt-7">

                  <p className="
                    text-sm
                    text-white/50
                    mb-3
                  ">
                    Quantity
                  </p>


                  <div className="flex items-center gap-3">

                    {/* Minus */}

                    <button
                      onClick={() =>
                        dispatch(Decrement(cartItem))
                      }
                      disabled={cartItem.quantity === 1}
                      className="
                        w-11
                        h-11
                        rounded-xl
                        bg-white/10
                        border border-white/10
                        text-white
                        text-xl
                        font-bold
                        hover:bg-white
                        hover:text-black
                        disabled:opacity-30
                        disabled:cursor-not-allowed
                        active:scale-90
                        transition-all
                      "
                    >
                      −
                    </button>


                    {/* Quantity */}

                    <div className="
                      w-14
                      h-11
                      rounded-xl
                      bg-white/10
                      border border-white/10
                      flex
                      items-center
                      justify-center
                      text-white
                      font-bold
                    ">
                      {cartItem.quantity}
                    </div>


                    {/* Plus */}

                    <button
                      onClick={() =>
                        dispatch(Increment(cartItem))
                      }
                      disabled={
                        cartItem.quantity === cartItem.stock
                      }
                      className="
                        w-11
                        h-11
                        rounded-xl
                        bg-white/10
                        border border-white/10
                        text-white
                        text-xl
                        font-bold
                        hover:bg-white
                        hover:text-black
                        disabled:opacity-30
                        disabled:cursor-not-allowed
                        active:scale-90
                        transition-all
                      "
                    >
                      +
                    </button>

                  </div>

                  <p className="text-xs text-white/40 mt-2">
                    Maximum available: {cartItem.stock}
                  </p>

                </div>


                {/* ================= DESCRIPTION ================= */}

                <div className="mt-7">

                  <p className="
                    text-sm
                    text-white/40
                    mb-2
                  ">
                    Description
                  </p>

                  <p className="
                    text-white/60
                    leading-relaxed
                    text-sm
                    sm:text-base
                  ">
                    {cartItem.description ||
                      "No description available for this product."}
                  </p>

                </div>


                {/* ================= STATS ================= */}

                <div className="
                  grid
                  grid-cols-3
                  gap-3
                  mt-7
                ">

                  {/* Rating */}

                  <div className="
                    bg-white/6
                    border border-white/10
                    rounded-2xl
                    p-3
                  ">

                    <p className="text-xs text-white/40">
                      Rating
                    </p>

                    <p className="
                      text-white
                      font-bold
                      mt-1
                    ">
                      ⭐ {cartItem.rating || 0}
                    </p>

                  </div>


                  {/* Reviews */}

                  <div className="
                    bg-white/6
                    border border-white/10
                    rounded-2xl
                    p-3
                  ">

                    <p className="text-xs text-white/40">
                      Reviews
                    </p>

                    <p className="
                      text-white
                      font-bold
                      mt-1
                    ">
                      {cartItem.reviews || 0}
                    </p>

                  </div>


                  {/* Stock */}

                  <div className="
                    bg-white/6
                    border border-white/10
                    rounded-2xl
                    p-3
                  ">

                    <p className="text-xs text-white/40">
                      Stock
                    </p>

                    <p className="
                      text-white
                      font-bold
                      mt-1
                    ">
                      {cartItem.stock}
                    </p>

                  </div>

                </div>


                {/* ================= BUY BUTTON ================= */}

                <button
                  onClick={() =>
                    navigate(`/user/order/${cartItem._id}`)
                  }
                  className="
                    w-full
                    mt-8
                    py-4
                    rounded-2xl
                    bg-white
                    text-black
                    font-bold
                    text-base
                    shadow-xl
                    hover:bg-indigo-100
                    hover:-translate-y-1
                    active:scale-[0.98]
                    transition-all
                    duration-300
                  "
                >
                  Buy Now →
                </button>


                {/* Secure Info */}

                <div className="
                  mt-4
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-xs
                  text-white/40
                ">

                  <span>
                    🔒
                  </span>

                  Secure checkout • Fast delivery

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DetailPage;

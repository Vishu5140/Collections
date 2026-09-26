
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../Components/BackButton";

function GetApro() {
  const [item, setitem] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // ================= GET PRODUCTS =================
  useEffect(() => {
    const getPro = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/products/getApro",
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );

        setitem(res.data.products);
      } catch (error) {
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    };

    getPro();
  }, [token]);


  // ================= UPDATE =================
  const handleUpdate = (id) => {
    navigate(`/updateProduct/${id}`);
  };


  // ================= DELETE =================
  const handleDelete = (id) => {
    axios
      .delete(
        `http://localhost:5000/products/deleteproduct/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);

        setitem((prev) =>
          prev.filter((data) => data._id !== id)
        );
      })
      .catch((error) => {
        console.log(error.response);
      });
  };


  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-6 sm:px-6 lg:px-8">

      {/* ================= BACKGROUND GLOW ================= */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl"></div>

      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>


      {/* ================= MAIN ================= */}
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ================= TOP BAR ================= */}
        <div className="flex items-center justify-between gap-4 mb-6">

          {/* Heading */}
          <div>

            <div className="flex items-center gap-2 mb-2">

              <span
                className="
                  px-3 py-1
                  rounded-full
                  bg-indigo-500/20
                  border border-indigo-400/20
                  text-indigo-300
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                "
              >
                Admin
              </span>

              <span className="text-gray-600 text-sm">
                /
              </span>

              <span className="text-gray-500 text-sm">
                Products
              </span>

            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              All Products
            </h1>

            <p className="text-gray-500 text-sm sm:text-base mt-1">
              Manage, update and delete products from your store.
            </p>

          </div>

          {/* Back Button */}
          <div className="shrink-0">
            <BackButton />
          </div>

        </div>


        {/* ================= PRODUCT COUNT ================= */}
        <div
          className="
            mb-5
            bg-white/[0.07]
            backdrop-blur-2xl
            border border-white/10
            rounded-2xl
            px-5 py-4
            flex items-center justify-between
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                w-10 h-10
                rounded-xl
                bg-indigo-500/20
                border border-indigo-400/20
                flex items-center justify-center
                text-xl
              "
            >
              📦
            </div>

            <div>
              <p className="text-white font-semibold">
                Product Inventory
              </p>

              <p className="text-gray-500 text-xs sm:text-sm">
                Your current store products
              </p>
            </div>

          </div>

          <div className="text-right">

            <p className="text-2xl font-bold text-white">
              {item.length}
            </p>

            <p className="text-gray-500 text-xs">
              Products
            </p>

          </div>

        </div>


        {/* ================= LOADING ================= */}
        {loading ? (

          <div
            className="
              bg-white/[0.07]
              backdrop-blur-2xl
              border border-white/10
              rounded-3xl
              p-12
              text-center
            "
          >

            <div
              className="
                w-12 h-12
                border-4
                border-white/20
                border-t-indigo-500
                rounded-full
                animate-spin
                mx-auto
                mb-4
              "
            ></div>

            <p className="text-white font-medium">
              Loading products...
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Please wait a moment.
            </p>

          </div>

        ) : item.length === 0 ? (

          /* ================= EMPTY ================= */
          <div
            className="
              bg-white/[0.07]
              backdrop-blur-2xl
              border border-white/10
              rounded-3xl
              p-10 sm:p-14
              text-center
            "
          >

            <div className="text-5xl mb-4">
              📦
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-2">
              You haven't added any products yet.
            </p>

            <button
              onClick={() => navigate("/createProduct")}
              className="
                mt-6
                px-6 py-3
                rounded-xl
                bg-white
                text-black
                font-semibold
                hover:bg-gray-200
                hover:-translate-y-0.5
                active:scale-95
                transition-all
              "
            >
              + Add Product
            </button>

          </div>

        ) : (

          /* ================= PRODUCTS ================= */
          <div className="space-y-4 pb-8">

            {item.map((box) => (

              <div
                key={box._id}
                className="
                  group
                  w-full
                  bg-white/[0.07]
                  backdrop-blur-2xl
                  border border-white/10
                  rounded-2xl
                  shadow-xl
                  p-4
                  flex flex-col
                  sm:flex-row
                  sm:items-center
                  gap-4
                  hover:bg-white/10
                  hover:-translate-y-0.5
                  transition-all
                  duration-300
                "
              >

                {/* ================= IMAGE ================= */}
                <div className="relative shrink-0">

                  <img
                    src={box.imageUrl}
                    alt={box.name}
                    className="
                      w-full
                      h-40
                      sm:w-24
                      sm:h-24
                      object-cover
                      rounded-xl
                      border border-white/10
                      group-hover:scale-105
                      transition-transform
                      duration-300
                    "
                  />

                  {/* Category */}
                  {box.category && (
                    <span
                      className="
                        absolute
                        bottom-2
                        left-2
                        px-2 py-1
                        rounded-lg
                        bg-black/60
                        backdrop-blur-md
                        text-white
                        text-[10px]
                        capitalize
                      "
                    >
                      {box.category}
                    </span>
                  )}

                </div>


                {/* ================= PRODUCT INFO ================= */}
                <div className="flex-1 min-w-0">

                  <h2
                    className="
                      text-lg
                      sm:text-xl
                      font-semibold
                      text-white
                      truncate
                    "
                  >
                    {box.name}
                  </h2>

                  <p
                    className="
                      text-gray-500
                      text-sm
                      mt-1
                      line-clamp-2
                    "
                  >
                    {box.description || "No description available"}
                  </p>


                  {/* Price + Stock */}
                  <div className="flex flex-wrap items-center gap-3 mt-3">

                    <span className="text-white font-bold">
                      ₹{box.price}
                    </span>

                    <span className="text-gray-700">
                      |
                    </span>

                    <span
                      className={`text-sm font-medium ${
                        box.stock > 0
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      Stock: {box.stock}
                    </span>

                    {box.rating !== undefined && (
                      <>
                        <span className="text-gray-700">
                          |
                        </span>

                        <span className="text-yellow-400 text-sm">
                          ⭐ {box.rating || 0}
                        </span>
                      </>
                    )}

                  </div>

                </div>


                {/* ================= BUTTONS ================= */}
                <div
                  className="
                    flex
                    gap-2
                    w-full
                    sm:w-auto
                    sm:shrink-0
                  "
                >

                  {/* UPDATE */}
                  <button
                    onClick={() => handleUpdate(box._id)}
                    className="
                      flex-1
                      sm:flex-none
                      px-4 py-2.5
                      rounded-xl
                      bg-indigo-500/20
                      border border-indigo-400/20
                      text-indigo-300
                      font-medium
                      hover:bg-indigo-500
                      hover:text-white
                      hover:-translate-y-0.5
                      active:scale-95
                      transition-all
                    "
                  >
                    Update
                  </button>


                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(box._id)}
                    className="
                      flex-1
                      sm:flex-none
                      px-4 py-2.5
                      rounded-xl
                      bg-red-500/10
                      border border-red-400/20
                      text-red-400
                      font-medium
                      hover:bg-red-500
                      hover:text-white
                      hover:-translate-y-0.5
                      active:scale-95
                      transition-all
                    "
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
}

export default GetApro;

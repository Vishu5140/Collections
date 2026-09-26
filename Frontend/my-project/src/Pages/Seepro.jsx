import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../Slice/cartSlice";

function Seepro() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ================= GET PRODUCTS =================
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/products/getAll",
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data);

        setProducts(res.data.products);
      } catch (error) {
        console.log("Error fetching products:", error.response);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [token]);

  // ================= CATEGORIES =================
  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.category)
        .filter((category) => category)
    ),
  ];

  // ================= SEARCH + FILTER =================
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category?.toLowerCase() ===
        selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // ================= VIEW DETAILS =================
  const handleSeeAll = (id) => {
    navigate(`/user/Bdetail/${id}`);
  };

  // ================= ADD CART =================
  const handleAddCart = (item) => {
    dispatch(addToCart(item));
    navigate("/user/cart");
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">

          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>

          <p className="text-white/60 mt-4">
            Loading products...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">

      {/* ================= BACKGROUND GLOW ================= */}

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl"></div>

      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 left-1/3 w-96 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>


      {/* ================= MAIN ================= */}

      <div className="relative min-h-screen px-4 py-6 sm:px-6 lg:px-10">

        <div className="max-w-7xl mx-auto">


          {/* ================= HEADER ================= */}

          <div className="flex items-start justify-between gap-4 mb-8">

            <div>

              <p className="text-indigo-300 text-xs sm:text-sm uppercase tracking-[0.25em] font-medium">
                Discover Something New
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2">
                Explore Products
              </h1>

              <p className="text-white/50 mt-2 text-sm sm:text-base">
                Find products you'll love and add them to your collection.
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


          {/* ================= SEARCH ================= */}

          <div className="mb-6">

            <div className="
              relative
              max-w-2xl
              bg-white/10
              backdrop-blur-2xl
              border border-white/10
              rounded-2xl
              shadow-2xl
              overflow-hidden
            ">

              <span className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-white/40
                text-lg
              ">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  bg-transparent
                  text-white
                  placeholder:text-white/40
                  pl-12
                  pr-5
                  py-4
                  outline-none
                  text-sm sm:text-base
                "
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-white/50
                    hover:text-white
                    transition
                  "
                >
                  ✕
                </button>
              )}

            </div>

          </div>


          {/* ================= CATEGORIES ================= */}

          <div className="mb-8">

            <div className="flex items-center justify-between mb-3">

              <h2 className="text-white font-semibold">
                Categories
              </h2>

              <span className="text-xs text-white/40">
                {categories.length - 1} categories
              </span>

            </div>


            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">

              {categories.map((category) => (

                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    shrink-0
                    px-5 py-2.5
                    rounded-full
                    text-sm
                    font-semibold
                    border
                    transition-all
                    duration-300

                    ${
                      selectedCategory === category
                        ? `
                          bg-white
                          text-black
                          border-white
                          shadow-lg
                          scale-105
                        `
                        : `
                          bg-white/10
                          text-white/70
                          border-white/10
                          hover:bg-white/20
                          hover:text-white
                        `
                    }
                  `}
                >
                  {category}
                </button>

              ))}

            </div>

          </div>


          {/* ================= PRODUCT HEADER ================= */}

          <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-end
            sm:justify-between
            gap-3
            mb-6
          ">

            <div>

              <p className="text-white/40 text-sm">
                Showing results for
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                {selectedCategory === "All"
                  ? "All Products"
                  : selectedCategory}
              </h2>

            </div>


            <div className="
              w-fit
              px-4 py-2
              rounded-xl
              bg-white/10
              border border-white/10
              backdrop-blur-xl
              text-sm
            ">

              <span className="text-white font-bold">
                {filteredProducts.length}
              </span>

              <span className="text-white/50 ml-1">
                {filteredProducts.length === 1
                  ? "product"
                  : "products"}
              </span>

            </div>

          </div>


          {/* ================= PRODUCTS ================= */}

          {filteredProducts.length > 0 ? (

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-5
            ">

              {filteredProducts.map((item) => (

                <div
                  key={item._id}
                  className="
                    group
                    bg-white/[0.07]
                    backdrop-blur-2xl
                    border border-white/10
                    rounded-3xl
                    overflow-hidden
                    shadow-2xl
                    hover:bg-white/11
                    hover:border-white/20
                    hover:-translate-y-2
                    transition-all
                    duration-300
                  "
                >

                  {/* ================= IMAGE ================= */}

                  <div className="
                    relative
                    h-52
                    overflow-hidden
                    bg-white/5
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
                        📦
                      </div>

                    )}


                    {/* Category Badge */}

                    <div className="
                      absolute
                      top-3
                      left-3
                      px-3
                      py-1.5
                      rounded-full
                      bg-black/50
                      backdrop-blur-md
                      border border-white/10
                      text-white
                      text-xs
                      font-medium
                    ">
                      {item.category || "General"}
                    </div>

                  </div>


                  {/* ================= CONTENT ================= */}

                  <div className="p-5">

                    <div className="mb-4">

                      <h2 className="
                        text-lg
                        sm:text-xl
                        font-bold
                        text-white
                        truncate
                      ">
                        {item.name}
                      </h2>

                      <p className="text-sm text-white/40 mt-1">
                        {item.category || "General"} collection
                      </p>

                    </div>


                    {/* Price */}

                    <div className="flex items-center justify-between mb-5">

                      <div>

                        <p className="text-xs text-white/40">
                          Price
                        </p>

                        <p className="text-2xl font-black text-white">
                          ₹{item.price}
                        </p>

                      </div>


                      {/* Rating */}

                      <div className="
                        px-3
                        py-1.5
                        rounded-xl
                        bg-white/10
                        text-sm
                        text-white
                      ">
                        ⭐ {item.rating || 0}
                      </div>

                    </div>


                    {/* Buttons */}

                    <div className="grid grid-cols-2 gap-2">

                      <button
                        onClick={() => handleSeeAll(item._id)}
                        className="
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
                        Details
                      </button>


                      <button
                        onClick={() => handleAddCart(item)}
                        className="
                          py-2.5
                          rounded-xl
                          bg-white
                          text-black
                          text-sm
                          font-semibold
                          hover:bg-indigo-100
                          hover:scale-[1.02]
                          active:scale-95
                          transition-all
                          duration-300
                        "
                      >
                        Add Cart
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            /* ================= NO PRODUCTS ================= */

            <div className="
              min-h-87.5
              flex
              items-center
              justify-center
            ">

              <div className="
                max-w-md
                w-full
                text-center
                bg-white/10
                backdrop-blur-2xl
                border border-white/10
                rounded-3xl
                p-8
                shadow-2xl
              ">

                <div className="text-6xl mb-5">
                  🔎
                </div>

                <h2 className="text-2xl font-bold text-white">
                  No products found
                </h2>

                <p className="text-white/50 mt-2">
                  Try another search or choose a different category.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("All");
                  }}
                  className="
                    mt-6
                    px-6
                    py-3
                    rounded-xl
                    bg-white
                    text-black
                    font-semibold
                    hover:bg-indigo-100
                    active:scale-95
                    transition-all
                  "
                >
                  Clear Filters
                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Seepro;


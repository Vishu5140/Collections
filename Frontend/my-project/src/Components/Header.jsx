import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png/1.png";
import { useSelector } from "react-redux";
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  // cart count
const cartItems = useSelector((state) => state.cart.cartItems);
const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const isProductDetails =
    location.pathname.startsWith("/detail/") ||
    location.pathname.startsWith("/user/detail/") ||
    location.pathname.startsWith("/user/Bdetail/");

  const isHome = location.pathname.startsWith("/user");

  const isLogoutButton =
    location.pathname.startsWith("/home") ||
    location.pathname.startsWith("/user");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("cartItems");
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/20">

      {/* Glow */}
      <div className="absolute top-0 left-1/4 w-72 h-20 bg-indigo-500/10 blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= TOP HEADER ================= */}
        <div className="h-20 flex items-center justify-between">

          {/* ================= LOGO ================= */}
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex items-center gap-3"
          >
            <div
              className="
                relative
                w-12 h-12
                sm:w-14 sm:h-14
                rounded-2xl
                bg-white
                flex items-center justify-center
                shadow-lg
                shadow-indigo-500/10
                overflow-hidden
                group-hover:scale-105
                transition-all duration-300
              "
            >
              <img
                src={logo}
                alt="Collection logo"
                className="w-full h-full object-contain p-1"
              />

              {/* Logo glow */}
              <div className="absolute inset-0 bg-linear-to-tr from-indigo-500/10 to-transparent pointer-events-none"></div>
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Collection
              </h1>

              <p className="hidden sm:block text-[10px] uppercase tracking-[0.25em] text-slate-500">
                Your world. Your collection.
              </p>
            </div>
          </Link>


          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden md:block">

            <ul className="flex items-center gap-1">

              {/* Shop */}
              <li>
                <Link
                  to="/user/getAll"
                  className={`
                    group relative
                    flex items-center gap-2
                    px-4 py-2.5
                    rounded-xl
                    text-sm font-medium
                    transition-all duration-300
                    ${
                      location.pathname === "/user/getAll"
                        ? "text-white bg-white/10"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <span className="text-base">🛍️</span>
                  Shop

                  {location.pathname === "/user/getAll" && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-indigo-400 rounded-full"></span>
                  )}
                </Link>
              </li>


              {/* Cart */}
              <li>
                <Link
                  to="/user/cart"
                  className={`
                    group relative
                    flex items-center gap-2
                    px-4 py-2.5
                    rounded-xl
                    text-sm font-medium
                    transition-all duration-300
                    ${
                      location.pathname === "/user/cart"
                        ? "text-white bg-white/10"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <span className="text-base">🛒</span>
                  Cart
                   {cartCount > 0 && (
          <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {cartCount}
          </span>
        )}
                  {location.pathname === "/user/cart" && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-indigo-400 rounded-full"></span>
                  )}
                </Link>
              </li>


              {/* Home */}
              {isHome && (
                <li>
                  <Link
                    to="/home"
                    className={`
                      flex items-center gap-2
                      px-4 py-2.5
                      rounded-xl
                      text-sm font-medium
                      transition-all duration-300
                      ${
                        location.pathname === "/home"
                          ? "text-white bg-white/10"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    <span>⌂</span>
                    Home
                  </Link>
                </li>
              )}


              {/* All Products */}
              {isProductDetails && (
                <li>
                  <Link
                    to="/user/getAll"
                    className="
                      flex items-center gap-2
                      px-4 py-2.5
                      rounded-xl
                      text-sm font-medium
                      text-slate-400
                      hover:text-white
                      hover:bg-white/5
                      transition-all duration-300
                    "
                  >
                    <span>←</span>
                    All Products
                  </Link>
                </li>
              )}

    
       {/* My Orders */}
     <li>
    <Link
    to="/user/getAllOrder"
    className="
      group flex items-center gap-3
      rounded-xl
      border border-transparent
      px-4 py-3
      text-sm font-semibold
      text-slate-400
      transition-all duration-300
      hover:border-white/10
      hover:bg-white/10
      hover:text-white
      hover:shadow-lg hover:shadow-indigo-500/10
    "
      >
    {/* Order Icon */}
     <span
      className="
        flex h-9 w-9 items-center justify-center
        rounded-lg
        bg-white/5
        text-lg
        transition-all duration-300
        group-hover:bg-indigo-500/20
        group-hover:scale-110
      "
    >
      🛍️
    </span>

    {/* Text */}
    <span className="flex-1">
      My Orders
    </span>

    {/* Arrow */}
    <span
      className="
        text-slate-500
        transition-transform duration-300
        group-hover:translate-x-1
        group-hover:text-indigo-400
      "
    >
      →
    </span>
  </Link>
</li>



              {/* Divider */}
              {isLogoutButton && (
                <div className="h-7 w-px bg-white/10 mx-2"></div>
              )}


              {/* Logout */}
              {isLogoutButton && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="
                      group
                      flex items-center gap-2
                      px-4 py-2.5
                      rounded-xl
                      text-sm font-semibold
                      text-slate-400
                      border border-white/10
                      bg-white/3
                      hover:text-white
                      hover:bg-red-500/10
                      hover:border-red-400/20
                      transition-all duration-300
                    "
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      ↪
                    </span>

                    Logout
                  </button>
                </li>
              )}

            </ul>

          </nav>


          {/* ================= MOBILE BUTTON ================= */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              md:hidden
              w-11 h-11
              flex items-center justify-center
              rounded-xl
              bg-white/5
              border border-white/10
              text-slate-300
              hover:text-white
              hover:bg-white/10
              transition-all duration-300
            "
            aria-label="Toggle menu"
          >

            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}

          </button>

        </div>


        {/* ================= MOBILE MENU ================= */}
        {menuOpen && (
          <div className="md:hidden pb-5">

            <nav className="
              p-3
              rounded-2xl
              bg-white/4
              backdrop-blur-2xl
              border border-white/10
              shadow-xl
            ">

              <ul className="flex flex-col gap-1">

                {/* Shop */}
                <li>
                  <Link
                    to="/user/getAll"
                    onClick={closeMenu}
                    className={`
                      flex items-center gap-3
                      px-4 py-3
                      rounded-xl
                      font-medium
                      transition-all duration-300
                      ${
                        location.pathname === "/user/getAll"
                          ? "bg-indigo-500/15 text-white border border-indigo-400/10"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                      🛍️
                    </span>

                    <span>Shop</span>
                  </Link>
                </li>


                {/* Cart */}
                <li>
                  <Link
                    to="/user/cart"
                    onClick={closeMenu}
                    className={`
                      flex items-center gap-3
                      px-4 py-3
                      rounded-xl
                      font-medium
                      transition-all duration-300
                      ${
                        location.pathname === "/user/cart"
                          ? "bg-indigo-500/15 text-white border border-indigo-400/10"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                      🛒
                    </span>

                    <span>Cart</span>
                     {cartCount > 0 && (
          <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {cartCount}
          </span>
        )}
                  </Link>
                </li>


                {/* Home */}
                {isHome && (
                  <li>
                    <Link
                      to="/home"
                      onClick={closeMenu}
                      className="
                        flex items-center gap-3
                        px-4 py-3
                        rounded-xl
                        text-slate-400
                        font-medium
                        hover:text-white
                        hover:bg-white/5
                        transition-all duration-300
                      "
                    >
                      <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                        ⌂
                      </span>

                      <span>Home</span>
                    </Link>
                  </li>
                )}

                 
{/* My Orders */}
<li>
  <Link
    to="/user/getAllOrder"
    className="
      group flex items-center gap-3
      rounded-xl
      border border-transparent
      px-4 py-3
      text-sm font-semibold
      text-slate-400
      transition-all duration-300
      hover:border-white/10
      hover:bg-white/10
      hover:text-white
      hover:shadow-lg hover:shadow-indigo-500/10
    "
  >
    {/* Order Icon */}
    <span
      className="
        flex h-9 w-9 items-center justify-center
        rounded-lg
        bg-white/5
        text-lg
        transition-all duration-300
        group-hover:bg-indigo-500/20
        group-hover:scale-110
      "
    >
      🛍️
    </span>

    {/* Text */}
    <span className="flex-1">
      My Orders
    </span>

    {/* Arrow */}
    <span
      className="
        text-slate-500
        transition-transform duration-300
        group-hover:translate-x-1
        group-hover:text-indigo-400
      "
    >
      →
    </span>
  </Link>
</li>


                {/* All Products */}
                {isProductDetails && (
                  <li>
                    <Link
                      to="/user/getAll"
                      onClick={closeMenu}
                      className="
                        flex items-center gap-3
                        px-4 py-3
                        rounded-xl
                        text-slate-400
                        font-medium
                        hover:text-white
                        hover:bg-white/5
                        transition-all duration-300
                      "
                    >
                      <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                        ←
                      </span>

                      <span>All Products</span>
                    </Link>
                  </li>
                )}


                {/* Divider */}
                {isLogoutButton && (
                  <div className="h-px bg-white/10 my-2"></div>
                )}


                {/* Logout */}
                {isLogoutButton && (
                  <li>
                    <button
                      onClick={handleLogout}
                      className="
                        w-full
                        flex items-center gap-3
                        px-4 py-3
                        rounded-xl
                        text-red-400
                        font-medium
                        hover:text-red-300
                        hover:bg-red-500/10
                        transition-all duration-300
                      "
                    >
                      <span className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
                        ↪
                      </span>

                      <span>Logout</span>
                    </button>
                  </li>
                )}

              </ul>

            </nav>

          </div>
        )}

      </div>
    </header>
  );
}

export default Header;


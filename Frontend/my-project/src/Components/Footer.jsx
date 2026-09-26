import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-300">

      {/* ================= BACKGROUND GLOW ================= */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-40 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* ================= TOP CTA ================= */}
        <div className="py-12 sm:py-16">

          <div
            className="
              relative overflow-hidden
              rounded-3xl
              border border-white/10
              bg-linear-to-br from-white/8 to-white/2
              backdrop-blur-xl
              px-6 py-8
              sm:px-10 sm:py-10
              lg:flex lg:items-center lg:justify-between
            "
          >

            {/* CTA glow */}
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl"></div>

            <div className="relative">

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-400 mb-3">
                Stay in the loop
              </p>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Discover something new.
              </h2>

              <p className="mt-2 max-w-xl text-sm sm:text-base text-slate-400">
                Explore our latest products, collections and updates.
              </p>

            </div>


            {/* CTA Button */}
            <Link
              to="/user/getAll"
              className="
                relative
                inline-flex
                items-center
                justify-center
                gap-2
                mt-6 lg:mt-0
                px-6 py-3
                rounded-xl
                bg-white
                text-slate-950
                font-bold
                text-sm
                shadow-lg
                hover:bg-slate-100
                hover:-translate-y-0.5
                transition-all duration-300
              "
            >
              Explore Collection
              <span className="text-lg">→</span>
            </Link>

          </div>

        </div>


        {/* ================= MAIN FOOTER ================= */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-10
            lg:gap-16
            pb-12
          "
        >

          {/* ================= BRAND ================= */}
          <div className="lg:col-span-2">

            <Link
              to="/"
              className="inline-flex items-center gap-3 group"
            >

              {/* Logo box */}
              <div
                className="
                  w-12 h-12
                  rounded-2xl
                  bg-white
                  flex items-center justify-center
                  shadow-lg
                  group-hover:scale-105
                  transition-transform duration-300
                "
              >
                <span className="text-slate-950 font-black text-xl">
                  C
                </span>
              </div>

              <span className="text-2xl font-black tracking-tight text-white">
                Collection
              </span>

            </Link>


            <p className="mt-5 max-w-md text-sm sm:text-base leading-7 text-slate-400">
              A modern shopping experience built for discovering
              products you love. Simple, beautiful and made for everyone.
            </p>


            {/* Social Buttons */}
            <div className="flex items-center gap-3 mt-6">

              <a
                href="#"
                className="
                  w-10 h-10
                  flex items-center justify-center
                  rounded-xl
                  border border-white/10
                  bg-white/4
                  text-slate-400
                  hover:text-white
                  hover:bg-white/10
                  hover:-translate-y-1
                  transition-all duration-300
                "
              >
                𝕏
              </a>

              <a
                href="#"
                className="
                  w-10 h-10
                  flex items-center justify-center
                  rounded-xl
                  border border-white/10
                  bg-white/4
                  text-slate-400
                  hover:text-white
                  hover:bg-white/10
                  hover:-translate-y-1
                  transition-all duration-300
                "
              >
                in
              </a>

              <a
                href="#"
                className="
                  w-10 h-10
                  flex items-center justify-center
                  rounded-xl
                  border border-white/10
                  bg-white/4
                  text-slate-400
                  hover:text-white
                  hover:bg-white/10
                  hover:-translate-y-1
                  transition-all duration-300
                "
              >
                ◎
              </a>

              <a
                href="#"
                className="
                  w-10 h-10
                  flex items-center justify-center
                  rounded-xl
                  border border-white/10
                  bg-white/4
                  text-slate-400
                  hover:text-white
                  hover:bg-white/10
                  hover:-translate-y-1
                  transition-all duration-300
                "
              >
                ▶
              </a>

            </div>

          </div>


          {/* ================= QUICK LINKS ================= */}
          <div>

            <h3 className="text-sm font-bold uppercase tracking-widest text-white">
              Explore
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <Link
                  to="/home"
                  className="
                    group inline-flex items-center gap-2
                    text-sm text-slate-400
                    hover:text-white
                    transition
                  "
                >
                  <span className="opacity-0 group-hover:opacity-100 transition">
                    →
                  </span>
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/user/getAll"
                  className="
                    group inline-flex items-center gap-2
                    text-sm text-slate-400
                    hover:text-white
                    transition
                  "
                >
                  <span className="opacity-0 group-hover:opacity-100 transition">
                    →
                  </span>
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  to="/user/cart"
                  className="
                    group inline-flex items-center gap-2
                    text-sm text-slate-400
                    hover:text-white
                    transition
                  "
                >
                  <span className="opacity-0 group-hover:opacity-100 transition">
                    →
                  </span>
                  Cart
                </Link>
              </li>

            </ul>

          </div>


          {/* ================= COMPANY ================= */}
          <div>

            <h3 className="text-sm font-bold uppercase tracking-widest text-white">
              Company
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <Link
                  to="/about"
                  className="
                    group inline-flex items-center gap-2
                    text-sm text-slate-400
                    hover:text-white
                    transition
                  "
                >
                  <span className="opacity-0 group-hover:opacity-100 transition">
                    →
                  </span>
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="
                    group inline-flex items-center gap-2
                    text-sm text-slate-400
                    hover:text-white
                    transition
                  "
                >
                  <span className="opacity-0 group-hover:opacity-100 transition">
                    →
                  </span>
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="
                    group inline-flex items-center gap-2
                    text-sm text-slate-400
                    hover:text-white
                    transition
                  "
                >
                  <span className="opacity-0 group-hover:opacity-100 transition">
                    →
                  </span>
                  My Profile
                </Link>
              </li>

            </ul>

          </div>

        </div>


        {/* ================= DIVIDER ================= */}
        <div className="border-t border-white/10"></div>


        {/* ================= BOTTOM ================= */}
        <div
          className="
            py-6
            flex flex-col
            sm:flex-row
            items-center
            justify-between
            gap-3
          "
        >

          <p className="text-xs sm:text-sm text-slate-500 text-center sm:text-left">
            © 2026 Collection. All rights reserved.
          </p>


          <div className="flex items-center gap-5 text-xs sm:text-sm text-slate-500">

            <Link
              to="/privacy"
              className="hover:text-white transition"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="hover:text-white transition"
            >
              Terms
            </Link>

            <span className="hidden sm:block text-slate-700">
              •
            </span>

            <span>
              Made with <span className="text-red-400">♥</span>
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;


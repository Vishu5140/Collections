import { useNavigate } from "react-router-dom";

function AdminHome() {
  const adminName = localStorage.getItem("name") || "Admin";
  const navigate = useNavigate();
  const handleLogout=()=>{
     localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-6 sm:px-6 lg:px-8">

      {/* ================= BACKGROUND GLOW ================= */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl"></div>

      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>


      {/* ================= MAIN ================= */}
      <div className="relative z-10 max-w-7xl mx-auto">


        {/* ================= TOP HEADER ================= */}
        <div
          className="
            bg-white/[0.07]
            backdrop-blur-2xl
            border border-white/10
            rounded-3xl
            shadow-2xl
            p-5 sm:p-7 lg:p-8
            mb-6
          "
        >

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

            {/* Welcome */}
            <div>

              <div className="flex items-center gap-3 mb-3">

                <div
                  className="
                    w-11 h-11
                    rounded-xl
                    bg-white/10
                    border border-white/10
                    flex items-center justify-center
                    text-xl
                  "
                >
                  👑
                </div>

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
                  Admin Panel
                </span>

              </div>

              <h1
                className="
                  text-2xl
                  sm:text-3xl
                  lg:text-4xl
                  font-bold
                  text-white
                "
              >
                Welcome, {adminName} 👋
              </h1>

              <p className="text-gray-400 mt-2 max-w-xl">
                Manage your collection store, products, users and orders
                from one place.
              </p>

            </div>


            {/* Admin Status */}
            <div
              className="
                shrink-0
                bg-white/5
                border border-white/10
                rounded-2xl
                px-4 py-3
              "
            >
              <p className="text-gray-500 text-xs">
                Account
              </p>

              <p className="text-emerald-400 font-semibold mt-1">
                ● Administrator
              </p>
            </div>
            <button
          onClick={() => handleLogout()}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition cursor-pointer"
        >
          Logout
        </button>
          </div>

        </div>


        {/* ================= DASHBOARD TITLE ================= */}
        <div className="mb-4">

          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Store Management
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Manage the important parts of your store.
          </p>

        </div>


        {/* ================= DASHBOARD CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">


          {/* PRODUCTS */}
          <div
            onClick={() => navigate("/getApro")}
            className="
              group
              cursor-pointer
              bg-white/[0.07]
              backdrop-blur-2xl
              border border-white/10
              rounded-2xl
              p-5
              shadow-xl
              hover:bg-white/11
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            <div
              className="
                w-12 h-12
                rounded-xl
                bg-indigo-500/20
                border border-indigo-400/20
                flex items-center justify-center
                text-2xl
                group-hover:scale-110
                transition
              "
            >
              📦
            </div>

            <h3 className="text-lg font-semibold text-white mt-4">
              Products
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Add, update and manage your products.
            </p>

            <p className="text-indigo-400 text-sm font-medium mt-4">
              Manage Products →
            </p>

          </div>


         
          {/* USERS */}
          <div
            onClick={() => navigate("/allUsers")}
            className="
              group
              cursor-pointer
              bg-white/[0.07]
              backdrop-blur-2xl
              border border-white/10
              rounded-2xl
              p-5
              shadow-xl
              hover:bg-white/11
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            <div
              className="
                w-12 h-12
                rounded-xl
                bg-purple-500/20
                border border-purple-400/20
                flex items-center justify-center
                text-2xl
                group-hover:scale-110
                transition
              "
            >
              👥
            </div>

            <h3 className="text-lg font-semibold text-white mt-4">
              Users
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              View and manage registered users.
            </p>

            <p className="text-purple-400 text-sm font-medium mt-4">
              Manage Users →
            </p>

          </div>

        </div>


        {/* ================= QUICK ACTIONS ================= */}
        <div
          className="
            mt-6
            bg-white/[0.07]
            backdrop-blur-2xl
            border border-white/10
            rounded-3xl
            shadow-2xl
            p-5 sm:p-7
          "
        >

          <div className="mb-5">

            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Quick Actions
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Quickly access the most-used admin functions.
            </p>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">


            {/* ADD PRODUCT */}
            <button
              onClick={() => navigate("/createProduct")}
              className="
                group
                flex items-center justify-between
                bg-white
                text-black
                px-5 py-4
                rounded-2xl
                font-semibold
                hover:bg-gray-200
                hover:-translate-y-1
                active:scale-[0.98]
                transition-all
                duration-300
              "
            >

              <div className="flex items-center gap-3">

                <span className="text-xl">
                  ＋
                </span>

                <span>
                  Add Product
                </span>

              </div>

              <span className="text-lg">
                →
              </span>

            </button>


            

          </div>

        </div>


        {/* ================= ADMIN TIP ================= */}
        <div
          className="
            mt-6
            bg-indigo-500/10
            border border-indigo-400/10
            rounded-2xl
            p-4 sm:p-5
          "
        >

          <div className="flex items-start gap-3">

            <span className="text-xl">
              💡
            </span>

            <div>

              <p className="text-indigo-300 font-semibold">
                Admin Dashboard
              </p>

              <p className="text-gray-500 text-sm mt-1">
                Use the quick actions above to manage your store efficiently.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminHome;

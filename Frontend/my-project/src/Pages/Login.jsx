import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "https://collections-backend-qguh.onrender.com/auth/login",
        formData
      );

      console.log(res.data);

      // Store login information
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId",res.data.id);
      localStorage.setItem("name",res.data.name);

      // Navigate according to role
      if (res.data.role === "admin") {
        navigate("/admin/home");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.log("Backend res", error.response);

      alert(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">

      {/* ======================================
          BACKGROUND GLOW
      ====================================== */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />

        <div className="absolute -bottom-40 -right-32 h-112.5 w-112.5 rounded-full bg-purple-600/25 blur-3xl" />

        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      </div>


      {/* ======================================
          MAIN
      ====================================== */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">

        <div className="grid w-full max-w-6xl overflow-hidden rounded-4xl border border-white/10 bg-white/6 shadow-2xl backdrop-blur-2xl lg:grid-cols-2">


          {/* ======================================
              LEFT SIDE
          ====================================== */}

          <div className="relative hidden overflow-hidden bg-linear-to-br from-indigo-600 via-purple-600 to-slate-950 p-10 lg:flex lg:flex-col lg:justify-between">

            {/* Decorative circles */}

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />

            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/10" />

            <div className="absolute right-20 top-32 h-20 w-20 rounded-full bg-white/10 blur-xl" />


            {/* Brand */}

            <div className="relative">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl shadow-xl backdrop-blur">
                  ✦
                </div>

                <div>

                  <p className="text-xl font-bold text-white">
                    Collection
                  </p>

                  <p className="text-xs text-indigo-200">
                    Your world. Your collection.
                  </p>

                </div>

              </div>

            </div>


            {/* Main Text */}

            <div className="relative">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">

                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />

                <span className="text-xs font-medium text-white">
                  Welcome back
                </span>

              </div>

              <h1 className="max-w-lg text-5xl font-black leading-tight tracking-tight text-white">
                Everything you love,
                <span className="block text-indigo-200">
                  in one place.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-indigo-100/70">
                Sign in to continue exploring your collection,
                manage your products and enjoy your personalized
                shopping experience.
              </p>


              {/* Floating Cards */}

              <div className="mt-8 flex gap-4">

                <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">

                  <p className="text-2xl font-bold text-white">
                    ✨
                  </p>

                  <p className="mt-1 text-xs text-indigo-100/70">
                    Personalized
                  </p>

                </div>


                <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">

                  <p className="text-2xl font-bold text-white">
                    🛍️
                  </p>

                  <p className="mt-1 text-xs text-indigo-100/70">
                    Easy Shopping
                  </p>

                </div>


                <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">

                  <p className="text-2xl font-bold text-white">
                    🔐
                  </p>

                  <p className="mt-1 text-xs text-indigo-100/70">
                    Secure
                  </p>

                </div>

              </div>

            </div>


            {/* Bottom */}

            <div className="relative flex items-center gap-2 text-xs text-indigo-200/60">

              <span className="h-1.5 w-1.5 rounded-full bg-indigo-300" />

              Secure authentication
            </div>

          </div>


          {/* ======================================
              RIGHT LOGIN PANEL
          ====================================== */}

          <div className="flex items-center justify-center bg-slate-950/50 p-5 sm:p-8 lg:p-12">

            <div className="w-full max-w-md">


              {/* Mobile Logo */}

              <div className="mb-8 text-center lg:hidden">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 text-2xl text-white shadow-lg shadow-indigo-500/20">
                  ✦
                </div>

                <h2 className="mt-4 text-xl font-bold text-white">
                  Collection
                </h2>

              </div>


              {/* Heading */}

              <div className="mb-8">

                <div className="mb-4 inline-flex items-center rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5">

                  <span className="text-xs font-semibold text-indigo-300">
                    ACCOUNT LOGIN
                  </span>

                </div>

                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Welcome
                  <span className="text-indigo-400"> back.</span>
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Enter your details to access your account.
                </p>

              </div>


              {/* ======================================
                  FORM
              ====================================== */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Email */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Email Address
                  </label>

                  <div className="group relative">

                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition group-focus-within:text-indigo-400">
                      @
                    </span>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-white/5
                        px-11
                        py-3.5
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-slate-600
                        transition
                        focus:border-indigo-500
                        focus:bg-white/8
                        focus:ring-4
                        focus:ring-indigo-500/10
                      "
                    />

                  </div>

                </div>


                {/* Password */}

                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-slate-300"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-medium text-indigo-400 hover:text-indigo-300"
                    >
                      Forgot password?
                    </button>

                  </div>

                  <div className="group relative">

                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition group-focus-within:text-indigo-400">
                      🔒
                    </span>

                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-white/5
                        px-11
                        py-3.5
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-slate-600
                        transition
                        focus:border-indigo-500
                        focus:bg-white/8
                        focus:ring-4
                        focus:ring-indigo-500/10
                      "
                    />

                  </div>

                </div>


                {/* Remember */}

                <div className="flex items-center gap-2">

                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer rounded border-white/10 bg-white/5 accent-indigo-600"
                  />

                  <label
                    htmlFor="remember"
                    className="cursor-pointer text-xs text-slate-500"
                  >
                    Remember me
                  </label>

                </div>


                {/* Login Button */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    group
                    relative
                    w-full
                    overflow-hidden
                    rounded-xl
                    bg-linear-to-r
                    from-indigo-600
                    via-purple-600
                    to-indigo-600
                    bg-size-[200%_100%]
                    py-3.5
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-indigo-500/20
                    transition-all
                    duration-500
                    hover:bg-right
                    hover:-translate-y-0.5
                    hover:shadow-indigo-500/30
                    active:scale-[0.98]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  <span className="relative z-10 flex items-center justify-center gap-2">

                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Login
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </>
                    )}

                  </span>

                </button>

              </form>


              {/* Divider */}

              <div className="my-7 flex items-center gap-3">

                <div className="h-px flex-1 bg-white/10" />

                <span className="text-xs text-slate-600">
                  SECURE LOGIN
                </span>

                <div className="h-px flex-1 bg-white/10" />

              </div>


              {/* Security */}

              <div className="flex items-center justify-center gap-2 text-xs text-slate-600">

                <span>🔐</span>

                <span>
                  Your credentials are protected
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;


import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

       await axios.post(
        "https://collections-backend-qguh.onrender.com/auth/register",
        formData
      );
      navigate("/login");
    } catch (error) {
      console.log("Backend res", error.response);

      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center px-4 py-8">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl"></div>

      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/25 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>


      {/* Main Card */}
      <div className="relative w-full max-w-6xl min-h-162.5 bg-white/6 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex relative overflow-hidden bg-linear-to-br from-indigo-600 via-purple-600 to-slate-950 p-12 flex-col justify-between">

          {/* Decorative Circles */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-white/10"></div>

          <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full border border-white/10"></div>

          <div className="absolute top-1/2 right-10 w-20 h-20 rounded-full bg-white/10 blur-xl"></div>


          {/* Logo */}
          <div className="relative">
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-white text-indigo-600 flex items-center justify-center font-black text-xl shadow-xl">
                C
              </div>

              <span className="text-white text-2xl font-bold tracking-tight">
                Collection
              </span>

            </div>
          </div>


          {/* Main Content */}
          <div className="relative">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white/90 text-sm mb-6">

              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>

              Join the Collection
            </div>


            <h1 className="text-5xl xl:text-6xl font-black text-white leading-tight">

              Create your
              <br />

              <span className="text-white/70">
                own experience.
              </span>

            </h1>


            <p className="mt-6 text-white/70 text-base leading-relaxed max-w-md">

              Create your account and discover a simple,
              modern and personalized shopping experience
              built just for you.

            </p>


            {/* Features */}
            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                  ✨
                </div>

                <div>
                  <p className="text-white font-semibold">
                    Personalized Experience
                  </p>

                  <p className="text-white/50 text-sm">
                    Everything in one place
                  </p>
                </div>

              </div>


              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                  🛍️
                </div>

                <div>
                  <p className="text-white font-semibold">
                    Easy Shopping
                  </p>

                  <p className="text-white/50 text-sm">
                    Browse and manage your collection
                  </p>
                </div>

              </div>


              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                  🔒
                </div>

                <div>
                  <p className="text-white font-semibold">
                    Secure Account
                  </p>

                  <p className="text-white/50 text-sm">
                    Your account stays protected
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* Bottom */}
          <p className="relative text-white/40 text-xs">
            Collection • Start something new
          </p>

        </div>


        {/* RIGHT SIDE */}
        <div className="relative bg-slate-950/60 p-6 sm:p-10 lg:p-12 flex items-center">

          <div className="w-full max-w-md mx-auto">

            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-3 mb-10">

              <div className="w-10 h-10 rounded-xl bg-white text-indigo-600 flex items-center justify-center font-black text-lg">
                C
              </div>

              <span className="text-white text-xl font-bold">
                Collection
              </span>

            </div>


            {/* Heading */}
            <div className="mb-8">

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/10 text-indigo-300 text-xs font-medium mb-4">

                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>

                Create Account
              </div>


              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Welcome aboard 🚀
              </h2>

              <p className="mt-3 text-slate-400 text-sm sm:text-base">
                Create your account and let's get started.
              </p>

            </div>


            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div>

                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    👤
                  </span>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="
                      w-full
                      pl-12 pr-4 py-3.5
                      rounded-xl
                      bg-white/5
                      border border-white/10
                      text-white
                      placeholder:text-slate-600
                      outline-none
                      focus:border-indigo-400/50
                      focus:bg-white/8
                      focus:ring-4
                      focus:ring-indigo-500/10
                      transition-all duration-300
                    "
                  />

                </div>

              </div>


              {/* Email */}
              <div>

                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    ✉
                  </span>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="
                      w-full
                      pl-12 pr-4 py-3.5
                      rounded-xl
                      bg-white/5
                      border border-white/10
                      text-white
                      placeholder:text-slate-600
                      outline-none
                      focus:border-indigo-400/50
                      focus:bg-white/8
                      focus:ring-4
                      focus:ring-indigo-500/10
                      transition-all duration-300
                    "
                  />

                </div>

              </div>


              {/* Password */}
              <div>

                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    🔒
                  </span>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    required
                    className="
                      w-full
                      pl-12 pr-4 py-3.5
                      rounded-xl
                      bg-white/5
                      border border-white/10
                      text-white
                      placeholder:text-slate-600
                      outline-none
                      focus:border-indigo-400/50
                      focus:bg-white/8
                      focus:ring-4
                      focus:ring-indigo-500/10
                      transition-all duration-300
                    "
                  />

                </div>

              </div>


              {/* Terms */}
              <div className="flex items-start gap-3">

                <input
                  type="checkbox"
                  required
                  className="mt-1 w-4 h-4 accent-indigo-500 cursor-pointer"
                />

                <p className="text-xs text-slate-500 leading-relaxed">

                  I agree to the{" "}
                  <span className="text-indigo-400 hover:text-indigo-300 cursor-pointer">
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span className="text-indigo-400 hover:text-indigo-300 cursor-pointer">
                    Privacy Policy
                  </span>

                </p>

              </div>


              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="
                  group
                  relative
                  w-full
                  overflow-hidden
                  py-3.5
                  rounded-xl
                  bg-linear-to-r
                  from-indigo-500
                  via-purple-500
                  to-pink-500
                  text-white
                  font-bold
                  shadow-xl
                  shadow-indigo-500/20
                  hover:shadow-purple-500/30
                  hover:-translate-y-0.5
                  active:scale-[0.98]
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  transition-all duration-300
                "
              >

                <span className="relative z-10 flex items-center justify-center gap-2">

                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </>
                  )}

                </span>

              </button>

            </form>


            {/* Login */}
            <div className="mt-7 text-center">

              <p className="text-sm text-slate-500">

                Already have an account?{" "}

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-indigo-400 font-semibold hover:text-indigo-300 hover:underline transition"
                >
                  Login
                </button>

              </p>

            </div>


            {/* Security */}
            <div className="mt-8 pt-6 border-t border-white/5">

              <div className="flex items-center justify-center gap-2 text-xs text-slate-600">

                <span>🔒</span>

                <span>
                  Your information is securely protected
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;

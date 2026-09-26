import { useNavigate } from "react-router-dom";

function Notfound() {
  const navigate = useNavigate();
const role=localStorage.getItem("role");
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center px-4">

      {/* Background Effects */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-2xl text-center">

        {/* 404 */}
        <div className="relative">

          <h1 className="text-[110px] sm:text-[160px] lg:text-[190px] font-black leading-none tracking-tighter text-white/10 select-none">
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl sm:text-8xl lg:text-9xl font-black bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              404
            </span>
          </div>

        </div>

        {/* Content */}
        <div className="mt-2">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium mb-5">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            Page not found
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Oops! This page disappeared.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or may have been moved.
            Let's get you back to your collection.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">

            <button
              onClick={()=>{role==='user' ? navigate('/home'):navigate('/admin/home')}}
              className="px-7 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
            >
              Go Back
            </button>

          </div>

        </div>

        {/* Bottom Brand */}
        <p className="mt-12 text-xs text-slate-600 tracking-widest uppercase">
          Collection • Keep exploring
        </p>

      </div>
    </div>
  );
}

export default Notfound;
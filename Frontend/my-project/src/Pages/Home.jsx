
import { useNavigate } from "react-router-dom";
import video from "../assets/ecom.mp4";
import axios from "axios";
function Home() {
  const navigate = useNavigate();

  const username = localStorage.getItem("name") || "User";

  const collections = [
    {
      title: "Books",
      description: "Explore books worth adding to your collection.",
      icon: "📚",
      color: "from-indigo-500 to-purple-500",
    },
    {
      title: "Technology",
      description: "Discover modern gadgets and technology.",
      icon: "💻",
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Food",
      description: "Find delicious products you'll love.",
      icon: "🍔",
      color: "from-orange-500 to-pink-500",
    },
  ];

  const features = [
    {
      icon: "🔎",
      title: "Discover",
      text: "Find products from different categories.",
    },
    {
      icon: "🛒",
      title: "Shop Easily",
      text: "Add products to your cart in seconds.",
    },
    {
      icon: "⚡",
      title: "Fast Experience",
      text: "Simple, clean and responsive shopping.",
    },
  ];
  
  const handleDelete=()=>{
    const id=localStorage.getItem("userId");
    const token=localStorage.getItem("token");
    axios.delete(`http://localhost:5000/auth/deleteUser/${id}`,{
      headers:{
        "Content-Type":"application/json",
         authorization:`Bearer ${token}`,
      }
    }).then((res)=>{
      localStorage.clear();
      console.log(res.data);
      navigate("/register");
    }).catch((error)=>{
      console.log(error.response);
  })
  }
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* ================= HERO ================= */}
     {/* ================= HERO ================= */}
<section className="relative min-h-[85vh] overflow-hidden">

  {/* Background Video */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 h-full w-full object-cover"
  >
    <source src={video} type="video/mp4" />
  </video>

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-indigo-950/40"></div>

  {/* Hero Content */}
  <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl items-center px-5 py-20 sm:px-8">

    <div className="max-w-3xl">

      {/* Welcome Badge */}
      <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md">

        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400"></span>

        Welcome back, {username}

      </div>


      {/* Heading */}
      <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">

        Discover.

        <span className="block bg-linear-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
          Collect.
        </span>

        <span className="block">
          Enjoy.
        </span>

      </h1>


      {/* Description */}
      <p className="mt-7 max-w-2xl text-base leading-7 text-gray-200 sm:text-lg">
        Explore amazing products, discover new collections and
        find everything you love in one beautiful shopping experience.
      </p>


      {/* Buttons */}
      <div className="mt-9 flex flex-col gap-4 sm:flex-row">

        <button
          onClick={() => navigate("/user/getAll")}
          className="group rounded-xl bg-indigo-600 px-8 py-4 font-bold text-white shadow-xl shadow-indigo-900/30 transition duration-300 hover:-translate-y-1 hover:bg-indigo-500"
        >
          Explore Products

          <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>


        <button
          onClick={() =>handleDelete()}
          className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/20"
        >
          Delete Account
        </button>

      </div>


      {/* Stats */}
      <div className="mt-12 flex flex-wrap gap-8 sm:gap-12">

        <div>
          <p className="text-2xl font-black text-white">
            1000+
          </p>
          <p className="mt-1 text-sm text-gray-300">
            Products
          </p>
        </div>

        <div className="h-12 w-px bg-white/20"></div>

        <div>
          <p className="text-2xl font-black text-white">
            10+
          </p>
          <p className="mt-1 text-sm text-gray-300">
            Categories
          </p>
        </div>

        <div className="h-12 w-px bg-white/20"></div>

        <div>
          <p className="text-2xl font-black text-white">
            24/7
          </p>
          <p className="mt-1 text-sm text-gray-300">
            Access
          </p>
        </div>

      </div>

    </div>

  </div>

  {/* Bottom Fade */}
  <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-950 to-transparent"></div>

</section>


      {/* ================= COLLECTIONS ================= */}
      <section className="bg-white px-5 py-20 text-gray-900 sm:px-8">

        <div className="mx-auto max-w-7xl">

          {/* Section Heading */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                Explore
              </p>

              <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                Popular Collections
              </h2>

              <p className="mt-3 text-gray-500">
                Find something that matches your interest.
              </p>
            </div>

            <button
              onClick={() => navigate("/user/getAll")}
              className="font-semibold text-indigo-600 hover:text-indigo-800"
            >
              View All →
            </button>

          </div>


          {/* Cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">

            {collections.map((collection) => (

              <div
                key={collection.title}
                className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >

                {/* Color Header */}
                <div
                  className={`relative flex h-44 items-center justify-center bg-linear-to-br ${collection.color}`}
                >

                  <div className="absolute inset-0 bg-black/10" />

                  <span className="relative text-7xl transition duration-500 group-hover:scale-125 group-hover:rotate-6">
                    {collection.icon}
                  </span>

                </div>


                <div className="p-6">

                  <h3 className="text-xl font-bold">
                    {collection.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {collection.description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}
      <section className="bg-slate-50 px-5 py-20 text-gray-900 sm:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              Why Collection?
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Everything made simple.
            </h2>

          </div>


          <div className="mt-12 grid gap-5 md:grid-cols-3">

            {features.map((feature) => (

              <div
                key={feature.title}
                className="group rounded-2xl border border-gray-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl transition group-hover:scale-110">
                  {feature.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-gray-500">
                  {feature.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="bg-white px-5 py-16 sm:px-8">

        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-700 px-6 py-14 text-center shadow-2xl sm:px-12">

          {/* Decorative circles */}
          <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-white/10" />

          <div className="relative">

            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-200">
              Start Exploring
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Find something you'll love.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-indigo-100">
              Browse our products and start building your collection today.
            </p>

          

          </div>

        </div>

      </section>


      {/* ================= BOTTOM ================= */}
      <section className="bg-slate-950 px-5 py-8 text-center">

        <p className="text-sm text-gray-500">
          Made for people who love to discover, collect and shop.
        </p>

        <p className="mt-2 text-xs text-gray-600">
          © 2026 Collection
        </p>

      </section>

    </main>
  );
}

export default Home;


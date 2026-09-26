import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Admin Registration:", formData);
     axios.post('http://localhost:5000/auth/adminCreate',formData).then((res)=>{
        console.log(res.data);
        navigate("/login");
     }).catch((error)=>{
        console.log(error.response)
     })
    // Connect your backend API here
    // axios.post("/api/admin/register", formData)
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden bg-gray-950 p-10 text-white lg:flex lg:flex-col lg:justify-center">
          <div className="max-w-md">

            {/* Admin Badge */}
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-600 text-2xl">
              ⚙
            </div>

            <h1 className="mt-8 text-4xl font-bold leading-tight">
              Collection
              <span className="block text-indigo-400">
                Admin Panel
              </span>
            </h1>

            <p className="mt-6 leading-7 text-gray-400">
              Create an administrator account to manage your collection
              platform. Administrators can manage products, collections,
              users, and other important parts of the application.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-6">

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold">
                    Manage Collections
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    Create, update, and remove collections from the platform.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold">
                    Manage Users
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    Monitor and manage registered users and their accounts.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold">
                    Full Control
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    Access administrative features from one secure dashboard.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* FORM SIDE */}
        <div className="p-6 sm:p-10 lg:p-12">
          <div className="mx-auto max-w-md">

            {/* Header */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Administrator
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                Create Admin Account
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Enter your details below to create a new administrator
                account.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter administrator name"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Admin Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@example.com"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Security Notice */}
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <div className="flex gap-3">

                  <span className="text-lg">
                    🔐
                  </span>

                  <p className="text-sm leading-6 text-yellow-800">
                    Administrator accounts have access to sensitive
                    application features. Keep your login credentials secure.
                  </p>

                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 px-6 py-3.5 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create Admin Account
              </button>

            </form>

            {/* Login */}
            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an admin account?{" "}

              <Link
                to="/admin/login"
                className="font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Admin Login
              </Link>
            </p>

          </div>
        </div>

      </div>
    </main>
  );
}

export default AdminRegister;

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../Components/BackButton";

function Adproduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select a product image");
      return;
    }

    if (!token) {
      alert("Please login again");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      // ==============================
      // STEP 1: Upload image
      // ==============================

      const imageData = new FormData();

      imageData.append("file", image);
      imageData.append("upload_preset", "Collection");

      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dgb456iiy/image/upload",
        {
          method: "POST",
          body: imageData,
        }
      );

      const cloudinaryData = await cloudinaryResponse.json();

      console.log("Cloudinary:", cloudinaryData);

      if (!cloudinaryResponse.ok) {
        console.log("Cloudinary error:", cloudinaryData);
        alert("Image upload failed");
        setLoading(false);
        return;
      }

      const imageUrl = cloudinaryData.secure_url;

      // ==============================
      // STEP 2: Send product
      // ==============================

      const response = await axios.post(
        "https://collections-backend-qguh.onrender.com/products/adproduct",
        {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          category: formData.category,
          stock: formData.stock,
          imageUrl: imageUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Product response:", response.data);

      alert("Product added successfully");

      navigate("/getApro");
    } catch (error) {
      console.log("Error:", error);

      console.log("Backend Error:", error.response?.data);

      alert(
        error.response?.data?.message ||
          "Something went wrong while adding product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 sm:px-6 lg:px-8">

      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
      </div>

      {/* Back Button */}
      <div className="relative z-10">
        <BackButton />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}
        <div className="mb-8 mt-4">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-indigo-300 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                Admin Panel
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Add New Product
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Create a new product and add it to your collection store.
                Keep your product information clear and attractive.
              </p>
            </div>

            {/* Product indicator */}
            <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur sm:block">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Store Management
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Product Creation
              </p>
            </div>

          </div>
        </div>

        {/* ================= MAIN CARD ================= */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl">

          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">

            {/* ================= LEFT PREVIEW ================= */}
            <div className="relative hidden overflow-hidden bg-linear-to-br from-indigo-600 via-purple-600 to-slate-900 p-8 lg:block">

              {/* Decorative circles */}
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10" />
              <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full border border-white/10" />

              <div className="relative flex h-full flex-col justify-between">

                <div>

                  <p className="text-sm font-medium text-indigo-200">
                    Product Studio
                  </p>

                  <h2 className="mt-3 text-3xl font-bold leading-tight text-white">
                    Build your next
                    <br />
                    best seller.
                  </h2>

                  <p className="mt-4 max-w-sm text-sm leading-6 text-indigo-100/80">
                    Add product details, pricing, stock and a high-quality
                    image to make your store look professional.
                  </p>

                </div>

                {/* Preview box */}
                <div className="mt-10 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">

                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-indigo-200">
                    Product Preview
                  </p>

                  <div className="overflow-hidden rounded-xl bg-white/10">

                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Product preview"
                        className="h-52 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-52 flex-col items-center justify-center text-center">

                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                          📷
                        </div>

                        <p className="text-sm font-medium text-white">
                          Image Preview
                        </p>

                        <p className="mt-1 text-xs text-indigo-100/60">
                          Your product image will appear here
                        </p>

                      </div>
                    )}

                  </div>

                  <div className="mt-4">

                    <p className="truncate text-lg font-semibold text-white">
                      {formData.name || "Your Product Name"}
                    </p>

                    <p className="mt-1 text-sm text-indigo-100/70">
                      {formData.category || "Product Category"}
                    </p>

                    <div className="mt-3 flex items-center justify-between">

                      <span className="text-xl font-bold text-white">
                        ₹{formData.price || "0"}
                      </span>

                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-indigo-100">
                        Stock: {formData.stock || "0"}
                      </span>

                    </div>

                  </div>

                </div>

              </div>
            </div>

            {/* ================= FORM ================= */}
            <div className="p-5 sm:p-8 lg:p-10">

              <div className="mb-7">

                <h2 className="text-xl font-bold text-slate-900">
                  Product Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Fill in the details below to create your product.
                </p>

              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* Product Name */}
                <div>

                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Product Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Premium Headphones"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />

                </div>

                {/* Description */}
                <div>

                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Write a short and attractive description..."
                    required
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />

                </div>

                {/* Price + Stock */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>

                    <label
                      htmlFor="price"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Price
                    </label>

                    <div className="relative">

                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium text-slate-500">
                        ₹
                      </span>

                      <input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-9 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                      />

                    </div>

                  </div>

                  <div>

                    <label
                      htmlFor="stock"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Stock
                    </label>

                    <input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="Available quantity"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    />

                  </div>

                </div>

                {/* Category */}
                <div>

                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Category
                  </label>

                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  >

                    <option value="">
                      Select category
                    </option>

                    <option value="books">
                      Books
                    </option>

                    <option value="Food">
                      Food
                    </option>

                    <option value="technology">
                      Technology
                    </option>

                    <option value="clothing">
                      Clothing
                    </option>

                    <option value="electronics">
                      Electronics
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                </div>

                {/* Image Upload */}
                <div>

                  <label
                    htmlFor="image"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Product Image
                  </label>

                  <label
                    htmlFor="image"
                    className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-7 text-center transition hover:border-indigo-400 hover:bg-indigo-50/50"
                  >

                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-xl transition group-hover:scale-110">
                      📸
                    </div>

                    <p className="text-sm font-semibold text-slate-700">
                      {image
                        ? image.name
                        : "Click to upload product image"}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      JPG, PNG, WEBP supported
                    </p>

                    <input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                      required
                      className="hidden"
                    />

                  </label>

                </div>

                {/* Summary */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
                      ✨
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Ready to publish?
                      </p>

                      <p className="text-xs text-slate-500">
                        Check your information before adding the product.
                      </p>
                    </div>

                  </div>

                </div>

                {/* Buttons */}
                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">

                  <button
                    type="button"
                    onClick={() => navigate("/getApro")}
                    className="w-full rounded-xl border border-slate-200 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-40"
                  >

                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <span>+</span>
                        Add Product
                      </>
                    )}

                  </button>

                </div>

              </form>

            </div>

          </div>
        </div>

        {/* Footer hint */}
        <p className="py-6 text-center text-xs text-slate-500">
          Admin Dashboard • Product Management
        </p>

      </div>
    </main>
  );
}

export default Adproduct;


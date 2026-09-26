
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../Components/BackButton";

function Updatepro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const token = localStorage.getItem("token");

  // ==============================
  // Get Existing Product
  // ==============================
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/getOne/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );

        const product = response.data.product;

        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          category: product.category || "",
          stock: product.stock || "",
        });
      } catch (error) {
        console.log("Error fetching product:", error.response);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id, token]);

  // ==============================
  // Handle Inputs
  // ==============================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==============================
  // Update Product
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const response = await axios.put(
        `http://localhost:5000/products/updateproduct/${id}`,
        {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          category: formData.category,
          stock: formData.stock,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Updated Product:", response.data);

      alert("Product updated successfully!");

      navigate("/getApro");
    } catch (error) {
      console.log("Update error:", error.response);

      alert(
        error.response?.data?.message ||
          "Failed to update product"
      );
    } finally {
      setUpdating(false);
    }
  };

  // ==============================
  // Loading
  // ==============================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

        <div className="text-center">

          <div className="mx-auto h-12 w-12 rounded-full border-4 border-slate-700 border-t-indigo-500 animate-spin" />

          <p className="mt-5 text-sm font-medium text-slate-400">
            Loading product...
          </p>

        </div>

      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-6 sm:px-6 lg:px-8">

      {/* =================================
          Background Decoration
      ================================= */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-3xl" />

      </div>

      {/* =================================
          Back Button
      ================================= */}
      <div className="relative z-20">
        <BackButton />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* =================================
            Header
        ================================= */}
        <div className="mb-8 mt-5">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">

                <span className="h-2 w-2 rounded-full bg-indigo-400" />

                <span className="text-xs font-medium text-indigo-300">
                  Admin Panel
                </span>

              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Update Product
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Edit your product information and keep your store
                up to date.
              </p>

            </div>

            {/* Product ID */}
            <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur sm:block">

              <p className="text-xs uppercase tracking-wider text-slate-500">
                Product ID
              </p>

              <p className="mt-1 max-w-48 truncate text-sm font-semibold text-white">
                {id}
              </p>

            </div>

          </div>

        </div>

        {/* =================================
            Main Card
        ================================= */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl">

          <div className="grid lg:grid-cols-[0.75fr_1.25fr]">

            {/* =================================
                LEFT PREVIEW
            ================================= */}
            <div className="relative hidden overflow-hidden bg-linear-to-br from-indigo-600 via-purple-600 to-slate-950 p-8 lg:block">

              {/* Decorative circles */}
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />

              <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full border border-white/10" />

              <div className="relative flex h-full flex-col justify-between">

                <div>

                  <p className="text-sm font-medium text-indigo-200">
                    Product Studio
                  </p>

                  <h2 className="mt-3 text-3xl font-bold leading-tight text-white">
                    Refine your
                    <br />
                    product.
                  </h2>

                  <p className="mt-4 max-w-sm text-sm leading-6 text-indigo-100/75">
                    Update pricing, stock, category and product
                    information without leaving your admin panel.
                  </p>

                </div>

                {/* Product Preview */}
                <div className="mt-10 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">

                  <div className="mb-4 flex items-center justify-between">

                    <p className="text-xs font-medium uppercase tracking-wider text-indigo-200">
                      Live Preview
                    </p>

                    <span className="rounded-full bg-green-400/10 px-2.5 py-1 text-xs font-medium text-green-300">
                      Editing
                    </span>

                  </div>

                  {/* Fake Product Image */}
                  <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl bg-white/10">

                    <div className="text-center">

                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                        📦
                      </div>

                      <p className="mt-3 text-sm font-medium text-white">
                        Product Preview
                      </p>

                    </div>

                  </div>

                  {/* Preview Details */}
                  <div className="mt-5">

                    <p className="truncate text-xl font-bold text-white">
                      {formData.name || "Product Name"}
                    </p>

                    <p className="mt-1 truncate text-sm capitalize text-indigo-100/60">
                      {formData.category || "Category"}
                    </p>

                    <div className="mt-4 flex items-center justify-between">

                      <div>

                        <p className="text-xs text-indigo-100/50">
                          Price
                        </p>

                        <p className="text-2xl font-bold text-white">
                          ₹{formData.price || "0"}
                        </p>

                      </div>

                      <div className="text-right">

                        <p className="text-xs text-indigo-100/50">
                          Stock
                        </p>

                        <p className="text-lg font-semibold text-white">
                          {formData.stock || "0"}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* =================================
                FORM
            ================================= */}
            <div className="p-5 sm:p-8 lg:p-10">

              {/* Form Heading */}
              <div className="mb-7">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-lg">
                    ✏️
                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-slate-900">
                      Product Information
                    </h2>

                    <p className="text-sm text-slate-500">
                      Modify the details below.
                    </p>

                  </div>

                </div>

              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* =================================
                    PRODUCT NAME
                ================================= */}
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
                    placeholder="Enter product name"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />

                </div>

                {/* =================================
                    DESCRIPTION
                ================================= */}
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
                    placeholder="Describe your product..."
                    required
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />

                </div>

                {/* =================================
                    PRICE + STOCK
                ================================= */}
                <div className="grid gap-5 sm:grid-cols-2">

                  {/* Price */}
                  <div>

                    <label
                      htmlFor="price"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Price
                    </label>

                    <div className="relative">

                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-slate-500">
                        ₹
                      </span>

                      <input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-9 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                      />

                    </div>

                  </div>

                  {/* Stock */}
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
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    />

                  </div>

                </div>

                {/* =================================
                    CATEGORY
                ================================= */}
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

                    <option value="Electronics">
                      Electronics
                    </option>

                    <option value="Clothing">
                      Clothing
                    </option>

                    <option value="Shoes">
                      Shoes
                    </option>

                    <option value="Beauty">
                      Beauty
                    </option>

                    <option value="Books">
                      Books
                    </option>

                    <option value="Food">
                      Food
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

                {/* =================================
                    UPDATE INFO
                ================================= */}
                <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">

                  <div className="flex gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
                      💡
                    </div>

                    <div>

                      <p className="text-sm font-semibold text-indigo-900">
                        Before you update
                      </p>

                      <p className="mt-1 text-xs leading-5 text-indigo-700">
                        Make sure the product price, stock and
                        category are correct before saving changes.
                      </p>

                    </div>

                  </div>

                </div>

                {/* =================================
                    BUTTONS
                ================================= */}
                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">

                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full rounded-xl border border-slate-200 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={updating}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-44"
                  >

                    {updating ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <span>✓</span>
                        Update Product
                      </>
                    )}

                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

        {/* Footer */}
        <p className="py-6 text-center text-xs text-slate-500">
          Admin Dashboard • Product Management
        </p>

      </div>
    </main>
  );
}

export default Updatepro;


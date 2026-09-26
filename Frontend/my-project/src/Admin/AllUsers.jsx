import axios from "axios";
import { useEffect, useState } from "react";
import BackButton from "../Components/BackButton";
import { useNavigate } from "react-router-dom";

function AllUsers() {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
 const navigate=useNavigate();
  // ================= GET USERS =================
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(
          "https://collections-backend-qguh.onrender.com/auth/getAll",
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data.users);
        setData(res.data.users);
      } catch (error) {
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [token]);


  // ================= DELETE USER =================
  const handleDelete = (id) => {
    axios
      .delete(
        `https://collections-backend-qguh.onrender.com/auth/deleteUser/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);

        setData((prev) =>
          prev.filter((item) => item._id !== id)
        );
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

 const handleData=(id)=>{
  navigate(`/AuserDetail/${id}`);
 }
  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-slate-950
        px-4 py-6
        sm:px-6
        lg:px-8
      "
    >

      {/* ================= BACKGROUND GLOW ================= */}

      <div
        className="
          absolute
          -top-32
          -left-32
          w-80
          h-80
          bg-indigo-600/20
          rounded-full
          blur-3xl
        "
      ></div>

      <div
        className="
          absolute
          top-1/3
          -right-32
          w-96
          h-96
          bg-purple-600/20
          rounded-full
          blur-3xl
        "
      ></div>

      <div
        className="
          absolute
          bottom-0
          left-1/3
          w-80
          h-80
          bg-blue-600/10
          rounded-full
          blur-3xl
        "
      ></div>


      {/* ================= MAIN ================= */}

      <div className="relative z-10 max-w-7xl mx-auto">


        {/* ================= TOP BAR ================= */}

        <div className="flex items-center justify-between gap-4 mb-6">

          {/* Heading */}

          <div>

            <div className="flex items-center gap-2 mb-2">

              <span
                className="
                  px-3 py-1
                  rounded-full
                  bg-purple-500/20
                  border border-purple-400/20
                  text-purple-300
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                "
              >
                Admin
              </span>

              <span className="text-gray-600">
                /
              </span>

              <span className="text-gray-500 text-sm">
                Users
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
              All Users
            </h1>

            <p className="text-gray-500 text-sm sm:text-base mt-1">
              Manage and monitor all registered users.
            </p>

          </div>


          {/* Back Button */}

          <div className="shrink-0">
            <BackButton />
          </div>

        </div>


        {/* ================= USER STAT ================= */}

        <div
          className="
            mb-6
            bg-white/[0.07]
            backdrop-blur-2xl
            border border-white/10
            rounded-2xl
            shadow-xl
            p-5
            flex
            items-center
            justify-between
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                w-11 h-11
                rounded-xl
                bg-purple-500/20
                border border-purple-400/20
                flex items-center justify-center
                text-xl
              "
            >
              👥
            </div>

            <div>

              <p className="text-white font-semibold">
                User Management
              </p>

              <p className="text-gray-500 text-xs sm:text-sm">
                Registered accounts in your store
              </p>

            </div>

          </div>


          {/* Count */}

          <div className="text-right">

            <p className="text-2xl sm:text-3xl font-bold text-white">
              {Data.length}
            </p>

            <p className="text-gray-500 text-xs">
              Total Users
            </p>

          </div>

        </div>


        {/* ================= LOADING ================= */}

        {loading ? (

          <div
            className="
              bg-white/[0.07]
              backdrop-blur-2xl
              border border-white/10
              rounded-3xl
              p-12
              text-center
            "
          >

            <div
              className="
                w-12 h-12
                border-4
                border-white/20
                border-t-purple-500
                rounded-full
                animate-spin
                mx-auto
                mb-4
              "
            ></div>

            <p className="text-white font-medium">
              Loading users...
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Please wait a moment.
            </p>

          </div>

        ) : Data.length > 0 ? (

          /* ================= USER CARDS ================= */

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-5
              pb-8
            "
          >

            {Data.map((item) => (

              <div
                key={item._id}
                className="
                  group
                  bg-white/[0.07]
                  backdrop-blur-2xl
                  border border-white/10
                  rounded-2xl
                  shadow-xl
                  p-5
                  hover:bg-white/10
                  hover:-translate-y-1
                  hover:shadow-2xl
                  transition-all
                  duration-300
                "
              >

                {/* ================= USER HEADER ================= */}

                <div className="flex items-center gap-4">

                  {/* Avatar */}

                  <div
                    className="
                      relative
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-linear-to-br
                      from-indigo-500
                      to-purple-600
                      text-lg
                      font-bold
                      text-white
                      shadow-lg
                      group-hover:scale-105
                      transition-transform
                      duration-300
                    "
                  >
                    {item.name
                      ?.charAt(0)
                      .toUpperCase()}

                    {/* Online Dot */}

                    <span
                      className="
                        absolute
                        bottom-0
                        right-0
                        w-3
                        h-3
                        rounded-full
                        bg-emerald-400
                        border-2
                        border-slate-900
                      "
                    ></span>

                  </div>


                  {/* Name + Email */}

                  <div className="min-w-0 flex-1">

                    <h2
                      className="
                        text-lg
                        font-semibold
                        text-white
                        truncate
                      "
                    >
                      {item.name}
                    </h2>

                    <p
                      className="
                        text-sm
                        text-gray-500
                        truncate
                        mt-0.5
                      "
                    >
                      {item.email}
                    </p>

                  </div>

                </div>


                {/* ================= DIVIDER ================= */}

                <div className="my-5 border-t border-white/10"></div>


                {/* ================= USER DETAILS ================= */}

                <div className="space-y-4">


                  {/* Role */}

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-gray-500">
                      Role
                    </span>

                    <span
                      className={`
                        px-3 py-1
                        rounded-full
                        text-xs
                        font-semibold
                        capitalize
                        border

                        ${
                          item.role === "admin"
                            ? `
                              bg-red-500/10
                              text-red-400
                              border-red-400/20
                            `
                            : `
                              bg-emerald-500/10
                              text-emerald-400
                              border-emerald-400/20
                            `
                        }
                      `}
                    >
                      {item.role || "user"}
                    </span>

                  </div>


                  {/* User ID */}

                  <div>

                    <p className="text-sm text-gray-500 mb-1">
                      User ID
                    </p>

                    <div
                      className="
                        bg-black/20
                        border border-white/5
                        rounded-lg
                        px-3 py-2
                      "
                    >

                      <p
                        className="
                          text-xs
                          text-gray-400
                          truncate
                          font-mono
                        "
                      >
                        {item._id}
                      </p>

                    </div>

                  </div>

                </div>


                {/* ================= BUTTONS ================= */}

                <div className="mt-5 flex gap-3">

                  {/* VIEW */}

                  <button
                  onClick={() => handleData(item._id)}
                    className="
                      flex-1
                      rounded-xl
                      bg-white/5
                      border border-white/10
                      px-4 py-2.5
                      text-sm
                      font-medium
                      text-gray-300
                      hover:bg-white/10
                      hover:text-white
                      hover:-translate-y-0.5
                      active:scale-95
                      transition-all
                    "
                  >
                    View
                  </button>


                  {/* DELETE */}

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="
                      flex-1
                      rounded-xl
                      bg-red-500/10
                      border border-red-400/20
                      px-4 py-2.5
                      text-sm
                      font-medium
                      text-red-400
                      hover:bg-red-500
                      hover:text-white
                      hover:-translate-y-0.5
                      active:scale-95
                      transition-all
                    "
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* ================= EMPTY STATE ================= */

          <div
            className="
              bg-white/[0.07]
              backdrop-blur-2xl
              border border-white/10
              rounded-3xl
              p-12
              sm:p-16
              text-center
            "
          >

            <div
              className="
                w-16
                h-16
                mx-auto
                rounded-2xl
                bg-purple-500/10
                border border-purple-400/10
                flex
                items-center
                justify-center
                text-3xl
                mb-5
              "
            >
              👥
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white">
              No Users Found
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              There are no registered users yet.
            </p>

          </div>

        )}

      </div>
    </div>
  );
}

export default AllUsers;

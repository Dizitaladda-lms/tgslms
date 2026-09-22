import {

  FaHome,
  FaBook,
  FaVideo,
  FaUsers,
  FaCog,
  FaBookOpen,
  FaSignOutAlt,

} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

function DashboardSidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    // REMOVE USER DATA

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    // REDIRECT TO LANDING PAGE

    navigate("/");

  };

  return (

    <div className="w-72 bg-[#16245c] text-white min-h-screen fixed flex flex-col justify-between p-10">

      {/* TOP */}

      <div>

        <h1 className="text-5xl font-bold mb-20">

          DIZITAL ADDA

        </h1>

        {/* MENU */}

        <div className="space-y-10">

          <Link
            to="/admin"
            className="flex items-center gap-5 text-2xl font-semibold hover:text-blue-300 transition"
          >

            <FaHome />

            Dashboard

          </Link>

          <Link
            to="/admin/courses"
            className="flex items-center gap-5 text-2xl font-semibold hover:text-blue-300 transition"
          >

            <FaBook />

            Courses

          </Link>

          <Link
            to="/admin/content-manager"
            className="flex items-center gap-5 text-2xl font-semibold hover:text-blue-300 transition"
          >

            <FaVideo />

            Content Manager

          </Link>

          <Link
            to="/admin/students"
            className="flex items-center gap-5 text-2xl font-semibold hover:text-blue-300 transition"
          >
            <FaUsers />
            Students
          </Link>

          <Link
            to="/admin/blogs"
            className="flex items-center gap-5 text-2xl font-semibold hover:text-blue-300 transition"
          >
            <FaBookOpen />
            Blogs
          </Link>

          <Link
            to="/admin/settings"
            className="flex items-center gap-5 text-2xl font-semibold hover:text-blue-300 transition"
          >
            <FaCog />
            Settings
          </Link>

        </div>

      </div>

      {/* LOGOUT */}

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 transition text-white py-3 rounded-2xl text-lg font-semibold flex items-center justify-center gap-3"
      >

        <FaSignOutAlt />

         logout

      </button>

    </div>

  );

}

export default DashboardSidebar;
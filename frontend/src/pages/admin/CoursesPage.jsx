import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaPlus,
  FaUsers,
  FaClock,
  FaEdit,
  FaTrash,
  FaVideo,
  FaSyncAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";

import api from "../../lib/api";
function Courses() {
  const [courses, setCourses] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchCourses = async () => {
    try {
      const response = await api.get("/api/courses");
      setCourses(response.data?.courses || response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSyncDatabase = async () => {
    try {
      setIsSyncing(true);
      const response = await api.post("/api/admin/sync-database");
      alert(
        response.data?.message ||
          "All LMS courses, modules and lectures synced to Database successfully! 🚀"
      );
      fetchCourses();
    } catch (error) {
      console.error("Sync error:", error);
      alert("Database sync failed: " + (error.response?.data?.message || error.message));
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/api/admin/delete-course/${id}`);
      alert(response.data.message);
      fetchCourses();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white p-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black">
            Course Management 📚
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mt-4">
            Manage all LMS courses, modules, teachers and curriculum.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={handleSyncDatabase}
            disabled={isSyncing}
            className={`transition px-6 py-4 rounded-2xl text-lg font-bold flex items-center gap-3 shadow-2xl ${
              isSyncing
                ? "bg-amber-600/80 cursor-not-allowed text-white animate-pulse"
                : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40"
            }`}
          >
            <FaSyncAlt className={isSyncing ? "animate-spin" : ""} />
            {isSyncing ? "Syncing to DB..." : "Sync All Data to DB 🔄"}
          </button>
          <Link
            to="/admin/add-course"
            className="bg-cyan-500 hover:bg-cyan-400 transition px-6 py-4 rounded-2xl text-lg font-bold flex items-center gap-3 shadow-2xl"
          >
            <FaPlus />
            Add New Course
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-[35px] p-8">
          <FaBookOpen className="text-5xl text-cyan-400" />
          <h2 className="text-slate-300 mt-5">
            Total Courses
          </h2>
          <p className="text-5xl font-black mt-4">
            {courses.length}
          </p>
        </div>

        <div className="bg-purple-500/10 border border-purple-400/20 rounded-[35px] p-8">
          <FaUsers className="text-5xl text-purple-400" />
          <h2 className="text-slate-300 mt-5">
            Total Students
          </h2>
          <p className="text-5xl font-black mt-4">
            12K
          </p>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-[35px] p-8">
          <FaClock className="text-5xl text-emerald-400" />
          <h2 className="text-slate-300 mt-5">
            Active Courses
          </h2>
          <p className="text-5xl font-black mt-4">
            18
          </p>
        </div>

        <div className="bg-pink-500/10 border border-pink-400/20 rounded-[35px] p-8">
          <FaBookOpen className="text-5xl text-pink-400" />
          <h2 className="text-slate-300 mt-5">
            Revenue
          </h2>
          <p className="text-5xl font-black mt-4">
            ₹24L
          </p>
        </div>
      </div>

      {/* COURSES GRID */}
      <div className="grid grid-cols-3 gap-10 mt-12">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[40px] overflow-hidden shadow-2xl"
          >
            <img
              src={course.image}
              alt={course.title}
              className="h-60 w-full object-cover"
            />
            <div className="p-8">
              <h1 className="text-3xl font-black leading-tight">
                {course.title}
              </h1>
              <p className="text-cyan-300 mt-4 text-lg">
                👨‍🏫 {course.teacher}
              </p>

              <div className="space-y-4 mt-8 text-lg">
                <p className="text-slate-300">
                  👨‍🎓 Students:
                  <span className="text-white font-bold ml-3">
                    {course.students}

                  </span>

                </p>

                <p className="text-slate-300">
                  ⏳ Duration:
                  <span className="text-white font-bold ml-3">
                    {course.duration}
                  </span>
                </p>

                <p className="text-slate-300">
                  💰 Price:
                  <span className="text-emerald-400 font-bold ml-3">
                    {course.price}
                  </span>
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col gap-3 mt-8">
                <Link
                  to={`/admin/content-manager?courseId=${course.id}`}
                  className="w-full bg-[#D4A017] hover:bg-[#b8890f] text-[#0B1220] transition py-3 rounded-2xl font-bold flex items-center justify-center gap-2 text-sm shadow-md"
                >
                  <FaVideo />
                  Manage Content (Videos, Tests, Projects)
                </Link>

                <div className="flex gap-3">
                  <Link
                    to={`/admin/edit-course/${course.id}`}
                    className="flex-1 bg-blue-500 hover:bg-blue-400 transition py-3 rounded-2xl font-bold flex items-center justify-center gap-2 text-sm"
                  >
                    <FaEdit />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="flex-1 bg-red-500 hover:bg-red-400 transition py-3 rounded-2xl font-bold flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;

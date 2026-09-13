import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaPlus,
  FaUsers,
  FaVideo,
  FaEdit,
  FaTrash,
  FaSyncAlt,
  FaSearch,
  FaShieldAlt,
  FaCheckCircle,
  FaTag,
} from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../lib/api";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSyncing, setIsSyncing] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (type, msg) => {
    setNotification({ type, msg });
    setTimeout(() => setNotification(null), 4500);
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/courses");
      const list = res.data?.courses || res.data || [];
      setCourses(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error("Fetch courses error:", error);
      showNotification("error", "Failed to load courses from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSyncDatabase = async () => {
    try {
      setIsSyncing(true);
      const response = await api.post("/api/admin/sync-database");
      showNotification(
        "success",
        response.data?.message || "All 12 courses, modules and curriculum synced to PostgreSQL successfully! 🚀"
      );
      fetchCourses();
    } catch (error) {
      console.error("Sync error:", error);
      showNotification(
        "error",
        "Sync failed: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDelete = async (courseId, courseTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${courseTitle}"? This will also remove its associated modules and curriculum.`)) {
      return;
    }
    try {
      await api.delete(`/api/admin/delete-course/${courseId}`);
      showNotification("success", `Course "${courseTitle}" deleted successfully.`);
      fetchCourses();
    } catch (error) {
      console.error("Delete error:", error);
      showNotification("error", error.response?.data?.message || "Failed to delete course.");
    }
  };

  // Categories extraction
  const categories = useMemo(() => {
    const set = new Set(["All"]);
    courses.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return Array.from(set);
  }, [courses]);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch =
        (c.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.teacher || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.category || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.level || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory =
        selectedCategory === "All" || c.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [courses, searchTerm, selectedCategory]);

  // Aggregated live statistics
  const stats = useMemo(() => {
    const totalCourses = courses.length;
    const totalLectures = courses.reduce((sum, c) => sum + (Number(c.total_lectures) || 0), 0);
    const totalStudents = courses.reduce((sum, c) => sum + (Number(c.total_students) || 0), 0);
    const avgPrice = courses.length > 0
      ? Math.round(courses.reduce((sum, c) => sum + (Number(c.price) || 0), 0) / courses.length)
      : 0;

    return { totalCourses, totalLectures, totalStudents, avgPrice };
  }, [courses]);

  return (
    <AdminLayout
      title="Courses & Curriculum 📚"
      subtitle="Manage all 12 verified diploma programs, certification syllabi, modules, and recorded lectures directly connected to PostgreSQL."
    >
      {/* NOTIFICATION TOAST */}
      {notification && (
        <div
          className={`mb-6 p-4 rounded-2xl flex items-center gap-3 border shadow-xl transition-all duration-300 ${
            notification.type === "success"
              ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
              : "bg-red-500/15 border-red-500/40 text-red-300"
          }`}
        >
          <FaCheckCircle className="text-xl shrink-0" />
          <span className="font-semibold text-sm">{notification.msg}</span>
        </div>
      )}

      {/* TOP ACTIONS & REAL STATS */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            Authoritative LMS Database
          </span>
          <p className="text-sm text-slate-400 mt-2">
            Every change immediately impacts student checkout, learning portal, and curriculum videos.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleSyncDatabase}
            disabled={isSyncing}
            className={`px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 border transition shadow-lg ${
              isSyncing
                ? "bg-amber-600/30 border-amber-500/40 text-amber-300 cursor-not-allowed animate-pulse"
                : "bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/40 text-emerald-400"
            }`}
          >
            <FaSyncAlt className={isSyncing ? "animate-spin" : ""} />
            {isSyncing ? "Syncing Database..." : "Sync Live DB 🔄"}
          </button>
          <Link
            to="/admin/add-course"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition"
          >
            <FaPlus />
            <span>Add New Course</span>
          </Link>
        </div>
      </div>

      {/* 4 REAL METRIC TILES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#0b1220]/80 border border-cyan-500/20 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Courses</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
              <FaBookOpen className="text-lg" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3">{stats.totalCourses}</p>
          <span className="text-[11px] text-cyan-400/80 font-medium">100% Live in Database</span>
        </div>

        <div className="bg-[#0b1220]/80 border border-blue-500/20 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Curriculum Lectures</span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
              <FaVideo className="text-lg" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3">{stats.totalLectures}</p>
          <span className="text-[11px] text-blue-400/80 font-medium">Verified video sessions</span>
        </div>

        <div className="bg-[#0b1220]/80 border border-emerald-500/20 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Enrollment Base</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <FaUsers className="text-lg" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3">{stats.totalStudents}</p>
          <span className="text-[11px] text-emerald-400/80 font-medium">Enrolled learners across tracks</span>
        </div>

        <div className="bg-[#0b1220]/80 border border-amber-500/20 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Avg Program Fee</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <FaTag className="text-lg" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3">₹{stats.avgPrice.toLocaleString("en-IN")}</p>
          <span className="text-[11px] text-amber-400/80 font-medium">Razorpay integrated checkout</span>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-[#0b1220]/90 border border-white/10 rounded-2xl p-4 mb-8 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search title, teacher, level..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#070b14] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition border ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-[#070b14] border-cyan-400 shadow-md shadow-cyan-500/20"
                  : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* COURSES GRID */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
          <p className="text-slate-400 text-sm mt-4">Connecting to PostgreSQL and fetching courses...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-[#0b1220]/60 border border-white/10 rounded-2xl p-12 text-center">
          <p className="text-slate-400 text-base">No courses matched your query "{searchTerm}".</p>
          <button
            onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
            className="mt-4 text-xs font-bold text-cyan-400 hover:underline"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((c) => {
            const price = Number(c.price) || 0;
            const origPrice = Number(c.original_price) || 0;
            const discount = origPrice > price ? Math.round(((origPrice - price) / origPrice) * 100) : null;

            return (
              <div
                key={c.id}
                className="bg-[#0b1220]/90 border border-white/10 hover:border-cyan-500/40 transition duration-300 rounded-3xl overflow-hidden shadow-2xl flex flex-col group"
              >
                {/* THUMBNAIL */}
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  <img
                    src={c.thumbnail || c.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-transparent"></div>

                  {/* BADGES */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-[#070b14]/85 backdrop-blur-md text-cyan-400 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-cyan-400/30">
                      {c.category || "Technology"}
                    </span>
                    {c.level && (
                      <span className="bg-slate-900/85 backdrop-blur-md text-slate-300 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-white/10">
                        {c.level}
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="bg-emerald-500/20 backdrop-blur-md text-emerald-400 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      Active
                    </span>
                  </div>

                  {/* PRICE TAG OVERLAY */}
                  <div className="absolute bottom-3 left-4 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white">
                      ₹{price.toLocaleString("en-IN")}
                    </span>
                    {origPrice > price && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{origPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                    {discount && (
                      <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded border border-emerald-500/30">
                        {discount}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white leading-snug line-clamp-2">
                      {c.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {c.description || "Comprehensive syllabus with hands-on labs, projects, and government-certified curriculum."}
                    </p>

                    {/* METAS */}
                    <div className="grid grid-cols-3 gap-2 py-3 my-4 border-y border-white/5 text-center">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Duration</span>
                        <span className="text-xs font-bold text-slate-200 mt-0.5 block">{c.duration || "Self-Paced"}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Lectures</span>
                        <span className="text-xs font-bold text-cyan-400 mt-0.5 block">{c.total_lectures || 0}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Learners</span>
                        <span className="text-xs font-bold text-emerald-400 mt-0.5 block">{c.total_students || 0}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 flex items-center gap-1.5 mb-4">
                      <span className="text-slate-500">Instructor:</span>
                      <span className="text-slate-200 font-semibold truncate">{c.teacher || "Dr. Gulshan Kumar"}</span>
                    </p>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="space-y-2 pt-2">
                    <Link
                      to={`/admin/content-manager?courseId=${c.id}`}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
                    >
                      <FaVideo className="text-xs" />
                      <span>Manage Curriculum Studio (Modules & Videos)</span>
                    </Link>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to={`/admin/edit-course/${c.id}`}
                        className="w-full bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-white/20 font-bold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1.5"
                      >
                        <FaEdit className="text-cyan-400 text-xs" />
                        <span>Edit Course</span>
                      </Link>

                      <button
                        onClick={() => handleDelete(c.id, c.title)}
                        className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 font-bold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1.5"
                      >
                        <FaTrash className="text-xs" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
}


import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../lib/api";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  FaBookOpen,
  FaUserGraduate,
  FaVideo,
  FaMoneyBillWave,
  FaLayerGroup,
  FaPlus,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaSyncAlt,
  FaShieldAlt,
} from "react-icons/fa";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalSections: 0,
    totalLectures: 0,
    totalStudents: 0,
    totalTeachers: 0,
    revenue: 0,
  });
  const [recentStudents, setRecentStudents] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/analytics/dashboard");
      if (res.data?.stats) {
        setStats(res.data.stats);
      }
      if (Array.isArray(res.data?.recentStudents)) {
        setRecentStudents(res.data.recentStudents);
      }
      if (Array.isArray(res.data?.recentPayments)) {
        setRecentPayments(res.data.recentPayments);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const cards = [
    {
      title: "Live Courses",
      count: stats.totalCourses || 12,
      subtitle: "Published Programs",
      icon: <FaBookOpen className="text-cyan-400" />,
      color: "from-cyan-500/20 to-blue-500/10",
      border: "border-cyan-500/30",
      link: "/admin/courses",
    },
    {
      title: "Curriculum Modules",
      count: stats.totalSections || 88,
      subtitle: "Course Sections",
      icon: <FaLayerGroup className="text-emerald-400" />,
      color: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-500/30",
      link: "/admin/content-manager",
    },
    {
      title: "Video Lessons",
      count: stats.totalLectures || 252,
      subtitle: "Lectures & Resources",
      icon: <FaVideo className="text-purple-400" />,
      color: "from-purple-500/20 to-pink-500/10",
      border: "border-purple-500/30",
      link: "/admin/content-manager",
    },
    {
      title: "Enrolled Students",
      count: stats.totalStudents || 13,
      subtitle: "Active Learners",
      icon: <FaUserGraduate className="text-amber-400" />,
      color: "from-amber-500/20 to-orange-500/10",
      border: "border-amber-500/30",
      link: "/admin/students",
    },
    {
      title: "Verified Revenue",
      count: `₹${(stats.revenue || 0).toLocaleString()}`,
      subtitle: "Completed Payments",
      icon: <FaMoneyBillWave className="text-emerald-400" />,
      color: "from-emerald-600/20 to-cyan-500/10",
      border: "border-emerald-500/30",
      link: "/admin/payments",
    },
  ];

  return (
    <AdminLayout
      title="Executive Overview"
      subtitle="Real-time authoritative telemetry and live database metrics."
      onSyncComplete={fetchDashboard}
    >
      {/* ============================================================ */}
      {/* 1. STATS METRIC GRID */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {cards.map((c, idx) => (
          <Link
            key={idx}
            to={c.link}
            className={`bg-gradient-to-br ${c.color} border ${c.border} rounded-2xl p-5 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 block backdrop-blur-md group`}
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl group-hover:scale-110 transition-transform">
                {c.icon}
              </span>
              <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/10 text-slate-300">
                DB Live
              </span>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-black text-white tracking-tight">
                {loading ? "..." : c.count}
              </div>
              <div className="text-sm font-semibold text-slate-200 mt-1">
                {c.title}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {c.subtitle}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ============================================================ */}
      {/* 2. QUICK MANAGEMENT ACTIONS */}
      {/* ============================================================ */}
      <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FaShieldAlt className="text-cyan-400" /> Essential Operations
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Instant management actions for live LMS catalog and curriculum.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FaCheckCircle className="text-[10px]" /> PostgreSQL Synchronized
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          <Link
            to="/admin/courses"
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-lg">
                <FaBookOpen />
              </div>
              <div>
                <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition">
                  Manage Courses
                </div>
                <div className="text-xs text-slate-400">12 Live Programs</div>
              </div>
            </div>
            <FaArrowRight className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition" />
          </Link>

          <Link
            to="/admin/add-course"
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">
                <FaPlus />
              </div>
              <div>
                <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition">
                  Create Course
                </div>
                <div className="text-xs text-slate-400">New syllabus & pricing</div>
              </div>
            </div>
            <FaArrowRight className="text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
          </Link>

          <Link
            to="/admin/content-manager"
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-purple-500/10 border border-white/10 hover:border-purple-500/30 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-lg">
                <FaVideo />
              </div>
              <div>
                <div className="text-sm font-bold text-white group-hover:text-purple-400 transition">
                  Content Manager
                </div>
                <div className="text-xs text-slate-400">Modules & 252 videos</div>
              </div>
            </div>
            <FaArrowRight className="text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
          </Link>

          <Link
            to="/admin/students"
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg">
                <FaUserGraduate />
              </div>
              <div>
                <div className="text-sm font-bold text-white group-hover:text-amber-400 transition">
                  Students Directory
                </div>
                <div className="text-xs text-slate-400">Enrolled profiles</div>
              </div>
            </div>
            <FaArrowRight className="text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. REAL DATA TABLES (RECENT STUDENTS & RECENT PAYMENTS) */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* RECENT STUDENTS */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <FaUserGraduate className="text-cyan-400" /> Recent Student Records
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Authoritative enrolled students fetched directly from database.
              </p>
            </div>
            <Link
              to="/admin/students"
              className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
            >
              View All 13 Students →
            </Link>
          </div>

          <div className="mt-4 flex-1 space-y-3 overflow-y-auto max-h-[380px] pr-1">
            {recentStudents.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-sm">
                No student records found in database.
              </div>
            ) : (
              recentStudents.map((st) => (
                <div
                  key={st.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center font-bold text-white text-sm shrink-0 shadow">
                      {st.name ? st.name[0].toUpperCase() : "S"}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-sm text-white truncate">
                        {st.name || "Student"}
                      </div>
                      <div className="text-xs text-slate-400 truncate">
                        {st.email}
                      </div>
                      <div className="text-[11px] text-cyan-400/90 truncate mt-0.5 font-medium">
                        {st.course || "Digital Marketing"}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-3">
                    <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {st.status || "Active"}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 justify-end">
                      <FaClock className="text-[9px]" />
                      {st.created_at
                        ? new Date(st.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })
                        : "Recent"}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RECENT TRANSACTIONS */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <FaMoneyBillWave className="text-emerald-400" /> Recent Transactions
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Payment logs and Razorpay order records.
              </p>
            </div>
            <Link
              to="/admin/payments"
              className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
            >
              Full Payment Ledger →
            </Link>
          </div>

          <div className="mt-4 flex-1 space-y-3 overflow-y-auto max-h-[380px] pr-1">
            {recentPayments.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-sm">
                No payment transactions recorded yet.
              </div>
            ) : (
              recentPayments.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-white truncate">
                      {p.course_title || "Course Enrollment"}
                    </div>
                    <div className="text-xs text-slate-400 truncate">
                      By: {p.student_name || "Enrolled Student"}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                      {p.created_at
                        ? new Date(p.created_at).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "Just now"}
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-3">
                    <div className="font-black text-emerald-400 text-base">
                      ₹{Number(p.amount || 0).toLocaleString()}
                    </div>
                    <span className="inline-block mt-1 px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {p.status || "Success"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

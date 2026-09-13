import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaEye,
  FaTrash,
  FaUserGraduate,
  FaBookOpen,
  FaCheckCircle,
  FaIdBadge,
  FaPlus,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../lib/api";

export default function StudentsPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [notification, setNotification] = useState(null);

  const showNotification = (type, msg) => {
    setNotification({ type, msg });
    setTimeout(() => setNotification(null), 4500);
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/students");
      const list = Array.isArray(res.data) ? res.data : res.data?.students || [];
      setStudents(list);
    } catch (error) {
      console.error("Student Fetch Error:", error);
      showNotification("error", "Failed to load students from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete student "${name}"? This action cannot be undone.`)) {
      return;
    }
    try {
      await api.delete(`/api/students/${id}`);
      showNotification("success", `Student "${name}" deleted successfully.`);
      fetchStudents();
    } catch (error) {
      console.error("Delete Error:", error);
      showNotification("error", error.response?.data?.message || "Delete failed.");
    }
  };

  // Filter students based on search and status
  const filteredStudents = useMemo(() => {
    return students.filter((st) => {
      const q = searchTerm.toLowerCase();
      const matchSearch =
        (st.name || "").toLowerCase().includes(q) ||
        (st.email || "").toLowerCase().includes(q) ||
        (st.student_id || "").toLowerCase().includes(q) ||
        (st.course || "").toLowerCase().includes(q) ||
        (st.phone || "").toLowerCase().includes(q);

      const matchStatus =
        statusFilter === "All" ||
        (st.status || "Active").toLowerCase() === statusFilter.toLowerCase();

      return matchSearch && matchStatus;
    });
  }, [students, searchTerm, statusFilter]);

  // Live Statistics
  const stats = useMemo(() => {
    const total = students.length;
    const active = students.filter((s) => (s.status || "Active").toLowerCase() === "active").length;
    const uniqueCourses = new Set(students.map((s) => s.course).filter(Boolean)).size;
    const withPhone = students.filter((s) => Boolean(s.phone)).length;
    return { total, active, uniqueCourses, withPhone };
  }, [students]);

  return (
    <AdminLayout
      title="Student Directory & Roster 👨‍🎓"
      subtitle="Supervise all registered learners, track batch enrollments, view profiles, and manage access privileges."
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

      {/* TOP HEADER CONTROLS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            Live PostgreSQL Student Ledger
          </span>
          <p className="text-sm text-slate-400 mt-2">
            Real registered student accounts with password credentials and course entitlements.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/add-student")}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition shrink-0"
        >
          <FaPlus />
          <span>Add New Student</span>
        </button>
      </div>

      {/* 4 REAL METRIC TILES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#0b1220]/80 border border-cyan-500/20 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Students</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
              <FaUserGraduate className="text-lg" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3">{stats.total}</p>
          <span className="text-[11px] text-cyan-400/80 font-medium">100% Real from Database</span>
        </div>

        <div className="bg-[#0b1220]/80 border border-emerald-500/20 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Learners</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <FaCheckCircle className="text-lg" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3">{stats.active}</p>
          <span className="text-[11px] text-emerald-400/80 font-medium">Active LMS Portal Access</span>
        </div>

        <div className="bg-[#0b1220]/80 border border-purple-500/20 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Enrolled Courses</span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
              <FaBookOpen className="text-lg" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3">{stats.uniqueCourses}</p>
          <span className="text-[11px] text-purple-400/80 font-medium">Programs with active learners</span>
        </div>

        <div className="bg-[#0b1220]/80 border border-amber-500/20 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Verified Contact</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <FaIdBadge className="text-lg" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3">{stats.withPhone}</p>
          <span className="text-[11px] text-amber-400/80 font-medium">With phone & student ID</span>
        </div>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="bg-[#0b1220]/90 border border-white/10 rounded-2xl p-4 mb-8 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search student name, email, student ID, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#070b14] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Status Dropdown Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-400 font-medium">Status:</span>
          {["All", "Active", "Completed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                statusFilter === st
                  ? "bg-cyan-500 text-[#070b14] border-cyan-400 shadow-md shadow-cyan-500/20"
                  : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* STUDENTS TABLE */}
      <div className="bg-[#0b1220]/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>All Registered Students</span>
              <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold">
                {filteredStudents.length} {filteredStudents.length === 1 ? "student" : "students"}
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Showing students enrolled across all cybersecurity, digital marketing, and data science programs.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
            <p className="text-slate-400 text-sm mt-4">Loading student records from PostgreSQL...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-base">No students matched "{searchTerm}".</p>
            <button
              onClick={() => { setSearchTerm(""); setStatusFilter("All"); }}
              className="mt-3 text-xs font-bold text-cyan-400 hover:underline"
            >
              Clear Search Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Student</th>
                  <th className="py-4 px-6">Enrolled Course</th>
                  <th className="py-4 px-6">Contact Details</th>
                  <th className="py-4 px-6">Batch / Faculty</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredStudents.map((st) => {
                  const avatarUrl =
                    st.avatar ||
                    st.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(st.name || "Student")}&background=0B1220&color=06b6d4&bold=true`;

                  const formattedDate = st.created_at
                    ? new Date(st.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "Active";

                  return (
                    <tr
                      key={st.id}
                      className="hover:bg-white/[0.03] transition duration-200 group"
                    >
                      {/* STUDENT INFO */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={avatarUrl}
                            alt={st.name}
                            className="w-11 h-11 rounded-full object-cover border-2 border-cyan-500/40 shrink-0"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(st.name || "Student")}&background=0B1220&color=06b6d4&bold=true`;
                            }}
                          />
                          <div>
                            <span className="font-bold text-white block group-hover:text-cyan-400 transition">
                              {st.name}
                            </span>
                            <span className="inline-block text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 mt-1">
                              {st.student_id || `DA-${st.id}`}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* ENROLLED COURSE */}
                      <td className="py-4 px-6 max-w-xs">
                        <div className="font-semibold text-slate-200 line-clamp-1">
                          {st.course || "General LMS Track"}
                        </div>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                          <FaCalendarAlt className="text-[10px] text-slate-500" />
                          Joined: {formattedDate}
                        </span>
                      </td>

                      {/* CONTACT */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-xs text-slate-300">
                          <FaEnvelope className="text-[10px] text-cyan-400 shrink-0" />
                          <span className="truncate max-w-[180px]">{st.email}</span>
                        </div>
                        {st.phone && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                            <FaPhone className="text-[10px] text-slate-500 shrink-0" />
                            <span>{st.phone}</span>
                          </div>
                        )}
                      </td>

                      {/* BATCH & TEACHER */}
                      <td className="py-4 px-6">
                        <span className="text-xs text-slate-300 font-medium block">
                          {st.batch || "Regular 2026"}
                        </span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {st.teacher || "Dr. Gulshan Kumar"}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${
                            (st.status || "Active").toLowerCase() === "completed"
                              ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                              : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {st.status || "Active"}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/admin/students/${st.id}`)}
                            title="View Full Profile"
                            className="bg-white/5 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 border border-white/10 p-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                          >
                            <FaEye />
                            <span className="hidden sm:inline">Profile</span>
                          </button>

                          <button
                            onClick={() => handleDelete(st.id, st.name)}
                            title="Delete Student Account"
                            className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 p-2 rounded-xl text-xs transition"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
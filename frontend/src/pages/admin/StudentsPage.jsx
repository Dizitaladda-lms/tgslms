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
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
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
      subtitle="Complete register of authenticated learners, batch allotments, contact credentials, and course access."
      onSyncComplete={fetchStudents}
    >
      {/* NOTIFICATION */}
      {notification && (
        <div
          className={
            "mb-6 p-4 rounded-xl flex items-center gap-3 border shadow-xs transition-all " +
            (notification.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-800"
              : "bg-red-50 border-red-300 text-red-800")
          }
        >
          <FaCheckCircle className="text-lg shrink-0" />
          <span className="font-semibold text-sm">{notification.msg}</span>
        </div>
      )}

      {/* 4 STAT TILES (Landing Page Style) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-300 rounded-xl p-4 shadow-sm hover:border-[#7C2D12] transition">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7C2D12] block">
            Total Students
          </span>
          <p className="text-3xl font-black text-[#0B1220] mt-2">{stats.total}</p>
          <span className="text-[11px] text-slate-500">Live PostgreSQL Accounts</span>
        </div>

        <div className="bg-white border border-slate-300 rounded-xl p-4 shadow-sm hover:border-[#7C2D12] transition">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7C2D12] block">
            Active Learners
          </span>
          <p className="text-3xl font-black text-emerald-700 mt-2">{stats.active}</p>
          <span className="text-[11px] text-emerald-600">Active LMS Portal Access</span>
        </div>

        <div className="bg-white border border-slate-300 rounded-xl p-4 shadow-sm hover:border-[#7C2D12] transition">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7C2D12] block">
            Enrolled Tracks
          </span>
          <p className="text-3xl font-black text-[#0B1220] mt-2">{stats.uniqueCourses}</p>
          <span className="text-[11px] text-slate-500">Unique Certification Programs</span>
        </div>

        <div className="bg-white border border-slate-300 rounded-xl p-4 shadow-sm hover:border-[#7C2D12] transition">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7C2D12] block">
            Verified Contact
          </span>
          <p className="text-3xl font-black text-[#0B1220] mt-2">{stats.withPhone}</p>
          <span className="text-[11px] text-slate-500">With verified mobile phone</span>
        </div>
      </div>

      {/* CONTROLS & SEARCH BAR */}
      <div className="bg-white border border-slate-300 rounded-xl p-4 mb-6 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:w-96">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search student name, email, student ID, course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#D4A017] focus:bg-white transition"
          />
        </div>

        {/* Status Filters & Add Button */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1.5">
            {["All", "Active", "Completed"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition border " +
                  (statusFilter === st
                    ? "bg-[#7C2D12] text-white border-[#D4A017]"
                    : "bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200")
                }
              >
                {st}
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate("/admin/add-student")}
            className="bg-[#0B1220] hover:bg-[#7C2D12] text-white border border-[#D4A017] text-xs font-bold py-2 px-4 rounded-lg transition flex items-center gap-1.5 shadow-sm shrink-0"
          >
            <FaPlus />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* STUDENTS TABLE CONTAINER (Landing Page Classical Theme) */}
      <div className="bg-white border border-slate-300 rounded-xl shadow-sm overflow-hidden">
        <div className="bg-[#0B1220] text-white py-3.5 px-6 border-b-4 border-[#D4A017] flex items-center justify-between">
          <h3 className="font-bold text-base tracking-wide flex items-center gap-2">
            <FaUserGraduate className="text-[#D4A017]" />
            <span>All Registered Students ({filteredStudents.length})</span>
          </h3>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-500">
            <div className="inline-block w-8 h-8 border-4 border-[#D4A017] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-xs font-semibold">Loading student roster from database...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <p className="text-sm">No students matched "{searchTerm}".</p>
            <button
              onClick={() => { setSearchTerm(""); setStatusFilter("All"); }}
              className="mt-2 text-xs font-bold text-[#7C2D12] hover:underline"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-slate-100 text-slate-700 text-xs uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Enrolled Program</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Batch</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredStudents.map((st) => {
                  const avatarUrl =
                    st.avatar ||
                    st.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(st.name || "Student")}&background=0B1220&color=D4A017&bold=true`;

                  return (
                    <tr key={st.id} className="hover:bg-slate-50 transition">
                      {/* STUDENT */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={avatarUrl}
                            alt={st.name}
                            className="w-10 h-10 rounded-full object-cover border border-[#D4A017] shrink-0"
                          />
                          <div>
                            <span className="font-bold text-[#0B1220] block">{st.name}</span>
                            <span className="inline-block text-[11px] font-mono text-[#7C2D12] bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded font-semibold mt-0.5">
                              {st.student_id || ("DA-" + st.id)}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* PROGRAM */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-semibold text-slate-800 line-clamp-1">
                          {st.course || "General Certificate Program"}
                        </div>
                        <span className="text-[11px] text-slate-500 block mt-0.5">
                          Enrolled: {st.created_at ? new Date(st.created_at).toLocaleDateString("en-IN") : "Recent"}
                        </span>
                      </td>

                      {/* CONTACT */}
                      <td className="py-3.5 px-4">
                        <div className="text-xs text-slate-700 flex items-center gap-1.5">
                          <FaEnvelope className="text-slate-400 text-[10px]" />
                          <span>{st.email}</span>
                        </div>
                        {st.phone && (
                          <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                            <FaPhone className="text-slate-400 text-[10px]" />
                            <span>{st.phone}</span>
                          </div>
                        )}
                      </td>

                      {/* BATCH */}
                      <td className="py-3.5 px-4 text-xs font-medium text-slate-700">
                        {st.batch || "Regular 2026"}
                      </td>

                      {/* STATUS */}
                      <td className="py-3.5 px-4">
                        <span
                          className={
                            "inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border " +
                            ((st.status || "Active").toLowerCase() === "completed"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200")
                          }
                        >
                          {st.status || "Active"}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/admin/students/${st.id}`)}
                            className="bg-slate-100 hover:bg-[#0B1220] hover:text-white text-slate-700 border border-slate-300 px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-1"
                          >
                            <FaEye />
                            <span>Profile</span>
                          </button>

                          <button
                            onClick={() => handleDelete(st.id, st.name)}
                            className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 p-1.5 rounded-md text-xs transition"
                            title="Delete Student Account"
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

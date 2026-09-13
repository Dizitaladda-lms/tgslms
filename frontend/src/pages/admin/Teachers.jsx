import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaChalkboardTeacher,
  FaBookOpen,
  FaCheckCircle,
  FaPlus,
  FaEnvelope,
  FaPhone,
  FaAward,
  FaTrash,
} from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../lib/api";

export default function Teachers() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);

  const showNotification = (type, msg) => {
    setNotification({ type, msg });
    setTimeout(() => setNotification(null), 4500);
  };

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/teachers");
      const list = res.data?.teachers || res.data || [];
      setTeachers(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error("Fetch Teachers Error:", error);
      showNotification("error", "Failed to load faculty from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      const q = searchTerm.toLowerCase();
      return (
        (t.name || t.full_name || "").toLowerCase().includes(q) ||
        (t.email || "").toLowerCase().includes(q) ||
        (t.specialization || "").toLowerCase().includes(q) ||
        (t.phone || "").toLowerCase().includes(q)
      );
    });
  }, [teachers, searchTerm]);

  return (
    <AdminLayout
      title="Faculty & Master Trainers 👨‍🏫"
      subtitle="Supervise certified curriculum instructors, digital marketing heads, cyber security architects, and lab mentors."
    >
      {/* NOTIFICATION TOAST */}
      {notification && (
        <div
          className={
            "mb-6 p-4 rounded-2xl flex items-center gap-3 border shadow-xl transition-all duration-300 " +
            (notification.type === "success"
              ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
              : "bg-red-500/15 border-red-500/40 text-red-300")
          }
        >
          <FaCheckCircle className="text-xl shrink-0" />
          <span className="font-semibold text-sm">{notification.msg}</span>
        </div>
      )}

      {/* TOP CONTROLS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            Faculty Directory
          </span>
          <p className="text-sm text-slate-400 mt-2">
            Mentors with active course creation, grading, and live lecture permissions.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/add-teacher")}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition shrink-0"
        >
          <FaPlus />
          <span>Add New Faculty</span>
        </button>
      </div>

      {/* STATS TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#0b1220]/80 border border-cyan-500/20 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Instructors</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
              <FaChalkboardTeacher className="text-lg" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3">{teachers.length}</p>
          <span className="text-[11px] text-cyan-400/80 font-medium">Verified faculty accounts</span>
        </div>

        <div className="bg-[#0b1220]/80 border border-emerald-500/20 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Status</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <FaCheckCircle className="text-lg" />
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-400 mt-3">
            {teachers.filter((t) => (t.status || "Active").toLowerCase() === "active").length}
          </p>
          <span className="text-[11px] text-emerald-400/80 font-medium">100% active instruction</span>
        </div>

        <div className="bg-[#0b1220]/80 border border-amber-500/20 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Lead Mentors</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <FaAward className="text-lg" />
            </div>
          </div>
          <p className="text-3xl font-black text-amber-400 mt-3">Dr. Gulshan Kumar</p>
          <span className="text-[11px] text-amber-400/80 font-medium">Head of Technology & Training</span>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-[#0b1220]/90 border border-white/10 rounded-2xl p-4 mb-8 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search teacher name, specialization, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#070b14] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* FACULTY CARDS / TABLE */}
      <div className="bg-[#0b1220]/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Faculty Roster</span>
            <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold">
              {filteredTeachers.length} instructors
            </span>
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
            <p className="text-slate-400 text-sm mt-4">Connecting to PostgreSQL faculty records...</p>
          </div>
        ) : filteredTeachers.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-base">No instructors matched your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Trainer</th>
                  <th className="py-4 px-6">Domain / Specialization</th>
                  <th className="py-4 px-6">Contact</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredTeachers.map((t) => {
                  const avatarUrl =
                    t.avatar ||
                    "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(t.name || t.full_name || "Trainer") +
                      "&background=0B1220&color=D4A017&bold=true";

                  return (
                    <tr key={t.id} className="hover:bg-white/[0.03] transition duration-200">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={avatarUrl}
                            alt={t.name || t.full_name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/40"
                          />
                          <div>
                            <span className="font-bold text-white block">
                              {t.name || t.full_name}
                            </span>
                            <span className="text-[11px] text-slate-400">Faculty ID: #{t.id}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-3 py-1 rounded-lg text-xs font-semibold">
                          {t.specialization || "Cyber Security & Tech Faculty"}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="text-xs text-slate-300 flex items-center gap-1.5">
                          <FaEnvelope className="text-cyan-400 text-[10px]" />
                          <span>{t.email}</span>
                        </div>
                        {t.phone && (
                          <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                            <FaPhone className="text-slate-500 text-[10px]" />
                            <span>{t.phone}</span>
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          {t.status || "Active"}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => navigate("/admin/teachers/" + t.id)}
                          className="bg-white/5 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 border border-white/10 px-3 py-1.5 rounded-xl text-xs font-bold transition"
                        >
                          View Profile
                        </button>
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

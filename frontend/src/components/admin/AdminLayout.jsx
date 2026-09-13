import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaChartLine,
  FaBookOpen,
  FaUserGraduate,
  FaMoneyBillWave,
  FaVideo,
  FaSyncAlt,
  FaExternalLinkAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaDatabase,
  FaShieldAlt,
  FaChalkboardTeacher,
} from "react-icons/fa";
import api from "../../lib/api";

export default function AdminLayout({ children, title, subtitle, onSyncComplete }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);

  const admin = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSyncDatabase = async () => {
    try {
      setIsSyncing(true);
      setSyncStatus("Syncing...");
      const response = await api.post("/api/admin/sync-database");
      const message =
        response.data?.message ||
        "All LMS courses, modules and lectures synced to Database successfully! 🚀";
      alert(message);
      setSyncStatus("Synced ✅");
      if (onSyncComplete) onSyncComplete();
    } catch (error) {
      console.error("Sync error:", error);
      alert("Database sync notice: " + (error.response?.data?.message || error.message));
      setSyncStatus("Error ⚠️");
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncStatus(null), 4000);
    }
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <FaChartLine className="text-xl" />,
    },
    {
      name: "Courses & Curriculum",
      path: "/admin/courses",
      icon: <FaBookOpen className="text-xl" />,
    },
    {
      name: "Content Manager",
      path: "/admin/content-manager",
      icon: <FaVideo className="text-xl" />,
    },
    {
      name: "Students Directory",
      path: "/admin/students",
      icon: <FaUserGraduate className="text-xl" />,
    },
    {
      name: "Payments & Revenue",
      path: "/admin/payments",
      icon: <FaMoneyBillWave className="text-xl" />,
    },
    {
      name: "Faculty & Mentors",
      path: "/admin/teachers",
      icon: <FaChalkboardTeacher className="text-xl" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex flex-col lg:flex-row font-sans selection:bg-cyan-500 selection:text-black">
      {/* ============================================================ */}
      {/* SIDEBAR (DESKTOP) */}
      {/* ============================================================ */}
      <aside className="hidden lg:flex w-72 bg-gradient-to-b from-[#0b1220] via-[#0d1627] to-[#070b14] border-r border-white/10 flex-col shrink-0 sticky top-0 h-screen z-30">
        {/* BRAND HEADER */}
        <div className="p-6 border-b border-white/10">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-600 flex items-center justify-center font-black text-xl shadow-lg shadow-cyan-500/30">
              DA
            </div>
            <div>
              <div className="font-black text-lg tracking-wider text-white">
                DIZITAL ADDA
              </div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#D4A017] flex items-center gap-1">
                <FaShieldAlt className="text-[10px]" /> LMS Admin Console
              </div>
            </div>
          </Link>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Core Modules
          </div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/10 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className={isActive ? "text-cyan-400" : "text-slate-400"}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* SYSTEM STATUS & LOGOUT */}
        <div className="p-4 border-t border-white/10 space-y-3 bg-[#070b14]/60">
          {/* DB STATUS PILL */}
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-emerald-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <FaDatabase className="text-emerald-400" />
              <span>DB Connected</span>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
              PostgreSQL
            </span>
          </div>

          {/* VIEW SITE */}
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition"
          >
            <span className="flex items-center gap-2">
              <FaExternalLinkAlt className="text-slate-400" />
              View Public Website
            </span>
            <span className="text-[10px] text-slate-500">Live ↗</span>
          </a>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 transition"
          >
            <FaSignOutAlt />
            Log Out
          </button>
        </div>
      </aside>

      {/* ============================================================ */}
      {/* MOBILE NAV DRAWER */}
      {/* ============================================================ */}
      <div className="lg:hidden bg-[#0b1220] border-b border-white/10 p-4 flex items-center justify-between sticky top-0 z-40">
        <Link to="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-black text-sm">
            DA
          </div>
          <span className="font-bold text-sm tracking-wide">
            DIZITAL ADDA <span className="text-[#D4A017] text-[10px]">ADMIN</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-white/10 text-white"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-[#0b1220] border-b border-white/10 p-4 space-y-2 z-40">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${
                location.pathname === item.path
                  ? "bg-cyan-500/20 text-cyan-400 font-bold"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={handleSyncDatabase}
              disabled={isSyncing}
              className="text-xs bg-emerald-600 px-3 py-2 rounded-lg font-bold flex items-center gap-2"
            >
              <FaSyncAlt className={isSyncing ? "animate-spin" : ""} />
              {isSyncing ? "Syncing..." : "Sync DB"}
            </button>
            <button
              onClick={handleLogout}
              className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center gap-2"
            >
              <FaSignOutAlt /> Log Out
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MAIN VIEWPORT */}
      {/* ============================================================ */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP HEADER */}
        <header className="bg-[#0b1220]/70 backdrop-blur-xl border-b border-white/10 px-6 lg:px-10 py-5 sticky top-0 z-20 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
              {title || "Admin Console"}
            </h1>
            <p className="text-slate-400 text-xs lg:text-sm mt-1">
              {subtitle || "Authoritative LMS management and real-time database supervision."}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            {/* 1-CLICK DB SYNC BUTTON */}
            <button
              onClick={handleSyncDatabase}
              disabled={isSyncing}
              title="Sync authoritative courses, modules and lectures from local store directly into PostgreSQL"
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg ${
                isSyncing
                  ? "bg-amber-600/80 cursor-not-allowed text-white animate-pulse"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30 active:scale-95"
              }`}
            >
              <FaSyncAlt className={isSyncing ? "animate-spin" : ""} />
              <span>{isSyncing ? "Syncing to DB..." : syncStatus || "Sync Live DB 🔄"}</span>
            </button>

            {/* ADMIN BADGE */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-black text-white shadow">
                {admin?.name ? admin.name[0].toUpperCase() : "A"}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-white truncate max-w-[120px]">
                  {admin?.name || "System Admin"}
                </div>
                <div className="text-[10px] text-cyan-400 uppercase font-mono">
                  {admin?.role || "Admin"}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT BODY */}
        <main className="flex-1 p-6 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

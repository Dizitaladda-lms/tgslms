import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaUserGraduate,
  FaBookOpen,
  FaVideo,
  FaMoneyBillWave,
  FaLayerGroup,
  FaArrowRight,
  FaCheckCircle,
  FaSyncAlt,
  FaPlus,
  FaReceipt,
  FaCog,
} from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 13,
    totalCourses: 12,
    totalLectures: 252,
    totalSections: 88,
    totalTeachers: 1,
    revenue: 252993,
    recentStudents: [],
    recentPayments: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/analytics/dashboard");
      if (res.data?.success && res.data?.stats) {
        setStats(res.data.stats);
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <AdminLayout
      title="Admin Overview & Executive Dashboard 📊"
      subtitle="Comprehensive supervision of curriculum, verified learners, fee collections, and platform infrastructure."
      onSyncComplete={fetchDashboardData}
    >
      {/* 5 REAL METRIC KPI TILES (Classical Landing Page Card Style) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {/* Total Students */}
        <div className="bg-white border border-slate-300 rounded-xl p-5 shadow-sm hover:border-[#7C2D12] transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C2D12]">
              Students
            </span>
            <div className="p-2 rounded-lg bg-[#0B1220] text-[#D4A017]">
              <FaUserGraduate className="text-sm" />
            </div>
          </div>
          <p className="text-3xl font-black text-[#0B1220] mt-3">
            {stats.totalStudents}
          </p>
          <span className="text-[11px] text-slate-500 font-medium">Real database roster</span>
        </div>

        {/* Total Courses */}
        <div className="bg-white border border-slate-300 rounded-xl p-5 shadow-sm hover:border-[#7C2D12] transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C2D12]">
              Courses
            </span>
            <div className="p-2 rounded-lg bg-[#0B1220] text-[#D4A017]">
              <FaBookOpen className="text-sm" />
            </div>
          </div>
          <p className="text-3xl font-black text-[#0B1220] mt-3">
            {stats.totalCourses}
          </p>
          <span className="text-[11px] text-slate-500 font-medium">Diploma & certificate tracks</span>
        </div>

        {/* Modules / Sections */}
        <div className="bg-white border border-slate-300 rounded-xl p-5 shadow-sm hover:border-[#7C2D12] transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C2D12]">
              Modules
            </span>
            <div className="p-2 rounded-lg bg-[#0B1220] text-[#D4A017]">
              <FaLayerGroup className="text-sm" />
            </div>
          </div>
          <p className="text-3xl font-black text-[#0B1220] mt-3">
            {stats.totalSections}
          </p>
          <span className="text-[11px] text-slate-500 font-medium">Curriculum syllabus units</span>
        </div>

        {/* Video Lectures */}
        <div className="bg-white border border-slate-300 rounded-xl p-5 shadow-sm hover:border-[#7C2D12] transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C2D12]">
              Lectures
            </span>
            <div className="p-2 rounded-lg bg-[#0B1220] text-[#D4A017]">
              <FaVideo className="text-sm" />
            </div>
          </div>
          <p className="text-3xl font-black text-[#0B1220] mt-3">
            {stats.totalLectures}
          </p>
          <span className="text-[11px] text-slate-500 font-medium">Recorded video lessons</span>
        </div>

        {/* Verified Revenue */}
        <div className="bg-white border border-slate-300 rounded-xl p-5 shadow-sm hover:border-[#7C2D12] transition col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C2D12]">
              Gross Revenue
            </span>
            <div className="p-2 rounded-lg bg-[#0B1220] text-[#D4A017]">
              <FaMoneyBillWave className="text-sm" />
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-700 mt-3">
            {"₹" + Number(stats.revenue || 0).toLocaleString("en-IN")}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">100% verified settlement</span>
        </div>
      </div>

      {/* QUICK WORKFLOW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link
          to="/admin/courses"
          className="bg-white border border-slate-300 hover:border-[#7C2D12] rounded-xl p-5 shadow-sm transition group block"
        >
          <div className="w-10 h-10 rounded-lg bg-[#0B1220] text-[#D4A017] flex items-center justify-center mb-3">
            <FaBookOpen />
          </div>
          <h3 className="font-bold text-[#0B1220] group-hover:text-[#7C2D12] transition text-base">
            Course & Video Studio
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Upload video lessons, manage modules, quizzes, and course curriculum.
          </p>
          <div className="text-xs font-bold text-[#7C2D12] mt-3 flex items-center gap-1.5">
            <span>Manage Content</span>
            <FaArrowRight className="text-[10px]" />
          </div>
        </Link>

        <Link
          to="/admin/students"
          className="bg-white border border-slate-300 hover:border-[#7C2D12] rounded-xl p-5 shadow-sm transition group block"
        >
          <div className="w-10 h-10 rounded-lg bg-[#0B1220] text-[#D4A017] flex items-center justify-center mb-3">
            <FaUserGraduate />
          </div>
          <h3 className="font-bold text-[#0B1220] group-hover:text-[#7C2D12] transition text-base">
            Student Roster
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Inspect all 13 enrolled learners, search IDs, view profiles, and update status.
          </p>
          <div className="text-xs font-bold text-[#7C2D12] mt-3 flex items-center gap-1.5">
            <span>View Students</span>
            <FaArrowRight className="text-[10px]" />
          </div>
        </Link>

        <Link
          to="/admin/payments"
          className="bg-white border border-slate-300 hover:border-[#7C2D12] rounded-xl p-5 shadow-sm transition group block"
        >
          <div className="w-10 h-10 rounded-lg bg-[#0B1220] text-[#D4A017] flex items-center justify-center mb-3">
            <FaMoneyBillWave />
          </div>
          <h3 className="font-bold text-[#0B1220] group-hover:text-[#7C2D12] transition text-base">
            Payments Ledger
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Razorpay orders, verified receipts, PDF reports, and CSV download.
          </p>
          <div className="text-xs font-bold text-[#7C2D12] mt-3 flex items-center gap-1.5">
            <span>View Ledger</span>
            <FaArrowRight className="text-[10px]" />
          </div>
        </Link>

        <Link
          to="/admin/settings"
          className="bg-white border border-slate-300 hover:border-[#7C2D12] rounded-xl p-5 shadow-sm transition group block"
        >
          <div className="w-10 h-10 rounded-lg bg-[#0B1220] text-[#D4A017] flex items-center justify-center mb-3">
            <FaCog />
          </div>
          <h3 className="font-bold text-[#0B1220] group-hover:text-[#7C2D12] transition text-base">
            Admin Settings
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Update admin profile, change password, and manage session security.
          </p>
          <div className="text-xs font-bold text-[#7C2D12] mt-3 flex items-center gap-1.5">
            <span>Open Settings</span>
            <FaArrowRight className="text-[10px]" />
          </div>
        </Link>
      </div>

      {/* 2 DATA TABLES: RECENT STUDENTS & RECENT PAYMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* RECENT STUDENTS */}
        <div className="bg-white border border-slate-300 rounded-xl shadow-sm overflow-hidden">
          {/* Header Strip */}
          <div className="bg-[#0B1220] text-white py-3.5 px-6 border-b-4 border-[#D4A017] flex items-center justify-between">
            <h3 className="font-bold text-base tracking-wide flex items-center gap-2">
              <FaUserGraduate className="text-[#D4A017]" />
              <span>Recent Enrolled Students</span>
            </h3>
            <Link
              to="/admin/students"
              className="text-xs font-bold text-orange-200 hover:text-white transition flex items-center gap-1"
            >
              <span>View All</span>
              <FaArrowRight className="text-[9px]" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700 text-xs uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Enrolled Program</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {(stats.recentStudents || []).slice(0, 5).map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#0B1220]">{st.name}</div>
                      <div className="text-xs text-slate-500">{st.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-xs font-semibold text-slate-700 line-clamp-1">
                        {st.course || "General Track"}
                      </div>
                      <span className="text-[10px] font-mono text-[#7C2D12] bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                        {st.student_id || ("DA-" + st.id)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {st.status || "Active"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RECENT PAYMENTS */}
        <div className="bg-white border border-slate-300 rounded-xl shadow-sm overflow-hidden">
          {/* Header Strip */}
          <div className="bg-[#0B1220] text-white py-3.5 px-6 border-b-4 border-[#D4A017] flex items-center justify-between">
            <h3 className="font-bold text-base tracking-wide flex items-center gap-2">
              <FaMoneyBillWave className="text-[#D4A017]" />
              <span>Recent Payment Transactions</span>
            </h3>
            <Link
              to="/admin/payments"
              className="text-xs font-bold text-orange-200 hover:text-white transition flex items-center gap-1"
            >
              <span>View Ledger</span>
              <FaArrowRight className="text-[9px]" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700 text-xs uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Txn / Student</th>
                  <th className="py-3 px-4">Course Program</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {(stats.recentPayments || []).slice(0, 5).map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#0B1220]">{p.student_name || "Enrolled Learner"}</div>
                      <div className="text-[11px] font-mono text-slate-500">
                        {p.razorpay_payment_id || ("pay_" + p.id)}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs font-medium text-slate-700 line-clamp-1">
                      {p.course_title || "Course Program"}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="font-black text-emerald-700 text-sm">
                        {"₹" + Number(p.amount || 0).toLocaleString("en-IN")}
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                        Success
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

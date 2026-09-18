import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaEnvelope,
  FaPhone,
  FaBookOpen,
  FaClock,
  FaFileAlt,
  FaArrowLeft,
  FaUserGraduate,
  FaCheckCircle,
  FaPlayCircle,
  FaWhatsapp,
  FaExternalLinkAlt,
  FaAward,
  FaCalendarAlt,
  FaIdBadge,
  FaHourglassHalf,
  FaExclamationCircle,
  FaChartLine,
} from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../lib/api";

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [activeTab, setActiveTab] = useState("videos"); // "videos" | "assignments" | "courses" | "certificates"

  const fetchStudentProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/api/students/${id}`);
      setStudentData(res.data);
    } catch (err) {
      console.error("Student profile fetch error:", err);
      setError(err.response?.data?.message || "Failed to load student profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchStudentProfile();
    }
  }, [id]);

  if (loading) {
    return (
      <AdminLayout
        title="Student Academic Profile 👨‍🎓"
        subtitle="Loading student learning progress, videos completed, and assignments..."
      >
        <div className="py-24 text-center">
          <div className="inline-block w-10 h-10 border-4 border-[#D4A017] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-sm font-semibold text-slate-600">
            Fetching real-time student analytics from database...
          </p>
        </div>
      </AdminLayout>
    );
  }

  if (error || !studentData || !studentData.student) {
    return (
      <AdminLayout
        title="Student Not Found"
        subtitle="The requested student could not be located in the database."
      >
        <div className="bg-white border border-slate-300 rounded-2xl p-12 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl mx-auto mb-4">
            <FaExclamationCircle />
          </div>
          <h2 className="text-xl font-black text-[#0B1220]">Student Profile Unavailable</h2>
          <p className="text-xs text-slate-500 mt-2 mb-6">
            {error || "Student record could not be found with ID " + id}
          </p>
          <button
            onClick={() => navigate("/admin/students")}
            className="bg-[#0B1220] hover:bg-[#7C2D12] text-white text-xs font-bold py-2.5 px-6 rounded-xl transition flex items-center gap-2 mx-auto"
          >
            <FaArrowLeft />
            <span>Return to Student Roster</span>
          </button>
        </div>
      </AdminLayout>
    );
  }

  const { student, stats = {}, courses = [], recentVideos = [], assignments = [], certificates = [] } = studentData;

  const avatarUrl =
    student.avatar ||
    student.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name || "Student")}&background=0B1220&color=D4A017&bold=true`;

  const cleanPhone = (student.phone || "").replace(/[^0-9]/g, "");
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone}?text=Hi%20${encodeURIComponent(student.name || "")},%20greetings%20from%20TSG%20LMS%20Academic%20Team.`
    : null;

  return (
    <AdminLayout
      title="Student Academic Profile & Progress 👨‍🎓"
      subtitle="Complete register of video lectures watched, assignments submitted, course tracking, and contact details."
      onSyncComplete={fetchStudentProfile}
    >
      {/* TOP BACK BUTTON */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate("/admin/students")}
          className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold py-2 px-4 rounded-xl transition flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <FaArrowLeft className="text-slate-500" />
          <span>Back to Students Roster</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Student Status:</span>
          <span
            className={
              "inline-block px-3 py-1 rounded-full text-xs font-bold border " +
              ((student.status || "Active").toLowerCase() === "completed"
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-emerald-50 text-emerald-700 border-emerald-200")
            }
          >
            ● {student.status || "Active"}
          </span>
        </div>
      </div>

      {/* =========================================================================
          HERO STUDENT PROFILE CARD (Landing Theme Classical Blue & Gold)
      ========================================================================= */}
      <div className="bg-[#0B1220] border-2 border-[#D4A017] rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden mb-8">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left: Avatar & Identity */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={avatarUrl}
                alt={student.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-3 border-[#D4A017] shadow-lg shrink-0"
              />
              <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-900 shadow">
                Verified
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                  {student.name}
                </h1>
                <span className="bg-[#D4A017]/20 border border-[#D4A017] text-[#D4A017] text-xs font-mono font-bold px-2.5 py-0.5 rounded-md">
                  {student.student_id || `DA-STU-${student.id}`}
                </span>
              </div>

              <p className="text-amber-200 text-sm font-semibold mt-1 flex items-center gap-2">
                <FaBookOpen className="text-xs" />
                <span>{student.course || student.course_title || "General Certification Track"}</span>
              </p>

              {/* Contact Credentials */}
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-300">
                <a
                  href={`mailto:${student.email}`}
                  className="flex items-center gap-1.5 hover:text-[#D4A017] transition"
                  title="Send Email"
                >
                  <FaEnvelope className="text-[#D4A017]" />
                  <span>{student.email}</span>
                </a>

                {student.phone && (
                  <a
                    href={`tel:${student.phone}`}
                    className="flex items-center gap-1.5 hover:text-[#D4A017] transition"
                    title="Call Student"
                  >
                    <FaPhone className="text-emerald-400" />
                    <span>{student.phone}</span>
                  </a>
                )}

                {student.dob && (
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <FaCalendarAlt className="text-slate-400" />
                    <span>DOB: {student.dob}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="bg-slate-800/80 border border-slate-700 text-slate-300 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                  Batch: {student.batch || "Regular 2026"}
                </span>
                <span className="bg-slate-800/80 border border-slate-700 text-slate-300 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                  Enrolled:{" "}
                  {student.created_at || student.registered_at
                    ? new Date(student.created_at || student.registered_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "Active Student"}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quick Action Buttons & Grade */}
          <div className="flex flex-col items-start md:items-end justify-between self-stretch md:self-auto gap-4">
            <div className="text-left md:text-right">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                Academic Completion
              </span>
              <p className="text-4xl sm:text-5xl font-black text-[#D4A017] mt-1">
                {stats.overallProgress || 0}%
              </p>
              <span className="text-[11px] text-emerald-400 font-semibold block mt-0.5">
                {stats.overallProgress >= 80
                  ? "Distinction Standing 🌟"
                  : stats.overallProgress >= 50
                  ? "Consistent Progress 🚀"
                  : "Learning In Progress 📚"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow"
                >
                  <FaWhatsapp className="text-sm" />
                  <span>WhatsApp</span>
                </a>
              )}
              <a
                href={`mailto:${student.email}?subject=TSG%20LMS%20Course%20Update`}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 border border-slate-700"
              >
                <FaEnvelope className="text-xs" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4 LIVE ANALYTIC METRIC TILES
      ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Videos Completed */}
        <div className="bg-white border-2 border-slate-200 hover:border-[#D4A017] rounded-2xl p-5 shadow-xs transition group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Videos Completed
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D4A017] flex items-center justify-center text-lg">
              <FaPlayCircle />
            </div>
          </div>
          <p className="text-3xl font-black text-[#0B1220] mt-3">
            {stats.completedVideos || 0}{" "}
            <span className="text-sm font-semibold text-slate-400">/ {stats.totalLectures || 0}</span>
          </p>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-[#D4A017] h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.videoPercent || 0}%` }}
            ></div>
          </div>
          <span className="text-[11px] font-bold text-[#7C2D12] mt-2 block">
            {stats.videoPercent || 0}% Curriculum Watched
          </span>
        </div>

        {/* Assignments Submitted */}
        <div className="bg-white border-2 border-slate-200 hover:border-[#D4A017] rounded-2xl p-5 shadow-xs transition group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Assignments Done
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg">
              <FaFileAlt />
            </div>
          </div>
          <p className="text-3xl font-black text-[#0B1220] mt-3">
            {stats.completedAssignments || 0}{" "}
            <span className="text-sm font-semibold text-slate-400">
              / {stats.totalAssignments || stats.completedAssignments || 0}
            </span>
          </p>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.assignmentPercent || 0}%` }}
            ></div>
          </div>
          <span className="text-[11px] font-bold text-purple-700 mt-2 block">
            {stats.assignmentPercent || 0}% Tasks Submitted
          </span>
        </div>

        {/* Active Learning Hours */}
        <div className="bg-white border-2 border-slate-200 hover:border-[#D4A017] rounded-2xl p-5 shadow-xs transition group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Learning Watch Time
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
              <FaClock />
            </div>
          </div>
          <p className="text-3xl font-black text-[#0B1220] mt-3">
            {stats.learningHours || "0.0"}{" "}
            <span className="text-sm font-semibold text-slate-400">Hours</span>
          </p>
          <span className="text-[11px] text-slate-500 mt-5 block">
            Active Video Playback Time
          </span>
        </div>

        {/* Enrolled Courses */}
        <div className="bg-white border-2 border-slate-200 hover:border-[#D4A017] rounded-2xl p-5 shadow-xs transition group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Enrolled Tracks
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
              <FaBookOpen />
            </div>
          </div>
          <p className="text-3xl font-black text-[#0B1220] mt-3">
            {courses.length || stats.enrolledCoursesCount || 1}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-5 block">
            {certificates.length > 0 ? `🎓 ${certificates.length} Certificate Issued` : "In Progress"}
          </span>
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE TABS CONTAINER
      ========================================================================= */}
      <div className="bg-white border border-slate-300 rounded-2xl shadow-sm overflow-hidden mb-12">
        {/* Tab Header */}
        <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto">
          <button
            onClick={() => setActiveTab("videos")}
            className={
              "py-3.5 px-6 font-bold text-xs sm:text-sm transition flex items-center gap-2 whitespace-nowrap cursor-pointer border-b-2 " +
              (activeTab === "videos"
                ? "border-[#D4A017] text-[#7C2D12] bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900")
            }
          >
            <FaPlayCircle className="text-sm" />
            <span>Video Lectures Watched ({stats.completedVideos || recentVideos.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab("assignments")}
            className={
              "py-3.5 px-6 font-bold text-xs sm:text-sm transition flex items-center gap-2 whitespace-nowrap cursor-pointer border-b-2 " +
              (activeTab === "assignments"
                ? "border-[#D4A017] text-[#7C2D12] bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900")
            }
          >
            <FaFileAlt className="text-sm" />
            <span>Assignments & Projects ({assignments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("courses")}
            className={
              "py-3.5 px-6 font-bold text-xs sm:text-sm transition flex items-center gap-2 whitespace-nowrap cursor-pointer border-b-2 " +
              (activeTab === "courses"
                ? "border-[#D4A017] text-[#7C2D12] bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900")
            }
          >
            <FaBookOpen className="text-sm" />
            <span>Enrolled Courses ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("certificates")}
            className={
              "py-3.5 px-6 font-bold text-xs sm:text-sm transition flex items-center gap-2 whitespace-nowrap cursor-pointer border-b-2 " +
              (activeTab === "certificates"
                ? "border-[#D4A017] text-[#7C2D12] bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900")
            }
          >
            <FaAward className="text-sm" />
            <span>Certificates ({certificates.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6">
          {/* TAB 1: VIDEOS WATCHED PROGRESS */}
          {activeTab === "videos" && (
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-base text-[#0B1220] flex items-center gap-2">
                    <span>Video Lecture Watch Updates</span>
                    <span className="bg-amber-100 text-[#7C2D12] text-xs font-bold px-2 py-0.5 rounded-full">
                      {stats.completedVideos || recentVideos.length || 0} Lectures Completed
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Real-time sequential tracking of sessions completed by this student.
                  </p>
                </div>

                <div className="text-xs font-bold text-[#7C2D12] bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <FaClock />
                  <span>Total Watched: {stats.learningHours || "0.0"} Hours</span>
                </div>
              </div>

              {recentVideos.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <FaPlayCircle className="text-4xl text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-600">No video playback recorded yet</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    When the student starts watching course lectures and completes ≥80% of the duration, their watch updates will appear here live.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">#</th>
                        <th className="py-3 px-4">Lecture / Video Title</th>
                        <th className="py-3 px-4">Course</th>
                        <th className="py-3 px-4">Duration</th>
                        <th className="py-3 px-4">Watch Status</th>
                        <th className="py-3 px-4 text-right">Last Watched</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {recentVideos.map((vid, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition">
                          <td className="py-3.5 px-4 font-mono text-xs text-slate-400">
                            {idx + 1}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                <FaCheckCircle className="text-sm" />
                              </div>
                              <div>
                                <span className="font-bold text-[#0B1220] block text-xs sm:text-sm">
                                  {vid.lecture_title || `Lecture ${vid.lecture_number || idx + 1}`}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  ID: #{vid.lecture_id}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-xs font-semibold text-slate-700">
                            {vid.course_title || student.course || "Core Curriculum"}
                          </td>
                          <td className="py-3.5 px-4 text-xs font-mono text-slate-600">
                            {vid.lecture_duration || "25m"}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                              <FaCheckCircle className="text-[10px]" />
                              <span>Completed (≥80%)</span>
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right text-xs text-slate-500 font-mono">
                            {vid.updated_at
                              ? new Date(vid.updated_at).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })
                              : "Recently"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ASSIGNMENTS & PROJECTS */}
          {activeTab === "assignments" && (
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-base text-[#0B1220] flex items-center gap-2">
                    <span>Assignments & Practical Projects</span>
                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      {assignments.length} Submissions
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Projects, portfolio code, and tasks submitted by this student.
                  </p>
                </div>
              </div>

              {assignments.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <FaFileAlt className="text-4xl text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-600">No assignment submissions yet</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    When the student submits practical assignment links via the learning portal, they will appear here with links and grading options.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {assignments.map((assign, aIdx) => (
                    <div
                      key={assign.submission_id || aIdx}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-purple-300 transition"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm sm:text-base text-[#0B1220]">
                              {assign.assignment_title || `Assignment Project #${aIdx + 1}`}
                            </h4>
                            <span className="text-[11px] font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md">
                              {assign.course_title || "Course Project"}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            Submitted on:{" "}
                            {assign.submitted_at
                              ? new Date(assign.submitted_at).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "Recent"}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          {assign.marks !== null && assign.marks !== undefined ? (
                            <span className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold px-3 py-1 rounded-lg">
                              Score: {assign.marks} / {assign.max_marks || 100}
                            </span>
                          ) : (
                            <span className="bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                              <FaHourglassHalf className="text-[10px]" />
                              <span>Pending Review</span>
                            </span>
                          )}

                          {assign.submission_url && (
                            <a
                              href={assign.submission_url}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-[#0B1220] hover:bg-[#7C2D12] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 shadow-xs"
                            >
                              <FaExternalLinkAlt className="text-[10px]" />
                              <span>View Work</span>
                            </a>
                          )}
                        </div>
                      </div>

                      {assign.notes && (
                        <div className="mt-3 bg-white border border-slate-200 rounded-lg p-3 text-xs text-slate-700">
                          <span className="font-bold text-slate-900 block mb-1">Student Notes:</span>
                          <p className="text-slate-600 leading-relaxed">{assign.notes}</p>
                        </div>
                      )}

                      {assign.feedback && (
                        <div className="mt-2 bg-emerald-50/70 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-900">
                          <span className="font-bold text-emerald-900 block mb-1">Instructor Feedback:</span>
                          <p className="text-emerald-800 leading-relaxed">{assign.feedback}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ENROLLED COURSES */}
          {activeTab === "courses" && (
            <div>
              <div className="mb-6 pb-4 border-b border-slate-100">
                <h3 className="font-bold text-base text-[#0B1220]">
                  Enrolled Certification Courses ({courses.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tracks and bootcamps assigned to this student with individual module progression.
                </p>
              </div>

              {courses.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <FaBookOpen className="text-4xl text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-600">No active course enrollments found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {courses.map((crs) => (
                    <div
                      key={crs.id}
                      className="bg-white border-2 border-slate-200 hover:border-[#D4A017] rounded-xl p-5 shadow-xs transition"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C2D12] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {crs.category || "Professional Track"}
                          </span>
                          <h4 className="font-black text-base text-[#0B1220] mt-1.5">
                            {crs.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Instructor: {crs.teacher || "TSG Faculty"} • Duration: {crs.duration || "40 Hours"}
                          </p>
                        </div>

                        <span className="text-2xl font-black text-[#D4A017] shrink-0">
                          {crs.progressPercent || 0}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-100 rounded-full h-2 mt-4 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#D4A017] to-[#7C2D12] h-full rounded-full transition-all duration-500"
                          style={{ width: `${crs.progressPercent || 0}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                        <span>
                          {crs.completedLectures || 0} of {crs.totalLectures || 0} Lectures Completed
                        </span>
                        <Link
                          to={`/learn/${crs.id}`}
                          target="_blank"
                          className="text-[#7C2D12] hover:text-[#0B1220] font-bold flex items-center gap-1 hover:underline"
                        >
                          <span>Open Player</span>
                          <FaExternalLinkAlt className="text-[10px]" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CERTIFICATES */}
          {activeTab === "certificates" && (
            <div>
              <div className="mb-6 pb-4 border-b border-slate-100">
                <h3 className="font-bold text-base text-[#0B1220]">
                  Official Certificates & Accreditations ({certificates.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Certificates generated upon 100% course completion and verification.
                </p>
              </div>

              {certificates.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <FaAward className="text-4xl text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-600">No certificates issued yet</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    When the student completes 100% of their video lectures, a verified certificate is automatically generated and listed here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {certificates.map((cert, cIdx) => (
                    <div
                      key={cert.id || cIdx}
                      className="bg-slate-50 border-2 border-[#D4A017]/40 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#D4A017] flex items-center justify-center text-2xl font-bold shadow-xs shrink-0">
                          <FaAward />
                        </div>
                        <div>
                          <h4 className="font-black text-sm sm:text-base text-[#0B1220]">
                            {cert.course_title || "Verified Certification"}
                          </h4>
                          <span className="text-xs font-mono text-slate-500 mt-0.5 block">
                            Code: {cert.certificate_code} • Grade: {cert.grade || "A+"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={
                            "text-xs font-bold px-3 py-1 rounded-full border " +
                            (cert.status === "Approved" || cert.status === "Issued"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                              : "bg-amber-50 text-amber-700 border-amber-300")
                          }
                        >
                          {cert.status || "Pending Verification"}
                        </span>

                        {cert.pdf_url && (
                          <a
                            href={cert.pdf_url}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#0B1220] hover:bg-[#7C2D12] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 shadow-xs"
                          >
                            <FaExternalLinkAlt className="text-[10px]" />
                            <span>Download PDF</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
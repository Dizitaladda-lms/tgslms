import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaPlus,
  FaVideo,
  FaEdit,
  FaTrash,
  FaSearch,
  FaCheckCircle,
  FaLayerGroup,
  FaClock,
  FaTimes,
  FaCloudUploadAlt,
  FaExternalLinkAlt,
  FaFilePdf,
} from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../lib/api";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [notification, setNotification] = useState(null);

  // STUDIO MODAL STATE (Direct video upload & content management for selected course)
  const [studioCourse, setStudioCourse] = useState(null);
  const [studioSections, setStudioSections] = useState([]);
  const [studioLectures, setStudioLectures] = useState([]);
  const [studioLoading, setStudioLoading] = useState(false);
  const [studioTab, setStudioTab] = useState("upload"); // "upload" | "modules"

  // Upload Form State
  const [lectureForm, setLectureForm] = useState({
    title: "",
    section_id: "",
    duration: "25m",
    video_url: "",
    pdf_url: "",
    description: "",
    is_free_preview: false,
  });
  const [uploadingLecture, setUploadingLecture] = useState(false);
  const [deletingLecture, setDeletingLecture] = useState(false);

  // New Module State
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [addingSection, setAddingSection] = useState(false);

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
      showNotification("error", "Failed to load courses from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch course content when studio course opened
  const openStudio = async (course) => {
    setStudioCourse(course);
    setStudioTab("upload");
    setStudioLoading(true);
    try {
      const [secRes, lecRes] = await Promise.all([
        api.get(`/api/sections/${course.id}`),
        api.get(`/api/lectures/${course.id}`),
      ]);
      const secs = secRes.data?.sections || secRes.data || [];
      const lecs = lecRes.data?.lectures || lecRes.data || [];
      setStudioSections(Array.isArray(secs) ? secs : []);
      setStudioLectures(Array.isArray(lecs) ? lecs : []);
      if (secs.length > 0) {
        setLectureForm((prev) => ({ ...prev, section_id: secs[0].id }));
      }
    } catch (err) {
      console.error("Studio content fetch error:", err);
      showNotification(
        "error",
        err.response?.data?.message ||
          "Video Studio content could not be loaded. Please check the API database connection."
      );
    } finally {
      setStudioLoading(false);
    }
  };

  const closeStudio = () => {
    setStudioCourse(null);
    setStudioSections([]);
    setStudioLectures([]);
    setLectureForm({
      title: "",
      section_id: "",
      duration: "25m",
      video_url: "",
      pdf_url: "",
      description: "",
      is_free_preview: false,
    });
    fetchCourses(); // refresh lecture counts
  };

  // Computed properties for selected module and sequence
  const selectedModule = useMemo(() => {
    return studioSections.find((s) => String(s.id) === String(lectureForm.section_id));
  }, [studioSections, lectureForm.section_id]);

  const selectedModuleLectures = useMemo(() => {
    if (!lectureForm.section_id) return [];
    return studioLectures.filter((l) => String(l.section_id) === String(lectureForm.section_id));
  }, [studioLectures, lectureForm.section_id]);

  const nextLectureNumber = selectedModuleLectures.length + 1;

  // Auto-load default modules if course has 0 modules
  const handleAutoLoadDefaultModules = async () => {
    if (!studioCourse) return;
    try {
      setAddingSection(true);
      const secRes = await api.get(`/api/sections/${studioCourse.id}`);
      const secs = secRes.data?.sections || secRes.data || [];
      setStudioSections(Array.isArray(secs) ? secs : []);
      if (secs.length > 0) {
        setLectureForm((prev) => ({ ...prev, section_id: secs[0].id }));
        showNotification("success", `Loaded ${secs.length} curriculum modules for "${studioCourse.title}"!`);
      } else {
        showNotification("info", "No default modules found. Create one with the bar above.");
      }
    } catch (err) {
      alert("Failed to load modules: " + (err.response?.data?.message || err.message));
    } finally {
      setAddingSection(false);
    }
  };

  // Upload new lecture
  const handleUploadLecture = async (e) => {
    e.preventDefault();
    if (!lectureForm.title.trim()) {
      alert("Please enter a lecture title.");
      return;
    }
    if (!lectureForm.video_url || !lectureForm.video_url.trim()) {
      alert("Please provide a valid video stream link (Google Drive, YouTube, or direct video URL).");
      return;
    }
    try {
      setUploadingLecture(true);
      const targetSeq = nextLectureNumber;
      await api.post("/api/lectures/upload", {
        course_id: studioCourse.id,
        section_id: lectureForm.section_id ? Number(lectureForm.section_id) : null,
        title: lectureForm.title.trim(),
        duration: lectureForm.duration || "25m",
        order_num: targetSeq,
        lecture_number: targetSeq,
        video_url: lectureForm.video_url.trim(),
        pdf_url: lectureForm.pdf_url?.trim() || null,
        description: lectureForm.description || "",
        is_free_preview: lectureForm.is_free_preview,
      });

      showNotification(
        "success",
        `Lecture #${targetSeq} ("${lectureForm.title}") uploaded successfully to ${selectedModule?.title || "Module"}! 🚀`
      );
      setLectureForm((prev) => ({
        ...prev,
        title: "",
        duration: "25m",
        video_url: "",
        pdf_url: "",
        description: "",
        is_free_preview: false,
      }));

      // Refresh studio lectures
      const lecRes = await api.get(`/api/lectures/${studioCourse.id}`);
      setStudioLectures(lecRes.data?.lectures || lecRes.data || []);
      setStudioTab("modules");
      await fetchCourses();
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.response?.data?.message || "Failed to upload video lecture.");
    } finally {
      setUploadingLecture(false);
    }
  };

  // Clear all dummy/fake lectures across the system
  const handleClearAllDummyLectures = async () => {
    if (
      !window.confirm(
        "⚠️ WARNING: Kya aap sach me saare dummy/fake lectures database aur website se DELETE karna chahte hain?\n\nIske baad website bilkul clean ho jayegi aur aap direct real recorded lectures upload kar sakenge!"
      )
    ) {
      return;
    }
    try {
      setDeletingLecture(true);
      const res = await api.post("/api/admin/clear-all-lectures");
      showNotification("success", res.data?.message || "All dummy lectures deleted successfully! 🎬");
      if (studioCourse) {
        setStudioLectures([]);
        const lecRes = await api.get(`/api/lectures/${studioCourse.id}`);
        setStudioLectures(lecRes.data?.lectures || lecRes.data || []);
      }
      await fetchCourses();
    } catch (err) {
      console.error("Clear dummy lectures error:", err);
      showNotification("error", err.response?.data?.message || "Failed to clear dummy lectures");
    } finally {
      setDeletingLecture(false);
    }
  };

  // Add new section/module
  const handleAddSection = async (e) => {
    e.preventDefault();
    if (!newSectionTitle.trim()) return;
    try {
      setAddingSection(true);
      await api.post("/api/sections", {
        course_id: studioCourse.id,
        title: newSectionTitle.trim(),
      });
      showNotification("success", `Curriculum module "${newSectionTitle.trim()}" created successfully!`);
      setNewSectionTitle("");
      // Refresh sections
      const secRes = await api.get(`/api/sections/${studioCourse.id}`);
      const secs = secRes.data?.sections || secRes.data || [];
      setStudioSections(secs);
      if (secs.length > 0) {
        setLectureForm((prev) => ({ ...prev, section_id: secs[secs.length - 1].id }));
      }
    } catch (err) {
      alert("Failed to add section: " + (err.response?.data?.message || err.message));
    } finally {
      setAddingSection(false);
    }
  };

  // Delete lecture
  const handleDeleteLecture = async (lecId, lecTitle) => {
    if (!window.confirm(`Delete lecture "${lecTitle}"?`)) return;
    try {
      await api.delete(`/api/lectures/${lecId}`);
      showNotification("success", "Lecture removed from curriculum.");
      const lecRes = await api.get(`/api/lectures/${studioCourse.id}`);
      setStudioLectures(lecRes.data?.lectures || lecRes.data || []);
    } catch (err) {
      alert("Failed to delete lecture: " + err.message);
    }
  };

  // Delete course
  const handleDeleteCourse = async (courseId, courseTitle) => {
    if (!window.confirm(`Are you sure you want to delete course "${courseTitle}"?`)) {
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

  // Categories
  const categories = useMemo(() => {
    const set = new Set(["All"]);
    courses.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return Array.from(set);
  }, [courses]);

  // Filtered
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const q = searchTerm.toLowerCase();
      const matchSearch =
        (c.title || "").toLowerCase().includes(q) ||
        (c.teacher || "").toLowerCase().includes(q) ||
        (c.category || "").toLowerCase().includes(q);
      const matchCat = selectedCategory === "All" || c.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [courses, searchTerm, selectedCategory]);

  return (
    <AdminLayout
      title="Courses & Video Studio 📚"
      subtitle="Manage diploma curriculums, upload recorded lecture videos, structure modules, and publish course content."
      onSyncComplete={fetchCourses}
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

      {/* TOP CONTROLS & ADD COURSE */}
      <div className="bg-white border border-slate-300 rounded-xl p-4 mb-6 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search course title, instructor, domain..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#D4A017] focus:bg-white transition"
          />
        </div>

        {/* Categories & Add Button */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition border " +
                  (selectedCategory === cat
                    ? "bg-[#7C2D12] text-white border-[#D4A017]"
                    : "bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200")
                }
              >
                {cat}
              </button>
            ))}
          </div>

          <Link
            to="/admin/add-course"
            className="bg-[#0B1220] hover:bg-[#7C2D12] text-white border border-[#D4A017] text-xs font-bold py-2 px-4 rounded-lg transition flex items-center gap-1.5 shadow-sm shrink-0"
          >
            <FaPlus />
            <span>Add Course</span>
          </Link>

          <button
            type="button"
            onClick={handleClearAllDummyLectures}
            disabled={deletingLecture}
            className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 text-xs font-bold py-2 px-3.5 rounded-lg transition flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer disabled:opacity-50"
            title="Delete all dummy/placeholder lectures from database & system"
          >
            <FaTrash className="text-[11px]" />
            <span>{deletingLecture ? "Purging Lectures..." : "Delete Fake Lectures 🗑️"}</span>
          </button>
        </div>
      </div>

      {/* COURSES GRID (Classical Landing Page Card Aesthetics) */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <div className="inline-block w-8 h-8 border-4 border-[#D4A017] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-xs font-semibold">Loading courses from PostgreSQL...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-white border border-slate-300 rounded-xl p-12 text-center text-slate-500">
          <p className="text-sm">No courses found matching "{searchTerm}".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c) => {
            const price = Number(c.price) || 0;
            const origPrice = Number(c.original_price) || 0;

            return (
              <div
                key={c.id}
                className="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm hover:border-[#7C2D12] transition duration-300 flex flex-col group"
              >
                {/* CARD HEADER STRIP */}
                <div className="bg-[#0B1220] text-white py-3 px-5 border-b-4 border-[#D4A017] flex items-center justify-between">
                  <span className="text-[11px] font-bold text-orange-300 uppercase tracking-wider">
                    {c.category || "Domain Course"}
                  </span>
                  <span className="text-[11px] font-semibold bg-[#1E293B] text-[#D4A017] px-2 py-0.5 rounded border border-slate-700">
                    {c.level || "Diploma"}
                  </span>
                </div>

                {/* THUMBNAIL */}
                <div className="relative h-44 bg-slate-900 overflow-hidden">
                  <img
                    src={c.thumbnail || c.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800";
                    }}
                  />
                  <div className="absolute bottom-2 right-3 bg-[#0B1220]/90 backdrop-blur-xs text-white px-2.5 py-1 rounded text-xs font-black border border-[#D4A017]">
                    {"₹" + price.toLocaleString("en-IN")}
                  </div>
                </div>

                {/* BODY CONTENT */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-[#0B1220] text-base leading-snug line-clamp-2">
                      {c.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {c.description || "Comprehensive syllabus with hands-on labs, projects, and government-certified curriculum."}
                    </p>

                    {/* METADATA ROW */}
                    <div className="grid grid-cols-3 gap-2 py-3 my-3 border-y border-slate-100 text-center text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Duration</span>
                        <span className="font-bold text-slate-700 mt-0.5 block">{c.duration || "12 Months"}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Lectures</span>
                        <span className="font-bold text-[#7C2D12] mt-0.5 block">{c.total_lectures || 0}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Learners</span>
                        <span className="font-bold text-emerald-700 mt-0.5 block">{c.total_students || 0}</span>
                      </div>
                    </div>
                  </div>

                  {/* ACTION CONTROLS */}
                  <div className="space-y-2 pt-2">
                    {/* CORE BUTTON: UPLOAD VIDEO & MANAGE CONTENT DIRECTLY */}
                    <button
                      onClick={() => openStudio(c)}
                      className="w-full bg-[#0B1220] hover:bg-[#7C2D12] text-white border border-[#D4A017] text-xs font-bold py-2.5 px-4 rounded-lg transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <FaVideo className="text-[#D4A017]" />
                      <span>Manage Content & Upload Videos 🎬</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to={`/admin/edit-course/${c.id}`}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold py-2 rounded-lg transition text-center flex items-center justify-center gap-1"
                      >
                        <FaEdit className="text-xs" />
                        <span>Edit Course</span>
                      </Link>

                      <button
                        onClick={() => handleDeleteCourse(c.id, c.title)}
                        className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 text-xs font-bold py-2 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer"
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

      {/* ============================================================ */}
      {/* IN-PAGE VIDEO UPLOAD & CONTENT STUDIO MODAL */}
      {/* ============================================================ */}
      {studioCourse && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border-2 border-[#D4A017] rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* MODAL HEADER */}
            <div className="bg-[#0B1220] text-white py-4 px-6 border-b-4 border-[#D4A017] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A017]">
                  Curriculum Studio
                </span>
                <h2 className="text-lg font-black text-white mt-0.5">
                  {studioCourse.title}
                </h2>
              </div>
              <button
                onClick={closeStudio}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            {/* TAB SELECTOR */}
            <div className="bg-slate-100 border-b border-slate-200 px-6 flex items-center gap-4">
              <button
                onClick={() => setStudioTab("upload")}
                className={
                  "py-3 font-bold text-xs border-b-2 transition flex items-center gap-2 " +
                  (studioTab === "upload"
                    ? "border-[#7C2D12] text-[#7C2D12]"
                    : "border-transparent text-slate-500 hover:text-slate-800")
                }
              >
                <FaCloudUploadAlt />
                <span>Upload Recorded Video Lecture</span>
              </button>
              <button
                onClick={() => setStudioTab("modules")}
                className={
                  "py-3 font-bold text-xs border-b-2 transition flex items-center gap-2 " +
                  (studioTab === "modules"
                    ? "border-[#7C2D12] text-[#7C2D12]"
                    : "border-transparent text-slate-500 hover:text-slate-800")
                }
              >
                <FaLayerGroup />
                <span>Modules & Existing Lectures ({studioLectures.length})</span>
              </button>

              {studioLectures.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllDummyLectures}
                  disabled={deletingLecture}
                  className="ml-auto text-xs font-bold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 border border-red-200 px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer my-1.5 shadow-xs shrink-0 disabled:opacity-50"
                  title="Purge all dummy lectures from DB and website"
                >
                  <FaTrash className="text-[10px]" />
                  <span>{deletingLecture ? "Purging..." : "Purge Dummy Lectures"}</span>
                </button>
              )}
            </div>

            {/* MODAL CONTENT BODY */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {studioLoading ? (
                <div className="py-12 text-center text-slate-500">
                  <div className="inline-block w-8 h-8 border-4 border-[#D4A017] border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-2 text-xs font-semibold">Loading course modules and lectures...</p>
                </div>
              ) : studioTab === "upload" ? (
                /* ================= TAB 1: UPLOAD VIDEO LECTURE ================= */
                <form onSubmit={handleUploadLecture} className="space-y-4">
                  {/* Quick Add Module Bar */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs font-bold text-[#7C2D12]">
                      Need a new module first?
                    </span>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <input
                        type="text"
                        placeholder="New Module Title (e.g. Module 3: Advanced SEO)"
                        value={newSectionTitle}
                        onChange={(e) => setNewSectionTitle(e.target.value)}
                        className="bg-white border border-amber-300 rounded px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 w-full sm:w-72 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddSection}
                        disabled={addingSection}
                        className="bg-[#7C2D12] text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-amber-900 transition shrink-0 cursor-pointer"
                      >
                        {addingSection ? "Adding..." : "+ Create Module"}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Lecture Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={`e.g. Lecture ${nextLectureNumber}: Advanced Practical Implementation`}
                        value={lectureForm.title}
                        onChange={(e) => setLectureForm({ ...lectureForm, title: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:bg-white focus:border-[#D4A017] focus:outline-none"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Select Curriculum Module *
                        </label>
                        {studioSections.length > 0 && (
                          <span className="text-[11px] font-bold text-[#7C2D12]">
                            {studioSections.length} Modules Available
                          </span>
                        )}
                      </div>
                      <select
                        value={lectureForm.section_id}
                        onChange={(e) => setLectureForm({ ...lectureForm, section_id: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:bg-white focus:border-[#D4A017] focus:outline-none font-medium"
                      >
                        {studioSections.length === 0 ? (
                          <option value="">No modules created yet (Click Quick Add or Auto-Load below)</option>
                        ) : (
                          studioSections.map((sec, sIdx) => {
                            const count = studioLectures.filter((l) => Number(l.section_id) === Number(sec.id)).length;
                            return (
                              <option key={sec.id} value={sec.id}>
                                [Module {sIdx + 1}] {sec.title} ({count} {count === 1 ? "lecture" : "lectures"})
                              </option>
                            );
                          })
                        )}
                      </select>

                      {/* DYNAMIC SEQUENCE INDICATOR */}
                      {selectedModule ? (
                        <div className="mt-1.5 p-2 rounded-lg bg-amber-50/90 border border-amber-200 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="font-bold text-[#7C2D12] shrink-0">Target:</span>
                            <span className="font-bold text-slate-800 truncate">
                              {selectedModule.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 font-bold shrink-0 ml-2">
                            <span className="text-slate-500 text-[11px]">
                              Existing: {selectedModuleLectures.length}
                            </span>
                            <span className="bg-[#7C2D12] text-white px-2 py-0.5 rounded text-[10px] shadow-xs">
                              Will be Lecture #{nextLectureNumber} 🎬
                            </span>
                          </div>
                        </div>
                      ) : studioSections.length === 0 ? (
                        <div className="mt-1.5 flex items-center justify-between gap-2 p-2 rounded-lg bg-orange-50 border border-orange-200 text-xs">
                          <span className="text-orange-800 font-medium">No modules loaded for this course.</span>
                          <button
                            type="button"
                            onClick={handleAutoLoadDefaultModules}
                            disabled={addingSection}
                            className="bg-[#0B1220] hover:bg-[#7C2D12] text-[#D4A017] hover:text-white px-2.5 py-1 rounded text-xs font-bold transition shrink-0 cursor-pointer"
                          >
                            {addingSection ? "Loading..." : "⚡ Auto-Load Course Modules"}
                          </button>
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Video Stream URL (MP4 / YouTube / Cloud) *
                      </label>
                      <input
                        type="url"
                        placeholder="https://commondatastorage.googleapis.com/... or youtube link"
                        value={lectureForm.video_url}
                        onChange={(e) => setLectureForm({ ...lectureForm, video_url: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:bg-white focus:border-[#D4A017] focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-500">
                        Leave blank to use default certified test video stream.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Duration (e.g. 25m, 45m)
                      </label>
                      <input
                        type="text"
                        placeholder="25m"
                        value={lectureForm.duration}
                        onChange={(e) => setLectureForm({ ...lectureForm, duration: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:bg-white focus:border-[#D4A017] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Notes / Study PDF Resource URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://.../lecture-notes.pdf"
                      value={lectureForm.pdf_url}
                      onChange={(e) => setLectureForm({ ...lectureForm, pdf_url: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:bg-white focus:border-[#D4A017] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="freePreview"
                      checked={lectureForm.is_free_preview}
                      onChange={(e) => setLectureForm({ ...lectureForm, is_free_preview: e.target.checked })}
                      className="w-4 h-4 text-[#7C2D12] rounded border-slate-300"
                    />
                    <label htmlFor="freePreview" className="text-xs font-semibold text-slate-700 cursor-pointer">
                      Allow as Free Sample Preview for prospective students
                    </label>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={closeStudio}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 px-4 rounded-lg transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={uploadingLecture}
                      className="bg-[#0B1220] hover:bg-[#7C2D12] text-white border border-[#D4A017] font-bold text-xs py-2.5 px-6 rounded-lg transition flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      <FaCloudUploadAlt />
                      <span>{uploadingLecture ? "Uploading Lecture..." : "Upload Recorded Lecture 🚀"}</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* ================= TAB 2: MODULES & LECTURES LIST (GROUPED BY MODULE) ================= */
                <div className="space-y-4">
                  {studioLectures.length === 0 ? (
                    <div className="py-8 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                      <p className="text-sm font-semibold text-slate-700">No lectures uploaded for this course yet.</p>
                      <p className="text-xs text-slate-400 mt-1">Select a curriculum module and upload recorded video lectures.</p>
                      <button
                        onClick={() => setStudioTab("upload")}
                        className="mt-3 inline-flex items-center gap-1.5 bg-[#7C2D12] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm hover:bg-amber-900 transition cursor-pointer"
                      >
                        <FaCloudUploadAlt />
                        <span>Upload First Lecture to Module</span>
                      </button>
                    </div>
                  ) : studioSections.length === 0 ? (
                    <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white">
                      {studioLectures.map((lec, idx) => (
                        <div
                          key={lec.id}
                          className="p-3.5 hover:bg-slate-50 transition flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <div>
                              <span className="font-bold text-slate-800 text-sm block">
                                {lec.title}
                              </span>
                              <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                                <span className="flex items-center gap-1">
                                  <FaClock className="text-[10px]" />
                                  {lec.duration || "25m"}
                                </span>
                                {lec.is_free_preview && (
                                  <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold border border-emerald-200">
                                    Free Preview
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {lec.video_url && (
                              <a
                                href={lec.video_url}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded text-xs transition"
                                title="Open Video Stream"
                              >
                                <FaExternalLinkAlt />
                              </a>
                            )}
                            <button
                              onClick={() => handleDeleteLecture(lec.id, lec.title)}
                              className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white p-2 rounded text-xs transition cursor-pointer"
                              title="Delete Lecture"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Grouped view by module */
                    <div className="space-y-4">
                      {studioSections.map((sec, sIdx) => {
                        const secLectures = studioLectures.filter(
                          (l) => Number(l.section_id) === Number(sec.id)
                        );
                        return (
                          <div
                            key={sec.id}
                            className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white"
                          >
                            {/* MODULE HEADER */}
                            <div className="bg-[#0B1220] text-white px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#D4A017]">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="bg-[#D4A017] text-[#0B1220] font-black text-xs px-2 py-0.5 rounded shrink-0">
                                  Module {sIdx + 1}
                                </span>
                                <h4 className="font-bold text-sm text-slate-100 truncate">
                                  {sec.title}
                                </h4>
                              </div>
                              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                <span className="text-xs bg-slate-800 text-amber-300 px-2.5 py-0.5 rounded font-bold border border-slate-700">
                                  {secLectures.length} {secLectures.length === 1 ? "Lecture" : "Lectures"}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setLectureForm((prev) => ({ ...prev, section_id: sec.id }));
                                    setStudioTab("upload");
                                  }}
                                  className="bg-[#7C2D12] hover:bg-amber-900 text-white text-xs font-bold px-3 py-1 rounded transition flex items-center gap-1 cursor-pointer"
                                >
                                  <FaPlus className="text-[10px]" />
                                  <span>Add Lecture</span>
                                </button>
                              </div>
                            </div>

                            {/* LECTURES UNDER THIS MODULE */}
                            <div className="divide-y divide-slate-100">
                              {secLectures.length === 0 ? (
                                <div className="p-4 text-center text-xs text-slate-400 bg-slate-50/60">
                                  No lectures uploaded in this module yet. Click "+ Add Lecture" above.
                                </div>
                              ) : (
                                secLectures.map((lec, lIdx) => (
                                  <div
                                    key={lec.id}
                                    className="p-3.5 hover:bg-amber-50/40 transition flex items-center justify-between gap-4"
                                  >
                                    <div className="flex items-center gap-3 min-w-0">
                                      <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-[#7C2D12] font-black text-xs flex items-center justify-center shrink-0">
                                        {lec.lecture_number || lIdx + 1}
                                      </span>
                                      <div className="min-w-0">
                                        <span className="font-bold text-slate-800 text-xs sm:text-sm block truncate">
                                          {lec.title}
                                        </span>
                                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                                          <span className="flex items-center gap-1">
                                            <FaClock className="text-[10px]" />
                                            {lec.duration || "25m"}
                                          </span>
                                          <span className="text-slate-400 font-semibold">
                                            • Lecture {lec.lecture_number || lIdx + 1} of {secLectures.length}
                                          </span>
                                          {lec.is_free_preview && (
                                            <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold border border-emerald-200">
                                              Free Preview
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                      {lec.video_url && (
                                        <a
                                          href={lec.video_url}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded text-xs transition"
                                          title="Open Video Stream"
                                        >
                                          <FaExternalLinkAlt />
                                        </a>
                                      )}
                                      <button
                                        onClick={() => handleDeleteLecture(lec.id, lec.title)}
                                        className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white p-2 rounded text-xs transition cursor-pointer"
                                        title="Delete Lecture"
                                      >
                                        <FaTrash />
                                      </button>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        );
                      })}

                      {/* UNASSIGNED LECTURES (if any exist) */}
                      {(() => {
                        const secIds = new Set(studioSections.map((s) => Number(s.id)));
                        const unassigned = studioLectures.filter(
                          (l) => !l.section_id || !secIds.has(Number(l.section_id))
                        );
                        if (unassigned.length === 0) return null;
                        return (
                          <div className="border border-amber-200 rounded-xl overflow-hidden shadow-xs bg-white">
                            <div className="bg-amber-100 text-amber-900 px-4 py-2.5 flex items-center justify-between border-b border-amber-200">
                              <span className="font-bold text-xs">General / Unassigned Lectures</span>
                              <span className="text-xs font-bold text-amber-800">{unassigned.length} Lectures</span>
                            </div>
                            <div className="divide-y divide-slate-100">
                              {unassigned.map((lec, idx) => (
                                <div key={lec.id} className="p-3.5 flex items-center justify-between gap-4">
                                  <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                                      {idx + 1}
                                    </span>
                                    <div>
                                      <span className="font-bold text-slate-800 text-xs sm:text-sm block">{lec.title}</span>
                                      <span className="text-[11px] text-slate-500">{lec.duration || "25m"}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {lec.video_url && (
                                      <a href={lec.video_url} target="_blank" rel="noreferrer" className="p-2 bg-slate-100 rounded text-xs">
                                        <FaExternalLinkAlt />
                                      </a>
                                    )}
                                    <button onClick={() => handleDeleteLecture(lec.id, lec.title)} className="p-2 bg-red-50 text-red-600 rounded text-xs">
                                      <FaTrash />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

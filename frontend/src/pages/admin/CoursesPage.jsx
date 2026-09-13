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

  // Upload new lecture
  const handleUploadLecture = async (e) => {
    e.preventDefault();
    if (!lectureForm.title.trim()) {
      alert("Please enter a lecture title.");
      return;
    }
    try {
      setUploadingLecture(true);
      await api.post("/api/lectures/upload", {
        course_id: studioCourse.id,
        section_id: lectureForm.section_id ? Number(lectureForm.section_id) : null,
        title: lectureForm.title.trim(),
        duration: lectureForm.duration || "25m",
        video_url:
          lectureForm.video_url ||
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        pdf_url: lectureForm.pdf_url || null,
        description: lectureForm.description || "",
        is_free_preview: lectureForm.is_free_preview,
      });

      showNotification("success", `Recorded video lecture "${lectureForm.title}" uploaded successfully! 🚀`);
      setLectureForm({
        title: "",
        section_id: studioSections[0]?.id || "",
        duration: "25m",
        video_url: "",
        pdf_url: "",
        description: "",
        is_free_preview: false,
      });

      // Refresh studio lectures
      const lecRes = await api.get(`/api/lectures/${studioCourse.id}`);
      setStudioLectures(lecRes.data?.lectures || lecRes.data || []);
      setStudioTab("modules");
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.response?.data?.message || "Failed to upload video lecture.");
    } finally {
      setUploadingLecture(false);
    }
  };

  // Add new section/module
  const handleAddSection = async (e) => {
    e.preventDefault();
    if (!newSectionTitle.trim()) return;
    try {
      setAddingSection(true);
      const res = await api.post("/api/sections", {
        course_id: studioCourse.id,
        title: newSectionTitle.trim(),
      });
      showNotification("success", "Curriculum module created successfully!");
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
                        placeholder="e.g. Lesson 4: Google Ads Search Campaigns"
                        value={lectureForm.title}
                        onChange={(e) => setLectureForm({ ...lectureForm, title: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:bg-white focus:border-[#D4A017] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Select Curriculum Module *
                      </label>
                      <select
                        value={lectureForm.section_id}
                        onChange={(e) => setLectureForm({ ...lectureForm, section_id: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm focus:bg-white focus:border-[#D4A017] focus:outline-none"
                      >
                        {studioSections.length === 0 ? (
                          <option value="">No modules created yet (Add one above)</option>
                        ) : (
                          studioSections.map((sec) => (
                            <option key={sec.id} value={sec.id}>
                              {sec.title}
                            </option>
                          ))
                        )}
                      </select>
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
                /* ================= TAB 2: MODULES & LECTURES LIST ================= */
                <div className="space-y-4">
                  {studioLectures.length === 0 ? (
                    <div className="py-8 text-center text-slate-500">
                      <p className="text-sm">No lectures uploaded for this course yet.</p>
                      <button
                        onClick={() => setStudioTab("upload")}
                        className="mt-2 text-xs font-bold text-[#7C2D12] hover:underline"
                      >
                        Click here to upload the first video lecture
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                      {studioLectures.map((lec, idx) => (
                        <div
                          key={lec.id}
                          className="p-3.5 bg-white hover:bg-slate-50 transition flex items-center justify-between gap-4"
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

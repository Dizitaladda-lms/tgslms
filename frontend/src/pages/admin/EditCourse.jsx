import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaSave,
  FaPlus,
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes,
  FaVideo,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner,
  FaRupeeSign,
  FaLayerGroup,
  FaBookOpen,
} from "react-icons/fa";
import api from "../../lib/api";

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  // All courses list for quick switching
  const [coursesList, setCoursesList] = useState([]);
  const [activeId, setActiveId] = useState(id || "");
  const [loading, setLoading] = useState(true);
  const [savingCourse, setSavingCourse] = useState(false);

  // Status Banner
  const [banner, setBanner] = useState({ type: "", message: "" });
  const showBanner = (type, message) => {
    setBanner({ type, message });
    setTimeout(() => setBanner({ type: "", message: "" }), 5000);
  };

  // Course Form Data
  const [formData, setFormData] = useState({
    id: "",
    course_id: "",
    title: "",
    description: "",
    price: "",
    original_price: "",
    duration: "",
    level: "Beginner",
    category: "Digital Marketing",
    teacher: "",
    thumbnail: "",
    is_published: true,
  });

  // Sections / Modules Data
  const [sections, setSections] = useState([]);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [addingModule, setAddingModule] = useState(false);

  // Inline editing of a module
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingOrder, setEditingOrder] = useState(1);
  const [savingSection, setSavingSection] = useState(false);
  const [deletingSectionId, setDeletingSectionId] = useState(null);

  // 1. Fetch all courses for the dropdown switcher
  useEffect(() => {
    const fetchCoursesList = async () => {
      try {
        const res = await api.get("/api/courses");
        const list = res.data?.courses || res.data || [];
        setCoursesList(list);

        // If no ID in URL, default to first course
        if (!id && list.length > 0) {
          setActiveId(String(list[0].id));
          navigate(`/admin/edit-course/${list[0].id}`, { replace: true });
        }
      } catch (err) {
        console.error("Failed to load courses list:", err);
      }
    };
    fetchCoursesList();
  }, [id, navigate]);

  // 2. Fetch specific course details and sections whenever activeId or id changes
  useEffect(() => {
    const targetId = id || activeId;
    if (!targetId) return;

    const fetchCourseData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/api/courses/${targetId}`);
        const c = res.data?.course;

        if (c) {
          setFormData({
            id: c.id || targetId,
            course_id: c.course_id || "",
            title: c.title || "",
            description: c.description || "",
            price: c.price !== undefined ? String(c.price) : "",
            original_price:
              c.original_price !== undefined
                ? String(c.original_price)
                : c.originalPrice !== undefined
                ? String(c.originalPrice)
                : "",
            duration: c.duration || "",
            level: c.level || "Beginner",
            category: c.category || "Digital Marketing",
            teacher: c.teacher || "",
            thumbnail: c.thumbnail || "",
            is_published: c.is_published !== false,
          });

          // Sections can be in course.sections or fetched separately
          if (Array.isArray(c.sections) && c.sections.length > 0) {
            setSections(c.sections);
          } else {
            // Fetch sections explicitly
            const secRes = await api.get(`/api/sections?courseId=${c.id || targetId}`);
            setSections(secRes.data?.sections || []);
          }
        }
      } catch (err) {
        console.error("Failed to load course details:", err);
        showBanner("error", "Failed to load course details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id, activeId]);

  // Handle course switcher dropdown
  const handleCourseSwitch = (e) => {
    const newId = e.target.value;
    if (newId) {
      setActiveId(newId);
      navigate(`/admin/edit-course/${newId}`);
    }
  };

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 3. Save Course Details
  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    setSavingCourse(true);

    try {
      const targetId = formData.id || id;
      const payload = {
        ...formData,
        price: Number(formData.price),
        original_price: formData.original_price ? Number(formData.original_price) : Number(formData.price),
      };

      const res = await api.put(`/api/admin/edit-course/${targetId}`, payload);
      showBanner("success", res.data?.message || "Course updated successfully in Database! 🚀");

      // Update course in coursesList as well so dropdown reflects the new title/price
      setCoursesList((prev) =>
        prev.map((c) =>
          String(c.id) === String(targetId)
            ? { ...c, title: formData.title, price: Number(formData.price) }
            : c
        )
      );
    } catch (err) {
      console.error("Course update failed:", err);
      showBanner("error", err.response?.data?.message || "Course update failed. Please verify credentials.");
    } finally {
      setSavingCourse(false);
    }
  };

  // 4. Add New Module / Section
  const handleAddModule = async (e) => {
    e.preventDefault();
    if (!newModuleTitle.trim()) return;

    setAddingModule(true);
    try {
      const targetCourseId = formData.id || id;
      const res = await api.post("/api/sections/create", {
        title: newModuleTitle.trim(),
        courseId: targetCourseId,
        order_num: sections.length + 1,
      });

      if (res.data?.section) {
        setSections((prev) => [...prev, res.data.section]);
        setNewModuleTitle("");
        showBanner("success", `Module "${newModuleTitle.trim()}" added successfully!`);
      }
    } catch (err) {
      console.error("Failed to add section:", err);
      showBanner("error", err.response?.data?.message || "Failed to add module.");
    } finally {
      setAddingModule(false);
    }
  };

  // 5. Start inline rename
  const handleStartEditSection = (sec) => {
    setEditingSectionId(sec.id);
    setEditingTitle(sec.title);
    setEditingOrder(sec.order_num || 1);
  };

  // 6. Save renamed module
  const handleSaveSection = async (secId) => {
    if (!editingTitle.trim()) return;
    setSavingSection(true);

    try {
      const res = await api.put(`/api/sections/${secId}`, {
        title: editingTitle.trim(),
        order_num: Number(editingOrder),
      });

      if (res.data?.success) {
        setSections((prev) =>
          prev.map((s) =>
            s.id === secId
              ? { ...s, title: editingTitle.trim(), order_num: Number(editingOrder) }
              : s
          )
        );
        setEditingSectionId(null);
        showBanner("success", "Module updated successfully!");
      }
    } catch (err) {
      console.error("Failed to update section:", err);
      showBanner("error", err.response?.data?.message || "Failed to update module.");
    } finally {
      setSavingSection(false);
    }
  };

  // 7. Delete Module
  const handleDeleteSection = async (secId, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete module "${title}"?\nAll lectures inside this module will be removed.`
    );
    if (!confirmDelete) return;

    setDeletingSectionId(secId);
    try {
      await api.delete(`/api/sections/${secId}`);
      setSections((prev) => prev.filter((s) => s.id !== secId));
      showBanner("success", `Module "${title}" deleted successfully.`);
    } catch (err) {
      console.error("Failed to delete section:", err);
      showBanner("error", err.response?.data?.message || "Failed to delete module.");
    } finally {
      setDeletingSectionId(null);
    }
  };

  // Calculate discount %
  const currentPrice = Number(formData.price) || 0;
  const originalPrice = Number(formData.original_price) || 0;
  const discountPercent =
    originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0B1220] to-black text-white p-4 sm:p-8 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* TOP BAR / NAVIGATION */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/courses"
              className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-2 text-sm font-semibold transition"
            >
              <FaArrowLeft className="text-cyan-400" />
              All Courses
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
                Course & Curriculum Editor ✏️
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm">
                Edit prices, titles, instructor info, and manage course syllabus modules with live database sync.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={`/admin/content-manager?courseId=${formData.id || id}`}
              className="bg-[#D4A017] hover:bg-[#b8890f] text-[#0B1220] px-4 py-2.5 rounded-2xl font-bold flex items-center gap-2 text-sm shadow-md transition"
            >
              <FaVideo />
              Manage Content (Videos/Quizzes)
            </Link>
            <Link
              to={`/course/${formData.course_id || formData.id || id}`}
              target="_blank"
              rel="noreferrer"
              className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-2 text-sm font-semibold transition"
            >
              <FaExternalLinkAlt className="text-slate-400" />
              Preview Course
            </Link>
          </div>
        </div>

        {/* NOTIFICATION BANNER */}
        {banner.message && (
          <div
            className={`p-4 rounded-2xl flex items-center gap-3 border shadow-xl animate-fade-in ${
              banner.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            {banner.type === "success" ? (
              <FaCheckCircle className="text-xl shrink-0" />
            ) : (
              <FaExclamationCircle className="text-xl shrink-0" />
            )}
            <span className="font-medium text-sm sm:text-base">{banner.message}</span>
          </div>
        )}

        {/* COURSE SWITCHER DROPDOWN */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-6 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FaBookOpen />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                Select Course to Edit
              </p>
              <p className="text-xs text-slate-500">
                Switching courses instantly loads all details & modules
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto min-w-[320px] sm:min-w-[420px]">
            <select
              value={formData.id || activeId}
              onChange={handleCourseSwitch}
              className="w-full bg-slate-900 border border-cyan-500/40 focus:border-cyan-400 rounded-2xl p-3.5 text-white font-semibold outline-none cursor-pointer shadow-inner"
            >
              {coursesList.map((c) => (
                <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                  #{c.id} — {c.title} (₹{c.price})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* SECURITY & PRICE NOTICE */}
        <div className="bg-gradient-to-r from-blue-900/20 via-cyan-900/10 to-transparent border border-cyan-500/20 rounded-3xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
            <FaRupeeSign className="text-lg" />
          </div>
          <div>
            <h4 className="text-cyan-300 font-bold text-sm sm:text-base">
              Authoritative Database Pricing & Anti-Tamper Protection
            </h4>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
              Course prices saved in this form are strictly enforced at checkout. Razorpay verifies this exact database amount on order creation and signature verification. Client-side browser tampering in DevTools is automatically defeated.
            </p>
          </div>
        </div>

        {/* MAIN TWO-COLUMN WORKSPACE */}
        {loading ? (
          <div className="py-24 text-center">
            <FaSpinner className="animate-spin text-5xl text-cyan-400 mx-auto" />
            <p className="text-slate-400 mt-4 text-base font-semibold">
              Loading course details & syllabus...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT COLUMN: COURSE DETAILS & PRICING (7 COLS) */}
            <div className="lg:col-span-7 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[36px] p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
                    Course Information 📋
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Course ID: <span className="text-cyan-400 font-mono font-bold">#{formData.id}</span> | Slug: <span className="text-slate-300 font-mono">{formData.course_id || "None"}</span>
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    formData.is_published
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  }`}
                >
                  {formData.is_published ? "Published" : "Draft"}
                </span>
              </div>

              <form onSubmit={handleCourseSubmit} className="space-y-6">
                {/* TITLE */}
                <div>
                  <label className="text-sm font-bold text-slate-300 block mb-2">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-slate-900/60 border border-white/10 focus:border-cyan-400 rounded-2xl p-4 text-white outline-none transition"
                    placeholder="e.g. Digital Marketing Course for Beginners"
                    required
                  />
                </div>

                {/* SLUG & CATEGORY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-slate-300 block mb-2">
                      Course Slug / Code
                    </label>
                    <input
                      type="text"
                      name="course_id"
                      value={formData.course_id}
                      onChange={handleChange}
                      className="w-full bg-slate-900/60 border border-white/10 focus:border-cyan-400 rounded-2xl p-4 text-white font-mono text-sm outline-none transition"
                      placeholder="e.g. dm-beginners"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-300 block mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-slate-900/60 border border-white/10 focus:border-cyan-400 rounded-2xl p-4 text-white outline-none transition"
                    >
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Cyber Security">Cyber Security</option>
                      <option value="Data Analytics">Data Analytics</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Web Development">Web Development</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                </div>

                {/* LEVEL & DURATION */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-slate-300 block mb-2">
                      Level
                    </label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className="w-full bg-slate-900/60 border border-white/10 focus:border-cyan-400 rounded-2xl p-4 text-white outline-none transition"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Professional">Professional</option>
                      <option value="Expert">Expert</option>
                      <option value="Job-Ready Diploma">Job-Ready Diploma</option>
                      <option value="Flagship Master Diploma">Flagship Master Diploma</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-300 block mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full bg-slate-900/60 border border-white/10 focus:border-cyan-400 rounded-2xl p-4 text-white outline-none transition"
                      placeholder="e.g. 3 Months / 12 Months"
                      required
                    />
                  </div>
                </div>

                {/* TEACHER */}
                <div>
                  <label className="text-sm font-bold text-slate-300 block mb-2">
                    Teacher / Lead Instructor
                  </label>
                  <input
                    type="text"
                    name="teacher"
                    value={formData.teacher}
                    onChange={handleChange}
                    className="w-full bg-slate-900/60 border border-white/10 focus:border-cyan-400 rounded-2xl p-4 text-white outline-none transition"
                    placeholder="e.g. Dr. Gulshan Kumar"
                    required
                  />
                </div>

                {/* PRICING CARD */}
                <div className="bg-slate-950/70 border border-emerald-500/20 rounded-3xl p-5 space-y-4 shadow-inner">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                      <FaRupeeSign /> Pricing Settings
                    </span>
                    {discountPercent > 0 && (
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-black">
                        {discountPercent}% OFF APPLIED
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-400 block mb-1">
                        Selling Price (₹) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-3.5 text-slate-400 font-bold">₹</span>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          className="w-full bg-slate-900 border border-white/10 focus:border-emerald-400 rounded-2xl p-3 pl-8 text-emerald-400 text-lg font-black outline-none transition"
                          placeholder="25000"
                          required
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">Amount charged by Razorpay</p>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400 block mb-1">
                        Original / Cut Price (₹)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-3.5 text-slate-400 font-bold">₹</span>
                        <input
                          type="number"
                          name="original_price"
                          value={formData.original_price}
                          onChange={handleChange}
                          className="w-full bg-slate-900 border border-white/10 focus:border-cyan-400 rounded-2xl p-3 pl-8 text-slate-300 text-lg font-bold outline-none transition"
                          placeholder="30000"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">Strikethrough price on frontend</p>
                    </div>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="text-sm font-bold text-slate-300 block mb-2">
                    Course Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full bg-slate-900/60 border border-white/10 focus:border-cyan-400 rounded-2xl p-4 text-white text-sm outline-none transition h-32 leading-relaxed"
                    placeholder="Enter comprehensive course description..."
                    required
                  />
                </div>

                {/* THUMBNAIL URL & PREVIEW */}
                <div>
                  <label className="text-sm font-bold text-slate-300 block mb-2">
                    Course Thumbnail Image URL
                  </label>
                  <input
                    type="url"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    className="w-full bg-slate-900/60 border border-white/10 focus:border-cyan-400 rounded-2xl p-4 text-white text-sm outline-none transition"
                    placeholder="https://images.unsplash.com/..."
                  />

                  {formData.thumbnail && (
                    <div className="mt-3 relative rounded-2xl overflow-hidden border border-white/10 h-44 bg-slate-900">
                      <img
                        src={formData.thumbnail}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop";
                        }}
                      />
                      <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-300">
                        Live Preview
                      </span>
                    </div>
                  )}
                </div>

                {/* PUBLISH TOGGLE */}
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="is_published"
                    name="is_published"
                    checked={formData.is_published}
                    onChange={handleChange}
                    className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
                  />
                  <label htmlFor="is_published" className="text-sm font-semibold text-slate-300 cursor-pointer">
                    Publish Course (Visible to students on website and catalogue)
                  </label>
                </div>

                {/* SAVE BUTTON */}
                <button
                  type="submit"
                  disabled={savingCourse}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black py-4 px-6 rounded-2xl text-lg shadow-xl flex items-center justify-center gap-3 transition cursor-pointer disabled:opacity-50"
                >
                  {savingCourse ? (
                    <>
                      <FaSpinner className="animate-spin text-xl" />
                      Saving to Database...
                    </>
                  ) : (
                    <>
                      <FaSave className="text-xl" />
                      Save Course Changes 💾
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* RIGHT COLUMN: MODULES & SYLLABUS MANAGEMENT (5 COLS) */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[36px] p-6 sm:p-8 shadow-2xl space-y-6 flex flex-col">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
                    <FaLayerGroup className="text-[#D4A017]" />
                    Modules / Syllabus 📑
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Manage course curriculum ({sections.length} Modules)
                  </p>
                </div>
                <span className="bg-[#D4A017]/20 text-[#D4A017] border border-[#D4A017]/30 px-3 py-1 rounded-full text-xs font-bold">
                  {sections.length} Modules
                </span>
              </div>

              {/* QUICK ADD MODULE FORM */}
              <form onSubmit={handleAddModule} className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 space-y-3">
                <label className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
                  + Add New Module / Section
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newModuleTitle}
                    onChange={(e) => setNewModuleTitle(e.target.value)}
                    placeholder="e.g. Module 10: AI Marketing Automation"
                    className="flex-1 bg-slate-950 border border-white/10 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition"
                  />
                  <button
                    type="submit"
                    disabled={addingModule || !newModuleTitle.trim()}
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm transition flex items-center gap-1.5 shrink-0 disabled:opacity-40 cursor-pointer shadow-md"
                  >
                    {addingModule ? <FaSpinner className="animate-spin" /> : <FaPlus />}
                    Add
                  </button>
                </div>
              </form>

              {/* MODULES LIST */}
              <div className="flex-1 space-y-3 overflow-y-auto max-h-[620px] pr-1">
                {sections.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-white/10 rounded-3xl p-6">
                    <FaLayerGroup className="text-4xl text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400 text-sm font-semibold">
                      No modules added yet for this course.
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                      Type a module name above and click "Add" to create syllabus sections.
                    </p>
                  </div>
                ) : (
                  sections.map((sec, idx) => {
                    const isEditing = editingSectionId === sec.id;
                    const isDeleting = deletingSectionId === sec.id;

                    return (
                      <div
                        key={sec.id}
                        className={`p-4 rounded-2xl border transition ${
                          isEditing
                            ? "bg-blue-950/40 border-cyan-400/50 shadow-lg"
                            : "bg-slate-900/50 hover:bg-slate-900/80 border-white/5 hover:border-white/20"
                        }`}
                      >
                        {isEditing ? (
                          // INLINE EDIT FORM
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-cyan-400 font-bold shrink-0">
                                Order:
                              </span>
                              <input
                                type="number"
                                value={editingOrder}
                                onChange={(e) => setEditingOrder(e.target.value)}
                                className="w-16 bg-slate-950 border border-white/20 rounded-lg px-2 py-1 text-xs text-white font-mono text-center outline-none"
                              />
                            </div>
                            <input
                              type="text"
                              value={editingTitle}
                              onChange={(e) => setEditingTitle(e.target.value)}
                              className="w-full bg-slate-950 border border-cyan-400 rounded-xl px-3 py-2 text-sm text-white outline-none"
                              autoFocus
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setEditingSectionId(null)}
                                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1 transition"
                              >
                                <FaTimes /> Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSaveSection(sec.id)}
                                disabled={savingSection}
                                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1 transition disabled:opacity-50"
                              >
                                {savingSection ? <FaSpinner className="animate-spin" /> : <FaCheck />}
                                Save Module
                              </button>
                            </div>
                          </div>
                        ) : (
                          // VIEW MODE
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              <span className="w-7 h-7 rounded-xl bg-white/10 border border-white/10 text-slate-300 flex items-center justify-center text-xs font-bold font-mono shrink-0 mt-0.5">
                                #{sec.order_num || idx + 1}
                              </span>
                              <div className="min-w-0 flex-1">
                                <h4 className="text-sm font-bold text-white leading-snug break-words">
                                  {sec.title}
                                </h4>
                                {Array.isArray(sec.lectures) && (
                                  <p className="text-[11px] text-slate-400 mt-1">
                                    {sec.lectures.length} {sec.lectures.length === 1 ? "lecture" : "lectures"}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleStartEditSection(sec)}
                                title="Rename Module"
                                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-400 flex items-center justify-center text-xs transition cursor-pointer"
                              >
                                <FaEdit />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteSection(sec.id, sec.title)}
                                disabled={isDeleting}
                                title="Delete Module"
                                className="w-8 h-8 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center text-xs transition cursor-pointer disabled:opacity-50"
                              >
                                {isDeleting ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* QUICK LINK TO CONTENT MANAGER */}
              <div className="pt-3 border-t border-white/10">
                <Link
                  to={`/admin/content-manager?courseId=${formData.id || id}`}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition py-3 rounded-2xl font-bold flex items-center justify-center gap-2 text-xs"
                >
                  <FaVideo className="text-[#D4A017]" />
                  Open Video Lectures & Assignments Editor
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

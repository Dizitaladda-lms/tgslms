import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FaVideo,
  FaFileAlt,
  FaTasks,
  FaPlus,
  FaTrash,
  FaPlayCircle,
  FaFolderPlus,
  FaClock,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import api from "../../lib/api";

export default function AdminContentManager() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCourseId = searchParams.get("courseId") || "";

  // All courses for dropdown
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId);
  const [loading, setLoading] = useState(true);

  // Active Tab: "videos" | "quizzes" | "assignments"
  const [activeTab, setActiveTab] = useState("videos");

  // Course Data
  const [sections, setSections] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [assignments, setAssignments] = useState([]);

  // Notifications / status banner
  const [banner, setBanner] = useState({ type: "", message: "" });
  const showBanner = (type, message) => {
    setBanner({ type, message });
    setTimeout(() => setBanner({ type: "", message: "" }), 5000);
  };

  // -------------------------------------------------------------
  // FORM STATES: 1. NEW SECTION MODAL
  // -------------------------------------------------------------
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [savingSection, setSavingSection] = useState(false);

  // -------------------------------------------------------------
  // FORM STATES: 2. NEW LECTURE
  // -------------------------------------------------------------
  const [lectureForm, setLectureForm] = useState({
    title: "",
    section_id: "",
    duration: "25m",
    video_url: "",
    pdf_url: "",
    description: "",
    is_free_preview: false,
  });
  const [savingLecture, setSavingLecture] = useState(false);

  // -------------------------------------------------------------
  // FORM STATES: 3. NEW QUIZ
  // -------------------------------------------------------------
  const [quizForm, setQuizForm] = useState({
    title: "",
    passing_score: 70,
    questions: [
      {
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctOption: "A",
      },
    ],
  });
  const [savingQuiz, setSavingQuiz] = useState(false);

  // -------------------------------------------------------------
  // FORM STATES: 4. NEW ASSIGNMENT
  // -------------------------------------------------------------
  const [assignmentForm, setAssignmentForm] = useState({
    title: "",
    description: "",
    due_date: "",
    max_marks: 100,
    resource_url: "",
  });
  const [savingAssignment, setSavingAssignment] = useState(false);

  // -------------------------------------------------------------
  // 1. FETCH ALL COURSES
  // -------------------------------------------------------------
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/courses");
        const list = res.data?.courses || res.data || [];
        setCourses(list);

        // If no course selected yet, select the first one
        if (!selectedCourseId && list.length > 0) {
          const firstId = String(list[0].id);
          setSelectedCourseId(firstId);
          setSearchParams({ courseId: firstId });
        }
      } catch (err) {
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // -------------------------------------------------------------
  // 2. FETCH COURSE CONTENT (Lectures, Sections, Quizzes, Assignments)
  // -------------------------------------------------------------
  const fetchCourseContent = useCallback(async (courseId) => {
    if (!courseId) return;
    try {
      const [secRes, lecRes, quizRes, assignRes] = await Promise.allSettled([
        api.get(`/api/sections?courseId=${courseId}`),
        api.get(`/api/lectures?courseId=${courseId}`),
        api.get(`/api/quizzes?courseId=${courseId}`),
        api.get(`/api/assignments?courseId=${courseId}`),
      ]);

      if (secRes.status === "fulfilled") {
        setSections(secRes.value.data?.sections || []);
      }
      if (lecRes.status === "fulfilled") {
        setLectures(lecRes.value.data?.lectures || []);
      }
      if (quizRes.status === "fulfilled") {
        setQuizzes(quizRes.value.data?.quizzes || []);
      }
      if (assignRes.status === "fulfilled") {
        setAssignments(assignRes.value.data?.assignments || []);
      }
    } catch (err) {
      console.error("Error fetching course content:", err);
    }
  }, []);

  useEffect(() => {
    if (selectedCourseId) {
      fetchCourseContent(selectedCourseId);
    }
  }, [selectedCourseId, fetchCourseContent]);

  const handleCourseChange = (id) => {
    setSelectedCourseId(id);
    setSearchParams({ courseId: id });
    setLectureForm((prev) => ({ ...prev, section_id: "" }));
  };

  const selectedCourse = courses.find(
    (c) => String(c.id) === String(selectedCourseId)
  );

  // -------------------------------------------------------------
  // 3. ACTION HANDLERS
  // -------------------------------------------------------------

  // --- Create Section ---
  const handleCreateSection = async (e) => {
    e.preventDefault();
    if (!newSectionTitle.trim()) return;
    try {
      setSavingSection(true);
      await api.post("/api/sections", {
        courseId: Number(selectedCourseId),
        title: newSectionTitle.trim(),
        orderNum: sections.length + 1,
      });
      setNewSectionTitle("");
      setShowSectionModal(false);
      showBanner("success", "New section module created successfully!");
      fetchCourseContent(selectedCourseId);
    } catch (err) {
      showBanner("error", err.response?.data?.message || "Failed to create section");
    } finally {
      setSavingSection(false);
    }
  };

  // --- Upload / Create Lecture ---
  const handleCreateLecture = async (e) => {
    e.preventDefault();
    if (!lectureForm.title.trim()) {
      showBanner("error", "Lecture title is required");
      return;
    }
    try {
      setSavingLecture(true);
      await api.post("/api/lectures/upload", {
        course_id: Number(selectedCourseId),
        section_id: lectureForm.section_id ? Number(lectureForm.section_id) : null,
        title: lectureForm.title.trim(),
        duration: lectureForm.duration || "25m",
        video_url: lectureForm.video_url || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        pdf_url: lectureForm.pdf_url,
        description: lectureForm.description,
        is_free_preview: lectureForm.is_free_preview,
      });
      showBanner("success", "Recorded video lecture added to course curriculum!");
      setLectureForm({
        title: "",
        section_id: "",
        duration: "25m",
        video_url: "",
        pdf_url: "",
        description: "",
        is_free_preview: false,
      });
      fetchCourseContent(selectedCourseId);
    } catch (err) {
      showBanner("error", err.response?.data?.message || "Failed to add lecture");
    } finally {
      setSavingLecture(false);
    }
  };

  // --- Delete Lecture ---
  const handleDeleteLecture = async (lectureId) => {
    if (!window.confirm("Are you sure you want to delete this recorded lecture?")) return;
    try {
      await api.delete(`/api/lectures/${lectureId}`);
      showBanner("success", "Lecture removed from course.");
      fetchCourseContent(selectedCourseId);
    } catch (err) {
      showBanner("error", err.response?.data?.message || "Failed to delete lecture");
    }
  };

  // --- Create Quiz / Test ---
  const handleAddQuestionField = () => {
    setQuizForm((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctOption: "A",
        },
      ],
    }));
  };

  const handleRemoveQuestionField = (idx) => {
    if (quizForm.questions.length === 1) return;
    setQuizForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== idx),
    }));
  };

  const handleQuestionChange = (idx, field, value) => {
    setQuizForm((prev) => {
      const updated = [...prev.questions];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, questions: updated };
    });
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    if (!quizForm.title.trim()) {
      showBanner("error", "Quiz title is required");
      return;
    }
    const validQuestions = quizForm.questions.filter((q) => q.question.trim().length > 0);
    if (validQuestions.length === 0) {
      showBanner("error", "Please add at least one question with options.");
      return;
    }

    try {
      setSavingQuiz(true);
      await api.post("/api/quizzes/create", {
        courseId: Number(selectedCourseId),
        title: quizForm.title.trim(),
        passing_score: Number(quizForm.passing_score) || 70,
        questions: validQuestions,
      });
      showBanner("success", "Test & Quiz published successfully for this course!");
      setQuizForm({
        title: "",
        passing_score: 70,
        questions: [
          {
            question: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            correctOption: "A",
          },
        ],
      });
      fetchCourseContent(selectedCourseId);
    } catch (err) {
      showBanner("error", err.response?.data?.message || "Failed to create quiz");
    } finally {
      setSavingQuiz(false);
    }
  };

  // --- Delete Quiz ---
  const handleDeleteQuiz = async (quizId) => {
    if (!window.confirm("Are you sure you want to delete this test/quiz?")) return;
    try {
      await api.delete(`/api/quizzes/${quizId}`);
      showBanner("success", "Quiz deleted successfully.");
      fetchCourseContent(selectedCourseId);
    } catch (err) {
      showBanner("error", err.response?.data?.message || "Failed to delete quiz");
    }
  };

  // --- Create Assignment ---
  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    if (!assignmentForm.title.trim()) {
      showBanner("error", "Assignment title is required");
      return;
    }

    try {
      setSavingAssignment(true);
      await api.post("/api/assignments/create", {
        courseId: Number(selectedCourseId),
        title: assignmentForm.title.trim(),
        description: assignmentForm.description.trim(),
        due_date: assignmentForm.due_date || null,
        max_marks: Number(assignmentForm.max_marks) || 100,
        resource_url: assignmentForm.resource_url.trim(),
      });
      showBanner("success", "Assignment project created for this course!");
      setAssignmentForm({
        title: "",
        description: "",
        due_date: "",
        max_marks: 100,
        resource_url: "",
      });
      fetchCourseContent(selectedCourseId);
    } catch (err) {
      showBanner("error", err.response?.data?.message || "Failed to create assignment");
    } finally {
      setSavingAssignment(false);
    }
  };

  // --- Delete Assignment ---
  const handleDeleteAssignment = async (assignmentId) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) return;
    try {
      await api.delete(`/api/assignments/${assignmentId}`);
      showBanner("success", "Assignment removed.");
      fetchCourseContent(selectedCourseId);
    } catch (err) {
      showBanner("error", err.response?.data?.message || "Failed to delete assignment");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      {/* =========================================================
          CLASSICAL ADMIN HEADER
      ========================================================= */}
      <header className="bg-[#0B1220] text-white border-b-4 border-[#D4A017] sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/courses"
              className="bg-[#1E293B] hover:bg-[#7C2D12] text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition flex items-center gap-2 border border-slate-700 shadow-sm"
            >
              <FaArrowLeft />
              <span>Back to Courses</span>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">
                Course Content & Curriculum Manager
              </h1>
              <p className="text-xs text-[#D4A017] font-medium">
                Upload Recorded Lectures, Build Tests & Assign Projects by Domain
              </p>
            </div>
          </div>

          {/* COURSE SELECTOR DROPDOWN */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="text-xs text-slate-300 font-semibold whitespace-nowrap">
              Target Course Domain:
            </label>
            <select
              value={selectedCourseId}
              onChange={(e) => handleCourseChange(e.target.value)}
              className="bg-[#1E293B] text-white font-medium text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-[#D4A017] transition w-full sm:w-80 cursor-pointer shadow-inner"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.duration || "Self-Paced"})
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* =========================================================
          BANNER NOTIFICATION
      ========================================================= */}
      {banner.message && (
        <div className="max-w-7xl mx-auto px-6 mt-4 w-full transition-all">
          <div
            className={`p-3.5 rounded-xl border flex items-center gap-3 text-sm font-semibold shadow-sm ${
              banner.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-red-50 text-red-800 border-red-200"
            }`}
          >
            {banner.type === "success" ? (
              <FaCheckCircle className="text-emerald-600 text-lg shrink-0" />
            ) : (
              <FaExclamationCircle className="text-red-600 text-lg shrink-0" />
            )}
            <span>{banner.message}</span>
          </div>
        </div>
      )}

      {/* =========================================================
          MAIN CONTAINER
      ========================================================= */}
      <main className="max-w-7xl mx-auto px-6 py-6 flex-1 w-full space-y-6">
        {/* SELECTED COURSE OVERVIEW STATS */}
        {selectedCourse && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-[#7C2D12] bg-[#7C2D12]/10 px-2.5 py-1 rounded uppercase tracking-wider">
                  Selected Course Curriculum
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mt-1.5">
                  {selectedCourse.title}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Instructor: {selectedCourse.teacher || "Dr. Gulshan Kumar"} • ID: {selectedCourse.course_id || selectedCourse.id}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={`/learn/${selectedCourse.id}`}
                  target="_blank"
                  className="bg-[#0B1220] hover:bg-[#7C2D12] text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-2 shadow-sm"
                >
                  <FaPlayCircle />
                  <span>Preview as Student</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </Link>
              </div>
            </div>

            {/* STAT TILES */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                  <FaVideo className="text-[#7C2D12]" /> Recorded Videos
                </span>
                <p className="text-2xl font-bold text-[#0B1220] mt-1">
                  {lectures.length}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                  <FaFileAlt className="text-[#0B1220]" /> Tests & Quizzes
                </span>
                <p className="text-2xl font-bold text-[#0B1220] mt-1">
                  {quizzes.length}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                  <FaTasks className="text-[#D4A017]" /> Assignments
                </span>
                <p className="text-2xl font-bold text-[#0B1220] mt-1">
                  {assignments.length}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                  <FaFolderPlus className="text-emerald-700" /> Syllabus Modules
                </span>
                <p className="text-2xl font-bold text-[#0B1220] mt-1">
                  {sections.length}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TABS NAVIGATION
        ========================================================= */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex border-b border-slate-200 bg-slate-50">
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex-1 py-3.5 px-4 font-bold text-xs sm:text-sm cursor-pointer transition flex items-center justify-center gap-2 border-b-2 ${
                activeTab === "videos"
                  ? "border-[#7C2D12] text-[#7C2D12] bg-white"
                  : "border-transparent text-slate-600 hover:text-[#0B1220]"
              }`}
            >
              <FaVideo />
              <span>1. Recorded Videos ({lectures.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("quizzes")}
              className={`flex-1 py-3.5 px-4 font-bold text-xs sm:text-sm cursor-pointer transition flex items-center justify-center gap-2 border-b-2 ${
                activeTab === "quizzes"
                  ? "border-[#7C2D12] text-[#7C2D12] bg-white"
                  : "border-transparent text-slate-600 hover:text-[#0B1220]"
              }`}
            >
              <FaFileAlt />
              <span>2. Tests & Quizzes ({quizzes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("assignments")}
              className={`flex-1 py-3.5 px-4 font-bold text-xs sm:text-sm cursor-pointer transition flex items-center justify-center gap-2 border-b-2 ${
                activeTab === "assignments"
                  ? "border-[#7C2D12] text-[#7C2D12] bg-white"
                  : "border-transparent text-slate-600 hover:text-[#0B1220]"
              }`}
            >
              <FaTasks />
              <span>3. Assignments & Projects ({assignments.length})</span>
            </button>
          </div>

          <div className="p-6">
            {/* =====================================================
                TAB 1: RECORDED VIDEOS (LECTURES)
            ===================================================== */}
            {activeTab === "videos" && (
              <div className="space-y-8">
                {/* UPLOAD FORM */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-200">
                    <div>
                      <h3 className="text-base font-bold text-[#0B1220] flex items-center gap-2">
                        <FaPlus className="text-[#7C2D12]" /> Upload / Add Recorded Video Lecture
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Students enrolled in this course will instantly see this recorded video in their learning playlist.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowSectionModal(true)}
                      className="bg-white hover:bg-slate-100 text-[#0B1220] border border-slate-300 text-xs font-bold px-3 py-2 rounded-lg transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <FaFolderPlus className="text-[#7C2D12]" />
                      <span>+ New Module Section</span>
                    </button>
                  </div>

                  <form onSubmit={handleCreateLecture} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Lecture Title *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Masterclass: Technical SEO & Schema Markup"
                          value={lectureForm.title}
                          onChange={(e) => setLectureForm({ ...lectureForm, title: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#7C2D12]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Curriculum Section / Module
                        </label>
                        <select
                          value={lectureForm.section_id}
                          onChange={(e) => setLectureForm({ ...lectureForm, section_id: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#7C2D12]"
                        >
                          <option value="">General Curriculum (No Section)</option>
                          {sections.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                          <span>Video Stream URL (Google Drive, YouTube, MP4)</span>
                          <span className="text-[10px] font-bold text-[#D4A017] bg-[#0B1220] px-2 py-0.5 rounded-md">
                            🛡️ Anti-Piracy Watermark Protected
                          </span>
                        </label>
                        <input
                          type="url"
                          placeholder="e.g. https://drive.google.com/file/d/1A2B3C.../view or https://youtu.be/..."
                          value={lectureForm.video_url}
                          onChange={(e) => setLectureForm({ ...lectureForm, video_url: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#7C2D12]"
                        />
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          💡 <strong>Google Drive Links Supported:</strong> Paste any Google Drive video link. (Ensure Drive file sharing is set to <em>"Anyone with the link can view"</em>). All drive videos stream with dynamic student watermark & anti-screen recording shield!
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Duration
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 25m or 1h 10m"
                          value={lectureForm.duration}
                          onChange={(e) => setLectureForm({ ...lectureForm, duration: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#7C2D12]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Class Notes / Slide Deck PDF URL (Optional)
                        </label>
                        <input
                          type="url"
                          placeholder="https://dizitaladda.com/notes/seo-handbook.pdf"
                          value={lectureForm.pdf_url}
                          onChange={(e) => setLectureForm({ ...lectureForm, pdf_url: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#7C2D12]"
                        />
                      </div>

                      <div className="flex items-center gap-3 pt-6">
                        <input
                          type="checkbox"
                          id="is_free_preview"
                          checked={lectureForm.is_free_preview}
                          onChange={(e) => setLectureForm({ ...lectureForm, is_free_preview: e.target.checked })}
                          className="w-4 h-4 text-[#7C2D12] rounded cursor-pointer"
                        />
                        <label htmlFor="is_free_preview" className="text-xs font-bold text-slate-700 cursor-pointer">
                          Allow as Free Preview Lecture (unlocked for prospective students)
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Lecture Overview / Practical Action Items
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Key concepts discussed, frameworks, tool logins, and step-by-step instructions..."
                        value={lectureForm.description}
                        onChange={(e) => setLectureForm({ ...lectureForm, description: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#7C2D12]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={savingLecture}
                      className="bg-[#0B1220] hover:bg-[#7C2D12] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                    >
                      <FaVideo />
                      <span>{savingLecture ? "Publishing Lecture..." : "Publish Video Lecture"}</span>
                    </button>
                  </form>
                </div>

                {/* CURRENT LECTURES LIST */}
                <div>
                  <h3 className="text-base font-bold text-[#0B1220] mb-3">
                    Existing Recorded Lectures ({lectures.length})
                  </h3>

                  {lectures.length === 0 ? (
                    <div className="border border-dashed border-slate-300 rounded-xl p-8 text-center text-xs text-slate-500 bg-slate-50">
                      No recorded videos uploaded for this course yet. Use the form above to add lectures.
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                      {lectures.map((lec, idx) => (
                        <div
                          key={lec.id}
                          className="p-4 hover:bg-slate-50 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#0B1220] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                              {idx + 1}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-bold text-sm text-[#0B1220]">
                                  {lec.title}
                                </h4>
                                {lec.is_free_preview && (
                                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                    Free Preview
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                                <span>Module: {lec.section_title || "General"}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <FaClock className="text-[10px]" /> {lec.duration || "25m"}
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                            {lec.video_url && (
                              <a
                                href={lec.video_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-semibold text-[#0B1220] hover:text-[#7C2D12] transition flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-lg"
                              >
                                <FaPlayCircle />
                                <span>Watch</span>
                              </a>
                            )}
                            <button
                              onClick={() => handleDeleteLecture(lec.id)}
                              className="text-xs font-bold text-red-600 hover:text-red-800 transition p-2 hover:bg-red-50 rounded-lg cursor-pointer"
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
              </div>
            )}

            {/* =====================================================
                TAB 2: TESTS & QUIZZES
            ===================================================== */}
            {activeTab === "quizzes" && (
              <div className="space-y-8">
                {/* CREATE QUIZ FORM */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <div className="mb-5 pb-3 border-b border-slate-200">
                    <h3 className="text-base font-bold text-[#0B1220] flex items-center gap-2">
                      <FaPlus className="text-[#7C2D12]" /> Create New Test / Quiz Assessment
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Assess student understanding with automated scoring. Only enrolled students will see these quizzes.
                    </p>
                  </div>

                  <form onSubmit={handleCreateQuiz} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Test / Quiz Title *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. SEO & Content Strategy Mid-Term Assessment"
                          value={quizForm.title}
                          onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#7C2D12]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Passing Score (%)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={quizForm.passing_score}
                          onChange={(e) => setQuizForm({ ...quizForm, passing_score: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#7C2D12]"
                        />
                      </div>
                    </div>

                    {/* QUESTIONS BUILDER */}
                    <div className="space-y-4 pt-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-[#0B1220] uppercase tracking-wider">
                          Questions Builder ({quizForm.questions.length})
                        </label>
                        <button
                          type="button"
                          onClick={handleAddQuestionField}
                          className="text-xs font-bold text-[#7C2D12] hover:text-[#991B1B] transition flex items-center gap-1 bg-white border border-[#7C2D12]/30 px-3 py-1.5 rounded-lg cursor-pointer shadow-sm"
                        >
                          <FaPlus /> <span>Add Question</span>
                        </button>
                      </div>

                      {quizForm.questions.map((q, qIdx) => (
                        <div
                          key={qIdx}
                          className="bg-white border border-slate-300 rounded-xl p-4 shadow-sm space-y-3"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-[#0B1220]">
                              Question {qIdx + 1}
                            </span>
                            {quizForm.questions.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveQuestionField(qIdx)}
                                className="text-xs text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          <input
                            type="text"
                            required
                            placeholder={`Enter question ${qIdx + 1} prompt...`}
                            value={q.question}
                            onChange={(e) => handleQuestionChange(qIdx, "question", e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#7C2D12]"
                          />

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <span className="text-[11px] font-bold text-slate-500">Option A</span>
                              <input
                                type="text"
                                required
                                placeholder="Option A text"
                                value={q.optionA}
                                onChange={(e) => handleQuestionChange(qIdx, "optionA", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#7C2D12] mt-0.5"
                              />
                            </div>
                            <div>
                              <span className="text-[11px] font-bold text-slate-500">Option B</span>
                              <input
                                type="text"
                                required
                                placeholder="Option B text"
                                value={q.optionB}
                                onChange={(e) => handleQuestionChange(qIdx, "optionB", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#7C2D12] mt-0.5"
                              />
                            </div>
                            <div>
                              <span className="text-[11px] font-bold text-slate-500">Option C</span>
                              <input
                                type="text"
                                required
                                placeholder="Option C text"
                                value={q.optionC}
                                onChange={(e) => handleQuestionChange(qIdx, "optionC", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#7C2D12] mt-0.5"
                              />
                            </div>
                            <div>
                              <span className="text-[11px] font-bold text-slate-500">Option D</span>
                              <input
                                type="text"
                                required
                                placeholder="Option D text"
                                value={q.optionD}
                                onChange={(e) => handleQuestionChange(qIdx, "optionD", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#7C2D12] mt-0.5"
                              />
                            </div>
                          </div>

                          <div className="pt-2 flex items-center gap-3">
                            <span className="text-xs font-bold text-slate-700">Correct Option:</span>
                            {["A", "B", "C", "D"].map((opt) => (
                              <label key={opt} className="flex items-center gap-1.5 text-xs font-bold text-[#0B1220] cursor-pointer">
                                <input
                                  type="radio"
                                  name={`correct_${qIdx}`}
                                  value={opt}
                                  checked={q.correctOption === opt}
                                  onChange={() => handleQuestionChange(qIdx, "correctOption", opt)}
                                  className="text-[#7C2D12] cursor-pointer"
                                />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="submit"
                      disabled={savingQuiz}
                      className="bg-[#0B1220] hover:bg-[#7C2D12] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                    >
                      <FaFileAlt />
                      <span>{savingQuiz ? "Publishing Test..." : "Publish Test / Quiz Assessment"}</span>
                    </button>
                  </form>
                </div>

                {/* EXISTING QUIZZES LIST */}
                <div>
                  <h3 className="text-base font-bold text-[#0B1220] mb-3">
                    Existing Tests & Quizzes for this Course ({quizzes.length})
                  </h3>

                  {quizzes.length === 0 ? (
                    <div className="border border-dashed border-slate-300 rounded-xl p-8 text-center text-xs text-slate-500 bg-slate-50">
                      No tests or quizzes created for this course yet. Use the builder above to publish assessments.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {quizzes.map((quiz) => (
                        <div
                          key={quiz.id}
                          className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow transition flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <span className="text-[10px] font-bold text-[#7C2D12] bg-[#7C2D12]/10 px-2 py-0.5 rounded uppercase">
                                Assessment #{quiz.id}
                              </span>
                              <button
                                onClick={() => handleDeleteQuiz(quiz.id)}
                                className="text-xs text-red-600 hover:text-red-800 p-1 rounded transition cursor-pointer"
                                title="Delete Quiz"
                              >
                                <FaTrash />
                              </button>
                            </div>
                            <h4 className="font-bold text-base text-[#0B1220] mt-2">
                              {quiz.title}
                            </h4>
                            <p className="text-xs text-slate-500 mt-1">
                              Passing Benchmark: <span className="font-semibold text-emerald-700">{quiz.passing_score || 70}%</span>
                            </p>

                            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                              <p className="font-semibold text-slate-800">
                                {quiz.questions?.length || quiz.total_questions || 0} Questions included
                              </p>
                              {quiz.questions && quiz.questions.slice(0, 2).map((q, i) => (
                                <p key={i} className="truncate text-slate-500 text-[11px]">
                                  Q{i + 1}: {q.question}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* =====================================================
                TAB 3: ASSIGNMENTS & PROJECTS
            ===================================================== */}
            {activeTab === "assignments" && (
              <div className="space-y-8">
                {/* CREATE ASSIGNMENT FORM */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <div className="mb-5 pb-3 border-b border-slate-200">
                    <h3 className="text-base font-bold text-[#0B1220] flex items-center gap-2">
                      <FaPlus className="text-[#7C2D12]" /> Create New Course Project / Assignment
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Assign practical live projects and deliverables. Students can submit live links and files directly.
                    </p>
                  </div>

                  <form onSubmit={handleCreateAssignment} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Assignment Project Title *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Live Meta Ads Lead Generation Funnel Audit"
                          value={assignmentForm.title}
                          onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#7C2D12]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Maximum Marks
                        </label>
                        <input
                          type="number"
                          value={assignmentForm.max_marks}
                          onChange={(e) => setAssignmentForm({ ...assignmentForm, max_marks: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#7C2D12]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Due Date (Optional)
                        </label>
                        <input
                          type="date"
                          value={assignmentForm.due_date}
                          onChange={(e) => setAssignmentForm({ ...assignmentForm, due_date: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#7C2D12]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Project Resource / Template Link (Optional)
                        </label>
                        <input
                          type="url"
                          placeholder="https://drive.google.com/folder/assignment-guidelines"
                          value={assignmentForm.resource_url}
                          onChange={(e) => setAssignmentForm({ ...assignmentForm, resource_url: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#7C2D12]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Detailed Project Instructions & Requirements
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Provide clear instructions on deliverables, file formats, required screenshots, and submission criteria..."
                        value={assignmentForm.description}
                        onChange={(e) => setAssignmentForm({ ...assignmentForm, description: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#7C2D12]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={savingAssignment}
                      className="bg-[#0B1220] hover:bg-[#7C2D12] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                    >
                      <FaTasks />
                      <span>{savingAssignment ? "Publishing Project..." : "Publish Assignment Project"}</span>
                    </button>
                  </form>
                </div>

                {/* EXISTING ASSIGNMENTS LIST */}
                <div>
                  <h3 className="text-base font-bold text-[#0B1220] mb-3">
                    Existing Assignments for this Course ({assignments.length})
                  </h3>

                  {assignments.length === 0 ? (
                    <div className="border border-dashed border-slate-300 rounded-xl p-8 text-center text-xs text-slate-500 bg-slate-50">
                      No assignments published for this course yet. Use the form above to add projects.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {assignments.map((assign) => (
                        <div
                          key={assign.id}
                          className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow transition flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <span className="text-[10px] font-bold text-[#7C2D12] bg-[#7C2D12]/10 px-2 py-0.5 rounded uppercase">
                                Assignment #{assign.id}
                              </span>
                              <button
                                onClick={() => handleDeleteAssignment(assign.id)}
                                className="text-xs text-red-600 hover:text-red-800 p-1 rounded transition cursor-pointer"
                                title="Delete Assignment"
                              >
                                <FaTrash />
                              </button>
                            </div>

                            <h4 className="font-bold text-base text-[#0B1220] mt-2">
                              {assign.title}
                            </h4>

                            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                              {assign.description || "No description provided."}
                            </p>

                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                              <span>Max Marks: <strong className="text-[#0B1220]">{assign.max_marks || 100}</strong></span>
                              <span>Due: <strong className="text-[#7C2D12]">{assign.due_date || "Ongoing"}</strong></span>
                            </div>

                            {assign.resource_url && (
                              <a
                                href={assign.resource_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1220] hover:text-[#7C2D12] mt-3"
                              >
                                <span>View Resource Material</span>
                                <FaExternalLinkAlt className="text-[10px]" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* =========================================================
          NEW SECTION / MODULE MODAL
      ========================================================= */}
      {showSectionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-[#0B1220]">
              Create New Curriculum Module
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Add a chapter/module to organize video lectures (e.g. Module 3: Advanced Paid Search Ads).
            </p>

            <form onSubmit={handleCreateSection} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Module Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Module 4: Performance Marketing & Conversion Tracking"
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#7C2D12]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSectionModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingSection}
                  className="bg-[#0B1220] hover:bg-[#7C2D12] text-white text-xs font-bold px-5 py-2 rounded-xl transition cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {savingSection ? "Creating..." : "Create Module"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

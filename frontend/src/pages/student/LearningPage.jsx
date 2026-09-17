import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import {
  FaPlayCircle,
  FaCheckCircle,
  FaArrowLeft,
  FaFilePdf,
  FaSignOutAlt,
  FaClock,
  FaBookOpen,
  FaChalkboardTeacher,
  FaExternalLinkAlt,
  FaWhatsapp,
  FaVideo,
  FaFileAlt,
  FaTasks,
  FaAward,
  FaCheck,
  FaTimes,
  FaPaperPlane,
  FaLock,
  FaUnlock,
} from "react-icons/fa";
import api from "../../lib/api";
import SecureVideoPlayer from "../../components/SecureVideoPlayer";

// Helper to compute sequential locking (Lesson N is locked until Lesson N-1 is completed)
const computeSequentialLocks = (rawLectures, userRole) => {
  if (userRole === "admin" || userRole === "teacher") {
    return rawLectures.map((l) => ({ ...l, is_locked: false }));
  }
  let prevCompleted = true;
  return rawLectures.map((l, idx) => {
    const isCompleted = Boolean(l.is_completed);
    const isLocked = idx === 0 ? false : !prevCompleted;
    if (!isCompleted) {
      prevCompleted = false;
    }
    return {
      ...l,
      is_completed: isCompleted,
      is_locked: isLocked,
    };
  });
};

const LearningPage = () => {
  const navigate = useNavigate();
  const { id: courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api
      .get("/api/students/me/profile")
      .then((res) => {
        if (res.data?.student) setProfile(res.data.student);
      })
      .catch(() => {});
  }, []);

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isPrivileged = storedUser?.role === "admin" || storedUser?.role === "teacher";
  const studentName = profile?.name || storedUser?.name || "Student";
  const studentEmail = profile?.email || storedUser?.email || "student@tsglms.com";
  const studentCode = profile?.student_id || profile?.course_code || `TSG-STU-${storedUser?.id || "001"}`;

  // Learning Mode: "lectures" | "quizzes" | "assignments"
  const [learningMode, setLearningMode] = useState("lectures");

  // Video Lecture States
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [marking, setMarking] = useState(false);
  const [activeTab, setActiveTab] = useState("overview"); // overview | notes | doubts

  // Locked Modal & Celebration Banner States
  const [lockAlertModal, setLockAlertModal] = useState({
    isOpen: false,
    targetLessonNumber: 1,
    targetTitle: "",
    prereqNumber: 1,
    prereqTitle: "",
    prereqLecture: null,
  });
  const [unlockBanner, setUnlockBanner] = useState(null);

  // Quiz Taking States
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitting, setQuizSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  // Assignment Submission States
  const [submissionUrls, setSubmissionUrls] = useState({});
  const [submittingAssignId, setSubmittingAssignId] = useState(null);
  const [submittedAssigns, setSubmittedAssigns] = useState({});

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const fetchCourseData = useCallback(async () => {
    try {
      const endpoint = courseId
        ? `/api/lectures?courseId=${courseId}`
        : "/api/lectures";

      const [lecRes, courseRes, quizRes, assignRes] = await Promise.allSettled([
        api.get(endpoint),
        courseId ? api.get(`/api/courses/${courseId}`) : Promise.reject(),
        api.get(`/api/quizzes?courseId=${courseId}`),
        api.get(`/api/assignments?courseId=${courseId}`),
      ]);

      if (lecRes.status === "fulfilled") {
        const rawLectures = lecRes.value.data?.lectures || lecRes.value.data || [];
        const enriched = computeSequentialLocks(rawLectures, storedUser?.role);
        setLectures(enriched);

        if (enriched.length > 0) {
          setSelectedLecture((prev) => {
            if (prev) {
              const matched = enriched.find((l) => l.id === prev.id);
              if (matched) return matched;
            }
            // Auto-resume: pick the first unlocked incomplete lecture, or fallback to first lecture
            const firstUnlockedIncomplete = enriched.find((l) => !l.is_locked && !l.is_completed);
            return firstUnlockedIncomplete || enriched[0];
          });
        }
      }

      if (courseRes.status === "fulfilled" && courseRes.value.data?.course) {
        setCourse(courseRes.value.data.course);
      }

      if (quizRes.status === "fulfilled") {
        setQuizzes(quizRes.value.data?.quizzes || []);
      }

      if (assignRes.status === "fulfilled") {
        setAssignments(assignRes.value.data?.assignments || []);
      }
    } catch (error) {
      console.error("FETCH ERROR:", error);
    }
  }, [courseId, storedUser?.role]);

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  const handleMarkComplete = async (lecId) => {
    try {
      setMarking(true);
      await api.post("/api/progress/mark-complete", {
        lectureId: lecId,
        courseId,
        completed: true,
      });

      // Update state locally with sequential lock recalculation immediately
      let currIdx = -1;
      let nextLecObj = null;

      setLectures((prev) => {
        currIdx = prev.findIndex((l) => l.id === lecId);
        const updated = prev.map((l) => (l.id === lecId ? { ...l, is_completed: true } : l));
        const recomputed = computeSequentialLocks(updated, storedUser?.role);
        if (currIdx !== -1 && currIdx < recomputed.length - 1) {
          nextLecObj = recomputed[currIdx + 1];
        }
        return recomputed;
      });

      setSelectedLecture((prev) =>
        prev?.id === lecId ? { ...prev, is_completed: true, is_locked: false } : prev
      );

      if (currIdx !== -1 && currIdx < lectures.length - 1) {
        const nextLec = lectures[currIdx + 1];
        setUnlockBanner({
          completedLessonNumber: currIdx + 1,
          nextLessonNumber: currIdx + 2,
          nextTitle: nextLec?.title || "Next Video",
          nextLecture: { ...nextLec, is_locked: false },
        });
      }

      fetchCourseData();
    } catch (err) {
      console.error("Error marking lecture complete:", err);
    } finally {
      setMarking(false);
    }
  };

  const handleAutoComplete = async (lecId, watchedSec) => {
    try {
      await api.post("/api/progress/update", {
        lectureId: lecId,
        courseId: course?.id,
        completed: true,
        watchedSeconds: watchedSec,
      });

      let currIdx = -1;
      setLectures((prev) => {
        currIdx = prev.findIndex((l) => l.id === lecId);
        const updated = prev.map((l) => (l.id === lecId ? { ...l, is_completed: true } : l));
        return computeSequentialLocks(updated, storedUser?.role);
      });

      setSelectedLecture((prev) =>
        prev?.id === lecId ? { ...prev, is_completed: true, is_locked: false } : prev
      );

      if (currIdx !== -1 && currIdx < lectures.length - 1) {
        const nextLec = lectures[currIdx + 1];
        setUnlockBanner({
          completedLessonNumber: currIdx + 1,
          nextLessonNumber: currIdx + 2,
          nextTitle: nextLec?.title || "Next Video",
          nextLecture: { ...nextLec, is_locked: false },
        });
      }

      fetchCourseData();
    } catch (err) {
      console.error("Auto complete sync notice:", err);
    }
  };

  const handleLectureClick = (lec, idx) => {
    const isLocked = lec.is_locked && !isPrivileged;
    if (isLocked) {
      // Find the first uncompleted lecture before this one
      const prereqIdx = lectures.slice(0, idx).findIndex((l) => !l.is_completed);
      const prereqLecture = prereqIdx !== -1 ? lectures[prereqIdx] : lectures[idx - 1] || lectures[0];
      const prereqNumber = (prereqIdx !== -1 ? prereqIdx : idx - 1) + 1;

      setLockAlertModal({
        isOpen: true,
        targetLessonNumber: idx + 1,
        targetTitle: lec.title,
        prereqNumber,
        prereqTitle: prereqLecture?.title || "Previous Lesson",
        prereqLecture,
      });
      return;
    }

    setSelectedLecture(lec);
    setUnlockBanner(null);
  };

  // -------------------------------------------------------------
  // QUIZ HANDLERS
  // -------------------------------------------------------------
  const handleSelectAnswer = (questionId, optionKey) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    if (!activeQuiz) return;

    try {
      setQuizSubmitting(true);
      const res = await api.post("/api/quizzes/submit", {
        quizId: activeQuiz.id,
        answers: quizAnswers,
      });

      const score = res.data?.score || 0;
      const total = res.data?.totalQuestions || activeQuiz.questions?.length || 1;
      const pct = Math.round((score / total) * 100);
      const passed = pct >= (activeQuiz.passing_score || 70);

      setQuizResult({
        score,
        total,
        percentage: pct,
        passed,
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit quiz");
    } finally {
      setQuizSubmitting(false);
    }
  };

  const handleStartQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setQuizAnswers({});
    setQuizResult(null);
  };

  // -------------------------------------------------------------
  // ASSIGNMENT HANDLERS
  // -------------------------------------------------------------
  const handleSubmitAssignment = async (assignId) => {
    const url = submissionUrls[assignId];
    if (!url || !url.trim()) {
      alert("Please paste your project or assignment solution link (e.g. Google Drive, GitHub, or live URL).");
      return;
    }

    try {
      setSubmittingAssignId(assignId);
      await api.post("/api/assignments/submit", {
        assignmentId: assignId,
        submissionUrl: url.trim(),
      });

      setSubmittedAssigns((prev) => ({
        ...prev,
        [assignId]: {
          url: url.trim(),
          submittedAt: new Date().toLocaleDateString(),
        },
      }));
      alert("Assignment submitted successfully! The mentor will review your submission.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit assignment");
    } finally {
      setSubmittingAssignId(null);
    }
  };

  const completedCount = lectures.filter((l) => l.is_completed).length;
  const progressPercent = lectures.length > 0 ? Math.round((completedCount / lectures.length) * 100) : 0;

  // Selected lecture analysis for locking and prerequisite guidance
  const selectedIdx = lectures.findIndex((l) => l.id === selectedLecture?.id);
  const isSelectedLocked =
    Boolean(selectedLecture?.is_locked) && !isPrivileged;
  const prereqIdxForSelected =
    selectedIdx > 0
      ? lectures.slice(0, selectedIdx).findIndex((l) => !l.is_completed)
      : -1;
  const prereqLecForSelected =
    prereqIdxForSelected !== -1
      ? lectures[prereqIdxForSelected]
      : selectedIdx > 0
      ? lectures[selectedIdx - 1]
      : null;
  const nextLecture =
    selectedIdx >= 0 && selectedIdx < lectures.length - 1 ? lectures[selectedIdx + 1] : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      {/* =========================================================
          CLASSICAL HEADER (NAVY #0B1220 + GOLD #D4A017)
      ========================================================= */}
      <header className="bg-[#0B1220] text-white border-b-4 border-[#D4A017] sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/student"
              className="bg-[#1E293B] hover:bg-[#7C2D12] text-white text-xs font-semibold px-3 py-2 rounded-lg transition flex items-center gap-1.5 border border-slate-700"
            >
              <FaArrowLeft />
              <span>Back to Dashboard</span>
            </Link>

            <div className="hidden sm:block border-l border-slate-700 pl-4">
              <h1 className="text-base font-bold text-white truncate max-w-md">
                {course?.title || "TSG Classroom"}
              </h1>
              <p className="text-[11px] text-[#D4A017] font-semibold flex items-center gap-2">
                <span>Instructor: {course?.teacher || "Dr. Gulshan Kumar"}</span>
                {isPrivileged && (
                  <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[9px] px-1.5 py-0.2 rounded font-black">
                    Admin Preview Mode
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-300">
              <span>Progress: {completedCount}/{lectures.length} ({progressPercent}%)</span>
              <div className="w-24 bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#D4A017] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-700 hover:bg-red-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition flex items-center gap-1 cursor-pointer"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          CONTENT MODE TABS: VIDEOS | TESTS/QUIZZES | ASSIGNMENTS
      ========================================================= */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-[57px] z-30">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 overflow-x-auto py-2.5">
          <button
            onClick={() => setLearningMode("lectures")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer shrink-0 ${
              learningMode === "lectures"
                ? "bg-[#0B1220] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <FaVideo className={learningMode === "lectures" ? "text-[#D4A017]" : "text-slate-500"} />
            <span>Recorded Lectures ({lectures.length})</span>
          </button>

          <button
            onClick={() => setLearningMode("quizzes")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer shrink-0 ${
              learningMode === "quizzes"
                ? "bg-[#0B1220] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <FaTasks className={learningMode === "quizzes" ? "text-[#D4A017]" : "text-slate-500"} />
            <span>Quizzes & Mock Tests ({quizzes.length})</span>
          </button>

          <button
            onClick={() => setLearningMode("assignments")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer shrink-0 ${
              learningMode === "assignments"
                ? "bg-[#0B1220] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <FaTasks className={learningMode === "assignments" ? "text-[#D4A017]" : "text-slate-500"} />
            <span>Assignments & Projects ({assignments.length})</span>
          </button>
        </div>
      </div>

      {/* =========================================================
          MODE 1: RECORDED VIDEO LECTURES
      ========================================================= */}
      {learningMode === "lectures" && (
        <div className="max-w-7xl mx-auto px-6 py-6 flex-1 w-full flex flex-col lg:flex-row gap-6">
          {/* LEFT/MAIN CONTENT: VIDEO PLAYER & DETAILS */}
          <div className="flex-1 space-y-6">
            {selectedLecture ? (
              <div>
                {/* UNLOCK CELEBRATION BANNER */}
                {unlockBanner && (
                  <div className="bg-gradient-to-r from-emerald-950 via-[#0B1220] to-[#0B1220] border-2 border-emerald-500 text-white p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 animate-fadeIn">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-xl text-emerald-300 shrink-0">
                        <FaCheckCircle />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-emerald-300 flex items-center gap-2">
                          <span>Lesson {unlockBanner.completedLessonNumber} Completed! 🎉</span>
                          <span className="text-[10px] bg-emerald-700/80 px-2 py-0.5 rounded text-white font-black">
                            +1 Lesson Unlocked
                          </span>
                        </h4>
                        <p className="text-xs text-slate-200 mt-0.5">
                          Shabaash! Agla video unlock ho gaya: <strong>Lesson {unlockBanner.nextLessonNumber} ({unlockBanner.nextTitle})</strong> 🔓
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {unlockBanner.nextLecture && (
                        <button
                          onClick={() => {
                            setSelectedLecture(unlockBanner.nextLecture);
                            setUnlockBanner(null);
                          }}
                          className="bg-[#D4A017] hover:bg-[#b58710] text-[#0B1220] font-black text-xs px-4 py-2 rounded-xl transition shadow flex items-center gap-1.5 cursor-pointer"
                        >
                          <FaPlayCircle />
                          <span>Play Lesson {unlockBanner.nextLessonNumber} →</span>
                        </button>
                      )}
                      <button
                        onClick={() => setUnlockBanner(null)}
                        className="text-slate-400 hover:text-white p-1.5 cursor-pointer"
                        title="Dismiss"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                )}

                {/* SECURE VIDEO CONTAINER OR LOCKED STAGE */}
                {isSelectedLocked ? (
                  <div className="bg-[#0B1220] border-2 border-[#D4A017]/60 rounded-2xl p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-52 h-52 bg-[#D4A017]/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 max-w-lg mx-auto">
                      <div className="w-20 h-20 bg-[#D4A017]/20 border-2 border-[#D4A017] text-[#D4A017] rounded-3xl flex items-center justify-center text-4xl mx-auto mb-5 shadow-lg shadow-[#D4A017]/20 animate-pulse">
                        <FaLock />
                      </div>

                      <span className="bg-[#D4A017]/20 text-[#D4A017] border border-[#D4A017]/40 text-[11px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
                        Video Session Locked 🔒
                      </span>

                      <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-2">
                        {selectedLecture.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                        Yeh video abhi locked hai. TSG LMS standard curriculum policy ke anusar agla lecture dekhne ke liye pehle pichla lecture complete karna zaroori hai.
                      </p>

                      {prereqLecForSelected && (
                        <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-4 mb-6 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-bold uppercase text-[#D4A017] tracking-wider block">
                              Prerequisite Lesson To Unlock:
                            </span>
                            <h4 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs mt-0.5">
                              Lesson {(prereqIdxForSelected !== -1 ? prereqIdxForSelected : selectedIdx - 1) + 1}: {prereqLecForSelected.title}
                            </h4>
                            <span className="text-[11px] text-slate-400">
                              Duration: {prereqLecForSelected.duration || "25m"} • Need ≥80% watch time
                            </span>
                          </div>
                          <button
                            onClick={() => setSelectedLecture(prereqLecForSelected)}
                            className="bg-[#D4A017] hover:bg-[#b58710] text-[#0B1220] font-black text-xs px-4 py-2.5 rounded-lg transition shrink-0 cursor-pointer shadow flex items-center gap-1.5"
                          >
                            <FaPlayCircle />
                            <span>Watch Prerequisite Now →</span>
                          </button>
                        </div>
                      )}

                      <p className="text-[11px] text-slate-400">
                        💡 Tip: Video ko 80% watch karne par ya 'Mark Complete' karne par agla video automatic unlock ho jayega.
                      </p>
                    </div>
                  </div>
                ) : (
                  <SecureVideoPlayer
                    key={selectedLecture.id}
                    videoUrl={selectedLecture.video_url}
                    lectureTitle={selectedLecture.title}
                    lectureId={selectedLecture.id}
                    courseId={course?.id}
                    durationMinutes={parseInt(selectedLecture.duration, 10) || 20}
                    initialWatchedSeconds={selectedLecture.watched_seconds || 0}
                    isCompleted={Boolean(selectedLecture.is_completed)}
                    studentInfo={{
                      name: studentName,
                      email: studentEmail,
                      studentId: studentCode,
                    }}
                    onProgressUpdate={async ({ lectureId, courseId, watchedSeconds, completed }) => {
                      try {
                        await api.post("/api/progress/update", {
                          lectureId,
                          courseId,
                          watchedSeconds,
                          completed,
                        });
                      } catch (err) {
                        // ignore background sync notice
                      }
                    }}
                    onAutoComplete={handleAutoComplete}
                  />
                )}

                {/* LECTURE HEADER & ACTIONS */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mt-5">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <span className="bg-[#7C2D12]/10 text-[#7C2D12] text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {selectedLecture.section_title || "Official Curriculum"}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220] mt-2">
                        {selectedLecture.title}
                      </h2>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                        <FaClock className="text-slate-400" />
                        <span>Duration: {selectedLecture.duration || "Self-Paced Lab"}</span>
                        <span>•</span>
                        <span>Mentor: {course?.teacher || "Dr. Gulshan Kumar"}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 flex-wrap">
                      {(selectedLecture.pdf_url || selectedLecture.notes_url) && (
                        <a
                          href={selectedLecture.pdf_url || selectedLecture.notes_url}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition flex items-center gap-1.5"
                        >
                          <FaFilePdf className="text-[#7C2D12]" />
                          <span>Download Notes</span>
                        </a>
                      )}

                      <button
                        onClick={() => handleMarkComplete(selectedLecture.id)}
                        disabled={marking || selectedLecture.is_completed || isSelectedLocked}
                        className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm ${
                          selectedLecture.is_completed
                            ? "bg-emerald-700 text-white cursor-default"
                            : isSelectedLocked
                            ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                            : "bg-[#0B1220] hover:bg-[#7C2D12] text-white cursor-pointer"
                        }`}
                      >
                        <FaCheckCircle />
                        <span>{selectedLecture.is_completed ? "Completed ✅" : marking ? "Saving..." : "Mark Complete"}</span>
                      </button>

                      {selectedLecture.is_completed && nextLecture && (!nextLecture.is_locked || isPrivileged) && (
                        <button
                          onClick={() => {
                            setSelectedLecture(nextLecture);
                            setUnlockBanner(null);
                          }}
                          className="bg-[#D4A017] hover:bg-[#b58710] text-[#0B1220] text-xs sm:text-sm font-black px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow cursor-pointer"
                        >
                          <FaPlayCircle />
                          <span>Next Lesson: Lesson {selectedIdx + 2} →</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* TABS: OVERVIEW / NOTES / MENTOR */}
                  <div className="flex border-b border-slate-200 mt-5">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`pb-3 px-4 font-bold text-xs sm:text-sm cursor-pointer border-b-2 transition ${
                        activeTab === "overview"
                          ? "border-[#7C2D12] text-[#7C2D12]"
                          : "border-transparent text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Lecture Overview
                    </button>
                    <button
                      onClick={() => setActiveTab("notes")}
                      className={`pb-3 px-4 font-bold text-xs sm:text-sm cursor-pointer border-b-2 transition ${
                        activeTab === "notes"
                          ? "border-[#7C2D12] text-[#7C2D12]"
                          : "border-transparent text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Class Notes & Links
                    </button>
                    <button
                      onClick={() => setActiveTab("doubts")}
                      className={`pb-3 px-4 font-bold text-xs sm:text-sm cursor-pointer border-b-2 transition ${
                        activeTab === "doubts"
                          ? "border-[#7C2D12] text-[#7C2D12]"
                          : "border-transparent text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Mentor Assistance
                    </button>
                  </div>

                  <div className="pt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {activeTab === "overview" && (
                      <p>
                        {selectedLecture.description ||
                          "In this lecture session, standard industrial frameworks, actionable campaign blueprints, and real brand case studies are demonstrated."}
                      </p>
                    )}

                    {activeTab === "notes" && (
                      <div className="space-y-2">
                        <p className="font-semibold text-slate-800">Resources for this lecture:</p>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600">
                          <li>Official Dizital Adda Lecture Blueprint & Slide Deck</li>
                          <li>Standard Operating Procedures (SOPs) for Google Ads & SEO audits</li>
                          <li>Recommended AI tool integrations (ChatGPT, Canva Pro, Looker Studio)</li>
                        </ul>
                      </div>
                    )}

                    {activeTab === "doubts" && (
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                          <h4 className="font-bold text-[#0B1220]">Have questions about this session?</h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Directly message mentor on the student WhatsApp hotline.
                          </p>
                        </div>
                        <a
                          href="https://wa.me/918810606010?text=Hi,%20I%20have%20a%20doubt%20in%20lecture%20session"
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition flex items-center gap-1.5 shrink-0 shadow-sm"
                        >
                          <FaWhatsapp className="text-sm" />
                          <span>Chat with Mentor</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
                <FaBookOpen className="text-4xl text-slate-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-[#0B1220]">No Lectures Found</h3>
                <p className="text-slate-500 text-sm mt-1">
                  Recorded videos for this course are being prepared by the faculty.
                </p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: CURRICULUM PLAYLIST */}
          <div className="w-full lg:w-96 shrink-0">
            {completedCount === lectures.length && lectures.length > 0 && (
              <div className="bg-gradient-to-r from-[#0B1220] to-[#7C2D12] text-white border-2 border-[#D4A017] p-3.5 rounded-2xl shadow-md flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <FaAward className="text-[#D4A017] text-2xl shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs text-amber-200">
                      100% Course Completed! 🎉
                    </h4>
                    <p className="text-[10px] text-slate-200">
                      Certificate request submitted to admin for PDF issuance.
                    </p>
                  </div>
                </div>
                <Link
                  to="/student"
                  className="bg-[#D4A017] hover:bg-[#b58710] text-[#0B1220] font-black text-[10px] px-3 py-1.5 rounded-lg shrink-0 transition"
                >
                  Dashboard
                </Link>
              </div>
            )}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden sticky top-36">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-[#0B1220] text-sm sm:text-base">
                    Recorded Videos
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {completedCount} of {lectures.length} lessons completed
                  </p>
                </div>
                <span className="text-xs font-bold text-[#7C2D12] bg-[#7C2D12]/10 px-2.5 py-1 rounded-md">
                  {lectures.length} Lectures
                </span>
              </div>

              <div className="max-h-[600px] overflow-y-auto divide-y divide-slate-100">
                {lectures.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500">
                    No lectures have been uploaded for this course yet.
                  </div>
                ) : (
                  lectures.map((lec, idx) => {
                    const isSelected = selectedLecture?.id === lec.id;
                    const isLocked = lec.is_locked && !isPrivileged;
                    const isCompleted = lec.is_completed;
                    const isCurrentActive = !isLocked && !isCompleted;

                    const currModule = lec.section_title || "Course Curriculum";
                    const prevModule = idx > 0 ? (lectures[idx - 1]?.section_title || "Course Curriculum") : null;
                    const isNewModule = idx === 0 || currModule !== prevModule;

                    return (
                      <React.Fragment key={lec.id}>
                        {isNewModule && (
                          <div className="bg-slate-100/95 border-y border-slate-200/80 px-4 py-2.5 flex items-center justify-between sticky top-0 z-10 shadow-xs">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="w-2 h-2 rounded-full bg-[#7C2D12] shrink-0"></span>
                              <span className="text-xs font-bold text-slate-800 truncate tracking-tight">
                                {currModule}
                              </span>
                            </div>
                            <span className="text-[10px] font-bold text-[#7C2D12] bg-[#7C2D12]/10 px-2 py-0.5 rounded shrink-0">
                              MODULE
                            </span>
                          </div>
                        )}
                      <div
                        onClick={() => handleLectureClick(lec, idx)}
                        className={`p-3.5 transition flex items-start gap-3 relative ${
                          isLocked
                            ? "opacity-60 bg-slate-50/90 hover:bg-slate-100/90 cursor-not-allowed border-l-4 border-slate-300"
                            : isSelected
                            ? "bg-[#0B1220] text-white border-l-4 border-[#D4A017] shadow-sm"
                            : isCompleted
                            ? "hover:bg-emerald-50/50 text-slate-700 cursor-pointer border-l-4 border-emerald-500/60"
                            : "hover:bg-slate-50 text-slate-700 cursor-pointer border-l-4 border-[#D4A017]/40"
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isCompleted ? (
                            <FaCheckCircle className="text-emerald-500 text-base" title="Completed" />
                          ) : isLocked ? (
                            <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px]" title="Locked: Complete previous lesson first">
                              <FaLock />
                            </div>
                          ) : (
                            <FaPlayCircle
                              className={`text-base ${isSelected ? "text-[#D4A017]" : "text-amber-500"}`}
                            />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider ${
                                isSelected
                                  ? "text-[#D4A017]"
                                  : isCompleted
                                  ? "text-emerald-600 font-semibold"
                                  : isLocked
                                  ? "text-slate-400"
                                  : "text-[#7C2D12] font-semibold"
                              }`}
                            >
                              Lesson {idx + 1} {isCompleted ? "• Completed ✅" : isLocked ? "• 🔒 Locked" : isCurrentActive ? "• Active" : ""}
                            </span>
                            <span
                              className={`text-[10px] font-medium ${
                                isSelected ? "text-slate-300" : "text-slate-400"
                              }`}
                            >
                              {lec.duration || "25m"}
                            </span>
                          </div>

                          <h4
                            className={`text-xs sm:text-sm font-semibold truncate mt-0.5 ${
                              isSelected
                                ? "text-white"
                                : isLocked
                                ? "text-slate-500"
                                : "text-slate-800"
                            }`}
                          >
                            {lec.title}
                          </h4>

                          {isLocked && (
                            <span className="inline-flex items-center gap-1 text-[9px] text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded font-semibold mt-1">
                              <FaLock className="text-[8px]" /> Complete Lesson {idx} to unlock
                            </span>
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODE 2: TESTS & QUIZZES ASSESSMENTS
      ========================================================= */}
      {learningMode === "quizzes" && (
        <div className="max-w-7xl mx-auto px-6 py-6 flex-1 w-full">
          {activeQuiz ? (
            /* ACTIVE QUIZ VIEW */
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                  <button
                    onClick={() => {
                      setActiveQuiz(null);
                      setQuizResult(null);
                    }}
                    className="text-xs font-semibold text-[#7C2D12] hover:text-[#991B1B] flex items-center gap-1 mb-2 cursor-pointer"
                  >
                    <FaArrowLeft /> Back to Tests List
                  </button>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0B1220]">
                    {activeQuiz.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Passing Criteria: <strong>{activeQuiz.passing_score || 70}%</strong> • Total Questions:{" "}
                    <strong>{activeQuiz.questions?.length || 0}</strong>
                  </p>
                </div>

                {quizResult && (
                  <div
                    className={`px-4 py-3 rounded-xl border text-center ${
                      quizResult.passed
                        ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                        : "bg-red-50 border-red-300 text-red-800"
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider block">
                      {quizResult.passed ? "Passed 🎉" : "Needs Review"}
                    </span>
                    <span className="text-2xl font-black">
                      {quizResult.percentage}%
                    </span>
                    <span className="text-[11px] block text-slate-600">
                      ({quizResult.score}/{quizResult.total} Correct)
                    </span>
                  </div>
                )}
              </div>

              {/* QUESTIONS LIST */}
              <form onSubmit={handleSubmitQuiz} className="space-y-6">
                {activeQuiz.questions && activeQuiz.questions.map((q, idx) => {
                  const studentChoice = quizAnswers[q.id];
                  const isSubmitted = Boolean(quizResult);

                  return (
                    <div
                      key={q.id || idx}
                      className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-md bg-[#0B1220] text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-[#0B1220]">
                          {q.question}
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-9">
                        {[
                          { key: "A", text: q.option_a || q.optionA },
                          { key: "B", text: q.option_b || q.optionB },
                          { key: "C", text: q.option_c || q.optionC },
                          { key: "D", text: q.option_d || q.optionD },
                        ].map((opt) => {
                          const isChecked = studentChoice === opt.key;
                          const isCorrect = q.correct_option === opt.key;

                          let highlightClasses = "border-slate-200 bg-white hover:bg-slate-100";
                          if (isSubmitted) {
                            if (isCorrect) {
                              highlightClasses = "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold";
                            } else if (isChecked && !isCorrect) {
                              highlightClasses = "border-red-400 bg-red-50 text-red-800";
                            }
                          } else if (isChecked) {
                            highlightClasses = "border-[#7C2D12] bg-[#7C2D12]/10 text-[#7C2D12] font-semibold";
                          }

                          return (
                            <label
                              key={opt.key}
                              className={`border rounded-xl p-3 flex items-center gap-3 cursor-pointer text-xs sm:text-sm transition ${highlightClasses}`}
                            >
                              <input
                                type="radio"
                                name={`q_${q.id}`}
                                disabled={isSubmitted}
                                checked={isChecked}
                                onChange={() => handleSelectAnswer(q.id, opt.key)}
                                className="text-[#7C2D12] cursor-pointer"
                              />
                              <span className="font-bold text-slate-700">{opt.key}.</span>
                              <span className="flex-1">{opt.text}</span>
                              {isSubmitted && isCorrect && (
                                <FaCheck className="text-emerald-600 shrink-0" />
                              )}
                              {isSubmitted && isChecked && !isCorrect && (
                                <FaTimes className="text-red-500 shrink-0" />
                              )}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  {!quizResult ? (
                    <button
                      type="submit"
                      disabled={quizSubmitting}
                      className="bg-[#0B1220] hover:bg-[#7C2D12] text-white text-xs sm:text-sm font-bold px-8 py-3 rounded-xl transition flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                    >
                      <FaAward />
                      <span>{quizSubmitting ? "Submitting Test..." : "Submit Test for Evaluation"}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleStartQuiz(activeQuiz)}
                      className="bg-[#0B1220] hover:bg-[#7C2D12] text-white text-xs sm:text-sm font-bold px-8 py-3 rounded-xl transition cursor-pointer shadow-sm"
                    >
                      Retake Assessment
                    </button>
                  )}
                </div>
              </form>
            </div>
          ) : (
            /* QUIZZES LIST */
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-[#0B1220]">
                    Official Course Assessments & Mid-Terms
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Complete these modular tests to validate your domain expertise and unlock certification.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#7C2D12] bg-[#7C2D12]/10 px-3 py-1.5 rounded-lg">
                  {quizzes.length} Available Tests
                </span>
              </div>

              {quizzes.length === 0 ? (
                <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center">
                  <FaFileAlt className="text-4xl text-slate-300 mx-auto mb-3" />
                  <h4 className="text-base font-bold text-[#0B1220]">No Tests Published Yet</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Your instructor will release unit assessments as you progress through lectures.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {quizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] font-bold text-[#7C2D12] bg-[#7C2D12]/10 px-2.5 py-1 rounded uppercase tracking-wider">
                            Unit Assessment
                          </span>
                          <span className="text-xs font-semibold text-emerald-700">
                            Pass: {quiz.passing_score || 70}%
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-[#0B1220]">
                          {quiz.title}
                        </h3>

                        <p className="text-xs text-slate-500 mt-2">
                          Standard multiple-choice testing key concepts taught in lectures.
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-600">
                          {quiz.questions?.length || quiz.total_questions || 0} Questions
                        </span>

                        <button
                          onClick={() => handleStartQuiz(quiz)}
                          className="bg-[#0B1220] hover:bg-[#7C2D12] text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <span>Take Test</span>
                          <FaArrowLeft className="rotate-180 text-[10px]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          MODE 3: ASSIGNMENTS & LIVE PROJECTS
      ========================================================= */}
      {learningMode === "assignments" && (
        <div className="max-w-7xl mx-auto px-6 py-6 flex-1 w-full space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-[#0B1220]">
                Live Industry Projects & Practical Assignments
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Apply real industrial workflows, build client campaigns, and submit live proofs for mentor review.
              </p>
            </div>
            <span className="text-xs font-bold text-[#7C2D12] bg-[#7C2D12]/10 px-3 py-1.5 rounded-lg">
              {assignments.length} Deliverables
            </span>
          </div>

          {assignments.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center">
              <FaTasks className="text-4xl text-slate-300 mx-auto mb-3" />
              <h4 className="text-base font-bold text-[#0B1220]">No Assignments Active</h4>
              <p className="text-xs text-slate-500 mt-1">
                Practical assignments will be posted as you advance through the curriculum.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {assignments.map((assign) => {
                const submission = submittedAssigns[assign.id];
                const inputVal = submissionUrls[assign.id] || "";

                return (
                  <div
                    key={assign.id}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4">
                      <div>
                        <span className="text-[10px] font-bold text-[#7C2D12] bg-[#7C2D12]/10 px-2.5 py-1 rounded uppercase tracking-wider">
                          Deliverable #{assign.id}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-[#0B1220] mt-1.5">
                          {assign.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>Max Marks: <strong className="text-[#0B1220]">{assign.max_marks || 100}</strong></span>
                        <span>•</span>
                        <span>Due: <strong className="text-[#7C2D12]">{assign.due_date || "Open Deadline"}</strong></span>
                      </div>
                    </div>

                    <div className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                      {assign.description ||
                        "Review the lecture case study, build the strategy document, and share the live view link or deliverables."}
                    </div>

                    {assign.resource_url && (
                      <div>
                        <a
                          href={assign.resource_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1220] hover:text-[#7C2D12] bg-slate-100 px-3.5 py-2 rounded-xl transition"
                        >
                          <FaExternalLinkAlt className="text-[10px]" />
                          <span>Download Project Template & Guidelines</span>
                        </a>
                      </div>
                    )}

                    {/* SUBMISSION FORM / STATUS */}
                    <div className="pt-4 border-t border-slate-100 bg-slate-50/80 rounded-xl p-4">
                      {submission ? (
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 text-emerald-800 font-bold">
                            <FaCheckCircle className="text-emerald-600 text-sm" />
                            <span>Submitted for Mentor Review</span>
                            <span className="text-slate-400 font-normal">({submission.submittedAt})</span>
                          </div>
                          <a
                            href={submission.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#7C2D12] hover:underline font-semibold"
                          >
                            View Submission Link
                          </a>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-slate-700">
                            Submit Deliverable (Google Drive / GitHub / Notion / Live URL):
                          </label>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <input
                              type="url"
                              placeholder="https://drive.google.com/file/d/your-assignment-submission"
                              value={inputVal}
                              onChange={(e) =>
                                setSubmissionUrls({
                                  ...submissionUrls,
                                  [assign.id]: e.target.value,
                                })
                              }
                              className="flex-1 bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#7C2D12]"
                            />
                            <button
                              type="button"
                              onClick={() => handleSubmitAssignment(assign.id)}
                              disabled={submittingAssignId === assign.id}
                              className="bg-[#0B1220] hover:bg-[#7C2D12] text-white text-xs font-bold px-5 py-2 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50 shrink-0"
                            >
                              <FaPaperPlane className="text-[10px]" />
                              <span>{submittingAssignId === assign.id ? "Submitting..." : "Submit Project"}</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          LOCKED LESSON INTERACTIVE MODAL
      ========================================================= */}
      {lockAlertModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#0B1220] border-2 border-[#D4A017] rounded-2xl max-w-md w-full p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setLockAlertModal({ ...lockAlertModal, isOpen: false })}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-base cursor-pointer p-1"
            >
              <FaTimes />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-[#D4A017]/20 border-2 border-[#D4A017] text-[#D4A017] flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-[#D4A017]/20 animate-pulse">
              <FaLock />
            </div>

            <div className="text-center">
              <span className="text-[10px] font-black uppercase text-[#D4A017] bg-[#D4A017]/10 px-2.5 py-0.5 rounded-full border border-[#D4A017]/30">
                Sequential Learning Enforced
              </span>
              <h3 className="text-xl font-black text-white mt-2 mb-1">
                Lesson {lockAlertModal.targetLessonNumber} Is Locked 🔒
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed mb-5">
                Aapko yeh video dekhne ke liye pehle pichla lesson poora karna hoga. Jab tak aap <strong>Lesson {lockAlertModal.prereqNumber}</strong> complete nahi karte, agla video locked rahega.
              </p>
            </div>

            {lockAlertModal.prereqLecture && (
              <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-4 mb-5 text-left">
                <span className="text-[10px] font-bold uppercase text-[#D4A017] tracking-wider block">
                  Pehle Yeh Lesson Complete Karein:
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white truncate mt-1">
                  Lesson {lockAlertModal.prereqNumber}: {lockAlertModal.prereqTitle}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                  <FaClock className="text-slate-500 text-[10px]" />
                  <span>Duration: {lockAlertModal.prereqLecture.duration || "25m"}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">≥80% watch time required</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              {lockAlertModal.prereqLecture && (
                <button
                  onClick={() => {
                    setSelectedLecture(lockAlertModal.prereqLecture);
                    setLockAlertModal({ ...lockAlertModal, isOpen: false });
                  }}
                  className="flex-1 bg-[#D4A017] hover:bg-[#b58710] text-[#0B1220] font-black text-xs py-3 rounded-xl transition shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaPlayCircle />
                  <span>Watch Lesson {lockAlertModal.prereqNumber} Now →</span>
                </button>
              )}
              <button
                onClick={() => setLockAlertModal({ ...lockAlertModal, isOpen: false })}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs py-3 px-4 rounded-xl transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPage;

import React, { useState, useEffect } from "react";
import api from "../../lib/api";
import TeacherSidebar from "../../components/teacher/TeacherSidebar";

const UploadLecture = () => {
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [showAddSection, setShowAddSection] = useState(false);
  const [creatingSection, setCreatingSection] = useState(false);

  const [lectureData, setLectureData] = useState({
    title: "",
    description: "",
    course_id: "",
    section_id: "",
    lecture_number: "1",
    duration: "25m",
    video_url: "",
  });

  const [existingCourseLectures, setExistingCourseLectures] = useState([]);
  const [video, setVideo] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/api/courses")
      .then((res) => {
        const list = res.data?.courses || res.data || [];
        setCourses(list);
        if (list.length > 0 && !lectureData.course_id) {
          setLectureData((prev) => ({ ...prev, course_id: String(list[0].id) }));
        }
      })
      .catch((err) => console.warn("Failed to load courses:", err));
  }, []);

  // Fetch sections/modules AND existing lectures when course changes
  useEffect(() => {
    if (!lectureData.course_id) {
      setSections([]);
      setExistingCourseLectures([]);
      return;
    }

    // 1. Fetch modules
    api.get(`/api/sections/${lectureData.course_id}`)
      .then((res) => {
        const secList = res.data?.sections || res.data || [];
        setSections(secList);
        if (secList.length > 0) {
          setLectureData((prev) => ({ ...prev, section_id: String(secList[0].id) }));
        } else {
          setLectureData((prev) => ({ ...prev, section_id: "" }));
        }
      })
      .catch((err) => {
        console.warn("Failed to load sections for course:", err);
        setSections([]);
      });

    // 2. Fetch existing lectures to auto-calculate sequence order
    api.get(`/api/lectures/${lectureData.course_id}`)
      .then((res) => {
        const lecList = res.data?.lectures || res.data || [];
        setExistingCourseLectures(Array.isArray(lecList) ? lecList : []);
      })
      .catch((err) => {
        console.warn("Failed to load lectures for course:", err);
        setExistingCourseLectures([]);
      });
  }, [lectureData.course_id]);

  // Auto-calculate next lecture sequence number when module/section changes
  useEffect(() => {
    const existingInModule = existingCourseLectures.filter(
      (l) => String(l.section_id || "") === String(lectureData.section_id || "")
    );
    const nextSeq = existingInModule.length + 1;
    setLectureData((prev) => ({ ...prev, lecture_number: String(nextSeq) }));
  }, [lectureData.section_id, existingCourseLectures]);

  const handleCreateSection = async () => {
    if (!newSectionTitle.trim()) {
      alert("Please enter a module title.");
      return;
    }
    try {
      setCreatingSection(true);
      const res = await api.post("/api/sections/create", {
        title: newSectionTitle.trim(),
        courseId: lectureData.course_id,
      });
      const created = res.data?.section;
      if (created) {
        setSections((prev) => [...prev, created]);
        setLectureData((prev) => ({ ...prev, section_id: String(created.id) }));
        setNewSectionTitle("");
        setShowAddSection(false);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create module");
    } finally {
      setCreatingSection(false);
    }
  };

  // INPUT CHANGE
  const handleChange = (e) => {
    setLectureData({
      ...lectureData,
      [e.target.name]: e.target.value,
    });
  };

  // VIDEO CHANGE
  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  // PDF CHANGE
  const handlePdfChange = (e) => {
    setPdf(e.target.files[0]);
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!video && !lectureData.video_url?.trim()) {
        alert("Please provide a Google Drive / Video URL or select a video file.");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("title", lectureData.title);
      formData.append("description", lectureData.description);
      formData.append("course_id", lectureData.course_id);
      if (lectureData.section_id) {
        formData.append("section_id", lectureData.section_id);
      }
      formData.append("order_num", lectureData.lecture_number || "1");
      formData.append("lecture_number", lectureData.lecture_number || "1");
      formData.append("duration", lectureData.duration || "25m");

      if (lectureData.video_url?.trim()) {
        formData.append("video_url", lectureData.video_url.trim());
      }
      if (video) {
        formData.append("video", video);
      }
      if (pdf) {
        formData.append("pdf", pdf);
      }

      // API CALL
      const response = await api.post(
        "/api/lectures/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Lecture Uploaded Successfully 🚀");

      // RESET FORM
      setLectureData({
        title: "",
        description: "",
        course_id: courses.length > 0 ? String(courses[0].id) : "",
        section_id: sections.length > 0 ? String(sections[0].id) : "",
        video_url: "",
      });

      setVideo(null);
      setPdf(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
        "Upload Failed"
      );
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-zinc-100 min-h-screen">
      <TeacherSidebar />
      <div className="flex-1 p-8">
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">
            Upload Lecture
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* TITLE */}
            <div>
              <label className="block mb-2 font-medium">
                Lecture Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter lecture title"
                className="w-full border p-4 rounded-xl outline-none"
                onChange={handleChange}
                value={lectureData.title}
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block mb-2 font-medium">
                Lecture Description
              </label>
              <textarea
                name="description"
                placeholder="Enter lecture description"
                className="w-full border p-4 rounded-xl outline-none h-32"
                onChange={handleChange}
                value={lectureData.description}
              />
            </div>

            {/* COURSE SELECTOR */}
            <div>
              <label className="block mb-2 font-medium">
                Select Course *
              </label>
              {courses.length > 0 ? (
                <select
                  name="course_id"
                  className="w-full border p-4 rounded-xl outline-none bg-white"
                  onChange={handleChange}
                  value={lectureData.course_id}
                  required
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} (ID: {c.id} / Code: {c.course_id})
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name="course_id"
                  placeholder="Enter course ID (e.g. 1)"
                  className="w-full border p-4 rounded-xl outline-none"
                  onChange={handleChange}
                  value={lectureData.course_id}
                  required
                />
              )}
            </div>

            {/* CURRICULUM MODULE / CHAPTER SELECTOR */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="block font-bold text-sm text-[#7C2D12]">
                    Select Curriculum Module / Chapter *
                  </label>
                  <p className="text-xs text-amber-800/80">
                    Bache ko pata chalega ki yeh video kis chapter/module ka hissa hai.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddSection(!showAddSection)}
                  className="text-xs font-bold text-[#7C2D12] hover:text-amber-950 bg-white border border-amber-300 px-3 py-1.5 rounded-lg transition self-start sm:self-auto cursor-pointer shadow-sm"
                >
                  {showAddSection ? "Cancel" : "+ Naya Module Banayein"}
                </button>
              </div>

              {/* Inline Add Module Bar */}
              {showAddSection && (
                <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-amber-200">
                  <input
                    type="text"
                    placeholder="e.g. Module 3: Advanced Google Search Ads"
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    className="flex-1 bg-white border border-amber-300 rounded-xl px-4 py-2 text-sm text-slate-800 outline-none focus:border-[#7C2D12]"
                  />
                  <button
                    type="button"
                    onClick={handleCreateSection}
                    disabled={creatingSection}
                    className="bg-[#7C2D12] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-amber-950 transition cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    {creatingSection ? "Creating..." : "Save Module"}
                  </button>
                </div>
              )}

              {/* Module Dropdown */}
              <select
                name="section_id"
                value={lectureData.section_id}
                onChange={handleChange}
                className="w-full border border-amber-300 p-3.5 rounded-xl outline-none bg-white text-sm font-medium text-slate-800"
              >
                {sections.length === 0 ? (
                  <option value="">No module in this course yet — Click "+ Naya Module Banayein" above</option>
                ) : (
                  sections.map((sec, idx) => (
                    <option key={sec.id} value={sec.id}>
                      Module {idx + 1}: {sec.title} (ID: {sec.id})
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* LECTURE SEQUENCE NUMBER WITHIN MODULE */}
            <div className="bg-slate-50 border border-slate-300 rounded-2xl p-5 space-y-3">
              <div>
                <label className="block font-bold text-sm text-[#0B1220]">
                  Lecture Sequence Number (In This Module) *
                </label>
                <p className="text-xs text-slate-500 mt-0.5">
                  Yeh video is module me konsa lecture hai (e.g. Lecture 1, Lecture 2, Lecture 3...). Student ko isi sequence me step-by-step unlock hoga.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-black text-[#7C2D12] bg-amber-100/90 border border-amber-300 px-3.5 py-2.5 rounded-xl uppercase tracking-wider">
                  Lecture Number
                </span>
                <input
                  type="number"
                  min="1"
                  max="99"
                  name="lecture_number"
                  value={lectureData.lecture_number || 1}
                  onChange={handleChange}
                  className="w-28 border-2 border-slate-300 p-2.5 rounded-xl font-black text-center text-lg outline-none focus:border-[#7C2D12] bg-white text-slate-900"
                  required
                />
                <span className="text-xs text-slate-500 font-semibold">
                  {existingCourseLectures.filter(l => String(l.section_id || "") === String(lectureData.section_id || "")).length > 0 
                    ? `(Is module me pehle se ${existingCourseLectures.filter(l => String(l.section_id || "") === String(lectureData.section_id || "")).length} lectures uploaded hain)`
                    : `(Yeh is module ka pehla lecture hoga)`}
                </span>
              </div>

              {/* Preview of existing lectures in selected module */}
              {existingCourseLectures.filter(l => String(l.section_id || "") === String(lectureData.section_id || "")).length > 0 && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                    Current Module Sequence:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {existingCourseLectures
                      .filter(l => String(l.section_id || "") === String(lectureData.section_id || ""))
                      .map((lec, idx) => (
                        <span
                          key={lec.id || idx}
                          className="text-[11px] bg-white border border-slate-300 px-2.5 py-1 rounded-lg text-slate-700 font-medium flex items-center gap-1.5 shadow-2xs"
                        >
                          <span className="font-bold text-[#7C2D12] bg-amber-50 px-1 py-0.2 rounded text-[10px]">
                            L{lec.order_num || lec.lecture_number || idx + 1}
                          </span>
                          <span className="truncate max-w-[150px]">{lec.title}</span>
                        </span>
                      ))}
                    <span className="text-[11px] bg-amber-500 text-white font-black px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs animate-pulse">
                      <span>👉 Next: Lecture {lectureData.lecture_number}</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* VIDEO URL / GOOGLE DRIVE LINK */}
            <div>
              <label className="block mb-2 font-medium">
                Video Stream URL (Google Drive / YouTube / Cloud Link)
              </label>
              <input
                type="url"
                name="video_url"
                placeholder="e.g. https://drive.google.com/file/d/.../view"
                className="w-full border p-4 rounded-xl outline-none"
                onChange={handleChange}
                value={lectureData.video_url}
              />
              <p className="text-xs text-zinc-500 mt-1">
                Supports Google Drive view links (with "Anyone with link can view"), YouTube, or MP4 URLs. Protected by TSG Anti-Piracy Watermark & Video Shield.
              </p>
            </div>

            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-[1px] bg-zinc-200" />
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Or Upload Video File</span>
              <div className="flex-1 h-[1px] bg-zinc-200" />
            </div>

            {/* VIDEO FILE */}
            <div>
              <label className="block mb-2 font-medium">
                Upload Video File (Optional if URL provided)
              </label>
              <input
                type="file"
                accept="video/*"
                className="w-full border p-4 rounded-xl outline-none"
                onChange={handleVideoChange}
              />
            </div>

            {/* PDF */}

            <div>

              <label className="block mb-2 font-medium">

                Upload Notes PDF

              </label>

              <input
                type="file"
                accept=".pdf"
                className="w-full border p-4 rounded-xl outline-none"
                onChange={handlePdfChange}
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl hover:bg-zinc-800 transition-all"
            >

              {
                loading
                  ? "Uploading..."
                  : "Upload Lecture"
              }

            </button>

          </form>

        </div>

      </div>

    </div>

  );

};

export default UploadLecture;
import React, { useState, useEffect } from "react";
import api from "../../lib/api";
import TeacherSidebar from "../../components/teacher/TeacherSidebar";

const UploadLecture = () => {
  const [courses, setCourses] = useState([]);
  const [lectureData, setLectureData] = useState({
    title: "",
    description: "",
    course_id: "",
    video_url: "",
  });

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
                Select Course
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
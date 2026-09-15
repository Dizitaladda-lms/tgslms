import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../lib/api";
import {
  FaAward,
  FaFileUpload,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaExternalLinkAlt,
  FaFilePdf,
  FaTimes,
  FaUserGraduate,
  FaBookOpen,
  FaLink,
  FaSyncAlt,
} from "react-icons/fa";

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all"); // "all" | "pending" | "issued"
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [manualPdfUrl, setManualPdfUrl] = useState("");
  const [grade, setGrade] = useState("Grade A+");
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/certificates/all");
      if (res.data?.certificates) {
        setCertificates(res.data.certificates);
      }
    } catch (err) {
      console.error("Failed to load certificates:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const openUploadModal = (cert) => {
    setSelectedCert(cert);
    setSelectedFile(null);
    setManualPdfUrl(cert?.pdf_url || "");
    setGrade(cert?.grade || "Grade A+");
    setStatusMsg({ type: "", text: "" });
    setModalOpen(true);
  };

  const handleIssueCertificate = async (e) => {
    e.preventDefault();
    if (!selectedFile && !manualPdfUrl.trim()) {
      setStatusMsg({
        type: "error",
        text: "Please select a PDF file or enter a Google Drive / cloud PDF link.",
      });
      return;
    }

    try {
      setUploading(true);
      setStatusMsg({ type: "", text: "" });

      const formData = new FormData();
      if (selectedCert?.id) {
        formData.append("certificateId", selectedCert.id);
      }
      if (selectedCert?.user_id) {
        formData.append("userId", selectedCert.user_id);
      }
      if (selectedCert?.course_id) {
        formData.append("courseId", selectedCert.course_id);
      }
      formData.append("grade", grade);

      if (manualPdfUrl.trim()) {
        formData.append("pdfUrl", manualPdfUrl.trim());
      }
      if (selectedFile) {
        formData.append("certificate", selectedFile);
      }

      const res = await api.post("/api/certificates/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatusMsg({
        type: "success",
        text: res.data?.message || "Certificate issued successfully! 🎉",
      });

      setTimeout(() => {
        setModalOpen(false);
        fetchCertificates();
      }, 1200);
    } catch (err) {
      setStatusMsg({
        type: "error",
        text: err.response?.data?.message || "Failed to upload certificate.",
      });
    } finally {
      setUploading(false);
    }
  };

  // Filter & Search logic
  const filteredCertificates = certificates.filter((c) => {
    const status = (c.status || "Pending").toLowerCase();
    if (activeFilter === "pending" && status !== "pending") return false;
    if (activeFilter === "issued" && status !== "issued") return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const name = (c.student_name || "").toLowerCase();
      const email = (c.student_email || "").toLowerCase();
      const code = (c.student_code || c.certificate_code || "").toLowerCase();
      const course = (c.course_title || "").toLowerCase();
      return name.includes(q) || email.includes(q) || code.includes(q) || course.includes(q);
    }

    return true;
  });

  const pendingCount = certificates.filter(
    (c) => (c.status || "").toLowerCase() === "pending"
  ).length;
  const issuedCount = certificates.filter(
    (c) => (c.status || "").toLowerCase() === "issued"
  ).length;

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* HEADER */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#0B1220] text-[#D4A017] border border-[#D4A017] flex items-center justify-center text-xl shadow">
                <FaAward />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#0B1220]">
                  Certificate Management & PDF Upload
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Review 100% course completions, upload verified PDF certificates, and manage credentials.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={fetchCertificates}
            disabled={loading}
            className="bg-[#0B1220] hover:bg-[#7C2D12] text-white border border-[#D4A017] px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <FaSyncAlt className={loading ? "animate-spin" : ""} />
            <span>Refresh Requests</span>
          </button>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-2xl">
              <FaAward />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Total Submissions
              </span>
              <span className="text-3xl font-black text-[#0B1220]">
                {certificates.length}
              </span>
            </div>
          </div>

          <div className="bg-white border-2 border-amber-300 rounded-2xl p-6 shadow-sm flex items-center gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#D4A017] text-[#0B1220] text-[10px] font-black px-3 py-0.5 uppercase tracking-wider rounded-bl-lg">
              Action Needed
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#7C2D12] flex items-center justify-center text-2xl">
              <FaClock />
            </div>
            <div>
              <span className="text-xs font-bold text-[#7C2D12] uppercase tracking-wider block">
                Pending Issuance
              </span>
              <span className="text-3xl font-black text-[#7C2D12]">
                {pendingCount}
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-2xl">
              <FaCheckCircle />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Issued & Verified
              </span>
              <span className="text-3xl font-black text-emerald-700">
                {issuedCount}
              </span>
            </div>
          </div>
        </div>

        {/* CONTROLS & SEARCH */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl self-start">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeFilter === "all"
                    ? "bg-[#0B1220] text-white shadow"
                    : "text-slate-600 hover:text-black"
                }`}
              >
                All Requests ({certificates.length})
              </button>
              <button
                onClick={() => setActiveFilter("pending")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  activeFilter === "pending"
                    ? "bg-[#7C2D12] text-white shadow"
                    : "text-amber-800 hover:text-black"
                }`}
              >
                <span>Pending Issuance</span>
                {pendingCount > 0 && (
                  <span className="bg-[#D4A017] text-[#0B1220] text-[10px] px-1.5 py-0.2 rounded-full font-black">
                    {pendingCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveFilter("issued")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeFilter === "issued"
                    ? "bg-emerald-700 text-white shadow"
                    : "text-slate-600 hover:text-black"
                }`}
              >
                Issued ({issuedCount})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <FaSearch className="absolute left-3.5 top-3.5 text-slate-400 text-xs" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search student, roll, course..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 outline-none focus:border-[#D4A017]"
              />
            </div>
          </div>

          {/* TABLE OF CERTIFICATES */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-[#0B1220] text-white uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Student Details</th>
                  <th className="py-3 px-4">Course Program</th>
                  <th className="py-3 px-4">Certificate Code</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-400">
                      Loading certificate database...
                    </td>
                  </tr>
                ) : filteredCertificates.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-400">
                      No certificate records match the active filter.
                    </td>
                  </tr>
                ) : (
                  filteredCertificates.map((cert) => {
                    const isIssued = (cert.status || "").toLowerCase() === "issued";
                    return (
                      <tr key={cert.id} className="hover:bg-slate-50/80 transition">
                        {/* STUDENT */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#0B1220] text-[#D4A017] font-black flex items-center justify-center text-xs shrink-0 border border-[#D4A017]/40">
                              {(cert.student_name || "S")[0].toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-[#0B1220] text-sm">
                                {cert.student_name}
                              </div>
                              <div className="text-[11px] text-slate-500">
                                {cert.student_email || "No email"} • Roll:{" "}
                                <span className="font-mono text-[#7C2D12] font-semibold">
                                  {cert.student_code}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* COURSE */}
                        <td className="py-4 px-4 font-medium text-slate-800">
                          <div className="line-clamp-1 max-w-xs">{cert.course_title}</div>
                          <span className="text-[10px] text-slate-400">
                            {cert.course_duration || "4 Months"}
                          </span>
                        </td>

                        {/* CODE */}
                        <td className="py-4 px-4 font-mono text-[11px] text-slate-600">
                          {cert.certificate_code}
                        </td>

                        {/* STATUS */}
                        <td className="py-4 px-4">
                          {isIssued ? (
                            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-300 px-2.5 py-1 rounded-full font-bold text-[10px]">
                              <FaCheckCircle />
                              <span>Issued & Ready</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 bg-amber-50 text-[#7C2D12] border border-amber-300 px-2.5 py-1 rounded-full font-bold text-[10px] animate-pulse">
                              <FaClock />
                              <span>Pending PDF Upload</span>
                            </span>
                          )}
                        </td>

                        {/* DATE */}
                        <td className="py-4 px-4 text-slate-500 text-[11px]">
                          {cert.issue_date
                            ? new Date(cert.issue_date).toLocaleDateString("en-IN")
                            : cert.requested_at
                            ? new Date(cert.requested_at).toLocaleDateString("en-IN")
                            : "Recently"}
                        </td>

                        {/* ACTIONS */}
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {cert.pdf_url && (
                              <a
                                href={cert.pdf_url}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-slate-100 hover:bg-slate-200 text-slate-800 p-2 rounded-lg transition"
                                title="View / Download PDF"
                              >
                                <FaFilePdf className="text-red-600 text-sm" />
                              </a>
                            )}
                            <button
                              onClick={() => openUploadModal(cert)}
                              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-sm ${
                                isIssued
                                  ? "bg-slate-800 hover:bg-slate-900 text-white"
                                  : "bg-[#7C2D12] hover:bg-[#991B1B] text-white border border-amber-400"
                              }`}
                            >
                              <FaFileUpload />
                              <span>{isIssued ? "Update PDF" : "Upload PDF"}</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* UPLOAD / ISSUE CERTIFICATE MODAL */}
      {/* ============================================================ */}
      {modalOpen && selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border-2 border-[#D4A017] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* MODAL HEADER */}
            <div className="bg-[#0B1220] text-white p-5 border-b-2 border-[#D4A017] flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <FaAward className="text-[#D4A017] text-xl" />
                <div>
                  <h3 className="text-lg font-bold">
                    Upload & Issue Student Certificate
                  </h3>
                  <p className="text-[11px] text-[#D4A017]">
                    Official Certification Engine • TSG LMS
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <FaTimes />
              </button>
            </div>

            {/* MODAL BODY */}
            <form onSubmit={handleIssueCertificate} className="p-6 space-y-5">
              {/* STUDENT & COURSE SUMMARY */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Student Name:</span>
                  <span className="font-bold text-[#0B1220]">{selectedCert.student_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Roll ID / Email:</span>
                  <span className="font-mono text-slate-700">
                    {selectedCert.student_code} ({selectedCert.student_email})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Course Program:</span>
                  <span className="font-bold text-[#7C2D12] text-right line-clamp-1">
                    {selectedCert.course_title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Certificate Code:</span>
                  <span className="font-mono text-xs text-amber-700 font-bold">
                    {selectedCert.certificate_code}
                  </span>
                </div>
              </div>

              {/* OPTION 1: CHOOSE PDF FILE */}
              <div>
                <label className="block text-xs font-bold text-[#0B1220] mb-1.5">
                  1. Select Certificate PDF File (From Computer)
                </label>
                <div className="border-2 border-dashed border-slate-300 hover:border-[#D4A017] rounded-xl p-4 text-center bg-slate-50/50 transition">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#0B1220] file:text-white hover:file:bg-[#7C2D12] file:cursor-pointer"
                  />
                  {selectedFile && (
                    <p className="text-[11px] text-emerald-700 font-bold mt-2">
                      Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-[1px] bg-slate-200" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  OR USE CLOUD / DRIVE LINK
                </span>
                <div className="flex-1 h-[1px] bg-slate-200" />
              </div>

              {/* OPTION 2: GOOGLE DRIVE / CLOUD URL */}
              <div>
                <label className="block text-xs font-bold text-[#0B1220] mb-1.5 flex items-center gap-1.5">
                  <FaLink className="text-[#D4A017]" />
                  <span>2. Google Drive / Cloud PDF URL</span>
                </label>
                <input
                  type="url"
                  value={manualPdfUrl}
                  onChange={(e) => setManualPdfUrl(e.target.value)}
                  placeholder="e.g. https://drive.google.com/file/d/.../view or Cloudinary URL"
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-[#D4A017]"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Ensure Google Drive sharing is set to "Anyone with the link can view".
                </p>
              </div>

              {/* GRADE SELECTION */}
              <div>
                <label className="block text-xs font-bold text-[#0B1220] mb-1.5">
                  Awarded Performance Grade
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-[#D4A017]"
                >
                  <option value="Grade A+">Grade A+ (Distinction / Outstanding)</option>
                  <option value="Grade A">Grade A (Excellence)</option>
                  <option value="Grade B+">Grade B+ (Merit)</option>
                  <option value="Honors">Honors Certificate</option>
                </select>
              </div>

              {/* STATUS MESSAGES */}
              {statusMsg.text && (
                <div
                  className={`p-3 rounded-xl text-xs font-bold ${
                    statusMsg.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                      : "bg-red-50 text-red-800 border border-red-300"
                  }`}
                >
                  {statusMsg.text}
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-[#0B1220] hover:bg-[#7C2D12] text-white border border-[#D4A017] px-6 py-2.5 rounded-xl font-bold text-xs transition shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <FaSyncAlt className="animate-spin text-xs" />
                      <span>Issuing Certificate...</span>
                    </>
                  ) : (
                    <>
                      <FaCheckCircle className="text-[#D4A017]" />
                      <span>Issue Certificate & Notify Student</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

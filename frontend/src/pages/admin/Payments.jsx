import { useState, useEffect, useMemo } from "react";
import {
  FaMoneyBillWave,
  FaSearch,
  FaDownload,
  FaFileCsv,
  FaCheckCircle,
  FaReceipt,
  FaCreditCard,
  FaCopy,
} from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../lib/api";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [copiedId, setCopiedId] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (type, msg) => {
    setNotification({ type, msg });
    setTimeout(() => setNotification(null), 4500);
  };

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/payment/history");
      const list = res.data?.payments || res.data || [];
      setPayments(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error("Fetch Payments Error:", error);
      showNotification("error", "Failed to load payment transactions from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Filtered payments
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const q = searchTerm.toLowerCase();
      const matchSearch =
        (p.student_name || "").toLowerCase().includes(q) ||
        (p.student_email || "").toLowerCase().includes(q) ||
        (p.course_title || "").toLowerCase().includes(q) ||
        (p.razorpay_payment_id || "").toLowerCase().includes(q) ||
        String(p.amount || "").includes(q);

      const matchStatus =
        statusFilter === "All" ||
        (p.status || "Success").toLowerCase() === statusFilter.toLowerCase();

      return matchSearch && matchStatus;
    });
  }, [payments, searchTerm, statusFilter]);

  // Aggregate Metrics
  const stats = useMemo(() => {
    const totalCount = payments.length;
    const successful = payments.filter(
      (p) => (p.status || "Success").toLowerCase() === "success" || (p.status || "").toLowerCase() === "paid"
    );
    const totalRevenue = successful.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const avgValue = successful.length > 0 ? Math.round(totalRevenue / successful.length) : 0;
    const successRate = totalCount > 0 ? Math.round((successful.length / totalCount) * 100) : 100;

    return { totalRevenue, totalCount, avgValue, successRate };
  }, [payments]);

  // Download PDF Report using jsPDF & autoTable
  const downloadPdfReport = () => {
    if (payments.length === 0) {
      showNotification("error", "No transactions available to generate report.");
      return;
    }
    try {
      const doc = new jsPDF();

      // Brand Header (Landing Theme)
      doc.setFillColor(11, 18, 32);
      doc.rect(0, 0, 210, 38, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("DIZITAL ADDA LMS - PAYMENT REPORT", 14, 18);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(212, 160, 23);
      doc.text("A Mission for Vikshit Bharat 2047 • Associated by Timeless Foundation", 14, 26);

      doc.setFontSize(9);
      doc.setTextColor(180, 180, 180);
      doc.text("Generated on: " + new Date().toLocaleString("en-IN"), 14, 33);

      // Financial Summary Block
      doc.setTextColor(20, 20, 20);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("FINANCIAL SUMMARY", 14, 48);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text("Total Gross Revenue: INR " + stats.totalRevenue.toLocaleString("en-IN"), 14, 55);
      doc.text("Total Verified Transactions: " + stats.totalCount, 14, 61);
      doc.text("Average Order Value: INR " + stats.avgValue.toLocaleString("en-IN"), 14, 67);

      // Payments Table
      const tableRows = filteredPayments.map((p, idx) => [
        idx + 1,
        p.razorpay_payment_id || ("PAY-" + p.id),
        p.student_name || "Enrolled Student",
        p.student_email || "N/A",
        p.course_title || "Course Program",
        "INR " + Number(p.amount || 0).toLocaleString("en-IN"),
        p.status || "Success",
        p.created_at ? new Date(p.created_at).toLocaleDateString("en-IN") : "Recent",
      ]);

      autoTable(doc, {
        startY: 74,
        head: [["#", "Payment ID", "Student Name", "Email", "Course", "Amount", "Status", "Date"]],
        body: tableRows,
        styles: { fontSize: 8, cellPadding: 2.5 },
        headStyles: { fillColor: [11, 18, 32], textColor: [255, 255, 255], fontStyle: "bold" },
        alternateRowStyles: { fillColor: [248, 250, 252] },
      });

      doc.save("dizitaladda_payments_" + Date.now() + ".pdf");
      showNotification("success", "Payment report PDF downloaded successfully! 📄");
    } catch (err) {
      console.error("PDF generation failed:", err);
      showNotification("error", "Failed to generate PDF report.");
    }
  };

  // Export CSV
  const exportCsv = () => {
    if (payments.length === 0) {
      showNotification("error", "No transactions available to export.");
      return;
    }
    try {
      const headers = ["ID", "Razorpay Payment ID", "Student Name", "Email", "Course Title", "Amount (INR)", "Status", "Date"];
      const rows = filteredPayments.map((p) => [
        p.id,
        '"' + (p.razorpay_payment_id || "") + '"',
        '"' + (p.student_name || "") + '"',
        '"' + (p.student_email || "") + '"',
        '"' + (p.course_title || "") + '"',
        p.amount || 0,
        '"' + (p.status || "Success") + '"',
        '"' + (p.created_at || "") + '"',
      ]);

      const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "dizitaladda_payments_" + Date.now() + ".csv");
      showNotification("success", "Payment records CSV exported successfully! 📊");
    } catch (err) {
      console.error("CSV export error:", err);
      showNotification("error", "Failed to export CSV file.");
    }
  };

  return (
    <AdminLayout
      title="Payments & Revenue Ledger 💳"
      subtitle="Complete database of verified student enrollments, Razorpay payment orders, revenue collections, and transaction receipts."
      onSyncComplete={fetchPayments}
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

      {/* 4 STAT TILES (Landing Style) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-300 rounded-xl p-4 shadow-sm hover:border-[#7C2D12] transition">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7C2D12] block">
            Gross Revenue
          </span>
          <p className="text-3xl font-black text-emerald-700 mt-2">
            {"₹" + stats.totalRevenue.toLocaleString("en-IN")}
          </p>
          <span className="text-[11px] text-emerald-600">100% verified settlement</span>
        </div>

        <div className="bg-white border border-slate-300 rounded-xl p-4 shadow-sm hover:border-[#7C2D12] transition">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7C2D12] block">
            Total Orders
          </span>
          <p className="text-3xl font-black text-[#0B1220] mt-2">{stats.totalCount}</p>
          <span className="text-[11px] text-slate-500">Recorded Transactions</span>
        </div>

        <div className="bg-white border border-slate-300 rounded-xl p-4 shadow-sm hover:border-[#7C2D12] transition">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7C2D12] block">
            Avg Order Value
          </span>
          <p className="text-3xl font-black text-[#0B1220] mt-2">
            {"₹" + stats.avgValue.toLocaleString("en-IN")}
          </p>
          <span className="text-[11px] text-slate-500">Across Diploma Programs</span>
        </div>

        <div className="bg-white border border-slate-300 rounded-xl p-4 shadow-sm hover:border-[#7C2D12] transition">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7C2D12] block">
            Gateway Success
          </span>
          <p className="text-3xl font-black text-[#0B1220] mt-2">{stats.successRate + "%"}</p>
          <span className="text-[11px] text-slate-500">Razorpay Verified</span>
        </div>
      </div>

      {/* CONTROLS BAR WITH EXPORTS */}
      <div className="bg-white border border-slate-300 rounded-xl p-4 mb-6 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search student, email, payment ID, course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#D4A017] focus:bg-white transition"
          />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={exportCsv}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold py-2 px-3.5 rounded-lg transition flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <FaFileCsv className="text-emerald-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={downloadPdfReport}
            className="bg-[#0B1220] hover:bg-[#7C2D12] text-white border border-[#D4A017] text-xs font-bold py-2 px-4 rounded-lg transition flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <FaDownload className="text-[#D4A017]" />
            <span>Download PDF Report</span>
          </button>
        </div>
      </div>

      {/* PAYMENTS TABLE CONTAINER (Landing Page Classical Theme) */}
      <div className="bg-white border border-slate-300 rounded-xl shadow-sm overflow-hidden">
        <div className="bg-[#0B1220] text-white py-3.5 px-6 border-b-4 border-[#D4A017] flex items-center justify-between">
          <h3 className="font-bold text-base tracking-wide flex items-center gap-2">
            <FaReceipt className="text-[#D4A017]" />
            <span>Verified Transactions Ledger ({filteredPayments.length})</span>
          </h3>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-500">
            <div className="inline-block w-8 h-8 border-4 border-[#D4A017] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-xs font-semibold">Connecting to PostgreSQL payments ledger...</p>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <p className="text-sm">No transactions matched your search "{searchTerm}".</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-slate-100 text-slate-700 text-xs uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Payment ID</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Course Program</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredPayments.map((p) => {
                  const rzpId = p.razorpay_payment_id || ("PAY-" + p.id);
                  const formattedDate = p.created_at
                    ? new Date(p.created_at).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Recent";

                  return (
                    <tr key={p.id} className="hover:bg-slate-50 transition">
                      {/* PAYMENT ID */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2 font-mono text-xs">
                          <span className="bg-slate-100 border border-slate-200 px-2 py-1 rounded text-slate-700 font-semibold">
                            {rzpId}
                          </span>
                          <button
                            onClick={() => copyToClipboard(rzpId, p.id)}
                            className="text-slate-400 hover:text-[#0B1220] transition p-1 cursor-pointer"
                            title="Copy Razorpay Payment ID"
                          >
                            {copiedId === p.id ? (
                              <FaCheckCircle className="text-emerald-600 text-xs" />
                            ) : (
                              <FaCopy className="text-xs" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* STUDENT */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-[#0B1220] block">
                          {p.student_name || "Enrolled Learner"}
                        </span>
                        <span className="text-xs text-slate-500 block">
                          {p.student_email || "N/A"}
                        </span>
                      </td>

                      {/* PROGRAM */}
                      <td className="py-3.5 px-4 max-w-xs text-xs font-semibold text-slate-800 line-clamp-1">
                        {p.course_title || "Course Enrollment"}
                      </td>

                      {/* AMOUNT */}
                      <td className="py-3.5 px-4 font-black text-emerald-700 text-base">
                        {"₹" + Number(p.amount || 0).toLocaleString("en-IN")}
                      </td>

                      {/* STATUS */}
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-300">
                          {p.status || "Success"}
                        </span>
                      </td>

                      {/* TIMESTAMP */}
                      <td className="py-3.5 px-4 text-right text-xs text-slate-500 font-mono">
                        {formattedDate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

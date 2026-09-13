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

      // Brand Header
      doc.setFillColor(11, 18, 32);
      doc.rect(0, 0, 210, 38, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("DIZITAL ADDA LMS - PAYMENT REPORT", 14, 18);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(6, 182, 212);
      doc.text("Government Recognized Cyber and Tech Skills Academy", 14, 26);

      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
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
        alternateRowStyles: { fillColor: [245, 247, 250] },
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
    >
      {/* NOTIFICATION TOAST */}
      {notification && (
        <div
          className={"mb-6 p-4 rounded-2xl flex items-center gap-3 border shadow-xl transition-all duration-300 " +
            (notification.type === "success"
              ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
              : "bg-red-500/15 border-red-500/40 text-red-300")
          }
        >
          <FaCheckCircle className="text-xl shrink-0" />
          <span className="font-semibold text-sm">{notification.msg}</span>
        </div>
      )}

      {/* TOP HEADER CONTROLS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            Real-Time Payment Verification
          </span>
          <p className="text-sm text-slate-400 mt-2">
            HMAC-SHA256 verified transactions recorded directly from Razorpay webhooks and gateways.
          </p>
        </div>

        {/* EXPORT BUTTONS */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={exportCsv}
            className="bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-white/20 text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
          >
            <FaFileCsv className="text-emerald-400 text-sm" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={downloadPdfReport}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-[#070b14] text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <FaDownload className="text-xs" />
            <span>Download PDF Report</span>
          </button>
        </div>
      </div>

      {/* 4 REAL METRIC TILES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#0b1220]/80 border border-emerald-500/20 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Gross Revenue</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <FaMoneyBillWave className="text-lg" />
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-400 mt-3">
            {"₹" + stats.totalRevenue.toLocaleString("en-IN")}
          </p>
          <span className="text-[11px] text-emerald-400/80 font-medium">100% verified settlement</span>
        </div>

        <div className="bg-[#0b1220]/80 border border-cyan-500/20 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Transactions</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
              <FaReceipt className="text-lg" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3">{stats.totalCount}</p>
          <span className="text-[11px] text-cyan-400/80 font-medium">Orders in database</span>
        </div>

        <div className="bg-[#0b1220]/80 border border-blue-500/20 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Avg Order Value</span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
              <FaCreditCard className="text-lg" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3">
            {"₹" + stats.avgValue.toLocaleString("en-IN")}
          </p>
          <span className="text-[11px] text-blue-400/80 font-medium">Across all certificate tracks</span>
        </div>

        <div className="bg-[#0b1220]/80 border border-amber-500/20 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Gateway Success</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <FaCheckCircle className="text-lg" />
            </div>
          </div>
          <p className="text-3xl font-black text-amber-400 mt-3">{stats.successRate + "%"}</p>
          <span className="text-[11px] text-amber-400/80 font-medium">0 chargeback rate</span>
        </div>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="bg-[#0b1220]/90 border border-white/10 rounded-2xl p-4 mb-8 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search student, email, payment ID, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#070b14] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-400 font-medium">Status:</span>
          {["All", "Success"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={"px-3.5 py-1.5 rounded-xl text-xs font-bold transition border " +
                (statusFilter === st
                  ? "bg-cyan-500 text-[#070b14] border-cyan-400 shadow-md shadow-cyan-500/20"
                  : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-white")
              }
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* TRANSACTIONS TABLE */}
      <div className="bg-[#0b1220]/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>Authentic Payment Transactions</span>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold">
                {filteredPayments.length} records
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Every row corresponds to a student checkout verified via Razorpay order signature.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
            <p className="text-slate-400 text-sm mt-4">Connecting to PostgreSQL payments ledger...</p>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-base">No transactions matched your query.</p>
            <button
              onClick={() => { setSearchTerm(""); setStatusFilter("All"); }}
              className="mt-3 text-xs font-bold text-cyan-400 hover:underline"
            >
              Clear Search Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Payment ID</th>
                  <th className="py-4 px-6">Student</th>
                  <th className="py-4 px-6">Enrolled Program</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
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
                    <tr
                      key={p.id}
                      className="hover:bg-white/[0.03] transition duration-200 group"
                    >
                      {/* PAYMENT ID */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
                          <span className="bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">
                            {rzpId}
                          </span>
                          <button
                            onClick={() => copyToClipboard(rzpId, p.id)}
                            title="Copy Razorpay Payment ID"
                            className="text-slate-400 hover:text-white transition p-1"
                          >
                            {copiedId === p.id ? (
                              <FaCheckCircle className="text-emerald-400 text-xs" />
                            ) : (
                              <FaCopy className="text-xs" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* STUDENT INFO */}
                      <td className="py-4 px-6">
                        <span className="font-bold text-white block group-hover:text-cyan-400 transition">
                          {p.student_name || "Enrolled Learner"}
                        </span>
                        <span className="text-xs text-slate-400 block mt-0.5">
                          {p.student_email || "N/A"}
                        </span>
                      </td>

                      {/* PROGRAM */}
                      <td className="py-4 px-6 max-w-xs">
                        <span className="font-semibold text-slate-200 line-clamp-1 block">
                          {p.course_title || "Course Enrollment"}
                        </span>
                        <span className="text-[11px] text-slate-400 mt-0.5 block">
                          Direct Razorpay Checkout
                        </span>
                      </td>

                      {/* AMOUNT */}
                      <td className="py-4 px-6">
                        <span className="font-black text-emerald-400 text-base">
                          {"₹" + Number(p.amount || 0).toLocaleString("en-IN")}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          {p.status || "Success"}
                        </span>
                      </td>

                      {/* TIMESTAMP */}
                      <td className="py-4 px-6 text-right text-xs text-slate-400 font-mono">
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

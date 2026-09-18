import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaClock,
  FaCheck,
  FaCalendarAlt,
  FaChartBar,
  FaArrowRight,
} from "react-icons/fa";

// Helper to extract 2-letter uppercase initials
const getInitials = (name) => {
  if (!name) return "TS";
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Helper to determine dynamic 3 high-impact bullet points matching the course
const getCourseHighlights = (course) => {
  if (Array.isArray(course.highlights) && course.highlights.length >= 3) {
    return course.highlights.slice(0, 3);
  }
  if (Array.isArray(course.features) && course.features.length >= 3) {
    return course.features.slice(0, 3);
  }

  const text = `${course.title || ""} ${course.description || ""} ${course.category || ""}`.toLowerCase();

  if (
    text.includes("ai") ||
    text.includes("prompt") ||
    text.includes("genai") ||
    text.includes("intelligence") ||
    text.includes("gpt")
  ) {
    return [
      "Master LLMs, Prompt Engineering frameworks (CoT, ReAct)",
      "Build real apps with LangChain & Multi-Agent systems",
      "Capstone project + placement support included",
    ];
  }

  if (
    text.includes("marketing") ||
    text.includes("seo") ||
    text.includes("ads") ||
    text.includes("growth") ||
    text.includes("digital")
  ) {
    return [
      "Master Google Ads, Meta Ads & AI Performance Marketing",
      "Run live brand campaigns with real client budgets",
      "Agency internship + placement assistance included",
    ];
  }

  if (
    text.includes("stack") ||
    text.includes("web") ||
    text.includes("react") ||
    text.includes("code") ||
    text.includes("software") ||
    text.includes("development")
  ) {
    return [
      "Master React, Node.js, Next.js & scalable cloud databases",
      "Build 5+ production-grade portfolio apps from scratch",
      "Capstone project + live technical interview prep",
    ];
  }

  if (
    text.includes("data") ||
    text.includes("machine") ||
    text.includes("python") ||
    text.includes("analytics")
  ) {
    return [
      "Master Python, Pandas, Predictive ML & Deep Learning",
      "Hands-on case studies with real enterprise datasets",
      "Portfolio capstone + recognized industry certification",
    ];
  }

  return [
    "Comprehensive curriculum designed by top industry faculty",
    "Hands-on practical projects & real-world assignments",
    "Verified certificate + 24/7 AI Doubt solving support",
  ];
};

export default function CourseCard({ course }) {
  const navigate = useNavigate();

  if (!course) return null;

  const courseId = course.course_id || course.id;
  const currentPrice = Number(course.price) || 4999;
  const originalPrice =
    Number(course.original_price || course.originalPrice) ||
    Math.round(currentPrice * 1.65);
  const discountPercent = Math.max(
    15,
    Math.min(
      85,
      Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    )
  );

  const category = course.category || "Professional Track";
  const duration = course.duration || "6 Months";
  const level = course.level || "Advanced";
  const mode = course.mode || "Live + Self-paced";
  const rating = Number(course.rating) || 4.8;
  const learners =
    course.students ||
    course.total_students ||
    `${(1200 + ((Number(course.id) || 1) * 340)).toLocaleString("en-IN")}+`;

  const teacherName = course.teacher || course.instructor || "Industry Faculty";
  const teacherRole =
    course.teacher_role ||
    course.specialization ||
    "Industry Specialist, 8+ yrs exp";
  const initials = getInitials(teacherName);

  const highlights = getCourseHighlights(course);
  const seatsLeft = 7 + ((Number(course.id) || 1) % 9);

  // Description text
  const leadDesc =
    course.description ||
    `Project-driven ${duration.toLowerCase()} program built with working industry specialists to take you from foundational concepts to production-grade implementation.`;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between group hover:-translate-y-1.5">
      {/* =========================================================================
          1. TOP DARK GRADIENT HEADER BLOCK
      ========================================================================= */}
      <div className="bg-gradient-to-br from-[#0B1220] via-[#111A2E] to-[#251B45] p-6 sm:p-7 text-white relative">
        {/* Top Badges Row */}
        <div className="flex items-center justify-between gap-2">
          {/* Left Pill Badge: Category */}
          <span className="bg-[#EDE9FE] text-[#6D28D9] font-bold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
            <span className="text-[11px]">✦</span>
            <span>{category}</span>
          </span>

          {/* Right Pill Badge: Duration */}
          <span className="bg-[#F59E0B] text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-xs shrink-0">
            {duration}
          </span>
        </div>

        {/* Title */}
        <Link to={`/course/${courseId}`} className="block group-hover:text-amber-300 transition">
          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mt-4 tracking-tight line-clamp-2">
            {course.title}
          </h3>
        </Link>

        {/* Rating & Social Proof */}
        <div className="mt-3.5 flex items-center gap-2 text-xs flex-wrap">
          <div className="flex items-center text-amber-400 gap-0.5 text-xs">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <span className="font-bold text-white text-xs">{rating.toFixed(1)}</span>
          <span className="text-slate-400 text-xs">({learners} learners)</span>
        </div>
      </div>

      {/* =========================================================================
          2. URGENCY / COHORT STRIP
      ========================================================================= */}
      <div className="bg-[#FEF3C7] border-y border-amber-200/70 py-2.5 px-6 flex items-center gap-2 text-xs font-bold text-[#92400E]">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
        </span>
        <span className="truncate">
          Only {seatsLeft} seats left in this cohort • Bestseller in {category}
        </span>
      </div>

      {/* =========================================================================
          3. CARD BODY: DESCRIPTION & HIGHLIGHTS
      ========================================================================= */}
      <div className="p-6 sm:p-7 space-y-4.5 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Lead Summary Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
            {leadDesc}
          </p>

          {/* 3 Key Highlights with Green Checkmarks */}
          <div className="space-y-2 pt-1">
            {highlights.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-700">
                <FaCheck className="text-emerald-500 text-xs mt-0.5 shrink-0" />
                <span className="leading-snug">{point}</span>
              </div>
            ))}
          </div>

          {/* Metadata Pill Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="border border-slate-200 bg-slate-50 text-slate-700 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
              <FaClock className="text-[11px] text-slate-400" />
              <span>{duration}</span>
            </span>

            <span className="border border-slate-200 bg-slate-50 text-slate-700 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
              <FaChartBar className="text-[11px] text-slate-400" />
              <span>{level}</span>
            </span>

            <span className="border border-slate-200 bg-slate-50 text-slate-700 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
              <FaCalendarAlt className="text-[11px] text-slate-400" />
              <span>{mode}</span>
            </span>
          </div>

          {/* Instructor Box */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#6D28D9] to-[#8B5CF6] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
              {initials}
            </div>
            <div className="min-w-0 text-xs text-slate-600">
              <span className="block truncate">
                Taught by <strong className="text-slate-900 font-bold">{teacherName}</strong>
              </span>
              <span className="text-[11px] text-slate-400 truncate block">
                {teacherRole}
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            4. DIVIDER & FOOTER: PRICING & EXPLORE CTA
        ========================================================================= */}
        <div className="border-t border-slate-100 pt-5 mt-4 flex items-center justify-between gap-3">
          {/* Price Block */}
          <div>
            <span className="text-xs text-slate-400 line-through block font-medium">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                ₹{currentPrice.toLocaleString("en-IN")}
              </span>
              <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-md">
                Save {discountPercent}%
              </span>
            </div>
          </div>

          {/* Explore Button */}
          <button
            onClick={() => navigate(`/course/${courseId}`)}
            className="bg-gradient-to-r from-[#6366F1] to-[#7C3AED] hover:from-[#4F46E5] hover:to-[#6D28D9] text-white font-black text-sm px-6 py-3 rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
          >
            <span>Explore</span>
            <FaArrowRight className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
}
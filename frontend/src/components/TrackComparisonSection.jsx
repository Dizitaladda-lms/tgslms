import { useState } from "react";
import {
  FaCheckCircle,
  FaTimes,
  FaStar,
  FaRocket,
  FaBriefcase,
  FaGraduationCap,
  FaUsers,
  FaClock,
  FaLayerGroup,
  FaAward,
  FaArrowRight,
  FaShieldAlt,
  FaLaptopCode,
  FaLightbulb,
  FaRobot,
  FaCheck,
} from "react-icons/fa";

/**
 * Enriched domain-specific comparison metadata fallback
 * (Specifically handles Digital Marketing 4-track nuances and provides fallback for any domain)
 */
const TRACK_SPECIFIC_METADATA = {
  "3-months": {
    badge: "Foundation Track",
    color: "amber",
    tagline: "Fast-Track Foundational Launch",
    idealForTitle: "Beginners, College Students & Freshers",
    liveHours: "60+ Hours Live Sessions",
    weeklyHours: "8 - 10 Hours / Week",
    searchAi: "Basic Overview (Modern AI Search)",
    adBudgets: "Simulated Ad Budget Sandboxes",
    agencyInternship: "Simulated Agency Lab Case Studies",
    capstone: "1 Guided Portfolio Capstone",
    mentorshipType: "Group Learning & Weekly Live Q&A",
    mockInterviews: "1 Mock Interview + Resume Review",
    verdictHeading: "Quick Start & Core Fundamentals",
    verdictSummary:
      "A fast 90-day launchpad covering SEO, Meta Ads, Google Ads, Canva Pro, and 40+ AI tools. Perfect for building fundamental skills and landing entry-level marketing roles without long-term commitment.",
    whyChoose: [
      "Fast 3-month completion time",
      "Master essential SEO, Meta & Google Ads",
      "40+ AI tools (ChatGPT, Gemini, Canva AI)",
      "10 Live brand projects with guided mentor reviews",
    ],
  },
  "4-months": {
    badge: "Professional Track",
    color: "emerald",
    tagline: "Career Upskill for Working Pros",
    idealForTitle: "Working Professionals & Business Owners",
    liveHours: "90+ Hours Live Sessions",
    weeklyHours: "10 - 12 Hours / Week",
    searchAi: "Search AI & Schema Structured Data",
    adBudgets: "Live Ad Budgets for Meta & Google",
    agencyInternship: "Paid In-House Agency Internship",
    capstone: "Mini Brand Projects + Capstone",
    mentorshipType: "Weekly Practitioner Mentorship",
    mockInterviews: "3 Mock Technical & HR Interviews",
    verdictHeading: "Tactical Execution & Fast ROI",
    verdictSummary:
      "Designed specifically for working executives and business owners needing fast results. Covers 40 focused modules, performance marketing, GA4, paid agency internship, and live ad campaign execution.",
    whyChoose: [
      "Weekend & evening friendly 10-12 hrs/week",
      "Paid in-house agency internship experience",
      "Real ad spend on Meta & Google campaigns",
      "Advanced GA4 tracking & performance marketing",
    ],
  },
  "6-months": {
    badge: "Advanced Track • Most Popular",
    color: "blue",
    tagline: "Complete Career Switch & Agency Mastery",
    idealForTitle: "Serious Career Switchers & Graduates",
    liveHours: "150+ Hours Live Sessions",
    weeklyHours: "12 - 15 Hours / Week",
    searchAi: "Next-Gen Search AI (AEO & LLMO Optimization)",
    adBudgets: "Real Client Ad Budgets Managed",
    agencyInternship: "Paid In-House Agency Internship (Live Clients)",
    capstone: "Major Enterprise Capstone + Live Campaigns",
    mentorshipType: "Industry Expert Mentorship + 1:1 Reviews",
    mockInterviews: "5 Full Mock Technical Interviews",
    verdictHeading: "The Industry Standard (Best Value)",
    verdictSummary:
      "Our most chosen program. 60 detailed modules, 54+ AI tools, live agency internship handling real brand accounts, cutting-edge AEO/LLMO training, and 100% placement support with 500+ hiring partners.",
    whyChoose: [
      "Next-Gen Answer Engine (AEO) & LLM Optimization (LLMO)",
      "Manage real client brand accounts with live budgets",
      "Paid in-house agency internship certificate",
      "100% placement support with 500+ hiring partners",
    ],
  },
  "12-months": {
    badge: "Expert Level Track",
    color: "fuchsia",
    tagline: "Complete Executive Mastery & Placement Guarantee",
    idealForTitle: "Future Marketing Directors & Agency Founders",
    liveHours: "300+ Hours Live Sessions",
    weeklyHours: "15 - 20 Hours / Week",
    searchAi: "Advanced AEO, LLMO & Custom AI Automations",
    adBudgets: "Enterprise-Scale Client Ad Spend & Retainers",
    agencyInternship: "Senior Agency Account Lead & Retainers",
    capstone: "2 Major Enterprise Capstones + Production Portfolio",
    mentorshipType: "1-on-1 Dedicated Senior Mentorship & Coaching",
    mockInterviews: "Unlimited Mock Technical & Leadership Interviews",
    verdictHeading: "Ultimate Mastery & Guaranteed Placement",
    verdictSummary:
      "A year-long comprehensive master program for those aiming for leadership roles or launching their own agency. Includes 70 modules, 60+ AI tools, dedicated 1-on-1 executive mentorship, and 100% placement guarantee with formal agreement.",
    whyChoose: [
      "100% Placement Guarantee (with formal agreement)",
      "1-on-1 dedicated executive mentorship & coaching",
      "Full agency management & client retainer sprints",
      "2 Major enterprise capstones & corporate letters",
    ],
  },
};

export default function TrackComparisonSection({
  courses = [],
  selectedDomain,
  onSelectCourse,
  activeSpecialization,
}) {
  const [filterCategory, setFilterCategory] = useState("all");

  if (!courses || courses.length === 0) return null;

  // Build normalized track list
  const trackColumns = courses.map((course) => {
    const durId = course.durationId || "3-months";
    const meta = TRACK_SPECIFIC_METADATA[durId] || {};
    const isPopular =
      course.isPopular ||
      durId === "6-months" ||
      course.id?.includes("advanced");

    return {
      course,
      id: course.id,
      durId,
      duration: course.duration || "Track",
      title: course.title,
      level: course.level || meta.badge || "Certification",
      isPopular,
      modulesCount: course.modulesCount || "30+",
      modulesType: course.modulesType || "Modules",
      aiToolsCount: course.aiToolsCount || "40+",
      hoursPerWeek: course.hoursPerWeek || meta.weeklyHours || "10 Hours/Week",
      liveHours: meta.liveHours || "80+ Hours Live",
      projects: course.projectsHighlight || course.projects || "Live Projects",
      certifications:
        course.certHighlight ||
        course.certification ||
        "Global Certifications",
      mentorship: course.mentorship || meta.mentorshipType || "Expert Mentorship",
      placement:
        course.placementGuarantee ||
        (durId === "12-months"
          ? "100% Placement Guarantee (with formal agreement)"
          : durId === "6-months"
          ? "100% Placement Support (500+ Hiring Partners)"
          : "100% Placement Assistance"),
      perfectFor: course.perfectFor || meta.idealForTitle || "All Learners",
      searchAi:
        durId === "6-months"
          ? "Full AEO & LLM Optimization (LLMO)"
          : durId === "12-months"
          ? "Advanced AEO, LLMO & Custom AI Workflows"
          : durId === "4-months"
          ? "Search AI & Schema Structured Data"
          : "Basic AI Search Overview",
      agencyInternship:
        durId === "6-months"
          ? "Paid In-House Agency Internship (Live Clients)"
          : durId === "12-months"
          ? "Senior Agency Account Lead & Paid Retainers"
          : durId === "4-months"
          ? "Paid In-House Agency Internship"
          : "Simulated Agency Lab Case Studies",
      capstone:
        durId === "12-months"
          ? "2 Major Enterprise Capstones + Portfolio"
          : durId === "6-months"
          ? "1 Major Enterprise Capstone + Live Campaigns"
          : durId === "4-months"
          ? "Mini Brand Projects + Capstone"
          : "1 Guided Portfolio Capstone",
      meta,
    };
  });

  // Comparison Rows Matrix
  const COMPARISON_ROWS = [
    // --- 1. OVERVIEW & SCHEDULE ---
    {
      category: "overview",
      categoryName: "Program Overview & Schedule",
      categoryIcon: <FaClock className="text-amber-500" />,
      label: "Duration & Track Level",
      tooltip: "Official course duration and difficulty tier",
      render: (track) => (
        <div>
          <span className="font-extrabold text-[#0B1220] block text-sm">
            {track.duration}
          </span>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
            {track.level}
          </span>
        </div>
      ),
    },
    {
      category: "overview",
      label: "Ideal Candidate / Best Suited For",
      tooltip: "Who gets the maximum career benefit from this duration",
      render: (track) => (
        <span className="text-xs text-slate-700 font-medium leading-relaxed block">
          {track.perfectFor}
        </span>
      ),
    },
    {
      category: "overview",
      label: "Weekly Time Commitment",
      tooltip: "Estimated hours per week needed for live classes and lab practice",
      render: (track) => (
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <FaClock className="text-slate-400 text-[11px] flex-shrink-0" />
          <span>{track.hoursPerWeek}</span>
        </div>
      ),
    },
    {
      category: "overview",
      label: "Live Instructor Training",
      tooltip: "Total live interactive classroom and online lecture hours",
      render: (track) => (
        <span className="text-xs font-semibold text-slate-800">
          {track.liveHours}
        </span>
      ),
    },
    {
      category: "overview",
      label: "Learning Mode",
      tooltip: "Flexible modes available for students and professionals",
      render: () => (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
          <FaCheck className="text-[9px]" /> Classroom + Online
        </span>
      ),
    },

    // --- 2. CURRICULUM & AI TOOLS ---
    {
      category: "curriculum",
      categoryName: "Curriculum Depth & AI Integration",
      categoryIcon: <FaRobot className="text-purple-500" />,
      label: "Curriculum Syllabus Modules",
      tooltip: "Number of comprehensive subject modules covered",
      render: (track) => (
        <div>
          <span className="text-base font-black text-[#7C2D12]">
            {track.modulesCount} Modules
          </span>
          <span className="text-[10px] text-slate-500 block font-medium">
            {track.modulesType}
          </span>
        </div>
      ),
    },
    {
      category: "curriculum",
      label: "AI Tools & Automation Stack",
      tooltip: "Number of artificial intelligence and automation tools taught hands-on",
      render: (track) => (
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-black px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-200">
            {track.aiToolsCount}
          </span>
          <span className="text-xs text-slate-700 font-semibold">AI Tools</span>
        </div>
      ),
    },
    {
      category: "curriculum",
      label: "Next-Gen Search AI (AEO / LLMO)",
      tooltip: "Answer Engine Optimization & LLM Optimization for ChatGPT, Perplexity, and Gemini",
      render: (track) => {
        const isAdvanced =
          track.durId === "6-months" || track.durId === "12-months";
        return (
          <div className="text-xs leading-snug">
            {isAdvanced ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                <FaCheckCircle className="text-emerald-600 flex-shrink-0" />
                {track.searchAi}
              </span>
            ) : (
              <span className="text-slate-600 font-medium">{track.searchAi}</span>
            )}
          </div>
        );
      },
    },
    {
      category: "curriculum",
      label: "Curriculum Focus & Depth",
      tooltip: "The core technical and strategic focus of this curriculum",
      render: (track) => {
        const highlights = {
          "3-months": "Core Foundations: SEO, Meta Ads, Google Ads, Canva & Content",
          "4-months": "Specialized Execution: Performance Ads, GA4 & ROI Campaigns",
          "6-months": "End-to-End Mastery: 25+ Domains, AEO/LLMO, Paid Agency Accounts",
          "12-months": "Executive Master: 32+ Domains, Leadership, Custom AI Automations",
        };
        return (
          <span className="text-xs text-slate-700 font-medium leading-relaxed block">
            {highlights[track.durId] || track.course.shortDesc || "Comprehensive practical syllabus"}
          </span>
        );
      },
    },

    // --- 3. PRACTICAL WORK & AGENCY INTERNSHIP ---
    {
      category: "practical",
      categoryName: "Live Projects & Agency Internship",
      categoryIcon: <FaBriefcase className="text-blue-500" />,
      label: "Live Brand Projects",
      tooltip: "Hands-on projects with industry data and actual client briefs",
      render: (track) => (
        <span className="text-xs font-bold text-slate-800">
          {track.projects}
        </span>
      ),
    },
    {
      category: "practical",
      label: "In-House Agency Internship",
      tooltip: "Real client agency workflow inside Dizital Adda's in-house agency",
      render: (track) => {
        const hasInternship =
          track.durId === "4-months" ||
          track.durId === "6-months" ||
          track.durId === "12-months";
        return (
          <div>
            {hasInternship ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                <FaBriefcase className="text-blue-600 text-xs flex-shrink-0" />
                {track.agencyInternship}
              </span>
            ) : (
              <span className="text-xs text-slate-500 font-medium">
                {track.agencyInternship}
              </span>
            )}
          </div>
        );
      },
    },
    {
      category: "practical",
      label: "Live Ad Spend & Budgets",
      tooltip: "Running campaigns with actual budget allocation",
      render: (track) => {
        const hasLiveBudget =
          track.durId === "4-months" ||
          track.durId === "6-months" ||
          track.durId === "12-months";
        return (
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            {hasLiveBudget ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <FaCheckCircle className="text-emerald-600 text-xs" />
                {track.meta.adBudgets || "Live Ad Budgets Included"}
              </span>
            ) : (
              <span className="text-slate-500 font-normal">
                {track.meta.adBudgets || "Simulated Sandboxes"}
              </span>
            )}
          </div>
        );
      },
    },
    {
      category: "practical",
      label: "Capstone Project Depth",
      tooltip: "Major portfolio projects evaluated for placement readiness",
      render: (track) => (
        <span className="text-xs font-semibold text-slate-800">
          {track.capstone}
        </span>
      ),
    },

    // --- 4. MENTORSHIP & CERTIFICATIONS ---
    {
      category: "mentorship",
      categoryName: "Mentorship & Credentials",
      categoryIcon: <FaGraduationCap className="text-emerald-500" />,
      label: "Mentorship Structure",
      tooltip: "Interaction model with Dr. Gulshan Kumar and industry directors",
      render: (track) => (
        <span className="text-xs text-slate-700 font-medium block leading-snug">
          {track.mentorship}
        </span>
      ),
    },
    {
      category: "mentorship",
      label: "Mock Interviews & Grooming",
      tooltip: "Technical and HR interview simulations before placement drives",
      render: (track) => (
        <span className="text-xs font-semibold text-slate-800">
          {track.meta.mockInterviews || "1-5 Mock Technical Rounds"}
        </span>
      ),
    },
    {
      category: "mentorship",
      label: "Certifications Awarded",
      tooltip: "Recognized certificates received upon successful completion",
      render: (track) => (
        <div className="text-xs font-bold text-slate-800 space-y-1">
          <div className="flex items-center gap-1.5">
            <FaAward className="text-amber-600 text-xs flex-shrink-0" />
            <span>{track.certifications}</span>
          </div>
          {track.durId === "6-months" && (
            <span className="text-[10px] text-blue-700 block font-semibold">
              + ISO 9001:2015 Verified Certificate
            </span>
          )}
          {track.durId === "12-months" && (
            <span className="text-[10px] text-fuchsia-700 block font-semibold">
              + Corporate Agency Internship Letter
            </span>
          )}
        </div>
      ),
    },

    // --- 5. CAREER & PLACEMENT DELIVERABLES ---
    {
      category: "placement",
      categoryName: "Career & Placement Assurance",
      categoryIcon: <FaAward className="text-[#D4A017]" />,
      label: "Placement Support Model",
      tooltip: "Placement commitment and dedicated hiring drives",
      render: (track) => {
        const isGuaranteed = track.durId === "12-months";
        const isAdvanced = track.durId === "6-months";
        return (
          <div className="space-y-1">
            {isGuaranteed ? (
              <span className="inline-flex items-center gap-1 text-xs font-black text-fuchsia-900 bg-fuchsia-100 px-2.5 py-1 rounded-lg border border-fuchsia-300">
                <FaShieldAlt className="text-fuchsia-700 flex-shrink-0" />
                100% Placement Guarantee
              </span>
            ) : isAdvanced ? (
              <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-300">
                <FaCheckCircle className="text-emerald-600 flex-shrink-0" />
                100% Placement Support
              </span>
            ) : (
              <span className="text-xs font-bold text-slate-700">
                {track.placement}
              </span>
            )}
            <span className="text-[10px] text-slate-500 block">
              {isGuaranteed
                ? "Formal placement agreement + executive referrals"
                : isAdvanced
                ? "500+ Hiring Partners + Dedicated Placement Desk"
                : "Resume Review + Job Portal Access"}
            </span>
          </div>
        );
      },
    },
  ];

  // Filter rows if user chooses category tabs
  const filteredRows =
    filterCategory === "all"
      ? COMPARISON_ROWS
      : COMPARISON_ROWS.filter((r) => r.category === filterCategory);

  // Group filtered rows by category for rendering headers
  const categoryHeaders = {
    overview: {
      name: "Program Overview & Schedule",
      icon: <FaClock className="text-amber-500" />,
    },
    curriculum: {
      name: "Curriculum Depth & AI Integration",
      icon: <FaRobot className="text-purple-500" />,
    },
    practical: {
      name: "Live Projects & Agency Internship",
      icon: <FaBriefcase className="text-blue-500" />,
    },
    mentorship: {
      name: "Mentorship & Credentials",
      icon: <FaGraduationCap className="text-emerald-500" />,
    },
    placement: {
      name: "Career & Placement Assurance",
      icon: <FaAward className="text-[#D4A017]" />,
    },
  };

  return (
    <section className="mt-16 pt-12 border-t-2 border-slate-200">
      {/* ==========================================
          SECTION HEADER
      ========================================== */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-orange-800 bg-orange-100/90 border border-orange-300 mb-3">
          <FaLayerGroup className="text-xs text-orange-600" />
          <span>Step 2 Extension • Side-by-Side Track Breakdown</span>
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1220] tracking-tight">
          Compare All {trackColumns.length} Tracks: Understand The Exact Differences
        </h3>

        <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
          Har course track alag depth, practical projects aur career goals ke
          liye design kiya gaya hai. Niche table me module count, AI tools, live
          agency internship aur placement support ka clear comparison dekhein.
        </p>

        {/* Quick Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
          {[
            { id: "all", label: "All Details" },
            { id: "overview", label: "Schedule & Mode" },
            { id: "curriculum", label: "Curriculum & AI" },
            { id: "practical", label: "Projects & Agency" },
            { id: "mentorship", label: "Mentorship & Certs" },
            { id: "placement", label: "Placement Model" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterCategory === tab.id
                  ? "bg-[#0B1220] text-[#D4A017] shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ==========================================
          RESPONSIVE COMPARISON TABLE
      ========================================== */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300">
          <table className="w-full text-left border-collapse min-w-[760px] lg:min-w-[980px]">
            {/* Table Header: Track Names & Direct Selection */}
            <thead>
              <tr className="border-b-2 border-slate-200 bg-slate-50/90">
                {/* Sticky Parameter Column */}
                <th className="p-5 text-xs font-black uppercase tracking-wider text-slate-500 w-1/4 min-w-[200px] sticky left-0 bg-slate-50/95 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)]">
                  Feature / Parameter
                </th>

                {trackColumns.map((track) => {
                  return (
                    <th
                      key={track.id}
                      className={`p-5 text-center align-top relative transition-colors ${
                        track.isPopular
                          ? "bg-amber-50/70 border-x-2 border-amber-300"
                          : "border-x border-slate-200"
                      }`}
                    >
                      {/* Popular Badge */}
                      {track.isPopular && (
                        <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 bg-[#D4A017] text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-b-md shadow-sm whitespace-nowrap">
                          ⭐ Most Popular Track
                        </div>
                      )}

                      <div className={track.isPopular ? "pt-2" : ""}>
                        <span
                          className={`inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border mb-1.5 ${
                            track.durId === "3-months"
                              ? "bg-amber-100 text-amber-900 border-amber-300"
                              : track.durId === "4-months"
                              ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                              : track.durId === "6-months"
                              ? "bg-blue-100 text-blue-900 border-blue-300"
                              : "bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300"
                          }`}
                        >
                          {track.level}
                        </span>

                        <h4 className="text-lg font-black text-[#0B1220] leading-snug">
                          {track.duration}
                        </h4>

                        <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">
                          {track.title}
                        </p>

                        <button
                          type="button"
                          onClick={() => onSelectCourse(track.course)}
                          className={`mt-3 w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                            track.isPopular
                              ? "bg-[#7C2D12] hover:bg-[#63240e] text-white shadow-orange-900/20"
                              : "bg-[#0B1220] hover:bg-[#7C2D12] text-white"
                          }`}
                        >
                          <span>Select Track</span>
                          <FaArrowRight className="text-[10px]" />
                        </button>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Table Body with Categorized Rows */}
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredRows.map((row, rIdx) => {
                // Check if this row is the start of a new category
                const prevRow = rIdx > 0 ? filteredRows[rIdx - 1] : null;
                const isNewCategory =
                  !prevRow || prevRow.category !== row.category;
                const catInfo = categoryHeaders[row.category];

                return (
                  <tr key={`${row.category}-${row.label}-${rIdx}`} className="group">
                    {/* Render Category Subheader if new category */}
                    {isNewCategory && filterCategory === "all" && (
                      <td
                        colSpan={trackColumns.length + 1}
                        className="bg-slate-100/90 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-[#0B1220] border-t-2 border-slate-200"
                      >
                        <div className="flex items-center gap-2">
                          {catInfo?.icon}
                          <span>{catInfo?.name}</span>
                        </div>
                      </td>
                    )}

                    {/* Parameter Label (Sticky Column) */}
                    <td className="p-4 align-middle text-xs font-bold text-slate-800 bg-white sticky left-0 z-10 border-r border-slate-200 group-hover:bg-slate-50/80 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.04)]">
                      <span className="block">{row.label}</span>
                      {row.tooltip && (
                        <span className="text-[10px] text-slate-400 font-normal block mt-0.5">
                          {row.tooltip}
                        </span>
                      )}
                    </td>

                    {/* Track Columns */}
                    {trackColumns.map((track) => (
                      <td
                        key={track.id}
                        className={`p-4 align-middle text-center ${
                          track.isPopular
                            ? "bg-amber-50/30 border-x-2 border-amber-300 group-hover:bg-amber-50/60"
                            : "border-x border-slate-100 group-hover:bg-slate-50/50"
                        }`}
                      >
                        {row.render(track)}
                      </td>
                    ))}
                  </tr>
                );
              })}

              {/* Bottom Action Footer Row */}
              <tr className="bg-slate-50 border-t-2 border-slate-200">
                <td className="p-5 align-middle text-xs font-black text-slate-700 uppercase tracking-wider sticky left-0 bg-slate-50 z-10 border-r border-slate-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.06)]">
                  Enrollment Action
                </td>
                {trackColumns.map((track) => (
                  <td
                    key={track.id}
                    className={`p-5 text-center ${
                      track.isPopular
                        ? "bg-amber-50/70 border-x-2 border-amber-300"
                        : "border-x border-slate-200"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onSelectCourse(track.course)}
                      className={`w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md group/btn ${
                        track.isPopular
                          ? "bg-[#7C2D12] hover:bg-[#63240e] text-white hover:shadow-xl"
                          : "bg-[#0B1220] hover:bg-[#7C2D12] text-white hover:shadow-lg"
                      }`}
                    >
                      <span>Choose {track.duration}</span>
                      <FaArrowRight className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================================
          TRACK VERDICT / DECISION GUIDE CARDS
          "Konsa Program Aapke Liye Sahi Hai?"
      ========================================== */}
      <div className="mt-14">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-xs font-bold text-[#7C2D12] bg-orange-100 border border-orange-200 mb-2">
            <FaLightbulb className="text-orange-500" />
            <span>Track Selection Guide</span>
          </div>
          <h4 className="text-2xl sm:text-3xl font-black text-[#0B1220]">
            Which Track is Right for Your Career Goals?
          </h4>
          <p className="text-sm text-slate-600 mt-1.5">
            Aapke current experience aur career vision ke hisaab se sabse accurate
            recommendation:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trackColumns.map((track) => {
            const meta = track.meta;
            const borderColors = {
              "3-months": "border-amber-300 hover:border-amber-500",
              "4-months": "border-emerald-300 hover:border-emerald-500",
              "6-months": "border-blue-400 hover:border-blue-600 ring-2 ring-blue-200",
              "12-months": "border-fuchsia-300 hover:border-fuchsia-500",
            };
            const headerBgs = {
              "3-months": "bg-amber-500 text-white",
              "4-months": "bg-emerald-600 text-white",
              "6-months": "bg-gradient-to-r from-blue-700 to-indigo-800 text-white",
              "12-months": "bg-gradient-to-r from-purple-800 to-fuchsia-900 text-white",
            };

            return (
              <div
                key={track.id}
                className={`bg-white rounded-3xl border-2 ${
                  borderColors[track.durId] || "border-slate-200"
                } shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group`}
              >
                {/* Card Top Banner */}
                <div>
                  <div className={`p-4 ${headerBgs[track.durId] || "bg-[#0B1220] text-white"}`}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold uppercase tracking-wider opacity-90">
                        {track.level}
                      </span>
                      {track.isPopular && (
                        <span className="bg-[#D4A017] text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                          ⭐ Top Pick
                        </span>
                      )}
                    </div>
                    <h5 className="text-xl font-black mt-1">
                      {track.duration} Program
                    </h5>
                    <p className="text-xs opacity-90 mt-0.5 font-medium">
                      {meta.tagline || track.title}
                    </p>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4">
                    {/* Verdict Heading & Summary */}
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Best For
                      </span>
                      <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
                        {track.perfectFor}
                      </p>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {meta.verdictSummary || track.course.shortDesc}
                      </p>
                    </div>

                    {/* Key Highlights */}
                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-2">
                        Key Inclusions:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {(meta.whyChoose || track.course.featureList?.slice(0, 4) || []).map(
                          (item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <FaCheckCircle className="text-emerald-500 text-xs mt-0.5 flex-shrink-0" />
                              <span className="leading-snug">{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => onSelectCourse(track.course)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      track.isPopular
                        ? "bg-[#7C2D12] hover:bg-[#63240e] text-white shadow-md hover:shadow-lg"
                        : "bg-slate-100 hover:bg-[#0B1220] text-slate-800 hover:text-white"
                    }`}
                  >
                    <span>Select {track.duration}</span>
                    <FaArrowRight className="text-[11px]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

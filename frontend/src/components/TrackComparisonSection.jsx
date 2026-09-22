import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

// Flagship default Digital Marketing tracks for when courses prop is empty or general page usage
const DEFAULT_FLAGSHIP_TRACKS = [
  {
    id: "dm-beginners",
    durationId: "3-months",
    duration: "3 Months",
    title: "Digital Marketing for Beginners",
    level: "BEGINNER LEVEL",
    modulesCount: "30",
    modulesType: "Core Foundational Modules",
    aiToolsCount: "40+",
    hoursPerWeek: "8 - 10 Hours / Week",
    liveHours: "60+ Hours Live Sessions",
    projects: "10 Live Brand Projects",
    certifications: "10+ Global Certifications (Google, Meta, HubSpot)",
    mentorship: "Group Learning & Weekly Live Q&A",
    placement: "100% Placement Assistance (Job Board Access)",
    perfectFor: "Students, 12th Pass, Fresh Graduates & Beginners",
    searchAi: "Basic Overview (Modern AI Search)",
    agencyInternship: "Simulated Agency Lab Case Studies",
    adBudgets: "Guided Sandboxes & Campaign Setups",
    capstone: "1 Guided Portfolio Capstone",
    mockInterviews: "1 Mock Technical Interview + Resume Critique",
    tagline: "Fast-Track Foundational Launch",
    verdictSummary:
      "A fast 90-day launchpad covering SEO, Meta Ads, Google Ads, Canva, and 40+ AI tools. Ideal for beginners building fundamental skills.",
    whyChoose: [
      "Fast 3-month completion time",
      "Essential SEO, Meta Ads & Google Ads",
      "40+ AI tools (ChatGPT, Gemini, Canva AI)",
      "10 Live brand projects with mentor feedback",
    ],
    slug: "/skilling?domain=digital-marketing&duration=3-months&course=dm-beginners",
  },
  {
    id: "dm-professionals",
    durationId: "4-months",
    duration: "4 Months",
    title: "Digital Marketing for Professionals",
    level: "PROFESSIONAL LEVEL",
    modulesCount: "40",
    modulesType: "Focused Professional Modules",
    aiToolsCount: "50+",
    hoursPerWeek: "10 - 12 Hours / Week",
    liveHours: "90+ Hours Live Sessions",
    projects: "10 Live Brand Projects with Ad Budgets",
    certifications: "10+ Global Certifications + Agency Certificate",
    mentorship: "Weekly Practitioner Mentorship",
    placement: "100% Placement Assistance (250+ Recruiters)",
    perfectFor: "Working Professionals & Small Business Owners",
    searchAi: "Search AI & Schema Structured Data",
    agencyInternship: "Paid In-House Agency Internship",
    adBudgets: "Live Ad Budgets for Meta & Google",
    capstone: "Mini Brand Projects + Capstone",
    mockInterviews: "3 Mock Technical & HR Interviews",
    tagline: "Career Upskill for Working Pros",
    verdictSummary:
      "Designed specifically for working professionals and business owners needing fast results. Covers 40 focused modules, performance marketing, GA4, and live ad spend.",
    whyChoose: [
      "Weekend & evening friendly 10-12 hrs/week",
      "Paid in-house agency internship experience",
      "Real ad spend on Meta & Google campaigns",
      "Advanced GA4 tracking & performance marketing",
    ],
    slug: "/skilling?domain=digital-marketing&duration=4-months&course=dm-professionals",
  },
  {
    id: "dm-advanced",
    durationId: "6-months",
    duration: "6 Months",
    title: "Advanced Digital Marketing",
    level: "ADVANCED LEVEL",
    isPopular: true,
    modulesCount: "60",
    modulesType: "Detailed Specialization Modules",
    aiToolsCount: "54+",
    hoursPerWeek: "12 - 15 Hours / Week",
    liveHours: "150+ Hours Live Sessions",
    projects: "10 Live Brand Campaigns with Real Client Budgets",
    certifications: "10+ Global Certifications + ISO Verified",
    mentorship: "Industry Expert Mentorship + 1:1 Reviews",
    placement: "100% Placement Support (500+ Hiring Partners)",
    perfectFor: "Serious Career Switchers & Graduates",
    searchAi: "Next-Gen Search AI (AEO & LLMO Optimization)",
    agencyInternship: "Paid In-House Agency Internship (Live Clients)",
    adBudgets: "Real Client Ad Budgets Managed",
    capstone: "Major Enterprise Capstone + Live Campaigns",
    mockInterviews: "5 Full Mock Technical Interviews",
    tagline: "Complete Career Switch & Agency Mastery",
    verdictSummary:
      "Our most chosen program. 60 detailed modules, 54+ AI tools, live agency internship handling real brand accounts, cutting-edge AEO/LLMO training, and 100% placement support.",
    whyChoose: [
      "Next-Gen Answer Engine (AEO) & LLM Optimization (LLMO)",
      "Manage real client brand accounts with live budgets",
      "Paid in-house agency internship certificate",
      "100% placement support with 500+ hiring partners",
    ],
    slug: "/skilling?domain=digital-marketing&duration=6-months&course=dm-advanced",
  },
  {
    id: "dm-expert",
    durationId: "12-months",
    duration: "12 Months",
    title: "Expert in Digital Marketing",
    level: "EXPERT LEVEL",
    modulesCount: "70",
    modulesType: "Comprehensive Master Modules",
    aiToolsCount: "60+",
    hoursPerWeek: "15 - 20 Hours / Week",
    liveHours: "300+ Hours Live Sessions",
    projects: "10 Live Brand Campaigns + 2 Major Capstones",
    certifications: "10+ Industry Certifications + Internship Letter",
    mentorship: "1-on-1 Dedicated Senior Mentorship & Coaching",
    placement: "100% Placement Guarantee (with Formal Agreement)",
    perfectFor: "Future Marketing Directors & Agency Founders",
    searchAi: "Advanced AEO, LLMO & Custom AI Automations",
    agencyInternship: "Senior Agency Account Lead & Paid Retainers",
    adBudgets: "Enterprise-Scale Client Ad Spend & Retainers",
    capstone: "2 Major Enterprise Capstones + Production Portfolio",
    mockInterviews: "Unlimited Mock Technical & Leadership Interviews",
    tagline: "Complete Executive Mastery & Placement Guarantee",
    verdictSummary:
      "A year-long comprehensive master program for leadership roles or agency founders. Includes 70 modules, 60+ AI tools, dedicated 1-on-1 mentorship, and 100% placement guarantee with formal agreement.",
    whyChoose: [
      "100% Placement Guarantee (with formal agreement)",
      "1-on-1 dedicated executive mentorship & coaching",
      "Full agency management & client retainer sprints",
      "2 Major enterprise capstones & corporate letters",
    ],
    slug: "/skilling?domain=digital-marketing&duration=12-months&course=dm-expert",
  },
];

export default function TrackComparisonSection({
  courses,
  selectedDomain,
  onSelectCourse,
  activeSpecialization,
}) {
  const navigate = useNavigate();
  const [filterCategory, setFilterCategory] = useState("all");

  // Determine active track list
  const trackColumns =
    Array.isArray(courses) && courses.length > 0
      ? courses.map((course) => {
          const durId = course.durationId || "3-months";
          const fallback =
            DEFAULT_FLAGSHIP_TRACKS.find((f) => f.durationId === durId) ||
            DEFAULT_FLAGSHIP_TRACKS[0];

          const isPopular =
            course.isPopular ||
            durId === "6-months" ||
            course.id?.includes("advanced");

          return {
            course,
            id: course.id || fallback.id,
            durId,
            duration: course.duration || fallback.duration,
            title: course.title || fallback.title,
            level: course.level || fallback.level,
            isPopular,
            modulesCount: course.modulesCount || fallback.modulesCount,
            modulesType: course.modulesType || fallback.modulesType,
            aiToolsCount: course.aiToolsCount || fallback.aiToolsCount,
            hoursPerWeek: course.hoursPerWeek || fallback.hoursPerWeek,
            liveHours: fallback.liveHours,
            projects:
              course.projectsHighlight ||
              course.projects ||
              fallback.projects,
            certifications:
              course.certHighlight ||
              course.certification ||
              fallback.certifications,
            mentorship: course.mentorship || fallback.mentorship,
            placement:
              course.placementGuarantee ||
              (durId === "12-months"
                ? "100% Placement Guarantee (with Formal Agreement)"
                : durId === "6-months"
                ? "100% Placement Support (500+ Hiring Partners)"
                : "100% Placement Assistance"),
            perfectFor: course.perfectFor || fallback.perfectFor,
            searchAi: fallback.searchAi,
            agencyInternship: fallback.agencyInternship,
            adBudgets: fallback.adBudgets,
            capstone: fallback.capstone,
            mockInterviews: fallback.mockInterviews,
            tagline: fallback.tagline,
            verdictSummary: course.shortDesc || fallback.verdictSummary,
            whyChoose: course.featureList?.slice(0, 4) || fallback.whyChoose,
            slug:
              course.enrollUrl ||
              `/skilling?domain=${selectedDomain?.id || "digital-marketing"}&duration=${durId}&course=${course.id}`,
          };
        })
      : DEFAULT_FLAGSHIP_TRACKS;

  const handleSelect = (track) => {
    if (onSelectCourse && track.course) {
      onSelectCourse(track.course);
    } else if (track.slug) {
      navigate(track.slug);
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  // Define Category Headers
  const categoryHeaders = {
    overview: "Program Overview & Schedule",
    curriculum: "Curriculum Depth & Technology Stack",
    practical: "Live Projects & Agency Experience",
    mentorship: "Mentorship & Credentials",
    placement: "Career & Placement Deliverables",
  };

  // Matrix of Rows
  const COMPARISON_ROWS = [
    // --- 1. OVERVIEW & SCHEDULE ---
    {
      category: "overview",
      label: "Duration & Track Level",
      tooltip: "Official program length and difficulty level",
      render: (track) => (
        <div>
          <span className="font-bold text-slate-900 block text-sm">
            {track.duration}
          </span>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mt-0.5">
            {track.level}
          </span>
        </div>
      ),
    },
    {
      category: "overview",
      label: "Target Audience",
      tooltip: "Who gets the maximum career outcome from this duration",
      render: (track) => (
        <span className="text-xs text-slate-700 font-normal leading-relaxed block">
          {track.perfectFor}
        </span>
      ),
    },
    {
      category: "overview",
      label: "Weekly Time Commitment",
      tooltip: "Recommended study and practice hours per week",
      render: (track) => (
        <span className="text-xs font-semibold text-slate-800">
          {track.hoursPerWeek}
        </span>
      ),
    },
    {
      category: "overview",
      label: "Live Instructor Training",
      tooltip: "Total interactive lecture and lab hours",
      render: (track) => (
        <span className="text-xs font-semibold text-slate-800">
          {track.liveHours}
        </span>
      ),
    },
    {
      category: "overview",
      label: "Learning Delivery Mode",
      tooltip: "Available study formats",
      render: () => (
        <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300">
          Classroom & Online Interactive
        </span>
      ),
    },

    // --- 2. CURRICULUM & TECH STACK ---
    {
      category: "curriculum",
      label: "Curriculum Modules",
      tooltip: "Total practical modules included",
      render: (track) => (
        <div>
          <span className="text-sm font-black text-[#7C2D12]">
            {track.modulesCount} Modules
          </span>
          <span className="text-[10px] text-slate-500 block font-normal">
            {track.modulesType}
          </span>
        </div>
      ),
    },
    {
      category: "curriculum",
      label: "AI Tools & Automation Stack",
      tooltip: "Industry tools taught hands-on",
      render: (track) => (
        <div>
          <span className="text-xs font-bold text-slate-900 block">
            {track.aiToolsCount} AI Tools
          </span>
          <span className="text-[10px] text-slate-500 block">
            Integrated into workflows
          </span>
        </div>
      ),
    },
    {
      category: "curriculum",
      label: "Next-Gen Search AI (AEO / LLMO)",
      tooltip: "Answer Engine Optimization & LLM search readiness",
      render: (track) => {
        const isHigh =
          track.durId === "6-months" || track.durId === "12-months";
        return (
          <span
            className={`text-xs block ${
              isHigh ? "font-bold text-slate-900" : "text-slate-600 font-normal"
            }`}
          >
            {track.searchAi}
          </span>
        );
      },
    },
    {
      category: "curriculum",
      label: "Curriculum Focus",
      tooltip: "Core specialization of this duration",
      render: (track) => {
        const highlights = {
          "3-months": "Core Foundations: SEO, Meta Ads, Google Ads, Canva & Content",
          "4-months": "Specialized Execution: Performance Ads, GA4 & ROI Campaigns",
          "6-months": "End-to-End Mastery: 25+ Domains, AEO/LLMO, Paid Agency Accounts",
          "12-months": "Executive Master: 32+ Domains, Leadership, Custom AI Automations",
        };
        return (
          <span className="text-xs text-slate-700 font-normal leading-relaxed block">
            {highlights[track.durId] || "Comprehensive practical curriculum"}
          </span>
        );
      },
    },

    // --- 3. PRACTICAL WORK & AGENCY ---
    {
      category: "practical",
      label: "Live Brand Projects",
      tooltip: "Hands-on projects with actual company briefs",
      render: (track) => (
        <span className="text-xs font-semibold text-slate-800">
          {track.projects}
        </span>
      ),
    },
    {
      category: "practical",
      label: "In-House Agency Internship",
      tooltip: "Work on live client accounts inside Dizital Adda Agency",
      render: (track) => (
        <span
          className={`text-xs block ${
            track.durId === "6-months" || track.durId === "12-months" || track.durId === "4-months"
              ? "font-bold text-slate-900"
              : "text-slate-600 font-normal"
          }`}
        >
          {track.agencyInternship}
        </span>
      ),
    },
    {
      category: "practical",
      label: "Live Ad Spend & Budgets",
      tooltip: "Ad budget allocation for live advertising campaigns",
      render: (track) => (
        <span className="text-xs font-normal text-slate-800">
          {track.adBudgets}
        </span>
      ),
    },
    {
      category: "practical",
      label: "Capstone Project Scope",
      tooltip: "Major portfolio projects evaluated for placement",
      render: (track) => (
        <span className="text-xs font-semibold text-slate-800">
          {track.capstone}
        </span>
      ),
    },

    // --- 4. MENTORSHIP & CREDENTIALS ---
    {
      category: "mentorship",
      label: "Mentorship Format",
      tooltip: "Direct guidance from senior industry practitioners",
      render: (track) => (
        <span className="text-xs text-slate-700 font-normal block leading-snug">
          {track.mentorship}
        </span>
      ),
    },
    {
      category: "mentorship",
      label: "Interview Preparation",
      tooltip: "Mock technical and HR interview rounds",
      render: (track) => (
        <span className="text-xs font-normal text-slate-800">
          {track.mockInterviews}
        </span>
      ),
    },
    {
      category: "mentorship",
      label: "Certifications Awarded",
      tooltip: "Recognized certificates upon completion",
      render: (track) => (
        <div className="text-xs font-medium text-slate-800 space-y-0.5">
          <div>{track.certifications}</div>
          {track.durId === "6-months" && (
            <div className="text-[10px] text-slate-500 font-normal">
              + ISO 9001:2015 Verified Certificate
            </div>
          )}
          {track.durId === "12-months" && (
            <div className="text-[10px] text-slate-500 font-normal">
              + Corporate Agency Internship Letter
            </div>
          )}
        </div>
      ),
    },

    // --- 5. CAREER & PLACEMENT DELIVERABLES ---
    {
      category: "placement",
      label: "Placement Model",
      tooltip: "Placement commitment and dedicated hiring support",
      render: (track) => (
        <div className="space-y-1">
          <span
            className={`inline-block text-xs px-2 py-0.5 rounded font-bold ${
              track.durId === "12-months"
                ? "bg-slate-900 text-white"
                : track.durId === "6-months"
                ? "bg-[#D4A017] text-slate-950"
                : "bg-slate-200 text-slate-800"
            }`}
          >
            {track.placement}
          </span>
          <span className="text-[10px] text-slate-500 block">
            {track.durId === "12-months"
              ? "Formal placement agreement + executive referrals"
              : track.durId === "6-months"
              ? "500+ Hiring Partners + Dedicated Placement Desk"
              : "Resume Review + Job Portal Access"}
          </span>
        </div>
      ),
    },
  ];

  // Filter rows based on selected tab
  const filteredRows =
    filterCategory === "all"
      ? COMPARISON_ROWS
      : COMPARISON_ROWS.filter((r) => r.category === filterCategory);

  return (
    <section className="mt-16 pt-12 border-t border-slate-200">
      {/* ==========================================
          SECTION HEADER (CLEAN TYPOGRAPHY, NO ICONS, NO GRADIENTS)
      ========================================== */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#7C2D12] bg-orange-50 border border-orange-200 px-3 py-1 rounded-full mb-3">
          Track Comparison Breakdown
        </span>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1220] tracking-tight">
          Compare All {trackColumns.length} Tracks: Choose The Exact Depth You Need
        </h3>

        <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
          Har course track alag depth, practical projects aur career outcomes ke
          liye design kiya gaya hai. Niche table me module count, AI tools, live
          agency internship aur placement support ka clear comparison dekhein.
        </p>

        {/* Filter Category Pills */}
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
              type="button"
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                filterCategory === tab.id
                  ? "bg-[#0B1220] text-[#D4A017]"
                  : "bg-white text-slate-600 border border-slate-300 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ==========================================
          RESPONSIVE COMPARISON TABLE (FIXED WIDTHS, NO SHIFT, NO BLANK SPACE)
      ========================================== */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed min-w-[800px]">
            {/* Column Width Distribution: First Col 24%, 4 Track Cols 19% each = 100% */}
            <colgroup>
              <col className="w-[24%]" />
              {trackColumns.map((t) => (
                <col key={`col-${t.id}`} className="w-[19%]" />
              ))}
            </colgroup>

            {/* Table Header Row */}
            <thead>
              <tr className="border-b border-slate-300 bg-slate-50">
                <th className="p-4 align-top text-xs font-black uppercase tracking-wider text-slate-500 border-r border-slate-200">
                  Feature / Parameter
                </th>

                {trackColumns.map((track) => {
                  return (
                    <th
                      key={`th-${track.id}`}
                      className={`p-4 text-center align-top relative border-r border-slate-200 last:border-r-0 ${
                        track.isPopular ? "bg-amber-50/60 border-t-2 border-t-[#D4A017]" : ""
                      }`}
                    >
                      {track.isPopular && (
                        <div className="inline-block mb-1.5 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#D4A017] text-slate-950">
                          Recommended
                        </div>
                      )}

                      <div>
                        <span
                          className={`inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded border mb-1 ${
                            track.durId === "3-months"
                              ? "bg-amber-50 text-amber-900 border-amber-300"
                              : track.durId === "4-months"
                              ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                              : track.durId === "6-months"
                              ? "bg-blue-50 text-blue-900 border-blue-300"
                              : "bg-purple-50 text-purple-900 border-purple-300"
                          }`}
                        >
                          {track.level}
                        </span>

                        <h4 className="text-base font-black text-[#0B1220] leading-tight">
                          {track.duration}
                        </h4>

                        <p className="text-xs text-slate-500 font-normal line-clamp-1 mt-0.5">
                          {track.title}
                        </p>

                        <button
                          type="button"
                          onClick={() => handleSelect(track)}
                          className={`mt-3 w-full py-2 px-3 rounded-lg font-bold text-xs transition-colors ${
                            track.isPopular
                              ? "bg-[#7C2D12] hover:bg-[#60230e] text-white"
                              : "bg-[#0B1220] hover:bg-[#7C2D12] text-white"
                          }`}
                        >
                          Select Track
                        </button>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-200 text-sm">
              {filteredRows.map((row, rIdx) => {
                const prevRow = rIdx > 0 ? filteredRows[rIdx - 1] : null;
                const isNewCategory = !prevRow || prevRow.category !== row.category;
                const categoryTitle = categoryHeaders[row.category];

                return (
                  <Fragment key={`row-group-${row.category}-${rIdx}`}>
                    {/* Render Category Header in its own distinct TR if new category */}
                    {isNewCategory && filterCategory === "all" && (
                      <tr className="bg-slate-100 border-t-2 border-b border-slate-300">
                        <td
                          colSpan={trackColumns.length + 1}
                          className="px-4 py-2.5 text-xs font-black uppercase tracking-wider text-slate-800"
                        >
                          {categoryTitle}
                        </td>
                      </tr>
                    )}

                    {/* Data Row */}
                    <tr className="hover:bg-slate-50/70 border-b border-slate-200">
                      <td className="p-3.5 align-middle text-xs font-bold text-slate-800 border-r border-slate-200 bg-white">
                        <span className="block">{row.label}</span>
                        {row.tooltip && (
                          <span className="text-[10px] text-slate-400 font-normal block mt-0.5">
                            {row.tooltip}
                          </span>
                        )}
                      </td>

                      {trackColumns.map((track) => (
                        <td
                          key={`cell-${track.id}-${row.label}`}
                          className={`p-3.5 align-middle text-center border-r border-slate-200 last:border-r-0 ${
                            track.isPopular ? "bg-amber-50/30" : "bg-white"
                          }`}
                        >
                          {row.render(track)}
                        </td>
                      ))}
                    </tr>
                  </Fragment>
                );
              })}

              {/* Bottom Action Footer Row */}
              <tr className="bg-slate-50 border-t-2 border-slate-300">
                <td className="p-4 align-middle text-xs font-black text-slate-700 uppercase tracking-wider border-r border-slate-200">
                  Enrollment
                </td>
                {trackColumns.map((track) => (
                  <td
                    key={`btm-btn-${track.id}`}
                    className={`p-4 text-center border-r border-slate-200 last:border-r-0 ${
                      track.isPopular ? "bg-amber-50/60" : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelect(track)}
                      className={`w-full py-2.5 px-3 rounded-lg font-bold text-xs transition-colors ${
                        track.isPopular
                          ? "bg-[#7C2D12] hover:bg-[#60230e] text-white"
                          : "bg-[#0B1220] hover:bg-[#7C2D12] text-white"
                      }`}
                    >
                      Choose {track.duration}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================================
          TRACK VERDICT CARDS (CLEAN CORPORATE STYLE, NO GRADIENTS, NO ICONS)
      ========================================== */}
      <div className="mt-14">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Track Selection Guide
          </span>
          <h4 className="text-2xl sm:text-3xl font-black text-[#0B1220]">
            Which Track is Right for Your Career Goals?
          </h4>
          <p className="text-sm text-slate-600 mt-1.5">
            Aapke current experience aur career goals ke hisaab se recommendation:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trackColumns.map((track) => {
            const cardBorders = {
              "3-months": "border-slate-300 hover:border-amber-500",
              "4-months": "border-slate-300 hover:border-emerald-500",
              "6-months": "border-[#D4A017] ring-1 ring-[#D4A017]/50",
              "12-months": "border-slate-300 hover:border-purple-500",
            };

            return (
              <div
                key={`verdict-${track.id}`}
                className={`bg-white rounded-2xl border-2 ${
                  cardBorders[track.durId] || "border-slate-300"
                } shadow-sm transition-all duration-200 flex flex-col justify-between overflow-hidden`}
              >
                <div>
                  {/* Card Header (Solid Background, Clean Typography) */}
                  <div className="p-4 bg-[#0B1220] text-white">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold uppercase tracking-wider text-slate-300 text-[10px]">
                        {track.level}
                      </span>
                      {track.isPopular && (
                        <span className="bg-[#D4A017] text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase">
                          Recommended
                        </span>
                      )}
                    </div>
                    <h5 className="text-lg font-black mt-1 text-white">
                      {track.duration} Program
                    </h5>
                    <p className="text-xs text-slate-300 mt-0.5 font-normal">
                      {track.tagline}
                    </p>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Best For
                      </span>
                      <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
                        {track.perfectFor}
                      </p>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {track.verdictSummary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-2">
                        Key Inclusions:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {track.whyChoose.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#7C2D12] font-bold">•</span>
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Button */}
                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => handleSelect(track)}
                    className={`w-full py-2.5 px-3 rounded-lg font-bold text-xs transition-colors ${
                      track.isPopular
                        ? "bg-[#7C2D12] hover:bg-[#60230e] text-white"
                        : "bg-slate-100 hover:bg-[#0B1220] text-slate-800 hover:text-white"
                    }`}
                  >
                    Select {track.duration}
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

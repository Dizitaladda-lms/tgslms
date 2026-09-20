import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import CourseCard from "../course/CourseCard";

// Flagship Featured Popular Courses matching the exact requested UI and descriptions
const POPULAR_FEATURED_COURSES = [
  {
    id: "ai-prompt-engineering",
    course_id: "ai-expert",
    field: "Artificial Intelligence",
    duration: "6 Months",
    title: "Advanced Certification in Gen AI & Prompt Engineering",
    rating: "4.8",
    learners: "2,340",
    seatsLeft: 12,
    subtitle: (
      <>
        Go from <b>prompt basics to production-grade AI systems</b> — a
        6-month, project-driven program built with working AI engineers.
      </>
    ),
    highlights: [
      "Master LLMs, Prompt Engineering frameworks (CoT, ReAct)",
      "Build real apps with LangChain & Multi-Agent systems",
      "Capstone project + placement support included",
    ],
    meta: ["6 Months", "Advanced", "Live + Self-paced"],
    instructorInitials: "RS",
    instructorName: "Rhea Sharma",
    instructorBlurb: "ex-Google AI, 8+ yrs in ML",
    oldPrice: "₹60,000",
    price: "₹34,999",
    savePct: "Save 42%",
  },
  {
    id: "full-stack-swe",
    course_id: "full-stack",
    field: "Software Engineering",
    duration: "6 Months",
    title: "Full Stack Software Engineering & Cloud Architecture",
    rating: "4.9",
    learners: "3,120",
    seatsLeft: 8,
    subtitle: (
      <>
        Go from <b>core programming to production cloud architectures</b> — build
        and deploy 5+ scalable enterprise apps with modern frameworks.
      </>
    ),
    highlights: [
      "Master React, Node.js, Next.js & scalable cloud databases",
      "Build 5+ production-grade portfolio apps from scratch",
      "Capstone project + live technical interview prep",
    ],
    meta: ["6 Months", "Professional", "Live + Projects"],
    instructorInitials: "SV",
    instructorName: "Siddharth Verma",
    instructorBlurb: "ex-Amazon SDE II, 10+ yrs exp",
    oldPrice: "₹55,000",
    price: "₹24,999",
    savePct: "Save 55%",
  },
  {
    id: "data-science-ai",
    course_id: "data-science",
    field: "Data Science & AI",
    duration: "6 Months",
    title: "Advanced Certification in Data Science & Machine Learning",
    rating: "4.8",
    learners: "2,890",
    seatsLeft: 9,
    subtitle: (
      <>
        Master <b>predictive modeling, Python & modern AI workflows</b> —
        hands-on case studies with real enterprise datasets & Kaggle sprints.
      </>
    ),
    highlights: [
      "Master Python, Pandas, Predictive ML & Deep Learning",
      "Hands-on case studies with real enterprise datasets",
      "Portfolio capstone + recognized industry certification",
    ],
    meta: ["6 Months", "Advanced", "Live + Mentorship"],
    instructorInitials: "SS",
    instructorName: "Shagun Shrivastav",
    instructorBlurb: "Chief Data Scientist, 12+ yrs exp",
    oldPrice: "₹50,000",
    price: "₹24,999",
    savePct: "Save 50%",
  },
  {
    id: "digital-marketing-pro",
    course_id: "digital-marketing",
    field: "Digital Marketing",
    duration: "4 Months",
    title: "Digital Marketing & AI Growth Architecture Masterclass",
    rating: "4.9",
    learners: "4,450",
    seatsLeft: 6,
    subtitle: (
      <>
        Master <b>performance marketing, SEO & Meta ads</b> with live client
        ad budgets, AI automation and paid agency internship.
      </>
    ),
    highlights: [
      "Master Google Ads, Meta Ads & AI Performance Marketing",
      "Run live brand campaigns with real client budgets",
      "Agency internship + 10+ global certifications included",
    ],
    meta: ["4 Months", "All Levels", "Live + Agency Labs"],
    instructorInitials: "GK",
    instructorName: "Dr. Gulshan Kumar",
    instructorBlurb: "Founder Dizital Adda, 14+ yrs exp",
    oldPrice: "₹45,000",
    price: "₹14,999",
    savePct: "Save 67%",
  },
  {
    id: "data-analytics-bi",
    course_id: "data-analytics",
    field: "Business Analytics",
    duration: "3 Months",
    title: "Certification in Data Analytics, SQL & Power BI",
    rating: "4.8",
    learners: "1,980",
    seatsLeft: 11,
    subtitle: (
      <>
        Transform <b>raw business data into executive insights</b> — master
        Advanced Excel, SQL queries, Tableau & Power BI dashboards.
      </>
    ),
    highlights: [
      "Master Advanced Excel, SQL queries & ETL data modeling",
      "Build interactive executive dashboards in Power BI & Tableau",
      "Real-world business case studies + placement assistance",
    ],
    meta: ["3 Months", "Beginner to Pro", "Live + Case Studies"],
    instructorInitials: "DS",
    instructorName: "Deepanshu Soni",
    instructorBlurb: "Senior BI Architect, 9+ yrs exp",
    oldPrice: "₹25,000",
    price: "₹9,999",
    savePct: "Save 60%",
  },
  {
    id: "cyber-security-defense",
    course_id: "cyber-security",
    field: "Cyber Security",
    duration: "6 Months",
    title: "Certified Ethical Hacker & SOC Defense Practitioner",
    rating: "4.9",
    learners: "1,740",
    seatsLeft: 7,
    subtitle: (
      <>
        Learn <b>penetration testing, network defense & bug bounty</b> —
        hands-on virtual CTF labs with certified security researchers.
      </>
    ),
    highlights: [
      "Master Network Security, Kali Linux, Burp Suite & Metasploit",
      "Hands-on Web App Penetration Testing (OWASP Top 10) & CTFs",
      "Bug bounty methodologies + corporate security internship",
    ],
    meta: ["6 Months", "Advanced", "Live + Virtual Range"],
    instructorInitials: "AS",
    instructorName: "Aman Singhal",
    instructorBlurb: "Certified Ethical Hacker & Researcher",
    oldPrice: "₹60,000",
    price: "₹29,999",
    savePct: "Save 50%",
  },
];

function PopularCourses() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await api.get("/api/courses");
      const courseList = response.data?.courses || response.data || [];
      if (Array.isArray(courseList) && courseList.length > 0) {
        setCourses(courseList);
      } else {
        setCourses(POPULAR_FEATURED_COURSES);
      }
    } catch (error) {
      console.error("PopularCourses fetch error:", error);
      setCourses(POPULAR_FEATURED_COURSES);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const displayList = courses && courses.length > 0 ? courses.slice(0, 6) : POPULAR_FEATURED_COURSES;

  return (
    <section className="py-24 bg-slate-100/70 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6">
        {/* TOP */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#7C2D12] bg-[#D4A017]/20 border border-[#D4A017]/40 px-3.5 py-1 rounded-full">
              Industry Accredited Tracks
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0B1220] tracking-tight mt-3">
              Popular Certification Programs
            </h2>
            <p className="text-slate-600 mt-2 text-base sm:text-lg max-w-2xl leading-relaxed">
              Explore our most trending, project-driven programs designed with working industry experts.
            </p>
          </div>

          {/* EXPLORE BUTTON */}
          <Link
            to="/courses"
            className="bg-[#0B1220] hover:bg-[#7C2D12] text-white border-2 border-[#D4A017] font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg transition duration-200 shrink-0"
          >
            Explore All Courses →
          </Link>
        </div>

        {/* COURSES GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14 justify-items-center">
          {displayList.map((course, index) => (
            <CourseCard
              key={course.id || course.course_id || index}
              course={course}
              field={course.field}
              duration={course.duration}
              title={course.title}
              rating={course.rating}
              learners={course.learners}
              seatsLeft={course.seatsLeft}
              subtitle={course.subtitle}
              highlights={course.highlights}
              meta={course.meta}
              instructorInitials={course.instructorInitials}
              instructorName={course.instructorName}
              instructorBlurb={course.instructorBlurb}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularCourses;
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/api";
import Features from "../../components/landing/Features";
import logo from "../../assets/logo.png";
import { getCourseDescriptionUrl } from "../../utils/courseNavigation";

import {
  FaClock,
  FaSignal,
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
} from "react-icons/fa";

function LandingPage() {
  

  // ==========================
  // STATES
  // ==========================

  const DEFAULT_LANDING_COURSES = [
    // Artificial Intelligence (2 Courses)
    {
      id: 7,
      course_id: "ai-expert",
      title: "Diploma in Generative AI & Prompt Engineering",
      description: "12-Month / 288-hour comprehensive diploma program covering AI Foundations, Python, ML, NLP, Transformers, LLMs, LangChain, Vector DBs, RAG, and AI Agents.",
      duration: "12 Months",
      level: "Expert",
      category: "Artificial Intelligence",
      price: 48000,
      original_price: 135000,
      total_lectures: 60,
      total_students: 780,
    },
    {
      id: 13,
      course_id: "ai-6m-agents",
      title: "Advanced Certification in Gen AI & Prompt Engineering",
      description: "6-Month intensive advanced certification covering Large Language Models (LLMs), Prompt Engineering frameworks (CoT, ReAct), LangChain, and Multi-Agent systems.",
      duration: "6 Months",
      level: "Advanced",
      category: "Artificial Intelligence",
      price: 34999,
      original_price: 60000,
      total_lectures: 48,
      total_students: 650,
    },
    // Cyber Security (2 Courses)
    {
      id: 6,
      course_id: "cyber-advanced",
      title: "Expert Training in Cyber Security & Ethical Hacking | DizitalAdda",
      description: "Master 12-month Cyber Security & Ethical Hacking: Python automation, networking, VAPT, forensics, reverse engineering, and Splunk SOC operations.",
      duration: "12 Months",
      level: "Expert",
      category: "Cyber Security",
      price: 95000,
      original_price: 135000,
      total_lectures: 48,
      total_students: 480,
    },
    {
      id: 10,
      course_id: "cyber-intermediate",
      title: "Advanced Certification in Cyber Security and Ethical Hacking",
      description: "6-month intensive training in enterprise VAPT, web application pentesting, OWASP Top 10, digital forensics, and CEH certification prep.",
      duration: "6 Months",
      level: "Advanced",
      category: "Cyber Security",
      price: 45000,
      original_price: 60000,
      total_lectures: 24,
      total_students: 310,
    },
    // Data Science & Analytics (2 Courses)
    {
      id: 8,
      course_id: "data-science",
      title: "Diploma in Data Science & AI | Master Track (NIDADS Flagship)",
      description: "Flagship 12-month National Diploma from NIDADS & Dizital Adda. Master Python, Mathematical Statistics, Scikit-Learn ML, PyTorch Deep Learning, LLMOps, and MLOps.",
      duration: "12 Months",
      level: "Master Track",
      category: "Data Science",
      price: 39999,
      original_price: 79999,
      total_lectures: 43,
      total_students: 460,
    },
    {
      id: 5,
      course_id: "data-analytics",
      title: "Diploma in Data Analytics & AI | Job-Ready Program (NIDADS)",
      description: "Complete 12-month National Diploma from NIDADS & Dizital Adda. Master Advanced Excel, SQL, Power BI, Tableau, Python EDA, and real portfolio capstones.",
      duration: "12 Months",
      level: "Job-Ready",
      category: "Data Analytics",
      price: 34999,
      original_price: 69999,
      total_lectures: 87,
      total_students: 520,
    },
    // Digital Marketing (2 Courses)
    {
      id: 2,
      course_id: "dm-expert",
      title: "Expert in Digital Marketing",
      description: "12-month master program with 70 comprehensive modules, 60+ AI tools, 10 live brand projects, paid agency internship, and 100% placement guarantee.",
      duration: "12 Months",
      level: "Expert",
      category: "Digital Marketing",
      price: 34999,
      original_price: 69999,
      total_lectures: 70,
      total_students: 890,
    },
    {
      id: 1,
      course_id: "dm-advanced",
      title: "Advanced Digital Marketing Course",
      description: "6-month Advanced Digital Marketing Course — 10 live brand campaigns, 54+ AI tools, Google & Meta certifications, and agency internship.",
      duration: "6 Months",
      level: "Advanced",
      category: "Digital Marketing",
      price: 18999,
      original_price: 35999,
      total_lectures: 60,
      total_students: 1420,
    },
  ];

  const [courses, setCourses] = useState(DEFAULT_LANDING_COURSES);


 const ministers = [

  {
    name: "Dharmendra Pradhan",
    state: "India",
    message:
      "Education is the foundation of a developed India and AI powered learning will shape the future generation.",
  },

  {
    name: "Atishi Marlena",
    state: "Delhi",
    message:
      "Modern digital classrooms and innovation based learning are transforming India’s education ecosystem.",
  },

  {
    name: "Sunil Kumar",
    state: "Bihar",
    message:
      "Skill development and quality education are empowering youth towards a stronger nation.",
  },

  {
    name: "Madhu Bangarappa",
    state: "Karnataka",
    message:
      "Technology integrated education will create future-ready students for global leadership.",
  },

  {
    name: "Ranoj Pegu",
    state: "Assam",
    message:
      "AI, innovation and smart education systems are essential for Vikshit Bharat 2047.",
  },

  {
    name: "Harjot Singh Bains",
    state: "Punjab",
    message:
      "Digital transformation in education will create new opportunities for every student in India.",
  },

  {
    name: "Deepak Kesarkar",
    state: "Maharashtra",
    message:
      "Future ready education and AI learning ecosystems are shaping India’s innovation economy.",
  },

  {
    name: "Brij Kishore Sharma",
    state: "Rajasthan",
    message:
      "Modern classrooms and technology driven education are essential for youth empowerment.",
  },

  {
    name: "Kanwar Pal",
    state: "Haryana",
    message:
      "Education reforms and skill development are accelerating India’s journey towards Vikshit Bharat.",
  },

  {
    name: "Dhan Singh Rawat",
    state: "Uttarakhand",
    message:
      "AI based learning systems will create smarter and globally competitive students.",
  },

  {
    name: "Sabita Indra Reddy",
    state: "Telangana",
    message:
      "Innovation and digital education will transform India into a knowledge superpower.",
  },

  {
    name: "K. Ponmudy",
    state: "Tamil Nadu",
    message:
      "Higher education and AI innovation are the pillars of India’s future economy.",
  },

  {
    name: "Jagdish Devda",
    state: "Madhya Pradesh",
    message:
      "Skill based education and technology training are empowering the next generation.",
  },

  {
    name: "Govind Singh Dotasra",
    state: "Rajasthan",
    message:
      "Educational excellence and digital literacy are building a stronger India.",
  },

  {
    name: "Brajesh Pathak",
    state: "Uttar Pradesh",
    message:
      "Modern education infrastructure and AI integration will empower millions of students.",
  },

  {
    name: "Partha Chatterjee",
    state: "West Bengal",
    message:
      "Innovation driven education ecosystems are shaping the leaders of tomorrow.",
  },

  {
    name: "P. Rajeeve",
    state: "Kerala",
    message:
      "Smart education and digital transformation are creating a future ready India.",
  },

  {
    name: "Ramesh Pokhriyal",
    state: "India",
    message:
      "Technology enabled learning will revolutionize education across the nation.",
  },

  {
    name: "Ashish Sood",
    state: "Goa",
    message:
      "Education, innovation and AI development are the future pillars of national growth.",
  },

  {
    name: "Anbil Mahesh Poyyamozhi",
    state: "Tamil Nadu",
    message:
      "AI, robotics and future technologies are redefining India’s educational vision.",
  },

];
const [currentSlide, setCurrentSlide] =
  useState(0);

const nextSlide = () => {

  setCurrentSlide(

    (prev) =>

      (prev + 1) %

      ministers.length

  );

};

const prevSlide = () => {

  setCurrentSlide(

    (prev) =>

      prev === 0

        ? ministers.length - 1

        : prev - 1

  );

};
  // ==========================
  // FETCH COURSES
  // ==========================

  const fetchCourses = async () => {
    try {
      const response = await api.get("/api/courses");
      const courseData = response.data?.courses || response.data || [];
      if (Array.isArray(courseData) && courseData.length > 0) {
        setCourses(courseData);
      }
    } catch (error) {
      console.warn("LMS courses API offline or reconnecting, keeping fallback data:", error.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ==========================
  // POPULAR COURSES SLIDER (2 COURSES PER DOMAIN)
  // ==========================
  const sliderRef = useRef(null);
  const [isSliderPaused, setIsSliderPaused] = useState(false);

  const scrollSlider = (direction = "next") => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const scrollAmount = 390; // card width + gap
    if (direction === "next") {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 30) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    } else {
      if (container.scrollLeft <= 30) {
        container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (isSliderPaused) return;
    const interval = setInterval(() => {
      scrollSlider("next");
    }, 3500);
    return () => clearInterval(interval);
  }, [isSliderPaused]);

  // Strictly select 2 flagship courses per domain
  const popularCourses = (() => {
    if (!courses || courses.length === 0) return DEFAULT_LANDING_COURSES;

    // 1. Artificial Intelligence (2 courses)
    const aiCourses = courses.filter((c) =>
      c.category === "Artificial Intelligence" ||
      c.title?.toLowerCase().includes("generative ai") ||
      c.course_id?.startsWith("ai-")
    ).slice(0, 2);

    // 2. Cyber Security (2 courses)
    const cyberCourses = courses.filter((c) =>
      c.category === "Cyber Security" ||
      c.title?.toLowerCase().includes("cyber")
    ).slice(0, 2);

    // 3. Data Science & Analytics (2 courses)
    const dataCourses = courses.filter((c) =>
      c.category === "Data Science" ||
      c.category === "Data Analytics" ||
      c.title?.toLowerCase().includes("data")
    ).slice(0, 2);

    // 4. Digital Marketing (2 courses)
    const dmCourses = courses.filter((c) =>
      c.category === "Digital Marketing" ||
      c.title?.toLowerCase().includes("marketing")
    ).slice(0, 2);

    const combined = [...aiCourses, ...cyberCourses, ...dataCourses, ...dmCourses];
    return combined.length >= 4 ? combined : DEFAULT_LANDING_COURSES;
  })();

  const getDomainBadge = (category, title) => {
    const text = `${category || ""} ${title || ""}`.toLowerCase();
    if (text.includes("ai") || text.includes("generative")) {
      return {
        name: "Artificial Intelligence",
        bg: "bg-purple-100 text-purple-900 border-purple-300",
        border: "border-purple-500",
      };
    }
    if (text.includes("cyber") || text.includes("ethical")) {
      return {
        name: "Cyber Security",
        bg: "bg-rose-100 text-rose-900 border-rose-300",
        border: "border-rose-500",
      };
    }
    if (text.includes("data")) {
      return {
        name: "Data Science & Analytics",
        bg: "bg-blue-100 text-blue-900 border-blue-300",
        border: "border-blue-500",
      };
    }
    return {
      name: "Digital Marketing",
      bg: "bg-amber-100 text-amber-900 border-amber-300",
      border: "border-amber-500",
    };
  };

  return (

   <div className="bg-[#f8fafc] min-h-screen">

{/* ==========================
    VIKSHIT BHARAT HEADER
========================== */}

<div
  id="hero-section"
  className="bg-[#0B1220] text-white border-b-4 border-[#D4A017]"
>

  <div className="w-full px-4 sm:px-6 lg:px-8 py-4 lg:py-6">

    <div
      className="
        relative
        w-full
        flex
        flex-col
        lg:block
        items-center
      "
    >

      {/* ================= LOGO ================= */}

      <div className="relative lg:absolute left-0 lg:left-2 top-0 lg:top-1 mb-6 lg:mb-0">

        <div
          className="
          w-[120px]
          h-[120px]
          rounded-full
          border-2
          border-[#D4A017]
          overflow-hidden
          bg-black
          "
        >

          <img
            src={logo}
            alt="TGS Logo"
            className="w-full h-full object-cover"
          />

        </div>

      </div>

      {/* ================= LOGIN PORTAL ================= */}

      <div
        className="
          relative
          lg:absolute
          right-0
          lg:right-2
          top-0
          lg:top-1
          flex
          flex-col
          w-full
          sm:w-[260px]
          lg:w-[200px]
          mt-6
          lg:mt-0
        "
      >

        <Link
          to="/login"
          className="
          text-center
          bg-[#1E293B]
          border
          border-[#D4A017]
          py-3
          font-semibold
          text-white
          hover:bg-[#7C2D12]
          hover:border-amber-400
          transition
          shadow-lg
          "
        >
          Login Portal
        </Link>

      </div>

      {/* ================= CENTER CONTENT ================= */}

      <div
        className="
          flex
          flex-col
          justify-center
          items-center
          text-center
          px-4
          md:px-10
          lg:px-56
          pt-2
          pb-4
        "
      >

        <h1
          className="
          text-3xl
sm:text-4xl
md:text-5xl
lg:text-6xl
          "
        >
          A MISSION FOR
            <br />
          VIKSHIT BHARAT 2047
        </h1>

        <p
          className="
          mt-3
          text-lg
          md:text-xl
          text-[#D4A017]
          font-bold
          "
        >
          ASSOCIATED BY TIMELESS FOUNDATION
        </p>

        <div className="w-28 h-1 bg-[#D4A017] mt-3"></div>

        <p
          className="
          mt-4
text-slate-300
text-sm
sm:text-base
leading-7
max-w-2xl
mx-auto
px-4
          "
        >
          National Education • Competitive Exams • Future Skills • Career Development
        </p>

      </div>

    </div>

  </div>

</div>
  {/* ==========================
      NAVBAR
  ========================== */}

  <div className="bg-[#0B1220] sticky top-0 z-50 border-b border-orange-400/20">
  <div className="max-w-7xl mx-auto grid grid-cols-3">

  {/* HOME */}

  <Link
    to="/"
    onClick={() =>
      document
        .getElementById("hero-section")
        ?.scrollIntoView({
          behavior: "smooth",
        })
    }
    className="
    text-white
    py-3
    flex
    items-center
    justify-center
    border
    border-orange-400/20
    hover:bg-[#7C2D12]
    transition
    text-lg
    font-bold
    "
  >
    HOME
  </Link>

  {/* GOVERNMENT PARTNERS */}

  <Link
    to="/government-partners"
    className="
    text-white
    py-3
    flex
    items-center
    justify-center
    border
    border-orange-400/20
    hover:bg-[#7C2D12]
    transition
    text-lg
    font-bold
    "
  >
    GOVERNMENT PARTNERS
  </Link>

  {/* CONTACT */}

  <button
    onClick={() => {
      document
        .getElementById("contact")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }}
    className="
    text-white
    py-3
    flex
    items-center
    justify-center
    border
    border-orange-400/20
    hover:bg-[#7C2D12]
    transition
    text-lg
    font-bold
    "
  >
    CONTACT
  </button>

</div>

    {/* SECOND ROW */}

    <div className="bg-[#1E293B]">

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5">

        <Link
          to="/academic"
          className="
          text-orange-200
          py-3
          text-center
          border
          border-orange-400/20
          hover:bg-[#7C2D12]
          transition
          text-base
          md:text-lg
          font-bold
          block
          "
        >
         Academics
        </Link>

        <Link
          to="/entrance"
          className="
          text-orange-200
          py-3
          text-center
          border
          border-orange-400/20
          hover:bg-[#7C2D12]
          transition
          text-base
          md:text-lg
          font-bold
          block
          "
        >
          Entrance
        </Link>

        <Link
          to="/competition"
          className="
          text-orange-200
          py-3
          text-center
          border
          border-orange-400/20
          hover:bg-[#7C2D12]
          transition
          text-base
          md:text-lg
          font-bold
          block
          "
        >
          Competition
        </Link>

        <Link
          to="/skilling"
          className="
          text-orange-200
          py-3
          text-center
          border
          border-orange-400/20
          hover:bg-[#7C2D12]
          transition
          text-base
          md:text-lg
          font-bold
          block
          "
        >
          Skilling
        </Link>

        <Link
          to="/placement"
          className="
          text-orange-200
          py-3
          text-center
          border
          border-orange-400/20
          hover:bg-[#7C2D12]
          transition
          text-base
          md:text-lg
          font-bold
          block
          "
        >
          Placement
        </Link>

      </div>

    </div>

  </div>


      {/* ==========================
          TOP NEWS TICKER
      ========================== */}
    <div className="bg-yellow-400 border-y-4 border-[#7C2D12] py-3 overflow-hidden">

  <marquee
    behavior="scroll"
    direction="left"
    scrollamount="8"
    className="text-black text-sm md:text-base font-bold"
  >

     Artificial Intelligence Revolution
    &nbsp;&nbsp;&nbsp;&nbsp;

     Machine Learning Development Program
    &nbsp;&nbsp;&nbsp;&nbsp;

     Deep Learning Research Mission
    &nbsp;&nbsp;&nbsp;&nbsp;

     Data Science & Analytics Training
    &nbsp;&nbsp;&nbsp;&nbsp;

    Full Stack AI Engineering Bootcamp
    &nbsp;&nbsp;&nbsp;&nbsp;

     Generative AI Innovation Lab
    &nbsp;&nbsp;&nbsp;&nbsp;

    AI Powered Digital India Mission
    &nbsp;&nbsp;&nbsp;&nbsp;

     AI For Business Transformation
    &nbsp;&nbsp;&nbsp;&nbsp;

     Human + AI Future Workforce Program
    &nbsp;&nbsp;&nbsp;&nbsp;

     AI Automation & Robotics Training
    &nbsp;&nbsp;&nbsp;&nbsp;

     Future Tech & Innovation Ecosystem
    &nbsp;&nbsp;&nbsp;&nbsp;

     AI Research & Development Initiative
    &nbsp;&nbsp;&nbsp;&nbsp;

     India's Largest AI Learning Platform
    &nbsp;&nbsp;&nbsp;&nbsp;

     Learn Python, AI & Data Science
    &nbsp;&nbsp;&nbsp;&nbsp;

     AI Career & Placement Mission
    &nbsp;&nbsp;&nbsp;&nbsp;

     Cloud Computing & AI Infrastructure
    &nbsp;&nbsp;&nbsp;&nbsp;

     AI Chatbot & Automation Systems
    &nbsp;&nbsp;&nbsp;&nbsp;

     Computer Vision & NLP Programs
    &nbsp;&nbsp;&nbsp;&nbsp;

     AI App Development Training
    &nbsp;&nbsp;&nbsp;&nbsp;

     Building AI Powered Vikshit Bharat 2047 🇮🇳

  </marquee>

</div>
      

{/* ==========================
    WELCOME TEXT
========================== */}

<div className="flex justify-center mt-2">
  <div className="w-20 h-[2px] bg-[#D4A017]" />
</div>

<div className="max-w-7xl mx-auto px-6 pt-6 pb-4">

  <div className="bg-white border border-slate-200 rounded-md shadow-sm p-6 md:p-8">

    <div className="text-center">

      <p
        className="
        text-[#7C2D12]
        font-semibold
        tracking-widest
        uppercase
        "
      >
        National Education Mission
      </p>

      <h1
        className="
        mt-3
        text-3xl
        md:text-5xl
        font-bold
        text-slate-900
        "
      >
        Empowering India Through Education
      </h1>

      <div className="w-32 h-1 bg-[#D4A017] mx-auto mt-4"></div>

      <p
        className="
        mt-5
        text-base
        md:text-lg
        text-slate-700
        leading-8
        max-w-5xl
        mx-auto
        "
      >
        Your existing welcome paragraph yahi rakho.
        Content bilkul same rahega.
        Sirf styling change hogi.
      </p>

    </div>

  </div>

</div>

{/* ==========================
    INDIA EDUCATION SECTIONS
========================== */}

<section className="max-w-[1800px] mx-auto px-4 pt-2 pb-8">

  <div className="text-center mb-6">

    <h2 className="text-3xl md:text-4xl font-bold text-[#0B1220]">
      National Education & Skill Development Programs
    </h2>

    <div className="w-24 h-1 bg-[#D4A017] mx-auto mt-3"></div>

    <p className="mt-3 text-slate-600">
      Academic Excellence • Competitive Examinations • Future Skills • Career Development
    </p>

  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

   {/* ACADEMIC */}

<Link
  to="/academic"
  className="
  bg-white
  border
  border-slate-300
  rounded-md
  overflow-hidden
  shadow-sm
  hover:border-[#7C2D12]
  transition
  block
  "
>

  {/* HEADER */}

  <div className="bg-[#0B1220] text-white text-center py-4 border-b-4 border-[#D4A017]">

    <p className="text-xs tracking-widest text-orange-300 uppercase">
      Career In
    </p>

    <h3 className="text-xl font-bold mt-1">
      Academic
    </h3>

  </div>

  {/* PROGRAM LIST */}

  <div>

    {[
      "Class 5 - Foundation Program",
      "Class 6 - Digital Learning",
      "Class 7 - Smart Learning Program",
      "Class 8 - Academic Excellence",
      "Class 9 - Career Foundation",
      "Class 10 - Board Examination Preparation",
      "Class 11 - Science, Commerce & Arts",
      "Class 12 - Board & Competitive Preparation",
      "Online BBA",
      "Online BCA",
      "Online B.Com",
      "Online BA / B.Sc",
      "Online MBA",
      "Online MCA",
      "Online M.Tech & PG Programs",
    ].map((item, index) => (

      <div
        key={index}
        className="
        px-3
        py-2
        border-b
        border-slate-200
        hover:bg-slate-50
        hover:text-[#7C2D12]
        text-[#1E3A8A]
        text-sm
        font-medium
        transition
        cursor-pointer
        "
      >

        {item}

      </div>

    ))}

  </div>

</Link>
   {/* COMPETITION */}

<Link
  to="/competition"
  className="
  bg-white
  border
  border-slate-300
  rounded-md
  overflow-hidden
  shadow-sm
  hover:border-[#7C2D12]
  transition
  block
  "
>

  {/* HEADER */}

  <div className="bg-[#0B1220] text-white text-center py-4 border-b-4 border-[#D4A017]">

    <p className="text-xs tracking-widest text-orange-300 uppercase">
      Career In
    </p>

    <h3 className="text-xl font-bold mt-1">
      Competition
    </h3>

  </div>

  {/* COURSE LIST */}

  <div>

    {[
      "UPSC Civil Services (IAS / IPS / IFS)",
      "State PCS Examinations",
      "SSC (CGL, CHSL, CPO, MTS)",
      "Banking (IBPS, SBI, RBI)",
      "Railway Recruitment (RRB)",
      "Defence (NDA, CDS, AFCAT)",
      "Police Recruitment Exams",
      "Teaching (CTET, UGC NET, DSSSB)",
      "Judiciary Examination",
      "CAPF Assistant Commandant",
      "EPFO Enforcement Officer",
      "Insurance (LIC, NIACL, UIIC)",
      "Intelligence Bureau (IB)",
      "Current Affairs & GS Preparation",
      "Prelims, Mains & Interview Guidance",
    ].map((item, index) => (

      <div
        key={index}
        className="
        px-3
        py-2
        border-b
        border-slate-200
        hover:bg-slate-50
        hover:text-[#7C2D12]
        text-[#1E3A8A]
        text-sm
        font-medium
        transition
        cursor-pointer
        "
      >

        {item}

      </div>

    ))}

  </div>

</Link>
   {/* ENTRANCE */}

<Link
  to="/entrance"
  className="
  bg-white
  border
  border-slate-300
  rounded-md
  overflow-hidden
  shadow-sm
  hover:border-[#7C2D12]
  transition
  block
  "
>

  {/* HEADER */}

  <div className="bg-[#0B1220] text-white text-center py-4 border-b-4 border-[#D4A017]">

    <p className="text-xs tracking-widest text-orange-300 uppercase">
      Career In
    </p>

    <h3 className="text-xl font-bold mt-1">
      Entrance
    </h3>

  </div>

  {/* COURSE LIST */}

  <div>

    {[
      "JEE Main & JEE Advanced",
      "NEET UG",
      "CUET (UG & PG)",
      "CLAT & Law Entrance",
      "NDA Entrance Examination",
      "NIFT Entrance Exam",
      "NID Design Entrance",
      "IPMAT (IIM Integrated Program)",
      "BBA Entrance Examination",
      "CAT (MBA Entrance)",
      "GATE Examination",
      "GRE Preparation",
      "GMAT Preparation",
      "SAT & International Admissions",
      "Study Abroad Entrance Programs",
    ].map((item, index) => (

      <div
        key={index}
        className="
        px-3
        py-2
        border-b
        border-slate-200
        hover:bg-slate-50
        hover:text-[#7C2D12]
        text-[#1E3A8A]
        text-sm
        font-medium
        transition
        cursor-pointer
        "
      >

        {item}

      </div>

    ))}

  </div>

</Link>
    {/* SKILLING */}
    <div
      className="
      bg-white
      border
      border-slate-300
      rounded-md
      overflow-hidden
      shadow-sm
      hover:border-[#7C2D12]
      transition
      block
      "
    >
      <Link
        to="/skilling"
        className="bg-[#0B1220] text-white text-center py-4 border-b-4 border-[#D4A017] block hover:bg-[#121c33] transition"
      >
        <p className="text-xs tracking-widest text-orange-300 uppercase">
          Career in
        </p>
        <h3 className="text-xl font-bold mt-1">
          Skilling
        </h3>
      </Link>

      <div className="divide-y divide-slate-200">
        {[
          { title: "Diploma in Gen AI & Prompt Engineering", duration: "12 Months", domain: "ai-prompt-engineering", durationId: "12-months" },
          { title: "Advanced Gen AI & Prompt Engineering", duration: "6 Months", domain: "ai-prompt-engineering", durationId: "6-months" },
          { title: "Gen AI & Prompt Engineering for Professionals", duration: "3 Months", domain: "ai-prompt-engineering", durationId: "3-months" },
          { title: "Expert in Cyber Security & Ethical Hacking", duration: "12 Months", domain: "cyber-security", durationId: "12-months" },
          { title: "Advanced Cyber Security & Ethical Hacking", duration: "6 Months", domain: "cyber-security", durationId: "6-months" },
          { title: "Foundation in Cyber Security & Hacking", duration: "4 Months", domain: "cyber-security", durationId: "4-months" },
          { title: "Digital Forensic & Cyber Investigation", duration: "4 Months", domain: "cyber-security", durationId: "4-months" },
          { title: "Expert Training in Bug Bounty & Pentesting", duration: "4 Months", domain: "cyber-security", durationId: "4-months" },
          { title: "Diploma in Data Science & AI (NIDADS)", duration: "12 Months", domain: "data-science", durationId: "12-months", track: "data-science" },
          { title: "Advanced Data Science & AI Program", duration: "6 Months", domain: "data-science", durationId: "6-months", track: "data-science" },
          { title: "Diploma in Data Analytics & AI (NIDADS)", duration: "12 Months", domain: "data-science", durationId: "12-months", track: "data-analytics" },
          { title: "Advanced Data Analytics & AI Program", duration: "6 Months", domain: "data-science", durationId: "6-months", track: "data-analytics" },
          { title: "Certification in Data Analytics & AI", duration: "3 Months", domain: "data-science", durationId: "3-months", track: "data-analytics" },
          { title: "Expert in Digital Marketing Master Course", duration: "12 Months", domain: "digital-marketing", durationId: "12-months" },
          { title: "Advanced Digital Marketing Course", duration: "6 Months", domain: "digital-marketing", durationId: "6-months" },
          { title: "Digital Marketing for Working Professionals", duration: "4 Months", domain: "digital-marketing", durationId: "4-months" },
          { title: "Digital Marketing for Beginners Course", duration: "3 Months", domain: "digital-marketing", durationId: "3-months" },
        ].map((item, index) => (
          <Link
            key={index}
            to={`/skilling?domain=${item.domain}&duration=${item.durationId}${item.track ? `&track=${item.track}` : ''}`}
            className="
            px-3
            py-2
            hover:bg-slate-50
            hover:text-[#7C2D12]
            text-[#1E3A8A]
            text-xs sm:text-sm
            font-medium
            transition
            cursor-pointer
            flex
            items-center
            justify-between
            gap-2
            group
            "
            title={`${item.title} (${item.duration})`}
          >
            <span className="truncate group-hover:underline">{item.title}</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-[#7C2D12] border border-[#D4A017]/40 shrink-0">
              {item.duration}
            </span>
          </Link>
        ))}
      </div>
    </div>

  </div>

</section>
{/* ==========================
    POPULAR COURSES (MOVING SINGLE ROW - 2 COURSES PER DOMAIN)
========================== */}

<section className="max-w-[1800px] mx-auto px-6 py-12">

  <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1220] text-[#D4A017] text-xs font-semibold uppercase tracking-wider mb-2 border border-[#D4A017]/30">
        <span className="w-2 h-2 rounded-full bg-[#D4A017] animate-ping"></span>
        Top 8 Flagships • 2 Courses Per Domain
      </div>
      <h1 className="text-3xl md:text-5xl font-bold text-[#0B1220]">
        Popular Courses
      </h1>
      <div className="w-28 h-1 bg-[#D4A017] mt-3"></div>
      <p className="text-gray-600 mt-3 text-base md:text-lg">
        Explore premier career programs across AI, Cyber Security, Data Science & Digital Marketing.
      </p>
    </div>

    {/* Moving Controls & Pause Status */}
    <div className="flex items-center gap-3 self-end md:self-auto">
      <span className="text-xs text-slate-500 font-medium hidden sm:inline-block px-2.5 py-1 rounded bg-slate-100 border border-slate-200">
        {isSliderPaused ? "⏸ Paused (Hovered)" : "▶ Moving"}
      </span>
      <button
        onClick={() => scrollSlider("prev")}
        className="w-11 h-11 rounded-lg bg-white border border-slate-300 text-[#0B1220] hover:bg-[#0B1220] hover:text-[#D4A017] hover:border-[#0B1220] shadow-sm flex items-center justify-center transition duration-200 cursor-pointer"
        aria-label="Previous Course"
        title="Previous Course"
      >
        <FaChevronLeft className="text-base" />
      </button>
      <button
        onClick={() => scrollSlider("next")}
        className="w-11 h-11 rounded-lg bg-[#0B1220] text-[#D4A017] hover:bg-[#7C2D12] hover:text-white shadow-sm flex items-center justify-center transition duration-200 cursor-pointer"
        aria-label="Next Course"
        title="Next Course"
      >
        <FaChevronRight className="text-base" />
      </button>
    </div>
  </div>

  {/* SINGLE HORIZONTAL MOVING ROW */}
  <div className="relative">
    <div
      ref={sliderRef}
      onMouseEnter={() => setIsSliderPaused(true)}
      onMouseLeave={() => setIsSliderPaused(false)}
      onTouchStart={() => setIsSliderPaused(true)}
      onTouchEnd={() => setIsSliderPaused(false)}
      className="flex flex-nowrap gap-6 overflow-x-auto scroll-smooth py-3 px-1 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      {popularCourses?.length > 0 ? (
        popularCourses.map((course) => {
          const badge = getDomainBadge(course.category, course.title);
          return (
            <div
              key={course.id}
              className="
                w-[320px] sm:w-[360px] md:w-[390px]
                shrink-0
                snap-start
                bg-white
                border
                border-slate-300
                rounded-xl
                overflow-hidden
                shadow-sm
                hover:shadow-xl
                hover:border-[#D4A017]
                transition-all
                duration-300
                flex
                flex-col
                justify-between
                group
              "
            >
              {/* COURSE HEADER */}
              <div
                className="
                  bg-[#0B1220]
                  border-b-4
                  border-[#D4A017]
                  p-5
                  relative
                  flex
                  flex-col
                  justify-between
                  min-h-[140px]
                "
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badge.bg}`}
                  >
                    {badge.name}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white/10 text-amber-300 border border-white/20 shrink-0">
                    {course.duration}
                  </span>
                </div>

                <h2 className="text-white text-lg font-bold line-clamp-2 group-hover:text-amber-300 transition-colors">
                  {course.title}
                </h2>
              </div>

              {/* COURSE CONTENT */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#0B1220] line-clamp-1">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 mt-3 text-sm leading-relaxed line-clamp-3 min-h-[60px]">
                    {course.description}
                  </p>

                  {/* INFO TAGS */}
                  <div className="flex flex-wrap gap-2.5 mt-5">
                    <div
                      className="
                        border
                        border-slate-200
                        px-3
                        py-1.5
                        rounded-md
                        bg-slate-50
                        text-xs
                        font-medium
                        text-slate-700
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <FaClock className="text-[#D4A017]" />
                      <span>{course.duration}</span>
                    </div>

                    <div
                      className="
                        border
                        border-slate-200
                        px-3
                        py-1.5
                        rounded-md
                        bg-slate-50
                        text-xs
                        font-medium
                        text-slate-700
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <FaSignal className="text-slate-500" />
                      <span>{course.level || "Diploma / Certificate"}</span>
                    </div>
                  </div>
                </div>

                {/* ACTION BUTTON */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    to={getCourseDescriptionUrl(course)}
                    className="
                      w-full
                      bg-[#0B1220]
                      text-white
                      px-5
                      py-2.5
                      rounded-lg
                      font-semibold
                      text-sm
                      hover:bg-[#7C2D12]
                      hover:text-amber-200
                      transition-all
                      duration-200
                      flex
                      items-center
                      justify-center
                      gap-2
                      shadow-sm
                    "
                  >
                    <span>Explore Program</span>
                    <FaArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full text-center py-16 bg-white border border-slate-200 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-400">
            No Courses Found
          </h2>
        </div>
      )}
    </div>
  </div>

</section>

<Features />
 {/* ==========================
    EDUCATION LEADERSHIP OF INDIA
========================== */}

<section className="max-w-[1800px] mx-auto px-6 py-12">

  <div className="text-center mb-10">

    <h1 className="text-4xl md:text-5xl font-bold text-[#0B1220]">

      Education Leadership Of India

    </h1>

    <div className="w-32 h-1 bg-[#D4A017] mx-auto mt-4"></div>

    <p className="text-gray-600 mt-5 text-lg">

      Visionary leaders guiding India's education and skill development mission

    </p>

  </div>

  <div
    className="
    relative
    bg-white
    border
    border-slate-300
    rounded-md
    shadow-sm
    overflow-hidden
    "
  >

    {/* HEADER */}

    <div className="bg-[#0B1220] text-white border-b-4 border-[#D4A017] p-6">

      <h2 className="text-center text-2xl font-bold">

        National Education Leadership Council

      </h2>

    </div>

    {/* LEFT BUTTON */}

    <button
      onClick={prevSlide}
      className="
      absolute
      left-4
      top-1/2
      -translate-y-1/2
      bg-[#0B1220]
      text-white
      w-12
      h-12
      rounded-full
      hover:bg-[#7C2D12]
      transition
      z-10
      "
    >
      ←
    </button>

    {/* CONTENT */}

    <div className="p-10 md:p-14">

      <div className="flex flex-col items-center">

        {/* PROFILE */}

        <div
          className="
          w-24
          h-24
          rounded-full
          bg-[#0B1220]
          text-white
          flex
          items-center
          justify-center
          text-3xl
          font-bold
          border-4
          border-[#D4A017]
          "
        >
          {ministers[currentSlide].name.charAt(0)}
        </div>

        {/* NAME */}

        <h2 className="mt-6 text-3xl font-bold text-[#0B1220] text-center">

          {ministers[currentSlide].name}

        </h2>

        {/* DESIGNATION */}

        <p className="mt-2 text-[#7C2D12] font-semibold text-lg">

          {ministers[currentSlide].state}

        </p>

      </div>

      {/* MESSAGE */}

      <div
        className="
        mt-10
        bg-slate-50
        border
        border-slate-200
        rounded-md
        p-8
        "
      >

        <p
          className="
          text-gray-700
          leading-8
          text-center
          text-lg
          "
        >
          {ministers[currentSlide].message}
        </p>

      </div>

      {/* COUNTER */}

      <div className="text-center mt-6 text-slate-500 font-semibold">

        {currentSlide + 1} / {ministers.length}

      </div>

    </div>

    {/* RIGHT BUTTON */}

    <button
      onClick={nextSlide}
      className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      bg-[#0B1220]
      text-white
      w-12
      h-12
      rounded-full
      hover:bg-[#7C2D12]
      transition
      z-10
      "
    >
      →
    </button>

  </div>

</section>

    
{/* ==========================
    OFFICIAL CONTACT SECTION
========================== */}

<section
  id="contact"
  className="scroll-mt-32 bg-[#0B1220] text-white mt-20 border-t-4 border-[#D4A017]"
>

  <div className="max-w-[1800px] mx-auto px-6 py-12">

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

      {/* ORGANIZATION */}

      <div>

        <h1 className="text-3xl font-bold text-white">

          TGS (TEAM GULSHAN SIR)

        </h1>

        <div className="w-20 h-1 bg-[#D4A017] mt-4"></div>

        <p className="mt-6 text-gray-300 leading-8">

          A Mission For Vikshit Bharat 2047 is dedicated towards
          building a stronger India through education, innovation,
          artificial intelligence, digital transformation,
          entrepreneurship and skill empowerment.

        </p>

        {/* SOCIAL LINKS */}

        <div className="flex flex-wrap gap-3 mt-8">

          <a
            href="#"
            className="
            border
            border-slate-600
            px-4
            py-2
            rounded-md
            hover:bg-[#1E293B]
            transition
            "
          >
            Website
          </a>

          <a
            href="#"
            className="
            border
            border-slate-600
            px-4
            py-2
            rounded-md
            hover:bg-[#1E293B]
            transition
            "
          >
            Facebook
          </a>

          <a
            href="#"
            className="
            border
            border-slate-600
            px-4
            py-2
            rounded-md
            hover:bg-[#1E293B]
            transition
            "
          >
            Instagram
          </a>

          <a
            href="#"
            className="
            border
            border-slate-600
            px-4
            py-2
            rounded-md
            hover:bg-[#1E293B]
            transition
            "
          >
            YouTube
          </a>

        </div>

      </div>

      {/* QUICK LINKS */}

      <div>

        <h2 className="text-2xl font-bold text-[#D4A017]">

          Quick Links

        </h2>

        <div className="mt-6 space-y-3">

          <a
            href="/"
            className="
            block
            text-gray-300
            hover:text-[#D4A017]
            transition
            "
          >
            Home
          </a>

          <a
            href="/academic"
            className="
            block
            text-gray-300
            hover:text-[#D4A017]
            transition
            "
          >
            Academic
          </a>

          <a
            href="/entrance"
            className="
            block
            text-gray-300
            hover:text-[#D4A017]
            transition
            "
          >
            Entrance
          </a>

          <a
            href="/competition"
            className="
            block
            text-gray-300
            hover:text-[#D4A017]
            transition
            "
          >
            Competition
          </a>

          <a
            href="/skilling"
            className="
            block
            text-gray-300
            hover:text-[#D4A017]
            transition
            "
          >
            Skilling
          </a>

          <a
            href="/placement"
            className="
            block
            text-gray-300
            hover:text-[#D4A017]
            transition
            "
          >
            Placement
          </a>

        </div>

      </div>

      {/* CONTACT */}

      <div>

        <h2 className="text-2xl font-bold text-[#D4A017]">

          Contact Information

        </h2>

        <div className="mt-6 space-y-4 text-gray-300">

          <p>
            Greater Kailash II,
            New Delhi - 110048
          </p>

          <p>
            +91 9876543210
          </p>

          <p>
            support@vikshitbharat2047.in
          </p>

          <p>
            www.vikshitbharat2047.in
          </p>

        </div>

      </div>

      {/* LOCATION */}

      <div>

        <h2 className="text-2xl font-bold text-[#D4A017]">

          Headquarters

        </h2>

        <div
          className="
          mt-6
          bg-[#1E293B]
          border
          border-slate-700
          rounded-md
          p-6
          "
        >

          <h3 className="text-xl font-bold">

            New Delhi, India

          </h3>

          <p className="mt-3 text-gray-400">

            TgS Headquarter

          </p>

        <a
  href="https://maps.google.com/?q=2nd+Floor+Spacetime+Management+Pvt+Ltd+Design+House+behind+Savitri+Cinema+Complex+Greater+Kailash+II+Chittaranjan+Park+New+Delhi+110048"
  target="_blank"
  rel="noreferrer"
  className="
  inline-block
  mt-6
  bg-[#D4A017]
  text-black
  px-5
  py-2
  rounded-md
  font-semibold
  hover:opacity-90
  transition
  "
>
  View On Google Maps
</a>

        </div>

      </div>

    </div>

    {/* FOOTER BOTTOM */}

    <div className="border-t border-slate-700 mt-12">

      <div className="py-6 text-center text-gray-400 text-sm">

        © 2026 TGS (Team Gulshan Sir) |
        A Mission For Vikshit Bharat 2047 |
        All Rights Reserved

      </div>

    </div>

  </div>

</section>

    </div>

  );

}

export default LandingPage;
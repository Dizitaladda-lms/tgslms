const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const DATA_DIR = path.join(__dirname, "..", "..", "data");
const STORE_FILE = path.join(DATA_DIR, "lms_store.json");

// Pre-hashed default passwords for instant startup
const HASHED_ADMIN_PASS = bcrypt.hashSync("Admin@12345", 10);
const HASHED_TEACHER_PASS = bcrypt.hashSync("Teacher@12345", 10);

const INITIAL_COURSES = [
  {
    id: 1,
    course_id: "dm-advanced",
    title: "Advanced Digital Marketing Course",
    description: "6-month Advanced Digital Marketing Course — 10 live brand campaigns, 54+ AI tools, Google & Meta certifications, and agency internship.",
    price: 18999,
    original_price: 35999,
    duration: "6 Months",
    level: "Advanced",
    category: "Digital Marketing",
    teacher: "Dr. Gulshan Kumar",
    teacher_id: 2,
    thumbnail: "https://dizitaladda.com/images/digital-marketing-institute.webp",
    is_published: true,
    total_lectures: 60,
    total_students: 1420,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    course_id: "dm-expert",
    title: "Expert in Digital Marketing",
    description: "12-month master program with 70 comprehensive modules, 60+ AI tools, 10 live brand projects, paid agency internship, and 100% placement guarantee.",
    price: 34999,
    original_price: 69999,
    duration: "12 Months",
    level: "Expert",
    category: "Digital Marketing",
    teacher: "Dr. Gulshan Kumar",
    teacher_id: 2,
    thumbnail: "https://dizitaladda.com/images/digital-marketing-institute.webp",
    is_published: true,
    total_lectures: 70,
    total_students: 890,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    course_id: "dm-professionals",
    title: "Digital Marketing Course for Professionals",
    description: "A 4-month, 80+ hour hybrid digital marketing course for working professionals, career switchers, and business owners. Covers 40 modules including SEO, Google Ads, Meta Ads, Content Writing, WhatsApp & Email Marketing, Social Media, WordPress, Canva, Video Editing, GA4, Performance Marketing, Remarketing, and 50+ AI tools. Includes live brand projects, paid internship, 10+ certifications, and 100% placement assistance.",
    price: 14999,
    original_price: 45000,
    duration: "4 Months",
    level: "Professional",
    category: "Digital Marketing",
    teacher: "Dr. Gulshan Kumar",
    teacher_id: 2,
    thumbnail: "https://dizitaladda.com/images/digital-marketing-institute.webp",
    is_published: true,
    total_lectures: 40,
    total_students: 1043,
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    course_id: "dm-beginners",
    title: "Digital Marketing for Beginners Course in Delhi",
    description: "DizitalAdda's 3-month Digital Marketing for Beginners course covers SEO, Google Ads, Meta Ads, Social Media Marketing, Content Writing, Email Marketing, Analytics, and 40+ AI tools — with 10 live brand projects, 10+ certifications from Google, Meta, HubSpot and Semrush, and 100% placement assistance. No prior experience required.",
    price: 25000,
    original_price: 30000,
    duration: "3 Months",
    level: "Beginner",
    category: "Digital Marketing",
    teacher: "Dr. Gulshan Kumar",
    teacher_id: 2,
    thumbnail: "https://dizitaladda.com/images/digital-marketing-institute.webp",
    is_published: true,
    total_lectures: 31,
    total_students: 2100,
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    course_id: "data-analytics",
    title: "Diploma in Data Analytics & AI | Job-Ready Program (NIDADS)",
    description: "Complete 12-month National Diploma from NIDADS & Dizital Adda. Master Advanced Excel, SQL, Power BI, Tableau, Python EDA, and real portfolio capstones like Dark Store Demand Twin and Midnight Basket Drop.",
    price: 34999,
    original_price: 69999,
    duration: "12 Months",
    level: "Job-Ready Diploma",
    category: "Data Analytics",
    teacher: "Dr. Gulshan Kumar & Mr. Deepanshu Soni",
    teacher_id: 2,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    is_published: true,
    total_lectures: 87,
    total_students: 520,
    created_at: new Date().toISOString(),
  },
  {
    id: 8,
    course_id: "data-science",
    title: "Diploma in Data Science & AI | Master Track (NIDADS Flagship)",
    description: "Flagship 12-month National Diploma from NIDADS & Dizital Adda. Master Python, Mathematical Statistics, Scikit-Learn ML, PyTorch Deep Learning, Distributed Apache Spark, LLMOps, and Production MLOps deployment.",
    price: 39999,
    original_price: 79999,
    duration: "12 Months",
    level: "Flagship Master Diploma",
    category: "Data Science",
    teacher: "Dr. Gulshan Kumar & Miss Shagun Shrivastav",
    teacher_id: 2,
    thumbnail: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&auto=format&fit=crop",
    is_published: true,
    total_lectures: 43,
    total_students: 460,
    created_at: new Date().toISOString(),
  },
  {
    id: 6,
    course_id: "cyber-advanced",
    title: "Expert Training in Cyber Security & Ethical Hacking | DizitalAdda",
    description: "Master 12-month Expert Cyber Security & Ethical Hacking with Dizital Adda. From Python automation, networking, and VAPT to digital forensics, reverse engineering, and Splunk SOC operations with Dr. Gulshan Kumar.",
    price: 95000,
    original_price: 135000,
    duration: "12 Months",
    level: "Expert / Professional",
    category: "Cyber Security",
    teacher: "Dr. Gulshan Kumar & Senior Security Architects",
    teacher_id: 2,
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
    is_published: true,
    total_lectures: 48,
    total_students: 480,
    created_at: new Date().toISOString(),
  },
  {
    id: 7,
    course_id: "ai-expert",
    title: "AI & Prompt Engineering Masterclass",
    description: "Master generative AI, large language models, autonomous AI agents, LangChain, API automation, and multi-modal creative tech.",
    price: 48000,
    original_price: 65000,
    duration: "6 Months",
    level: "Expert",
    category: "Artificial Intelligence",
    teacher: "Dr. Gulshan Kumar",
    teacher_id: 2,
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop",
    is_published: true,
    total_lectures: 55,
    total_students: 720,
    created_at: new Date().toISOString(),
  },
];

const INITIAL_USERS = [
  {
    id: 1,
    name: "System Admin",
    full_name: "System Admin",
    email: "admin@dizitaladda.com",
    password: HASHED_ADMIN_PASS,
    role: "admin",
    phone: "+919876543210",
    specialization: "LMS Administration",
    status: "Active",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Dr. Gulshan Kumar",
    full_name: "Dr. Gulshan Kumar",
    email: "gulshan@dizitaladda.com",
    password: HASHED_TEACHER_PASS,
    role: "teacher",
    phone: "+918810606010",
    specialization: "Digital Marketing & Search AI",
    status: "Active",
    created_at: new Date().toISOString(),
  },
];

const INITIAL_SECTIONS = [
  {
    "id": 1,
    "course_id": 1,
    "title": "Module 1: Digital Marketing Ecosystem & Strategy",
    "order_num": 1
  },
  {
    "id": 2,
    "course_id": 1,
    "title": "Module 2: Advanced SEO & AI Search Optimization",
    "order_num": 2
  },
  {
    "id": 3,
    "course_id": 1,
    "title": "Module 3: Google Ads & Performance Max Campaigns",
    "order_num": 3
  },
  {
    "id": 4,
    "course_id": 2,
    "title": "Module 1: Comprehensive Master Strategy & AI Suite",
    "order_num": 1
  },
  {
    "id": 5,
    "course_id": 3,
    "title": "1. Foundation — Digital Marketing Fundamentals",
    "order_num": 1
  },
  {
    "id": 6,
    "course_id": 3,
    "title": "2. Google Marketer Productivity Suite",
    "order_num": 2
  },
  {
    "id": 7,
    "course_id": 3,
    "title": "3. Google Web & Performance Products",
    "order_num": 3
  },
  {
    "id": 8,
    "course_id": 3,
    "title": "4. Graphic Design with Canva & Canva AI",
    "order_num": 4
  },
  {
    "id": 9,
    "course_id": 3,
    "title": "5. Video Editing with Canva & Filmora",
    "order_num": 5
  },
  {
    "id": 10,
    "course_id": 3,
    "title": "6. Website Development with WordPress",
    "order_num": 6
  },
  {
    "id": 11,
    "course_id": 3,
    "title": "7. Content Writing & Copywriting",
    "order_num": 7
  },
  {
    "id": 12,
    "course_id": 3,
    "title": "8. Search Engine Optimization (SEO)",
    "order_num": 8
  },
  {
    "id": 13,
    "course_id": 3,
    "title": "9. Social Media Marketing (Organic)",
    "order_num": 9
  },
  {
    "id": 14,
    "course_id": 3,
    "title": "10. Meta Ads — Facebook & Instagram Advertising",
    "order_num": 10
  },
  {
    "id": 15,
    "course_id": 3,
    "title": "11. Google Ads — Search, Display & YouTube Campaigns",
    "order_num": 11
  },
  {
    "id": 16,
    "course_id": 3,
    "title": "12. WhatsApp & Email Marketing Automation",
    "order_num": 12
  },
  {
    "id": 17,
    "course_id": 3,
    "title": "13. Performance Marketing & GA4 Analytics",
    "order_num": 13
  },
  {
    "id": 18,
    "course_id": 3,
    "title": "14. Remarketing & Retargeting Mastery",
    "order_num": 14
  },
  {
    "id": 19,
    "course_id": 3,
    "title": "15. Freelancing, Agency Operations & Client Acquisition",
    "order_num": 15
  },
  {
    "id": 20,
    "course_id": 4,
    "title": "1. Foundation — Introduction to Digital Marketing & Internet Ecosystem",
    "order_num": 1
  },
  {
    "id": 21,
    "course_id": 4,
    "title": "2. Google Marketer Suite & Productivity",
    "order_num": 2
  },
  {
    "id": 22,
    "course_id": 4,
    "title": "3. Search Engine Optimization (SEO) Foundations",
    "order_num": 3
  },
  {
    "id": 23,
    "course_id": 4,
    "title": "4. Google Ads & Search Engine Marketing (SEM)",
    "order_num": 4
  },
  {
    "id": 24,
    "course_id": 4,
    "title": "5. Meta Ads — Facebook & Instagram Advertising",
    "order_num": 5
  },
  {
    "id": 25,
    "course_id": 4,
    "title": "6. Social Media Marketing (Organic SMM)",
    "order_num": 6
  },
  {
    "id": 26,
    "course_id": 4,
    "title": "7. Content Writing, Copywriting & Storytelling",
    "order_num": 7
  },
  {
    "id": 27,
    "course_id": 4,
    "title": "8. Email Marketing Basics",
    "order_num": 8
  },
  {
    "id": 28,
    "course_id": 4,
    "title": "9. WhatsApp Marketing & Automation",
    "order_num": 9
  },
  {
    "id": 29,
    "course_id": 4,
    "title": "10. Graphic Design with Canva & Canva AI",
    "order_num": 10
  },
  {
    "id": 30,
    "course_id": 4,
    "title": "11. Video Editing for Reels, Shorts & YouTube",
    "order_num": 11
  },
  {
    "id": 31,
    "course_id": 4,
    "title": "12. WordPress Website Development Basics",
    "order_num": 12
  },
  {
    "id": 32,
    "course_id": 4,
    "title": "13. Web Analytics & Search Performance Tracking",
    "order_num": 13
  },
  {
    "id": 33,
    "course_id": 4,
    "title": "14. 40+ AI Tools, Freelancing & Career Launch",
    "order_num": 14
  }
];

const INITIAL_LECTURES = [
  {
    "id": 1,
    "section_id": 1,
    "course_id": 1,
    "title": "1.1 Introduction to the Performance Marketing Framework",
    "description": "Overview of customer journeys, acquisition funnels, and marketing technology stack.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": null,
    "duration": "24:30",
    "order_num": 1,
    "is_free_preview": true
  },
  {
    "id": 2,
    "section_id": 1,
    "course_id": 1,
    "title": "1.2 Setting Up Your Digital Workspace & Tracking Pixels",
    "description": "Step-by-step setup of Google Tag Manager, GA4, Meta Pixel, and server-side tracking.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": null,
    "duration": "32:15",
    "order_num": 2,
    "is_free_preview": false
  },
  {
    "id": 3,
    "section_id": 2,
    "course_id": 1,
    "title": "2.1 Semantic Search, Entity SEO & ChatGPT Automation",
    "description": "How modern search engines index entities and using AI agents for keyword clustering.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": null,
    "duration": "45:00",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 4,
    "section_id": 5,
    "course_id": 3,
    "title": "1.1 Introduction to Digital Marketing & Modern Landscape",
    "description": "Digital ecosystem evolution, online consumer mindsets, and inbound vs outbound channels.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-1.pdf",
    "duration": "25:00",
    "order_num": 1,
    "is_free_preview": true
  },
  {
    "id": 5,
    "section_id": 5,
    "course_id": 3,
    "title": "1.2 Consumer Psychology & Buyer Persona Mapping",
    "description": "Understanding audience journey, micro-moments, and defining target customer avatars.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-1.pdf",
    "duration": "28:30",
    "order_num": 2,
    "is_free_preview": false
  },
  {
    "id": 6,
    "section_id": 5,
    "course_id": 3,
    "title": "1.3 Market Research, Competitor Benchmarking & UVP",
    "description": "Competitive gap analysis, value propositions, and positioning frameworks.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-1.pdf",
    "duration": "32:15",
    "order_num": 3,
    "is_free_preview": false
  },
  {
    "id": 7,
    "section_id": 5,
    "course_id": 3,
    "title": "1.4 Digital Marketing Funnels (TOFU, MOFU, BOFU)",
    "description": "Full-funnel customer acquisition, nurturing workflows, and retention strategy.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-1.pdf",
    "duration": "30:00",
    "order_num": 4,
    "is_free_preview": false
  },
  {
    "id": 8,
    "section_id": 6,
    "course_id": 3,
    "title": "2.1 Google Workspace Cloud & Marketer Productivity",
    "description": "Mastering Drive, Docs, Sheets, and Slides for marketing plans and campaign reports.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-2.pdf",
    "duration": "22:45",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 9,
    "section_id": 6,
    "course_id": 3,
    "title": "2.2 Gemini AI & Google Business Tools Integration",
    "description": "Using Gemini AI inside Google Workspace for automated research, copy generation, and data synthesis.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-2.pdf",
    "duration": "26:10",
    "order_num": 2,
    "is_free_preview": false
  },
  {
    "id": 10,
    "section_id": 7,
    "course_id": 3,
    "title": "3.1 Google Search Console Setup & Indexing Diagnostics",
    "description": "Submitting sitemaps, monitoring crawl status, resolving coverage errors, and tracking search queries.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-3.pdf",
    "duration": "35:20",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 11,
    "section_id": 7,
    "course_id": 3,
    "title": "3.2 Google Tag Manager (GTM) & Event Tracking",
    "description": "Creating tags, triggers, custom variables, and tracking conversions without developer dependency.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-3.pdf",
    "duration": "38:45",
    "order_num": 2,
    "is_free_preview": false
  },
  {
    "id": 12,
    "section_id": 7,
    "course_id": 3,
    "title": "3.3 Google Trends & AdSense Publisher Fundamentals",
    "description": "Identifying breakout market trends and understanding publisher revenue monetization models.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-3.pdf",
    "duration": "24:15",
    "order_num": 3,
    "is_free_preview": false
  },
  {
    "id": 13,
    "section_id": 8,
    "course_id": 3,
    "title": "4.1 Canva Workspace, Typography & Brand Identity",
    "description": "Building brand color palettes, visual harmony, typography rules, and custom logo design.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-4.pdf",
    "duration": "27:50",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 14,
    "section_id": 8,
    "course_id": 3,
    "title": "4.2 Social Media Creatives, Ad Banners & Thumbnails",
    "description": "Designing high-converting Instagram carousels, Facebook ad banners, and YouTube thumbnails.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-4.pdf",
    "duration": "31:10",
    "order_num": 2,
    "is_free_preview": false
  },
  {
    "id": 15,
    "section_id": 8,
    "course_id": 3,
    "title": "4.3 Canva AI (Magic Studio) & Bulk Content Automation",
    "description": "Using AI image generation, Magic Eraser, bulk create workflows, and brand kit automation.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-4.pdf",
    "duration": "29:40",
    "order_num": 3,
    "is_free_preview": false
  },
  {
    "id": 16,
    "section_id": 9,
    "course_id": 3,
    "title": "5.1 Video Editing Foundations & Timeline Architecture",
    "description": "Cuts, trims, sequencing, multi-track audio, and pacing principles for digital viewers.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-5.pdf",
    "duration": "34:00",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 17,
    "section_id": 9,
    "course_id": 3,
    "title": "5.2 High-Retention Instagram Reels & Shorts Editing",
    "description": "Adding dynamic captions, sound effects, B-rolls, visual hooks, and viral pacing.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-5.pdf",
    "duration": "36:20",
    "order_num": 2,
    "is_free_preview": false
  },
  {
    "id": 18,
    "section_id": 9,
    "course_id": 3,
    "title": "5.3 Filmora Audio Cleanup, Color Grading & Video Ad Export",
    "description": "Audio equalization, noise removal, color grading presets, and export settings for all social platforms.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-5.pdf",
    "duration": "30:15",
    "order_num": 3,
    "is_free_preview": false
  },
  {
    "id": 19,
    "section_id": 10,
    "course_id": 3,
    "title": "6.1 WordPress Architecture, Domains, DNS & Hosting Setup",
    "description": "Setting up hosting environments, installing WordPress, SSL configuration, and security.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-6.pdf",
    "duration": "32:50",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 20,
    "section_id": 10,
    "course_id": 3,
    "title": "6.2 Theme Customization & Elementor Visual Builder",
    "description": "Designing custom headers, footers, responsive landing pages, and lead capture forms.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-6.pdf",
    "duration": "42:15",
    "order_num": 2,
    "is_free_preview": false
  },
  {
    "id": 21,
    "section_id": 10,
    "course_id": 3,
    "title": "6.3 Website Speed Optimization & Core Web Vitals",
    "description": "Caching plugins, image compression, CDN setup, and achieving green scores on Google PageSpeed.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-6.pdf",
    "duration": "28:30",
    "order_num": 3,
    "is_free_preview": false
  },
  {
    "id": 22,
    "section_id": 11,
    "course_id": 3,
    "title": "7.1 Persuasive Copywriting Principles (AIDA, PAS & BAB)",
    "description": "Structuring ad copy, emotional triggers, curiosity hooks, and irresistible CTAs.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-7.pdf",
    "duration": "29:10",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 23,
    "section_id": 11,
    "course_id": 3,
    "title": "7.2 SEO Content Writing & Long-Form Articles",
    "description": "Writing rank-ready 2,000+ word guides with keyword density, header hierarchy, and internal linking.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-7.pdf",
    "duration": "35:40",
    "order_num": 2,
    "is_free_preview": false
  },
  {
    "id": 24,
    "section_id": 11,
    "course_id": 3,
    "title": "7.3 AI-Assisted Writing with ChatGPT, Claude & Gemini",
    "description": "Prompt engineering for marketers: creating blog outlines, social calendars, and newsletter drafts.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-7.pdf",
    "duration": "26:30",
    "order_num": 3,
    "is_free_preview": false
  },
  {
    "id": 25,
    "section_id": 12,
    "course_id": 3,
    "title": "8.1 Keyword Research & Search Intent Mining",
    "description": "Keyword research with Semrush, Ahrefs, and Google Keyword Planner. Intent classification.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-8.pdf",
    "duration": "40:00",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 26,
    "section_id": 12,
    "course_id": 3,
    "title": "8.2 On-Page SEO, Content Optimization & Schema Markup",
    "description": "Meta tags, H1-H6 structure, slug optimization, alt text, and JSON-LD schema generation.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-8.pdf",
    "duration": "38:20",
    "order_num": 2,
    "is_free_preview": false
  },
  {
    "id": 27,
    "section_id": 12,
    "course_id": 3,
    "title": "8.3 Technical SEO, Sitemaps & Crawlability Audits",
    "description": "Robots.txt, XML sitemaps, canonical tags, 301 redirects, and Screaming Frog site crawls.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-8.pdf",
    "duration": "36:15",
    "order_num": 3,
    "is_free_preview": false
  },
  {
    "id": 28,
    "section_id": 12,
    "course_id": 3,
    "title": "8.4 Off-Page SEO, Backlink Acquisition & Link Equity",
    "description": "White-hat link building, guest posting outreach, digital PR, and competitor backlink profiling.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-8.pdf",
    "duration": "33:45",
    "order_num": 4,
    "is_free_preview": false
  },
  {
    "id": 29,
    "section_id": 12,
    "course_id": 3,
    "title": "8.5 Local SEO & Google Business Profile (GMB) Domination",
    "description": "GMB optimization, local citations, geo-tagged images, reviews strategy, and Google 3-pack ranking.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-8.pdf",
    "duration": "31:00",
    "order_num": 5,
    "is_free_preview": false
  },
  {
    "id": 30,
    "section_id": 12,
    "course_id": 3,
    "title": "8.6 Search AI, Answer Engine Optimization (AEO) & LLMO",
    "description": "Optimizing for Google AI Overviews, Perplexity, ChatGPT Search, and brand entity authority.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-8.pdf",
    "duration": "34:30",
    "order_num": 6,
    "is_free_preview": false
  },
  {
    "id": 31,
    "section_id": 13,
    "course_id": 3,
    "title": "9.1 Social Media Algorithm Secrets (Meta & LinkedIn)",
    "description": "How ranking algorithms prioritize watch time, saves, shares, and meaningful interactions.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-9.pdf",
    "duration": "27:40",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 32,
    "section_id": 13,
    "course_id": 3,
    "title": "9.2 Content Strategy, Monthly Editorial Calendars & Growth",
    "description": "Theme buckets, carousel storytelling, hashtag strategy, and consistent publishing systems.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-9.pdf",
    "duration": "30:15",
    "order_num": 2,
    "is_free_preview": false
  },
  {
    "id": 33,
    "section_id": 14,
    "course_id": 3,
    "title": "10.1 Meta Business Suite & Ad Account Infrastructure",
    "description": "Business manager setup, ad accounts, pixel integration, and domain verification.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-10.pdf",
    "duration": "35:10",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 34,
    "section_id": 14,
    "course_id": 3,
    "title": "10.2 Audience Targeting: Broad, Interests, Custom & Lookalikes",
    "description": "Building high-intent customer segments, LAL audiences, and exclusion lists.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-10.pdf",
    "duration": "37:45",
    "order_num": 2,
    "is_free_preview": false
  },
  {
    "id": 35,
    "section_id": 14,
    "course_id": 3,
    "title": "10.3 Ad Creatives, Dynamic Creative Testing & Budget Scaling",
    "description": "CBO vs ABO, creative fatigue prevention, cost per acquisition (CPA) reduction, and ROAS scaling.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-10.pdf",
    "duration": "39:20",
    "order_num": 3,
    "is_free_preview": false
  },
  {
    "id": 36,
    "section_id": 15,
    "course_id": 3,
    "title": "11.1 Google Search Ads & Match Types Architecture",
    "description": "Exact, phrase, broad match strategies, negative keywords, and quality score optimization.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-11.pdf",
    "duration": "41:00",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 37,
    "section_id": 15,
    "course_id": 3,
    "title": "11.2 Performance Max (PMax) & Display Network Campaigns",
    "description": "Asset groups, audience signals, responsive display ads, and Google partner placements.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-11.pdf",
    "duration": "36:30",
    "order_num": 2,
    "is_free_preview": false
  },
  {
    "id": 38,
    "section_id": 15,
    "course_id": 3,
    "title": "11.3 YouTube Video Ads & Bidding Strategies",
    "description": "Skippable in-stream ads, bumper ads, target CPA vs maximize conversions, and conversion tracking.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-11.pdf",
    "duration": "33:15",
    "order_num": 3,
    "is_free_preview": false
  },
  {
    "id": 39,
    "section_id": 16,
    "course_id": 3,
    "title": "12.1 WhatsApp Business API, Green Tick & Chatbots",
    "description": "Setting up official WABA, interactive message templates, broadcast compliance, and automated chatbots.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-12.pdf",
    "duration": "29:40",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 40,
    "section_id": 16,
    "course_id": 3,
    "title": "12.2 Email Marketing Automation, Lead Nurturing & Deliverability",
    "description": "Welcome drip series, abandoned cart recovery, newsletter templates, SPF/DKIM/DMARC authentication.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-12.pdf",
    "duration": "31:50",
    "order_num": 2,
    "is_free_preview": false
  },
  {
    "id": 41,
    "section_id": 17,
    "course_id": 3,
    "title": "13.1 GA4 (Google Analytics 4) Deep Dive & Event Data Modeling",
    "description": "Event-based data model, user acquisition vs traffic acquisition, custom explorations, and funnels.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-13.pdf",
    "duration": "44:10",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 42,
    "section_id": 17,
    "course_id": 3,
    "title": "13.2 Looker Studio Executive Dashboard Creation",
    "description": "Connecting GA4, Google Ads, and Meta Ads to build automated client reporting dashboards.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-13.pdf",
    "duration": "36:25",
    "order_num": 2,
    "is_free_preview": false
  },
  {
    "id": 43,
    "section_id": 18,
    "course_id": 3,
    "title": "14.1 Full-Funnel Retargeting Architecture & Frequency Capping",
    "description": "Cart abandoner retargeting, pageview retargeting sequences, dynamic catalog ads, and ROAS maximization.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-14.pdf",
    "duration": "32:00",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 44,
    "section_id": 19,
    "course_id": 3,
    "title": "15.1 Upwork & Fiverr Profile Optimization & Winning Proposals",
    "description": "High-converting proposal scripts, pricing your agency packages, handling objections, and international client contracts.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-professionals-module-15.pdf",
    "duration": "38:00",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 45,
    "section_id": 20,
    "course_id": 4,
    "title": "1.1 Introduction to Digital Marketing in 2026",
    "description": "Digital ecosystem evolution, online consumer mindsets, and digital career opportunities.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-1.pdf",
    "duration": "20:00",
    "order_num": 1,
    "is_free_preview": true
  },
  {
    "id": 46,
    "section_id": 20,
    "course_id": 4,
    "title": "1.2 How Search Engines and the Internet Work",
    "description": "DNS, web servers, search crawlers, indexing, and ranking algorithms explained simply.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-1.pdf",
    "duration": "24:15",
    "order_num": 2,
    "is_free_preview": false
  },
  {
    "id": 47,
    "section_id": 21,
    "course_id": 4,
    "title": "2.1 Google Workspace Tools for Digital Marketers",
    "description": "Setting up Google Drive, Docs, Sheets, Slides, Calendar, and Gemini AI for marketing tasks.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-2.pdf",
    "duration": "22:30",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 48,
    "section_id": 22,
    "course_id": 4,
    "title": "3.1 SEO Fundamentals — What is SEO and Why It Matters",
    "description": "Organic search vs paid search, search intent, and Google ranking factors.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-3.pdf",
    "duration": "28:00",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 49,
    "section_id": 22,
    "course_id": 4,
    "title": "3.2 On-Page SEO — Title Tags, Meta Descriptions & Keywords",
    "description": "Title tag architecture, meta descriptions, H1-H6 tags, keyword density, and image alt text.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-3.pdf",
    "duration": "32:10",
    "order_num": 2,
    "is_free_preview": false
  },
  {
    "id": 50,
    "section_id": 22,
    "course_id": 4,
    "title": "3.3 Off-Page SEO — Backlinks and Domain Authority Basics",
    "description": "Understanding backlinks, do-follow vs no-follow, domain authority, and introductory link building.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-3.pdf",
    "duration": "27:45",
    "order_num": 3,
    "is_free_preview": false
  },
  {
    "id": 51,
    "section_id": 22,
    "course_id": 4,
    "title": "3.4 Technical SEO — Site Speed and Mobile Optimisation",
    "description": "Basic technical factors, mobile responsiveness, XML sitemaps, and SSL security.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-3.pdf",
    "duration": "25:30",
    "order_num": 4,
    "is_free_preview": false
  },
  {
    "id": 52,
    "section_id": 22,
    "course_id": 4,
    "title": "3.5 Local SEO and Google Business Profile Optimisation",
    "description": "Setting up and ranking on Google My Business, local citations, and Google Maps 3-Pack.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-3.pdf",
    "duration": "30:00",
    "order_num": 5,
    "is_free_preview": false
  },
  {
    "id": 53,
    "section_id": 23,
    "course_id": 4,
    "title": "4.1 Google Ads — Introduction to Search Engine Marketing",
    "description": "How Google Search auction works, ad rank, quality score, and CPC bidding.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-4.pdf",
    "duration": "26:40",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 54,
    "section_id": 23,
    "course_id": 4,
    "title": "4.2 Google Ads — Setting Up Your First Search Campaign",
    "description": "Step-by-step account setup, keyword selection, ad copywriting, and launch.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-4.pdf",
    "duration": "34:20",
    "order_num": 2,
    "is_free_preview": false
  },
  {
    "id": 55,
    "section_id": 24,
    "course_id": 4,
    "title": "5.1 Meta Ads — Introduction to Facebook & Instagram Advertising",
    "description": "Meta ad hierarchy, campaign objectives, placements, and pixel basics.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-5.pdf",
    "duration": "28:15",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 56,
    "section_id": 24,
    "course_id": 4,
    "title": "5.2 Meta Ads — Audience Research and Ad Creative Basics",
    "description": "Demographic and interest targeting, creating compelling image/video ads.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-5.pdf",
    "duration": "31:00",
    "order_num": 2,
    "is_free_preview": false
  },
  {
    "id": 57,
    "section_id": 25,
    "course_id": 4,
    "title": "6.1 Social Media Marketing — Instagram Strategy and Reels",
    "description": "Bio optimization, aesthetic feeds, hashtags, and viral Instagram Reels structure.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-6.pdf",
    "duration": "30:45",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 58,
    "section_id": 25,
    "course_id": 4,
    "title": "6.2 Social Media Marketing — Facebook Pages and Groups",
    "description": "Community engagement, group monetization, and brand authority.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-6.pdf",
    "duration": "24:00",
    "order_num": 2,
    "is_free_preview": false
  },
  {
    "id": 59,
    "section_id": 25,
    "course_id": 4,
    "title": "6.3 Social Media Marketing — LinkedIn Profile & Company Pages",
    "description": "Professional networking, B2B content marketing, and personal branding.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-6.pdf",
    "duration": "26:30",
    "order_num": 3,
    "is_free_preview": false
  },
  {
    "id": 60,
    "section_id": 25,
    "course_id": 4,
    "title": "6.4 Social Media Marketing — YouTube Channel and Shorts",
    "description": "Channel setup, video thumbnails, tags, YouTube SEO, and Shorts retention.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-6.pdf",
    "duration": "29:10",
    "order_num": 4,
    "is_free_preview": false
  },
  {
    "id": 61,
    "section_id": 26,
    "course_id": 4,
    "title": "7.1 Content Writing — SEO Blogs, Copywriting, and Storytelling",
    "description": "Headlines, persuasive structures, writing blog posts that rank, and social media captions.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-7.pdf",
    "duration": "33:00",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 62,
    "section_id": 27,
    "course_id": 4,
    "title": "8.1 Email Marketing — List Building and Campaign Design",
    "description": "Setting up Mailchimp, creating opt-in forms, welcome series, and newsletter design.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-8.pdf",
    "duration": "27:15",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 63,
    "section_id": 28,
    "course_id": 4,
    "title": "9.1 WhatsApp Marketing and Business Automation Basics",
    "description": "WhatsApp Business profile, quick replies, catalogs, labels, and broadcast lists.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-9.pdf",
    "duration": "23:50",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 64,
    "section_id": 29,
    "course_id": 4,
    "title": "10.1 Canva — Graphic Design for Social Media and Ads",
    "description": "Color palettes, typography, social media templates, ad banners, and Canva AI Magic tools.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-10.pdf",
    "duration": "35:00",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 65,
    "section_id": 30,
    "course_id": 4,
    "title": "11.1 Video Editing — Reels, Shorts, and YouTube Videos",
    "description": "Editing with Canva and Filmora/CapCut, pacing, captions, sound effects, and export formats.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-11.pdf",
    "duration": "32:40",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 66,
    "section_id": 31,
    "course_id": 4,
    "title": "12.1 WordPress — Building Your First Website",
    "description": "Domain, hosting, theme installation, building pages with Elementor, and contact forms.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-12.pdf",
    "duration": "40:00",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 67,
    "section_id": 32,
    "course_id": 4,
    "title": "13.1 Google Analytics 4 — Understanding Website Traffic",
    "description": "Users, sessions, engagement rate, traffic sources, and basic conversion tracking.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-13.pdf",
    "duration": "31:15",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 68,
    "section_id": 32,
    "course_id": 4,
    "title": "13.2 Google Search Console — Tracking SEO Performance",
    "description": "Impressions, clicks, average position, indexing queries, and sitemap submission.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-13.pdf",
    "duration": "26:30",
    "order_num": 2,
    "is_free_preview": false
  },
  {
    "id": 69,
    "section_id": 33,
    "course_id": 4,
    "title": "14.1 AI Tools for Digital Marketers — ChatGPT, Gemini & Canva AI",
    "description": "AI prompting for marketing ideas, content calendars, and design generation.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-14.pdf",
    "duration": "30:00",
    "order_num": 1,
    "is_free_preview": false
  },
  {
    "id": 70,
    "section_id": 33,
    "course_id": 4,
    "title": "14.2 Answer Engine Optimisation (AEO) — Introduction",
    "description": "How AI engines like Perplexity, ChatGPT and Google AI Overviews answer search queries.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-14.pdf",
    "duration": "22:15",
    "order_num": 2,
    "is_free_preview": false
  },
  {
    "id": 71,
    "section_id": 33,
    "course_id": 4,
    "title": "14.3 Freelancing — Getting Your First Client on Fiverr and Upwork",
    "description": "Creating attractive service gigs, pricing, proposal scripts, and client communication.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-14.pdf",
    "duration": "34:00",
    "order_num": 3,
    "is_free_preview": false
  },
  {
    "id": 72,
    "section_id": 33,
    "course_id": 4,
    "title": "14.4 Resume Building and LinkedIn Profile for Digital Marketers",
    "description": "Optimizing your resume with live projects, LinkedIn headline, and recruiter outreach.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-14.pdf",
    "duration": "28:30",
    "order_num": 4,
    "is_free_preview": false
  },
  {
    "id": 73,
    "section_id": 33,
    "course_id": 4,
    "title": "14.5 Google and Meta Certification Preparation",
    "description": "Exam guidance and mock tests for Google Ads Search, GAIQ, and Meta certifications.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-14.pdf",
    "duration": "25:00",
    "order_num": 5,
    "is_free_preview": false
  },
  {
    "id": 74,
    "section_id": 33,
    "course_id": 4,
    "title": "14.6 Career Roadmap — Jobs, Freelancing, and Business",
    "description": "Step-by-step 1-year career advancement plan for junior digital marketers.",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "pdf_url": "https://dizitaladda.com/curriculum/dm-beginners-module-14.pdf",
    "duration": "24:00",
    "order_num": 6,
    "is_free_preview": false
  }
];

class FallbackStore {
  constructor() {
    this.data = {
      users: [...INITIAL_USERS],
      courses: [...INITIAL_COURSES],
      sections: [...INITIAL_SECTIONS],
      lectures: [...INITIAL_LECTURES],
      students: [],
      orders: [],
      enrollments: [],
      notifications: [],
      quizzes: [
  {
    "id": 1,
    "title": "Performance Marketing & Digital Ecosystem Quiz",
    "course_id": 1,
    "passing_score": 70,
    "created_at": "2026-09-11T06:36:03.782Z"
  },
  {
    "id": 2,
    "title": "Digital Marketing Strategy & Funnels Assessment",
    "course_id": 3,
    "passing_score": 70,
    "created_at": "2026-09-11T06:36:03.785Z"
  },
  {
    "id": 3,
    "title": "Digital Marketing Fundamentals & SEO Basics Test",
    "course_id": 4,
    "passing_score": 70,
    "created_at": "2026-09-11T06:36:03.785Z"
  }
],
      quiz_questions: [
  {
    "id": 1,
    "quiz_id": 1,
    "question": "What does ROAS stand for in Performance Marketing?",
    "option_a": "Return On Ad Spend",
    "option_b": "Rate Of Audience Share",
    "option_c": "Revenue Optimization And Sales",
    "option_d": "Return On Account Scale",
    "correct_option": "A"
  },
  {
    "id": 2,
    "quiz_id": 1,
    "question": "Which campaign type in Google Ads uses AI to serve across Search, YouTube, Display, and Maps simultaneously?",
    "option_a": "Standard Search",
    "option_b": "Performance Max (PMax)",
    "option_c": "Smart Display Only",
    "option_d": "Discovery Feed",
    "correct_option": "B"
  },
  {
    "id": 3,
    "quiz_id": 1,
    "question": "What tracking method is required for accurate iOS 14+ Meta event reporting?",
    "option_a": "Client-Side Cookie Only",
    "option_b": "Conversions API (CAPI) & Server-Side Tracking",
    "option_c": "Google Analytics 3",
    "option_d": "URL UTM Parameters Only",
    "correct_option": "B"
  },
  {
    "id": 4,
    "quiz_id": 2,
    "question": "In full-funnel marketing architecture, what does TOFU stand for?",
    "option_a": "Target Online Follower Unit",
    "option_b": "Top Of Funnel (Awareness Phase)",
    "option_c": "Total Organic Feedback User",
    "option_d": "Time On Funnel Usage",
    "correct_option": "B"
  },
  {
    "id": 5,
    "quiz_id": 2,
    "question": "Which of the following is essential for Answer Engine Optimization (AEO) and AI Overviews?",
    "option_a": "Hidden keyword stuffing",
    "option_b": "Clear entity structure, schema markup, and direct answers",
    "option_c": "Buying 10,000 low-quality forum backlinks",
    "option_d": "Blocking search engine crawlers with robots.txt",
    "correct_option": "B"
  },
  {
    "id": 6,
    "quiz_id": 2,
    "question": "What is the primary benefit of Meta Lookalike Audiences (LAL)?",
    "option_a": "Targeting people who have never used the internet",
    "option_b": "Finding high-converting users similar to your best existing customers",
    "option_c": "Reducing your organic post engagement",
    "option_d": "Removing ad copy restrictions",
    "correct_option": "B"
  },
  {
    "id": 7,
    "quiz_id": 3,
    "question": "What is the primary difference between Organic SEO and Paid Search Ads?",
    "option_a": "SEO is completely free of clicks; Google Ads charges per click (PPC)",
    "option_b": "Google Ads only works on mobile phones",
    "option_c": "SEO results disappear when your daily budget runs out",
    "option_d": "There is no difference",
    "correct_option": "A"
  },
  {
    "id": 8,
    "quiz_id": 3,
    "question": "Where should you place your primary keyword for best on-page SEO results?",
    "option_a": "Title Tag, H1 Header, URL Slug, and naturally in body copy",
    "option_b": "In hidden white text on a white background",
    "option_c": "In the footer repeated 50 times",
    "option_d": "Only in the copyright notice",
    "correct_option": "A"
  },
  {
    "id": 9,
    "quiz_id": 3,
    "question": "Which Google tool is used to monitor website search queries, impressions, and indexing status?",
    "option_a": "Google Sheets",
    "option_b": "Google Search Console",
    "option_c": "Google Meet",
    "option_d": "Google AdSense",
    "correct_option": "B"
  }
],
      quiz_attempts: [],
      assignments: [
  {
    "id": 1,
    "title": "Meta Ads Dynamic Campaign Architecture",
    "description": "Build an end-to-end Meta Ads campaign strategy deck including customer avatars, TOFU/MOFU/BOFU budget allocation, 3 creative mockups, and tracking pixel event triggers.",
    "course_id": 1,
    "due_date": "2026-10-15",
    "max_marks": 100,
    "resource_url": "https://dizitaladda.com/curriculum/assignment-meta-framework.pdf",
    "created_at": "2026-09-11T06:36:03.785Z"
  },
  {
    "id": 2,
    "title": "Brand Positioning & Full-Funnel Lead Gen Blueprint",
    "description": "Select a real or hypothetical business. Conduct competitor gap analysis, write Unique Value Proposition (UVP), and diagram a 3-stage acquisition funnel with estimated CPA targets.",
    "course_id": 3,
    "due_date": "2026-10-20",
    "max_marks": 100,
    "resource_url": "https://dizitaladda.com/curriculum/assignment-funnel-blueprint.pdf",
    "created_at": "2026-09-11T06:36:03.785Z"
  },
  {
    "id": 3,
    "title": "First Keyword Research Audit & On-Page Checklist",
    "description": "Choose a local niche (e.g. Dental Clinic, Fitness Gym, Bakery). Find 10 high-intent keywords using Google Keyword Planner, write optimized Title & Meta Description, and submit your audit spreadsheet.",
    "course_id": 4,
    "due_date": "2026-10-10",
    "max_marks": 100,
    "resource_url": "https://dizitaladda.com/curriculum/assignment-seo-checklist.pdf",
    "created_at": "2026-09-11T06:36:03.785Z"
  }
],
      assignment_submissions: [],
      payments: [],
      activities: [],
    };
    this.loadFromDisk();
  }

  loadFromDisk() {
    try {
      if (fs.existsSync(STORE_FILE)) {
        const raw = fs.readFileSync(STORE_FILE, "utf8");
        const parsed = JSON.parse(raw);
        if (parsed.users && parsed.users.length > 0) this.data.users = parsed.users;
        if (parsed.courses && parsed.courses.length >= INITIAL_COURSES.length) {
          this.data.courses = parsed.courses;
        } else {
          this.data.courses = INITIAL_COURSES;
        }
        if (parsed.students) this.data.students = parsed.students;
        if (parsed.orders) this.data.orders = parsed.orders;
        if (parsed.payments) this.data.payments = parsed.payments;
        if (parsed.enrollments) this.data.enrollments = parsed.enrollments;
        if (parsed.sections) this.data.sections = parsed.sections;
        if (parsed.lectures) this.data.lectures = parsed.lectures;
        if (parsed.notifications) this.data.notifications = parsed.notifications;
        if (parsed.quizzes) this.data.quizzes = parsed.quizzes;
        if (parsed.quiz_questions) this.data.quiz_questions = parsed.quiz_questions;
        if (parsed.quiz_attempts) this.data.quiz_attempts = parsed.quiz_attempts;
        if (parsed.assignments) this.data.assignments = parsed.assignments;
        if (parsed.assignment_submissions) this.data.assignment_submissions = parsed.assignment_submissions;
        if (parsed.activities) this.data.activities = parsed.activities;
      }
    } catch (e) {
      console.warn("FallbackStore: Could not load disk cache, starting with default seed data.");
    }
  }

  saveToDisk() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(STORE_FILE, JSON.stringify(this.data, null, 2), "utf8");
    } catch (e) {
      console.warn("FallbackStore: Could not write to disk cache:", e.message);
    }
  }

  // Handle SQL-like queries gracefully
  async handleQuery(text, params = []) {
    const q = (text || "").trim();
    const upperQ = q.toUpperCase();

    // 1. Transactions
    if (upperQ === "BEGIN" || upperQ === "COMMIT" || upperQ === "ROLLBACK") {
      return { rows: [], rowCount: 0 };
    }

    // 1b. Aggregate queries (COUNT, SUM)
    if (upperQ.includes("SELECT COUNT(*)")) {
      if (upperQ.includes("FROM COURSES")) {
        return { rows: [{ count: this.data.courses?.length || 0 }], rowCount: 1 };
      }
      if (upperQ.includes("FROM STUDENTS")) {
        return { rows: [{ count: this.data.students?.length || 0 }], rowCount: 1 };
      }
      if (upperQ.includes("FROM LECTURES")) {
        return { rows: [{ count: this.data.lectures?.length || 0 }], rowCount: 1 };
      }
      if (upperQ.includes("FROM SECTIONS")) {
        return { rows: [{ count: this.data.sections?.length || 0 }], rowCount: 1 };
      }
      if (upperQ.includes("FROM USERS")) {
        let list = this.data.users || [];
        if (upperQ.includes("ROLE = 'STUDENT'") || (params && params.includes("student"))) {
          list = list.filter((u) => u.role === "student");
        } else if (upperQ.includes("ROLE = 'TEACHER'") || (params && params.includes("teacher"))) {
          list = list.filter((u) => u.role === "teacher");
        } else if (upperQ.includes("ROLE = 'ADMIN'") || (params && params.includes("admin"))) {
          list = list.filter((u) => u.role === "admin");
        }
        return { rows: [{ count: list.length }], rowCount: 1 };
      }
      if (upperQ.includes("FROM ORDERS")) {
        return { rows: [{ count: this.data.orders?.length || 0 }], rowCount: 1 };
      }
      if (upperQ.includes("FROM PAYMENTS")) {
        return { rows: [{ count: this.data.payments?.length || 0 }], rowCount: 1 };
      }
      return { rows: [{ count: 0 }], rowCount: 1 };
    }

    if (upperQ.includes("SUM(AMOUNT)") || upperQ.includes("REVENUE")) {
      const payments = this.data.payments || [];
      const orders = this.data.orders || [];
      let total = 0;
      payments.forEach((p) => {
        if (!p.status || p.status.toLowerCase() === "success" || p.status.toLowerCase() === "completed") {
          total += Number(p.amount) || 0;
        }
      });
      if (total === 0) {
        orders.forEach((o) => {
          if (o.status === "paid" || o.status === "success") {
            total += Number(o.amount) || 0;
          }
        });
      }
      return { rows: [{ revenue: total }], rowCount: 1 };
    }

    // 2a. ENROLLED COURSES FOR LOGGED-IN USER (myCourses)
    if (
      upperQ.includes("FROM COURSES") &&
      (upperQ.includes("JOIN ENROLLMENTS") || upperQ.includes("JOIN STUDENTS") || upperQ.includes("ENROLLMENTS.USER_ID = $1") || upperQ.includes("STUDENTS.USER_ID = $1"))
    ) {
      const userId = Number(params[0]);
      const userStudents = this.data.students.filter((s) => Number(s.user_id) === userId);
      const userEnrollments = this.data.enrollments.filter((e) => Number(e.user_id) === userId);

      const enrolledCourses = this.data.courses.filter((c) => {
        const inStudent = userStudents.some(
          (s) =>
            (s.course_id && Number(s.course_id) === Number(c.id)) ||
            (s.course_code && s.course_code === c.course_id) ||
            (s.course && s.course.toLowerCase().trim() === c.title.toLowerCase().trim())
        );
        const inEnrollment = userEnrollments.some(
          (e) =>
            (e.course_id && Number(e.course_id) === Number(c.id)) ||
            (e.course_code && e.course_code === c.course_id)
        );
        return inStudent || inEnrollment;
      });

      const formatted = enrolledCourses.map((c) => {
        const sRec = userStudents.find(
          (s) =>
            (s.course_id && Number(s.course_id) === Number(c.id)) ||
            (s.course_code && s.course_code === c.course_id) ||
            (s.course && s.course.toLowerCase().trim() === c.title.toLowerCase().trim())
        );
        const eRec = userEnrollments.find(
          (e) =>
            (e.course_id && Number(e.course_id) === Number(c.id)) ||
            (e.course_code && e.course_code === c.course_id)
        );

        const lecCount = this.data.lectures.filter((l) => Number(l.course_id) === Number(c.id)).length;
        const totalLec = lecCount > 0 ? lecCount : (c.total_lectures || 36);

        return {
          ...c,
          enrolled_at: eRec?.enrolled_at || sRec?.created_at || new Date().toISOString(),
          enrollment_status: eRec?.status || sRec?.status || "Active",
          total_lectures: totalLec,
          completed_lectures: 0,
        };
      });

      return { rows: formatted, rowCount: formatted.length };
    }

    // 2b. Single Course: SELECT * FROM courses WHERE id::text = $1 OR course_id = $1
    if (upperQ.includes("FROM COURSES") && (upperQ.includes("ID::TEXT = $1") || upperQ.includes("COURSE_ID = $1") || upperQ.includes("WHERE ID = $1") || upperQ.includes("WHERE ID::TEXT"))) {
      let idOrSlug = String(params[0]);
      if (idOrSlug === "da-3m-bi" || idOrSlug === "da-6m-pro" || idOrSlug === "da-12m-diploma" || idOrSlug === "ds-3m-bi") idOrSlug = "data-analytics";
      if (idOrSlug === "ds-6m-ml" || idOrSlug === "ds-12m-master" || idOrSlug === "ds-6m-python") idOrSlug = "data-science";
      if (idOrSlug === "cs-4m-found" || idOrSlug === "cs-6m-ceh" || idOrSlug === "cs-12m-master" || idOrSlug === "cyber-security" || idOrSlug === "cyber-security-ethical-hacking") idOrSlug = "cyber-advanced";
      const course = this.data.courses.find(
        (c) => String(c.id) === idOrSlug || c.course_id === idOrSlug
      );
      return { rows: course ? [course] : [], rowCount: course ? 1 : 0 };
    }

    // 2c. General Courses Query
    if (upperQ.includes("FROM COURSES") && (upperQ.includes("TOTAL_LECTURES") || upperQ.includes("SELECT C.*") || upperQ.includes("SELECT * FROM COURSES"))) {
      let filtered = this.data.courses.filter((c) => c.is_published !== false);

      const categoryParam = params.find((p) => typeof p === "string" && !p.startsWith("%") && p !== "All");
      if (categoryParam) {
        filtered = filtered.filter((c) => c.category.toLowerCase() === categoryParam.toLowerCase());
      }

      const searchParam = params.find((p) => typeof p === "string" && p.startsWith("%") && p.endsWith("%"));
      if (searchParam) {
        const clean = searchParam.replace(/%/g, "").toLowerCase();
        filtered = filtered.filter(
          (c) => c.title.toLowerCase().includes(clean) || (c.description || "").toLowerCase().includes(clean)
        );
      }

      return { rows: filtered, rowCount: filtered.length };
    }

    // 2d. Course Sections: SELECT * FROM sections WHERE course_id = $1
    if (upperQ.includes("FROM SECTIONS") && upperQ.includes("COURSE_ID = $1")) {
      const courseId = Number(params[0]);
      const sections = this.data.sections.filter((s) => s.course_id === courseId);
      return { rows: sections, rowCount: sections.length };
    }

    // 2e. Course Lectures (supports courseId numeric or slug)
    if (upperQ.includes("FROM LECTURES") && !upperQ.includes("DELETE")) {
      let filtered = this.data.lectures;
      if (params.length > 0 && params[0] !== undefined) {
        const courseIdStr = String(params[0]);
        const targetCourse = this.data.courses.find(
          (c) => String(c.id) === courseIdStr || c.course_id === courseIdStr
        );
        const matchedCourseId = targetCourse ? targetCourse.id : Number(courseIdStr);
        filtered = filtered.filter((l) => Number(l.course_id) === Number(matchedCourseId));
      }
      return { rows: filtered, rowCount: filtered.length };
    }

    // 2e. Add Course: INSERT INTO courses (...) VALUES (...) RETURNING *
    if (upperQ.includes("INSERT INTO COURSES")) {
      const newCourse = {
        id: this.data.courses.length + 1,
        course_id: "course-" + Date.now().toString().slice(-4),
        title: params[0] || "Untitled Course",
        description: params[1] || "",
        duration: params[2] || "4 Weeks",
        level: params[3] || "Beginner",
        category: params[4] || "General",
        price: Number(params[5]) || 0,
        original_price: Number(params[6]) || Number(params[5]) || 0,
        teacher: params[7] || "Dizital Adda Trainer",
        teacher_id: params[8] || null,
        thumbnail: params[9] || "",
        is_published: true,
        total_lectures: 0,
        total_students: 0,
        created_at: new Date().toISOString(),
      };
      this.data.courses.push(newCourse);
      this.saveToDisk();
      return { rows: [newCourse], rowCount: 1 };
    }

    if (upperQ.includes("UPDATE COURSES")) {
      const targetId = String(params[params.length - 1]);
      const course = this.data.courses.find(
        (c) => String(c.id) === targetId || c.course_id === targetId
      );
      if (course) {
        if (params[0] !== null && params[0] !== undefined) course.title = params[0];
        if (params[1] !== null && params[1] !== undefined) course.description = params[1];
        if (params[2] !== null && params[2] !== undefined) course.price = Number(params[2]);
        if (params[3] !== null && params[3] !== undefined) course.original_price = Number(params[3]);
        if (params[4] !== null && params[4] !== undefined) course.duration = params[4];
        if (params[5] !== null && params[5] !== undefined) course.level = params[5];
        if (params[6] !== null && params[6] !== undefined) course.category = params[6];
        if (params[7] !== null && params[7] !== undefined) course.teacher = params[7];
        if (params[8] !== null && params[8] !== undefined) course.thumbnail = params[8];
        if (params[9] !== null && params[9] !== undefined) course.is_published = Boolean(params[9]);
        if (params[10] !== null && params[10] !== undefined) course.course_id = params[10];
        course.updated_at = new Date().toISOString();
        this.saveToDisk();
      }
      return { rows: course ? [course] : [], rowCount: course ? 1 : 0 };
    }

    if (upperQ.includes("DELETE FROM COURSES")) {
      const targetId = String(params[0]);
      const idx = this.data.courses.findIndex(
        (c) => String(c.id) === targetId || c.course_id === targetId
      );
      let removed = null;
      if (idx !== -1) {
        removed = this.data.courses.splice(idx, 1)[0];
        this.saveToDisk();
      }
      return { rows: removed ? [removed] : [], rowCount: removed ? 1 : 0 };
    }

    // 3. USERS QUERIES
    if (upperQ.includes("FROM USERS") && (upperQ.includes("WHERE LOWER(EMAIL)") || upperQ.includes("WHERE EMAIL"))) {
      const email = String(params[0] || "").toLowerCase().trim();
      const user = this.data.users.find((u) => u.email.toLowerCase() === email);
      return { rows: user ? [user] : [], rowCount: user ? 1 : 0 };
    }

    if (upperQ.includes("FROM USERS") && (upperQ.includes("WHERE ID =") || upperQ.includes("WHERE ID::TEXT ="))) {
      const id = Number(params[0]);
      const user = this.data.users.find((u) => u.id === id);
      return { rows: user ? [user] : [], rowCount: user ? 1 : 0 };
    }

    if (upperQ.includes("INSERT INTO USERS")) {
      const isLiteralStudent = upperQ.includes("'STUDENT'");
      const role = isLiteralStudent ? "student" : (params[4] || "student").toLowerCase();
      const phone = isLiteralStudent ? (params[4] || null) : (params[5] || null);
      const newUser = {
        id: this.data.users.length + 1,
        name: params[0] || "Student",
        full_name: params[1] || params[0] || "Student",
        email: (params[2] || "").toLowerCase().trim(),
        password: params[3],
        role,
        phone,
        status: "Active",
        avatar: "https://ui-avatars.com/api/?name=" + encodeURIComponent(params[0] || "Student") + "&background=0B1220&color=D4A017&bold=true",
        created_at: new Date().toISOString(),
      };
      this.data.users.push(newUser);
      this.saveToDisk();
      return { rows: [newUser], rowCount: 1 };
    }

    if (upperQ.includes("UPDATE USERS")) {
      let targetId = params[params.length - 1];
      const user = this.data.users.find((u) => u.id === Number(targetId));
      if (user) {
        if (upperQ.includes("PASSWORD = $1")) {
          user.password = params[0];
        }
        if (upperQ.includes("NAME = $1")) {
          user.name = params[0];
          user.full_name = params[0];
          if (params[1] !== undefined) user.phone = params[1];
        }
        user.updated_at = new Date().toISOString();
        this.saveToDisk();
      }
      return { rows: user ? [user] : [], rowCount: user ? 1 : 0 };
    }

    // 4. STUDENTS QUERIES
    if (upperQ.includes("FROM STUDENTS") && upperQ.includes("USER_ID = $1")) {
      const userId = Number(params[0]);
      const student = [...this.data.students].reverse().find((s) => Number(s.user_id) === userId);
      if (!student) {
        return { rows: [], rowCount: 0 };
      }
      const user = this.data.users.find((u) => Number(u.id) === userId);
      const course = this.data.courses.find(
        (c) =>
          (student.course_id && Number(c.id) === Number(student.course_id)) ||
          (student.course_code && c.course_id === student.course_code) ||
          (student.course && c.title.toLowerCase().trim() === student.course.toLowerCase().trim())
      );
      const combined = {
        ...student,
        avatar: user?.avatar || null,
        role: user?.role || "student",
        course_numeric_id: course?.id || null,
        course_code_val: course?.course_id || student.course_code || null,
        course_title: course?.title || student.course || null,
        course_thumbnail: course?.thumbnail || null,
        course_duration: course?.duration || null,
        course_level: course?.level || null,
      };
      return { rows: [combined], rowCount: 1 };
    }

    if (upperQ.includes("INSERT INTO STUDENTS")) {
      const colMatch = q.match(/\((.*?)\)\s*VALUES/i);
      const cols = colMatch
        ? colMatch[1].split(",").map((c) => c.trim().toLowerCase())
        : ["user_id", "student_id", "name", "email", "password", "phone", "course", "course_id", "course_code", "status"];

      const record = {};
      cols.forEach((col, idx) => {
        if (params[idx] !== undefined) {
          record[col] = params[idx];
        }
      });

      const newStudent = {
        id: this.data.students.length + 1,
        user_id: Number(record.user_id || params[0]),
        student_id: record.student_id || params[1] || ("DIZ-" + Math.floor(100000 + Math.random() * 900000)),
        course_id: record.course_id ? Number(record.course_id) : null,
        course_code: record.course_code || null,
        name: record.name || "Student",
        email: (record.email || "").toLowerCase().trim(),
        password: record.password || null,
        phone: record.phone || null,
        course: record.course || "Advanced Digital Marketing",
        batch: record.batch || "Regular 2026",
        status: record.status || "Active",
        created_at: new Date().toISOString(),
      };
      this.data.students.push(newStudent);
      this.saveToDisk();
      return { rows: [newStudent], rowCount: 1 };
    }

    if (upperQ.includes("UPDATE STUDENTS")) {
      const targetId = Number(params[params.length - 1]);
      const student = this.data.students.find((s) => s.id === targetId || s.user_id === targetId);
      if (student) {
        if (upperQ.includes("COURSE_ID = $1")) {
          student.course_id = Number(params[0]);
          student.course_code = params[1];
          student.course = params[2];
          student.password = params[3];
        }
        student.updated_at = new Date().toISOString();
        this.saveToDisk();
      }
      return { rows: student ? [student] : [], rowCount: student ? 1 : 0 };
    }

    if (upperQ.includes("FROM STUDENTS") && !upperQ.includes("WHERE")) {
      const list = this.data.students.map((s) => {
        const u = this.data.users.find((user) => user.id === s.user_id);
        return {
          ...s,
          avatar: u?.avatar || null,
        };
      });
      return { rows: list, rowCount: list.length };
    }

    // 5. ORDERS QUERIES
    if (upperQ.includes("INSERT INTO ORDERS")) {
      const newOrder = {
        id: this.data.orders.length + 1,
        user_id: params[0] ? Number(params[0]) : null,
        student_id: params[1] ? Number(params[1]) : null,
        course_id: params[2] ? Number(params[2]) : null,
        razorpay_order_id: params[3],
        amount: Number(params[4]),
        currency: params[5] || "INR",
        status: "created",
        created_at: new Date().toISOString(),
      };
      this.data.orders.push(newOrder);
      this.saveToDisk();
      return { rows: [newOrder], rowCount: 1 };
    }

    if (upperQ.includes("FROM ORDERS") && upperQ.includes("RAZORPAY_ORDER_ID = $1")) {
      const orderId = String(params[0]);
      const order = this.data.orders.find((o) => o.razorpay_order_id === orderId);
      return { rows: order ? [order] : [], rowCount: order ? 1 : 0 };
    }

    if (upperQ.includes("UPDATE ORDERS")) {
      const rzpOrderId = String(params[1] || params[params.length - 1]);
      const order = this.data.orders.find((o) => o.razorpay_order_id === rzpOrderId);
      if (order) {
        order.payment_id = params[0];
        order.status = "paid";
        order.updated_at = new Date().toISOString();
        this.saveToDisk();
      }
      return { rows: order ? [order] : [], rowCount: order ? 1 : 0 };
    }

    // 5b. PAYMENTS QUERIES
    if (upperQ.includes("INSERT INTO PAYMENTS")) {
      if (!this.data.payments) this.data.payments = [];
      const newPayment = {
        id: this.data.payments.length + 1,
        user_id: params[0] ? Number(params[0]) : null,
        student_id: params[1] ? Number(params[1]) : null,
        course_id: params[2] ? Number(params[2]) : null,
        razorpay_payment_id: params[3] || ("pay_" + Date.now()),
        razorpay_order_id: params[4] || null,
        razorpay_signature: params[5] || null,
        amount: Number(params[6]) || 0,
        status: "Success",
        created_at: new Date().toISOString(),
      };
      this.data.payments.push(newPayment);
      this.saveToDisk();
      return { rows: [newPayment], rowCount: 1 };
    }

    if (upperQ.includes("UPDATE PAYMENTS")) {
      if (!this.data.payments) this.data.payments = [];
      const rzpPaymentId = String(params[params.length - 1]);
      const payment = this.data.payments.find((p) => p.razorpay_payment_id === rzpPaymentId);
      if (payment) {
        payment.status = "Success";
        if (params[0] !== undefined) payment.student_id = Number(params[0]);
        if (params[1] !== undefined) payment.course_id = Number(params[1]);
        payment.updated_at = new Date().toISOString();
        this.saveToDisk();
      }
      return { rows: payment ? [payment] : [], rowCount: payment ? 1 : 0 };
    }


    // 5c. ACTIVITIES QUERIES
    if (upperQ.includes("INSERT INTO ACTIVITIES")) {
      if (!this.data.activities) this.data.activities = [];
      const newActivity = {
        id: this.data.activities.length + 1,
        user_id: Number(params[0]),
        title: params[1] || "Activity",
        description: params[2] || "",
        type: params[3] || "General",
        created_at: new Date().toISOString(),
      };
      this.data.activities.push(newActivity);
      this.saveToDisk();
      return { rows: [newActivity], rowCount: 1 };
    }

    // 6. ENROLLMENTS QUERIES
    if (upperQ.includes("FROM ENROLLMENTS") && upperQ.includes("USER_ID = $1") && upperQ.includes("COURSE_ID = $2")) {
      const uId = Number(params[0]);
      const cId = Number(params[1]);
      const matched = (this.data.enrollments || []).filter(
        (e) => Number(e.user_id) === uId && Number(e.course_id) === cId
      );
      return { rows: matched, rowCount: matched.length };
    }

    if (upperQ.includes("UPDATE ENROLLMENTS")) {
      const enrollId = Number(params[params.length - 1]);
      const enroll = (this.data.enrollments || []).find((e) => e.id === enrollId);
      if (enroll) {
        enroll.status = "Active";
        if (params[0] !== undefined) enroll.student_id = Number(params[0]);
        enroll.updated_at = new Date().toISOString();
        this.saveToDisk();
      }
      return { rows: enroll ? [enroll] : [], rowCount: enroll ? 1 : 0 };
    }

    if (upperQ.includes("INSERT INTO ENROLLMENTS")) {
      const newEnrollment = {
        id: this.data.enrollments.length + 1,
        user_id: Number(params[0]),
        student_id: Number(params[1]),
        course_id: Number(params[2]),
        course_code: params[3] || null,
        enrollment_date: params[4] || new Date().toISOString(),
        status: params[5] || "Active",
        payment_status: params[6] || "Paid",
        progress: Number(params[7]) || 0,
        created_at: new Date().toISOString(),
      };
      this.data.enrollments.push(newEnrollment);
      this.saveToDisk();
      return { rows: [newEnrollment], rowCount: 1 };
    }

    // 7. NOTIFICATIONS QUERIES
    if (upperQ.includes("INSERT INTO NOTIFICATIONS")) {
      const newNotif = {
        id: this.data.notifications.length + 1,
        user_id: Number(params[0]),
        title: params[1],
        message: params[2],
        type: params[3] || "info",
        created_at: new Date().toISOString(),
      };
      this.data.notifications.push(newNotif);
      this.saveToDisk();
      return { rows: [newNotif], rowCount: 1 };
    }

    
    // ----------------------------------------------------
    // LECTURES MANAGEMENT (INSERT & DELETE)
    // ----------------------------------------------------
    if (upperQ.includes("INSERT INTO LECTURES")) {
      const newLec = {
        id: this.data.lectures.length + 1,
        course_id: Number(params[0]),
        section_id: params[1] ? Number(params[1]) : null,
        title: params[2] || "Untitled Lecture",
        description: params[3] || "",
        video_url: params[4] || "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        pdf_url: params[5] || null,
        duration: params[6] || "15m",
        order_num: this.data.lectures.filter(l => Number(l.course_id) === Number(params[0])).length + 1,
        is_free_preview: Boolean(params[7]),
        created_at: new Date().toISOString(),
      };
      this.data.lectures.push(newLec);
      this.saveToDisk();
      return { rows: [newLec], rowCount: 1 };
    }

    if (upperQ.includes("DELETE FROM LECTURES")) {
      const targetId = Number(params[0]);
      const idx = this.data.lectures.findIndex(l => l.id === targetId);
      let removed = null;
      if (idx !== -1) {
        removed = this.data.lectures.splice(idx, 1)[0];
        this.saveToDisk();
      }
      return { rows: removed ? [removed] : [], rowCount: removed ? 1 : 0 };
    }

    // ----------------------------------------------------
    // SECTIONS MANAGEMENT (INSERT, SELECT, UPDATE & DELETE)
    // ----------------------------------------------------
    if (upperQ.includes("INSERT INTO SECTIONS")) {
      const targetCourseId = Number(params[1]);
      const calcOrder = params[2] !== undefined && params[2] !== null
        ? Number(params[2])
        : this.data.sections.filter(s => Number(s.course_id) === targetCourseId).length + 1;

      const newSec = {
        id: this.data.sections.length + 1,
        title: params[0] || "New Module",
        course_id: targetCourseId,
        order_num: calcOrder,
        created_at: new Date().toISOString(),
      };
      this.data.sections.push(newSec);
      this.saveToDisk();
      return { rows: [newSec], rowCount: 1 };
    }

    if (upperQ.includes("UPDATE SECTIONS")) {
      const targetId = Number(params[params.length - 1]);
      const section = this.data.sections.find((s) => Number(s.id) === targetId);
      if (section) {
        if (params[0] !== null && params[0] !== undefined) section.title = params[0];
        if (params[1] !== null && params[1] !== undefined) section.order_num = Number(params[1]);
        section.updated_at = new Date().toISOString();
        this.saveToDisk();
      }
      return { rows: section ? [section] : [], rowCount: section ? 1 : 0 };
    }

    if (upperQ.includes("FROM SECTIONS") && !upperQ.includes("DELETE")) {
      let list = this.data.sections || [];
      if (params.length > 0 && params[0] !== undefined) {
        const cid = Number(params[0]);
        list = list.filter((s) => Number(s.course_id) === cid);
      }
      return { rows: list, rowCount: list.length };
    }

    if (upperQ.includes("DELETE FROM SECTIONS")) {
      const targetId = Number(params[0]);
      const idx = this.data.sections.findIndex(s => s.id === targetId);
      let removed = null;
      if (idx !== -1) {
        removed = this.data.sections.splice(idx, 1)[0];
        if (this.data.lectures) {
          this.data.lectures = this.data.lectures.filter(l => Number(l.section_id) !== targetId);
        }
        this.saveToDisk();
      }
      return { rows: removed ? [removed] : [], rowCount: removed ? 1 : 0 };
    }

    // ----------------------------------------------------
    // QUIZZES & TESTS MANAGEMENT
    // ----------------------------------------------------
    if (upperQ.includes("INSERT INTO QUIZZES")) {
      if (!this.data.quizzes) this.data.quizzes = [];
      const newQuiz = {
        id: this.data.quizzes.length + 1,
        title: params[0] || "Course Quiz",
        course_id: Number(params[1]),
        passing_score: params[2] ? Number(params[2]) : 70,
        created_at: new Date().toISOString(),
      };
      this.data.quizzes.push(newQuiz);
      this.saveToDisk();
      return { rows: [newQuiz], rowCount: 1 };
    }

    if (upperQ.includes("FROM QUIZZES") && !upperQ.includes("DELETE")) {
      if (!this.data.quizzes) this.data.quizzes = [];
      let list = this.data.quizzes;
      if (params.length > 0 && params[0] !== undefined) {
        const idVal = Number(params[0]);
        if (upperQ.includes("COURSE_ID")) {
          list = list.filter(q => Number(q.course_id) === idVal);
        } else {
          list = list.filter(q => Number(q.id) === idVal);
        }
      }
      // Attach questions count
      const result = list.map(q => {
        const qCount = (this.data.quiz_questions || []).filter(qq => qq.quiz_id === q.id).length;
        return { ...q, questions_count: qCount };
      });
      return { rows: result, rowCount: result.length };
    }

    if (upperQ.includes("DELETE FROM QUIZZES")) {
      const targetId = Number(params[0]);
      if (!this.data.quizzes) this.data.quizzes = [];
      const idx = this.data.quizzes.findIndex(q => q.id === targetId);
      let removed = null;
      if (idx !== -1) {
        removed = this.data.quizzes.splice(idx, 1)[0];
        if (this.data.quiz_questions) {
          this.data.quiz_questions = this.data.quiz_questions.filter(qq => qq.quiz_id !== targetId);
        }
        this.saveToDisk();
      }
      return { rows: removed ? [removed] : [], rowCount: removed ? 1 : 0 };
    }

    if (upperQ.includes("INSERT INTO QUIZ_QUESTIONS")) {
      if (!this.data.quiz_questions) this.data.quiz_questions = [];
      const newQuestion = {
        id: this.data.quiz_questions.length + 1,
        quiz_id: Number(params[0]),
        question: params[1],
        option_a: params[2],
        option_b: params[3],
        option_c: params[4],
        option_d: params[5],
        correct_option: (params[6] || "A").toUpperCase(),
        created_at: new Date().toISOString(),
      };
      this.data.quiz_questions.push(newQuestion);
      this.saveToDisk();
      return { rows: [newQuestion], rowCount: 1 };
    }

    if (upperQ.includes("FROM QUIZ_QUESTIONS")) {
      if (!this.data.quiz_questions) this.data.quiz_questions = [];
      let list = this.data.quiz_questions;
      if (params.length > 0 && params[0] !== undefined) {
        const qId = Number(params[0]);
        list = list.filter(qq => Number(qq.quiz_id) === qId);
      }
      return { rows: list, rowCount: list.length };
    }

    if (upperQ.includes("INSERT INTO QUIZ_ATTEMPTS")) {
      if (!this.data.quiz_attempts) this.data.quiz_attempts = [];
      const newAttempt = {
        id: this.data.quiz_attempts.length + 1,
        student_id: Number(params[0]),
        quiz_id: Number(params[1]),
        score: Number(params[2]),
        created_at: new Date().toISOString(),
      };
      this.data.quiz_attempts.push(newAttempt);
      this.saveToDisk();
      return { rows: [newAttempt], rowCount: 1 };
    }

    // ----------------------------------------------------
    // ASSIGNMENTS MANAGEMENT
    // ----------------------------------------------------
    if (upperQ.includes("INSERT INTO ASSIGNMENTS")) {
      if (!this.data.assignments) this.data.assignments = [];
      const newAssignment = {
        id: this.data.assignments.length + 1,
        title: params[0] || "Assignment",
        description: params[1] || "",
        course_id: Number(params[2]),
        due_date: params[3] || null,
        max_marks: params[4] ? Number(params[4]) : 100,
        resource_url: params[5] || null,
        created_at: new Date().toISOString(),
      };
      this.data.assignments.push(newAssignment);
      this.saveToDisk();
      return { rows: [newAssignment], rowCount: 1 };
    }

    if (upperQ.includes("FROM ASSIGNMENTS") && !upperQ.includes("DELETE")) {
      if (!this.data.assignments) this.data.assignments = [];
      let list = this.data.assignments;
      if (params.length > 0 && params[0] !== undefined) {
        const idVal = Number(params[0]);
        if (upperQ.includes("COURSE_ID")) {
          list = list.filter(a => Number(a.course_id) === idVal);
        } else {
          list = list.filter(a => Number(a.id) === idVal);
        }
      }
      const result = list.map(a => {
        const subs = (this.data.assignment_submissions || []).filter(as => as.assignment_id === a.id);
        return { ...a, submissions_count: subs.length };
      });
      return { rows: result, rowCount: result.length };
    }

    if (upperQ.includes("DELETE FROM ASSIGNMENTS")) {
      const targetId = Number(params[0]);
      if (!this.data.assignments) this.data.assignments = [];
      const idx = this.data.assignments.findIndex(a => a.id === targetId);
      let removed = null;
      if (idx !== -1) {
        removed = this.data.assignments.splice(idx, 1)[0];
        if (this.data.assignment_submissions) {
          this.data.assignment_submissions = this.data.assignment_submissions.filter(as => as.assignment_id !== targetId);
        }
        this.saveToDisk();
      }
      return { rows: removed ? [removed] : [], rowCount: removed ? 1 : 0 };
    }

    if (upperQ.includes("INSERT INTO ASSIGNMENT_SUBMISSIONS")) {
      if (!this.data.assignment_submissions) this.data.assignment_submissions = [];
      const newSub = {
        id: this.data.assignment_submissions.length + 1,
        assignment_id: Number(params[0]),
        student_id: Number(params[1]),
        submission_url: params[2],
        notes: params[3] || "",
        status: "Submitted",
        created_at: new Date().toISOString(),
      };
      this.data.assignment_submissions.push(newSub);
      this.saveToDisk();
      return { rows: [newSub], rowCount: 1 };
    }

    if (upperQ.includes("FROM ASSIGNMENT_SUBMISSIONS")) {
      if (!this.data.assignment_submissions) this.data.assignment_submissions = [];
      let list = this.data.assignment_submissions;
      if (params.length > 0 && params[0] !== undefined) {
        const idVal = Number(params[0]);
        if (upperQ.includes("ASSIGNMENT_ID")) {
          list = list.filter(s => Number(s.assignment_id) === idVal);
        } else if (upperQ.includes("STUDENT_ID")) {
          list = list.filter(s => Number(s.student_id) === idVal);
        }
      }
      return { rows: list, rowCount: list.length };
    }

    // ----------------------------------------------------
    // ANALYTICS & AGGREGATE DASHBOARD QUERIES
    // ----------------------------------------------------
    if (upperQ.includes("SELECT COUNT(*)")) {
      if (upperQ.includes("FROM COURSES")) {
        return { rows: [{ count: this.data.courses?.length || 0 }], rowCount: 1 };
      }
      if (upperQ.includes("FROM STUDENTS")) {
        return { rows: [{ count: this.data.students?.length || 0 }], rowCount: 1 };
      }
      if (upperQ.includes("FROM LECTURES")) {
        return { rows: [{ count: this.data.lectures?.length || 0 }], rowCount: 1 };
      }
      if (upperQ.includes("FROM SECTIONS")) {
        return { rows: [{ count: this.data.sections?.length || 0 }], rowCount: 1 };
      }
      if (upperQ.includes("FROM USERS")) {
        let list = this.data.users || [];
        if (upperQ.includes("ROLE = 'STUDENT'") || (params && params.includes("student"))) {
          list = list.filter(u => u.role === "student");
        } else if (upperQ.includes("ROLE = 'TEACHER'") || (params && params.includes("teacher"))) {
          list = list.filter(u => u.role === "teacher");
        } else if (upperQ.includes("ROLE = 'ADMIN'") || (params && params.includes("admin"))) {
          list = list.filter(u => u.role === "admin");
        }
        return { rows: [{ count: list.length }], rowCount: 1 };
      }
      if (upperQ.includes("FROM ORDERS")) {
        return { rows: [{ count: this.data.orders?.length || 0 }], rowCount: 1 };
      }
      if (upperQ.includes("FROM PAYMENTS")) {
        return { rows: [{ count: this.data.payments?.length || 0 }], rowCount: 1 };
      }
      return { rows: [{ count: 0 }], rowCount: 1 };
    }

    if (upperQ.includes("SUM(AMOUNT)") || upperQ.includes("REVENUE")) {
      const payments = this.data.payments || [];
      const orders = this.data.orders || [];
      let total = 0;
      payments.forEach(p => {
        if (!p.status || p.status.toLowerCase() === "success" || p.status.toLowerCase() === "completed") {
          total += Number(p.amount) || 0;
        }
      });
      if (total === 0) {
        orders.forEach(o => {
          if (o.status === "paid" || o.status === "Success") {
            total += Number(o.amount) || 0;
          }
        });
      }
      return { rows: [{ revenue: total }], rowCount: 1 };
    }

    if (upperQ.includes("FROM STUDENTS")) {
      let list = [...(this.data.students || [])].reverse().map(st => {
        const u = (this.data.users || []).find(user => user.id === st.user_id) || {};
        return {
          ...st,
          avatar: u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(st.name || "Student")}&background=0B1220&color=06b6d4&bold=true`
        };
      });
      if (upperQ.includes("LIMIT 6") || upperQ.includes("LIMIT 5")) {
        list = list.slice(0, 6);
      }
      return { rows: list, rowCount: list.length };
    }

    if (upperQ.includes("FROM PAYMENTS")) {
      let list = (this.data.payments || []).map(p => {
        const user = (this.data.users || []).find(u => u.id === p.user_id) || {};
        const course = (this.data.courses || []).find(c => c.id === p.course_id) || {};
        return {
          id: p.id,
          amount: p.amount,
          status: p.status || "Success",
          created_at: p.created_at,
          razorpay_payment_id: p.razorpay_payment_id || `pay_${p.id}`,
          razorpay_order_id: p.razorpay_order_id || `order_${p.id}`,
          student_name: user.name || "Student",
          student_email: user.email || "",
          course_title: course.title || "Course Enrollment",
        };
      }).reverse();
      if (upperQ.includes("LIMIT 6") || upperQ.includes("LIMIT 5")) {
        list = list.slice(0, 6);
      }
      return { rows: list, rowCount: list.length };
    }

    return { rows: [], rowCount: 0 };
  }
}

const fallbackStore = new FallbackStore();

module.exports = fallbackStore;

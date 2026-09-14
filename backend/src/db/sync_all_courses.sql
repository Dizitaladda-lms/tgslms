-- =========================================================================
-- DIZITAL ADDA LMS - COMPLETE POSTGRESQL PRODUCTION DATABASE SEED & SYNC
-- Contains all 17 Authentic Month-Based Courses Across All 4 Core Domains:
--   1. Digital Marketing (4 Courses: 3M, 4M, 6M, 12M)
--   2. Cyber Security & Ethical Hacking (5 Courses: 4M, 4M, 4M, 6M, 12M)
--   3. Artificial Intelligence & Prompt Engg (3 Courses: 3M, 6M, 12M)
--   4. Data Science & Data Analytics (5 Courses: 3M, 6M, 6M, 12M, 12M)
-- =========================================================================

-- 1. Ensure Columns Exist in courses table
ALTER TABLE courses ADD COLUMN IF NOT EXISTS course_id VARCHAR(100);
ALTER TABLE courses ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'General';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS total_lectures INTEGER DEFAULT 0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS total_students INTEGER DEFAULT 0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS rating NUMERIC(3, 2) DEFAULT 4.9;

CREATE UNIQUE INDEX IF NOT EXISTS idx_courses_course_id ON courses(course_id);

-- 2. Insert or Update All 17 Courses

INSERT INTO courses (
  id, course_id, title, description, price, original_price,
  duration, level, category, teacher, teacher_id,
  thumbnail, is_published, total_lectures, total_students, rating
) VALUES (
  1, 'dm-advanced', 'Advanced Digital Marketing Course', '6-month Advanced Digital Marketing Course — 10 live brand campaigns, 54+ AI tools, Google & Meta certifications, and agency internship.', 18999, 35999,
  '6 Months', 'Advanced', 'Digital Marketing', 'Dr. Gulshan Kumar', 2,
  'https://dizitaladda.com/images/digital-marketing-institute.webp', true, 60, 1420, 4.9
)
ON CONFLICT (course_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  category = EXCLUDED.category,
  teacher = EXCLUDED.teacher,
  thumbnail = EXCLUDED.thumbnail,
  is_published = EXCLUDED.is_published,
  total_lectures = EXCLUDED.total_lectures,
  total_students = EXCLUDED.total_students,
  rating = EXCLUDED.rating,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO courses (
  id, course_id, title, description, price, original_price,
  duration, level, category, teacher, teacher_id,
  thumbnail, is_published, total_lectures, total_students, rating
) VALUES (
  2, 'dm-expert', 'Expert in Digital Marketing', '12-month master program with 70 comprehensive modules, 60+ AI tools, 10 live brand projects, paid agency internship, and 100% placement guarantee.', 34999, 69999,
  '12 Months', 'Expert', 'Digital Marketing', 'Dr. Gulshan Kumar', 2,
  'https://dizitaladda.com/images/digital-marketing-institute.webp', true, 70, 890, 4.9
)
ON CONFLICT (course_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  category = EXCLUDED.category,
  teacher = EXCLUDED.teacher,
  thumbnail = EXCLUDED.thumbnail,
  is_published = EXCLUDED.is_published,
  total_lectures = EXCLUDED.total_lectures,
  total_students = EXCLUDED.total_students,
  rating = EXCLUDED.rating,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO courses (
  id, course_id, title, description, price, original_price,
  duration, level, category, teacher, teacher_id,
  thumbnail, is_published, total_lectures, total_students, rating
) VALUES (
  3, 'dm-professionals', 'Digital Marketing Course for Professionals', 'A 4-month, 80+ hour hybrid digital marketing course for working professionals, career switchers, and business owners. Covers 40 modules including SEO, Google Ads, Meta Ads, Content Writing, WhatsApp & Email Marketing, Social Media, WordPress, Canva, Video Editing, GA4, Performance Marketing, Remarketing, and 50+ AI tools. Includes 10 live brand projects, paid internship, 10+ certifications, and 100% placement assistance.', 14999, 45000,
  '4 Months', 'Professional', 'Digital Marketing', 'Dr. Gulshan Kumar', 2,
  'https://dizitaladda.com/images/digital-marketing-institute.webp', true, 41, 1043, 4.9
)
ON CONFLICT (course_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  category = EXCLUDED.category,
  teacher = EXCLUDED.teacher,
  thumbnail = EXCLUDED.thumbnail,
  is_published = EXCLUDED.is_published,
  total_lectures = EXCLUDED.total_lectures,
  total_students = EXCLUDED.total_students,
  rating = EXCLUDED.rating,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO courses (
  id, course_id, title, description, price, original_price,
  duration, level, category, teacher, teacher_id,
  thumbnail, is_published, total_lectures, total_students, rating
) VALUES (
  4, 'dm-beginners', 'Digital Marketing for Beginners Course in Delhi', 'Updated test description', 25000, 30000,
  '3 Months', 'Beginner', 'Digital Marketing', 'Dr. Gulshan Kumar', 2,
  'https://dizitaladda.com/images/digital-marketing-institute.webp', true, 31, 2100, 4.9
)
ON CONFLICT (course_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  category = EXCLUDED.category,
  teacher = EXCLUDED.teacher,
  thumbnail = EXCLUDED.thumbnail,
  is_published = EXCLUDED.is_published,
  total_lectures = EXCLUDED.total_lectures,
  total_students = EXCLUDED.total_students,
  rating = EXCLUDED.rating,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO courses (
  id, course_id, title, description, price, original_price,
  duration, level, category, teacher, teacher_id,
  thumbnail, is_published, total_lectures, total_students, rating
) VALUES (
  5, 'data-analytics', 'Diploma in Data Analytics & AI | Job-Ready Program (NIDADS)', 'Complete 12-month National Diploma from NIDADS & Dizital Adda. Master Advanced Excel, SQL, Power BI, Tableau, Python EDA, and real portfolio capstones like Dark Store Demand Twin and Midnight Basket Drop.', 34999, 69999,
  '12 Months', 'Job-Ready Diploma', 'Data Analytics', 'Dr. Gulshan Kumar & Mr. Deepanshu Soni', 2,
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop', true, 87, 520, 4.9
)
ON CONFLICT (course_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  category = EXCLUDED.category,
  teacher = EXCLUDED.teacher,
  thumbnail = EXCLUDED.thumbnail,
  is_published = EXCLUDED.is_published,
  total_lectures = EXCLUDED.total_lectures,
  total_students = EXCLUDED.total_students,
  rating = EXCLUDED.rating,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO courses (
  id, course_id, title, description, price, original_price,
  duration, level, category, teacher, teacher_id,
  thumbnail, is_published, total_lectures, total_students, rating
) VALUES (
  6, 'cyber-advanced', 'Expert Training in Cyber Security & Ethical Hacking | DizitalAdda', 'Master 12-month Expert Cyber Security & Ethical Hacking with Dizital Adda. From Python automation, networking, and VAPT to digital forensics, reverse engineering, and Splunk SOC operations with Dr. Gulshan Kumar.', 95000, 135000,
  '12 Months', 'Expert / Professional', 'Cyber Security', 'Dr. Gulshan Kumar & Senior Security Architects', 2,
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop', true, 48, 480, 4.9
)
ON CONFLICT (course_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  category = EXCLUDED.category,
  teacher = EXCLUDED.teacher,
  thumbnail = EXCLUDED.thumbnail,
  is_published = EXCLUDED.is_published,
  total_lectures = EXCLUDED.total_lectures,
  total_students = EXCLUDED.total_students,
  rating = EXCLUDED.rating,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO courses (
  id, course_id, title, description, price, original_price,
  duration, level, category, teacher, teacher_id,
  thumbnail, is_published, total_lectures, total_students, rating
) VALUES (
  7, 'ai-expert', 'Diploma in Generative AI & Prompt Engineering', '12-Month / 288-hour comprehensive diploma program covering AI Foundations, Python & Data Science, Machine Learning, Deep Learning, NLP, Transformers, Generative AI, LangChain, Vector Databases, RAG, Low-Code AI Agents, Major Capstone Projects, and Career Placement.', 48000, 135000,
  '12 Months', 'Expert', 'Artificial Intelligence', 'Dr. Gulshan Kumar', 2,
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop', true, 60, 780, 4.9
)
ON CONFLICT (course_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  category = EXCLUDED.category,
  teacher = EXCLUDED.teacher,
  thumbnail = EXCLUDED.thumbnail,
  is_published = EXCLUDED.is_published,
  total_lectures = EXCLUDED.total_lectures,
  total_students = EXCLUDED.total_students,
  rating = EXCLUDED.rating,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO courses (
  id, course_id, title, description, price, original_price,
  duration, level, category, teacher, teacher_id,
  thumbnail, is_published, total_lectures, total_students, rating
) VALUES (
  8, 'data-science', 'Diploma in Data Science & AI | Master Track (NIDADS Flagship)', 'Flagship 12-month National Diploma from NIDADS & Dizital Adda. Master Python, Mathematical Statistics, Scikit-Learn ML, PyTorch Deep Learning, Distributed Apache Spark, LLMOps, and Production MLOps deployment.', 39999, 79999,
  '12 Months', 'Flagship Master Diploma', 'Data Science', 'Dr. Gulshan Kumar & Miss Shagun Shrivastav', 2,
  'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&auto=format&fit=crop', true, 43, 460, 4.9
)
ON CONFLICT (course_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  category = EXCLUDED.category,
  teacher = EXCLUDED.teacher,
  thumbnail = EXCLUDED.thumbnail,
  is_published = EXCLUDED.is_published,
  total_lectures = EXCLUDED.total_lectures,
  total_students = EXCLUDED.total_students,
  rating = EXCLUDED.rating,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO courses (
  id, course_id, title, description, price, original_price,
  duration, level, category, teacher, teacher_id,
  thumbnail, is_published, total_lectures, total_students, rating
) VALUES (
  9, 'cyber-foundation', 'Foundation in Cyber Security and Ethical Hacking', '4-month foundation course in cybersecurity, Python automation, Linux system hardening, and ethical hacking methodology with Dr. Gulshan Kumar.', 30000, 40000,
  '4 Months', 'Beginner', 'Cyber Security', 'Dr. Gulshan Kumar & Senior Security Architects', 2,
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop', true, 16, 230, 4.9
)
ON CONFLICT (course_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  category = EXCLUDED.category,
  teacher = EXCLUDED.teacher,
  thumbnail = EXCLUDED.thumbnail,
  is_published = EXCLUDED.is_published,
  total_lectures = EXCLUDED.total_lectures,
  total_students = EXCLUDED.total_students,
  rating = EXCLUDED.rating,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO courses (
  id, course_id, title, description, price, original_price,
  duration, level, category, teacher, teacher_id,
  thumbnail, is_published, total_lectures, total_students, rating
) VALUES (
  10, 'cyber-intermediate', 'Advanced Certification in Cyber Security and Ethical Hacking', '6-month intensive training in enterprise VAPT, web application pentesting, OWASP Top 10, digital forensics, and CEH certification prep.', 45000, 60000,
  '6 Months', 'Advanced', 'Cyber Security', 'Dr. Gulshan Kumar & Senior Security Architects', 2,
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop', true, 24, 310, 4.9
)
ON CONFLICT (course_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  category = EXCLUDED.category,
  teacher = EXCLUDED.teacher,
  thumbnail = EXCLUDED.thumbnail,
  is_published = EXCLUDED.is_published,
  total_lectures = EXCLUDED.total_lectures,
  total_students = EXCLUDED.total_students,
  rating = EXCLUDED.rating,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO courses (
  id, course_id, title, description, price, original_price,
  duration, level, category, teacher, teacher_id,
  thumbnail, is_published, total_lectures, total_students, rating
) VALUES (
  11, 'cyber-forensics', 'Certification in Digital Forensic and Cyber Investigation', '4-month specialization in cybercrime investigation, bit-stream disk imaging (FTK Imager), volatile memory forensics (Volatility), and court evidence dossiers.', 35000, 50000,
  '4 Months', 'Intermediate', 'Cyber Security', 'Dr. Gulshan Kumar & Senior Security Architects', 2,
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop', true, 16, 180, 4.9
)
ON CONFLICT (course_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  category = EXCLUDED.category,
  teacher = EXCLUDED.teacher,
  thumbnail = EXCLUDED.thumbnail,
  is_published = EXCLUDED.is_published,
  total_lectures = EXCLUDED.total_lectures,
  total_students = EXCLUDED.total_students,
  rating = EXCLUDED.rating,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO courses (
  id, course_id, title, description, price, original_price,
  duration, level, category, teacher, teacher_id,
  thumbnail, is_published, total_lectures, total_students, rating
) VALUES (
  12, 'cyber-bugbounty', 'Expert Training in Bug Bounty', '4-month intensive training in bug bounty hunting, OWASP Top 10 exploits (IDOR, SSRF, SQLi), API security, and HackerOne / Bugcrowd report writing.', 35000, 50000,
  '4 Months', 'Advanced', 'Cyber Security', 'Dr. Gulshan Kumar & Senior Security Architects', 2,
  'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&auto=format&fit=crop', true, 16, 195, 4.9
)
ON CONFLICT (course_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  category = EXCLUDED.category,
  teacher = EXCLUDED.teacher,
  thumbnail = EXCLUDED.thumbnail,
  is_published = EXCLUDED.is_published,
  total_lectures = EXCLUDED.total_lectures,
  total_students = EXCLUDED.total_students,
  rating = EXCLUDED.rating,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO courses (
  id, course_id, title, description, price, original_price,
  duration, level, category, teacher, teacher_id,
  thumbnail, is_published, total_lectures, total_students, rating
) VALUES (
  13, 'ai-6m-agents', 'Advanced Certification in Gen AI & Prompt Engineering', '6-Month intensive advanced certification covering Large Language Models (LLMs), Prompt Engineering frameworks (CoT, ReAct), LangChain, Multi-Agent systems, and AI workflows.', 34999, 60000,
  '6 Months', 'Advanced', 'Artificial Intelligence', 'Dr. Gulshan Kumar', 2,
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop', true, 48, 650, 4.9
)
ON CONFLICT (course_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  category = EXCLUDED.category,
  teacher = EXCLUDED.teacher,
  thumbnail = EXCLUDED.thumbnail,
  is_published = EXCLUDED.is_published,
  total_lectures = EXCLUDED.total_lectures,
  total_students = EXCLUDED.total_students,
  rating = EXCLUDED.rating,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO courses (
  id, course_id, title, description, price, original_price,
  duration, level, category, teacher, teacher_id,
  thumbnail, is_published, total_lectures, total_students, rating
) VALUES (
  14, 'ai-3m-prompt', 'Generative AI & Prompt Engineering for Professionals', '3-Month comprehensive program covering LLM Architectures, Advanced Prompt Frameworks (CoT, ReAct), Multimodal GenAI (Midjourney, Runway), AI Workplace Automation, and Capstone Assistants.', 19999, 39999,
  '3 Months', 'Beginner / Professional', 'Artificial Intelligence', 'Dr. Gulshan Kumar', 2,
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop', true, 6, 737, 4.9
)
ON CONFLICT (course_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  category = EXCLUDED.category,
  teacher = EXCLUDED.teacher,
  thumbnail = EXCLUDED.thumbnail,
  is_published = EXCLUDED.is_published,
  total_lectures = EXCLUDED.total_lectures,
  total_students = EXCLUDED.total_students,
  rating = EXCLUDED.rating,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO courses (
  id, course_id, title, description, price, original_price,
  duration, level, category, teacher, teacher_id,
  thumbnail, is_published, total_lectures, total_students, rating
) VALUES (
  15, 'ds-6m-ml', 'Advanced Certification in Data Science & AI Program', '6 Months Intensive NIDADS Program covering Python scientific stack, Mathematical Statistics, Scikit-Learn ML, PyTorch Deep Learning, and MLOps deployment.', 24999, 49999,
  '6 Months', 'Advanced', 'Data Science', 'Dr. Gulshan Kumar & Miss Shagun Shrivastav', 2,
  'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&auto=format&fit=crop', true, 20, 526, 4.9
)
ON CONFLICT (course_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  category = EXCLUDED.category,
  teacher = EXCLUDED.teacher,
  thumbnail = EXCLUDED.thumbnail,
  is_published = EXCLUDED.is_published,
  total_lectures = EXCLUDED.total_lectures,
  total_students = EXCLUDED.total_students,
  rating = EXCLUDED.rating,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO courses (
  id, course_id, title, description, price, original_price,
  duration, level, category, teacher, teacher_id,
  thumbnail, is_published, total_lectures, total_students, rating
) VALUES (
  16, 'da-6m-pro', 'Advanced Certification in Data Analytics & AI', '6 Months Intensive NIDADS Program covering Advanced SQL, Power BI DAX & Modeling, Python EDA, Business Statistics, and Tableau dashboards.', 18999, 38999,
  '6 Months', 'Advanced', 'Data Analytics', 'Dr. Gulshan Kumar & Mr. Deepanshu Soni', 2,
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop', true, 42, 457, 4.9
)
ON CONFLICT (course_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  category = EXCLUDED.category,
  teacher = EXCLUDED.teacher,
  thumbnail = EXCLUDED.thumbnail,
  is_published = EXCLUDED.is_published,
  total_lectures = EXCLUDED.total_lectures,
  total_students = EXCLUDED.total_students,
  rating = EXCLUDED.rating,
  updated_at = CURRENT_TIMESTAMP;

INSERT INTO courses (
  id, course_id, title, description, price, original_price,
  duration, level, category, teacher, teacher_id,
  thumbnail, is_published, total_lectures, total_students, rating
) VALUES (
  17, 'da-3m-bi', 'Certification in Data Analytics & AI', '3 Months Foundational NIDADS Program covering Advanced Excel modeling, SQL relational querying, and dynamic Power BI executive dashboards.', 9999, 24999,
  '3 Months', 'Beginner', 'Data Analytics', 'Dr. Gulshan Kumar & Mr. Deepanshu Soni', 2,
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop', true, 24, 737, 4.9
)
ON CONFLICT (course_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  duration = EXCLUDED.duration,
  level = EXCLUDED.level,
  category = EXCLUDED.category,
  teacher = EXCLUDED.teacher,
  thumbnail = EXCLUDED.thumbnail,
  is_published = EXCLUDED.is_published,
  total_lectures = EXCLUDED.total_lectures,
  total_students = EXCLUDED.total_students,
  rating = EXCLUDED.rating,
  updated_at = CURRENT_TIMESTAMP;

-- 3. Sections Synchronization

INSERT INTO sections (id, course_id, title, order_num)
VALUES (1, 1, 'Module 1: Digital Marketing Ecosystem & Strategy', 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (2, 1, 'Module 2: Advanced SEO & AI Search Optimization', 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (3, 1, 'Module 3: Google Ads & Performance Max Campaigns', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (4, 2, 'Module 1: Comprehensive Master Strategy & AI Suite', 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (5, 3, '1. Foundation — Digital Marketing Fundamentals', 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (6, 3, '2. Google Marketer Productivity Suite', 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (7, 3, '3. Google Web & Performance Products', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (8, 3, '4. Graphic Design with Canva & Canva AI', 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (9, 3, '5. Video Editing with Canva & Filmora', 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (10, 3, '6. Website Development with WordPress', 6)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (11, 3, '7. Content Writing & Copywriting', 7)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (12, 3, '8. Search Engine Optimization (SEO)', 8)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (13, 3, '9. Social Media Marketing (Organic)', 9)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (14, 3, '10. Meta Ads — Facebook & Instagram Advertising', 10)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (15, 3, '11. Google Ads — Search, Display & YouTube Campaigns', 11)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (16, 3, '12. WhatsApp & Email Marketing Automation', 12)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (17, 3, '13. Performance Marketing & GA4 Analytics', 13)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (18, 3, '14. Remarketing & Retargeting Mastery', 14)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (19, 3, '15. Freelancing, Agency Operations & Client Acquisition', 15)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (20, 4, '1. Foundation — Introduction to Digital Marketing & Internet Ecosystem', 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (21, 4, '2. Google Marketer Suite & Productivity', 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (22, 4, '3. Search Engine Optimization (SEO) Foundations', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (23, 4, '4. Google Ads & Search Engine Marketing (SEM)', 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (24, 4, '5. Meta Ads — Facebook & Instagram Advertising', 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (25, 4, '6. Social Media Marketing (Organic SMM)', 6)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (26, 4, '7. Content Writing, Copywriting & Storytelling', 7)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (27, 4, '8. Email Marketing Basics', 8)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (28, 4, '9. WhatsApp Marketing & Automation', 9)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (29, 4, '10. Graphic Design with Canva & Canva AI', 10)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (30, 4, '11. Video Editing for Reels, Shorts & YouTube', 11)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (31, 4, '12. WordPress Website Development Basics', 12)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (32, 4, '13. Web Analytics & Search Performance Tracking', 13)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (33, 4, '14. 40+ AI Tools, Freelancing & Career Launch', 14)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (34, 5, 'Month 1: Data Fundamentals', 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (35, 5, 'Month 2: Advanced Excel & Introduction to Business Intelligence', 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (36, 5, 'Month 3: Database Fundamentals & SQL', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (37, 5, 'Month 4: Introduction to Programming & Python', 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (38, 5, 'Month 5: Data Visualization & Storytelling', 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (39, 5, 'Month 6: Statistics & Data Analysis', 6)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (40, 5, 'Month 7: Advanced Data Analysis Techniques', 7)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (41, 5, 'Month 8: Automation & Efficiency', 8)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (42, 5, 'Month 9: Industry Applications & Case Studies', 9)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (43, 5, 'Month 10: Advanced Machine Learning Applications', 10)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (44, 5, 'Month 11: Specialization & Advanced Projects', 11)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (45, 5, 'Month 12: Capstone Project & Career Preparation', 12)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (46, 8, 'Month 1: Foundations & Setup', 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (47, 8, 'Month 2: Python for Data Science', 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (48, 8, 'Month 3: Data Visualization & Exploratory Data Analysis', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (49, 8, 'Month 4: Statistics & Probability', 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (50, 8, 'Month 5: SQL & NoSQL', 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (51, 8, 'Month 6: Machine Learning Fundamentals', 6)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (52, 8, 'Month 7: Advanced Machine Learning', 7)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (53, 8, 'Month 8: Deep Learning & Neural Networks', 8)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (54, 8, 'Month 9: Big Data & Cloud Computing', 9)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (55, 8, 'Month 10: Model Deployment & Production Systems', 10)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (56, 8, 'Month 11: Advanced Specializations & Capstone Project', 11)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (57, 8, 'Month 12: Career Preparation & Placement', 12)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (58, 6, 'Month 1: Foundation of Cyber Security & Python Automation', 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (59, 6, 'Month 2: Enterprise Networking & Packet Analysis', 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (60, 6, 'Month 3: Linux for Cybersecurity & System Hardening', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (61, 6, 'Month 4: Ethical Hacking Fundamentals & Footprinting', 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (62, 6, 'Month 5: Professional VAPT & Exploitation Frameworks', 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (63, 6, 'Month 6: Digital Forensics & Cyber Investigation (DFIR)', 6)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (64, 6, 'Month 7: Advanced Web App Pentesting & API Security', 7)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (65, 6, 'Month 8: Mobile Application Penetration Testing', 8)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (66, 6, 'Month 9: AWS Cloud Security & DevSecOps', 9)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (67, 6, 'Month 10: IoT Security & Hardware Exploitation', 10)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (68, 6, 'Month 11: Malware Reverse Engineering & Analysis', 11)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (69, 6, 'Month 12: Endpoint Security, SIEM & SOC Operations', 12)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (70, 9, 'Month 1: Foundation of Cyber Security & Python Automation', 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (71, 9, 'Month 2: Enterprise Networking & Packet Sniffing with Wireshark', 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (72, 9, 'Month 3: Linux for Cybersecurity & System Hardening', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (73, 9, 'Month 4: Ethical Hacking Fundamentals, Footprinting & Password Attacks', 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (74, 10, 'Month 1: Cyber Security Landscape & Advanced Python Security Tooling', 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (75, 10, 'Month 2: Enterprise Networking, Routing & Wireshark Triage', 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (76, 10, 'Month 3: Linux Security Auditing & Shell Scripting for Pentesters', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (77, 10, 'Month 4: Offensive Ethical Hacking & Active Directory Recon', 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (78, 10, 'Month 5: Vulnerability Assessment & Penetration Testing (VAPT)', 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (79, 10, 'Month 6: Digital & Cyber Forensic Investigation (DFIR) & Placement', 6)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (80, 11, 'Month 1: Fundamentals of Digital Forensics & Evidence Seizure', 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (81, 11, 'Month 2: File System Analysis & Deleted Artifact Carving', 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (82, 11, 'Month 3: Memory Forensics (Volatility) & Network Triage', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (83, 11, 'Month 4: Mobile Forensics, Cloud Artifacts & Expert Witness Reporting', 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (84, 12, 'Month 1: Advanced Reconnaissance & Target Surface Mapping', 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (85, 12, 'Month 2: Mastering OWASP Top 10 Exploitation', 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (86, 12, 'Month 3: API Security Testing & Authentication Flaws', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (87, 12, 'Month 4: Mobile Pentesting, Automation & Responsible Disclosure', 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (88, 4, 'Test Module: Marketing Strategy 2026 (Updated)', 15)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (89, 7, 'Month 1: AI Foundations & Setup', 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (90, 7, 'Month 2: Python Programming & Data Science', 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (91, 7, 'Month 3: Machine Learning Fundamentals', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (92, 7, 'Month 4: Natural Language Processing Foundations', 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (93, 7, 'Month 5: Deep Learning Fundamentals', 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (94, 7, 'Month 6: Advanced NLP & Transformers', 6)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (95, 7, 'Month 7: Generative AI Foundations & Prompt Engineering', 7)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (96, 7, 'Month 8: LangChain & LLM Orchestration', 8)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (97, 7, 'Month 9: Vector Databases & RAG Architecture', 9)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (98, 7, 'Month 10: Low-Code Agents & Automation', 10)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (99, 7, 'Month 11: Major Projects & Portfolio Development', 11)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (100, 7, 'Month 12: Career Preparation & Placement', 12)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (101, 14, 'Month 1: LLM Architecture & Prompt Engineering Mastery', 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (102, 14, 'Month 2: Multimodal Generative AI (Images, Video & Audio)', 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (103, 14, 'Month 3: Workplace Automation, Custom GPTs & Capstone', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (104, 15, 'Foundations & Setup', 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (105, 15, 'Advanced Machine Learning', 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (106, 15, 'Deep Learning & Neural Networks', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (107, 15, 'Statistical Techniques', 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (108, 15, 'AI Deployment & MLOps', 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (109, 16, 'Month 1: Foundation of Data Analytics', 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (110, 16, 'Month 2: Power BI & Data Visualization', 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (111, 16, 'Month 3: SQL for Data Analysis', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (112, 16, 'Month 4: Python for Data Analysis', 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (113, 16, 'Month 5: Statistics & Advanced Analytics', 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (114, 16, 'Month 6: Capstone Projects & Career Preparation', 6)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (115, 17, 'Month 1: Data & Excel Foundations', 1)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (116, 17, 'Month 2: Business Intelligence & Analytics', 2)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

INSERT INTO sections (id, course_id, title, order_num)
VALUES (117, 17, 'Month 3: Python Analytics & Career Preparation', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_num = EXCLUDED.order_num;

-- 4. Lectures Synchronization

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (1, 1, 1, '1.1 Introduction to the Performance Marketing Framework', 'Overview of customer journeys, acquisition funnels, and marketing technology stack.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '24:30', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (2, 1, 1, '1.2 Setting Up Your Digital Workspace & Tracking Pixels', 'Step-by-step setup of Google Tag Manager, GA4, Meta Pixel, and server-side tracking.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '32:15', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (3, 2, 1, '2.1 Semantic Search, Entity SEO & ChatGPT Automation', 'How modern search engines index entities and using AI agents for keyword clustering.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '45:00', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (4, 5, 3, '1.1 Introduction to Digital Marketing & Modern Landscape', 'Digital ecosystem evolution, online consumer mindsets, and inbound vs outbound channels.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (5, 5, 3, '1.2 Consumer Psychology & Buyer Persona Mapping', 'Understanding audience journey, micro-moments, and defining target customer avatars.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '28:30', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (6, 5, 3, '1.3 Market Research, Competitor Benchmarking & UVP', 'Competitive gap analysis, value propositions, and positioning frameworks.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '32:15', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (7, 5, 3, '1.4 Digital Marketing Funnels (TOFU, MOFU, BOFU)', 'Full-funnel customer acquisition, nurturing workflows, and retention strategy.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '30:00', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (8, 6, 3, '2.1 Google Workspace Cloud & Marketer Productivity', 'Mastering Drive, Docs, Sheets, and Slides for marketing plans and campaign reports.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '22:45', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (9, 6, 3, '2.2 Gemini AI & Google Business Tools Integration', 'Using Gemini AI inside Google Workspace for automated research, copy generation, and data synthesis.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '26:10', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (10, 7, 3, '3.1 Google Search Console Setup & Indexing Diagnostics', 'Submitting sitemaps, monitoring crawl status, resolving coverage errors, and tracking search queries.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '35:20', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (11, 7, 3, '3.2 Google Tag Manager (GTM) & Event Tracking', 'Creating tags, triggers, custom variables, and tracking conversions without developer dependency.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '38:45', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (12, 7, 3, '3.3 Google Trends & AdSense Publisher Fundamentals', 'Identifying breakout market trends and understanding publisher revenue monetization models.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '24:15', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (13, 8, 3, '4.1 Canva Workspace, Typography & Brand Identity', 'Building brand color palettes, visual harmony, typography rules, and custom logo design.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '27:50', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (14, 8, 3, '4.2 Social Media Creatives, Ad Banners & Thumbnails', 'Designing high-converting Instagram carousels, Facebook ad banners, and YouTube thumbnails.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '31:10', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (15, 8, 3, '4.3 Canva AI (Magic Studio) & Bulk Content Automation', 'Using AI image generation, Magic Eraser, bulk create workflows, and brand kit automation.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '29:40', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (16, 9, 3, '5.1 Video Editing Foundations & Timeline Architecture', 'Cuts, trims, sequencing, multi-track audio, and pacing principles for digital viewers.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '34:00', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (17, 9, 3, '5.2 High-Retention Instagram Reels & Shorts Editing', 'Adding dynamic captions, sound effects, B-rolls, visual hooks, and viral pacing.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '36:20', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (18, 9, 3, '5.3 Filmora Audio Cleanup, Color Grading & Video Ad Export', 'Audio equalization, noise removal, color grading presets, and export settings for all social platforms.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '30:15', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (19, 10, 3, '6.1 WordPress Architecture, Domains, DNS & Hosting Setup', 'Setting up hosting environments, installing WordPress, SSL configuration, and security.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '32:50', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (20, 10, 3, '6.2 Theme Customization & Elementor Visual Builder', 'Designing custom headers, footers, responsive landing pages, and lead capture forms.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '42:15', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (21, 10, 3, '6.3 Website Speed Optimization & Core Web Vitals', 'Caching plugins, image compression, CDN setup, and achieving green scores on Google PageSpeed.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '28:30', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (22, 11, 3, '7.1 Persuasive Copywriting Principles (AIDA, PAS & BAB)', 'Structuring ad copy, emotional triggers, curiosity hooks, and irresistible CTAs.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '29:10', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (23, 11, 3, '7.2 SEO Content Writing & Long-Form Articles', 'Writing rank-ready 2,000+ word guides with keyword density, header hierarchy, and internal linking.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '35:40', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (24, 11, 3, '7.3 AI-Assisted Writing with ChatGPT, Claude & Gemini', 'Prompt engineering for marketers: creating blog outlines, social calendars, and newsletter drafts.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '26:30', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (25, 12, 3, '8.1 Keyword Research & Search Intent Mining', 'Keyword research with Semrush, Ahrefs, and Google Keyword Planner. Intent classification.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '40:00', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (26, 12, 3, '8.2 On-Page SEO, Content Optimization & Schema Markup', 'Meta tags, H1-H6 structure, slug optimization, alt text, and JSON-LD schema generation.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '38:20', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (27, 12, 3, '8.3 Technical SEO, Sitemaps & Crawlability Audits', 'Robots.txt, XML sitemaps, canonical tags, 301 redirects, and Screaming Frog site crawls.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '36:15', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (28, 12, 3, '8.4 Off-Page SEO, Backlink Acquisition & Link Equity', 'White-hat link building, guest posting outreach, digital PR, and competitor backlink profiling.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '33:45', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (29, 12, 3, '8.5 Local SEO & Google Business Profile (GMB) Domination', 'GMB optimization, local citations, geo-tagged images, reviews strategy, and Google 3-pack ranking.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '31:00', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (30, 12, 3, '8.6 Search AI, Answer Engine Optimization (AEO) & LLMO', 'Optimizing for Google AI Overviews, Perplexity, ChatGPT Search, and brand entity authority.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '34:30', 6, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (31, 13, 3, '9.1 Social Media Algorithm Secrets (Meta & LinkedIn)', 'How ranking algorithms prioritize watch time, saves, shares, and meaningful interactions.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '27:40', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (32, 13, 3, '9.2 Content Strategy, Monthly Editorial Calendars & Growth', 'Theme buckets, carousel storytelling, hashtag strategy, and consistent publishing systems.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '30:15', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (33, 14, 3, '10.1 Meta Business Suite & Ad Account Infrastructure', 'Business manager setup, ad accounts, pixel integration, and domain verification.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '35:10', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (34, 14, 3, '10.2 Audience Targeting: Broad, Interests, Custom & Lookalikes', 'Building high-intent customer segments, LAL audiences, and exclusion lists.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '37:45', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (35, 14, 3, '10.3 Ad Creatives, Dynamic Creative Testing & Budget Scaling', 'CBO vs ABO, creative fatigue prevention, cost per acquisition (CPA) reduction, and ROAS scaling.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '39:20', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (36, 15, 3, '11.1 Google Search Ads & Match Types Architecture', 'Exact, phrase, broad match strategies, negative keywords, and quality score optimization.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '41:00', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (37, 15, 3, '11.2 Performance Max (PMax) & Display Network Campaigns', 'Asset groups, audience signals, responsive display ads, and Google partner placements.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '36:30', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (38, 15, 3, '11.3 YouTube Video Ads & Bidding Strategies', 'Skippable in-stream ads, bumper ads, target CPA vs maximize conversions, and conversion tracking.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '33:15', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (39, 16, 3, '12.1 WhatsApp Business API, Green Tick & Chatbots', 'Setting up official WABA, interactive message templates, broadcast compliance, and automated chatbots.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '29:40', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (40, 16, 3, '12.2 Email Marketing Automation, Lead Nurturing & Deliverability', 'Welcome drip series, abandoned cart recovery, newsletter templates, SPF/DKIM/DMARC authentication.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '31:50', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (41, 17, 3, '13.1 GA4 (Google Analytics 4) Deep Dive & Event Data Modeling', 'Event-based data model, user acquisition vs traffic acquisition, custom explorations, and funnels.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '44:10', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (42, 17, 3, '13.2 Looker Studio Executive Dashboard Creation', 'Connecting GA4, Google Ads, and Meta Ads to build automated client reporting dashboards.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '36:25', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (43, 18, 3, '14.1 Full-Funnel Retargeting Architecture & Frequency Capping', 'Cart abandoner retargeting, pageview retargeting sequences, dynamic catalog ads, and ROAS maximization.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '32:00', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (44, 19, 3, '15.1 Upwork & Fiverr Profile Optimization & Winning Proposals', 'High-converting proposal scripts, pricing your agency packages, handling objections, and international client contracts.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '38:00', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (45, 20, 4, '1.1 Introduction to Digital Marketing in 2026', 'Digital ecosystem evolution, online consumer mindsets, and digital career opportunities.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '20:00', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (46, 20, 4, '1.2 How Search Engines and the Internet Work', 'DNS, web servers, search crawlers, indexing, and ranking algorithms explained simply.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '24:15', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (47, 21, 4, '2.1 Google Workspace Tools for Digital Marketers', 'Setting up Google Drive, Docs, Sheets, Slides, Calendar, and Gemini AI for marketing tasks.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '22:30', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (48, 22, 4, '3.1 SEO Fundamentals — What is SEO and Why It Matters', 'Organic search vs paid search, search intent, and Google ranking factors.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '28:00', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (49, 22, 4, '3.2 On-Page SEO — Title Tags, Meta Descriptions & Keywords', 'Title tag architecture, meta descriptions, H1-H6 tags, keyword density, and image alt text.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '32:10', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (50, 22, 4, '3.3 Off-Page SEO — Backlinks and Domain Authority Basics', 'Understanding backlinks, do-follow vs no-follow, domain authority, and introductory link building.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '27:45', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (51, 22, 4, '3.4 Technical SEO — Site Speed and Mobile Optimisation', 'Basic technical factors, mobile responsiveness, XML sitemaps, and SSL security.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:30', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (52, 22, 4, '3.5 Local SEO and Google Business Profile Optimisation', 'Setting up and ranking on Google My Business, local citations, and Google Maps 3-Pack.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '30:00', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (53, 23, 4, '4.1 Google Ads — Introduction to Search Engine Marketing', 'How Google Search auction works, ad rank, quality score, and CPC bidding.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '26:40', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (54, 23, 4, '4.2 Google Ads — Setting Up Your First Search Campaign', 'Step-by-step account setup, keyword selection, ad copywriting, and launch.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '34:20', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (55, 24, 4, '5.1 Meta Ads — Introduction to Facebook & Instagram Advertising', 'Meta ad hierarchy, campaign objectives, placements, and pixel basics.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '28:15', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (56, 24, 4, '5.2 Meta Ads — Audience Research and Ad Creative Basics', 'Demographic and interest targeting, creating compelling image/video ads.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '31:00', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (57, 25, 4, '6.1 Social Media Marketing — Instagram Strategy and Reels', 'Bio optimization, aesthetic feeds, hashtags, and viral Instagram Reels structure.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '30:45', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (58, 25, 4, '6.2 Social Media Marketing — Facebook Pages and Groups', 'Community engagement, group monetization, and brand authority.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '24:00', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (59, 25, 4, '6.3 Social Media Marketing — LinkedIn Profile & Company Pages', 'Professional networking, B2B content marketing, and personal branding.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '26:30', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (60, 25, 4, '6.4 Social Media Marketing — YouTube Channel and Shorts', 'Channel setup, video thumbnails, tags, YouTube SEO, and Shorts retention.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '29:10', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (61, 26, 4, '7.1 Content Writing — SEO Blogs, Copywriting, and Storytelling', 'Headlines, persuasive structures, writing blog posts that rank, and social media captions.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '33:00', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (62, 27, 4, '8.1 Email Marketing — List Building and Campaign Design', 'Setting up Mailchimp, creating opt-in forms, welcome series, and newsletter design.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '27:15', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (63, 28, 4, '9.1 WhatsApp Marketing and Business Automation Basics', 'WhatsApp Business profile, quick replies, catalogs, labels, and broadcast lists.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '23:50', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (64, 29, 4, '10.1 Canva — Graphic Design for Social Media and Ads', 'Color palettes, typography, social media templates, ad banners, and Canva AI Magic tools.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '35:00', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (65, 30, 4, '11.1 Video Editing — Reels, Shorts, and YouTube Videos', 'Editing with Canva and Filmora/CapCut, pacing, captions, sound effects, and export formats.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '32:40', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (66, 31, 4, '12.1 WordPress — Building Your First Website', 'Domain, hosting, theme installation, building pages with Elementor, and contact forms.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '40:00', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (67, 32, 4, '13.1 Google Analytics 4 — Understanding Website Traffic', 'Users, sessions, engagement rate, traffic sources, and basic conversion tracking.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '31:15', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (68, 32, 4, '13.2 Google Search Console — Tracking SEO Performance', 'Impressions, clicks, average position, indexing queries, and sitemap submission.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '26:30', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (69, 33, 4, '14.1 AI Tools for Digital Marketers — ChatGPT, Gemini & Canva AI', 'AI prompting for marketing ideas, content calendars, and design generation.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '30:00', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (70, 33, 4, '14.2 Answer Engine Optimisation (AEO) — Introduction', 'How AI engines like Perplexity, ChatGPT and Google AI Overviews answer search queries.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '22:15', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (71, 33, 4, '14.3 Freelancing — Getting Your First Client on Fiverr and Upwork', 'Creating attractive service gigs, pricing, proposal scripts, and client communication.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '34:00', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (72, 33, 4, '14.4 Resume Building and LinkedIn Profile for Digital Marketers', 'Optimizing your resume with live projects, LinkedIn headline, and recruiter outreach.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '28:30', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (73, 33, 4, '14.5 Google and Meta Certification Preparation', 'Exam guidance and mock tests for Google Ads Search, GAIQ, and Meta certifications.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (74, 33, 4, '14.6 Career Roadmap — Jobs, Freelancing, and Business', 'Step-by-step 1-year career advancement plan for junior digital marketers.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '24:00', 6, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (75, null, 4, 'Test Verification: Local SEO & Google Business Profile Setup', 'Step-by-step local business profile ranking blueprint.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '30m', 31, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (76, 34, 5, 'Week 1: Introduction to Data & Excel Fundamentals (data types, career paths, Excel interface, rows/columns/worksheets)', 'Comprehensive hands-on lesson on Week 1: Introduction to Data & Excel Fundamentals (data types, career paths, Excel interface, rows/columns/worksheets). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (77, 34, 5, 'Practice Project: Personal Budget Tracker', 'Comprehensive hands-on lesson on Practice Project: Personal Budget Tracker. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (78, 34, 5, 'Week 2: Excel Formulas & Basic Functions (SUM, AVERAGE, COUNT, IF, AND/OR, CONCATENATE, TODAY/DATEDIF, error handling)', 'Comprehensive hands-on lesson on Week 2: Excel Formulas & Basic Functions (SUM, AVERAGE, COUNT, IF, AND/OR, CONCATENATE, TODAY/DATEDIF, error handling). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (79, 34, 5, 'Hands-on: Grade Calculator & Employee Timesheet + Assignment: Personal Expense Tracker', 'Comprehensive hands-on lesson on Hands-on: Grade Calculator & Employee Timesheet + Assignment: Personal Expense Tracker. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (80, 34, 5, 'Week 3: Data Organization & Basic Analysis (validation, sorting/filtering, conditional formatting, charts, data cleaning)', 'Comprehensive hands-on lesson on Week 3: Data Organization & Basic Analysis (validation, sorting/filtering, conditional formatting, charts, data cleaning). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (81, 34, 5, 'Mini Project: Sales Data Organization Dashboard', 'Comprehensive hands-on lesson on Mini Project: Sales Data Organization Dashboard. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 6, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (82, 34, 5, 'Week 4: Advanced Excel Functions & Pivot Tables (VLOOKUP/HLOOKUP, COUNTIF/SUMIF/AVERAGEIF, Pivot Tables & Charts)', 'Comprehensive hands-on lesson on Week 4: Advanced Excel Functions & Pivot Tables (VLOOKUP/HLOOKUP, COUNTIF/SUMIF/AVERAGEIF, Pivot Tables & Charts). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 7, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (83, 34, 5, 'Major Project: Retail Store Performance Analysis + Month 1 Assessment', 'Comprehensive hands-on lesson on Major Project: Retail Store Performance Analysis + Month 1 Assessment. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '45m', 8, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (84, 35, 5, 'Week 5: Excel Power Features (advanced Pivot Tables, Power Query, What-If Analysis, Goal Seek/Solver, dashboards)', 'Comprehensive hands-on lesson on Week 5: Excel Power Features (advanced Pivot Tables, Power Query, What-If Analysis, Goal Seek/Solver, dashboards). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (85, 35, 5, 'Practice Project: Monthly Sales Dashboard', 'Comprehensive hands-on lesson on Practice Project: Monthly Sales Dashboard. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (86, 35, 5, 'Week 6: Introduction to Power BI (BI overview, Power BI Desktop setup, data sources, basic visualizations)', 'Comprehensive hands-on lesson on Week 6: Introduction to Power BI (BI overview, Power BI Desktop setup, data sources, basic visualizations). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (87, 35, 5, 'Practice Project: Personal Finance Dashboard in Power BI', 'Comprehensive hands-on lesson on Practice Project: Personal Finance Dashboard in Power BI. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (88, 35, 5, 'Week 7: Power BI Data Modeling Basics (data models, relationships, calculated columns, measures, KPIs)', 'Comprehensive hands-on lesson on Week 7: Power BI Data Modeling Basics (data models, relationships, calculated columns, measures, KPIs). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (90, 35, 5, 'Week 8: Power BI Visualization & Sharing (advanced visuals, formatting, filters/slicers, publishing & sharing)', 'Comprehensive hands-on lesson on Week 8: Power BI Visualization & Sharing (advanced visuals, formatting, filters/slicers, publishing & sharing). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 7, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (91, 35, 5, 'Major Project: Company Performance Dashboard + Month 2 Assessment', 'Comprehensive hands-on lesson on Major Project: Company Performance Dashboard + Month 2 Assessment. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 8, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (92, 36, 5, 'Week 9: Introduction to Databases (databases vs spreadsheets, SQL intro, DBMS overview, setup)', 'Comprehensive hands-on lesson on Week 9: Introduction to Databases (databases vs spreadsheets, SQL intro, DBMS overview, setup). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (93, 36, 5, 'Practice Project: Personal Library Database', 'Comprehensive hands-on lesson on Practice Project: Personal Library Database. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (94, 36, 5, 'Week 10: Basic SQL Queries (SELECT, WHERE, ORDER BY, COUNT/SUM/AVG, DISTINCT, NULL handling)', 'Comprehensive hands-on lesson on Week 10: Basic SQL Queries (SELECT, WHERE, ORDER BY, COUNT/SUM/AVG, DISTINCT, NULL handling). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (95, 36, 5, 'Practice Project: Customer Database Queries', 'Comprehensive hands-on lesson on Practice Project: Customer Database Queries. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (96, 36, 5, 'Week 11: Intermediate SQL Operations (GROUP BY/HAVING, JOINs, subqueries, INSERT/UPDATE/DELETE)', 'Comprehensive hands-on lesson on Week 11: Intermediate SQL Operations (GROUP BY/HAVING, JOINs, subqueries, INSERT/UPDATE/DELETE). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (97, 36, 5, 'Mini Project: E-commerce Order Analysis', 'Comprehensive hands-on lesson on Mini Project: E-commerce Order Analysis. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '45m', 6, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (98, 36, 5, 'Week 12: SQL for Data Analysis (CASE statements, string/date functions, window functions, views)', 'Comprehensive hands-on lesson on Week 12: SQL for Data Analysis (CASE statements, string/date functions, window functions, views). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 7, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (99, 36, 5, 'Major Project: Customer Behavior Analysis with SQL + Month 3 Assessment', 'Comprehensive hands-on lesson on Major Project: Customer Behavior Analysis with SQL + Month 3 Assessment. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '45m', 8, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (100, 37, 5, 'Week 13: Programming Fundamentals (Python install/Anaconda, syntax, variables, Jupyter Notebooks)', 'Comprehensive hands-on lesson on Week 13: Programming Fundamentals (Python install/Anaconda, syntax, variables, Jupyter Notebooks). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (101, 37, 5, 'Practice Project: Simple Calculator in Python', 'Comprehensive hands-on lesson on Practice Project: Simple Calculator in Python. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (102, 37, 5, 'Week 14: Python Data Structures & Control Flow (lists, tuples, dictionaries, sets, loops, functions, file I/O)', 'Comprehensive hands-on lesson on Week 14: Python Data Structures & Control Flow (lists, tuples, dictionaries, sets, loops, functions, file I/O). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (103, 37, 5, 'Practice Project: Student Management System', 'Comprehensive hands-on lesson on Practice Project: Student Management System. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (104, 37, 5, 'Week 15: Introduction to Pandas (Series/DataFrame, loading CSV/Excel, inspection, filtering)', 'Comprehensive hands-on lesson on Week 15: Introduction to Pandas (Series/DataFrame, loading CSV/Excel, inspection, filtering). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (105, 37, 5, 'Mini Project: Movie Dataset Exploration', 'Comprehensive hands-on lesson on Mini Project: Movie Dataset Exploration. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 6, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (106, 37, 5, 'Week 16: Basic Data Analysis with Python (describe, grouping, missing data, Matplotlib basics)', 'Comprehensive hands-on lesson on Week 16: Basic Data Analysis with Python (describe, grouping, missing data, Matplotlib basics). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 7, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (107, 37, 5, 'Major Project: City Weather Data Analysis + Month 4 Assessment', 'Comprehensive hands-on lesson on Major Project: City Weather Data Analysis + Month 4 Assessment. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '45m', 8, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (108, 38, 5, 'Week 17: Advanced Excel Visualization (chart types, dashboard layouts, interactive charts, sparklines)', 'Comprehensive hands-on lesson on Week 17: Advanced Excel Visualization (chart types, dashboard layouts, interactive charts, sparklines). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (109, 38, 5, 'Practice Project: Regional Sales Performance Dashboard', 'Comprehensive hands-on lesson on Practice Project: Regional Sales Performance Dashboard. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (110, 38, 5, 'Week 18: Data Visualization Principles (effective viz, color theory, chart selection, storytelling)', 'Comprehensive hands-on lesson on Week 18: Data Visualization Principles (effective viz, color theory, chart selection, storytelling). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (111, 38, 5, 'Mini Project: Before and After Visualization Makeover', 'Comprehensive hands-on lesson on Mini Project: Before and After Visualization Makeover. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (112, 38, 5, 'Week 19: Python Visualization Libraries (Matplotlib, Seaborn, Plotly, styling & export)', 'Comprehensive hands-on lesson on Week 19: Python Visualization Libraries (Matplotlib, Seaborn, Plotly, styling & export). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (113, 38, 5, 'Practice Project: Data Visualization Dashboard', 'Comprehensive hands-on lesson on Practice Project: Data Visualization Dashboard. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '45m', 6, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (114, 38, 5, 'Week 20: Advanced Power BI Techniques (DAX basics, time intelligence, bookmarks, performance optimization)', 'Comprehensive hands-on lesson on Week 20: Advanced Power BI Techniques (DAX basics, time intelligence, bookmarks, performance optimization). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 7, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (115, 38, 5, 'Major Project: Executive Business Intelligence Dashboard + Month 5 Assessment', 'Comprehensive hands-on lesson on Major Project: Executive Business Intelligence Dashboard + Month 5 Assessment. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 8, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (116, 39, 5, 'Week 21: Statistics Fundamentals (central tendency, variability, distributions, percentiles)', 'Comprehensive hands-on lesson on Week 21: Statistics Fundamentals (central tendency, variability, distributions, percentiles). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (117, 39, 5, 'Practice Project: Employee Salary Analysis', 'Comprehensive hands-on lesson on Practice Project: Employee Salary Analysis. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (118, 39, 5, 'Week 22: Exploratory Data Analysis (EDA methodology, patterns, correlation, outlier detection)', 'Comprehensive hands-on lesson on Week 22: Exploratory Data Analysis (EDA methodology, patterns, correlation, outlier detection). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (119, 39, 5, 'Mini Project: Customer Demographics Analysis', 'Comprehensive hands-on lesson on Mini Project: Customer Demographics Analysis. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (120, 39, 5, 'Week 23: Introduction to Inferential Statistics (sampling, confidence intervals, hypothesis testing, t-tests, p-values)', 'Comprehensive hands-on lesson on Week 23: Introduction to Inferential Statistics (sampling, confidence intervals, hypothesis testing, t-tests, p-values). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (121, 39, 5, 'Practice Project: A/B Testing Analysis for Marketing', 'Comprehensive hands-on lesson on Practice Project: A/B Testing Analysis for Marketing. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '45m', 6, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (122, 39, 5, 'Week 24: Business Statistics Applications (quality control, segmentation, forecasting, risk analysis)', 'Comprehensive hands-on lesson on Week 24: Business Statistics Applications (quality control, segmentation, forecasting, risk analysis). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 7, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (123, 39, 5, 'Major Project: Business Performance Statistical Analysis + Month 6 Assessment', 'Comprehensive hands-on lesson on Major Project: Business Performance Statistical Analysis + Month 6 Assessment. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '45m', 8, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (124, 40, 5, 'Week 25: Advanced Pandas Operations (multi-indexing, advanced grouping, time series, merging)', 'Comprehensive hands-on lesson on Week 25: Advanced Pandas Operations (multi-indexing, advanced grouping, time series, merging). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (125, 40, 5, 'Practice Project: Multi-source Data Integration', 'Comprehensive hands-on lesson on Practice Project: Multi-source Data Integration. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (126, 40, 5, 'Week 26: Data Cleaning & Preprocessing (data quality framework, missing data, duplicates, validation rules)', 'Comprehensive hands-on lesson on Week 26: Data Cleaning & Preprocessing (data quality framework, missing data, duplicates, validation rules). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (127, 40, 5, 'Mini Project: Messy Dataset Cleanup Challenge', 'Comprehensive hands-on lesson on Mini Project: Messy Dataset Cleanup Challenge. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (128, 40, 5, 'Week 27: Introduction to Machine Learning Concepts (ML types, supervised vs unsupervised, scikit-learn)', 'Comprehensive hands-on lesson on Week 27: Introduction to Machine Learning Concepts (ML types, supervised vs unsupervised, scikit-learn). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (129, 40, 5, 'Practice Project: ML Concept Exploration', 'Comprehensive hands-on lesson on Practice Project: ML Concept Exploration. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 6, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (130, 40, 5, 'Week 28: Basic Predictive Modeling (linear & logistic regression, model training/testing, evaluation metrics)', 'Comprehensive hands-on lesson on Week 28: Basic Predictive Modeling (linear & logistic regression, model training/testing, evaluation metrics). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 7, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (131, 40, 5, 'Major Project: Sales Prediction Model + Month 7 Assessment', 'Comprehensive hands-on lesson on Major Project: Sales Prediction Model + Month 7 Assessment. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '45m', 8, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (132, 41, 5, 'Week 29: Excel Automation with Macros (VBA, recording macros, interfaces, automated reports)', 'Comprehensive hands-on lesson on Week 29: Excel Automation with Macros (VBA, recording macros, interfaces, automated reports). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (133, 41, 5, 'Practice Project: Automated Monthly Report Generator', 'Comprehensive hands-on lesson on Practice Project: Automated Monthly Report Generator. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (134, 41, 5, 'Week 30: Power Query & Data Transformation (advanced Power Query, M language, scheduled refresh)', 'Comprehensive hands-on lesson on Week 30: Power Query & Data Transformation (advanced Power Query, M language, scheduled refresh). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (135, 41, 5, 'Mini Project: Multi-source Data Integration Pipeline', 'Comprehensive hands-on lesson on Mini Project: Multi-source Data Integration Pipeline. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (136, 41, 5, 'Week 31: Python Automation for Data Tasks (file operations, openpyxl, email automation, task scheduling)', 'Comprehensive hands-on lesson on Week 31: Python Automation for Data Tasks (file operations, openpyxl, email automation, task scheduling). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (137, 41, 5, 'Practice Project: Automated Data Processing Pipeline', 'Comprehensive hands-on lesson on Practice Project: Automated Data Processing Pipeline. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '45m', 6, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (138, 41, 5, 'Week 32: Dashboard Automation & Performance (Power BI service automation, parameterized reports, mobile optimization)', 'Comprehensive hands-on lesson on Week 32: Dashboard Automation & Performance (Power BI service automation, parameterized reports, mobile optimization). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 7, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (139, 41, 5, 'Major Project: Enterprise-Level Automated Dashboard + Month 8 Assessment', 'Comprehensive hands-on lesson on Major Project: Enterprise-Level Automated Dashboard + Month 8 Assessment. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 8, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (140, 42, 5, 'Week 33: Retail & E-commerce Analytics (customer segmentation, sales analysis, market basket analysis, CLV)', 'Comprehensive hands-on lesson on Week 33: Retail & E-commerce Analytics (customer segmentation, sales analysis, market basket analysis, CLV). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (141, 42, 5, 'Week 34: Financial Data Analysis (financial KPIs, budget vs actual, trend analysis, risk assessment)', 'Comprehensive hands-on lesson on Week 34: Financial Data Analysis (financial KPIs, budget vs actual, trend analysis, risk assessment). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (142, 42, 5, 'Mini Project: Company Financial Health Dashboard', 'Comprehensive hands-on lesson on Mini Project: Company Financial Health Dashboard. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (143, 42, 5, 'Week 35: Marketing Analytics (campaign performance, attribution modeling, CAC, ROI/ROAS)', 'Comprehensive hands-on lesson on Week 35: Marketing Analytics (campaign performance, attribution modeling, CAC, ROI/ROAS). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (144, 42, 5, 'Practice Project: Marketing Campaign Effectiveness Analysis', 'Comprehensive hands-on lesson on Practice Project: Marketing Campaign Effectiveness Analysis. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (145, 42, 5, 'Week 36: HR & People Analytics (performance metrics, attrition analysis, recruitment analytics, D&I metrics)', 'Comprehensive hands-on lesson on Week 36: HR & People Analytics (performance metrics, attrition analysis, recruitment analytics, D&I metrics). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '45m', 6, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (146, 42, 5, 'Major Project: Comprehensive HR Analytics Dashboard', 'Comprehensive hands-on lesson on Major Project: Comprehensive HR Analytics Dashboard. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 7, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (147, 43, 5, 'Week 37: Classification Problems (decision trees, random forests, feature importance, imbalanced datasets)', 'Comprehensive hands-on lesson on Week 37: Classification Problems (decision trees, random forests, feature importance, imbalanced datasets). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (148, 43, 5, 'Practice Project: Customer Segmentation with ML', 'Comprehensive hands-on lesson on Practice Project: Customer Segmentation with ML. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (149, 43, 5, 'Week 38: Regression & Forecasting (multiple/polynomial regression, time series forecasting, seasonal decomposition)', 'Comprehensive hands-on lesson on Week 38: Regression & Forecasting (multiple/polynomial regression, time series forecasting, seasonal decomposition). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (150, 43, 5, 'Mini Project: Demand Forecasting System', 'Comprehensive hands-on lesson on Mini Project: Demand Forecasting System. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (151, 43, 5, 'Week 39: Clustering & Unsupervised Learning (K-means, hierarchical clustering, PCA, recommendation systems)', 'Comprehensive hands-on lesson on Week 39: Clustering & Unsupervised Learning (K-means, hierarchical clustering, PCA, recommendation systems). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4', '45m', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (152, 43, 5, 'Practice Project: Customer Behavior Clustering Analysis', 'Comprehensive hands-on lesson on Practice Project: Customer Behavior Clustering Analysis. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', '45m', 6, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (153, 43, 5, 'Week 40: Model Deployment Basics (saving/loading models, web interfaces, Excel/Power BI integration, monitoring)', 'Comprehensive hands-on lesson on Week 40: Model Deployment Basics (saving/loading models, web interfaces, Excel/Power BI integration, monitoring). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', '45m', 7, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (154, 43, 5, 'Major Project: End-to-End ML Solution for Business', 'Comprehensive hands-on lesson on Major Project: End-to-End ML Solution for Business. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4', '45m', 8, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (155, 44, 5, 'Week 41: Choose Your Specialization Track', 'Comprehensive hands-on lesson on Week 41: Choose Your Specialization Track. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (156, 44, 5, 'Track A: Business Intelligence Specialist (advanced Power BI, enterprise dashboards, data governance, BI strategy)', 'Comprehensive hands-on lesson on Track A: Business Intelligence Specialist (advanced Power BI, enterprise dashboards, data governance, BI strategy). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (157, 44, 5, 'Track B: Data Analysis & Reporting Expert (advanced Excel/automation, statistical mastery, stakeholder communication)', 'Comprehensive hands-on lesson on Track B: Data Analysis & Reporting Expert (advanced Excel/automation, statistical mastery, stakeholder communication). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (158, 44, 5, 'Track C: Beginner Data Scientist (advanced Python, more ML algorithms, feature engineering, model selection)', 'Comprehensive hands-on lesson on Track C: Beginner Data Scientist (advanced Python, more ML algorithms, feature engineering, model selection). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (159, 44, 5, 'Week 42: Specialization Project Development (deep dive, mentor guidance, advanced project, portfolio enhancement)', 'Comprehensive hands-on lesson on Week 42: Specialization Project Development (deep dive, mentor guidance, advanced project, portfolio enhancement). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', '45m', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (160, 45, 5, 'Week 43: Capstone Project Planning (scope definition, data acquisition, technical architecture, timeline)', 'Comprehensive hands-on lesson on Week 43: Capstone Project Planning (scope definition, data acquisition, technical architecture, timeline). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (161, 45, 5, 'Week 44: Project Finalization & Presentation (testing & optimization, presentation prep, peer review, portfolio integration)', 'Comprehensive hands-on lesson on Week 44: Project Finalization & Presentation (testing & optimization, presentation prep, peer review, portfolio integration). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (162, 45, 5, 'Week 45: Career Launch & Placement Preparation (resume/LinkedIn optimization, mock interviews, salary negotiation, alumni network)', 'Comprehensive hands-on lesson on Week 45: Career Launch & Placement Preparation (resume/LinkedIn optimization, mock interviews, salary negotiation, alumni network). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (163, 46, 8, 'Week 1: Welcome to Data Science World — definition, scope, roadmap, career paths (Data Scientist, Data Analyst, ML Engineer, Business Analyst), CRISP-DM workflow, and real-world DS applications (Netflix, Google, Uber, Amazon)', 'Comprehensive hands-on lesson on Week 1: Welcome to Data Science World — definition, scope, roadmap, career paths (Data Scientist, Data Analyst, ML Engineer, Business Analyst), CRISP-DM workflow, and real-world DS applications (Netflix, Google, Uber, Amazon). In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', '45m', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (164, 46, 8, 'Week 2: Essential Tools & Environment Setup — Python vs SQL, IDE ecosystem (Anaconda, Jupyter, VS Code, Colab), GPU/TPU usage and Colab collaboration features', 'Comprehensive hands-on lesson on Week 2: Essential Tools & Environment Setup — Python vs SQL, IDE ecosystem (Anaconda, Jupyter, VS Code, Colab), GPU/TPU usage and Colab collaboration features. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (165, 46, 8, 'Week 3: GitHub Foundation — version control, Git vs GitHub, repository management, README writing, issue tracking, forking/pull requests, and GitHub Pages portfolio creation', 'Comprehensive hands-on lesson on Week 3: GitHub Foundation — version control, Git vs GitHub, repository management, README writing, issue tracking, forking/pull requests, and GitHub Pages portfolio creation. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (166, 46, 8, 'Week 4: Excel Foundation — interface, formulas, pivot tables/charts, data validation, basic macros, and data import/export', 'Comprehensive hands-on lesson on Week 4: Excel Foundation — interface, formulas, pivot tables/charts, data validation, basic macros, and data import/export. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (167, 46, 8, 'Project 1: Business Data Dashboard — data cleaning, SUM/AVERAGE/VLOOKUP/IF formulas, dynamic charts, interactive pivot tables, and professional reporting', 'Comprehensive hands-on lesson on Project 1: Business Data Dashboard — data cleaning, SUM/AVERAGE/VLOOKUP/IF formulas, dynamic charts, interactive pivot tables, and professional reporting. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', '8 hours', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (168, 47, 8, 'Week 5-6: Data Structures & NumPy — lists, tuples, dictionaries, sets, array operations, broadcasting, and linear algebra functions', 'Comprehensive hands-on lesson on Week 5-6: Data Structures & NumPy — lists, tuples, dictionaries, sets, array operations, broadcasting, and linear algebra functions. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '2 Weeks', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (169, 47, 8, 'Project 2: Student Grade Analysis System — data structure implementation, statistical calculations with NumPy, grade distribution and performance metrics', 'Comprehensive hands-on lesson on Project 2: Student Grade Analysis System — data structure implementation, statistical calculations with NumPy, grade distribution and performance metrics. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (170, 47, 8, 'Week 7-8: Pandas Foundation — DataFrames and Series, loading data from multiple sources, data cleaning/preprocessing, grouping, merging and reshaping', 'Comprehensive hands-on lesson on Week 7-8: Pandas Foundation — DataFrames and Series, loading data from multiple sources, data cleaning/preprocessing, grouping, merging and reshaping. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '2 Weeks', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (171, 48, 8, 'Week 9-10: Visualization Foundations — principles of effective visualization, Matplotlib fundamentals, Seaborn statistical plots, and chart-type selection', 'Comprehensive hands-on lesson on Week 9-10: Visualization Foundations — principles of effective visualization, Matplotlib fundamentals, Seaborn statistical plots, and chart-type selection. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', '2 Weeks', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (172, 48, 8, 'Project 4: Sales Performance Visualization Suite — multi-dimensional visualization, interactive dashboards, executive summary reports', 'Comprehensive hands-on lesson on Project 4: Sales Performance Visualization Suite — multi-dimensional visualization, interactive dashboards, executive summary reports. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (173, 48, 8, 'Week 11-12: Advanced Visualization & EDA — Plotly interactive visualizations, geographical data visualization, and EDA techniques', 'Comprehensive hands-on lesson on Week 11-12: Advanced Visualization & EDA — Plotly interactive visualizations, geographical data visualization, and EDA techniques. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', '2 Weeks', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (174, 48, 8, 'Major Project 5: E-commerce Customer Behavior Analysis — full EDA workflow, customer segmentation visualization, business insights, presentation-ready dashboards', 'Comprehensive hands-on lesson on Major Project 5: E-commerce Customer Behavior Analysis — full EDA workflow, customer segmentation visualization, business insights, presentation-ready dashboards. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', '10 hours', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (175, 49, 8, 'Week 13-14: Descriptive Statistics — central tendency, dispersion, probability distributions, correlation/covariance, hypothesis testing fundamentals', 'Comprehensive hands-on lesson on Week 13-14: Descriptive Statistics — central tendency, dispersion, probability distributions, correlation/covariance, hypothesis testing fundamentals. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', '2 Weeks', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (176, 49, 8, 'Week 15-16: Inferential Statistics — confidence intervals, t-tests, ANOVA, Chi-square tests, Bayesian statistics intro, and A/B testing methodology', 'Comprehensive hands-on lesson on Week 15-16: Inferential Statistics — confidence intervals, t-tests, ANOVA, Chi-square tests, Bayesian statistics intro, and A/B testing methodology. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', '2 Weeks', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (177, 49, 8, 'Major Project 6: Marketing Campaign Effectiveness Analysis — statistical significance testing, campaign performance metrics, ROI analysis and recommendations', 'Comprehensive hands-on lesson on Major Project 6: Marketing Campaign Effectiveness Analysis — statistical significance testing, campaign performance metrics, ROI analysis and recommendations. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4', '10 hours', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (178, 50, 8, 'Week 17-18: SQL Fundamentals — database design principles, SQL syntax/operations, joins, subqueries, window functions, database optimization', 'Comprehensive hands-on lesson on Week 17-18: SQL Fundamentals — database design principles, SQL syntax/operations, joins, subqueries, window functions, database optimization. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '2 Weeks', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (179, 50, 8, 'Week 19-20: Advanced SQL & NoSQL — advanced SQL functions, stored procedures and triggers, introduction to NoSQL with MongoDB', 'Comprehensive hands-on lesson on Week 19-20: Advanced SQL & NoSQL — advanced SQL functions, stored procedures and triggers, introduction to NoSQL with MongoDB. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '2 Weeks', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (180, 50, 8, 'Major Project 7: Retail Inventory Management System — database design, complex query optimization, real-time data processing, performance analytics dashboard', 'Comprehensive hands-on lesson on Major Project 7: Retail Inventory Management System — database design, complex query optimization, real-time data processing, performance analytics dashboard. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '10 hours', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (181, 51, 8, 'Week 21-22: ML Foundations — introduction to ML, supervised/unsupervised/reinforcement learning, train-test split, cross-validation, model evaluation metrics', 'Comprehensive hands-on lesson on Week 21-22: ML Foundations — introduction to ML, supervised/unsupervised/reinforcement learning, train-test split, cross-validation, model evaluation metrics. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', '2 Weeks', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (182, 51, 8, 'Week 23-24: Supervised Learning — linear and logistic regression, decision trees, random forest, support vector machines, k-nearest neighbors', 'Comprehensive hands-on lesson on Week 23-24: Supervised Learning — linear and logistic regression, decision trees, random forest, support vector machines, k-nearest neighbors. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', '2 Weeks', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (183, 51, 8, 'Major Project 8: Prediction Model — feature engineering, model selection and tuning, performance optimization, deployment pipeline', 'Comprehensive hands-on lesson on Major Project 8: Prediction Model — feature engineering, model selection and tuning, performance optimization, deployment pipeline. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4', '10 hours', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (184, 52, 8, 'Week 25-26: Unsupervised Learning — K-Means and hierarchical clustering, Principal Component Analysis (PCA), association rule mining, anomaly detection', 'Comprehensive hands-on lesson on Week 25-26: Unsupervised Learning — K-Means and hierarchical clustering, Principal Component Analysis (PCA), association rule mining, anomaly detection. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '2 Weeks', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (185, 52, 8, 'Week 27-28: Ensemble Methods & Model Optimization — bagging and boosting, XGBoost and LightGBM, hyperparameter tuning, feature selection techniques', 'Comprehensive hands-on lesson on Week 27-28: Ensemble Methods & Model Optimization — bagging and boosting, XGBoost and LightGBM, hyperparameter tuning, feature selection techniques. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '2 Weeks', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (186, 52, 8, 'Major Project 9: Customer Segmentation & Recommendation System — clustering implementation, recommendation algorithms, business strategy development', 'Comprehensive hands-on lesson on Major Project 9: Customer Segmentation & Recommendation System — clustering implementation, recommendation algorithms, business strategy development. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '10 hours', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (187, 53, 8, 'Week 29-30: Neural Network Fundamentals — perceptrons, multi-layer networks, backpropagation, activation functions/optimizers, TensorFlow & Keras introduction', 'Comprehensive hands-on lesson on Week 29-30: Neural Network Fundamentals — perceptrons, multi-layer networks, backpropagation, activation functions/optimizers, TensorFlow & Keras introduction. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', '2 Weeks', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (188, 53, 8, 'Week 31-32: Deep Learning Applications — Convolutional Neural Networks (CNN), Recurrent Neural Networks (RNN/LSTM), transfer learning, model deployment strategies', 'Comprehensive hands-on lesson on Week 31-32: Deep Learning Applications — Convolutional Neural Networks (CNN), Recurrent Neural Networks (RNN/LSTM), transfer learning, model deployment strategies. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', '2 Weeks', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (189, 53, 8, 'Major Project 10: Image Classification & Sentiment Analysis — CNN for image recognition, RNN for text analysis, model comparison and optimization', 'Comprehensive hands-on lesson on Major Project 10: Image Classification & Sentiment Analysis — CNN for image recognition, RNN for text analysis, model comparison and optimization. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4', '10 hours', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (190, 54, 8, 'Week 33-34: Big Data Fundamentals & Apache Spark — the 4 Vs of Big Data, distributed computing, Spark architecture, PySpark (RDDs/DataFrames/Datasets), Spark SQL, data partitioning and optimization', 'Comprehensive hands-on lesson on Week 33-34: Big Data Fundamentals & Apache Spark — the 4 Vs of Big Data, distributed computing, Spark architecture, PySpark (RDDs/DataFrames/Datasets), Spark SQL, data partitioning and optimization. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '2 Weeks', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (191, 54, 8, 'Hands-on: Spark environment setup (local & cluster), RDD operations, DataFrame API, performance tuning and memory management', 'Comprehensive hands-on lesson on Hands-on: Spark environment setup (local & cluster), RDD operations, DataFrame API, performance tuning and memory management. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (192, 54, 8, 'Week 35-36: Cloud Platforms & MLOps Introduction — AWS/GCP/Azure fundamentals, IaaS vs PaaS, Docker, Kubernetes for ML workloads, MLOps principles, model versioning and experiment tracking', 'Comprehensive hands-on lesson on Week 35-36: Cloud Platforms & MLOps Introduction — AWS/GCP/Azure fundamentals, IaaS vs PaaS, Docker, Kubernetes for ML workloads, MLOps principles, model versioning and experiment tracking. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '2 Weeks', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (193, 54, 8, 'Major Project 12: Scalable ML Pipeline on Cloud — end-to-end ML pipeline, automated training/evaluation, cloud-based deployment, monitoring/alerting, cost optimization', 'Comprehensive hands-on lesson on Major Project 12: Scalable ML Pipeline on Cloud — end-to-end ML pipeline, automated training/evaluation, cloud-based deployment, monitoring/alerting, cost optimization. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '10 hours', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (194, 55, 8, 'Week 37-38: Model Deployment Strategies — deployment lifecycle, RESTful APIs with Flask and FastAPI, model serialization (Pickle, Joblib, ONNX), containerization, load balancing and scaling, API documentation', 'Comprehensive hands-on lesson on Week 37-38: Model Deployment Strategies — deployment lifecycle, RESTful APIs with Flask and FastAPI, model serialization (Pickle, Joblib, ONNX), containerization, load balancing and scaling, API documentation. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '2 Weeks', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (195, 55, 8, 'Hands-on: API Development Workshop — building RESTful ML APIs, request/response handling, input validation, Swagger/OpenAPI documentation', 'Comprehensive hands-on lesson on Hands-on: API Development Workshop — building RESTful ML APIs, request/response handling, input validation, Swagger/OpenAPI documentation. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (196, 55, 8, 'Week 39-40: Production Monitoring & Maintenance — model performance monitoring, data drift/model decay detection, A/B testing, CI/CD, retraining strategies, production troubleshooting', 'Comprehensive hands-on lesson on Week 39-40: Production Monitoring & Maintenance — model performance monitoring, data drift/model decay detection, A/B testing, CI/CD, retraining strategies, production troubleshooting. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '2 Weeks', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (197, 55, 8, 'DevOps Integration: Git workflows for ML projects, automated testing, GitHub Actions for CI/CD, model registry/version control, rollback and disaster recovery', 'Comprehensive hands-on lesson on DevOps Integration: Git workflows for ML projects, automated testing, GitHub Actions for CI/CD, model registry/version control, rollback and disaster recovery. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (198, 56, 8, 'Week 41-42: Advanced Machine Learning & AI — advanced ensemble techniques, AutoML and Neural Architecture Search, Federated Learning, Explainable AI (XAI), Reinforcement Learning fundamentals', 'Comprehensive hands-on lesson on Week 41-42: Advanced Machine Learning & AI — advanced ensemble techniques, AutoML and Neural Architecture Search, Federated Learning, Explainable AI (XAI), Reinforcement Learning fundamentals. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '2 Weeks', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (199, 56, 8, 'Specialized Projects: AutoML pipeline development, Explainable AI dashboard, Reinforcement learning game agent', 'Comprehensive hands-on lesson on Specialized Projects: AutoML pipeline development, Explainable AI dashboard, Reinforcement learning game agent. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (200, 56, 8, 'Major Project 13: Production-Ready ML System — complete MLOps pipeline, automated deployment, real-time monitoring dashboard, A/B testing framework, performance optimization, documentation', 'Comprehensive hands-on lesson on Major Project 13: Production-Ready ML System — complete MLOps pipeline, automated deployment, real-time monitoring dashboard, A/B testing framework, performance optimization, documentation. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '10 hours', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (201, 56, 8, 'Week 43-44: Capstone Project Development — choose E-commerce Recommendation Engine, Financial Risk Management Platform, or Supply Chain Optimization System; planning, implementation, testing and documentation', 'Comprehensive hands-on lesson on Week 43-44: Capstone Project Development — choose E-commerce Recommendation Engine, Financial Risk Management Platform, or Supply Chain Optimization System; planning, implementation, testing and documentation. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '2 Weeks', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (202, 57, 8, 'Week 45: Portfolio & Resume Building — GitHub portfolio optimization, ATS-friendly resume development, LinkedIn profile enhancement', 'Comprehensive hands-on lesson on Week 45: Portfolio & Resume Building — GitHub portfolio optimization, ATS-friendly resume development, LinkedIn profile enhancement. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (203, 57, 8, 'Week 46: Technical Interview Preparation — coding challenges (DSA, Python, SQL), ML algorithm explanations, statistics & probability, system design basics, mock technical interviews', 'Comprehensive hands-on lesson on Week 46: Technical Interview Preparation — coding challenges (DSA, Python, SQL), ML algorithm explanations, statistics & probability, system design basics, mock technical interviews. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (204, 57, 8, 'Week 47: Aptitude, Logical Reasoning & Behavioral Prep — quantitative aptitude, data interpretation, STAR method training, salary negotiation, full mock interview simulations', 'Comprehensive hands-on lesson on Week 47: Aptitude, Logical Reasoning & Behavioral Prep — quantitative aptitude, data interpretation, STAR method training, salary negotiation, full mock interview simulations. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (205, 57, 8, 'Week 48: Placement Preparation & Career Launch — industry networking, job portal registration, referral/alumni network building, personality development, final project presentation and certification', 'Comprehensive hands-on lesson on Week 48: Placement Preparation & Career Launch — industry networking, job portal registration, referral/alumni network building, personality development, final project presentation and certification. In-depth practice, datasets, and mentor guidance from NIDADS.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (206, 58, 6, 'Week 1: Cybersecurity Landscape, Threat Modeling & CIA Triad', 'Hands-on masterclass lecture on Week 1: Cybersecurity Landscape, Threat Modeling & CIA Triad. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (207, 58, 6, 'Week 2: Python Scripting for Security & Automation', 'Hands-on masterclass lecture on Week 2: Python Scripting for Security & Automation. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (208, 58, 6, 'Week 3: Socket Programming & Building Multi-Threaded Port Scanner', 'Hands-on masterclass lecture on Week 3: Socket Programming & Building Multi-Threaded Port Scanner. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (209, 58, 6, 'Week 4: Automating OSINT & Reconnaissance Scripts with Python', 'Hands-on masterclass lecture on Week 4: Automating OSINT & Reconnaissance Scripts with Python. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (210, 59, 6, 'Week 5: OSI 7-Layer, Subnetting & Enterprise TCP/IP Protocols', 'Hands-on masterclass lecture on Week 5: OSI 7-Layer, Subnetting & Enterprise TCP/IP Protocols. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (211, 59, 6, 'Week 6: Deep Packet Inspection & Traffic Analysis with Wireshark', 'Hands-on masterclass lecture on Week 6: Deep Packet Inspection & Traffic Analysis with Wireshark. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (212, 59, 6, 'Week 7: Network Protocols Vulnerabilities (ARP Poisoning, DNS Spoofing)', 'Hands-on masterclass lecture on Week 7: Network Protocols Vulnerabilities (ARP Poisoning, DNS Spoofing). Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (213, 59, 6, 'Week 8: Next-Gen Firewalls (pfSense), IDS/IPS & Network Hardening', 'Hands-on masterclass lecture on Week 8: Next-Gen Firewalls (pfSense), IDS/IPS & Network Hardening. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (214, 60, 6, 'Week 9: Linux Architecture, Permissions & Privilege Model', 'Hands-on masterclass lecture on Week 9: Linux Architecture, Permissions & Privilege Model. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (215, 60, 6, 'Week 10: Advanced Bash Scripting for Red Team Reconnaissance', 'Hands-on masterclass lecture on Week 10: Advanced Bash Scripting for Red Team Reconnaissance. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (216, 60, 6, 'Week 11: Linux Privilege Escalation Vectors (SUID, Sudo, Cron)', 'Hands-on masterclass lecture on Week 11: Linux Privilege Escalation Vectors (SUID, Sudo, Cron). Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (217, 60, 6, 'Week 12: System Hardening, Auditd & CIS Benchmark Implementation', 'Hands-on masterclass lecture on Week 12: System Hardening, Auditd & CIS Benchmark Implementation. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (218, 61, 6, 'Week 13: Active & Passive Reconnaissance with Nmap, Amass & Shodan', 'Hands-on masterclass lecture on Week 13: Active & Passive Reconnaissance with Nmap, Amass & Shodan. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (219, 61, 6, 'Week 14: Vulnerability Scanning & Risk Rating (Nessus, OpenVAS, CVSS)', 'Hands-on masterclass lecture on Week 14: Vulnerability Scanning & Risk Rating (Nessus, OpenVAS, CVSS). Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (220, 61, 6, 'Week 15: Password Attacks, Hash Cracking & Wordlist Generation (John, Hashcat)', 'Hands-on masterclass lecture on Week 15: Password Attacks, Hash Cracking & Wordlist Generation (John, Hashcat). Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (221, 61, 6, 'Week 16: Foundation Capstone: Isolated Enterprise Target Vulnerability Assessment', 'Hands-on masterclass lecture on Week 16: Foundation Capstone: Isolated Enterprise Target Vulnerability Assessment. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (222, 62, 6, 'Week 17: Metasploit Unleashed: Exploits, Payloads, Meterpreter & Encoders', 'Hands-on masterclass lecture on Week 17: Metasploit Unleashed: Exploits, Payloads, Meterpreter & Encoders. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (223, 62, 6, 'Week 18: OWASP Top 10 Exploitation: SQL Injection & Cross-Site Scripting (XSS)', 'Hands-on masterclass lecture on Week 18: OWASP Top 10 Exploitation: SQL Injection & Cross-Site Scripting (XSS). Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (224, 62, 6, 'Week 19: Advanced Burp Suite Pro: Intruder, Repeater & Custom Extensions', 'Hands-on masterclass lecture on Week 19: Advanced Burp Suite Pro: Intruder, Repeater & Custom Extensions. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (225, 62, 6, 'Week 20: Professional VAPT Deliverables: Executive Reports & Remediation Roadmaps', 'Hands-on masterclass lecture on Week 20: Professional VAPT Deliverables: Executive Reports & Remediation Roadmaps. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (226, 63, 6, 'Week 21: Digital Evidence Preservation, Hash Verification & Chain of Custody', 'Hands-on masterclass lecture on Week 21: Digital Evidence Preservation, Hash Verification & Chain of Custody. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (227, 63, 6, 'Week 22: Live RAM Extraction & Volatility Framework Memory Analysis', 'Hands-on masterclass lecture on Week 22: Live RAM Extraction & Volatility Framework Memory Analysis. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (228, 63, 6, 'Week 23: Disk Forensics & File System Carving with Autopsy & FTK Imager', 'Hands-on masterclass lecture on Week 23: Disk Forensics & File System Carving with Autopsy & FTK Imager. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (229, 63, 6, 'Week 24: Mid-Term Capstone: Enterprise Incident Containment & Forensic Case', 'Hands-on masterclass lecture on Week 24: Mid-Term Capstone: Enterprise Incident Containment & Forensic Case. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (230, 64, 6, 'Week 25: REST & GraphQL API Penetration Testing (Postman, OWASP API Top 10)', 'Hands-on masterclass lecture on Week 25: REST & GraphQL API Penetration Testing (Postman, OWASP API Top 10). Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (231, 64, 6, 'Week 26: Broken Object Level Authorization (BOLA) & Authentication Bypass', 'Hands-on masterclass lecture on Week 26: Broken Object Level Authorization (BOLA) & Authentication Bypass. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (232, 64, 6, 'Week 27: Server-Side Template Injection (SSTI) & Remote Code Execution (RCE)', 'Hands-on masterclass lecture on Week 27: Server-Side Template Injection (SSTI) & Remote Code Execution (RCE). Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (233, 64, 6, 'Week 28: Server-Side Request Forgery (SSRF) & Cloud Metadata Exploitation', 'Hands-on masterclass lecture on Week 28: Server-Side Request Forgery (SSRF) & Cloud Metadata Exploitation. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (234, 65, 6, 'Week 29: Android Security Model & APK Decompilation (JADX, APKTool)', 'Hands-on masterclass lecture on Week 29: Android Security Model & APK Decompilation (JADX, APKTool). Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (235, 65, 6, 'Week 30: Static Application Security Testing (SAST) for Android Apps', 'Hands-on masterclass lecture on Week 30: Static Application Security Testing (SAST) for Android Apps. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (236, 65, 6, 'Week 31: Dynamic Runtime Hooking & SSL Pinning Bypass with Frida & Objection', 'Hands-on masterclass lecture on Week 31: Dynamic Runtime Hooking & SSL Pinning Bypass with Frida & Objection. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (237, 65, 6, 'Week 32: iOS Application Architecture, Insecure Storage & Keychain Analysis', 'Hands-on masterclass lecture on Week 32: iOS Application Architecture, Insecure Storage & Keychain Analysis. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (238, 66, 6, 'Week 33: AWS Cloud Security Architecture & IAM Least Privilege Hardening', 'Hands-on masterclass lecture on Week 33: AWS Cloud Security Architecture & IAM Least Privilege Hardening. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (239, 66, 6, 'Week 34: Cloud Misconfigurations, S3 Bucket Audits & AWS GuardDuty', 'Hands-on masterclass lecture on Week 34: Cloud Misconfigurations, S3 Bucket Audits & AWS GuardDuty. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (240, 66, 6, 'Week 35: Docker Container Security, Image Scanning & Kubernetes Hardening', 'Hands-on masterclass lecture on Week 35: Docker Container Security, Image Scanning & Kubernetes Hardening. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (241, 66, 6, 'Week 36: DevSecOps CI/CD Pipeline Integration with Trivy, SonarQube & SAST', 'Hands-on masterclass lecture on Week 36: DevSecOps CI/CD Pipeline Integration with Trivy, SonarQube & SAST. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (242, 67, 6, 'Week 37: IoT Architecture, Attack Surfaces & Embedded Linux Systems', 'Hands-on masterclass lecture on Week 37: IoT Architecture, Attack Surfaces & Embedded Linux Systems. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (243, 67, 6, 'Week 38: Firmware Extraction, Binary Unpacking (Binwalk) & Static Analysis', 'Hands-on masterclass lecture on Week 38: Firmware Extraction, Binary Unpacking (Binwalk) & Static Analysis. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (244, 67, 6, 'Week 39: Hardware Debug Interfaces: UART, JTAG & SPI Exploitation', 'Hands-on masterclass lecture on Week 39: Hardware Debug Interfaces: UART, JTAG & SPI Exploitation. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (245, 67, 6, 'Week 40: Wireless IoT Protocol Analysis: Zigbee, Bluetooth BLE & MQTT Security', 'Hands-on masterclass lecture on Week 40: Wireless IoT Protocol Analysis: Zigbee, Bluetooth BLE & MQTT Security. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (246, 68, 6, 'Week 41: Malware Analysis Lab Setup & Safe Detonation Environments', 'Hands-on masterclass lecture on Week 41: Malware Analysis Lab Setup & Safe Detonation Environments. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (247, 68, 6, 'Week 42: Static Analysis: PE Headers, Strings, Imports & Disassembly (IDA Pro / Ghidra)', 'Hands-on masterclass lecture on Week 42: Static Analysis: PE Headers, Strings, Imports & Disassembly (IDA Pro / Ghidra). Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (248, 68, 6, 'Week 43: Dynamic Behavioral Analysis: Process Monitoring, Registry & Network Callbacks', 'Hands-on masterclass lecture on Week 43: Dynamic Behavioral Analysis: Process Monitoring, Registry & Network Callbacks. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (249, 68, 6, 'Week 44: Debugging with x64dbg, Unpacking Ransomware & Signature Generation (YARA)', 'Hands-on masterclass lecture on Week 44: Debugging with x64dbg, Unpacking Ransomware & Signature Generation (YARA). Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (250, 69, 6, 'Week 45: SOC Tier-1 / Tier-2 Operations, Incident Response Lifecycle & Playbooks', 'Hands-on masterclass lecture on Week 45: SOC Tier-1 / Tier-2 Operations, Incident Response Lifecycle & Playbooks. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '45m', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (251, 69, 6, 'Week 46: SIEM Deployment & Real-Time Threat Hunting with Splunk', 'Hands-on masterclass lecture on Week 46: SIEM Deployment & Real-Time Threat Hunting with Splunk. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '45m', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (252, 69, 6, 'Week 47: Endpoint Detection & Response (EDR) with Wazuh & MITRE ATT&CK Mapping', 'Hands-on masterclass lecture on Week 47: Endpoint Detection & Response (EDR) with Wazuh & MITRE ATT&CK Mapping. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '45m', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (253, 69, 6, 'Week 48: Expert Grand Capstone: Enterprise Red Team vs. Blue Team Simulation', 'Hands-on masterclass lecture on Week 48: Expert Grand Capstone: Enterprise Red Team vs. Blue Team Simulation. Includes virtual lab environment, command cheat sheets, tool configs, and live mentor demonstration from Dizital Adda cyber security lab.', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '45m', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (254, 89, 7, '1.1 AI Basics, Generative AI vs Discriminative AI & Modern Applications', 'Evolution of Artificial Intelligence, rule-based systems vs statistical learning, generative vs discriminative models, and industry impact.', 'https://www.youtube.com/watch?v=aircAruvnKk', '25:30', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (255, 89, 7, '1.2 Setting Up Python, Anaconda & Jupyter AI Developer Environment', 'Installing Anaconda, configuring isolated conda environments, VS Code extensions, and running interactive Jupyter notebooks.', 'https://www.youtube.com/watch?v=aircAruvnKk', '30:15', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (256, 89, 7, '1.3 Installing & Configuring Core AI Libraries (PyTorch, TensorFlow, CUDA)', 'Configuring NVIDIA CUDA drivers, cuDNN, installing PyTorch & TensorFlow with GPU acceleration, and verifying tensor operations.', 'https://www.youtube.com/watch?v=aircAruvnKk', '28:45', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (257, 89, 7, '1.4 Running Pre-Trained AI Models & Inference Pipelines', 'Loading pre-trained weights from Hugging Face model hub, running zero-shot image classification and text completion inference pipelines.', 'https://www.youtube.com/watch?v=aircAruvnKk', '32:20', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (258, 89, 7, '1.5 Training Your First Neural Network & Understanding Loss Functions', 'Implementing a single-layer perceptron in PyTorch, gradient descent optimization, loss functions (MSE, Cross-Entropy), and backpropagation.', 'https://www.youtube.com/watch?v=aircAruvnKk', '35:10', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (259, 90, 7, '2.1 Advanced Python Syntax, OOP & Functional Programming for AI', 'Object-oriented programming, classes, inheritance, dunder methods, list/dict comprehensions, lambda functions, and generators.', 'https://www.youtube.com/watch?v=aircAruvnKk', '32:40', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (260, 90, 7, '2.2 Core Data Structures, Algorithmic Complexity & File I/O', 'Lists, dictionaries, sets, tuples, Big-O algorithmic complexity, reading/writing JSON, CSV, Parquet, and pickle files.', 'https://www.youtube.com/watch?v=aircAruvnKk', '27:15', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (261, 90, 7, '2.3 High-Performance Array Computing with NumPy', 'N-dimensional arrays, matrix multiplications, broadcasting rules, vectorization, linear algebra operations, and memory layouts.', 'https://www.youtube.com/watch?v=aircAruvnKk', '34:50', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (262, 90, 7, '2.4 Data Wrangling, Cleaning & Preprocessing with Pandas', 'DataFrames, Series, filtering, grouping, merging, handling missing values, imputations, data type conversions, and string manipulation.', 'https://www.youtube.com/watch?v=aircAruvnKk', '38:20', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (263, 90, 7, '2.5 Exploratory Data Analysis (EDA) & Visualizations with Matplotlib & Seaborn', 'Histograms, scatter plots, heatmaps, box plots, correlation analysis, and publishing interactive charts with Plotly.', 'https://www.youtube.com/watch?v=aircAruvnKk', '31:30', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (264, 91, 7, '3.1 Supervised vs Unsupervised Learning & ML Pipeline Architecture', 'Problem formulation, training/validation/test splits, bias-variance tradeoff, overfitting vs underfitting, and Scikit-Learn conventions.', 'https://www.youtube.com/watch?v=aircAruvnKk', '29:10', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (265, 91, 7, '3.2 Linear & Logistic Regression, Ridge, Lasso & ElasticNet', 'Ordinary least squares, gradient descent for regression, L1/L2 regularization to prevent overfitting, and logistic sigmoid classification.', 'https://www.youtube.com/watch?v=aircAruvnKk', '33:45', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (266, 91, 7, '3.3 Decision Trees, Random Forests & Gradient Boosted Trees (XGBoost)', 'Information gain, Gini impurity, tree pruning, bagging ensembles (Random Forest), and gradient boosting algorithms (XGBoost, LightGBM).', 'https://www.youtube.com/watch?v=aircAruvnKk', '36:20', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (267, 91, 7, '3.4 Model Evaluation Metrics: Precision, Recall, F1-Score & ROC-AUC', 'Confusion matrices, precision vs recall curves, F1-score harmonic mean, ROC curves, AUC interpretation, and cost-sensitive learning.', 'https://www.youtube.com/watch?v=aircAruvnKk', '28:15', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (268, 91, 7, '3.5 Data Preprocessing Pipelines, K-Fold Cross-Validation & GridSearchCV', 'StandardScaler, OneHotEncoder, ColumnTransformer, Scikit-Learn Pipelines, StratifiedKFold cross-validation, and hyperparameter tuning.', 'https://www.youtube.com/watch?v=aircAruvnKk', '34:00', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (269, 92, 7, '4.1 Text Preprocessing: Tokenization, Stemming, Lemmatization & Stopwords', 'Regex text normalization, Unicode cleaning, WordNet lemmatizer, Porter stemmer, stopword removal, and vocabulary building.', 'https://www.youtube.com/watch?v=aircAruvnKk', '31:10', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (270, 92, 7, '4.2 Industrial NLP Pipelines with spaCy & Part-of-Speech Tagging', 'spaCy Doc, Span, Token objects, dependency parsing, part-of-speech tagging, and custom rule-based entity rulers.', 'https://www.youtube.com/watch?v=aircAruvnKk', '29:45', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (271, 92, 7, '4.3 Vectorizing Text: Bag-of-Words, N-Grams, TF-IDF & Word Embeddings', 'CountVectorizer, TfidfTransformer, sublinear TF scaling, Word2Vec CBOW & Skip-gram architectures, and FastText subword embeddings.', 'https://www.youtube.com/watch?v=aircAruvnKk', '35:30', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (272, 92, 7, '4.4 Text Classification & Sentiment Analysis on Customer Reviews', 'Training Naive Bayes, Logistic Regression, and SVM models on real Amazon reviews dataset for polarity and sentiment classification.', 'https://www.youtube.com/watch?v=aircAruvnKk', '33:15', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (273, 92, 7, '4.5 Named Entity Recognition (NER) & Information Extraction', 'Extracting persons, organizations, locations, and monetary values from unformatted documents and news feeds.', 'https://www.youtube.com/watch?v=aircAruvnKk', '27:50', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (274, 93, 7, '5.1 Deep Neural Networks (ANN): Activation Functions & Backpropagation', 'Forward propagation, matrix dot products, ReLU, LeakyReLU, GeLU, Softmax, chain rule calculus, and computational graphs.', 'https://www.youtube.com/watch?v=aircAruvnKk', '34:20', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (275, 93, 7, '5.2 Convolutional Neural Networks (CNN): Kernels, Stride, Pooling & ResNet', '2D convolutions, edge detection filters, max pooling, dropout, batch normalization, and deep residual connections (ResNet-50).', 'https://www.youtube.com/watch?v=aircAruvnKk', '37:15', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (276, 93, 7, '5.3 Recurrent Neural Networks (RNN), GRU & LSTM for Time Series & Text', 'Vanishing gradient problem in vanilla RNNs, LSTM gating mechanisms (forget, input, output gates), and bidirectional RNNs.', 'https://www.youtube.com/watch?v=aircAruvnKk', '33:40', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (277, 93, 7, '5.4 Optimizers (SGD, AdamW), Learning Rate Schedulers & Regularization', 'Stochastic gradient descent with momentum, Adam and AdamW optimizers, Cosine Annealing, Early Stopping, and weight decay.', 'https://www.youtube.com/watch?v=aircAruvnKk', '30:05', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (278, 93, 7, '5.5 Hands-on Lab: Training an Image Classifier with PyTorch & Transfer Learning', 'Loading torchvision pre-trained models, fine-tuning classification head, data augmentations (RandAugment), and model checkpointing.', 'https://www.youtube.com/watch?v=aircAruvnKk', '39:30', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (279, 94, 7, '6.1 The Attention Mechanism: Scaled Dot-Product & Multi-Head Attention', 'Query, Key, Value vector mathematics, self-attention matrix calculation, multi-head projection, and positional encodings.', 'https://www.youtube.com/watch?v=aircAruvnKk', '36:45', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (280, 94, 7, '6.2 The Complete Transformer Architecture (Attention Is All You Need)', 'Encoder stack, decoder stack, cross-attention, feed-forward layers, residual connections, and layer normalization.', 'https://www.youtube.com/watch?v=aircAruvnKk', '38:10', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (281, 94, 7, '6.3 BERT: Masked Language Modeling & Sentence Pair Classification', 'BERT pre-training tasks (MLM, NSP), tokenizers (WordPiece), [CLS] token pooling, and downstream fine-tuning benchmarks (GLUE).', 'https://www.youtube.com/watch?v=aircAruvnKk', '32:30', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (282, 94, 7, '6.4 Autoregressive GPT Models: Causal Masking, Temperature & Top-p Sampling', 'Causal attention masking, autoregressive token prediction, decoding strategies (greedy, beam search, temperature, top-k, top-p nucleus).', 'https://www.youtube.com/watch?v=aircAruvnKk', '35:15', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (283, 94, 7, '6.5 Hugging Face Transformers Library: Fine-Tuning DistilBERT with Trainer API', 'Using AutoTokenizer, AutoModelForSequenceClassification, Hugging Face Datasets, Trainer API, and logging with Weights & Biases.', 'https://www.youtube.com/watch?v=aircAruvnKk', '41:20', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (284, 95, 7, '7.1 Generative Models Landscape: GANs, VAEs, Latent Diffusion & LLMs', 'Generator-discriminator game, variational autoencoder latent spaces, forward/reverse diffusion process, and the modern GenAI stack.', 'https://www.youtube.com/watch?v=aircAruvnKk', '33:00', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (285, 95, 7, '7.2 Prompt Engineering Mastery: Zero-Shot, Few-Shot & Context Framing', 'Anatomy of an optimal prompt: role definition, background context, task constraints, step-by-step guidance, and few-shot exemplars.', 'https://www.youtube.com/watch?v=aircAruvnKk', '35:40', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (286, 95, 7, '7.3 Advanced Reasoning Prompts: Chain-of-Thought, Tree-of-Thoughts & ReAct', 'Zero-shot Chain-of-Thought (''think step by step''), Tree-of-Thoughts exploration, ReAct reasoning & acting loops, and self-consistency.', 'https://www.youtube.com/watch?v=aircAruvnKk', '34:25', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (287, 95, 7, '7.4 Multimodal Generation: Midjourney, Stable Diffusion, Flux & ElevenLabs', 'Prompting for visual assets, negative prompts, aspect ratios, seed control, inpainting, outpainting, voice cloning, and audio synthesis.', 'https://www.youtube.com/watch?v=aircAruvnKk', '38:50', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (288, 95, 7, '7.5 AI Safety, Prompt Injection Defense, Hallucination Reduction & Guardrails', 'Indirect prompt injection attacks, jailbreaking vulnerabilities, enforcing JSON schema outputs with Pydantic, and NeMo Guardrails.', 'https://www.youtube.com/watch?v=aircAruvnKk', '31:40', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (289, 96, 7, '8.1 Introduction to LangChain & LangChain Expression Language (LCEL)', 'Runnable primitives, LCEL pipe operator syntax, streaming responses, asynchronous execution, and batch processing.', 'https://www.youtube.com/watch?v=aircAruvnKk', '32:15', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (290, 96, 7, '8.2 Prompt Templates, Output Parsers & Pydantic Schema Enforcement', 'ChatPromptTemplate, FewShotPromptTemplate, JsonOutputParser, PydanticOutputParser, and handling parsing retries automatically.', 'https://www.youtube.com/watch?v=aircAruvnKk', '29:50', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (291, 96, 7, '8.3 Managing Memory: ConversationBuffer, SummaryMemory & VectorStoreMemory', 'Context window token constraints, sliding window message history, summarizing conversation history with LLMs, and persistent Redis memory.', 'https://www.youtube.com/watch?v=aircAruvnKk', '34:10', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (292, 96, 7, '8.4 Function Calling & Tool Binding with OpenAI, Claude & Gemini', 'Defining JSON tool schemas, @tool decorator in LangChain, binding tools to models, executing tool calls, and passing outputs back.', 'https://www.youtube.com/watch?v=aircAruvnKk', '36:25', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (293, 96, 7, '8.5 Building an Autonomous Multi-Step Research Assistant Pipeline', 'End-to-end implementation of an automated research agent that queries DuckDuckGo, extracts webpage contents, and synthesizes reports.', 'https://www.youtube.com/watch?v=aircAruvnKk', '40:10', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (294, 97, 7, '9.1 Embeddings & Vector Space Mathematics: Cosine, Dot Product & Euclidean', 'Vector representations of text, high-dimensional spaces, distance metrics (Cosine, Euclidean, Dot Product), and embedding benchmark MTEB.', 'https://www.youtube.com/watch?v=aircAruvnKk', '30:45', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (295, 97, 7, '9.2 Production Vector Databases: ChromaDB, Pinecone & Qdrant Hands-On', 'Setting up ChromaDB local collections, cloud Pinecone index provisioning, metadata filtering, similarity search queries, and namespaces.', 'https://www.youtube.com/watch?v=aircAruvnKk', '35:10', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (296, 97, 7, '9.3 Document Chunking Strategies: Recursive, Semantic & Markdown Splitting', 'Fixed-size chunking, RecursiveCharacterTextSplitter, semantic similarity chunking, chunk overlap tuning, and PDF/HTML parsing.', 'https://www.youtube.com/watch?v=aircAruvnKk', '33:20', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (297, 97, 7, '9.4 Advanced RAG: Hybrid Search (BM25 + Dense) & Cross-Encoder Reranking', 'Reciprocal Rank Fusion (RRF), combining keyword BM25 with vector search, and reranking top candidates with Cohere Rerank models.', 'https://www.youtube.com/watch?v=aircAruvnKk', '37:50', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (298, 97, 7, '9.5 Evaluating RAG Pipelines with Ragas, TruLens & Groundedness Metrics', 'Faithfulness, Answer Relevance, Context Precision, Context Recall, evaluating hallucinations, and continuous automated regression testing.', 'https://www.youtube.com/watch?v=aircAruvnKk', '34:15', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (299, 98, 7, '10.1 AI Agent Architectures: Perception, Planning, Memory & Execution', 'Single-agent vs multi-agent topologies, ReAct agent loop, self-reflection, planning modules, and state machine architecture.', 'https://www.youtube.com/watch?v=aircAruvnKk', '31:30', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (300, 98, 7, '10.2 Multi-Agent Orchestration with CrewAI & LangGraph', 'Defining CrewAI agents, tasks, hierarchical process managers, LangGraph StateGraph, conditional edges, and human-in-the-loop approvals.', 'https://www.youtube.com/watch?v=aircAruvnKk', '39:10', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (301, 98, 7, '10.3 Low-Code AI Automation with n8n & Flowise AI', 'Visual agent canvas, webhook triggers, connecting OpenAI/Claude nodes to Google Sheets, Slack, Gmail, and CRM databases.', 'https://www.youtube.com/watch?v=aircAruvnKk', '36:40', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (302, 98, 7, '10.4 Anthropic Model Context Protocol (MCP): Architecture & Implementation', 'MCP protocol specifications, client-server architecture, JSON-RPC 2.0 messages, building custom MCP servers for local tools and DBs.', 'https://www.youtube.com/watch?v=aircAruvnKk', '35:20', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (303, 98, 7, '10.5 Deploying Production Autonomous AI Agents to the Cloud (FastAPI + Docker)', 'Containerizing AI agents with Docker, exposing REST API endpoints via FastAPI, streaming agent thoughts with Server-Sent Events (SSE).', 'https://www.youtube.com/watch?v=aircAruvnKk', '42:00', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (304, 99, 7, '11.1 Capstone 1: Smart Traffic Monitoring System with YOLO & OpenCV', 'Real-time vehicle detection, tracking across video frames with ByteTrack, counting traffic flow, and detecting lane violations.', 'https://www.youtube.com/watch?v=aircAruvnKk', '44:30', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (305, 99, 7, '11.2 Capstone 2: Intelligent Customer Support Bot with Transformers & BERT', 'Intent classification, named entity slot filling, sentiment escalation, Flask backend API, and full integration with web chat widgets.', 'https://www.youtube.com/watch?v=aircAruvnKk', '42:15', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (306, 99, 7, '11.3 Capstone 3: Netflix-Style Recommendation Engine with Scikit-learn & PyTorch', 'Collaborative filtering, matrix factorization (SVD), deep neural recommendation models (NCF), and real-time inference caching with Redis.', 'https://www.youtube.com/watch?v=aircAruvnKk', '38:40', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (307, 99, 7, '11.4 Capstone 4: Real-Time Financial Fraud Detection with Deep Anomaly Detection', 'Autoencoder neural networks for anomaly scoring, PyTorch training on transaction streams, and low-latency API alert dispatchers.', 'https://www.youtube.com/watch?v=aircAruvnKk', '41:00', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (308, 99, 7, '11.5 Capstone 5: Medical Image Analysis & Disease Diagnosis with CNNs & DICOM', 'Processing DICOM MRI/X-Ray imaging data, training deep convolutional networks with Grad-CAM visual heatmaps, and doctor confidence scoring.', 'https://www.youtube.com/watch?v=aircAruvnKk', '45:10', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (309, 100, 7, '12.1 Building an Industry-Standard AI & Prompt Engineer Resume', 'Formatting technical resumes for ATS screening, framing project impact using STAR methodology, highlighting key tools, models, and metrics.', 'https://www.youtube.com/watch?v=aircAruvnKk', '30:20', 1, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (310, 100, 7, '12.2 LinkedIn Profile Optimization, Personal Branding & GitHub Portfolio', 'Crafting technical LinkedIn headlines, publishing open-source AI projects with clean READMEs, documentation, and live demo video recordings.', 'https://www.youtube.com/watch?v=aircAruvnKk', '28:40', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (311, 100, 7, '12.3 Technical Coding & Machine Learning Interview Preparation', 'Data structures & algorithms in Python, ML theory interview questions (regularization, loss functions, attention math), and live coding drills.', 'https://www.youtube.com/watch?v=aircAruvnKk', '37:50', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (312, 100, 7, '12.4 AI System Design Interviews: Architecting Scalable LLM & RAG Systems', 'Designing real-world AI architectures: latency budgets, vector index sizing, caching layers, rate limiting, and GPU cluster throughput.', 'https://www.youtube.com/watch?v=aircAruvnKk', '39:30', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (313, 100, 7, '12.5 Placement Drives, Salary Negotiation Tactics & Career Launch', 'Direct referrals to 500+ hiring partner companies, offer evaluation, equity vs base pay negotiation tactics, and probation onboarding roadmap.', 'https://www.youtube.com/watch?v=aircAruvnKk', '35:00', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (314, 101, 14, 'Introduction to Large Language Models (LLMs) & Transformers', 'How LLMs work: Tokens, embeddings, attention mechanisms & weights. Comparing modern models: GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3.1. Context windows, temperature, top_p, and frequency penalties. Setting up professional AI developer environments & API keys', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (315, 101, 14, 'Advanced Prompt Frameworks & System Prompt Architecture', 'Zero-shot, Few-shot & Chain-of-Thought (CoT) prompting techniques. ReAct framework, Directional Stimulus, and Generated Knowledge Prompting. Architecting enterprise system prompts with XML tags and guardrails. Preventing hallucinations and enforcing structured JSON/Markdown outputs', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (316, 102, 14, 'Generative Art & Visual Asset Engineering', 'Midjourney v6: Parameters (--s, --c, --ar, --iw), camera angles, lighting & style references. Flux.1 & Stable Diffusion: Negative prompting, seed manipulation, ControlNet basics. Upscaling, inpainting, outpainting, and brand asset generation. Commercial copyright, licensing, and ethical usage guidelines', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (317, 102, 14, 'AI Video, Voice Cloning & Media Production', 'Runway Gen-3 Alpha & Kling: Text-to-video, image-to-video & motion brush. ElevenLabs: Realistic voice cloning, speech synthesis & multi-lingual dubbing. HeyGen & Synthesia: Digital AI avatars for corporate communications. End-to-end production of a commercial AI video campaign', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (318, 103, 14, 'Custom GPTs, Claude Projects & Personal Copilots', 'Configuring custom GPTs with knowledge bases and custom instructions. Connecting custom Actions with external REST APIs and OpenAPI schemas. Claude Projects: Long-document analysis, code interpretation & artifacts. Prompt injection defense and securing proprietary enterprise instructions', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (319, 103, 14, 'Capstone Project: Autonomous Executive Assistant Pipeline', 'Multi-step automated email triage, calendar synchronization & meeting summarization. Integrating Zapier / Make.com with OpenAI APIs. End-to-end testing, error handling, and reliability verification. Project presentation & portfolio showcase for interviews', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (320, 104, 15, 'Week 1: Welcome to Data Science World — roadmap, career paths, CRISP-DM workflow, real-world DS success stories', 'Week 1: Welcome to Data Science World. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (321, 104, 15, 'Week 2: Essential Tools & Environment Setup — Anaconda, Jupyter, VS Code, Google Colab', 'Week 2: Essential Tools & Environment Setup. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (322, 104, 15, 'Week 3: GitHub Foundation — version control, repository management, GitHub Pages portfolio', 'Week 3: GitHub Foundation. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (323, 104, 15, 'Week 4: Excel Foundation — formulas, pivot tables, data validation, macros', 'Week 4: Excel Foundation. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (324, 105, 15, 'Advanced ML Algorithms', 'Advanced ML Algorithms. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (325, 105, 15, 'Ensemble Methods', 'Ensemble Methods. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (326, 105, 15, 'Advanced Feature Engineering', 'Advanced Feature Engineering. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (327, 105, 15, 'Project: Advanced ML Models', 'Project: Advanced ML Models. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (328, 106, 15, 'Advanced Neural Networks', 'Advanced Neural Networks. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (329, 106, 15, 'CNNs and Computer Vision', 'CNNs and Computer Vision. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (330, 106, 15, 'NLP and Transformers', 'NLP and Transformers. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (331, 106, 15, 'Project: Deep Learning Application', 'Project: Deep Learning Application. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (332, 107, 15, 'Advanced Statistical Modeling', 'Advanced Statistical Modeling. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (333, 107, 15, 'Bayesian Methods', 'Bayesian Methods. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (334, 107, 15, 'Time Series Analysis', 'Time Series Analysis. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (335, 107, 15, 'Project: Statistical Analysis', 'Project: Statistical Analysis. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (336, 108, 15, 'Model Deployment Strategies — Flask/FastAPI, model serialization, containerization', 'Model Deployment Strategies — Flask/FastAPI, model serialization, containerization. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (337, 108, 15, 'MLOps and Production Systems — Docker, Kubernetes, CI/CD', 'MLOps and Production Systems — Docker, Kubernetes, CI/CD. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (338, 108, 15, 'Model Monitoring and Maintenance — data drift detection, A/B testing, retraining', 'Model Monitoring and Maintenance — data drift detection, A/B testing, retraining. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (339, 108, 15, 'Capstone: Production AI System', 'Capstone: Production AI System. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (340, 109, 16, 'Week 1: Data Analytics Fundamentals', 'types/applications. Analyst vs Scientist vs BA. analytics life cycle. structured vs unstructured data', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (341, 109, 16, 'Hands-on: Excel Interface, Cell References, SUM/AVERAGE/COUNT/MIN/MAX, Sales Data Analysis', 'Hands-on: Excel Interface, Cell References, SUM/AVERAGE/COUNT/MIN/MAX, Sales Data Analysis. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (342, 109, 16, 'Week 2: Excel Formulas & Functions', 'IF/AND/OR/NOT. CONCATENATE/LEFT/RIGHT/MID. Date & Time. IFERROR/ISERROR', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (343, 109, 16, 'Hands-on: Nested IFs, COUNTIF/SUMIF/AVERAGEIF, Data Validation, Employee Performance Analysis', 'Hands-on: Nested IFs, COUNTIF/SUMIF/AVERAGEIF, Data Validation, Employee Performance Analysis. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (344, 109, 16, 'Week 3: Data Management in Excel', 'sorting/filtering. conditional formatting. data tables. pivot table fundamentals', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (345, 109, 16, 'Mini Project: Monthly Sales Performance Dashboard', 'Mini Project: Monthly Sales Performance Dashboard. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 6, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (346, 109, 16, 'Week 4: Advanced Excel & Power Query', 'VLOOKUP/HLOOKUP/XLOOKUP. INDEX-MATCH. array formulas. Power Query intro', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 7, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (347, 109, 16, 'Major Project: Retail Chain Performance Analysis', 'Major Project: Retail Chain Performance Analysis. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 8, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (348, 110, 16, 'Week 5: Power BI Fundamentals', 'ecosystem overview. desktop architecture. data sources. data model concepts', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (349, 110, 16, 'Hands-on: Power BI navigation, multi-source import, Power Query, basic visualizations', 'Hands-on: Power BI navigation, multi-source import, Power Query, basic visualizations. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (350, 110, 16, 'Week 6: Data Modeling & Relationships', 'star vs snowflake schema. relationships. intro to DAX', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (351, 110, 16, 'Hands-on: Calculated columns vs measures, basic DAX functions, interactive dashboards', 'Hands-on: Calculated columns vs measures, basic DAX functions, interactive dashboards. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (352, 110, 16, 'Week 7: Advanced Power BI & DAX', 'SUM/AVERAGE/COUNT. YTD/MTD/QTD. filter & row context. DAX best practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (353, 110, 16, 'Mini Project: HR Analytics Dashboard', 'complex DAX. time-based analysis. treemap/waterfall/funnel visuals', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 6, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (354, 110, 16, 'Week 8: Data Storytelling & Advanced Visualizations', 'storytelling principles. color theory. dashboard best practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 7, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (355, 110, 16, 'Major Project: Executive Sales Performance Dashboard', 'custom visuals. slicers/bookmarks/drill-through. mobile design', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 8, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (356, 111, 16, 'Week 9: SQL Fundamentals', 'RDBMS. SQL syntax. database design. data types/constraints', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (357, 111, 16, 'Hands-on: MySQL/PostgreSQL setup, SELECT/WHERE/ORDER BY, E-commerce Database Queries', 'Hands-on: MySQL/PostgreSQL setup, SELECT/WHERE/ORDER BY, E-commerce Database Queries. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (358, 111, 16, 'Week 10: Intermediate SQL Operations', 'COUNT/SUM/AVG/MIN/MAX. GROUP BY/HAVING. JOINs. UNION/UNION ALL', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (359, 111, 16, 'Mini Project: Customer Order Analysis', 'complex aggregations. multi-table joins. data cleaning with SQL', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (360, 111, 16, 'Week 11: Advanced SQL Techniques', 'subqueries. CTEs. window functions. CASE statements', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (361, 111, 16, 'Major Project: Banking Transaction Analysis', 'complex subqueries. window functions. string/date manipulation', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 6, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (362, 111, 16, 'Week 12: SQL Optimization & Real-world Applications', 'query optimization. indexing. performance tuning. SQL in BI', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 7, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (363, 111, 16, 'Capstone SQL Project: Multi-dimensional Business Analysis', 'views. stored procedures. Power BI integration', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 8, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (364, 112, 16, 'Week 13: Python Programming Fundamentals', 'installation. syntax. variables/operators. functions/modules', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (365, 112, 16, 'Hands-on: Jupyter setup, lists/dictionaries/tuples/sets, file I/O, data processing scripts', 'Hands-on: Jupyter setup, lists/dictionaries/tuples/sets, file I/O, data processing scripts. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (366, 112, 16, 'Week 14: NumPy & Pandas Foundations', 'NumPy arrays. broadcasting. DataFrame structure. data loading/saving', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (367, 112, 16, 'Mini Project: Student Grade Analysis', 'array manipulations. DataFrame indexing. data filtering. cleaning', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (368, 112, 16, 'Week 15: Advanced Pandas Operations', 'GroupBy. pivot tables. merging/joining. aggregation techniques', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (369, 112, 16, 'Major Project: E-commerce Customer Segmentation', 'complex manipulations. multi-level indexing. transformation', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 6, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (370, 112, 16, 'Week 16: Data Visualization with Python', 'Matplotlib. Seaborn. Plotly. visualization best practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 7, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (371, 112, 16, 'Portfolio Project: COVID-19 Data Analysis Dashboard', 'Portfolio Project: COVID-19 Data Analysis Dashboard. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 8, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (372, 113, 16, 'Week 17: Exploratory Data Analysis', 'EDA workflow. descriptive statistics. distributions. correlation vs causation', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (373, 113, 16, 'Mini Project: Housing Market Analysis', 'comprehensive EDA. outlier detection. missing value analysis', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (374, 113, 16, 'Week 18: Statistical Analysis & Hypothesis Testing', 'inferential stats. hypothesis testing. t-tests. chi-square', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (375, 113, 16, 'Week 19: Data Preprocessing & Feature Engineering', 'data quality. missing data. outlier treatment. feature scaling', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (376, 113, 16, 'Capstone Prep: Comprehensive Data Preprocessing', 'advanced cleaning. feature creation/selection. transformation pipeline', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (377, 113, 16, 'Week 20: Machine Learning Basics & Predictive Analytics', 'intro to ML. supervised vs unsupervised. regression/classification. evaluation metrics', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 6, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (378, 114, 16, 'Week 21: Industry Case Studies & Domain Expertise', 'healthcare. finance. retail. HR analytics — choose 1 domain project', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (379, 114, 16, 'Week 22: End-to-End Capstone Project - Week 1', 'data collection. cleaning in Python. SQL database design. Power BI dashboard', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (380, 114, 16, 'Week 23: End-to-End Capstone Project - Week 2', 'advanced analytics implementation. dashboard optimization. documentation. performance testing', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (381, 114, 16, 'Week 24: Portfolio Finalization & Placement Preparation', 'GitHub portfolio. LinkedIn. resume. mock interviews', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (382, 115, 17, 'Week 1: Data Analytics Fundamentals', 'landscape. Data Analyst role. structured vs unstructured data. analytics lifecycle', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (383, 115, 17, 'Hands-on: Excel navigation & advanced formatting, data validation, dynamic reports with named ranges', 'Hands-on: Excel navigation & advanced formatting, data validation, dynamic reports with named ranges. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (384, 115, 17, 'Week 2: Advanced Excel Functions & Logic', 'IF/IFS/AND/OR. COUNTIF/SUMIFS/AVERAGEIFS. IFERROR/ISERROR. text functions', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (385, 115, 17, 'Hands-on: Nested IF statements, multi-criteria analysis, data cleaning with text functions', 'Hands-on: Nested IF statements, multi-criteria analysis, data cleaning with text functions. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (386, 115, 17, 'Week 3: Lookup Functions & Data Relationships', 'VLOOKUP vs XLOOKUP. INDEX-MATCH. error handling. dynamic lookups', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (387, 115, 17, 'Hands-on: Employee database with lookups, product inventory system, cross-referencing data sources', 'Hands-on: Employee database with lookups, product inventory system, cross-referencing data sources. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 6, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (388, 115, 17, 'Week 4: Pivot Tables & Power Query Introduction', 'pivot architecture. grouping/filtering. Power Query ETL. transformation concepts', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 7, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (389, 115, 17, 'Hands-on: Multi-dimensional pivot analysis, dynamic pivot charts/slicers, data cleaning workflows', 'Hands-on: Multi-dimensional pivot analysis, dynamic pivot charts/slicers, data cleaning workflows. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 8, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (390, 116, 17, 'Week 5: Power BI Fundamentals & Data Modeling', 'BI concepts. Power BI ecosystem. data modeling. star vs snowflake schema', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (391, 116, 17, 'Hands-on: Power BI Desktop setup, multi-source connections, basic visualizations & reports', 'Hands-on: Power BI Desktop setup, multi-source connections, basic visualizations & reports. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (392, 116, 17, 'Week 6: Advanced Power BI & DAX', 'DAX fundamentals. calculated columns vs measures. time intelligence. advanced DAX patterns', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (393, 116, 17, 'Hands-on: Complex calculated measures, time-based analysis, advanced visualizations', 'custom charts. maps', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (394, 116, 17, 'Week 7: SQL & Database Fundamentals', 'relational databases. SQL syntax. normalization. keys & constraints', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (395, 116, 17, 'Hands-on: MySQL setup, schema & table creation, SELECT/filtering, sorting and limiting results', 'Hands-on: MySQL setup, schema & table creation, SELECT/filtering, sorting and limiting results. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 6, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (396, 116, 17, 'Week 8: Advanced SQL & Data Manipulation', 'JOIN operations. subqueries. window functions', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 7, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (397, 116, 17, 'Hands-on: Complex multi-table joins, GROUP BY aggregations, window functions for ranking', 'Hands-on: Complex multi-table joins, GROUP BY aggregations, window functions for ranking. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 8, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (398, 117, 17, 'Week 9: Python Fundamentals & Pandas', 'syntax. data structures. NumPy arrays. Pandas architecture', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 1, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (399, 117, 17, 'Hands-on: Anaconda/Jupyter setup, data loading & exploration, cleaning techniques, Netflix dataset analysis', 'Hands-on: Anaconda/Jupyter setup, data loading & exploration, cleaning techniques, Netflix dataset analysis. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 2, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (400, 117, 17, 'Week 10: Advanced Python & Statistical Analysis', 'EDA methodology. correlation & hypothesis testing. statistical significance', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 3, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (401, 117, 17, 'Hands-on: Advanced Pandas , SciPy statistical analysis, Matplotlib & Seaborn visualization', 'groupby/pivot/merge. Practical Exercise. Real Dataset Testing', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 4, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (402, 117, 17, 'Week 11: Data Visualization & Storytelling', 'storytelling principles. chart selection. interactive visualization', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 5, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (403, 117, 17, 'Hands-on: Advanced Matplotlib/Seaborn, interactive Plotly visualizations, compelling data narratives', 'Hands-on: Advanced Matplotlib/Seaborn, interactive Plotly visualizations, compelling data narratives. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 6, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (404, 117, 17, 'Week 12: Capstone Project & Career Preparation — choose: E-commerce Analytics Suite, Healthcare Data Analytics, or Financial Risk Assessment', 'Week 12: Capstone Project & Career Preparation. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 7, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

INSERT INTO lectures (id, section_id, course_id, title, description, video_url, duration, order_num, is_free_preview)
VALUES (405, 117, 17, 'Career Preparation: ATS-friendly resume building, LinkedIn optimization, technical & behavioral interview practice', 'Career Preparation: ATS-friendly resume building, LinkedIn optimization, technical & behavioral interview practice. Hands-on Practical Implementation. Industry Best Practices', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '25:00', 8, false)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  video_url = EXCLUDED.video_url,
  duration = EXCLUDED.duration,
  order_num = EXCLUDED.order_num,
  is_free_preview = EXCLUDED.is_free_preview;

-- 5. Update Sequences to prevent ID collision
SELECT setval('courses_id_seq', (SELECT COALESCE(MAX(id), 1) FROM courses));
SELECT setval('sections_id_seq', (SELECT COALESCE(MAX(id), 1) FROM sections));
SELECT setval('lectures_id_seq', (SELECT COALESCE(MAX(id), 1) FROM lectures));

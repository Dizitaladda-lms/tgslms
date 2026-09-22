-- =========================================================
-- DIZITAL ADDA LMS - PRODUCTION POSTGRESQL DATABASE SCHEMA
-- Strict Relational Integrity (PK & FK Interlinking)
-- =========================================================

-- 1. USERS TABLE (Primary Identity Entity)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'student' CHECK (role IN ('admin', 'teacher', 'student')),
    phone VARCHAR(50),
    dob VARCHAR(50),
    specialization VARCHAR(255),
    avatar VARCHAR(500),
    google_id VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Active',
    is_verified BOOLEAN DEFAULT false,
    verification_token VARCHAR(255),
    verification_token_expires TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- 2. COURSES TABLE (Catalog with Unique Business course_id)
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    course_id VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    original_price NUMERIC(10, 2) DEFAULT 0,
    duration VARCHAR(100),
    level VARCHAR(100) DEFAULT 'Beginner',
    category VARCHAR(100) DEFAULT 'General',
    teacher VARCHAR(255),
    teacher_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    thumbnail TEXT,
    is_published BOOLEAN DEFAULT true,
    total_lectures INTEGER DEFAULT 0,
    total_students INTEGER DEFAULT 0,
    rating NUMERIC(3, 2) DEFAULT 4.9,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_courses_course_id ON courses(course_id);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_teacher_id ON courses(teacher_id);

-- 3. STUDENTS TABLE (Extends users & interlinks to purchased course_id)
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    student_id VARCHAR(100) UNIQUE NOT NULL,
    course_id INTEGER REFERENCES courses(id) ON DELETE SET NULL,
    course_code VARCHAR(100) REFERENCES courses(course_id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    password VARCHAR(255),
    phone VARCHAR(50),
    dob VARCHAR(50),
    course VARCHAR(255),
    batch VARCHAR(100) DEFAULT 'Regular 2026',
    teacher VARCHAR(255),
    teacher_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    image TEXT,
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_students_student_id ON students(student_id);
CREATE INDEX IF NOT EXISTS idx_students_user_id ON students(user_id);
CREATE INDEX IF NOT EXISTS idx_students_course_id ON students(course_id);
CREATE INDEX IF NOT EXISTS idx_students_course_code ON students(course_code);

-- 4. SECTIONS TABLE (Course Curriculum Chapters)
CREATE TABLE IF NOT EXISTS sections (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    order_num INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sections_course_id ON sections(course_id);

-- 5. LECTURES TABLE (Course Video & PDF Lessons)
CREATE TABLE IF NOT EXISTS lectures (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    section_id INTEGER REFERENCES sections(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    video_url TEXT,
    pdf_url TEXT,
    duration VARCHAR(50),
    order_num INTEGER DEFAULT 1,
    is_free_preview BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_lectures_course_id ON lectures(course_id);
CREATE INDEX IF NOT EXISTS idx_lectures_section_id ON lectures(section_id);

-- 6. ORDERS TABLE (Payment Orders linked to Student & Course)
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES students(id) ON DELETE SET NULL,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    razorpay_order_id VARCHAR(255) UNIQUE NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status VARCHAR(50) DEFAULT 'created' CHECK (status IN ('created', 'paid', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_razorpay_order ON orders(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_student ON orders(student_id);
CREATE INDEX IF NOT EXISTS idx_orders_course ON orders(course_id);

-- 7. PAYMENTS TABLE (Successful Transactions linked to Order, Student & Course)
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE SET NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES students(id) ON DELETE SET NULL,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    razorpay_payment_id VARCHAR(255) UNIQUE,
    razorpay_order_id VARCHAR(255),
    razorpay_signature VARCHAR(500),
    amount NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status VARCHAR(50) DEFAULT 'Success',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_student ON payments(student_id);
CREATE INDEX IF NOT EXISTS idx_payments_course ON payments(course_id);

-- 8. ENROLLMENTS TABLE (Active Access Authorization linked to User, Student & Course)
CREATE TABLE IF NOT EXISTS enrollments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'Active',
    enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    payment_status VARCHAR(50) DEFAULT 'completed',
    progress NUMERIC(5, 2) DEFAULT 0,
    course_code VARCHAR(100),
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_enrollments_user_course ON enrollments(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments(student_id);

-- 9. VIDEO PROGRESS TABLE (Lesson Completion Tracking)
CREATE TABLE IF NOT EXISTS video_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    lecture_id INTEGER NOT NULL REFERENCES lectures(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT false,
    watched_seconds INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, lecture_id)
);

CREATE INDEX IF NOT EXISTS idx_video_progress_user ON video_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_video_progress_course ON video_progress(course_id);
CREATE INDEX IF NOT EXISTS idx_video_progress_lecture ON video_progress(lecture_id);

-- 10. ASSIGNMENTS TABLE
CREATE TABLE IF NOT EXISTS assignments (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date TIMESTAMP WITH TIME ZONE,
    max_marks INTEGER DEFAULT 100,
    resource_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_assignments_course ON assignments(course_id);

-- 11. ASSIGNMENT SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS assignment_submissions (
    id SERIAL PRIMARY KEY,
    assignment_id INTEGER NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    submission_url TEXT NOT NULL,
    marks NUMERIC(5, 2),
    feedback TEXT,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'Submitted',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_submissions_assignment ON assignment_submissions(assignment_id);
CREATE INDEX IF NOT EXISTS idx_submissions_student ON assignment_submissions(student_id);

-- 12. QUIZZES TABLE
CREATE TABLE IF NOT EXISTS quizzes (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    passing_score INTEGER DEFAULT 60,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_quizzes_course ON quizzes(course_id);

-- 13. QUIZ QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS quiz_questions (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option VARCHAR(10) NOT NULL,
    options JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz ON quiz_questions(quiz_id);

-- 14. QUIZ ATTEMPTS TABLE
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    score INTEGER NOT NULL DEFAULT 0,
    total_questions INTEGER DEFAULT 0,
    attempted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz ON quiz_attempts(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_student ON quiz_attempts(student_id);

-- 15. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS certificates (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    certificate_code VARCHAR(100) UNIQUE NOT NULL,
    pdf_url TEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    grade VARCHAR(50) DEFAULT 'Grade A+',
    issued_by VARCHAR(100) DEFAULT 'Admin',
    completion_percent INTEGER DEFAULT 100,
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    issue_date TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_certificates_code ON certificates(certificate_code);
CREATE INDEX IF NOT EXISTS idx_certificates_student ON certificates(student_id);
CREATE INDEX IF NOT EXISTS idx_certificates_user ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_course ON certificates(course_id);
CREATE INDEX IF NOT EXISTS idx_certificates_status ON certificates(status);

-- 16. ACTIVITIES TABLE
CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    student_id INTEGER REFERENCES students(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) DEFAULT 'General',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 17. DOUBTS TABLE
CREATE TABLE IF NOT EXISTS doubts (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE SET NULL,
    question TEXT NOT NULL,
    answer TEXT,
    status VARCHAR(50) DEFAULT 'Open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_doubts_student ON doubts(student_id);
CREATE INDEX IF NOT EXISTS idx_doubts_course ON doubts(course_id);

-- 18. TEST RESULTS TABLE
CREATE TABLE IF NOT EXISTS test_results (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    score NUMERIC(5, 2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Passed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_test_results_student ON test_results(student_id);
CREATE INDEX IF NOT EXISTS idx_test_results_course ON test_results(course_id);

-- 19. BLOGS TABLE (SEO-Optimized Career & Tech Articles)
CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    meta_title VARCHAR(255),
    meta_description TEXT,
    keywords TEXT,
    publisher VARCHAR(100) DEFAULT 'Dizital Adda',
    author_name VARCHAR(100) DEFAULT 'Dr. Gulshan Kumar',
    author_role VARCHAR(100) DEFAULT 'Founder & Master Trainer, Dizital Adda',
    read_time VARCHAR(50) DEFAULT '6 min read',
    featured_image TEXT,
    summary TEXT,
    content TEXT NOT NULL,
    faqs JSONB DEFAULT '[]'::jsonb,
    schema_markup JSONB,
    tags TEXT[],
    is_published BOOLEAN DEFAULT true,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_is_published ON blogs(is_published);

-- 20. SCHEMA EVOLUTION & SAFE EXTENSIONS
ALTER TABLE courses ADD COLUMN IF NOT EXISTS total_lectures INTEGER DEFAULT 0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS total_students INTEGER DEFAULT 0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS rating NUMERIC(3, 2) DEFAULT 4.9;

-- Video Studio ordering was added after the original curriculum schema. Keep
-- existing production databases compatible with the Studio read queries.
ALTER TABLE sections ADD COLUMN IF NOT EXISTS order_num INTEGER DEFAULT 1;
ALTER TABLE lectures ADD COLUMN IF NOT EXISTS order_num INTEGER DEFAULT 1;
ALTER TABLE lectures ADD COLUMN IF NOT EXISTS lecture_number INTEGER DEFAULT 1;

ALTER TABLE students ADD COLUMN IF NOT EXISTS batch VARCHAR(100) DEFAULT 'Regular 2026';

ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'completed';
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS progress NUMERIC(5, 2) DEFAULT 0;
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS course_code VARCHAR(100);

ALTER TABLE quizzes ADD COLUMN IF NOT EXISTS passing_score INTEGER DEFAULT 60;
ALTER TABLE quiz_questions ADD COLUMN IF NOT EXISTS options JSONB;

ALTER TABLE assignments ADD COLUMN IF NOT EXISTS max_marks INTEGER DEFAULT 100;
ALTER TABLE assignments ADD COLUMN IF NOT EXISTS resource_url TEXT;

ALTER TABLE assignment_submissions ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE assignment_submissions ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'Submitted';

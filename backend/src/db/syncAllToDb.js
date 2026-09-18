const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { Pool } = require("pg");

// Auto-discover environment variables from any standard location
const envPaths = [
  path.join(__dirname, "..", ".env"),
  path.join(__dirname, "..", "..", ".env"),
  path.join(__dirname, "..", "..", "..", ".env"),
];
for (const p of envPaths) {
  if (fs.existsSync(p)) {
    dotenv.config({ path: p });
  }
}

/**
 * Universal Database Synchronization Engine
 * Takes all local authoritative JSON data from lms_store.json and
 * synchronizes into PostgreSQL, creating all tables, indexes, records, and sequences.
 */
async function syncDatabase(providedPool = null) {
  const cliArgUrl = process.argv[2] && (process.argv[2].startsWith("postgres://") || process.argv[2].startsWith("postgresql://")) ? process.argv[2] : null;
  const connectionString = (cliArgUrl || process.env.DATABASE_URL || "").trim();
  let pool = providedPool;
  let shouldClosePool = false;

  if (!pool) {
    if (!connectionString) {
      throw new Error(
        "DATABASE_URL is not set. Please provide a valid PostgreSQL connection string in .env or as an argument (e.g. node src/db/syncAllToDb.js \"postgresql://user:pass@host:5432/db\")"
      );
    }

    pool = new Pool({
      connectionString,
      ssl:
        connectionString.includes("sslmode=require") ||
        connectionString.includes("neon.tech") ||
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
      max: 5,
      connectionTimeoutMillis: 15000,
    });
    shouldClosePool = true;
  }

  const results = {
    schemaCreated: false,
    usersSynced: 0,
    usersSkipped: 0,
    coursesSynced: 0,
    coursesSkipped: 0,
    sectionsSynced: 0,
    sectionsSkipped: 0,
    lecturesSynced: 0,
    lecturesSkipped: 0,
    studentsSynced: 0,
    studentsSkipped: 0,
    ordersSynced: 0,
    ordersSkipped: 0,
    paymentsSynced: 0,
    paymentsSkipped: 0,
    enrollmentsSynced: 0,
    enrollmentsSkipped: 0,
    quizzesSynced: 0,
    quizzesSkipped: 0,
    quizQuestionsSynced: 0,
    quizQuestionsSkipped: 0,
    assignmentsSynced: 0,
    assignmentsSkipped: 0,
    activitiesSynced: 0,
    sequencesUpdated: 0,
    timestamp: new Date().toISOString(),
  };

  const client = await pool.connect();

  try {
    console.log("==================================================");
    console.log("🚀 STARTING UNIVERSAL LMS POSTGRESQL DATABASE SYNC");
    console.log("==================================================");

    // 0. CHECK FOR INCOMPATIBLE LEGACY DATABASE TABLES
    // If PostgreSQL has old broken tables from previous runs (e.g. 'courses' missing 'category' or 'course_id'),
    // we drop them with CASCADE so schema.sql creates the pristine production schema.
    let needsCleanRebuild = false;
    try {
      const tableCheck = await client.query(
        "SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'courses'"
      );
      if (tableCheck.rows.length > 0) {
        const colCheck = await client.query(
          "SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'courses' AND column_name IN ('category', 'course_id')"
        );
        if (colCheck.rows.length < 2) {
          console.log("⚠️ Legacy incompatible 'courses' table detected (missing 'category' or 'course_id'). Triggering clean rebuild...");
          needsCleanRebuild = true;
        }
      }
    } catch (checkErr) {
      console.warn("Table inspection notice:", checkErr.message);
    }

    if (needsCleanRebuild) {
      console.log("🧹 Dropping old incompatible tables to build clean LMS schema...");
      await client.query(`
        DROP TABLE IF EXISTS test_results, doubts, activities, certificates, quiz_attempts,
        quiz_questions, quizzes, assignment_submissions, assignments, video_progress,
        enrollments, payments, orders, lectures, sections, students, courses, users CASCADE;
      `);
      console.log("✅ Old incompatible tables dropped. Initializing pristine tables...");
    } else {
      // Safe evolution statements for existing compatible schemas
      const upgradeStatements = [
        "ALTER TABLE courses ADD COLUMN IF NOT EXISTS course_id VARCHAR(100);",
        "ALTER TABLE courses ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'General';",
        "ALTER TABLE courses ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true;",
        "ALTER TABLE courses ADD COLUMN IF NOT EXISTS total_lectures INTEGER DEFAULT 0;",
        "ALTER TABLE courses ADD COLUMN IF NOT EXISTS total_students INTEGER DEFAULT 0;",
        "ALTER TABLE courses ADD COLUMN IF NOT EXISTS rating NUMERIC(3, 2) DEFAULT 4.9;",
        "ALTER TABLE students ADD COLUMN IF NOT EXISTS course_id INTEGER;",
        "ALTER TABLE students ADD COLUMN IF NOT EXISTS course_code VARCHAR(100);",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS dob VARCHAR(50);",
        "ALTER TABLE students ADD COLUMN IF NOT EXISTS dob VARCHAR(50);",
        "ALTER TABLE students ADD COLUMN IF NOT EXISTS batch VARCHAR(100) DEFAULT 'Regular 2026';",
        "ALTER TABLE students ADD COLUMN IF NOT EXISTS image TEXT;",
        "ALTER TABLE orders ADD COLUMN IF NOT EXISTS student_id INTEGER;",
        "ALTER TABLE payments ADD COLUMN IF NOT EXISTS student_id INTEGER;",
        "ALTER TABLE payments ADD COLUMN IF NOT EXISTS razorpay_signature VARCHAR(500);",
        "ALTER TABLE activities ADD COLUMN IF NOT EXISTS student_id INTEGER;",
        "ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS student_id INTEGER;",
        "ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;",
        "ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'completed';",
        "ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS progress NUMERIC(5, 2) DEFAULT 0;",
        "ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS course_code VARCHAR(100);",
        "ALTER TABLE video_progress ADD COLUMN IF NOT EXISTS student_id INTEGER;",
        "ALTER TABLE video_progress ADD COLUMN IF NOT EXISTS course_id INTEGER;",
        "ALTER TABLE quizzes ADD COLUMN IF NOT EXISTS passing_score INTEGER DEFAULT 60;",
        "ALTER TABLE quiz_questions ADD COLUMN IF NOT EXISTS options JSONB;",
        "ALTER TABLE assignments ADD COLUMN IF NOT EXISTS max_marks INTEGER DEFAULT 100;",
        "ALTER TABLE assignments ADD COLUMN IF NOT EXISTS resource_url TEXT;",
        "ALTER TABLE assignment_submissions ADD COLUMN IF NOT EXISTS notes TEXT;",
        "ALTER TABLE assignment_submissions ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'Submitted';",
        "ALTER TABLE certificates ADD COLUMN IF NOT EXISTS user_id INTEGER;",
        "ALTER TABLE certificates ADD COLUMN IF NOT EXISTS pdf_url TEXT;",
        "ALTER TABLE certificates ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'Pending';",
        "ALTER TABLE certificates ADD COLUMN IF NOT EXISTS grade VARCHAR(50) DEFAULT 'Grade A+';",
        "ALTER TABLE certificates ADD COLUMN IF NOT EXISTS issued_by VARCHAR(100) DEFAULT 'Admin';",
        "ALTER TABLE certificates ADD COLUMN IF NOT EXISTS completion_percent INTEGER DEFAULT 100;",
        "ALTER TABLE certificates ADD COLUMN IF NOT EXISTS requested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;",
        "ALTER TABLE certificates ADD COLUMN IF NOT EXISTS issue_date TIMESTAMP WITH TIME ZONE;",
      ];
      for (const sql of upgradeStatements) {
        try {
          await client.query(sql);
        } catch (err) {
          // ignore
        }
      }
    }

    // 1. EXECUTE SCHEMA MIGRATIONS
    const schemaPath = path.join(__dirname, "schema.sql");
    if (fs.existsSync(schemaPath)) {
      console.log("📦 Applying schema.sql (18 Relational Tables & Indexes)...");
      const schemaSql = fs.readFileSync(schemaPath, "utf8");
      await client.query(schemaSql);
      results.schemaCreated = true;
      console.log("✅ Schema successfully verified and applied.");
    }

    // 2. LOAD STORE DATA
    const storePath = path.join(__dirname, "..", "..", "data", "lms_store.json");
    if (!fs.existsSync(storePath)) {
      throw new Error(`Data store not found at: ${storePath}`);
    }
    const rawData = fs.readFileSync(storePath, "utf8");
    const store = JSON.parse(rawData);

    // Map to preserve ID lookups
    const userIdMap = new Map();
    const courseIdMap = new Map();
    const sectionIdMap = new Map();
    const quizIdMap = new Map();

    // 3. SYNC USERS (Skip if already in DB)
    if (Array.isArray(store.users) && store.users.length > 0) {
      console.log(`👤 Checking ${store.users.length} Users...`);
      for (const u of store.users) {
        const normalizedEmail = (u.email || "").toLowerCase().trim();
        if (!normalizedEmail) continue;

        // Check if user already exists by email OR id
        const existing = await client.query(
          `SELECT id, email FROM users WHERE LOWER(email) = LOWER($1) OR id = $2`,
          [normalizedEmail, u.id]
        );

        const existingByEmail = existing.rows.find(
          (r) => (r.email || "").toLowerCase() === normalizedEmail
        );

        if (existingByEmail) {
          // Already in DB -> SKIP!
          userIdMap.set(u.id, existingByEmail.id);
          results.usersSkipped++;
          continue;
        }

        let role = (u.role || "student").toLowerCase().trim();
        let phone = u.phone || null;
        if (!["admin", "teacher", "student"].includes(role)) {
          if (role.startsWith("+") || /^\d+$/.test(role)) {
            if (!phone) phone = role;
          }
          role = "student";
        }

        // Not in DB by email. Check if u.id is taken by a different user
        const existingById = existing.rows.find((r) => Number(r.id) === Number(u.id));
        let actualId;
        if (existingById) {
          // u.id taken -> insert with auto-generated ID
          const insertRes = await client.query(
            `INSERT INTO users (name, full_name, email, password, role, phone, dob, specialization, status, avatar, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
             RETURNING id`,
            [
              u.name || "User",
              u.full_name || u.name || "User",
              normalizedEmail,
              u.password,
              role,
              phone,
              u.dob || null,
              u.specialization || null,
              u.status || "Active",
              u.avatar || null,
              u.created_at || new Date(),
            ]
          );
          actualId = insertRes.rows[0].id;
        } else {
          // u.id is free -> insert with u.id
          const insertRes = await client.query(
            `INSERT INTO users (id, name, full_name, email, password, role, phone, dob, specialization, status, avatar, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
             ON CONFLICT (id) DO NOTHING
             RETURNING id`,
            [
              u.id,
              u.name || "User",
              u.full_name || u.name || "User",
              normalizedEmail,
              u.password,
              role,
              phone,
              u.dob || null,
              u.specialization || null,
              u.status || "Active",
              u.avatar || null,
              u.created_at || new Date(),
            ]
          );
          actualId = insertRes.rows[0]?.id || u.id;
        }

        userIdMap.set(u.id, actualId);
        results.usersSynced++;
      }
      console.log(`✅ Users: ${results.usersSynced} inserted, ${results.usersSkipped} skipped (already in DB).`);
    }

    // 4. SYNC COURSES (Skip if already in DB)
    if (Array.isArray(store.courses) && store.courses.length > 0) {
      console.log(`📚 Checking ${store.courses.length} Courses...`);
      for (const c of store.courses) {
        // Check if course already in DB by course_id OR title
        const existing = await client.query(
          `SELECT id, course_id, title FROM courses WHERE course_id = $1 OR LOWER(title) = LOWER($2) OR id = $3`,
          [c.course_id, (c.title || "").trim(), c.id]
        );

        const match = existing.rows.find(
          (r) =>
            r.course_id === c.course_id ||
            (r.title || "").toLowerCase() === (c.title || "").toLowerCase()
        );

        if (match) {
          // Already in DB -> SKIP!
          courseIdMap.set(c.id, match.id);
          courseIdMap.set(c.course_id, match.id);
          results.coursesSkipped++;
          continue;
        }

        const teacherId = c.teacher_id ? (userIdMap.get(c.teacher_id) || null) : null;
        const existingById = existing.rows.find((r) => Number(r.id) === Number(c.id));
        let actualId;

        if (existingById) {
          // c.id taken -> insert with auto-generated ID
          const insertRes = await client.query(
            `INSERT INTO courses (
               course_id, title, description, price, original_price,
               duration, level, category, teacher, teacher_id,
               thumbnail, is_published, total_lectures, total_students,
               rating, created_at, updated_at
             )
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
             RETURNING id, course_id`,
            [
              c.course_id,
              c.title,
              c.description || "",
              c.price || 0,
              c.original_price || 0,
              c.duration || "Self-Paced",
              c.level || "Beginner",
              c.category || "General",
              c.teacher || "Faculty",
              teacherId,
              c.thumbnail || null,
              c.is_published !== undefined ? c.is_published : true,
              c.total_lectures || 0,
              c.total_students || 0,
              c.rating || 4.9,
              c.created_at || new Date(),
              c.updated_at || new Date(),
            ]
          );
          actualId = insertRes.rows[0].id;
        } else {
          // c.id is free -> insert with c.id
          const insertRes = await client.query(
            `INSERT INTO courses (
               id, course_id, title, description, price, original_price,
               duration, level, category, teacher, teacher_id,
               thumbnail, is_published, total_lectures, total_students,
               rating, created_at, updated_at
             )
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
             ON CONFLICT (id) DO NOTHING
             RETURNING id, course_id`,
            [
              c.id,
              c.course_id,
              c.title,
              c.description || "",
              c.price || 0,
              c.original_price || 0,
              c.duration || "Self-Paced",
              c.level || "Beginner",
              c.category || "General",
              c.teacher || "Faculty",
              teacherId,
              c.thumbnail || null,
              c.is_published !== undefined ? c.is_published : true,
              c.total_lectures || 0,
              c.total_students || 0,
              c.rating || 4.9,
              c.created_at || new Date(),
              c.updated_at || new Date(),
            ]
          );
          actualId = insertRes.rows[0]?.id || c.id;
        }

        courseIdMap.set(c.id, actualId);
        courseIdMap.set(c.course_id, actualId);
        results.coursesSynced++;
      }
      console.log(`✅ Courses: ${results.coursesSynced} inserted, ${results.coursesSkipped} skipped (already in DB).`);
    }

    // 5. SYNC SECTIONS (MODULES) (Skip if already in DB)
    if (Array.isArray(store.sections) && store.sections.length > 0) {
      console.log(`📑 Checking ${store.sections.length} Sections...`);
      for (const s of store.sections) {
        const actualCourseId = courseIdMap.get(s.course_id) || s.course_id;
        if (!actualCourseId) continue;

        // Check if section already in DB by course_id + title
        const existing = await client.query(
          `SELECT id, course_id, title FROM sections WHERE course_id = $1 AND LOWER(TRIM(title)) = LOWER(TRIM($2))`,
          [actualCourseId, s.title]
        );

        if (existing.rows.length > 0) {
          // Already in DB -> SKIP!
          sectionIdMap.set(s.id, existing.rows[0].id);
          results.sectionsSkipped++;
          continue;
        }

        // Not in DB -> check if s.id is free
        const idCheck = await client.query(`SELECT id FROM sections WHERE id = $1`, [s.id]);
        let actualSectionId;
        if (idCheck.rows.length > 0) {
          // s.id taken -> insert with auto-generated id
          const insertRes = await client.query(
            `INSERT INTO sections (course_id, title, order_num, created_at)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
            [actualCourseId, s.title.trim(), s.order_num || 1, s.created_at || new Date()]
          );
          actualSectionId = insertRes.rows[0].id;
        } else {
          // s.id free -> insert with s.id
          const insertRes = await client.query(
            `INSERT INTO sections (id, course_id, title, order_num, created_at)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (id) DO NOTHING
             RETURNING id`,
            [s.id, actualCourseId, s.title.trim(), s.order_num || 1, s.created_at || new Date()]
          );
          actualSectionId = insertRes.rows[0]?.id || s.id;
        }

        sectionIdMap.set(s.id, actualSectionId);
        results.sectionsSynced++;
      }
      console.log(`✅ Sections: ${results.sectionsSynced} inserted, ${results.sectionsSkipped} skipped (already in DB).`);
    }

    // 6. SYNC LECTURES (Skip if already in DB)
    if (Array.isArray(store.lectures) && store.lectures.length > 0) {
      console.log(`🎬 Checking ${store.lectures.length} Lectures...`);
      for (const l of store.lectures) {
        const actualCourseId = courseIdMap.get(l.course_id) || l.course_id;
        const actualSectionId = l.section_id ? (sectionIdMap.get(l.section_id) || l.section_id) : null;
        if (!actualCourseId) continue;

        // Check if lecture already in DB by course_id + title
        const existing = await client.query(
          `SELECT id, title FROM lectures WHERE course_id = $1 AND LOWER(TRIM(title)) = LOWER(TRIM($2))`,
          [actualCourseId, l.title]
        );

        if (existing.rows.length > 0) {
          // Already in DB -> SKIP!
          results.lecturesSkipped++;
          continue;
        }

        // Not in DB -> check if l.id is free
        const idCheck = await client.query(`SELECT id FROM lectures WHERE id = $1`, [l.id]);
        if (idCheck.rows.length > 0) {
          // l.id taken -> insert with auto-generated id
          await client.query(
            `INSERT INTO lectures (
               course_id, section_id, title, description,
               video_url, pdf_url, duration, order_num, is_free_preview, created_at
             )
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [
              actualCourseId,
              actualSectionId,
              l.title,
              l.description || "",
              l.video_url || null,
              l.pdf_url || null,
              l.duration || "10:00",
              l.order_num || 1,
              Boolean(l.is_free_preview),
              l.created_at || new Date(),
            ]
          );
        } else {
          // l.id free -> insert with l.id
          await client.query(
            `INSERT INTO lectures (
               id, course_id, section_id, title, description,
               video_url, pdf_url, duration, order_num, is_free_preview, created_at
             )
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
             ON CONFLICT (id) DO NOTHING`,
            [
              l.id,
              actualCourseId,
              actualSectionId,
              l.title,
              l.description || "",
              l.video_url || null,
              l.pdf_url || null,
              l.duration || "10:00",
              l.order_num || 1,
              Boolean(l.is_free_preview),
              l.created_at || new Date(),
            ]
          );
        }
        results.lecturesSynced++;
      }
      console.log(`✅ Lectures: ${results.lecturesSynced} inserted, ${results.lecturesSkipped} skipped (already in DB).`);
    }

    // 7. SYNC STUDENTS (Skip if already in DB)
    if (Array.isArray(store.students) && store.students.length > 0) {
      console.log(`🎓 Checking ${store.students.length} Students...`);
      for (const st of store.students) {
        const actualUserId = userIdMap.get(st.user_id) || st.user_id;
        const actualCourseId = st.course_id ? (courseIdMap.get(st.course_id) || st.course_id) : null;
        if (!actualUserId) continue;

        // Check if student already in DB by student_id OR email
        const existing = await client.query(
          `SELECT id, student_id, email FROM students WHERE student_id = $1 OR LOWER(email) = LOWER($2)`,
          [st.student_id, (st.email || "").trim()]
        );

        if (existing.rows.length > 0) {
          // Already in DB -> SKIP!
          results.studentsSkipped++;
          continue;
        }

        // Not in DB -> check if st.id is free
        const idCheck = await client.query(`SELECT id FROM students WHERE id = $1`, [st.id]);
        if (idCheck.rows.length > 0) {
          await client.query(
            `INSERT INTO students (
               user_id, student_id, course_id, course_code, name, email, password, phone, dob, course, batch, status, created_at
             )
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
            [
              actualUserId,
              st.student_id,
              actualCourseId,
              st.course_code || null,
              st.name || "Student",
              st.email,
              st.password,
              st.phone || null,
              st.dob || null,
              st.course || null,
              st.batch || "Regular 2026",
              st.status || "Active",
              st.created_at || new Date(),
            ]
          );
        } else {
          await client.query(
            `INSERT INTO students (
               id, user_id, student_id, course_id, course_code, name, email, password, phone, dob, course, batch, status, created_at
             )
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
             ON CONFLICT (id) DO NOTHING`,
            [
              st.id,
              actualUserId,
              st.student_id,
              actualCourseId,
              st.course_code || null,
              st.name || "Student",
              st.email,
              st.password,
              st.phone || null,
              st.dob || null,
              st.course || null,
              st.batch || "Regular 2026",
              st.status || "Active",
              st.created_at || new Date(),
            ]
          );
        }
        results.studentsSynced++;
      }
      console.log(`✅ Students: ${results.studentsSynced} inserted, ${results.studentsSkipped} skipped (already in DB).`);
    }

    // 8. SYNC QUIZZES & QUESTIONS (Skip if already in DB)
    if (Array.isArray(store.quizzes) && store.quizzes.length > 0) {
      console.log(`❓ Checking ${store.quizzes.length} Quizzes...`);
      for (const q of store.quizzes) {
        const actualCourseId = courseIdMap.get(q.course_id) || q.course_id;
        if (!actualCourseId) continue;

        const existing = await client.query(
          `SELECT id FROM quizzes WHERE course_id = $1 AND LOWER(TRIM(title)) = LOWER(TRIM($2))`,
          [actualCourseId, q.title]
        );

        if (existing.rows.length > 0) {
          quizIdMap.set(q.id, existing.rows[0].id);
          results.quizzesSkipped++;
          continue;
        }

        const idCheck = await client.query(`SELECT id FROM quizzes WHERE id = $1`, [q.id]);
        let actualQuizId;
        if (idCheck.rows.length > 0) {
          const res = await client.query(
            `INSERT INTO quizzes (course_id, title, passing_score, created_at)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
            [actualCourseId, q.title, q.passing_score || 60, q.created_at || new Date()]
          );
          actualQuizId = res.rows[0].id;
        } else {
          const res = await client.query(
            `INSERT INTO quizzes (id, course_id, title, passing_score, created_at)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (id) DO NOTHING
             RETURNING id`,
            [q.id, actualCourseId, q.title, q.passing_score || 60, q.created_at || new Date()]
          );
          actualQuizId = res.rows[0]?.id || q.id;
        }

        quizIdMap.set(q.id, actualQuizId);
        results.quizzesSynced++;
      }
      console.log(`✅ Quizzes: ${results.quizzesSynced} inserted, ${results.quizzesSkipped} skipped (already in DB).`);
    }

    if (Array.isArray(store.quiz_questions) && store.quiz_questions.length > 0) {
      console.log(`❓ Checking ${store.quiz_questions.length} Quiz Questions...`);
      for (const qq of store.quiz_questions) {
        const actualQuizId = quizIdMap.get(qq.quiz_id) || qq.quiz_id;
        if (!actualQuizId) continue;

        const existing = await client.query(
          `SELECT id FROM quiz_questions WHERE quiz_id = $1 AND LOWER(TRIM(question)) = LOWER(TRIM($2))`,
          [actualQuizId, qq.question]
        );

        if (existing.rows.length > 0) {
          results.quizQuestionsSkipped++;
          continue;
        }

        const idCheck = await client.query(`SELECT id FROM quiz_questions WHERE id = $1`, [qq.id]);
        if (idCheck.rows.length > 0) {
          await client.query(
            `INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_option, options, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [
              actualQuizId,
              qq.question,
              qq.option_a || "Option A",
              qq.option_b || "Option B",
              qq.option_c || "Option C",
              qq.option_d || "Option D",
              qq.correct_option || "A",
              qq.options ? JSON.stringify(qq.options) : null,
              qq.created_at || new Date(),
            ]
          );
        } else {
          await client.query(
            `INSERT INTO quiz_questions (id, quiz_id, question, option_a, option_b, option_c, option_d, correct_option, options, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
             ON CONFLICT (id) DO NOTHING`,
            [
              qq.id,
              actualQuizId,
              qq.question,
              qq.option_a || "Option A",
              qq.option_b || "Option B",
              qq.option_c || "Option C",
              qq.option_d || "Option D",
              qq.correct_option || "A",
              qq.options ? JSON.stringify(qq.options) : null,
              qq.created_at || new Date(),
            ]
          );
        }
        results.quizQuestionsSynced++;
      }
      console.log(`✅ Quiz Questions: ${results.quizQuestionsSynced} inserted, ${results.quizQuestionsSkipped} skipped (already in DB).`);
    }

    // 9. SYNC ASSIGNMENTS (Skip if already in DB)
    if (Array.isArray(store.assignments) && store.assignments.length > 0) {
      console.log(`📝 Checking ${store.assignments.length} Assignments...`);
      for (const a of store.assignments) {
        const actualCourseId = courseIdMap.get(a.course_id) || a.course_id;
        if (!actualCourseId) continue;

        const existing = await client.query(
          `SELECT id FROM assignments WHERE course_id = $1 AND LOWER(TRIM(title)) = LOWER(TRIM($2))`,
          [actualCourseId, a.title]
        );

        if (existing.rows.length > 0) {
          results.assignmentsSkipped++;
          continue;
        }

        const idCheck = await client.query(`SELECT id FROM assignments WHERE id = $1`, [a.id]);
        if (idCheck.rows.length > 0) {
          await client.query(
            `INSERT INTO assignments (course_id, title, description, due_date, max_marks, resource_url, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [actualCourseId, a.title, a.description || "", a.due_date || null, a.max_marks || 100, a.resource_url || null, a.created_at || new Date()]
          );
        } else {
          await client.query(
            `INSERT INTO assignments (id, course_id, title, description, due_date, max_marks, resource_url, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             ON CONFLICT (id) DO NOTHING`,
            [a.id, actualCourseId, a.title, a.description || "", a.due_date || null, a.max_marks || 100, a.resource_url || null, a.created_at || new Date()]
          );
        }
        results.assignmentsSynced++;
      }
      console.log(`✅ Assignments: ${results.assignmentsSynced} inserted, ${results.assignmentsSkipped} skipped (already in DB).`);
    }

    // 10. SYNC ORDERS & PAYMENTS & ENROLLMENTS (Skip if already in DB)
    if (Array.isArray(store.orders) && store.orders.length > 0) {
      console.log(`💳 Checking ${store.orders.length} Orders...`);
      for (const o of store.orders) {
        const actualUserId = userIdMap.get(o.user_id) || o.user_id;
        const actualCourseId = courseIdMap.get(o.course_id) || o.course_id;
        if (!actualUserId || !actualCourseId) continue;

        const orderIdStr = o.razorpay_order_id || `order_mock_${o.id}`;
        const existing = await client.query(
          `SELECT id FROM orders WHERE razorpay_order_id = $1`,
          [orderIdStr]
        );

        if (existing.rows.length > 0) {
          results.ordersSkipped++;
          continue;
        }

        let orderStatus = (o.status || "created").toLowerCase().trim();
        if (!["created", "paid", "failed"].includes(orderStatus)) {
          orderStatus = "created";
        }

        await client.query(
          `INSERT INTO orders (user_id, student_id, course_id, razorpay_order_id, amount, currency, status, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           ON CONFLICT (razorpay_order_id) DO NOTHING`,
          [
            actualUserId,
            o.student_id || null,
            actualCourseId,
            orderIdStr,
            o.amount || 0,
            o.currency || "INR",
            orderStatus,
            o.created_at || new Date(),
          ]
        );
        results.ordersSynced++;
      }
      console.log(`✅ Orders: ${results.ordersSynced} inserted, ${results.ordersSkipped} skipped (already in DB).`);
    }

    if (Array.isArray(store.payments) && store.payments.length > 0) {
      console.log(`💰 Checking ${store.payments.length} Payments...`);
      for (const p of store.payments) {
        const actualUserId = userIdMap.get(p.user_id) || p.user_id;
        const actualCourseId = courseIdMap.get(p.course_id) || p.course_id;
        if (!actualUserId || !actualCourseId) continue;

        const paymentIdStr = p.razorpay_payment_id || `pay_mock_${p.id}`;
        const existing = await client.query(
          `SELECT id FROM payments WHERE razorpay_payment_id = $1`,
          [paymentIdStr]
        );

        if (existing.rows.length > 0) {
          results.paymentsSkipped++;
          continue;
        }

        await client.query(
          `INSERT INTO payments (
             user_id, student_id, course_id, razorpay_payment_id, razorpay_order_id, razorpay_signature, amount, status, created_at
           )
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           ON CONFLICT (razorpay_payment_id) DO NOTHING`,
          [
            actualUserId,
            p.student_id || null,
            actualCourseId,
            paymentIdStr,
            p.razorpay_order_id || null,
            p.razorpay_signature || null,
            p.amount || 0,
            p.status || "Success",
            p.created_at || new Date(),
          ]
        );
        results.paymentsSynced++;
      }
      console.log(`✅ Payments: ${results.paymentsSynced} inserted, ${results.paymentsSkipped} skipped (already in DB).`);
    }

    if (Array.isArray(store.enrollments) && store.enrollments.length > 0) {
      console.log(`🎟️ Checking ${store.enrollments.length} Enrollments...`);
      for (const e of store.enrollments) {
        const actualUserId = userIdMap.get(e.user_id) || e.user_id;
        const actualCourseId = courseIdMap.get(e.course_id) || e.course_id;
        if (!actualUserId || !actualCourseId) continue;

        const existing = await client.query(
          `SELECT id FROM enrollments WHERE user_id = $1 AND course_id = $2`,
          [actualUserId, actualCourseId]
        );

        if (existing.rows.length > 0) {
          results.enrollmentsSkipped++;
          continue;
        }

        await client.query(
          `INSERT INTO enrollments (
             user_id, student_id, course_id, status, enrollment_date, payment_status, progress, course_code, enrolled_at
           )
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           ON CONFLICT (user_id, course_id) DO NOTHING`,
          [
            actualUserId,
            e.student_id || null,
            actualCourseId,
            e.status || "Active",
            e.enrollment_date || new Date(),
            e.payment_status || "completed",
            e.progress || 0,
            e.course_code || null,
            e.created_at || new Date(),
          ]
        );
        results.enrollmentsSynced++;
      }
      console.log(`✅ Enrollments: ${results.enrollmentsSynced} inserted, ${results.enrollmentsSkipped} skipped (already in DB).`);
    }

    // 11. RESET ALL SERIAL PRIMARY KEY SEQUENCES
    console.log("🔢 Realiging PostgreSQL Primary Key Sequences (setval)...");
    const tablesToReset = [
      "users",
      "courses",
      "sections",
      "lectures",
      "students",
      "orders",
      "payments",
      "enrollments",
      "quizzes",
      "quiz_questions",
      "assignments",
      "assignment_submissions",
      "activities",
    ];

    for (const tableName of tablesToReset) {
      try {
        await client.query(
          `SELECT setval(pg_get_serial_sequence('${tableName}', 'id'), COALESCE(MAX(id), 1)) FROM ${tableName};`
        );
        results.sequencesUpdated++;
      } catch (seqErr) {
        console.warn(`⚠️ Note on sequence for ${tableName}: ${seqErr.message}`);
      }
    }

    console.log("==================================================");
    console.log("🎉 ALL LMS STORE DATA SYNCHRONIZED SUCCESSFULLY!");
    console.log(JSON.stringify(results, null, 2));
    console.log("==================================================");

    return results;
  } catch (error) {
    console.error("❌ Fatal Error during Database Sync:", error);
    throw error;
  } finally {
    client.release();
    if (shouldClosePool) {
      await pool.end();
    }
  }
}

// Standalone execution support
if (require.main === module) {
  syncDatabase()
    .then((res) => {
      console.log("Sync Finished Successfully. Exiting.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Sync Failed:", err.message);
      process.exit(1);
    });
}

module.exports = { syncDatabase };

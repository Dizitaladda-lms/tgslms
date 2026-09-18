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
      const existingUsersRes = await client.query(
        `SELECT id, LOWER(TRIM(email)) AS email_key FROM users`
      );
      const existingUserMap = new Map();
      const takenUserIds = new Set();
      for (const r of existingUsersRes.rows) {
        if (r.email_key) existingUserMap.set(r.email_key, r.id);
        takenUserIds.add(Number(r.id));
      }

      for (const u of store.users) {
        const normalizedEmail = (u.email || "").toLowerCase().trim();
        if (!normalizedEmail) continue;

        if (existingUserMap.has(normalizedEmail)) {
          // Already in DB -> SKIP!
          userIdMap.set(u.id, existingUserMap.get(normalizedEmail));
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

        let actualId;
        if (takenUserIds.has(Number(u.id))) {
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

        takenUserIds.add(Number(actualId));
        existingUserMap.set(normalizedEmail, actualId);
        userIdMap.set(u.id, actualId);
        results.usersSynced++;
      }
      console.log(`✅ Users: ${results.usersSynced} inserted, ${results.usersSkipped} skipped (already in DB).`);
    }

    // 4. SYNC COURSES (Skip if already in DB)
    if (Array.isArray(store.courses) && store.courses.length > 0) {
      console.log(`📚 Checking ${store.courses.length} Courses...`);
      const existingCoursesRes = await client.query(
        `SELECT id, course_id, LOWER(TRIM(title)) AS title_key FROM courses`
      );
      const existingCourseMap = new Map();
      const takenCourseIds = new Set();
      for (const r of existingCoursesRes.rows) {
        if (r.course_id) existingCourseMap.set(`cid:::${r.course_id}`, r.id);
        if (r.title_key) existingCourseMap.set(`title:::${r.title_key}`, r.id);
        takenCourseIds.add(Number(r.id));
      }

      for (const c of store.courses) {
        const titleKey = (c.title || "").trim().toLowerCase();
        const matchedId =
          existingCourseMap.get(`cid:::${c.course_id}`) ||
          existingCourseMap.get(`title:::${titleKey}`);

        if (matchedId) {
          // Already in DB -> SKIP!
          courseIdMap.set(c.id, matchedId);
          courseIdMap.set(c.course_id, matchedId);
          results.coursesSkipped++;
          continue;
        }

        const teacherId = c.teacher_id ? (userIdMap.get(c.teacher_id) || null) : null;
        let actualId;

        if (takenCourseIds.has(Number(c.id))) {
          // c.id taken -> insert with auto-generated ID
          const insertRes = await client.query(
            `INSERT INTO courses (
               course_id, title, description, price, original_price,
               duration, level, category, teacher, teacher_id,
               thumbnail, is_published, total_lectures, total_students,
               rating, created_at, updated_at
             )
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
             RETURNING id`,
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
             RETURNING id`,
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

        takenCourseIds.add(Number(actualId));
        if (c.course_id) existingCourseMap.set(`cid:::${c.course_id}`, actualId);
        if (titleKey) existingCourseMap.set(`title:::${titleKey}`, actualId);
        courseIdMap.set(c.id, actualId);
        courseIdMap.set(c.course_id, actualId);
        results.coursesSynced++;
      }
      console.log(`✅ Courses: ${results.coursesSynced} inserted, ${results.coursesSkipped} skipped (already in DB).`);
    }

    // 5. SYNC SECTIONS (MODULES) (Skip if already in DB)
    if (Array.isArray(store.sections) && store.sections.length > 0) {
      console.log(`📑 Checking ${store.sections.length} Sections...`);
      const existingSectionsRes = await client.query(
        `SELECT id, course_id, LOWER(TRIM(title)) AS title_key FROM sections`
      );
      const existingSectionMap = new Map();
      const takenSectionIds = new Set();
      for (const r of existingSectionsRes.rows) {
        existingSectionMap.set(`${r.course_id}:::${r.title_key}`, r.id);
        takenSectionIds.add(Number(r.id));
      }

      for (const s of store.sections) {
        const actualCourseId = courseIdMap.get(s.course_id) || s.course_id;
        if (!actualCourseId) continue;

        const titleKey = (s.title || "").trim().toLowerCase();
        const sectionKey = `${actualCourseId}:::${titleKey}`;

        if (existingSectionMap.has(sectionKey)) {
          // Already in DB -> SKIP!
          sectionIdMap.set(s.id, existingSectionMap.get(sectionKey));
          results.sectionsSkipped++;
          continue;
        }

        let actualSectionId;
        if (takenSectionIds.has(Number(s.id))) {
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

        takenSectionIds.add(Number(actualSectionId));
        existingSectionMap.set(sectionKey, actualSectionId);
        sectionIdMap.set(s.id, actualSectionId);
        results.sectionsSynced++;
      }
      console.log(`✅ Sections: ${results.sectionsSynced} inserted, ${results.sectionsSkipped} skipped (already in DB).`);
    }

    // 6. SYNC LECTURES (Purge if empty, or Skip if already in DB)
    if (!Array.isArray(store.lectures) || store.lectures.length === 0) {
      console.log("🧹 Purging all legacy dummy lectures from database (Clean slate for real lectures)...");
      await client.query("DELETE FROM video_progress;").catch(() => {});
      await client.query("DELETE FROM lectures;").catch(() => {});
      await client.query("UPDATE courses SET total_lectures = 0;").catch(() => {});
      try {
        await client.query("SELECT setval(pg_get_serial_sequence('lectures', 'id'), 1, false);");
      } catch (_) {}
      console.log("✅ All dummy lectures successfully purged from PostgreSQL database.");
    } else {
      console.log(`🎬 Checking ${store.lectures.length} Lectures...`);
      const existingLecturesRes = await client.query(
        `SELECT id, course_id, LOWER(TRIM(title)) AS title_key FROM lectures`
      );
      const existingLectureSet = new Set();
      const takenLectureIds = new Set();
      for (const r of existingLecturesRes.rows) {
        existingLectureSet.add(`${r.course_id}:::${r.title_key}`);
        takenLectureIds.add(Number(r.id));
      }

      for (const l of store.lectures) {
        const actualCourseId = courseIdMap.get(l.course_id) || l.course_id;
        const actualSectionId = l.section_id ? (sectionIdMap.get(l.section_id) || l.section_id) : null;
        if (!actualCourseId) continue;

        const titleKey = (l.title || "").trim().toLowerCase();
        const lectureKey = `${actualCourseId}:::${titleKey}`;

        if (existingLectureSet.has(lectureKey)) {
          // Already in DB -> SKIP!
          results.lecturesSkipped++;
          continue;
        }

        if (takenLectureIds.has(Number(l.id))) {
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
          takenLectureIds.add(Number(l.id));
        }

        existingLectureSet.add(lectureKey);
        results.lecturesSynced++;
      }
      console.log(`✅ Lectures: ${results.lecturesSynced} inserted, ${results.lecturesSkipped} skipped (already in DB).`);
    }

    // 7. SYNC STUDENTS (Skip if already in DB)
    if (Array.isArray(store.students) && store.students.length > 0) {
      console.log(`🎓 Checking ${store.students.length} Students...`);
      const existingStudentsRes = await client.query(
        `SELECT id, student_id, LOWER(TRIM(email)) AS email_key FROM students`
      );
      const existingStudentKeys = new Set();
      const takenStudentIds = new Set();
      for (const r of existingStudentsRes.rows) {
        if (r.student_id) existingStudentKeys.add(`sid:::${r.student_id}`);
        if (r.email_key) existingStudentKeys.add(`email:::${r.email_key}`);
        takenStudentIds.add(Number(r.id));
      }

      for (const st of store.students) {
        const actualUserId = userIdMap.get(st.user_id) || st.user_id;
        const actualCourseId = st.course_id ? (courseIdMap.get(st.course_id) || st.course_id) : null;
        if (!actualUserId) continue;

        const emailKey = (st.email || "").trim().toLowerCase();
        if (
          (st.student_id && existingStudentKeys.has(`sid:::${st.student_id}`)) ||
          (emailKey && existingStudentKeys.has(`email:::${emailKey}`))
        ) {
          // Already in DB -> SKIP!
          results.studentsSkipped++;
          continue;
        }

        if (takenStudentIds.has(Number(st.id))) {
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
          takenStudentIds.add(Number(st.id));
        }

        if (st.student_id) existingStudentKeys.add(`sid:::${st.student_id}`);
        if (emailKey) existingStudentKeys.add(`email:::${emailKey}`);
        results.studentsSynced++;
      }
      console.log(`✅ Students: ${results.studentsSynced} inserted, ${results.studentsSkipped} skipped (already in DB).`);
    }

    // 8. SYNC QUIZZES & QUESTIONS (Skip if already in DB)
    if (Array.isArray(store.quizzes) && store.quizzes.length > 0) {
      console.log(`❓ Checking ${store.quizzes.length} Quizzes...`);
      const existingQuizzesRes = await client.query(
        `SELECT id, course_id, LOWER(TRIM(title)) AS title_key FROM quizzes`
      );
      const existingQuizMap = new Map();
      const takenQuizIds = new Set();
      for (const r of existingQuizzesRes.rows) {
        existingQuizMap.set(`${r.course_id}:::${r.title_key}`, r.id);
        takenQuizIds.add(Number(r.id));
      }

      for (const q of store.quizzes) {
        const actualCourseId = courseIdMap.get(q.course_id) || q.course_id;
        if (!actualCourseId) continue;

        const titleKey = (q.title || "").trim().toLowerCase();
        const quizKey = `${actualCourseId}:::${titleKey}`;

        if (existingQuizMap.has(quizKey)) {
          quizIdMap.set(q.id, existingQuizMap.get(quizKey));
          results.quizzesSkipped++;
          continue;
        }

        let actualQuizId;
        if (takenQuizIds.has(Number(q.id))) {
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

        takenQuizIds.add(Number(actualQuizId));
        existingQuizMap.set(quizKey, actualQuizId);
        quizIdMap.set(q.id, actualQuizId);
        results.quizzesSynced++;
      }
      console.log(`✅ Quizzes: ${results.quizzesSynced} inserted, ${results.quizzesSkipped} skipped (already in DB).`);
    }

    if (Array.isArray(store.quiz_questions) && store.quiz_questions.length > 0) {
      console.log(`❓ Checking ${store.quiz_questions.length} Quiz Questions...`);
      const existingQRes = await client.query(
        `SELECT id, quiz_id, LOWER(TRIM(question)) AS question_key FROM quiz_questions`
      );
      const existingQSet = new Set();
      const takenQIds = new Set();
      for (const r of existingQRes.rows) {
        existingQSet.add(`${r.quiz_id}:::${r.question_key}`);
        takenQIds.add(Number(r.id));
      }

      for (const qq of store.quiz_questions) {
        const actualQuizId = quizIdMap.get(qq.quiz_id) || qq.quiz_id;
        if (!actualQuizId) continue;

        const qKey = `${actualQuizId}:::${(qq.question || "").trim().toLowerCase()}`;
        if (existingQSet.has(qKey)) {
          results.quizQuestionsSkipped++;
          continue;
        }

        if (takenQIds.has(Number(qq.id))) {
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
          takenQIds.add(Number(qq.id));
        }

        existingQSet.add(qKey);
        results.quizQuestionsSynced++;
      }
      console.log(`✅ Quiz Questions: ${results.quizQuestionsSynced} inserted, ${results.quizQuestionsSkipped} skipped (already in DB).`);
    }

    // 9. SYNC ASSIGNMENTS (Skip if already in DB)
    if (Array.isArray(store.assignments) && store.assignments.length > 0) {
      console.log(`📝 Checking ${store.assignments.length} Assignments...`);
      const existingAssignRes = await client.query(
        `SELECT id, course_id, LOWER(TRIM(title)) AS title_key FROM assignments`
      );
      const existingAssignSet = new Set();
      const takenAssignIds = new Set();
      for (const r of existingAssignRes.rows) {
        existingAssignSet.add(`${r.course_id}:::${r.title_key}`);
        takenAssignIds.add(Number(r.id));
      }

      for (const a of store.assignments) {
        const actualCourseId = courseIdMap.get(a.course_id) || a.course_id;
        if (!actualCourseId) continue;

        const aKey = `${actualCourseId}:::${(a.title || "").trim().toLowerCase()}`;
        if (existingAssignSet.has(aKey)) {
          results.assignmentsSkipped++;
          continue;
        }

        if (takenAssignIds.has(Number(a.id))) {
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
          takenAssignIds.add(Number(a.id));
        }

        existingAssignSet.add(aKey);
        results.assignmentsSynced++;
      }
      console.log(`✅ Assignments: ${results.assignmentsSynced} inserted, ${results.assignmentsSkipped} skipped (already in DB).`);
    }

    // 10. SYNC ORDERS & PAYMENTS & ENROLLMENTS (Skip if already in DB)
    if (Array.isArray(store.orders) && store.orders.length > 0) {
      console.log(`💳 Checking ${store.orders.length} Orders...`);
      const existingOrdersRes = await client.query(`SELECT id, razorpay_order_id FROM orders`);
      const existingOrderIds = new Set(existingOrdersRes.rows.map((r) => r.razorpay_order_id));

      for (const o of store.orders) {
        const actualUserId = userIdMap.get(o.user_id) || o.user_id;
        const actualCourseId = courseIdMap.get(o.course_id) || o.course_id;
        if (!actualUserId || !actualCourseId) continue;

        const orderIdStr = o.razorpay_order_id || `order_mock_${o.id}`;
        if (existingOrderIds.has(orderIdStr)) {
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
        existingOrderIds.add(orderIdStr);
        results.ordersSynced++;
      }
      console.log(`✅ Orders: ${results.ordersSynced} inserted, ${results.ordersSkipped} skipped (already in DB).`);
    }

    if (Array.isArray(store.payments) && store.payments.length > 0) {
      console.log(`💰 Checking ${store.payments.length} Payments...`);
      const existingPaymentsRes = await client.query(`SELECT id, razorpay_payment_id FROM payments`);
      const existingPaymentIds = new Set(existingPaymentsRes.rows.map((r) => r.razorpay_payment_id));

      for (const p of store.payments) {
        const actualUserId = userIdMap.get(p.user_id) || p.user_id;
        const actualCourseId = courseIdMap.get(p.course_id) || p.course_id;
        if (!actualUserId || !actualCourseId) continue;

        const paymentIdStr = p.razorpay_payment_id || `pay_mock_${p.id}`;
        if (existingPaymentIds.has(paymentIdStr)) {
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
            p.status || "captured",
            p.created_at || new Date(),
          ]
        );
        existingPaymentIds.add(paymentIdStr);
        results.paymentsSynced++;
      }
      console.log(`✅ Payments: ${results.paymentsSynced} inserted, ${results.paymentsSkipped} skipped (already in DB).`);
    }

    if (Array.isArray(store.enrollments) && store.enrollments.length > 0) {
      console.log(`🎟️ Checking ${store.enrollments.length} Enrollments...`);
      const existingEnrollmentsRes = await client.query(`SELECT user_id, course_id FROM enrollments`);
      const existingEnrollmentKeys = new Set(
        existingEnrollmentsRes.rows.map((r) => `${r.user_id}:::${r.course_id}`)
      );

      for (const e of store.enrollments) {
        const actualUserId = userIdMap.get(e.user_id) || e.user_id;
        const actualCourseId = courseIdMap.get(e.course_id) || e.course_id;
        if (!actualUserId || !actualCourseId) continue;

        const enrollmentKey = `${actualUserId}:::${actualCourseId}`;
        if (existingEnrollmentKeys.has(enrollmentKey)) {
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
        existingEnrollmentKeys.add(enrollmentKey);
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

/**
 * CLI Script: Create or Update Admin Account
 * Usage:
 *   node scripts/createAdmin.js <email> <password> [name] [optional_database_url]
 *
 * Examples:
 *   node scripts/createAdmin.js admin@example.com MyPass@123 "Main Admin"
 *   node scripts/createAdmin.js admin@example.com MyPass@123 "Main Admin" "postgresql://user:pass@host:5432/db"
 */

const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

// 1. Discover .env files
const envPaths = [
  path.join(__dirname, "..", "src", ".env"),
  path.join(__dirname, "..", ".env"),
  path.join(__dirname, "..", "..", ".env"),
];
for (const p of envPaths) {
  if (fs.existsSync(p)) {
    dotenv.config({ path: p });
  }
}

const args = process.argv.slice(2);
const email = args[0] ? args[0].trim().toLowerCase() : null;
const password = args[1] ? String(args[1]).trim() : null;
const name = args[2] ? args[2].trim() : "Admin";
const explicitDbUrl =
  args[3] && (args[3].startsWith("postgres://") || args[3].startsWith("postgresql://"))
    ? args[3].trim()
    : null;

if (!email || !password) {
  console.log("\n=======================================================");
  console.log("❌ ERROR: Email aur Password provide karna zaroori hai!");
  console.log("=======================================================");
  console.log("\nUsage Format:");
  console.log("  node scripts/createAdmin.js <email> <password> [name] [database_url]\n");
  console.log("Example:");
  console.log('  node scripts/createAdmin.js admin@dizitaladda.com Admin@123 "Super Admin"\n');
  process.exit(1);
}

async function run() {
  console.log("\n=======================================================");
  console.log("🔐 DIZITAL ADDA LMS — CREATE / UPDATE ADMIN USER");
  console.log("=======================================================");
  console.log(`Email    : ${email}`);
  console.log(`Name     : ${name}`);
  console.log(`Role     : admin`);

  const hashedPassword = bcrypt.hashSync(password, 10);
  let pgSuccess = false;
  let jsonSuccess = false;

  // ----------------------------------------------------
  // A. UPDATE / CREATE IN POSTGRESQL (If configured)
  // ----------------------------------------------------
  const connectionString = (explicitDbUrl || process.env.DATABASE_URL || "").trim();

  if (connectionString) {
    let pool = null;
    try {
      console.log("\n📡 Connecting to PostgreSQL database...");
      pool = new Pool({
        connectionString,
        ssl:
          connectionString.includes("sslmode=require") ||
          connectionString.includes("neon.tech") ||
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
        connectionTimeoutMillis: 10000,
      });

      const client = await pool.connect();

      // Ensure users table exists with required columns
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          full_name VARCHAR(255),
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(50) DEFAULT 'student',
          status VARCHAR(50) DEFAULT 'Active',
          phone VARCHAR(50),
          specialization VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        ALTER TABLE users ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'Active';
        ALTER TABLE users ADD COLUMN IF NOT EXISTS full_name VARCHAR(255);
      `);

      // Check if user already exists
      const existing = await client.query(
        "SELECT id, email, role FROM users WHERE LOWER(email) = LOWER($1)",
        [email]
      );

      if (existing.rows.length > 0) {
        // Update password and role to admin
        await client.query(
          `UPDATE users 
           SET password = $1, role = 'admin', name = $2, full_name = $2, status = 'Active', updated_at = NOW() 
           WHERE id = $3`,
          [hashedPassword, name, existing.rows[0].id]
        );
        console.log(`✅ PostgreSQL: Existing user updated to ADMIN with new password! (ID: ${existing.rows[0].id})`);
      } else {
        // Insert new admin
        const inserted = await client.query(
          `INSERT INTO users (name, full_name, email, password, role, status, created_at, updated_at)
           VALUES ($1, $1, $2, $3, 'admin', 'Active', NOW(), NOW())
           RETURNING id`,
          [name, email, hashedPassword]
        );
        console.log(`✅ PostgreSQL: New ADMIN user created successfully! (ID: ${inserted.rows[0].id})`);
      }

      client.release();
      pgSuccess = true;
    } catch (pgErr) {
      console.warn("⚠️ PostgreSQL notice:", pgErr.message);
    } finally {
      if (pool) await pool.end();
    }
  } else {
    console.log("\n💡 Notice: DATABASE_URL is not set. Skipping direct PostgreSQL connection.");
  }

  // ----------------------------------------------------
  // B. UPDATE / CREATE IN LOCAL STORE (lms_store.json)
  // ----------------------------------------------------
  try {
    const storePath = path.join(__dirname, "..", "data", "lms_store.json");
    let storeData = { users: [] };

    if (fs.existsSync(storePath)) {
      storeData = JSON.parse(fs.readFileSync(storePath, "utf8"));
    }
    if (!Array.isArray(storeData.users)) storeData.users = [];

    const existingIdx = storeData.users.findIndex(
      (u) => (u.email || "").toLowerCase() === email
    );

    if (existingIdx !== -1) {
      storeData.users[existingIdx].password = hashedPassword;
      storeData.users[existingIdx].role = "admin";
      storeData.users[existingIdx].name = name;
      storeData.users[existingIdx].full_name = name;
      storeData.users[existingIdx].status = "Active";
      storeData.users[existingIdx].updated_at = new Date().toISOString();
      console.log(`✅ Local Store: Existing user updated to ADMIN in lms_store.json!`);
    } else {
      const nextId =
        storeData.users.length > 0
          ? Math.max(...storeData.users.map((u) => Number(u.id) || 0)) + 1
          : 1;
      const newUser = {
        id: nextId,
        name,
        full_name: name,
        email,
        password: hashedPassword,
        role: "admin",
        status: "Active",
        phone: "+919876543210",
        specialization: "LMS Administration",
        created_at: new Date().toISOString(),
      };
      storeData.users.push(newUser);
      console.log(`✅ Local Store: New ADMIN added to lms_store.json! (ID: ${nextId})`);
    }

    fs.writeFileSync(storePath, JSON.stringify(storeData, null, 2), "utf8");
    jsonSuccess = true;
  } catch (jsonErr) {
    console.warn("⚠️ Local store write notice:", jsonErr.message);
  }

  console.log("\n=======================================================");
  console.log("🎉 ADMIN READY! LOGIN CREDENTIALS:");
  console.log("=======================================================");
  console.log(`🔗 Login URL : http://localhost:5173/login (or your deployed URL /login)`);
  console.log(`📧 Email     : ${email}`);
  console.log(`🔑 Password  : ${password}`);
  console.log("=======================================================\n");
}

run();

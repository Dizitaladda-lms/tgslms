const { Pool } = require("pg");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const fallbackStore = require("../db/fallbackStore");

// Ensure environment is loaded from standard locations
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

const connectionString = (process.env.DATABASE_URL || "").trim();
const isProduction = process.env.NODE_ENV === "production";

let realPool = null;
let isPostgresAvailable = false;

if (connectionString) {
  try {
    const poolConfig = {
      connectionString,
      ssl:
        connectionString.includes("sslmode=require") ||
        connectionString.includes("neon.tech") ||
        isProduction
          ? { rejectUnauthorized: false }
          : false,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    };

    realPool = new Pool(poolConfig);

    realPool
      .connect()
      .then((client) => {
        isPostgresAvailable = true;
        console.log("PostgreSQL Database Connected Successfully ✅");
        client.release();

        // Auto-check and synchronize full store if database is empty or missing courses
        setTimeout(async () => {
          try {
            const check = await realPool.query("SELECT COUNT(*) FROM courses");
            const count = parseInt(check.rows[0].count, 10);
            if (count < 12) {
              console.log(`📦 Database has ${count} courses (< 12). Auto-synchronizing full LMS database...`);
              const { syncDatabase } = require("../db/syncAllToDb");
              await syncDatabase(realPool);
            }
          } catch (autoSyncErr) {
            console.log("ℹ️ Tables uninitialized in PostgreSQL. Executing schema & initial sync...");
            try {
              const { syncDatabase } = require("../db/syncAllToDb");
              await syncDatabase(realPool);
            } catch (err2) {
              console.warn("⚠️ Auto-sync notice:", err2.message);
            }
          }
        }, 1500);
      })
      .catch((error) => {
        isPostgresAvailable = false;
        console.warn(
          "⚠️ PostgreSQL Connection Notice (" +
            error.message +
            "). Running with Resilient In-Memory & Persistent Storage Fallback Engine."
        );
      });
  } catch (err) {
    isPostgresAvailable = false;
    console.warn("⚠️ Failed to initialize PostgreSQL Pool:", err.message);
  }
} else {
  console.log(
    "💡 DATABASE_URL not set in .env. Initializing LMS in High-Performance Local / In-Memory Mode with Seed Data."
  );
}

// Unified Resilient Pool Interface
const pool = {
  isPostgres: () => isPostgresAvailable,
  getRealPool: () => (isPostgresAvailable ? realPool : null),

  async query(text, params = []) {
    if (isPostgresAvailable && realPool) {
      try {
        return await realPool.query(text, params);
      } catch (err) {
        console.warn("⚠️ PostgreSQL query error, executing fallback:", err.message);
        return await fallbackStore.handleQuery(text, params);
      }
    }
    return await fallbackStore.handleQuery(text, params);
  },

  async connect() {
    if (isPostgresAvailable && realPool) {
      try {
        return await realPool.connect();
      } catch (err) {
        console.warn("⚠️ PostgreSQL connect error, falling back to mock client:", err.message);
      }
    }

    // Mock client for transactions (BEGIN, COMMIT, ROLLBACK) and queries
    return {
      query: async (text, params = []) => {
        return await fallbackStore.handleQuery(text, params);
      },
      release: () => {},
    };
  },

  on: (event, handler) => {
    if (realPool) realPool.on(event, handler);
  },

  end: async () => {
    if (realPool) await realPool.end();
  },
};

module.exports = pool;

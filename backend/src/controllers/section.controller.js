const pool = require("../config/db");

// Helper to resolve numeric course ID if slug is passed
const resolveCourseId = async (input) => {
  if (!input) return null;
  const num = Number(input);
  if (!isNaN(num)) return num;

  try {
    const courseRes = await pool.query(
      "SELECT id FROM courses WHERE course_id = $1 LIMIT 1",
      [String(input)]
    );
    if (courseRes.rows.length > 0) {
      return courseRes.rows[0].id;
    }
  } catch (e) {
    console.warn("Could not resolve course slug to id:", e.message);
  }
  return null;
};

exports.createSection = async (req, res) => {
  try {
    const { title, courseId, course_id, order_num, orderNum } = req.body;
    const rawCourseId = courseId || course_id;

    if (!title || !rawCourseId) {
      return res.status(400).json({
        success: false,
        message: "Section title and courseId are required",
      });
    }

    const numericCourseId = await resolveCourseId(rawCourseId);
    if (!numericCourseId) {
      return res.status(400).json({
        success: false,
        message: "Invalid course identifier",
      });
    }

    let finalOrder = order_num !== undefined ? order_num : orderNum;
    if (finalOrder === undefined) {
      const countRes = await pool.query(
        "SELECT COUNT(*) FROM sections WHERE course_id = $1",
        [numericCourseId]
      );
      finalOrder = Number(countRes.rows[0]?.count || 0) + 1;
    }

    const newSection = await pool.query(
      `INSERT INTO sections (title, course_id, order_num) VALUES ($1, $2, $3) RETURNING *`,
      [title.trim(), numericCourseId, Number(finalOrder)]
    );

    res.status(201).json({
      success: true,
      message: "Section created successfully",
      section: newSection.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const COURSE_DEFAULT_MODULES = {
  13: [
    "Month 1: Advanced Python for AI & LangChain Architecture",
    "Month 2: Production RAG Architecture & Vector Databases",
    "Month 3: Autonomous Multi-Agent Swarms & CrewAI",
    "Month 4: LangGraph Cyclic State Machines & Human-in-the-Loop",
    "Month 5: Model Context Protocol (MCP) & Enterprise Integration",
    "Month 6: Agent Observability, Evals (Ragas) & Production Deployment",
  ],
  "ai-6m-agents": [
    "Month 1: Advanced Python for AI & LangChain Architecture",
    "Month 2: Production RAG Architecture & Vector Databases",
    "Month 3: Autonomous Multi-Agent Swarms & CrewAI",
    "Month 4: LangGraph Cyclic State Machines & Human-in-the-Loop",
    "Month 5: Model Context Protocol (MCP) & Enterprise Integration",
    "Month 6: Agent Observability, Evals (Ragas) & Production Deployment",
  ],
  "ai-3m-prompt": [
    "Month 1: LLM Architecture & Prompt Engineering Mastery",
    "Month 2: Multimodal Generative AI (Images, Video & Audio)",
    "Month 3: Workplace Automation, Custom GPTs & Capstone",
  ],
  "ai-expert": [
    "Month 1: AI Foundations & Setup",
    "Month 2: Python Programming & Data Science",
    "Month 3: Machine Learning Fundamentals",
    "Month 4: Deep Learning & Neural Networks",
    "Month 5: NLP & Transformers",
    "Month 6: Generative AI & Prompt Engineering",
    "Month 7: LangChain & Vector Databases",
    "Month 8: Autonomous AI Agents & Swarms",
    "Month 9: Computer Vision & Multi-Modal AI",
    "Month 10: AI Product Development & APIs",
    "Month 11: Enterprise Capstone Project",
    "Month 12: Career Placement & Certification",
  ],
  "data-science": [
    "Month 1: Advanced Python for Data Science",
    "Month 2: Applied Statistics & Probability",
    "Month 3: SQL & Relational Databases",
    "Month 4: Exploratory Data Analysis & Viz",
    "Month 5: Classical Machine Learning",
    "Month 6: Advanced ML & Ensemble Models",
    "Month 7: Deep Learning with PyTorch",
    "Month 8: NLP & Large Language Models",
    "Month 9: Big Data with PySpark",
    "Month 10: MLOps & Model Deployment",
    "Month 11: Real-World Industry Projects",
    "Month 12: Capstone Project & Placement",
  ],
  "data-analytics": [
    "Month 1: Advanced Excel & Business Math",
    "Month 2: SQL Fundamentals & Data Extraction",
    "Month 3: Advanced SQL & Data Warehousing",
    "Month 4: Power BI Fundamentals & DAX",
    "Month 5: Advanced Power BI & Dashboards",
    "Month 6: Tableau Visual Analytics",
    "Month 7: Python for Data Analysis",
    "Month 8: Pandas, NumPy & Data Wrangling",
    "Month 9: Exploratory Data Analysis (EDA)",
    "Month 10: Applied Business Statistics",
    "Month 11: Predictive Analytics & ML Basics",
    "Month 12: End-to-End Capstone & Placement",
  ],
  "dm-advanced": [
    "Module 1: Digital Marketing Ecosystem & Strategy",
    "Module 2: Website Planning & WordPress Architecture",
    "Module 3: Advanced SEO & Answer Engine Optimization (AEO)",
    "Module 4: Google Ads & Paid Search Performance",
    "Module 5: Social Media Marketing & Meta Ads",
    "Module 6: AI Marketing Tools & Brand Capstone",
  ],
  "dm-expert": [
    "Phase 1: Foundations of Performance Marketing & Attribution",
    "Phase 2: Full-Funnel Paid Acquisition (Meta, Google, LinkedIn)",
    "Phase 3: Retention Marketing, Email Automations & CRO",
    "Phase 4: Omnichannel Growth & Capstone Brand Defense",
  ],
  "cyber-advanced": [
    "Month 1: Networking Foundations & Protocols",
    "Month 2: Linux Administration for Hackers",
    "Month 3: Information Gathering & Footprinting",
    "Month 4: Vulnerability Assessment & Nessus",
    "Month 5: Web Application Penetration Testing",
    "Month 6: OWASP Top 10 Exploitation",
    "Month 7: Network Pentesting & Metasploit",
    "Month 8: Wireless Security & Social Eng.",
    "Month 9: Malware Analysis & Reverse Eng.",
    "Month 10: SOC Operations & SIEM (Splunk)",
    "Month 11: Cloud Security & Incident Response",
    "Month 12: Real-World Red Team Capstone",
  ],
  "cyber-foundation": [
    "Module 1: IT, Networking & Security Fundamentals",
    "Module 2: Linux Administration & Terminal Scripting",
    "Module 3: Core Ethical Hacking Methodologies",
    "Module 4: Defensive Security & Vulnerability Hardening",
  ],
  "cyber-intermediate": [
    "Module 1: Enterprise Network Penetration Testing",
    "Module 2: Web App VAPT & OWASP Top 10 Exploitation",
    "Module 3: Active Directory Attacks & Lateral Movement",
    "Module 4: Windows & Linux Privilege Escalation",
    "Module 5: API Pentesting & Microservices Security",
    "Module 6: Enterprise Pentest Defense & Reporting",
  ],
  "cyber-forensics": [
    "Module 1: Digital Evidence Handling, Chain of Custody & Law",
    "Module 2: Bit-Stream Disk Imaging & FTK Imager Forensics",
    "Module 3: Volatile Memory Forensics with Volatility Framework",
    "Module 4: Windows Registry, Event Log Analysis & Dossier Creation",
  ],
  "cyber-bugbounty": [
    "Module 1: Target Discovery, ASN Recon & Subdomain Enumeration",
    "Module 2: OWASP Top 10 Exploits (IDOR, SSRF, SQLi, XSS)",
    "Module 3: Authentication Bypass & REST API Pentesting",
    "Module 4: Triaging, HackerOne/Bugcrowd Proof of Concept Writing",
  ],
  "ds-6m-ml": [
    "Month 1: Python & Mathematical Foundations",
    "Month 2: SQL & Advanced Data Analysis",
    "Month 3: Classical Machine Learning",
    "Month 4: Deep Learning & Neural Networks",
    "Month 5: Natural Language Processing (NLP)",
    "Month 6: Capstone ML Project & Deployment",
  ],
  "da-6m-pro": [
    "Month 1: Excel & Advanced Analytics",
    "Month 2: PostgreSQL & Query Optimization",
    "Month 3: Power BI & Data Modeling",
    "Month 4: Tableau Interactive Dashboards",
    "Month 5: Python EDA & Statistical Analysis",
    "Month 6: Capstone Industry Business Case",
  ],
  "da-3m-bi": [
    "Month 1: Advanced Excel & SQL Essentials",
    "Month 2: Power BI Dashboard Architecture",
    "Month 3: Business Analytics Capstone",
  ],
};

exports.getSections = async (req, res) => {
  try {
    const rawCourseId =
      req.params.course_id ||
      req.params.id ||
      req.query.courseId ||
      req.query.course_id;
    let query = "SELECT * FROM sections ORDER BY order_num ASC, id ASC";
    let params = [];
    let numericCourseId = null;

    if (rawCourseId) {
      numericCourseId = await resolveCourseId(rawCourseId);
      if (numericCourseId) {
        query = "SELECT * FROM sections WHERE course_id = $1 ORDER BY order_num ASC, id ASC";
        params = [numericCourseId];
      }
    }

    let result = await pool.query(query, params);

    // If query was for a specific course and 0 sections were returned, auto-seed default modules
    if (numericCourseId && result.rows.length === 0) {
      try {
        const courseInfoRes = await pool.query(
          "SELECT * FROM courses WHERE id = $1 LIMIT 1",
          [numericCourseId]
        );
        const courseInfo = courseInfoRes.rows[0];
        const slug = courseInfo?.course_id || "";
        const defaultModules =
          COURSE_DEFAULT_MODULES[slug] ||
          COURSE_DEFAULT_MODULES[numericCourseId] || [
            "Module 1: Foundational Frameworks & Industry Setup",
            "Module 2: Core Practical Methodologies & Live Labs",
            "Module 3: Advanced Specialization & Frameworks",
            "Module 4: Real-World Brand Capstone & Evaluation",
          ];

        for (let i = 0; i < defaultModules.length; i++) {
          await pool.query(
            "INSERT INTO sections (title, course_id, order_num) VALUES ($1, $2, $3)",
            [defaultModules[i], numericCourseId, i + 1]
          );
        }

        result = await pool.query(query, params);
      } catch (seedErr) {
        console.warn("Could not auto-seed sections:", seedErr.message);
      }
    }

    res.status(200).json({
      success: true,
      count: result.rows.length,
      sections: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, order_num, orderNum } = req.body;
    const targetOrder = order_num !== undefined ? order_num : orderNum;

    if (!title && targetOrder === undefined) {
      return res.status(400).json({
        success: false,
        message: "Title or order_num required to update section",
      });
    }

    const result = await pool.query(
      `UPDATE sections
       SET
         title = COALESCE($1, title),
         order_num = COALESCE($2, order_num)
       WHERE id = $3
       RETURNING *`,
      [
        title !== undefined ? title.trim() : null,
        targetOrder !== undefined ? Number(targetOrder) : null,
        Number(id),
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Section updated successfully",
      section: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { id } = req.params;
    const secId = Number(id);

    // Remove or unassign child lectures in this section
    await pool.query("DELETE FROM lectures WHERE section_id = $1", [secId]).catch(() => {});

    const result = await pool.query("DELETE FROM sections WHERE id = $1 RETURNING id", [secId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
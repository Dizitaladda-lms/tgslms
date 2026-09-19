/**
 * Universal Course Navigation Helper
 * Directs users to the rich, exhaustive course description on the Skilling / Specialization portal
 */
export function getCourseDescriptionUrl(course) {
  if (!course) return "/skilling";

  const idStr = String(course.course_id || course.id || "").toLowerCase().trim();
  const title = String(course.title || "").toLowerCase();
  const cat = String(course.category || course.field || "").toLowerCase();

  // 1. Exact ID / slug mappings for all flagship courses
  const directMap = {
    // Artificial Intelligence & Prompt Engineering
    "ai-6m-agents": "/skilling?domain=ai-prompt-engineering&duration=6-months&course=ai-6m-agents",
    "ai-prompt-engineering": "/skilling?domain=ai-prompt-engineering&duration=6-months&course=ai-6m-agents",
    "ai-expert": "/skilling?domain=ai-prompt-engineering&duration=12-months&course=ai-expert",
    "ai-3m-prompt": "/skilling?domain=ai-prompt-engineering&duration=3-months&course=ai-3m-prompt",
    "7": "/skilling?domain=ai-prompt-engineering&duration=12-months&course=ai-expert",
    "13": "/skilling?domain=ai-prompt-engineering&duration=6-months&course=ai-6m-agents",
    "14": "/skilling?domain=ai-prompt-engineering&duration=3-months&course=ai-3m-prompt",

    // Digital Marketing
    "dm-advanced": "/skilling?domain=digital-marketing&duration=6-months&course=dm-advanced",
    "dm-expert": "/skilling?domain=digital-marketing&duration=12-months&course=dm-expert",
    "dm-professionals": "/skilling?domain=digital-marketing&duration=4-months&course=dm-professionals",
    "dm-beginners": "/skilling?domain=digital-marketing&duration=3-months&course=dm-beginners",
    "digital-marketing-pro": "/skilling?domain=digital-marketing&duration=4-months&course=dm-professionals",
    "digital-marketing": "/skilling?domain=digital-marketing&duration=6-months&course=dm-advanced",
    "1": "/skilling?domain=digital-marketing&duration=6-months&course=dm-advanced",
    "2": "/skilling?domain=digital-marketing&duration=12-months&course=dm-expert",
    "3": "/skilling?domain=digital-marketing&duration=4-months&course=dm-professionals",
    "4": "/skilling?domain=digital-marketing&duration=3-months&course=dm-beginners",

    // Cyber Security
    "cyber-advanced": "/skilling?domain=cyber-security&duration=12-months&course=cyber-advanced",
    "cyber-intermediate": "/skilling?domain=cyber-security&duration=6-months&course=cyber-6m-soc",
    "cyber-6m-soc": "/skilling?domain=cyber-security&duration=6-months&course=cyber-6m-soc",
    "cyber-foundation": "/skilling?domain=cyber-security&duration=3-months&course=cyber-foundation",
    "cyber-forensics": "/skilling?domain=cyber-security&duration=6-months&course=digital-forensics",
    "cyber-bugbounty": "/skilling?domain=cyber-security&duration=6-months&course=bug-bounty",
    "cyber-security-defense": "/skilling?domain=cyber-security&duration=6-months&course=cyber-6m-soc",
    "cyber-security": "/skilling?domain=cyber-security&duration=6-months&course=cyber-6m-soc",
    "6": "/skilling?domain=cyber-security&duration=12-months&course=cyber-advanced",
    "9": "/skilling?domain=cyber-security&duration=3-months&course=cyber-foundation",
    "10": "/skilling?domain=cyber-security&duration=6-months&course=cyber-6m-soc",
    "11": "/skilling?domain=cyber-security&duration=6-months&course=digital-forensics",
    "12": "/skilling?domain=cyber-security&duration=6-months&course=bug-bounty",

    // Data Science
    "data-science": "/skilling?domain=data-science-analytics&track=data-science&duration=12-months&course=data-science",
    "ds-6m-ml": "/skilling?domain=data-science-analytics&track=data-science&duration=6-months&course=data-science-6m",
    "data-science-ai": "/skilling?domain=data-science-analytics&track=data-science&duration=6-months&course=data-science-6m",
    "8": "/skilling?domain=data-science-analytics&track=data-science&duration=12-months&course=data-science",
    "15": "/skilling?domain=data-science-analytics&track=data-science&duration=6-months&course=data-science-6m",

    // Data Analytics
    "data-analytics": "/skilling?domain=data-science-analytics&track=data-analytics&duration=12-months&course=data-analytics",
    "da-6m-pro": "/skilling?domain=data-science-analytics&track=data-analytics&duration=6-months&course=data-analytics-6m",
    "da-3m-bi": "/skilling?domain=data-science-analytics&track=data-analytics&duration=3-months&course=data-analytics-3m",
    "data-analytics-bi": "/skilling?domain=data-science-analytics&track=data-analytics&duration=3-months&course=data-analytics-3m",
    "5": "/skilling?domain=data-science-analytics&track=data-analytics&duration=12-months&course=data-analytics",
    "16": "/skilling?domain=data-science-analytics&track=data-analytics&duration=6-months&course=data-analytics-6m",
    "17": "/skilling?domain=data-science-analytics&track=data-analytics&duration=3-months&course=data-analytics-3m",

    // Full Stack (falls back to Skilling AI or Tech)
    "full-stack": "/skilling?domain=ai-prompt-engineering&duration=6-months&course=ai-6m-agents",
    "full-stack-swe": "/skilling?domain=ai-prompt-engineering&duration=6-months&course=ai-6m-agents",
  };

  if (directMap[idStr]) {
    return directMap[idStr];
  }

  // 2. Fuzzy match by title / category
  if (title.includes("gen ai") || title.includes("prompt") || cat.includes("artificial") || idStr.includes("ai")) {
    if (title.includes("diploma") || title.includes("12 month")) {
      return "/skilling?domain=ai-prompt-engineering&duration=12-months&course=ai-expert";
    }
    if (title.includes("3 month")) {
      return "/skilling?domain=ai-prompt-engineering&duration=3-months&course=ai-3m-prompt";
    }
    return "/skilling?domain=ai-prompt-engineering&duration=6-months&course=ai-6m-agents";
  }

  if (title.includes("cyber") || title.includes("ethical hack") || cat.includes("cyber") || idStr.includes("cyber")) {
    if (title.includes("soc") || title.includes("defense") || title.includes("6 month")) {
      return "/skilling?domain=cyber-security&duration=6-months&course=cyber-6m-soc";
    }
    if (title.includes("foundation") || title.includes("3 month")) {
      return "/skilling?domain=cyber-security&duration=3-months&course=cyber-foundation";
    }
    return "/skilling?domain=cyber-security&duration=12-months&course=cyber-advanced";
  }

  if (title.includes("data science") || cat.includes("data science") || idStr.includes("ds")) {
    if (title.includes("diploma") || title.includes("12 month")) {
      return "/skilling?domain=data-science-analytics&track=data-science&duration=12-months&course=data-science";
    }
    return "/skilling?domain=data-science-analytics&track=data-science&duration=6-months&course=data-science-6m";
  }

  if (title.includes("data analytics") || title.includes("power bi") || cat.includes("data analytics") || idStr.includes("da")) {
    if (title.includes("diploma") || title.includes("12 month")) {
      return "/skilling?domain=data-science-analytics&track=data-analytics&duration=12-months&course=data-analytics";
    }
    if (title.includes("6 month") || title.includes("advanced")) {
      return "/skilling?domain=data-science-analytics&track=data-analytics&duration=6-months&course=data-analytics-6m";
    }
    return "/skilling?domain=data-science-analytics&track=data-analytics&duration=3-months&course=data-analytics-3m";
  }

  if (title.includes("marketing") || title.includes("digital") || cat.includes("marketing") || idStr.includes("dm")) {
    if (title.includes("expert") || title.includes("12")) {
      return "/skilling?domain=digital-marketing&duration=12-months&course=dm-expert";
    }
    if (title.includes("professional") || title.includes("4")) {
      return "/skilling?domain=digital-marketing&duration=4-months&course=dm-professionals";
    }
    if (title.includes("beginner") || title.includes("3")) {
      return "/skilling?domain=digital-marketing&duration=3-months&course=dm-beginners";
    }
    return "/skilling?domain=digital-marketing&duration=6-months&course=dm-advanced";
  }

  return `/skilling?course=${idStr}`;
}

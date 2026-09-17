const OpenAI = require("openai");

let openai = null;
if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith("sk-")) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Built-in Intelligent Fallback Knowledge Engine (Used if OpenAI key is unset or rate-limited)
const generateKnowledgeResponse = (userMsg, courseTitle = "", lectureTitle = "") => {
  const q = (userMsg || "").toLowerCase();

  const contextNote = lectureTitle
    ? `\n\n📌 *Context:* Answering based on current session: **${lectureTitle}**`
    : "";

  if (q.includes("seo") || q.includes("search engine")) {
    return (
      `**Search Engine Optimization (SEO) Key Concept:**\n\n` +
      `SEO ka matlab hai apni website ko Google ke top search results me rank karana organic (bina ads) tarike se.\n\n` +
      `**3 Core Pillars of SEO:**\n` +
      `1. **On-Page SEO:** High-quality content, Title tags, Meta descriptions, H1/H2 tags, Image Alt tags, and Keyword placement.\n` +
      `2. **Off-Page SEO:** High-authority Backlinks, Brand mentions, and Guest posting.\n` +
      `3. **Technical SEO:** Fast page speed (Core Web Vitals), Mobile responsiveness, XML Sitemap, and SSL certificate.\n\n` +
      `💡 *Action Tip:* Apne content me keyword density 1% - 1.5% rakhein aur user intent ko solve karein.` +
      contextNote
    );
  }

  if (q.includes("google ads") || q.includes("ppc") || q.includes("sem")) {
    return (
      `**Google Ads (PPC / SEM) Guide:**\n\n` +
      `Google Ads pay-per-click advertising model par kaam karta hai jahan aap tabhi pay karte hain jab user aapke ad par click karta hai.\n\n` +
      `**Campaign Setup Steps:**\n` +
      `1. **Targeting & Keywords:** Broad match, Phrase match (\`"keyword"\`), aur Exact match (\`[keyword]\`) use karein. Negative keywords add karna na bhulein!\n` +
      `2. **Ad Copy:** Engaging headline (CTR badhane ke liye) + Clear Call to Action (CTA).\n` +
      `3. **Quality Score:** High CTR + Relevant Landing Page + Ad Relevance = Lower CPC (Cost per Click)!\n\n` +
      `💡 *Pro Tip:* Always test A/B variations of your ad copy to find the winning campaign.` +
      contextNote
    );
  }

  if (q.includes("meta") || q.includes("facebook") || q.includes("instagram") || q.includes("social media")) {
    return (
      `**Meta (Facebook & Instagram) Marketing Strategy:**\n\n` +
      `Meta ads intent-based nahi, **interest & behavior-based targeting** par kaam karte hain.\n\n` +
      `**High-Converting Funnel:**\n` +
      `1. **Top of Funnel (TOFU):** Video views aur engagement ads (Broad audience building).\n` +
      `2. **Middle of Funnel (MOFU):** Lead generation ya website traffic ads (Warm audience).\n` +
      `3. **Bottom of Funnel (BOFU):** Retargeting ads with special offer / discount (Conversions).\n\n` +
      `💡 *Pro Tip:* Meta Pixel ko website par sahi tarike se configure karein taaki custom audience retargeting ho sake.` +
      contextNote
    );
  }

  if (q.includes("react") || q.includes("hook") || q.includes("component") || q.includes("javascript")) {
    return (
      `**Web Development & React Concept:**\n\n` +
      `React ek component-based declarative library hai jo Virtual DOM ke through fast rendering provide karti hai.\n\n` +
      `**Core React Hooks:**\n` +
      `• \`useState\`: Component level state/data manage karne ke liye.\n` +
      `• \`useEffect\`: Side effects (API calls, subscriptions, DOM updates) handle karne ke liye.\n` +
      `• \`useCallback\` / \`useMemo\`: Performance optimization aur unnecessary re-renders rokne ke liye.\n\n` +
      `💡 *Best Practice:* State ko minimal rakhein aur props drilling avoid karne ke liye Context API use karein.` +
      contextNote
    );
  }

  if (q.includes("certificate") || q.includes("exam") || q.includes("quiz") || q.includes("complete")) {
    return (
      `**Course Certification & Progress Policy:**\n\n` +
      `1. **Sequential Video Unlock:** Har agla video pichle lecture ko complete dekhne ke baad automatic unlock hota hai.\n` +
      `2. **Completion Criteria:** Jab aap course ke 100% video lectures complete kar lete hain, toh aapka certification request automatic Admin review me chala jata hai.\n` +
      `3. **Verification:** Har certificate par unique TSG QR Code aur verification ID hoti hai jo LinkedIn aur resume par share ki ja sakti hai.\n\n` +
      `Agar certificate me koi delay ho, toh Admin team direct verify karke PDF issue karti hai.` +
      contextNote
    );
  }

  if (q.includes("hindi") || q.includes("samjhao") || q.includes("kya hai") || q.includes("batao")) {
    return (
      `**AI Mentor Support:**\n\n` +
      `Aapka sawal mil gaya! Is topic ko step-by-step samajhne ke liye:\n\n` +
      `1. **Core Concept:** Pehle topic ki basic theory aur 'Why' (kyun zaroori hai) samjhein.\n` +
      `2. **Practical Implementation:** Is session me jo practical step dikhaya gaya hai, use apne system par live apply karein.\n` +
      `3. **Troubleshooting:** Agar koi specific error aa raha hai, toh pura error message yahan paste karein — main turant fix bataunga!\n\n` +
      `Aap apna doubt aur detail me puch sakte hain.` +
      contextNote
    );
  }

  // Default intelligent helpful mentor response
  return (
    `**TSG AI Mentor Guidance:**\n\n` +
    `Aapke doubt ke liye helpful explanation:\n\n` +
    `• **Summary:** Har naye topic ko master karne ka best tarika hai: Pehle video ko dhyan se poora dekhein, sath me notes banayein, aur turant practical project par apply karein.\n` +
    `• **Key Step:** Agar aapko kisi specific step ya tool (Google Ads, SEO, Code, Meta Pixel) me problem aa rahi hai, toh exact error ya step yahan likhein.\n\n` +
    `Main aapki madad ke liye 24/7 yahan hoon! Feel free to ask more specific questions.` +
    contextNote
  );
};

const askAI = async (req, res) => {
  try {
    const { message, courseTitle, lectureTitle, context } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question / message is required",
      });
    }

    // If OpenAI is configured and available, try OpenAI first
    if (openai) {
      try {
        const systemPrompt = `You are the Dizital Adda (TSG) AI Mentor, a friendly, supportive, and highly practical industry expert.
Your mission is to help students solve learning and technical doubts in Digital Marketing, SEO, Web Development, Google/Meta Ads, AI Tools, and Career Growth.
Guidelines:
1. Explain concepts in clear, easy-to-understand language (Hinglish/English friendly).
2. Give step-by-step practical advice and real-world examples.
3. Keep responses structured using bullet points and bold highlights.
4. Current Student Context: Course: "${courseTitle || "LMS Curriculum"}", Lecture: "${lectureTitle || "General Lesson"}".`;

        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message.trim() },
          ],
          temperature: 0.7,
          max_tokens: 600,
        });

        const reply = completion.choices[0]?.message?.content;
        if (reply) {
          return res.status(200).json({
            success: true,
            reply,
            source: "openai",
          });
        }
      } catch (openAiErr) {
        console.warn("OpenAI API call failed, switching to resilient LMS Knowledge Engine:", openAiErr.message);
      }
    }

    // Resilient Built-in LMS Knowledge Engine Fallback
    const fallbackReply = generateKnowledgeResponse(message, courseTitle, lectureTitle);
    return res.status(200).json({
      success: true,
      reply: fallbackReply,
      source: "knowledge_engine",
    });
  } catch (error) {
    console.error("AI Controller error:", error);
    res.status(200).json({
      success: true,
      reply: "Namaste! Main aapka AI Mentor hoon. Kripya apna sawal dubara puchiye, main aapki poori madad karunga.",
      source: "safety_fallback",
    });
  }
};

module.exports = {
  askAI,
};
import { useState, useEffect, useRef } from "react";

const STUDENT_TESTIMONIALS = [
  {
    id: 1,
    name: "Aman Verma",
    initials: "AV",
    avatarBg: "bg-blue-600",
    course: "Advanced Digital Marketing",
    duration: "6 Months Track",
    outcome: "Placed at Performics (₹6.8 LPA)",
    company: "Performics",
    rating: 5,
    city: "New Delhi",
    review:
      "Dizital Adda ka 6 mahine wala advanced course meri life ka best decision tha. Live brand campaigns par actual budgets ke sath ads run kiye. Dr. Gulshan Kumar sir ki personal guidance aur mock technical interviews ki wajah se Performics me first attempt me selection ho gaya!",
  },
  {
    id: 2,
    name: "Pooja Sharma",
    initials: "PS",
    avatarBg: "bg-emerald-600",
    course: "Diploma in Data Analytics & AI",
    duration: "12 Months Track",
    outcome: "BI Analyst at Genpact (₹8.2 LPA)",
    company: "Genpact",
    rating: 5,
    city: "Noida",
    review:
      "Non-technical background se hone ke bawajood Power BI, SQL aur Excel modeling itne practical dhang se sikhaya gaya ki interview me koi dikkat nahi aayi. 12 mahine ke diploma me live Dark Store capstone project ne interview me sabse bada role play kiya.",
  },
  {
    id: 3,
    name: "Rohan Kulkarni",
    initials: "RK",
    avatarBg: "bg-amber-600",
    course: "Cyber Security & Ethical Hacking",
    duration: "6 Months Track",
    outcome: "Associate SOC Analyst at Wipro (₹7.5 LPA)",
    company: "Wipro",
    rating: 5,
    city: "Pune",
    review:
      "Theory ke bajaye daily hands-on labs par focus rehta hai. Splunk, Wireshark aur VAPT tools par practical testing kari. 100% placement cell ne resume shortlist karwake direct Wipro hiring drive me interview schedule karwaya.",
  },
  {
    id: 4,
    name: "Sneha Mukherjee",
    initials: "SM",
    avatarBg: "bg-purple-600",
    course: "Digital Marketing for Professionals",
    duration: "4 Months Track",
    outcome: "Senior Growth Lead & Freelancer ($2,200/mo)",
    company: "Global Remote Clients",
    rating: 5,
    city: "Kolkata",
    review:
      "Job ke sath weekend batches attend kare. Meta Ads aur Next-Gen AEO/LLMO training ne meri freelancing revenue 3x kar di. Ab international clients ke Google Ads aur Meta retainers manage karti hoon. Best practical institute!",
  },
  {
    id: 5,
    name: "Mohit Choudhary",
    initials: "MC",
    avatarBg: "bg-indigo-600",
    course: "Master in Data Science & AI",
    duration: "12 Months Track",
    outcome: "Data Scientist at Tiger Analytics (₹12 LPA)",
    company: "Tiger Analytics",
    rating: 5,
    city: "Gurugram",
    review:
      "NIDADS aur Dizital Adda ka curriculum IIT level ka practical feel deta hai. Python, Machine Learning models aur Deep Learning projects khud deploy kare. Salary package aur placement assistance dono top-notch hain.",
  },
  {
    id: 6,
    name: "Ananya Gupta",
    initials: "AG",
    avatarBg: "bg-rose-600",
    course: "Digital Marketing for Beginners",
    duration: "3 Months Track",
    outcome: "Content & Ads Executive at Dentsu (₹4.5 LPA)",
    company: "Dentsu",
    rating: 5,
    city: "Delhi",
    review:
      "College khatam hote hi digital marketing seekhna tha. 90 din me Canva Pro, SEO, aur paid ads live sikhaye. 10+ global certifications milne se resume instantly shortlist ho gaya aur placement lag gayi!",
  },
  {
    id: 7,
    name: "Vikramaditya Rao",
    initials: "VR",
    avatarBg: "bg-teal-600",
    course: "Gen AI & Prompt Engineering",
    duration: "6 Months Track",
    outcome: "AI Solutions Consultant at Tech Mahindra (₹9.5 LPA)",
    company: "Tech Mahindra",
    rating: 5,
    city: "Bengaluru",
    review:
      "LangChain, RAG architecture aur autonomous AI agents par exhaustive hands-on kaam hua. Industry me jo tools abhi use ho rahe hain, wo sab pehle se class me practical karwaye the. Highly recommended!",
  },
  {
    id: 8,
    name: "Simran Kaur",
    initials: "SK",
    avatarBg: "bg-orange-600",
    course: "Advanced Digital Marketing",
    duration: "6 Months Track",
    outcome: "Digital Strategist at Sleepy Owl (₹6.2 LPA)",
    company: "Sleepy Owl",
    rating: 5,
    city: "Chandigarh",
    review:
      "In-house agency internship sabse best feature hai. Fake dummy campaigns ke bajaye live clients ke ad accounts manage kiye. Jab interview me real proof-of-work dikhaya toh turant offer letter mil gaya!",
  },
];

export default function StudentTestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const totalItems = STUDENT_TESTIMONIALS.length;

  // Auto-slide every 4 seconds unless paused
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalItems);
      }, 4000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, totalItems]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  // Helper to slice 3 consecutive testimonials for large screens
  const getVisibleTestimonials = () => {
    const list = [];
    for (let i = 0; i < 3; i++) {
      const idx = (currentIndex + i) % totalItems;
      list.push(STUDENT_TESTIMONIALS[idx]);
    }
    return list;
  };

  const visibleList = getVisibleTestimonials();

  return (
    <section className="mt-16 pt-12 border-t-2 border-slate-200">
      {/* Section Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#7C2D12] bg-orange-100 border border-orange-200 px-3 py-1 rounded-full mb-2">
            Verified Student Stories & Placements
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B1220] tracking-tight">
            Hear From Our Skilling Graduates
          </h3>
          <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-2xl">
            Real stories, real salary packages aur proven career transformations
            across our 4 future skills technology domains.
          </p>
        </div>

        {/* Slider Controls */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <span className="text-xs text-slate-500 font-semibold hidden sm:inline-block px-3 py-1 rounded-lg bg-slate-100 border border-slate-200">
            {isPaused ? "Paused" : "Auto-playing"}
          </span>

          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Review"
            className="w-10 h-10 rounded-xl bg-white border-2 border-slate-300 text-slate-800 hover:bg-[#0B1220] hover:text-[#D4A017] hover:border-[#0B1220] flex items-center justify-center font-bold transition shadow-xs cursor-pointer"
          >
            ←
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Review"
            className="w-10 h-10 rounded-xl bg-[#0B1220] text-[#D4A017] hover:bg-[#7C2D12] hover:text-white flex items-center justify-center font-bold transition shadow-xs cursor-pointer"
          >
            →
          </button>
        </div>
      </div>

      {/* Sliding Cards Container */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="relative overflow-hidden py-2"
      >
        {/* Desktop: 3 Cards Grid with smooth fade-in; Mobile/Tablet: 1 or 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
          {visibleList.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="bg-white rounded-3xl border-2 border-slate-200 hover:border-[#D4A017] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Stars & Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center text-amber-500 text-sm tracking-widest">
                    {"★".repeat(item.rating)}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Verified Graduate
                  </span>
                </div>

                {/* Course Track Pill */}
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  <span className="text-xs font-bold text-slate-800">
                    {item.course}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    {item.duration}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "{item.review}"
                </p>
              </div>

              {/* Student Profile & Placement Outcome */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${item.avatarBg} text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-xs`}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-[#0B1220]">
                      {item.name}
                    </h5>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {item.city}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {item.outcome}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {STUDENT_TESTIMONIALS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-2 transition-all rounded-full ${
                currentIndex === dotIdx
                  ? "w-8 bg-[#7C2D12]"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

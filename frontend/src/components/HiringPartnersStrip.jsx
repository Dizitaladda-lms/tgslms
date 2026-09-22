import React, { useState } from "react";
import { FaBuilding, FaCheckCircle, FaBriefcase, FaGraduationCap } from "react-icons/fa";

// ==========================================
// AUTHENTIC BRAND LOGO VECTOR COMPONENTS
// ==========================================

export const AmazonLogo = () => (
  <div className="flex items-center gap-1.5 justify-center">
    <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="#131921">
      <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.051-.13zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.912-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.46-.35.27-.575.63-.675 1.096-.06.3-.206.465-.435.51l-2.52-.315c-.248-.06-.372-.18-.372-.39 0-.046.007-.09.022-.15.247-1.29.855-2.25 1.82-2.88.976-.616 2.1-.975 3.39-1.05h.54c1.65 0 2.957.434 3.888 1.29.135.15.27.3.405.48.12.165.224.314.283.45.075.134.15.33.195.57.06.254.105.42.135.51.03.104.062.3.076.615.01.313.02.493.02.553v5.28c0 .376.06.72.165 1.036.105.313.21.54.315.674l.51.674c.09.136.136.256.136.36 0 .12-.06.226-.18.314-1.2 1.05-1.86 1.62-1.963 1.71-.165.135-.375.15-.63.045a6.062 6.062 0 01-.526-.496l-.31-.347a9.391 9.391 0 01-.317-.42l-.3-.435c-.81.886-1.603 1.44-2.4 1.665-.494.15-1.093.227-1.83.227-1.11 0-2.04-.343-2.76-1.034-.72-.69-1.08-1.665-1.08-2.94l-.05-.076zm3.753-.438c0 .566.14 1.02.425 1.364.285.34.675.512 1.155.512.045 0 .106-.007.195-.02.09-.016.134-.023.166-.023.614-.16 1.08-.553 1.424-1.178.165-.28.285-.58.36-.91.09-.32.12-.59.135-.8.015-.195.015-.54.015-1.005v-.54c-.84 0-1.484.06-1.92.18-1.275.36-1.92 1.17-1.92 2.43l-.035-.02zm9.162 7.027c.03-.06.075-.11.132-.17.362-.243.714-.41 1.05-.5a8.094 8.094 0 011.612-.24c.14-.012.28 0 .41.03.65.06 1.05.168 1.172.33.063.09.099.228.099.39v.15c0 .51-.149 1.11-.424 1.8-.278.69-.664 1.248-1.156 1.68-.073.06-.14.09-.197.09-.03 0-.06 0-.09-.012-.09-.044-.107-.12-.064-.24.54-1.26.806-2.143.806-2.64 0-.15-.03-.27-.087-.344-.145-.166-.55-.257-1.224-.257-.243 0-.533.016-.87.046-.363.045-.7.09-1 .135-.09 0-.148-.014-.18-.044-.03-.03-.036-.047-.02-.077 0-.017.006-.03.02-.063v-.06z" />
    </svg>
    <span className="font-black tracking-tight text-slate-800 text-base">amazon</span>
  </div>
);

export const MicrosoftLogo = () => (
  <div className="flex items-center gap-2 justify-center">
    <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
      <div className="bg-[#F25022] w-2 h-2 rounded-[1px]"></div>
      <div className="bg-[#7FBA00] w-2 h-2 rounded-[1px]"></div>
      <div className="bg-[#00A4EF] w-2 h-2 rounded-[1px]"></div>
      <div className="bg-[#FFB900] w-2 h-2 rounded-[1px]"></div>
    </div>
    <span className="font-semibold text-slate-700 text-sm tracking-tight">Microsoft</span>
  </div>
);

export const GoogleLogo = () => (
  <div className="flex items-center gap-1.5 justify-center">
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z"/>
      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.6H1.25C.45 8.21 0 10.05 0 12s.45 3.79 1.25 5.4l4.03-3.13z"/>
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.6l4.03 3.13c.95-2.83 3.6-4.98 6.72-4.98z"/>
    </svg>
    <span className="font-bold text-slate-700 text-sm tracking-tight">Google</span>
  </div>
);

export const TCSLogo = () => (
  <div className="flex items-center gap-1.5 justify-center">
    <div className="w-5 h-5 rounded-full bg-[#004B87] flex items-center justify-center text-white shrink-0">
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.774 11.568c.193-1.322.168-2.013-1.768-1.906-2.223.124-4.476.265-7.849 1.027A5.63 5.63 0 0 0 0 12c0 1.52.618 2.99 1.787 4.254 1.06 1.144 2.556 2.095 4.326 2.752a15.48 15.48 0 0 0 2.014.588c.13-.527.959-3.907 1.616-7.823l.03-.202m14.07-.88c-3.372-.762-5.624-.902-7.846-1.026-1.937-.107-1.962.584-1.768 1.906l.046.298c.65 3.848 1.458 7.16 1.598 7.72C20.595 18.508 24 15.516 24 12c0-.443-.054-.88-.157-1.311m-.491-1.324a7.163 7.163 0 0 0-1.14-1.618c-1.06-1.144-2.555-2.095-4.325-2.752-1.784-.662-3.82-1.011-5.887-1.011-2.068 0-4.103.35-5.887 1.01-1.77.658-3.266 1.61-4.326 2.753A7.17 7.17 0 0 0 .648 9.366c2.304-.557 6.245-1.293 9.904-1.37.353-.008.596.105.756.307.196.248.18 1.128.175 1.522l-.104 10.18a18.507 18.507 0 0 0 1.244 0l-.104-10.18c-.005-.394-.02-1.274.175-1.522.16-.202.403-.315.756-.308 3.658.078 7.597.813 9.902 1.37z"/>
      </svg>
    </div>
    <div className="flex flex-col text-left leading-tight">
      <span className="font-black text-[#004B87] text-sm leading-none">TCS</span>
      <span className="text-[8px] text-slate-500 font-medium">TATA</span>
    </div>
  </div>
);

export const InfosysLogo = () => (
  <div className="flex items-center justify-center">
    <svg className="h-4 w-auto text-[#007CC3]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.2734 7.5703c-.3984 0-.7246.3282-.7246.7266 0 .4013.3262.7246.7246.7246.3982 0 .7266-.3233.7266-.7246 0-.3984-.3284-.7266-.7266-.7266zm0 .1074c.3395 0 .6192.2795.6192.6192 0 .3396-.2797.6172-.6192.6172-.3397 0-.6171-.2776-.6171-.6172 0-.3397.2774-.6192.6171-.6192zm-15.1367.0547c-.9001 0-1.549.5917-1.6387 1.6406h-.6953v.5215h.6856c.0028 1.6664-.002 3.334-.002 4.998h.7774c-.0022-1.6659-.002-3.3319-.002-4.998h1.748c-.646.5242-1.0663 1.3739-1.0663 2.334 0 1.593 1.1564 2.8848 2.582 2.8848 1.4258 0 2.582-1.2918 2.582-2.8848 0-.1896-.0174-.3753-.0488-.5547.2565.4131.7488.6133 1.4082.8985.7784.329 1.2129.6165 1.2129 1.1074 0 .5885-.556.8955-1.1817.8906-.611 0-1.0883-.249-1.6191-.7305v.9239c.3239.2088.8256.3281 1.3691.3281.6844-.0023 2.0918-.249 2.0918-1.6758-.0044-.8557-.715-1.2239-1.4863-1.5586-.9383-.4653-1.2965-.5629-1.2871-1.0957 0-.7088.6178-.9219 1.0996-.9219.2099 0 .3891.0293.5586.086.3163.1194.4209.3553.5332.6113.5283 1.2356 1.0344 2.4811 1.5488 3.7227-.2464.5637-.526 1.1519-.7168 1.5273l-.0039.0098-.1601.2969-.1797.336h.7617c.3322-.7342 1.7436-4.1688 2.0469-4.9083.1995.533.6857.7467 1.4297 1.0684.7783.329 1.2148.6166 1.2148 1.1074 0 .5886-.5562.8936-1.1816.8887-.6348 0-1.1257-.2685-1.6817-.7871l-.0507-.041v.9413c.3115.259.8713.4102 1.4824.4102.6844-.0022 2.0918-.249 2.0918-1.6758-.0042-.8557-.7151-1.2258-1.4863-1.5605-.9384-.4654-1.2593-.563-1.25-1.0957 0-.709.5787-.9219 1.0605-.9219.5483 0 .8958.2037 1.379.5547V9.584c-.3923-.1381-.7212-.1915-1.1642-.1895-.8912-.0018-1.6966.3234-1.9004 1.0762l-1.1054 2.7344-.1153.3437-.1015-.3437c-.5022-1.2089-.9934-2.4236-1.4863-3.6309-.3154-.0828-.8307-.201-1.1934-.1953-.0377-.0007-.0758-.0002-.1152 0-1.0302-.002-2.0235.4332-2.0235 1.457 0 .0596.0022.1155.006.17-.412-.9813-1.3036-1.6602-2.338-1.6602-.1245 0-.2472.0085-.3672.0273H7.254c-.1194-.733.2228-1.1503.7383-1.1503.6472-.0006.9242.192 1.205.4511 0 0 .0195-.0007.0274 0 .0038-.2457.002-.5318.002-.7949-.185-.0857-.5061-.1465-1.0899-.1465zM0 7.756v7.1367h.8594V7.7559zm23 .1386v.7657h.1387v-.3086h.164l.1192.3086h.1543l-.1407-.3301c.0494-.0248.1329-.0518.1329-.1875 0-.2224-.1673-.248-.3125-.248zm.1387.1328h.1543c.0834 0 .1289.0337.1289.1016 0 .068-.0524.0996-.1172.0996h-.166zM4.1719 9.3555c-.945 0-1.3429.3359-1.6582.6738a.2474.2474 0 00-.0352.0644h-.0078v-.043l-.0098-.623H1.707v5.4649h.7754v-3.9961c.0226-.4905.7134-.9746 1.252-.9746.6477 0 1.1777.4364 1.1777 1.039v3.9317h.7754c-.0019-1.429-.002-2.858-.002-4.2871-.0234-.4835-.6094-1.25-1.5136-1.25zm6.2832.5566c.9741-.0175 1.7825 1.0214 1.8047 2.3184.022 1.297-.7504 2.3614-1.7246 2.3789-.9742.0171-1.7825-1.0195-1.8047-2.3164-.0221-1.2971.7503-2.3634 1.7246-2.3809Z"/>
    </svg>
    <span className="font-bold text-[#007CC3] text-sm tracking-tight ml-1">Infosys</span>
  </div>
);

export const WiproLogo = () => (
  <div className="flex items-center gap-1.5 justify-center">
    <div className="relative w-4 h-4 flex items-center justify-center">
      <span className="absolute -top-0.5 left-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
      <span className="absolute top-0.5 right-0 w-1.5 h-1.5 rounded-full bg-amber-500"></span>
      <span className="absolute -bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-rose-500"></span>
      <span className="absolute bottom-0.5 left-0 w-1.5 h-1.5 rounded-full bg-blue-600"></span>
    </div>
    <span className="font-bold text-slate-800 text-sm tracking-tight">wipro</span>
  </div>
);

export const SwiggyLogo = () => (
  <div className="flex items-center gap-1.5 justify-center">
    <div className="w-5 h-5 rounded-md bg-[#FC8019] flex items-center justify-center text-white shrink-0">
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.034 24c-.376-.411-2.075-2.584-3.95-5.513-.547-.916-.901-1.63-.833-1.814.178-.48 3.355-.743 4.333-.308.298.132.29.307.29.409 0 .44-.022 1.619-.022 1.619a.441.441 0 1 0 .883-.002l-.005-2.939c0-.255-.278-.319-.331-.329-.511-.002-1.548-.006-2.661-.006-2.457 0-3.006.101-3.423-.172-.904-.591-2.383-4.577-2.417-6.819C3.849 4.964 5.723 2.225 8.362.868A8.13 8.13 0 0 1 12.026 0c4.177 0 7.617 3.153 8.075 7.209l.001.011c.084.981-5.321 1.189-6.39.904-.164-.044-.206-.212-.206-.284L13.5 4.996a.442.442 0 0 0-.884.002l.009 3.866a.33.33 0 0 0 .268.32l3.354-.001c1.79 0 2.542.207 3.042.588.333.254.461.739.349 1.37C18.633 16.755 12.273 23.71 12.034 24z" />
      </svg>
    </div>
    <span className="font-extrabold text-[#FC8019] text-sm tracking-tight">SWIGGY</span>
  </div>
);

export const ZomatoLogo = () => (
  <div className="flex items-center justify-center">
    <div className="bg-[#E23744] text-white px-2.5 py-0.5 rounded-md flex items-center">
      <span className="font-black italic text-xs tracking-wider">zomato</span>
    </div>
  </div>
);

export const PaytmLogo = () => (
  <div className="flex items-center justify-center">
    <span className="font-black text-[#002970] text-base tracking-tight">Pay</span>
    <span className="font-black text-[#00BAF2] text-base tracking-tight">tm</span>
  </div>
);

export const JioLogo = () => (
  <div className="flex items-center gap-1.5 justify-center">
    <div className="w-5 h-5 rounded-full bg-[#0A2885] flex items-center justify-center shadow-xs shrink-0">
      <span className="font-black text-white text-[9px] tracking-tighter">Jio</span>
    </div>
    <span className="font-bold text-[#0A2885] text-sm tracking-tight">Reliance Jio</span>
  </div>
);

export const CognizantLogo = () => (
  <div className="flex items-center gap-1.5 justify-center">
    <div className="w-5 h-5 rounded-full border-[1.5px] border-[#1A365D] flex items-center justify-center shrink-0">
      <span className="font-black text-[#1A365D] text-[10px]">C</span>
    </div>
    <span className="font-bold text-[#1A365D] text-sm tracking-tight">cognizant</span>
  </div>
);

export const HCLTechLogo = () => (
  <div className="flex items-center gap-1 justify-center">
    <span className="font-black text-[#00569B] text-sm tracking-tight">HCL</span>
    <span className="font-bold text-slate-700 text-sm tracking-tight">Tech</span>
  </div>
);

export const TechMahindraLogo = () => (
  <div className="flex items-center gap-1.5 justify-center">
    <div className="w-4 h-4 rounded bg-[#E31837] flex items-center justify-center text-white text-[9px] font-black shrink-0">
      M
    </div>
    <div className="flex flex-col text-left leading-none">
      <span className="font-bold text-slate-800 text-[10px] leading-tight">Tech</span>
      <span className="font-black text-[#E31837] text-[10px] leading-none">Mahindra</span>
    </div>
  </div>
);

export const DeloitteLogo = () => (
  <div className="flex items-baseline justify-center">
    <span className="font-bold text-slate-900 text-sm tracking-tight">Deloitte</span>
    <span className="w-1.5 h-1.5 rounded-full bg-[#86BC25] ml-0.5"></span>
  </div>
);

export const AccentureLogo = () => (
  <div className="flex items-baseline justify-center">
    <span className="font-bold text-slate-900 text-sm tracking-tight">accenture</span>
    <span className="text-[#A100FF] font-black text-xs ml-0.5">&gt;</span>
  </div>
);

export const FlipkartLogo = () => (
  <div className="flex items-center gap-1 justify-center">
    <div className="w-4 h-4 rounded bg-[#2874F0] flex items-center justify-center text-[#FFE500] font-black italic text-[9px] shrink-0">
      f
    </div>
    <span className="font-bold text-[#2874F0] text-sm tracking-tight">Flipkart</span>
  </div>
);

// ==========================================
// MASTER HIRING PARTNERS DATA
// ==========================================

export const COMPANY_LOGO_MAP = {
  Amazon: AmazonLogo,
  Microsoft: MicrosoftLogo,
  Google: GoogleLogo,
  TCS: TCSLogo,
  Infosys: InfosysLogo,
  Wipro: WiproLogo,
  Swiggy: SwiggyLogo,
  Zomato: ZomatoLogo,
  Deloitte: DeloitteLogo,
  Paytm: PaytmLogo,
  Cognizant: CognizantLogo,
  "HCL Tech": HCLTechLogo,
  "Tech Mahindra": TechMahindraLogo,
  Accenture: AccentureLogo,
  Flipkart: FlipkartLogo,
  Jio: JioLogo,
  "Reliance Jio": JioLogo,
};

export const HIRING_PARTNERS = [
  {
    id: "tcs",
    name: "TCS",
    fullName: "Tata Consultancy Services",
    type: "mnc",
    logoComponent: TCSLogo,
    roleTag: "Software & Cloud",
    badge: "50+ Placed",
  },
  {
    id: "infosys",
    name: "Infosys",
    fullName: "Infosys Ltd",
    type: "mnc",
    logoComponent: InfosysLogo,
    roleTag: "Digital Specialist",
    badge: "Active Hiring",
  },
  {
    id: "wipro",
    name: "Wipro",
    fullName: "Wipro Technologies",
    type: "mnc",
    logoComponent: WiproLogo,
    roleTag: "Enterprise Tech",
    badge: "Hiring Partner",
  },
  {
    id: "hcl",
    name: "HCL Tech",
    fullName: "HCL Technologies",
    type: "mnc",
    logoComponent: HCLTechLogo,
    roleTag: "Cloud & Cyber",
    badge: "Tech Partner",
  },
  {
    id: "cognizant",
    name: "Cognizant",
    fullName: "Cognizant Technology Solutions",
    type: "mnc",
    logoComponent: CognizantLogo,
    roleTag: "Full Stack & QA",
    badge: "Direct Drive",
  },
  {
    id: "techmahindra",
    name: "Tech Mahindra",
    fullName: "Tech Mahindra Ltd",
    type: "mnc",
    logoComponent: TechMahindraLogo,
    roleTag: "Telecom & Cloud",
    badge: "Regular Drives",
  },
  {
    id: "amazon",
    name: "Amazon",
    fullName: "Amazon AWS / Product",
    type: "product",
    logoComponent: AmazonLogo,
    roleTag: "SDE & Cloud Ops",
    badge: "Top Tier CTC",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    fullName: "Microsoft Corporation",
    type: "product",
    logoComponent: MicrosoftLogo,
    roleTag: "Azure & SDE",
    badge: "Elite Recruiter",
  },
  {
    id: "google",
    name: "Google",
    fullName: "Google Cloud Ecosystem",
    type: "product",
    logoComponent: GoogleLogo,
    roleTag: "AI & Cloud Engg",
    badge: "Ecosystem Partner",
  },
  {
    id: "swiggy",
    name: "Swiggy",
    fullName: "Swiggy (Bundl Technologies)",
    type: "product",
    logoComponent: SwiggyLogo,
    roleTag: "Growth & Frontend",
    badge: "High-Growth",
  },
  {
    id: "zomato",
    name: "Zomato",
    fullName: "Zomato Ltd",
    type: "product",
    logoComponent: ZomatoLogo,
    roleTag: "Performance Growth",
    badge: "Consumer Tech",
  },
  {
    id: "paytm",
    name: "Paytm",
    fullName: "One97 Communications",
    type: "product",
    logoComponent: PaytmLogo,
    roleTag: "Fintech & Data",
    badge: "Fintech Leader",
  },
  {
    id: "jio",
    name: "Reliance Jio",
    fullName: "Jio Platforms",
    type: "mnc",
    logoComponent: JioLogo,
    roleTag: "5G & Full Stack",
    badge: "Mass Recruiter",
  },
  {
    id: "deloitte",
    name: "Deloitte",
    fullName: "Deloitte USI / India",
    type: "consulting",
    logoComponent: DeloitteLogo,
    roleTag: "Analytics & Cyber",
    badge: "Big 4 Partner",
  },
  {
    id: "accenture",
    name: "Accenture",
    fullName: "Accenture Solutions",
    type: "consulting",
    logoComponent: AccentureLogo,
    roleTag: "Strategy & Tech",
    badge: "Global Leader",
  },
  {
    id: "flipkart",
    name: "Flipkart",
    fullName: "Flipkart Internet",
    type: "product",
    logoComponent: FlipkartLogo,
    roleTag: "E-Com & Analytics",
    badge: "Top Unicorn",
  },
];

export default function HiringPartnersStrip({
  title = "Top Companies Hiring Our Skilling Graduates",
  subtitle = "Direct recruitment drives, corporate referrals, and guaranteed interviews with 500+ top tech MNCs, high-growth product companies & leading digital agencies.",
  showFilter = true,
  className = "",
}) {
  const [filter, setFilter] = useState("all");

  const filteredPartners =
    filter === "all"
      ? HIRING_PARTNERS
      : HIRING_PARTNERS.filter((p) => p.type === filter);

  return (
    <section className={`bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm ${className}`}>
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#7C2D12] bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full">
          <FaBriefcase className="text-amber-600 text-[11px]" />
          Placement & Corporate Career Network
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-[#0B1220] mt-3">
          {title}
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
          {subtitle}
        </p>

        {/* Highlight Stats Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center">
            <div className="text-lg font-black text-[#0B1220]">500+</div>
            <div className="text-[11px] text-slate-500 font-medium">Hiring Partners</div>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center">
            <div className="text-lg font-black text-emerald-600">₹4.5 - ₹24 LPA</div>
            <div className="text-[11px] text-slate-500 font-medium">Salary Range</div>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center">
            <div className="text-lg font-black text-[#0B1220]">97%</div>
            <div className="text-[11px] text-slate-500 font-medium">Placement Rate</div>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center">
            <div className="text-lg font-black text-amber-600">Direct Drives</div>
            <div className="text-[11px] text-slate-500 font-medium">Fast-Track Hiring</div>
          </div>
        </div>

        {/* Category Filters */}
        {showFilter && (
          <div className="flex items-center justify-center flex-wrap gap-2 mt-6">
            {[
              { id: "all", label: `All Partners (${HIRING_PARTNERS.length})` },
              { id: "product", label: "Product & Tech Unicorns" },
              { id: "mnc", label: "Global IT Services" },
              { id: "consulting", label: "Consulting & Analytics" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  filter === tab.id
                    ? "bg-[#0B1220] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Companies Logo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
        {filteredPartners.map((company) => {
          const LogoComp = company.logoComponent;
          return (
            <div
              key={company.id}
              className="group bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex flex-col items-center justify-between text-center hover:border-amber-400 hover:shadow-md transition-all duration-200 min-h-[110px]"
            >
              {/* Logo Area */}
              <div className="h-9 flex items-center justify-center w-full my-auto transition-transform duration-200 group-hover:scale-105">
                <LogoComp />
              </div>

              {/* Subtitle / Role Tag */}
              <div className="w-full pt-2 border-t border-slate-100 mt-2 flex items-center justify-between text-[10px] text-slate-500">
                <span className="font-medium truncate max-w-[90px]">{company.roleTag}</span>
                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/60 shrink-0">
                  {company.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Footer Note */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-emerald-500" />
          <span>Verified corporate placements across Delhi-NCR, Bangalore, Pune, Mumbai, & Remote.</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600 font-medium">
          <FaGraduationCap className="text-amber-600" />
          <span>Dedicated 1-on-1 placement desk until you get hired</span>
        </div>
      </div>
    </section>
  );
}

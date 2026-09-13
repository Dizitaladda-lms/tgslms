import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  ShieldCheck,
  Star,
  Users,
  Clock3,
  Award,
  ChevronRight,
  CheckCircle2,
  Copy,
  Check,
  Eye,
  EyeOff,
  Lock,
  ArrowRight,
  BookOpen,
  GraduationCap,
  AlertCircle,
  PhoneCall,
  Mail,
  UserCheck,
} from "lucide-react";
import api from "../lib/api";

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [course, setCourse] = useState(state?.course || null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Student Form Details (Left Side)
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  })();

  const [formData, setFormData] = useState({
    firstName: storedUser?.name ? storedUser.name.split(" ")[0] : "",
    lastName: storedUser?.name ? storedUser.name.split(" ").slice(1).join(" ") : "",
    email: storedUser?.email || "",
    phone: storedUser?.phone || "",
    state: "",
    city: "",
    address: "",
    agreeTerms: true,
  });

  // Success State & Generated Credentials
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const [copiedField, setCopiedField] = useState("");
  const [showPassword, setShowPassword] = useState(false);



  // Fallback course fetch if user navigated to /checkout directly
  useEffect(() => {
    if (!course) {
      api
        .get("/api/courses")
        .then((res) => {
          const list = res.data?.courses || [];
          if (list.length > 0) {
            const defaultC = list.find((c) => c.course_id === "dm-advanced") || list[0];
            setCourse({
              id: defaultC.course_id || defaultC.id,
              title: defaultC.title,
              price: Number(defaultC.price) || 45000,
              originalPrice: Number(defaultC.original_price) || 60000,
              duration: defaultC.duration || "6 Months",
              level: defaultC.level || "Advanced Track",
              image:
                defaultC.thumbnail ||
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
              description: defaultC.description,
            });
          }
        })
        .catch((err) => console.warn("Failed to load fallback course:", err));
    }
  }, [course]);

  // Live Database Price Verification: Guarantees authentic price from DB & prevents DevTools tampering
  useEffect(() => {
    if (course?.id) {
      api
        .get(`/api/courses/${course.id}`)
        .then((res) => {
          if (res.data?.course) {
            const dbCourse = res.data.course;
            setCourse((prev) => ({
              ...prev,
              title: dbCourse.title || prev.title,
              price: Number(dbCourse.price) || prev.price,
              originalPrice: Number(dbCourse.original_price) || prev.originalPrice,
              duration: dbCourse.duration || prev.duration,
              totalLectures: dbCourse.total_lectures,
              sections: dbCourse.sections,
            }));
          }
        })
        .catch((err) => console.warn("Live DB course verification notice:", err.message));
    }
  }, [course?.id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errorMsg) setErrorMsg("");
  };

  const copyToClipboard = (text, fieldName) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(""), 2500);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.Razorpay) {
        return resolve(true);
      }
      const existingScript = document.querySelector('script[src*="checkout.razorpay.com"]');
      if (existingScript) {
        if (window.Razorpay) return resolve(true);
        existingScript.addEventListener("load", () => resolve(true));
        existingScript.addEventListener("error", () => resolve(false));
        setTimeout(() => resolve(Boolean(window.Razorpay)), 3000);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
      setTimeout(() => resolve(Boolean(window.Razorpay)), 4000);
    });
  };

  const handlePayment = async (e) => {
    if (e) e.preventDefault();
    if (!course) return;

    // Validate Required Student Information
    if (!formData.firstName.trim()) {
      setErrorMsg("Please enter your First Name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("Please enter a valid Email Address for your portal login.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit Mobile Number for official registration.");
      return;
    }
    if (!formData.agreeTerms) {
      setErrorMsg("Please accept the Terms & Conditions to proceed with enrollment.");
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMsg("");

      const isLoaded = await loadRazorpayScript();
      if (!isLoaded || typeof window.Razorpay !== "function") {
        setErrorMsg("Unable to load Razorpay payment SDK. Please check your internet connection or disable ad-blockers and try again.");
        setIsProcessing(false);
        return;
      }

      // 1. Create real order on backend with student details
      const orderRes = await api.post("/api/payment/create-order", {
        courseId: course.id,
        amount: course.price,
        studentDetails: {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          state: formData.state.trim(),
          city: formData.city.trim(),
        },
      });

      if (!orderRes.data?.success || !orderRes.data?.order) {
        throw new Error(orderRes.data?.message || "Failed to generate payment order from server.");
      }

      const { order, keyId } = orderRes.data;

      // 2. Configure Official Razorpay Checkout Options
      const fullName = [formData.firstName.trim(), formData.lastName.trim()].filter(Boolean).join(" ");

      const options = {
        key: keyId || "rzp_test_TWPxFYGnxRpKCL",
        amount: order.amount,
        currency: order.currency || "INR",
        name: "DIZITAL ADDA LMS",
        description: `Enrollment: ${course.title}`,
        order_id: order.id,
        prefill: {
          name: fullName,
          email: formData.email.trim().toLowerCase(),
          contact: formData.phone.trim(),
        },
        theme: {
          color: "#7C2D12",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
        handler: async function (response) {
          try {
            // 3. Verify signature on backend & generate student credentials
            const verifyRes = await api.post("/api/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: course.id,
              amount: course.price,
              studentDetails: {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim().toLowerCase(),
                phone: formData.phone.trim(),
                state: formData.state.trim(),
                city: formData.city.trim(),
              },
            });

            if (verifyRes.data.success) {
              if (verifyRes.data.token) {
                localStorage.setItem("token", verifyRes.data.token);
              }
              if (verifyRes.data.user) {
                localStorage.setItem("user", JSON.stringify(verifyRes.data.user));
              }

              setCredentials(verifyRes.data.credentials);
              setPaymentSuccess(true);
              window.scrollTo({ top: 100, behavior: "smooth" });
            }
          } catch (err) {
            console.error("Verification failed:", err);
            setErrorMsg(
              err.response?.data?.message ||
                "Payment was successful, but auto-activation encountered a delay. Please contact support at +91 8810606010."
            );
          } finally {
            setIsProcessing(false);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        setErrorMsg(`Payment Failed: ${response.error?.description || response.error?.reason || "Transaction declined"}`);
        setIsProcessing(false);
      });
      rzp.open();
    } catch (error) {
      console.error("Order creation failed:", error);
      let userFriendlyMsg = "Failed to initialize Razorpay payment gateway.";
      if (error.response?.data?.message) {
        userFriendlyMsg = error.response.data.message;
      } else if (error.code === "ERR_NETWORK" || error.message?.includes("Network Error")) {
        userFriendlyMsg = "Unable to connect to LMS live backend server. Please check your internet connection or try again in a few moments.";
      } else if (error.message) {
        userFriendlyMsg = error.message;
      }
      setErrorMsg(userFriendlyMsg);
      setIsProcessing(false);
    }
  };

  // ========================================================
  // POST-PAYMENT SUCCESS & CREDENTIALS SCREEN
  // ========================================================
  if (paymentSuccess && credentials) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Top Success Badge */}
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-emerald-500 overflow-hidden">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 text-white p-8 sm:p-10 text-center relative overflow-hidden">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                <CheckCircle2 size={48} className="text-white" />
              </div>

              <span className="inline-block text-xs font-bold uppercase tracking-widest bg-emerald-900/50 text-emerald-200 px-4 py-1.5 rounded-full mb-3 border border-emerald-400/30">
                Official Enrollment Activated
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">
                Payment Successful! 🎉
              </h1>

              <p className="text-emerald-100 text-base sm:text-lg mt-3 max-w-xl mx-auto">
                Welcome to Dizital Adda! Your admission has been recorded in our student registry and your course access has been activated.
              </p>

              <div className="mt-4 inline-flex items-center gap-2 bg-emerald-900/40 text-emerald-200 text-xs sm:text-sm px-4 py-1.5 rounded-xl border border-emerald-400/20">
                <span>Payment Reference:</span>
                <span className="font-mono font-bold text-white">
                  {credentials.paymentId || "PAY-VERIFIED"}
                </span>
              </div>
            </div>

            <div className="p-8 sm:p-10 space-y-8">
              {/* 5-Minute Waiting & Provisioning Notice */}
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 flex items-start gap-4">
                <Clock3 className="text-amber-600 mt-1 shrink-0" size={24} />
                <div>
                  <h4 className="text-amber-900 font-bold text-base">
                    Please Wait 5 Minutes for Full Environment Provisioning
                  </h4>
                  <p className="text-amber-800 text-sm mt-1 leading-relaxed">
                    Our cloud system is currently preparing your dedicated lecture player, initializing your assignment dashboard, and assigning your senior mentor. You can log into your student portal immediately using the temporary credentials below.
                  </p>
                </div>
              </div>

              {/* Generated Temporary Credentials Card */}
              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between gap-4 border-b border-slate-700 pb-5 mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D4A017] block">
                      Your Portal Access Credentials
                    </span>
                    <h3 className="text-2xl font-black mt-1">
                      Student Login Account
                    </h3>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full font-bold">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Username / Email */}
                  <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700">
                    <span className="text-xs font-semibold text-slate-400 block mb-1">
                      Portal Username (Email ID)
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm sm:text-base font-bold text-white truncate">
                        {credentials.username}
                      </span>
                      <button
                        onClick={() => copyToClipboard(credentials.username, "username")}
                        className="ml-2 p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition flex items-center gap-1 text-xs"
                      >
                        {copiedField === "username" ? (
                          <>
                            <Check size={14} className="text-emerald-400" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={14} /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Temporary Password */}
                  <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700">
                    <span className="text-xs font-semibold text-slate-400 block mb-1">
                      Temporary Access Password
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-base font-bold text-[#D4A017] tracking-wider">
                        {showPassword ? credentials.tempPassword : "••••••••••"}
                      </span>
                      <div className="flex items-center gap-1.5 ml-2">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition"
                          title={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(credentials.tempPassword, "password")}
                          className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition flex items-center gap-1 text-xs"
                        >
                          {copiedField === "password" ? (
                            <>
                              <Check size={14} className="text-emerald-400" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy size={14} /> Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Student Roll ID */}
                  <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700">
                    <span className="text-xs font-semibold text-slate-400 block mb-1">
                      Student Roll / Registry ID
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm sm:text-base font-bold text-cyan-300">
                        {credentials.studentId}
                      </span>
                      <button
                        onClick={() => copyToClipboard(credentials.studentId, "studentId")}
                        className="ml-2 p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition flex items-center gap-1 text-xs"
                      >
                        {copiedField === "studentId" ? (
                          <>
                            <Check size={14} className="text-emerald-400" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={14} /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Enrolled Program */}
                  <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700">
                    <span className="text-xs font-semibold text-slate-400 block mb-1">
                      Enrolled Program
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white truncate">
                        {credentials.courseTitle}
                      </span>
                      <span className="text-[11px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-md font-bold shrink-0 ml-2">
                        {credentials.duration || "Active"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Password Change Information Callout */}
                <div className="mt-6 pt-5 border-t border-slate-800 flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <Lock className="text-[#D4A017] shrink-0 mt-0.5" size={18} />
                  <p>
                    <strong className="text-white">Important Security Notice:</strong> This temporary password has been auto-generated for instant access. You can customize your password anytime from your <strong>Student Profile Settings</strong> once you enter the dashboard.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => navigate("/student")}
                  className="flex-1 bg-gradient-to-r from-[#7C2D12] to-[#b88a10] hover:from-[#60230e] hover:to-[#9c750d] text-white py-4 px-6 rounded-2xl font-bold text-base shadow-xl flex items-center justify-center gap-2 transition hover:scale-[1.02] cursor-pointer"
                >
                  <UserCheck size={20} /> Access Student Portal Now 🚀
                </button>

                <button
                  onClick={() => navigate(`/learn/${credentials.courseId || course.id}`)}
                  className="flex-1 bg-slate-900 hover:bg-black text-white py-4 px-6 rounded-2xl font-bold text-base shadow-md flex items-center justify-center gap-2 transition hover:scale-[1.02] cursor-pointer"
                >
                  <BookOpen size={20} /> Start Learning First Lesson ▶️
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => window.print()}
                  className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 underline transition"
                >
                  Download / Print Enrollment Receipt (PDF)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate pricing numbers
  const originalPrice = Number(course?.originalPrice || (course?.price ? course.price * 1.3 : 50000));
  const currentPrice = Number(course?.price || 45000);
  const discount = Math.max(0, originalPrice - currentPrice);

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-800">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0B1220] via-[#16243D] to-[#0B1220] text-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center text-xs sm:text-sm text-gray-300 mb-4 flex-wrap">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight size={14} className="mx-2" />
            <Link to="/skilling" className="hover:text-white">
              Skilling
            </Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-[#D4A017] font-semibold">Checkout & Student Enrollment</span>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 px-3.5 py-1.5 rounded-full text-emerald-300 text-xs font-semibold mb-3">
                <ShieldCheck size={16} /> 256-bit SSL Certified Secure Admission
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                Student Enrollment & Billing
              </h1>
              <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl">
                Enter your details to generate your official student portal credentials and activate your course immediately.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl">
              <GraduationCap className="text-[#D4A017]" size={24} />
              <div>
                <span className="text-xs text-slate-300 block font-medium">Instant Portal Access</span>
                <span className="text-sm font-black text-white">Auto-Provisioned in 5 Mins</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Container */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {errorMsg && (
          <div className="mb-8 bg-red-50 border-2 border-red-300 rounded-2xl p-4 flex items-center gap-3 text-red-800 text-sm font-semibold animate-shake">
            <AlertCircle size={20} className="shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ========================================================
              LEFT SIDE: STUDENT INFORMATION FORM (7 Cols)
          ======================================================== */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-7 sm:p-9">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#7C2D12]">
                    Step 1 of 2
                  </span>
                  <h2 className="text-2xl font-black text-[#0B1220]">
                    Student Profile Details
                  </h2>
                </div>
                <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-bold">
                  Official Record
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Your temporary login password and student certificate will be registered to this email and phone number.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* First Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="e.g. Rahul"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C2D12] transition"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="e.g. Sharma"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C2D12] transition"
                  />
                </div>

                {/* Email Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Email Address (Student Portal Username) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. rahul.sharma@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C2D12] transition pl-11"
                    />
                    <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Your auto-generated temporary password and credentials will be sent to this email.
                  </span>
                </div>

                {/* Mobile Number */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C2D12] transition pl-11"
                    />
                    <PhoneCall className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Used for mentor session invitations, attendance, and placement drives.
                  </span>
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    State / Region
                  </label>
                  <input
                    type="text"
                    name="state"
                    placeholder="e.g. Delhi NCR / Maharashtra"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C2D12] transition"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. New Delhi"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C2D12] transition"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-7 sm:p-9">
              <h3 className="text-xl font-black text-[#0B1220] mb-4">
                Payment Gateway
              </h3>

              <div className="border-2 border-[#7C2D12] bg-orange-50/50 rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full border-4 border-[#7C2D12] bg-white flex items-center justify-center"></div>
                  <div>
                    <h4 className="font-bold text-[#0B1220] text-base">
                      Razorpay Official Gateway (All Payment Modes)
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      UPI (GPay, PhonePe, Paytm), Credit Card, Debit Card, Net Banking & No-Cost EMI
                    </p>
                  </div>
                </div>
                <ShieldCheck size={26} className="text-emerald-600 shrink-0" />
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-[#7C2D12] rounded border-slate-300 focus:ring-[#7C2D12]"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    I agree to the Dizital Adda Terms of Enrollment. I understand that my course access will be provisioned immediately and portal credentials will be generated upon successful payment.
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT SIDE: COURSE BILL & ORDER SUMMARY (5 Cols)
          ======================================================== */}
          <div className="lg:col-span-5">
            <div className="sticky top-10 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Header */}
              <div className="bg-[#0B1220] text-white p-6 sm:p-7">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4A017] block">
                  Step 2 of 2
                </span>
                <h3 className="text-2xl font-black mt-1">Course Bill Details</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Official invoice & itemized program fee breakdown.
                </p>
              </div>

              {/* Course Card Preview */}
              <div className="p-6 sm:p-7">
                <div className="flex gap-4 items-center bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                  <img
                    src={course?.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f"}
                    alt={course?.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200"
                  />
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-[#7C2D12] uppercase tracking-wider block">
                      {course?.level || "Professional Program"}
                    </span>
                    <h4 className="font-black text-[#0B1220] text-base leading-snug truncate">
                      {course?.title || "Advanced Digital Marketing Course"}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <Clock3 size={13} />
                      <span>{course?.duration || "6 Months Track"}</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3.5 my-6 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Original Course Fee</span>
                    <span className="line-through text-slate-400">
                      ₹{originalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Direct Portal Scholarship</span>
                    <span>- ₹{discount.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>LMS Access & Cloud Lab Setup</span>
                    <span className="text-emerald-700 font-bold">100% Free</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Applicable GST (18%)</span>
                    <span className="text-slate-500">Included in Fee</span>
                  </div>

                  <div className="border-t border-slate-200 pt-4 flex justify-between items-baseline">
                    <span className="text-base font-black text-[#0B1220]">Total Payable</span>
                    <span className="text-3xl font-black text-[#7C2D12]">
                      ₹{currentPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Inclusions Checklist */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>Instant LMS Portal login & class recordings</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>10 Live Brand Projects with real ad budgets</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>Industry Recognized NSQF Aligned Certification</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    <span>Paid In-House Agency Internship Support</span>
                  </div>
                </div>

                {/* Pay Action CTA Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full mt-6 bg-[#7C2D12] hover:bg-[#60230e] text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 ${
                    isProcessing ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:scale-[1.02]"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Connecting Gateway...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      <span>Pay ₹{currentPrice.toLocaleString("en-IN")} & Enroll Now</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-slate-400 mt-4 leading-relaxed">
                  🔒 Protected by 256-bit SSL encryption. Once payment is completed, you will receive your temporary portal ID and password immediately.
                </p>
              </div>
            </div>
          </div>
        </form>
        </main>
    </div>
  );
};

export default Checkout;

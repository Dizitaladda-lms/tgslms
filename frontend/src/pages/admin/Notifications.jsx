import {
  FaBell,
  FaBook,
  FaUsers,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaBirthdayCake,
  FaUserGraduate,
  FaCheckCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Notifications() {

  const notifications = [

    {
      id: 1,
      type: "course",
      student: "Aman Sharma",
      title: "Course Ending Soon",
      message:
        "Full Stack Development course will expire in 3 days.",
      time: "2 mins ago",
      unread: true,
    },

    {
      id: 2,
      type: "placement",
      student: "Priya Verma",
      title: "Placement Assistance Required",
      message:
        "Student requested placement support for Data Science role.",
      time: "10 mins ago",
      unread: true,
    },

    {
      id: 3,
      type: "birthday",
      student: "Rohit Kumar",
      title: "Birthday Reminder 🎂",
      message:
        "Today is Rohit Kumar's birthday. Send wishes from LMS team.",
      time: "1 hour ago",
      unread: false,
    },

    {
      id: 4,
      type: "fees",
      student: "Sneha Patel",
      title: "Fee Payment Pending",
      message:
        "Course payment installment pending for 7 days.",
      time: "3 hours ago",
      unread: false,
    },

    {
      id: 5,
      type: "attendance",
      student: "Karan Singh",
      title: "Low Attendance Alert",
      message:
        "Attendance dropped below 50% in AI Masterclass.",
      time: "5 hours ago",
      unread: false,
    },

    {
      id: 6,
      type: "certificate",
      student: "Anjali Mehta",
      title: "Certificate Eligible",
      message:
        "Student completed all modules and eligible for certificate.",
      time: "7 hours ago",
      unread: false,
    },

    {
      id: 7,
      type: "inactive",
      student: "Mohit Yadav",
      title: "Inactive Student",
      message:
        "No LMS activity detected for the last 14 days.",
      time: "1 day ago",
      unread: false,
    },

  ];

  const getIcon = (type) => {

    switch (type) {

      case "course":
        return <FaBook className="text-cyan-400 text-4xl" />;

      case "placement":
        return <FaUsers className="text-emerald-400 text-4xl" />;

      case "birthday":
        return <FaBirthdayCake className="text-pink-400 text-4xl" />;

      case "fees":
        return <FaMoneyBillWave className="text-yellow-400 text-4xl" />;

      case "attendance":
        return <FaExclamationTriangle className="text-red-400 text-4xl" />;

      case "certificate":
        return <FaCheckCircle className="text-purple-400 text-4xl" />;

      case "inactive":
        return <FaUserGraduate className="text-orange-400 text-4xl" />;

      default:
        return <FaBell className="text-white text-4xl" />;

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white p-10 relative overflow-hidden">

      {/* GLOW EFFECTS */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* HEADER */}
      <div className="relative z-10 flex justify-between items-center">

        <div>

          <h1 className="text-7xl font-black flex items-center gap-5">

            <FaBell className="text-cyan-400" />

            Smart Notifications

          </h1>

          <p className="text-slate-400 text-xl mt-5 max-w-5xl leading-9">

            Monitor student activity, course expirations,
            placement requests, birthdays, payments,
            attendance alerts and important LMS events.

          </p>

        </div>

        <div className="bg-red-500 px-8 py-5 rounded-3xl shadow-2xl">

          <h1 className="text-3xl font-black">

            7 Alerts

          </h1>

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-8 mt-14 relative z-10">

        <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-[35px] p-8 backdrop-blur-2xl">

          <FaBell className="text-5xl text-cyan-400" />

          <h2 className="text-slate-300 mt-5 text-lg">

            Total Notifications

          </h2>

          <p className="text-5xl font-black mt-4">

            248

          </p>

        </div>

        <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-[35px] p-8 backdrop-blur-2xl">

          <FaUsers className="text-5xl text-emerald-400" />

          <h2 className="text-slate-300 mt-5 text-lg">

            Placement Requests

          </h2>

          <p className="text-5xl font-black mt-4">

            42

          </p>

        </div>

        <div className="bg-yellow-500/10 border border-yellow-400/20 rounded-[35px] p-8 backdrop-blur-2xl">

          <FaMoneyBillWave className="text-5xl text-yellow-400" />

          <h2 className="text-slate-300 mt-5 text-lg">

            Pending Fees

          </h2>

          <p className="text-5xl font-black mt-4">

            18

          </p>

        </div>

        <div className="bg-red-500/10 border border-red-400/20 rounded-[35px] p-8 backdrop-blur-2xl">

          <FaExclamationTriangle className="text-5xl text-red-400" />

          <h2 className="text-slate-300 mt-5 text-lg">

            Attendance Alerts

          </h2>

          <p className="text-5xl font-black mt-4">

            12

          </p>

        </div>

      </div>

      {/* NOTIFICATION LIST */}
      <div className="space-y-8 mt-14 relative z-10">

        {notifications.map((notification) => (

          <div
            key={notification.id}
            className={`backdrop-blur-2xl border rounded-[35px] p-8 shadow-2xl transition hover:scale-[1.01]
            ${
              notification.unread
                ? "bg-cyan-500/10 border-cyan-400/20"
                : "bg-white/10 border-white/10"
            }`}
          >

            <div className="flex justify-between items-center">

              {/* LEFT */}
              <div className="flex gap-6 items-start">

                <div className="bg-black/30 p-5 rounded-3xl">

                  {getIcon(notification.type)}

                </div>

                <div>

                  <div className="flex items-center gap-4">

                    <h1 className="text-3xl font-black">

                      {notification.title}

                    </h1>

                    {notification.unread && (

                      <span className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold text-sm">

                        NEW

                      </span>

                    )}

                  </div>

                  <p className="text-cyan-300 text-lg mt-3">

                    Student:
                    <span className="font-bold text-white ml-2">

                      {notification.student}

                    </span>

                  </p>

                  <p className="text-slate-300 text-lg mt-4 leading-8 max-w-4xl">

                    {notification.message}

                  </p>

                </div>

              </div>

              {/* RIGHT */}
              <div className="text-right">

                <p className="text-slate-400 text-lg">

                  {notification.time}

                </p>

                <Link
                  to={notification.type === "certificate" ? "/admin/certificates" : "/admin/students"}
                  className="mt-5 inline-block bg-cyan-500 hover:bg-cyan-400 transition px-6 py-3 rounded-2xl font-bold text-white text-sm"
                >
                  {notification.type === "certificate" ? "Upload Certificate PDF →" : "View Details"}
                </Link>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Notifications;
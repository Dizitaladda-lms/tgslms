import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import CourseCard from "../course/CourseCard";

function PopularCourses() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await api.get("/api/courses");
      const courseList = response.data?.courses || response.data || [];
      setCourses(courseList);
    } catch (error) {
      console.error("PopularCourses fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <section className="py-24 bg-slate-100/70 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6">
        {/* TOP */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#7C2D12] bg-[#D4A017]/20 border border-[#D4A017]/40 px-3.5 py-1 rounded-full">
              Industry Accredited Tracks
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0B1220] tracking-tight mt-3">
              Popular Certification Programs
            </h2>
            <p className="text-slate-600 mt-2 text-base sm:text-lg max-w-2xl leading-relaxed">
              Explore our most trending, project-driven programs designed with working industry experts.
            </p>
          </div>

          {/* EXPLORE BUTTON */}
          <Link
            to="/courses"
            className="bg-[#0B1220] hover:bg-[#7C2D12] text-white border-2 border-[#D4A017] font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg transition duration-200 shrink-0"
          >
            Explore All Courses →
          </Link>
        </div>

        {/* COURSES GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {courses.slice(0, 6).map((course, index) => (
            <CourseCard key={course.id || index} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularCourses;
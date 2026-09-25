import React, { useState } from "react";
import CourseCard from "../components/course/CourseCard";
import courses from "../data/courses";
import { useLocation } from "react-router-dom";     
import Footer from "../components/Footer";     

function CourseListing() {
    
const location = useLocation();

const {
  educationType,
  board,
  selectedClass,
  selectedCourse,
  selectedSemester,
  stream,
  subject,
} = location.state || {};

  const [search, setSearch] = useState("");

 const filteredCourses = courses.filter((course) => {

  const matchSearch = course.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchEducation =
    !educationType || course.category.toLowerCase() ===
    (
      educationType === "school"
        ? "schooling"
        : educationType === "ug"
        ? "undergraduate"
        : "postgraduate"
    );

  const matchSubject =
    !subject || course.subject === subject;

  return matchSearch && matchEducation && matchSubject;

});

  return (
    <div className="min-h-screen bg-slate-100">

{/* ==========================
      HERO SECTION
========================== */}

<section className="bg-[#0B1220] text-white border-b-4 border-[#D4A017]">

  <div className="max-w-7xl mx-auto px-6 py-16">

    <h1 className="text-5xl md:text-6xl font-bold">
      Academic Courses
    </h1>

    <p className="text-orange-300 text-xl mt-5">
      Find the perfect course for your academic journey.
    </p>

    <div className="w-28 h-1 bg-[#D4A017] mt-6 rounded-full"></div>

    {/* Breadcrumb */}

    <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-300">

      {educationType && (
        <>
          <span className="bg-white/10 px-4 py-2 rounded-full">

            {educationType === "school"
              ? "📚 Schooling"
              : educationType === "ug"
              ? "🎓 Undergraduate"
              : "🎓 Postgraduate"}

          </span>

          <span>›</span>
        </>
      )}

      {board && (
        <>
          <span className="bg-white/10 px-4 py-2 rounded-full">
            {board}
          </span>

          <span>›</span>
        </>
      )}

      {selectedClass && (
        <>
          <span className="bg-white/10 px-4 py-2 rounded-full">
            Class {selectedClass}
          </span>

          <span>›</span>
        </>
      )}

      {selectedCourse && (
        <>
          <span className="bg-white/10 px-4 py-2 rounded-full">
            {selectedCourse}
          </span>

          <span>›</span>
        </>
      )}

      {selectedSemester && (
        <>
          <span className="bg-white/10 px-4 py-2 rounded-full">
            Semester {selectedSemester}
          </span>

          <span>›</span>
        </>
      )}

      {stream && (
        <>
          <span className="bg-white/10 px-4 py-2 rounded-full">
            {stream}
          </span>

          <span>›</span>
        </>
      )}

      {subject && (
        <span className="bg-[#D4A017] text-black px-4 py-2 rounded-full font-semibold">
          {subject}
        </span>
      )}

    </div>

    {/* Bottom */}

    <div className="mt-8 flex items-center justify-between flex-wrap gap-5">

      <p className="text-slate-300">

        Showing{" "}

        <span className="text-[#D4A017] font-bold">
          {filteredCourses.length}
        </span>

        {" "}Courses

      </p>

      <button
        className="
        bg-[#D4A017]
        text-black
        px-6
        py-3
        rounded-lg
        font-semibold
        hover:bg-yellow-500
        transition
        "
      >
        Explore Courses
      </button>

    </div>

  </div>

</section>

{/* ==========================
      SEARCH & FILTER
========================== */}

<section className="bg-white border-b">

  <div className="max-w-7xl mx-auto px-6 py-8">

    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

      {/* Search */}

      <input
        type="text"
        placeholder="🔍 Search Course..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
        lg:col-span-2
        border
        border-slate-300
        rounded-xl
        px-5
        py-4
        outline-none
        focus:border-[#D4A017]
        "
      />

      {/* Category */}

      <select
        className="
        border
        border-slate-300
        rounded-xl
        px-4
        py-4
        outline-none
        focus:border-[#D4A017]
        "
      >
        <option>All Categories</option>
        <option>Schooling</option>
        <option>Undergraduate</option>
        <option>Postgraduate</option>
      </select>

      {/* Rating */}

      <select
        className="
        border
        border-slate-300
        rounded-xl
        px-4
        py-4
        outline-none
        focus:border-[#D4A017]
        "
      >
        <option>Rating</option>
        <option>4★ & Above</option>
        <option>3★ & Above</option>
      </select>

      {/* Sort */}

      <select
        className="
        border
        border-slate-300
        rounded-xl
        px-4
        py-4
        outline-none
        focus:border-[#D4A017]
        "
      >
        <option>Sort By</option>
        <option>Newest</option>
        <option>Price Low → High</option>
        <option>Price High → Low</option>
        <option>Most Popular</option>
      </select>

    </div>

  </div>

</section>


{/* ==========================
      COURSES SECTION
========================== */}

<section className="bg-[#f8fafc] py-12">

  <div className="max-w-7xl mx-auto px-6">

    <div className="flex items-center justify-between mb-8">

      <div>

        <h2 className="text-3xl font-bold text-[#0B1220]">

          Available Courses

        </h2>

        <p className="text-slate-500 mt-2">

          Choose the best course based on your academic selection.

        </p>

      </div>

      <span
        className="
        bg-[#D4A017]
        text-black
        px-5
        py-2
        rounded-full
        font-semibold
        "
      >

        {filteredCourses.length} Courses

      </span>

    </div>

    {/* Cards */}

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

      {filteredCourses.length > 0 ? (

        filteredCourses.map((course) => (

          <CourseCard
            key={course.id}
            course={course}
          />

        ))

      ) : (

        <div className="col-span-full text-center py-20">

          <h3 className="text-2xl font-bold text-slate-700">

            No Courses Found

          </h3>

          <p className="text-slate-500 mt-3">

            Try searching with another keyword.

          </p>

        </div>

      )}

    </div>

  </div>

</section>
      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default CourseListing;
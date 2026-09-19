import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../lib/api";
import { FaClock, FaCheckCircle } from "react-icons/fa";
import { getCourseDescriptionUrl } from "../../utils/courseNavigation";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  const fetchCourse = useCallback(async () => {
    try {
      const response = await api.get(`/api/courses/${id}`);
      setCourse(response.data.course);
    } catch (error) {
      console.error("Course Details Fetch Error:", error);
    }
  }, [id]);

  useEffect(() => {
    // If id maps to a specialized skilling page, redirect immediately
    const directUrl = getCourseDescriptionUrl({ id, course_id: id });
    if (directUrl && directUrl !== "/skilling" && !directUrl.startsWith(`/course/`)) {
      navigate(directUrl, { replace: true });
      return;
    }
    fetchCourse();
  }, [id, fetchCourse, navigate]);

  useEffect(() => {
    if (course) {
      const targetUrl = getCourseDescriptionUrl(course);
      if (targetUrl && targetUrl !== "/skilling" && !targetUrl.startsWith(`/course/`)) {
        navigate(targetUrl, { replace: true });
      }
    }
  }, [course, navigate]);

  // LOADING

  if (!course) {

    return (

      <div className="h-screen flex items-center justify-center text-4xl font-bold">

        Loading...

      </div>

    );

  }

  return (

    <div className="bg-slate-100 min-h-screen">

      {/* ==========================
        HERO SECTION
========================== */}

<div className="bg-gradient-to-r from-[#0B1220] via-[#14213D] to-[#1D3557] text-white">

  <div className="max-w-7xl mx-auto px-6 py-16">

    <div className="grid lg:grid-cols-2 gap-14 items-center">

      {/* LEFT */}

      <div>

        <span className="inline-block bg-[#D4A017] text-black px-4 py-2 rounded-full font-semibold">

          ⭐ Best Selling Course

        </span>

        <h1 className="text-5xl lg:text-6xl font-bold mt-8 leading-tight">

          {course.title}

        </h1>

        <p className="mt-8 text-slate-300 text-lg leading-9">

          {course.description}

        </p>

        {/* Rating */}

        <div className="flex flex-wrap items-center gap-8 mt-10">

          <div className="flex items-center gap-2">

            ⭐⭐⭐⭐⭐

            <span className="font-semibold">

              {course.rating}

            </span>

          </div>

          <div>

             {course.students} Students

          </div>

          <div>

             {course.language}

          </div>

          <div>

             {course.duration}

          </div>

        </div>

        {/* Instructor */}

        <div className="flex items-center gap-4 mt-10">

          <img
            src="https://i.pravatar.cc/100"
            alt="Instructor"
            className="w-16 h-16 rounded-full"
          />

          <div>

            <h3 className="text-xl font-bold">

              {course.instructor}

            </h3>

            <p className="text-slate-400">

              Senior Faculty

            </p>

          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          <img
            src={course.image}
            alt={course.title}
            className="w-full h-72 object-cover"
          />

          <div className="p-8">

            <div className="flex items-center gap-4">

              <h2 className="text-5xl font-bold text-red-600">

                ₹{course.price}

              </h2>

              <span className="line-through text-2xl text-gray-400">

                ₹{course.originalPrice}

              </span>

            </div>

            <div className="mt-2">

              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">

                {Math.round(
                  ((course.originalPrice - course.price) /
                    course.originalPrice) *
                    100
                )}
                % OFF

              </span>

            </div>

            <button
  onClick={() =>
    navigate("/checkout", {
      state: {
        course,
      },
    })
  }
  className="
    w-full
    bg-[#0B1220]
    text-white
    py-4
    rounded-xl
    text-xl
    font-bold
    mt-8
    hover:bg-[#D4A017]
    hover:text-black
    transition
  "
>
  Enroll Now
</button>

            <button
              className="
              w-full
              border-2
              border-[#0B1220]
              py-4
              rounded-xl
              text-lg
              font-semibold
              mt-4
              hover:bg-[#0B1220]
              hover:text-white
              transition
              "
            >

              ❤️ Add To Wishlist

            </button>

            <div className="mt-8 space-y-4 text-slate-700">

              <div>🎥 {course.videos} HD Video Lectures</div>

              <div>📄 {course.notes} PDF Notes</div>

              <div>📝 {course.tests} Mock Tests</div>

              <div>📚 Assignments Included</div>

              <div>🏆 Certificate Included</div>

              <div>♾ Lifetime Access</div>

              <div>📱 Mobile + Laptop Access</div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>
      {/* MAIN SECTION */}

      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* LEFT */}

        <div className="lg:col-span-2">

          {/* WHAT YOU LEARN */}

          <div className="bg-white rounded-3xl p-10 shadow-md">

            <h2 className="text-4xl font-bold mb-8">

              What You'll Learn

            </h2>

            <div className="space-y-5 text-lg">

              <div className="flex items-center gap-4">

                <FaCheckCircle className="text-green-500" />

                Real World Projects

              </div>

              <div className="flex items-center gap-4">

                <FaCheckCircle className="text-green-500" />

                Industry Level Skills

              </div>

              <div className="flex items-center gap-4">

                <FaCheckCircle className="text-green-500" />

                Interview Preparation

              </div>

              <div className="flex items-center gap-4">

                <FaCheckCircle className="text-green-500" />

                Certification Program

              </div>

            </div>

          </div>

          {/* ==========================
      COURSE INCLUDES
========================== */}

<div className="bg-white rounded-3xl p-10 shadow-md mt-10">

  <h2 className="text-4xl font-bold text-[#0B1220] mb-10">

    This Course Includes

  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

    <div className="bg-slate-50 rounded-xl p-6 text-center">
      <h3 className="text-4xl">🎥</h3>
      <p className="font-bold mt-3">{course.videos}</p>
      <span className="text-slate-500">Video Lectures</span>
    </div>

    <div className="bg-slate-50 rounded-xl p-6 text-center">
      <h3 className="text-4xl">📄</h3>
      <p className="font-bold mt-3">{course.notes}</p>
      <span className="text-slate-500">PDF Notes</span>
    </div>

    <div className="bg-slate-50 rounded-xl p-6 text-center">
      <h3 className="text-4xl">📝</h3>
      <p className="font-bold mt-3">{course.tests}</p>
      <span className="text-slate-500">Mock Tests</span>
    </div>

    <div className="bg-slate-50 rounded-xl p-6 text-center">
      <h3 className="text-4xl">🏆</h3>
      <p className="font-bold mt-3">Certificate</p>
      <span className="text-slate-500">Included</span>
    </div>

  </div>

</div>



{/* ==========================
      COURSE CURRICULUM
========================== */}

<div className="bg-white rounded-3xl p-10 shadow-md mt-10">

  <h2 className="text-4xl font-bold text-[#0B1220] mb-10">

    Course Curriculum

  </h2>

  <div className="space-y-5">

    <div className="border rounded-xl p-6">

      <h3 className="text-xl font-bold">

        Module 1 • Introduction

      </h3>

      <ul className="mt-4 space-y-2 text-slate-600">

        <li>✔ Introduction</li>

        <li>✔ Basic Concepts</li>

        <li>✔ Practice Session</li>

      </ul>

    </div>

    <div className="border rounded-xl p-6">

      <h3 className="text-xl font-bold">

        Module 2 • Intermediate

      </h3>

      <ul className="mt-4 space-y-2 text-slate-600">

        <li>✔ Core Topics</li>

        <li>✔ Numerical Problems</li>

        <li>✔ Assignment</li>

      </ul>

    </div>

    <div className="border rounded-xl p-6">

      <h3 className="text-xl font-bold">

        Module 3 • Advanced

      </h3>

      <ul className="mt-4 space-y-2 text-slate-600">

        <li>✔ Advanced Concepts</li>

        <li>✔ Mock Test</li>

        <li>✔ Final Revision</li>

      </ul>

    </div>

  </div>

</div>



{/* ==========================
      INSTRUCTOR
========================== */}

<div className="bg-white rounded-3xl p-10 shadow-md mt-10">

  <h2 className="text-4xl font-bold text-[#0B1220] mb-10">

    Meet Your Instructor

  </h2>

  <div className="flex flex-col md:flex-row gap-8 items-center">

    <img
      src="https://i.pravatar.cc/200"
      alt="Instructor"
      className="w-36 h-36 rounded-full border-4 border-[#D4A017]"
    />

    <div>

      <h3 className="text-3xl font-bold">

        {course.instructor}

      </h3>

      <p className="text-slate-500 mt-2">

        Senior Faculty • 12+ Years Experience

      </p>

      <p className="mt-6 leading-8 text-slate-600">

        Expert educator with years of teaching experience.
        Thousands of students have successfully completed
        this course and achieved excellent academic results.

      </p>

      <div className="flex gap-8 mt-8">

        <div>

          <h4 className="text-2xl font-bold text-[#0B1220]">

            50K+

          </h4>

          <p className="text-slate-500">

            Students

          </p>

        </div>

        <div>

          <h4 className="text-2xl font-bold text-[#0B1220]">

            4.9★

          </h4>

          <p className="text-slate-500">

            Rating

          </p>

        </div>

      </div>

    </div>

  </div>

</div>


{/* ==========================
      STUDENT REVIEWS
========================== */}

<div className="bg-white rounded-3xl p-10 shadow-md mt-10">

  <h2 className="text-4xl font-bold text-[#0B1220] mb-10">
    Student Reviews
  </h2>

  <div className="space-y-6">

    <div className="border rounded-xl p-6">

      <div className="flex items-center justify-between">

        <h3 className="font-bold text-xl">
          Rohan Sharma
        </h3>

        <span className="text-yellow-500 text-xl">
          ⭐⭐⭐⭐⭐
        </span>

      </div>

      <p className="mt-4 text-slate-600">
        Amazing course. The explanations are simple and
        the mock tests really helped me score better.
      </p>

    </div>

    <div className="border rounded-xl p-6">

      <div className="flex items-center justify-between">

        <h3 className="font-bold text-xl">
          Priya Verma
        </h3>

        <span className="text-yellow-500 text-xl">
          ⭐⭐⭐⭐⭐
        </span>

      </div>

      <p className="mt-4 text-slate-600">
        Excellent notes and quality video lectures.
        Highly recommended.
      </p>

    </div>

  </div>

</div>



{/* ==========================
      FAQ
========================== */}

<div className="bg-white rounded-3xl p-10 shadow-md mt-10">

  <h2 className="text-4xl font-bold text-[#0B1220] mb-10">

    Frequently Asked Questions

  </h2>

  <div className="space-y-5">

    <details className="border rounded-xl p-5">

      <summary className="font-semibold cursor-pointer">

        Is this course lifetime accessible?

      </summary>

      <p className="mt-4 text-slate-600">

        Yes. Once purchased, you'll have lifetime access.

      </p>

    </details>

    <details className="border rounded-xl p-5">

      <summary className="font-semibold cursor-pointer">

        Will I receive a certificate?

      </summary>

      <p className="mt-4 text-slate-600">

        Yes. A certificate will be provided after successful completion.

      </p>

    </details>

    <details className="border rounded-xl p-5">

      <summary className="font-semibold cursor-pointer">

        Can I access the course on mobile?

      </summary>

      <p className="mt-4 text-slate-600">

        Yes. Mobile, Tablet and Desktop are supported.

      </p>

    </details>

  </div>

</div>



{/* ==========================
      RELATED COURSES
========================== */}

<div className="bg-white rounded-3xl p-10 shadow-md mt-10 mb-10">

  <h2 className="text-4xl font-bold text-[#0B1220] mb-10">

    Related Courses

  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    <div className="border rounded-xl p-6 hover:shadow-lg transition">

      <h3 className="text-xl font-bold">

        Advanced Mathematics

      </h3>

      <p className="text-slate-500 mt-3">

        Complete Advanced Course

      </p>

    </div>

    <div className="border rounded-xl p-6 hover:shadow-lg transition">

      <h3 className="text-xl font-bold">

        Science Complete Batch

      </h3>

      <p className="text-slate-500 mt-3">

        Learn from basics to advanced.

      </p>

    </div>

    <div className="border rounded-xl p-6 hover:shadow-lg transition">

      <h3 className="text-xl font-bold">

        English Master Course

      </h3>

      <p className="text-slate-500 mt-3">

        Grammar + Writing + Literature

      </p>

    </div>

  </div>

</div>

          {/* SYLLABUS */}

          <div className="bg-white rounded-3xl p-10 shadow-md mt-10">

            <h2 className="text-4xl font-bold mb-8">

              Course Syllabus

            </h2>

            <div className="space-y-6">

              <div className="border rounded-2xl p-6">

                Module 1 — Basics

              </div>

              <div className="border rounded-2xl p-6">

                Module 2 — Advanced Concepts

              </div>

              <div className="border rounded-2xl p-6">

                Module 3 — Projects

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div>

          <div className="bg-white rounded-3xl p-10 shadow-md sticky top-10">

            <h2 className="text-5xl font-bold text-red-500">

              ₹{course.price}

            </h2> 

            <Link

              to="/"

              className="block text-center mt-10 text-blue-600 font-semibold"

            >

              ← Back To Courses

            </Link>

          </div>

        </div>

      </div>

    </div>

  );

};

export default CourseDetails;
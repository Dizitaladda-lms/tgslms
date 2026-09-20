import React from "react";

const popularCourses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    price: "₹4999",
    instructor: "Dizital Adda",
  },
  {
    id: 2,
    title: "Data Science Mastery",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    price: "₹6999",
    instructor: "Dizital Adda",
  },
  {
    id: 3,
    title: "Machine Learning Bootcamp",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",
    price: "₹7999",
    instructor: "Dizital Adda",
  },
  {
    id: 4,
    title: "React JS Complete Course",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    price: "₹3999",
    instructor: "Dizital Adda",
  },
];

export default function PopularCourses() {
  return (
    <section className="py-20 px-6 bg-gray-100">
      <h1 className="text-5xl font-bold text-center mb-16">
        Popular Courses
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {popularCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden hover:scale-105 transition duration-300"
          >
            <img
              src={course.image}
              alt={course.title}
              className="h-56 w-full object-cover"
            />

            <div className="p-6">
              <h2 className="text-2xl font-bold">
                {course.title}
              </h2>

              <p className="text-gray-500 mt-2">
                {course.instructor}
              </p>

              <button className="mt-6 w-full bg-blue-900 text-white py-3 rounded-xl hover:bg-blue-700 transition">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
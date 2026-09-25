import Footer from "../components/Footer";

function About() {

  return (

    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div className="px-10 py-20">

      <div className="max-w-6xl mx-auto">

        {/* HEADING */}

        <h1 className="text-6xl font-bold text-blue-900 mb-8">

          About DIZITAL ADDA

        </h1>

        <p className="text-xl text-slate-600 leading-10">

          DIZITAL ADDA is a modern Learning Management System
          focused on helping students build real-world skills
          in technology, business, and digital careers.

          Our platform provides high-quality courses,
          interactive learning experiences, progress tracking,
          and career-focused education for students across India.

        </p>

        {/* MISSION */}

        <div className="mt-20 bg-white p-10 rounded-3xl shadow-sm">

          <h2 className="text-4xl font-bold text-slate-800 mb-6">

            Our Mission

          </h2>

          <p className="text-lg text-slate-600 leading-9">

            Our mission is to make professional digital education
            affordable, practical, and accessible for everyone.

            We aim to help students gain industry-ready skills
            through real projects and modern technologies.

          </p>

        </div>

        {/* VISION */}

        <div className="mt-12 bg-white p-10 rounded-3xl shadow-sm">

          <h2 className="text-4xl font-bold text-slate-800 mb-6">

            Our Vision

          </h2>

          <p className="text-lg text-slate-600 leading-9">

            We envision DIZITAL ADDA as a leading digital learning
            ecosystem where students can learn, grow, and launch
            successful careers in the tech industry.

          </p>

        </div>

        {/* COURSES */}

        <div className="mt-12 bg-white p-10 rounded-3xl shadow-sm">

          <h2 className="text-4xl font-bold text-slate-800 mb-8">

            What We Teach

          </h2>

          <div className="grid grid-cols-2 gap-6 text-lg">

            <div className="bg-slate-100 p-6 rounded-2xl">
              Web Development
            </div>

            <div className="bg-slate-100 p-6 rounded-2xl">
              Data Science
            </div>

            <div className="bg-slate-100 p-6 rounded-2xl">
              Graphic Designing
            </div>

            <div className="bg-slate-100 p-6 rounded-2xl">
              Digital Marketing
            </div>

          </div>

        </div>

      </div>

      </div>

      {/* FOOTER */}
      <Footer />
    </div>

  );

}

export default About;
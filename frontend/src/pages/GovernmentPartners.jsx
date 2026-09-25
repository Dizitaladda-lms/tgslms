import React from "react";
import Footer from "../components/Footer";

const states = [

  {
    name: "Andhra Pradesh",
    website: "https://www.ap.gov.in",
  },

  {
    name: "Arunachal Pradesh",
    website: "https://arunachalpradesh.gov.in",
  },

  {
    name: "Assam",
    website: "https://assam.gov.in",
  },

  {
    name: "Bihar",
    website: "https://state.bihar.gov.in",
  },

  {
    name: "Chhattisgarh",
    website: "https://cgstate.gov.in",
  },

  {
    name: "Goa",
    website: "https://goa.gov.in",
  },

  {
    name: "Gujarat",
    website: "https://gujaratindia.gov.in",
  },

  {
    name: "Haryana",
    website: "https://haryana.gov.in",
  },

  {
    name: "Himachal Pradesh",
    website: "https://himachal.nic.in",
  },

  {
    name: "Jharkhand",
    website: "https://jharkhand.gov.in",
  },

  {
    name: "Karnataka",
    website: "https://karnataka.gov.in",
  },

  {
    name: "Kerala",
    website: "https://kerala.gov.in",
  },

  {
    name: "Madhya Pradesh",
    website: "https://mp.gov.in",
  },

  {
    name: "Maharashtra",
    website: "https://maharashtra.gov.in",
  },

  {
    name: "Manipur",
    website: "https://manipur.gov.in",
  },

  {
    name: "Meghalaya",
    website: "https://meghalaya.gov.in",
  },

  {
    name: "Mizoram",
    website: "https://mizoram.gov.in",
  },

  {
    name: "Nagaland",
    website: "https://nagaland.gov.in",
  },

  {
    name: "Odisha",
    website: "https://odisha.gov.in",
  },

  {
    name: "Punjab",
    website: "https://punjab.gov.in",
  },

  {
    name: "Rajasthan",
    website: "https://rajasthan.gov.in",
  },

  {
    name: "Sikkim",
    website: "https://sikkim.gov.in",
  },

  {
    name: "Tamil Nadu",
    website: "https://www.tn.gov.in",
  },

  {
    name: "Telangana",
    website: "https://telangana.gov.in",
  },

  {
    name: "Tripura",
    website: "https://tripura.gov.in",
  },

  {
    name: "Uttar Pradesh",
    website: "https://up.gov.in",
  },

  {
    name: "Uttarakhand",
    website: "https://uk.gov.in",
  },

  {
    name: "West Bengal",
    website: "https://wb.gov.in",
  },

  // UNION TERRITORIES

  {
    name: "Andaman and Nicobar Islands",
    website: "https://andaman.gov.in",
  },

  {
    name: "Chandigarh",
    website: "https://chandigarh.gov.in",
  },

  {
    name: "Dadra and Nagar Haveli and Daman and Diu",
    website: "https://ddd.gov.in",
  },

  {
    name: "Delhi",
    website: "https://delhi.gov.in",
  },

  {
    name: "Jammu and Kashmir",
    website: "https://jk.gov.in",
  },

  {
    name: "Ladakh",
    website: "https://ladakh.nic.in",
  },

  {
    name: "Lakshadweep",
    website: "https://lakshadweep.gov.in",
  },

  {
    name: "Puducherry",
    website: "https://py.gov.in",
  },

];
function GovernmentPartners() {

  return (

    <div className="min-h-screen bg-[#0B1220] text-white px-6 py-16">

      <div className="max-w-7xl mx-auto">

        <h1
          className="
          text-5xl
          md:text-7xl
          font-black
          text-center
          text-orange-300
          "
        >

          GOVERNMENT PARTNERS

        </h1>

        <p
          className="
          text-center
          text-xl
          text-gray-300
          mt-6
          "
        >

          Official Government Portals Of India

        </p>

        {/* STATES GRID */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
          mt-16
          "
        >

          {states.map((state, index) => (

            <a
              key={index}
              href={state.website}
              target="_blank"
              rel="noreferrer"
              className="
              bg-[#111827]
              border
              border-orange-400/20
              rounded-3xl
              p-8
              hover:bg-[#7C2D12]
              transition
              shadow-xl
              "
            >

              <h2 className="text-3xl font-bold">

                {state.name}

              </h2>

              <p className="mt-4 text-orange-200">

                Visit Official Website →

              </p>

            </a>

          ))}

        </div>

      </div>

      {/* FOOTER */}
      <Footer />
    </div>

  );

}

export default GovernmentPartners;
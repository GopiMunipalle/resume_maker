import React from "react";
import Header from "../../components/Header";
import { helpPage } from "../../constants/commontext";

const HelpPage = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-200 to-pink-200 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          {helpPage.title}
        </h1>

        <div className="space-y-12">
          <section className="bg-white shadow-lg rounded-lg p-8 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{helpPage.sectionHeading1}</h2>
            <p className="text-gray-600 leading-relaxed">
              {helpPage.sectionContent1}
            </p>
          </section>

          <section className="bg-white shadow-lg rounded-lg p-8 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{helpPage.sectionHeading2}</h2>
            <p className="text-gray-600 leading-relaxed">
              {helpPage.sectionContent2}
            </p>
          </section>

          <section className="bg-white shadow-lg rounded-lg p-8 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{helpPage.sectionHeading3}</h2>
            <p className="text-gray-600 leading-relaxed">
              {helpPage.sectionContent3}
            </p>
          </section>

          <section className="bg-white shadow-lg rounded-lg p-8 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{helpPage.sectionHeading4}</h2>
            <p className="text-gray-600 leading-relaxed">
              {helpPage.sectionContent4}
            </p>
          </section>

          <section className="bg-white shadow-lg rounded-lg p-8 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{helpPage.sectionHeading5}</h2>
            <p className="text-gray-600 leading-relaxed">
              {helpPage.sectionContent5}
            </p>
          </section>

          <section className="bg-white shadow-lg rounded-lg p-8 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{helpPage.sectionHeading6}</h2>
            <p className="text-gray-600 leading-relaxed">
              {helpPage.sectionContent6}
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-800 mb-4">Need help building your perfect resume?</p>
          <a
            href="mailto:gopikrishmunipalli@gmail.com" 
            className="inline-block bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-3 px-6 rounded-lg text-xl hover:from-teal-500 hover:to-cyan-600 transition-colors duration-300"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default HelpPage;

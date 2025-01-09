import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Header from "../../components/Header";
import { useState } from "react";

export default function Home() {
  const user = useSelector((state: RootState) => state.auth);

  // return (
  //   <div>
  //     <h1>Home</h1>
  //   </div>
  // );

  // Example of key features as a separate component
  const KeyFeatures = () => (
    <div className="key-features py-10 bg-gray-50">
      <h2 className="text-3xl font-semibold text-center mb-6">Key Features</h2>
      <ul className="max-w-3xl mx-auto text-lg space-y-4">
        <li className="flex items-start space-x-3">
          <span className="font-bold text-blue-600">
            Customizable Templates:
          </span>
          <span>Choose from a variety of professional templates.</span>
        </li>
        <li className="flex items-start space-x-3">
          <span className="font-bold text-blue-600">Easy Editing:</span>
          <span>
            Quickly add and edit your information with an intuitive interface.
          </span>
        </li>
        <li className="flex items-start space-x-3">
          <span className="font-bold text-blue-600">Download & Share:</span>
          <span>
            Download your resume in multiple formats or share it directly with
            employers.
          </span>
        </li>
      </ul>
    </div>
  );

  // Example of popular templates section
  const PopularTemplates = () => (
    <div className="popular-templates py-10">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Popular Resume Templates
      </h2>
      <div className="template-gallery flex justify-center gap-8">
        <div className="template w-64 p-4 border rounded-lg shadow-lg">
          <img
            src="template1.jpg"
            alt="Template 1"
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <p className="text-center">Modern Style</p>
        </div>
        <div className="template w-64 p-4 border rounded-lg shadow-lg">
          <img
            src="template2.jpg"
            alt="Template 2"
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <p className="text-center">Minimalist Style</p>
        </div>
        <div className="template w-64 p-4 border rounded-lg shadow-lg">
          <img
            src="template3.jpg"
            alt="Template 3"
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <p className="text-center">Professional Style</p>
        </div>
      </div>
    </div>
  );

  // Example of a user testimonial section
  const Testimonials = () => (
    <div className="testimonials py-10 bg-gray-100">
      <h2 className="text-3xl font-semibold text-center mb-6">
        What Our Users Are Saying
      </h2>
      <div className="max-w-2xl mx-auto text-lg space-y-4">
        <p className="italic text-gray-700">
          "I landed my dream job in just two weeks thanks to this resume
          builder!" - John Doe
        </p>
        <p className="italic text-gray-700">
          "The templates are amazing and easy to customize!" - Jane Smith
        </p>
      </div>
    </div>
  );

  const handleStartClick = () => {
    // Navigate to Templates section or trigger an action (e.g., using React Router)
    console.log("Starting Resume Creation...");
  };

  return (
    <div className="home">
      <Header />

      <header className="home-header py-20 bg-blue-600 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Your Resume Builder!
        </h1>
        <p className="text-lg mb-8">
          Building a professional resume has never been easier.
        </p>
        <button
          onClick={handleStartClick}
          className="cta-button bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold text-xl hover:bg-blue-100 transition"
        >
          Start Creating Your Resume
        </button>
      </header>

      <KeyFeatures />

      <PopularTemplates />

      <Testimonials />

      <footer className="home-footer py-10 bg-gray-200 text-center">
        <p className="text-lg">
          Need help? Check our{" "}
          <a href="/help" className="text-blue-600 hover:underline">
            Help Section
          </a>
        </p>
      </footer>
    </div>
  );
}

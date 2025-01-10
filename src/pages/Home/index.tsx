import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { images } from "../../assets/images";
import { useState } from "react";
import { homePage } from "../../constants/commontext";
import Footer from "../../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [isMouseEnterTwo, setIsMouseEnterTwo] = useState(false);

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

  const PopularTemplates = () => (
    <div className="popular-templates py-10">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Popular Resume Templates
      </h2>
      <div className="template-gallery flex justify-center gap-8">
        <div className="template w-64 p-4 border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
        onClick={() => navigate("/templates")}
        >
          <img
            src={images.template1}
            alt="Template 1"
            className="w-full h-40 object-cover rounded-md mb-4 hover:scale-105 transition-transform duration-300 ease-in-out "
          />
          <p className="text-center">Modern Style</p>
        </div>
        <div className="template w-64 p-4 border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
        onMouseEnter={() => setIsMouseEnter(true)}
        onMouseLeave={() => setIsMouseEnter(false)}
        >
          <img
            src={images.template2}
            alt="Template 2"
            className="w-full h-40 object-cover rounded-md mb-4 hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <p className="text-center">Minimalist Style</p>
          {isMouseEnter && (
            <p className="text-center text-sm italic text-gray-500">{homePage.paid}</p>
          )}
        </div>
        <div className="template w-64 p-4 border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
        onMouseEnter={() => setIsMouseEnterTwo(true)}
        onMouseLeave={() => setIsMouseEnterTwo(false)}
        >
          <img
            src={images.template3}
            alt="Template 3"
            className="w-full h-40 object-cover rounded-md mb-4 hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <p className="text-center">Professional Style</p>
          {isMouseEnterTwo && (
            <p className="text-center text-sm italic text-gray-500">{homePage.paid}</p>
          )}
        </div>
      </div>
    </div>
  );

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
    navigate("/templates")
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
      <Footer/>
    </div>
  );
}

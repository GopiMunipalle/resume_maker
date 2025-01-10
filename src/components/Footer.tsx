import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-6">
          <p className="text-lg font-semibold">Resume Builder</p>
          <p className="text-sm mt-2">Create stunning resumes with ease</p>
        </div>

        <div className="flex justify-center space-x-8 mb-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600 transition-colors duration-300">
            <i className="fab fa-facebook-f text-xl"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300">
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-700 transition-colors duration-300">
            <i className="fab fa-linkedin-in text-xl"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-600 transition-colors duration-300">
            <i className="fab fa-instagram text-xl"></i>
          </a>
        </div>

        <div className="text-sm">
          <p>&copy; 2025 Resume Builder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

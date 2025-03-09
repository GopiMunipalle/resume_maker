import { Link } from "react-router-dom";
import notfound from "../assets/svg/not-found.svg";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <img
          src={notfound}
          alt="Page not found illustration"
          className="w-64 h-64 mx-auto mb-8"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors inline-block"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

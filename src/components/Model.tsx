import { useState } from "react";

export default function Model({
  content,
  isModelOpen,
}: {
  content: { name: string; name2: string };
  isModelOpen: (value: boolean) => void;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordSubmit = () => {
    try {
      if (password !== confirmPassword) {
        setError("Password do not match");
        return;
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 fixed top-0 left-0 z-50">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <button
          onClick={() => isModelOpen(false)}
          className="text-xl font-semibold text-gray-500 hover:text-gray-700 "
        >
          X
        </button>
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
          {content.name}
        </h1>
        <p className="text-center text-gray-500 mb-6">{content.name2}</p>

        <div className="mb-4">
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        <div className="mb-6">
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        </div>
        {error && (
          <div className="text-red-500 text-center mb-4">
            <p>{error}</p>
          </div>
        )}
        <button
          onClick={handlePasswordSubmit}
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { loginPage } from "../../constants/commontext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { loginUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authservices";

function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  // Handle login request (send OTP)
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      setError("Email is required");
      return;
    }
    const result = await register({ email });
    console.log(result.data, "res");
    if (result.status === 200) {
      setOtpSent(true);
    } else {
      setError(result.data.message.message);
    }
    setLoading(false);
  }

  // Handle OTP verification
  async function handleOtpVerification(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const result = await dispatch(loginUser({ email }));
    if (result.payload.token) {
      // navigate("/home", { replace: false });
    } else {
      setError("Invalid OTP");
    }
    setLoading(false);
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-green-100">
      <form
        className="bg-white flex flex-col p-10 border border-gray-200 rounded sm:w-3/5 md:w-3/5 lg:w-1/3"
        onSubmit={otpSent ? handleOtpVerification : handleLogin}
      >
        <h1 className="text-black text-3xl font-bold">{loginPage.title}</h1>
        <p className="text-xl text-gray-500 font-light">{loginPage.subtitle}</p>

        <label className="mt-5 text-gray-600 font-semibold text-md self-start">
          {loginPage.email}
          <span style={{ color: "red" }}>*</span>
        </label>
        <input
          className="border border-gray-200 p-2 rounded focus:outline-none bg-white text-black h-12"
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={handleEmailChange}
          disabled={otpSent} // Disable email input once OTP is sent
        />

        {otpSent && (
          <>
            <label className="mt-5 text-gray-600 font-semibold text-md self-start">
              Enter OTP
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="border border-gray-200 p-2 rounded focus:outline-none bg-white text-black h-12"
              type="text"
              name="otp"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </>
        )}

        {error && <div className="text-red-700 text-md mt-5">{error}</div>}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mt-5 hover:bg-green-600 outline-none focus:outline-none focus:border-lime-400"
          disabled={loading}
        >
          {otpSent ? "Verify OTP" : loginPage.button}
        </button>
      </form>
    </div>
  );
}

export default Login;

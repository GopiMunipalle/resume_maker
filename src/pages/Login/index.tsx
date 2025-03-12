import React, { useState } from "react";
import { loginPage } from "../../constants/commontext";
import { useNavigate } from "react-router-dom";
import { register, login } from "../../services/authservices";
import { ThreeDots } from "react-loader-spinner";
import Cookie from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      setError("Email is required");
      setLoading(false);
      return;
    }
    const { data } = await register({ email });
    if (data.token) {
      Cookie.set("token", data.token, { expires: 1 });
      navigate("/home");
    }
    if (data.status === 200) {
      setOtpSent(true);
    } else {
      setError(data.error || "Something went wrong");
    }
    setLoading(false);
  }

  async function handleOtpVerification(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { data } = await login({ email, otp });
    if (data.data.token) {
      Cookie.set("token", data.data.token, { expires: 1 });
      navigate("/home", { replace: true });
    } else {
      setError(data.error || "Invalid OTP");
    }
    setLoading(false);
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-red">
        <ThreeDots color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

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
          disabled={otpSent}
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
        <button className="bg-blue-500 text-white py-2 px-4 rounded mt-5 hover:bg-green-600 outline-none focus:outline-none focus:border-lime-400">
          {otpSent ? "Verify OTP" : loginPage.button}
        </button>
      </form>
    </div>
  );
}

export default Login;

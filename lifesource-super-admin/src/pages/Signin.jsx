import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Lock, Rocket } from "lucide-react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Logo from "../assets/logo.svg";

const Signin = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { handleSubmit } = useForm();

  const initialValues = {
    email: "",
    password: "",
  };

  const [loginDetails, setLoginDetails] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = loginDetails;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const onSubmit = async () => {
    setLoading(true);
    const success = await login(loginDetails.email, loginDetails.password);
    setLoading(false);
    if (success) navigate("/home");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="min-h-[100vh] bg-[#F5F7FA] flex items-center justify-center p-6 font-work">
        <div
          id="signup-container"
          className="bg-white rounded-2xl shadow-xl w-full max-w-[500px] p-8 relative overflow-hidden shadow-[#F22D2D]/10"
        >
          {/* Decorative Elements */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#F22D2D] rounded-full opacity-10"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#F22D2D] rounded-full opacity-10"></div>

          {/* Header */}
          <div id="signup-header" className="text-center mb-8">
            <img
              src={Logo}
              alt="Welcome"
              className="w-[100px] h-[100px] rounded-full mx-auto"
            />
            <h1 className="text-2xl font-semibold text-[#0A1F44]">
              LifeSource Super Admin Login
            </h1>
          </div>

          {/* Signup Form */}
          <form
            id="signup-form"
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#0A1F44]">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-[#008080] focus:ring-2 focus:ring-[#008080] focus:ring-opacity-20 outline-none transition"
                  placeholder="Enter your email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#0A1F44]">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-[#008080] focus:ring-2 focus:ring-[#008080] focus:ring-opacity-20 outline-none transition"
                  placeholder="Enter your password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute top-0 inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-sm leading-5 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <IoIosEye size={25} />
                  ) : (
                    <IoIosEyeOff size={25} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-[#D32F2F] hover:bg-[#D32F2F]/50 text-lg font-semibold text-white py-3 rounded-full transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Signin"
              )}
            </button>
            {/* {errorMessage && (
              <div className="bg-red-500 text-white text-sm font-primaryMedium p-4 mt-4 text-center">
                {errorMessage}
              </div>
            )} */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;

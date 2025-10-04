import React, { useState } from "react";
import assets from "../assets/assets"; // adjust the path


const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");

  return (
    <div
      className="
        min-h-screen 
        bg-cover 
        bg-center 
        flex 
        items-center 
        justify-center 
        gap-8 
        px-8
        max-sm:flex-col
        backdrop-blur-2xl
      "
    >
      {/* Left side - Logo */}
      <img src={assets.logo_big} alt="Logo" className="" />

      {/* Right side - Form */}
      <form
        className="
          border-2 
          bg-white/10 
          text-white
          border-gray-500 
          p-6 
          flex 
          flex-col 
          gap-6 
          rounded-lg 
          shadow-lg
        "
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          <img
            src={assets.arrow_icon}
            alt="Arrow"
            className="w-5 cursor-pointer"
          />
        </h2>

        {/* Example input */}
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded-md text-black outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded-md text-black outline-none"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 rounded-md py-2 text-white font-medium transition-colors duration-200"
        >
          {currState}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;


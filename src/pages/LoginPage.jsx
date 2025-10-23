import React, { useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDatasubmitted] = useState(false);

const {login} = useContext(AuthContext);

  const onSubmitHandler = (event) =>{
    event.preventDefault()
    if(currState==="Sign up"&& !isDataSubmitted){
      setIsDatasubmitted(true);
      return;
    }
    login(currState=="Sign up" ? {fullName, email, password, bio} : {email, password});
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Logo */}
      <div
        className="w-1/2 flex items-center justify-center bg-black"
        style={{
          backgroundImage: `url(${assets.logo_big})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Right side - Form */}
      <div className="w-1/2 flex items-center justify-center bg-black">
        <form onSubmit={onSubmitHandler}
         className="bg-white/10 text-white p-8 flex flex-col gap-6 rounded-2xl shadow-lg min-w-[300px] max-w-[350px]">

          {/* Sign Up Bar */}
          <div className="flex justify-between items-center  rounded-full px-4 py-2">
            <h2 className="font-semibold text-xl">{currState}
              {isDataSubmitted &&   <img onClick={() => setIsDatasubmitted(false)}
              src={assets.arrow_icon}
              alt="Arrow"
              className="w-5 cursor-pointer"
            />}
            </h2>
          
          </div>

          {/* Conditional Input Fields */}
          {currState === "Sign up" && !isDataSubmitted && (
            <input
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              type="text"
              placeholder="Full Name"
              className="p-3 rounded-md text-white outline-none bg-gray-800"
            />
          )}
          {!isDataSubmitted && (
            <>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email" required
                className="p-3 rounded-md text-white outline-none bg-gray-800"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password" required
                className="p-3 rounded-md text-white outline-none bg-gray-800"
              />
            </>
          )}
          {
            currState === "Sign up" && isDataSubmitted && (
              <textarea onChange={(e) =>setBio(e.target.value) }
              value={bio} 
              rows={4} className="p-3 rounded-md text-white outline-none bg-gray-800"
                placeholder="Provide a short bio" required></textarea>
            )


          }

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 rounded-full py-2 text-white font-medium transition-colors duration-200"
          >
            {currState==="Sign up" ? "Create Account": "Login Now"}
          </button>
          <div>

            <input className="w-5 h-5 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-2 focus:ring-purple-500"
             type="checkbox" required/>
            <p>Agree to terms of use & privacy policy</p>
          </div>
          <div className="flex flex-col gap-2">
            {currState==="Sign up" ? (
              <p 
              className="text-sm text-gray-600">
                Already have an acount ? <span 
                onClick={() =>{
                setCurrState("Login");
                setIsDatasubmitted(false)
              }}
                className="font-medium text-violet-500 cursor-pointer">Login here</span>
              </p>
            ):(
              <p className="text-sm text-gray-600">
              Create an account <span
              onClick={() =>{
                setCurrState("Sign up");
                setIsDatasubmitted(false)
              }}
              className="font-medium text-violet-500 cursor-pointer">
                Click here
              </span>
              </p>
            ) }

          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

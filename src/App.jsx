import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import {Toaster} from 'react-hot-toast';
import { AuthContext } from "../context/AuthContext";
const App = () => {
  const {authUser}=useContext(AuthContext);
  return (
    <div className="bg-gradient-to-b from-blue-900 to-black min-h-screen">
      <Toaster />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <LoginPage />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <HomePage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <LoginPage />} />

      </Routes>
    </div>
  )
}
export default App
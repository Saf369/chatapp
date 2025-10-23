import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [selectedImage, setProfileImage] = useState();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("Hi everyone, I am using SafChat!");

  // Handle profile image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // Handle save (you can later integrate backend here)
  const handleSave = (e) => {
    e.preventDefault();
    alert("✅ Profile updated successfully!");
  };

  return (
    <div className="bg-gradient-to-b from-blue-900 to-black min-h-screen flex justify-center items-center px-4 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20 transition"
      >
        ← Back
      </button>

      {/* Blurred Profile Container */}
      <div className="w-5/6 max-w-2xl backdrop-blur-xl bg-white/10 text-gray-300 border border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Left Side - Profile Form */}
        <form
          onSubmit={handleSave}
          className="flex flex-col gap-5 p-10 flex-1 w-full"
        >
          <h3 className="text-2xl font-semibold text-white mb-2">
            Edit Profile
          </h3>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-md bg-gray-800 text-white outline-none border border-gray-700 focus:border-purple-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-md bg-gray-800 text-white outline-none border border-gray-700 focus:border-purple-500"
          />
          <textarea
            placeholder="Short Bio"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="p-3 rounded-md bg-gray-800 text-white outline-none border border-gray-700 focus:border-purple-500"
          ></textarea>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 rounded-full py-2 font-medium text-white transition-colors duration-200"
          >
            Save Changes
          </button>
        </form>

        {/* Right Side - Profile Image */}
        <div className="flex flex-col items-center justify-center p-8 flex-1 relative">
          <div className="relative group">
            <img
              src={selectedImage? URL.createObjectURL(selectedImage): assets.avatar_icon}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-purple-600 shadow-lg mb-4 object-cover"
            />

            {/* Upload Overlay (appears on hover) */}
            <label
              htmlFor="profile-upload"
              className="absolute inset-0 bg-black/50 text-white flex items-center justify-center text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            >
              Change
            </label>

            {/* Hidden File Input */}
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <h2 className="text-xl font-semibold text-white mt-2">{name}</h2>
          <p className="text-gray-400 text-sm text-center">{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;


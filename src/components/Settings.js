
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Settings({ showSidebar, setShowSidebar }) {

    const url = process.env.REACT_APP_API_URL;



  const { user, setUser, login, signup, logout } = useContext(AuthContext);

  // Form states
  const [isLogin, setIsLogin] = useState(true); // toggle between login/signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);

  // Load user info into edit form
  useEffect(() => {
    if (user) {
      setName(user.name);
      setProfileImage(user.profileImage || "");
      setNotificationsEnabled(user.notificationsEnabled ?? true);
      setIsPrivate(user.isPrivate ?? false);
    }
  }, [user]);

  const handleLogin = async () => {
    if (!email || !password) return alert("Enter email and password!");
    try {
      await login(email, password);
      setShowSidebar(false);
    } catch {
      alert("Login failed. Check credentials.");
    }
  };

  const handleSignup = async () => {
    if (!name || !email || !password) return alert("Enter all fields!");
    try {
      await signup(name, email, password);
      alert("Signup successful! You can now login.");
      setIsLogin(true);
      setName("");
      setEmail("");
      setPassword("");
    } catch {
      alert("Signup failed. Try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  };

const handleProfileSave = async () => {
  if (!name) return alert("Name cannot be empty!");

  try {
    const token = localStorage.getItem("token");

    // Send name and profileImage to backend
    const res = await axios.put(
      `${url}/auth/profile`,
      { name, profileImage }, // profileImage should be Base64 string or URL
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Update user state so UI reflects changes
    setUser((prevUser) => ({
      ...prevUser,
      name: res.data.user.name,
      profileImage: res.data.user.profileImage,
    }));

    setEditing(false);
    alert("Profile updated successfully!");
  } catch (err) {
    console.error("Failed to update profile:", err);
    alert("Failed to update profile.");
  }
};


  const handleNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
       `${url}/auth/notifications`,
        { notificationsEnabled: !notificationsEnabled },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotificationsEnabled(res.data.user.notificationsEnabled);
      alert("Notifications updated!");
    } catch (err) {
      console.error(err);
    }
  };

  const handlePrivacy = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
       `${url}/auth/privacy`,
        { isPrivate: !isPrivate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsPrivate(res.data.user.isPrivate);
      alert("Privacy settings updated!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 sm:w-96 transform transition-transform duration-300 z-50 overflow-y-auto
      bg-black/20 backdrop-blur-lg border border-white/30 rounded-l-xl shadow-lg
      ${showSidebar ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Close Button */}
      <button
        onClick={() => setShowSidebar(false)}
        className="absolute top-4 left-4 bg-white/30 backdrop-blur-sm text-black px-3 py-1 rounded hover:bg-white/40 transition"
      >
        Close
      </button>

      <div className="p-6 mt-12 text-white">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>

        {!user ? (
          <div className="space-y-4">
            {/* Toggle Login / Signup */}
            <div className="flex justify-center gap-4 mb-4">
              <button
                className={`px-4 py-2 rounded-lg ${
                  isLogin ? "bg-blue-600 text-white" : "bg-white/20 text-white"
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  !isLogin ? "bg-green-600 text-white" : "bg-white/20 text-white"
                }`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>

            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                className="w-full px-3 py-2 rounded bg-white/10 backdrop-blur-sm text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 rounded bg-white/10 backdrop-blur-sm text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 rounded bg-white/10 backdrop-blur-sm text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={isLogin ? handleLogin : handleSignup}
              className={`w-full py-2 px-4 ${
                isLogin
                  ? "bg-blue-600 bg-opacity-70 hover:bg-blue-700"
                  : "bg-green-600 bg-opacity-70 hover:bg-green-700"
              } text-white rounded-lg shadow transition`}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
        ) : (
          <>
            {/* Profile Section */}
            <div className="mb-6 bg-white/10 backdrop-blur-sm shadow-md rounded-lg p-4 flex flex-col items-center">
              {editing ? (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-3 text-black"
                  />
                  {profileImage && (
                    <img
                      src={profileImage}
                      alt="Profile Preview"
                      className="w-24 h-24 rounded-full mb-3 object-cover"
                    />
                  )}
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-white/10 text-white mb-3"
                  />
                  <button
                    onClick={handleProfileSave}
                    className="py-2 px-4 bg-yellow-500 bg-opacity-80 text-white rounded-lg shadow hover:bg-yellow-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="mt-2 py-1 px-3 bg-gray-700 bg-opacity-70 text-white rounded hover:bg-gray-800 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <img
                    src={user.profileImage || "https://via.placeholder.com/80"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mb-3 object-cover"
                  />
                  <p className="text-white/90 font-semibold">{user.name}</p>
                  <p className="text-white/80">{user.email}</p>
                  <button
                    onClick={() => setEditing(true)}
                    className="mt-3 py-2 px-4 bg-yellow-500 bg-opacity-80 text-white rounded-lg shadow hover:bg-yellow-600 transition"
                  >
                    Edit Profile
                  </button>
                </>
              )}
            </div>

            {/* Notifications */}
            <div className="mb-6 bg-white/20 backdrop-blur-sm shadow-md rounded-lg p-4">
              <h3 className="font-semibold text-white">Notifications</h3>
              <button
                onClick={handleNotifications}
                className="mt-3 py-2 px-4 bg-indigo-500 bg-opacity-80 text-white rounded-lg shadow hover:bg-indigo-600 transition"
              >
                {notificationsEnabled ? "Disable Notifications" : "Enable Notifications"}
              </button>
            </div>

            {/* Privacy */}
            <div className="mb-6 bg-white/20 backdrop-blur-sm shadow-md rounded-lg p-4">
              <h3 className="font-semibold text-white">Privacy</h3>
              <button
                onClick={handlePrivacy}
                className="mt-3 py-2 px-4 bg-red-500 bg-opacity-80 text-white rounded-lg shadow hover:bg-red-600 transition"
              >
                {isPrivate ? "Make Profile Public" : "Make Profile Private"}
              </button>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="w-full mt-6 py-2 px-4 bg-gray-800 bg-opacity-80 text-white rounded-lg shadow hover:bg-gray-900 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// profile.js i have already this:  import React, { useState } from "react"; 

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    photo: "https://via.placeholder.com/60"
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes for name/email
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile({ ...profile, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 bg-white/20 rounded shadow hover:shadow-lg transition flex items-center gap-4">

      {/* Profile Photo */}
      <div className="relative">
        <img
          src={profile.photo}
          alt="Profile"
          className="rounded-full border-2 border-white shadow-lg w-16 h-16 object-cover"
        />
        {isEditing && (
          <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700 transition">
            📷
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          </label>
        )}
      </div>

      {/* Name & Email appear only in edit mode */}
      {isEditing && (
        <div className="flex-1 flex flex-col gap-1">
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Edit / Save Button */}
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition shadow-lg"
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default ProfileSettings;

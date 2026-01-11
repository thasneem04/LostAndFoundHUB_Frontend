import React, { useState } from "react";
import axios from "axios";

const ReportFound = () => {
  const url = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    image: null,
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("location", formData.location);
      if (formData.image) data.append("image", formData.image);
      const token = localStorage.getItem("token");

      const response = await axios.post(`${url}/items/items`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStatus(response.data.message);
      setFormData({ name: "", description: "", location: "", image: null });
    } catch (err) {
      console.error(err);
      setStatus("Failed to submit. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url(/path-to-hero-bg.jpg)" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Report Found Item
        </h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Item Name"
          required
          className="w-full px-4 py-2 mb-4 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full px-4 py-2 mb-4 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none"
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="w-full px-4 py-2 mb-4 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none"
        />

        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          className="w-full mb-6 text-white"
        />

        <button
          type="submit"
          className="w-full py-3 bg-green-800 hover:bg-green-700 text-white font-bold rounded-full transition-all duration-300"
        >
          Submit
        </button>

        {status && <p className="mt-4 text-center text-white">{status}</p>}
      </form>
    </div>
  );
};

export default ReportFound;

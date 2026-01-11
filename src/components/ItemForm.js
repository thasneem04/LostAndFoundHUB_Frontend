import React, { useState } from "react";
import axios from "axios";

const ItemForm = ({ defaultStatus = "lost" }) => {
    const url = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    contact: "",
    status: defaultStatus,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/items`, formData);
      alert("Item added successfully!");
      console.log(res.data);
      setFormData({ name: "", description: "", contact: "", status: defaultStatus });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error adding item");
    }
  };

  return (

    
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded shadow-md w-96 "
    >
      <h2 className="text-xl font-bold mb-4">
        {formData.status === "lost" ? "Report Lost Item" : "Report Found Item"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Item name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded bg-transparent"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded bg-transparent"
        required
      />

      <input
        type="text"
        name="contact"
        placeholder="Contact (Phone/Email)"
        value={formData.contact}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded bg-transparent"
        required
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded bg-transparent "
      >
        <option value="lost"  className="text-black">Lost</option>
        <option value="found" className="text-black">Found</option>
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 "
      >
        Submit
      </button>
    </form>
    
  );
};

export default ItemForm;

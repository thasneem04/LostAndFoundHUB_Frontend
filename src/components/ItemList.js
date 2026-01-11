import React, { useEffect, useState } from "react";
import axios from "axios";

const LostItemsList = () => {
  const [items, setItems] = useState([]);
  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${url}/items`);
        // filter only lost items
        setItems(res.data.filter((item) => item.status === "lost"));
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-r from-yellow-900 via-orange-200 to-amber-900">
      <div className="text-white text-base leading-relaxed px-8 py-6 rounded-xl bg-black/70 backdrop-blur-sm 
        border border-white/20 shadow-md mt-6 w-[600px]">
        <h2 className="text-xl font-bold mb-4">Lost Items</h2>
        {items.length === 0 ? (
          <p>No lost items found.</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item._id} className="border p-2 rounded shadow-sm">
                <h3 className="font-semibold">{item.name}</h3>
                <p>{item.description}</p>
                <p className="text-sm text-white/80">Contact: {item.contact}</p>
                <p className="text-xs text-gray-500">
                  Date: {new Date(item.date).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LostItemsList;

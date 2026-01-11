import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-6 left-6 z-50">
      {/* Hamburger Icon */}
      <div
        className="w-8 h-6 flex flex-col justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`block h-1 w-full bg-white rounded transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block h-1 w-full bg-white rounded transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`block h-1 w-full bg-white rounded transition-transform duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </div>

      {/* Slide Menu */}
      <div
        className={`absolute top-12 left-0 w-48 bg-black/80 backdrop-blur-lg rounded-r-lg shadow-lg flex flex-col gap-4 p-4 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-56 opacity-0"
        }`}
      >
        <Link
          to="/lost-items"
          className="text-white font-semibold hover:text-yellow-400"
          onClick={() => setIsOpen(false)}
        >
          Lost Items
        </Link>
        <Link
          to="/found-items"
          className="text-white font-semibold hover:text-green-900"
          onClick={() => setIsOpen(false)}
        >
          Found Items
        </Link>
        
      </div>
    </div>
  );
};

export default NavMenu;

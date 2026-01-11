//Hero.js
import React, { useState } from "react";
import heroBg from "../assets/hero-bg.jpg";
import ItemForm from "./ItemForm";
import "./Hero.css";
import NavMenu from "./NavMenu";

const Hero = () => {
  const [isLostOpen, setLostOpen] = useState(false);
  const [isFoundOpen, setFoundOpen] = useState(false);

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex flex-col justify-start"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <NavMenu /> {/* Hamburger menu now top-left */}

      {/* Title */}
      <h1 className="absolute top-8 sm:top-12 md:top-16 w-full text-center font-extrabold 
        text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-6xl title-3d tracking-wider">
        {"Lost & Found Hub".split("").map((letter, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.2}s` }}>
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </h1>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full 
        pt-40 sm:pt-48 md:pt-56 px-4">
        
        <p className="text-white text-base font-bold sm:text-lg md:text-xl max-w-xl mx-auto mb-14
          leading-relaxed px-8 py-6 rounded-xl bg-black/30 backdrop-blur-sm 
          border border-white/40 shadow-md">
          Track lost items quickly and securely. 
          Notify the community when you find something valuable.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center w-full">
          {/* Report Lost Item */}
          <button
            onClick={() => setLostOpen(true)}
            className="relative inline-block px-8 py-3 font-bold text-black rounded-full 
            bg-gradient-to-r from-yellow-900 via-orange-200 to-amber-900 
            shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl w-full md:w-auto mb-7"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-900 via-orange-200 to-amber-900 
              opacity-30 rounded-full blur-xl animate-pulse"></span>
            <span className="relative">Report Lost Item</span>
          </button>

          {/* Report Found Item */}
          <button
            onClick={() => setFoundOpen(true)}
            className="relative inline-block px-8 py-3 font-bold text-black rounded-full 
            bg-gradient-to-r from-green-900 via-emerald-200 to-lime-900
            shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl w-full md:w-auto mb-7"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-green-900 via-emerald-200 to-lime-900 
              opacity-30 rounded-full blur-xl animate-pulse"></span>
            <span className="relative">Report Found Item</span>
          </button>
        </div>
      </div>

      {/* Modal for Lost */}
      {isLostOpen && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
          <div className="relative text-white text-base font-bold sm:text-lg md:text-xl max-w-xl mx-auto mb-14
          leading-relaxed px-8 py-6 rounded-xl bg-black/55 backdrop-blur-sm 
          border border-white/20 shadow-md p-6 rounded-lg shadow-lg">
            <button
              onClick={() => setLostOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✖
            </button>
            <ItemForm />
          </div>
        </div>
      )}

      {/* Modal for Found */}
      {isFoundOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative text-white text-base font-bold sm:text-lg md:text-xl max-w-xl mx-auto mb-14
          leading-relaxed px-8 py-6 rounded-xl bg-black/55 backdrop-blur-sm 
          border border-white/20 shadow-md p-6 rounded-lg shadow-lg">
            <button
              onClick={() => setFoundOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✖
            </button>
            {/* Pass default status as "found" */}
            <ItemForm defaultStatus="found" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;

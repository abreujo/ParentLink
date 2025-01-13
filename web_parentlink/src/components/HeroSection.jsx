// src/components/HeroSection.jsx
import React from "react";
import "../styles/HeroSection.css";
import logo from "../assets/images/logo.png";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="text-container">
        <div className="text-content">
          <h1>Encuentra a tu familia perfecta </h1>
        </div>
      </div>

      <div className="logo-container">
        <img src={logo} alt="Logo Hero" className="hero-logo" />{" "}
      </div>
    </section>
  );
};

export default HeroSection;

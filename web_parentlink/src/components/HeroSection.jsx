// src/components/HeroSection.jsx
import React from "react";
import "../styles/HeroSection.css";
import logo from "../assets/images/logo.png";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="text-container">
        <div className="text-content">
          <h2 className="h2">Encuentra a tu familia perfecta</h2>
          <ul className="hero-list">
            <li>Únete a la experiencia.</li>
            <li>Muchas familias forman parte de Parentlink.</li>
            <li>La web que revolucionará la crianza.</li>
          </ul>
        </div>
      </div>

      <div className="logo-container">
        <img src={logo} alt="Logo Hero" className="hero-logo" />
      </div>
    </section>
  );
};

export default HeroSection;

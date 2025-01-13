// src/pages/HomePage.jsx
import React from "react";
import Menu from "../components/Menu";
import HeroSection from "../components/HeroSection";
import DescriptionSection from "../components/DescriptionSection";
import EventSection from "../components/EventSection";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Menu */}
      <Menu />

      {/* Hero Section */}
      <HeroSection />

      {/* Description Section */}
      <DescriptionSection />

      {/* Event Section */}
      <EventSection />
    </div>
  );
};

export default HomePage;

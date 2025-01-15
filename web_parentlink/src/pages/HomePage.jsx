// src/pages/HomePage.jsx
import React from "react";
import Menu from "../components/Menu";
import HeroSection from "../components/HeroSection";
import DescriptionSection from "../components/DescriptionSection";
import EventSection from "../components/EventSection";
import CarruselSection from "../components/Carrusel";
import PublicidadSection from "../components/Publicidad";
import RegistrationForm  from "../components/RegistrationForm";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Menu */}
      <Menu />
      
    {/* <RegistrationForm */}
      {/* Hero Section */}
      <HeroSection />

      {/* Description Section */}
      <DescriptionSection />

      {/* Event Section */}
      <EventSection />

      {/* carrusel Section */}
      <CarruselSection />

      <PublicidadSection />
    </div>
  );
};

export default HomePage;

import React from "react";
import Menu from "../components/Menu";
import Header from "../components/Header"; // Importa el componente Header
import HeroSection from "../components/HeroSection";
import DescriptionSection from "../components/DescriptionSection";
import EventSection from "../components/EventSection";
import CarruselSection from "../components/Carrusel";
import PublicidadSection from "../components/Publicidad";

const HomePage = () => {
  const backgroundStyle = {
    backgroundImage: "url(/fondoBlanco.jpg)", // Ruta correcta para public/
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    width: "100%",
    height: "100%",
  };

  return (
    <div className="homepage" style={backgroundStyle}>
      {/* Menu */}
      <Menu />
      {/* Header */}
      {/* <Header /> Añadido aquí */}
      {/* Hero Section */}
      <HeroSection />
      {/* Description Section */}
      <DescriptionSection />
      {/* Event Section */}
      <EventSection isHomeLogin={true} eventLimit={5} />
      {/* Carrusel Section */}
      <CarruselSection />
      <PublicidadSection />
    </div>
  );
};

export default HomePage;

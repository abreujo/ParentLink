import React, { useState } from "react";
import "../styles/EventSection.css";
import playaimg from "../assets/images/niñosbarca.jpg";
import plantasimg from "../assets/images/plantandoarboles.jpg";
import senderismoimg from "../assets/images/senderismoniños.avif";

const EventSection = () => {
  const [selectedOption, setSelectedOption] = useState("parent");
  const [selectedTag, setSelectedTag] = useState(""); // Nuevo estado para las tags seleccionadas

  // Maneja el clic en las tags
  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  return (
    <section className="event-section">
      <h2>Encuentra tu evento</h2>
      <div className="filters">
        <button
          className={`filter-button ${
            selectedOption === "parent" ? "selected-parent" : ""
          }`}
          onClick={() => setSelectedOption("parent")}
        >
          Soy madre/padre
        </button>
        <button
          className={`filter-button ${
            selectedOption === "caregiver" ? "selected-caregiver" : ""
          }`}
          onClick={() => setSelectedOption("caregiver")}
        >
          Soy canguro/niñera
        </button>
      </div>
      <div className="tags">
        <button
          className={`tag ${selectedTag === "Ciudad" ? "selected" : ""}`}
          onClick={() => handleTagClick("Ciudad")}
        >
          Ciudad
        </button>
        <button
          className={`tag ${selectedTag === "Edad" ? "selected" : ""}`}
          onClick={() => handleTagClick("Edad")}
        >
          Edad
        </button>
        <button
          className={`tag ${selectedTag === "Hobbys" ? "selected" : ""}`}
          onClick={() => handleTagClick("Hobbys")}
        >
          Hobbys
        </button>
        <button
          className={`tag ${selectedTag === "Gustos" ? "selected" : ""}`}
          onClick={() => handleTagClick("Gustos")}
        >
          Gustos
        </button>
        <button
          className={`tag ${selectedTag === "Más" ? "selected" : ""}`}
          onClick={() => handleTagClick("Más")}
        >
          Más
        </button>
      </div>
      <div className="event-cards-container">
        <div className="event-card">
          <img src={playaimg} alt="Evento 1" />
          <div className="event-description">
            <h3>Jornada en kayak</h3>
            <ul>
              <li>Kayak, remando juntos!</li>
              <li>Para padres y los más pequeños</li>
            </ul>
          </div>
        </div>
        <div className="event-card">
          <img src={plantasimg} alt="Evento 2" />
          <div className="event-description">
            <h3>Jornada en el campo</h3>
            <ul>
              <li>Juegos al aire libre</li>
              <li>Picnic padres/madres</li>
            </ul>
          </div>
        </div>
        <div className="event-card">
          <img src={plantasimg} alt="Evento 2" />
          <div className="event-description">
            <h3>Jornada en el campo</h3>
            <ul>
              <li>Juegos al aire libre</li>
              <li>Picnic padres/madres</li>
            </ul>
          </div>
        </div>
        <div className="event-card">
          <img src={senderismoimg} alt="Evento 3" />
          <div className="event-description">
            <h3>Exploración natural</h3>
            <ul>
              <li>Rutas en la naturaleza</li>
              <li>Actividades para niños</li>
            </ul>
          </div>
        </div>
        {/* Agrega más tarjetas según sea necesario */}
      </div>
    </section>
  );
};

export default EventSection;

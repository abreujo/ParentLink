import React, { useState, useEffect, useRef } from "react";
import "../styles/EventSection.css";
import events from "../data/events.json";

const EventSection = ({ isHomeLogin }) => {
  const [selectedOption, setSelectedOption] = useState("parent");
  const [selectedTag, setSelectedTag] = useState("");
  const [flippedCards, setFlippedCards] = useState({});
  const [activeTag, setActiveTag] = useState(""); // Track which tag is clicked
  const tagRefs = useRef({}); // Refs to detect clicks outside

  // Opciones para cada tag
  const tagOptions = {
    Ubicación: ["Madrid", "Barcelona", "Sevilla", "Valencia"],
    Edad: ["0-3", "4-6", "6-8", "8-10", "10-12", "+12"],
    "Tipo de evento": [
      "Naturaleza",
      "Deporte",
      "Aventura",
      "Fiesta",
      "Convivencia",
    ],
  };

  // Maneja el clic en las tags
  const handleTagClick = (tag) => {
    setActiveTag((prevTag) => (prevTag === tag ? "" : tag)); // Alterna la visibilidad del dropdown
  };

  // Maneja la selección de una opción dentro de un dropdown
  const handleOptionSelect = (tag, option) => {
    setSelectedTag(option); // Selecciona la opción
    setActiveTag(""); // Cierra el dropdown después de la selección
  };

  // Detectar clics fuera de los dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !Object.values(tagRefs.current).some(
          (ref) => ref && ref.contains(e.target)
        )
      ) {
        setActiveTag(""); // Cierra el dropdown si se hace clic fuera
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Maneja el clic en una tarjeta para girarla
  const handleCardClick = (index) => {
    setFlippedCards((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <section className="event-section">
      <h2>{isHomeLogin ? "Eventos" : "Encuentra tu evento"}</h2>
      <div className="filters">
        {isHomeLogin ? (
          <>
            <button
              className={`filter-button ${
                selectedOption === "create" ? "selected-create" : ""
              }`}
              onClick={() => setSelectedOption("create")}
            >
              Crea tu evento
            </button>
            <button
              className={`filter-button ${
                selectedOption === "join" ? "selected-join" : ""
              }`}
              onClick={() => setSelectedOption("join")}
            >
              Únete a un evento
            </button>
          </>
        ) : (
          <>
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
              Quiero ser papá/mamá
            </button>
          </>
        )}
      </div>

      <div className="tags">
        {["Ubicación", "Edad", "Tipo de evento"].map((tag) => (
          <div
            key={tag}
            className="tag-container"
            ref={(el) => (tagRefs.current[tag] = el)}
          >
            <button
              className={`tag ${activeTag === tag ? "selected" : ""}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
            {activeTag === tag && (
              <ul className="dropdown-menu">
                {tagOptions[tag].map((option) => (
                  <li
                    key={option}
                    className="dropdown-option"
                    onClick={() => handleOptionSelect(tag, option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="event-cards-container">
        {events.map((event, index) => (
          <div
            key={index}
            className={`event-card ${flippedCards[index] ? "flipped" : ""}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-inner">
              <div className="card-front">
                <img src={"/" + event.img} alt={event.title} />
                <div className="event-description">
                  <h3>{event.title}</h3>
                  <p>Haga clic para ver más</p>
                </div>
              </div>
              <div className="card-back">
                <h3>{event.title}</h3>
                <ul>
                  {event.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventSection;

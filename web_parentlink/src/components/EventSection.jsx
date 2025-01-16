import React, { useState, useEffect, useRef } from "react";
import "../styles/EventSection.css";
import EventList from "./EventsList";

const EventSection = ({ isHomeLogin }) => {
  const [selectedOption, setSelectedOption] = useState("parent");
  const [selectedTag, setSelectedTag] = useState("");
  const [flippedCards, setFlippedCards] = useState({});
  const [activeTag, setActiveTag] = useState(""); // Controla qué dropdown está activo
  const tagRefs = useRef({}); // Refs para detectar clics fuera de los dropdowns

  // Opciones para los menús desplegables
  const tagOptions = {
    Edad: ["0-3", "4-6", "6-8", "8-10", "10-12", "+12"],
    "Tipo de evento": [
      "Naturaleza",
      "Deporte",
      "Aventura",
      "Fiesta",
      "Cultura",
      "Tecnología",
    ],
    Ubicación: [
      "Madrid",
      "Barcelona",
      "Sevilla",
      "Valencia",
      "Granada",
      "Bilbao",
    ],
  };

  const handleTagClick = (tag) => {
    setActiveTag((prevTag) => (prevTag === tag ? "" : tag));
  };

  const handleOptionSelect = (tag, option) => {
    setSelectedTag(option); // Guarda la opción seleccionada
    setActiveTag(""); // Cierra el dropdown
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !Object.values(tagRefs.current).some(
          (ref) => ref && ref.contains(e.target)
        )
      ) {
        setActiveTag(""); // Cierra cualquier dropdown abierto
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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

        {/* Menús desplegables para filtros */}
        <div className="dropdown-filters">
          {["Edad", "Tipo de evento", "Ubicación"].map((tag) => (
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
        {/* Aquí añadimos el componente Eventlist que renderiza las tarjetas*/}

        <EventList></EventList>
      </div>
    </section>
  );
};

export default EventSection;

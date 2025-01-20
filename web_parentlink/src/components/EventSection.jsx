import React, { useState, useEffect, useRef } from "react";
import "../styles/EventSection.css";

import EventList from "./EventsList";
import events from "../data/events.json";
import CreateEventForm from "./EventCreationForm";

const EventSection = ({ isHomeLogin }) => {
  const [selectedOption, setSelectedOption] = useState("parent");
  const [selectedTag, setSelectedTag] = useState("");
  const [flippedCards, setFlippedCards] = useState({});
  const [activeTag, setActiveTag] = useState(""); // Controla qué dropdown está activo
  const tagRefs = useRef({}); // Refs para detectar clics fuera de los dropdowns

  // Opciones para los menús desplegables
  const [showForm, setShowForm] = useState(false); // Estado para controlar el pop-up del formulario

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

  // Función para alternar la visibilidad del formulario
  const toggleForm = () => {
    setShowForm((prev) => !prev); // Alterna entre true/false
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
            <button className="filter-button" onClick={toggleForm}>
              Crea tu evento
            </button>
          </>
        ) : (
          <>
            <button
              className={`filter-button ${
                selectedOption === "parent" ? "selected" : ""
              }`}
              onClick={() => setSelectedOption("parent")}
            >
              Soy madre/padre
            </button>
            <button
              className={`filter-button ${
                selectedOption === "caregiver" ? "selected" : ""
              }`}
              onClick={() => setSelectedOption("caregiver")}
            >
              Quiero ser papá/mamá
            </button>
          </>
        )}

        {/* Aquí añadimos el componente EventList que renderiza las tarjetas */}
        <EventList />

        {/* Formulario de creación de evento */}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <CreateEventForm />
              <button
                className="close-form-button"
                onClick={() => setShowForm(false)} // Cerrar el formulario
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventSection;

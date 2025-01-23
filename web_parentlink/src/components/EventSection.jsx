import React, { useState, useEffect, useRef } from "react";
import "../styles/EventSection.css";
import Filters from "./FiltersEvent";

import EventList from "./EventsList";
import events from "../data/events.json";
import CreateEventForm from "./EventCreationForm";

const EventSection = ({ isHomeLogin }) => {
  const [selectedOption, setSelectedOption] = useState("parent");
  const [selectedTag, setSelectedTag] = useState("");
  const [flippedCards, setFlippedCards] = useState({});
  const [filters, setFilters] = useState({});

  // Opciones para los menús desplegables
  const [showForm, setShowForm] = useState(false); // Estado para controlar el pop-up del formulario

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

  // Manejar cambios en los filtros
  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <section className="event-section">
      <div className="filters">
        {isHomeLogin ? (
          <>
            <h1 className="h1Events">Eventos destacados</h1>
            <button className="filter-button" onClick={toggleForm}>
              Crea tu evento
            </button>{" "}
          </>
        ) : (
          <></>
        )}
        {/* Pasamos el límite de eventos a EventList */}
        <EventList eventLimit={isHomeLogin ? 4 : undefined} />{" "}
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

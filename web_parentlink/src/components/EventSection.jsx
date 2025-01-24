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

  const handleCreateSubmit = () => {
    setShowForm(false);
  };

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
      <div>
        {isHomeLogin && <h1 className="h1Events">últimos Eventos</h1>}
        <button className="filter-button" onClick={toggleForm}>
          Crea tu evento
        </button>{" "}
        <EventList eventLimit={isHomeLogin ? 4 : undefined} filters={filters} />
      </div>
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CreateEventForm onFormSuccess={handleCreateSubmit} º />
            <button
              className="close-form-button"
              onClick={() => setShowForm(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventSection;

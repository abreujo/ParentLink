import React, { useState, useEffect } from "react";
import "../styles/EventSection.css";
import Filters from "./FiltersEvent";
import EventList from "./EventsList";
import events from "../data/events.json";
import CreateEventForm from "./EventCreationForm";

const EventSection = ({ isHomeLogin, isUserLoggedIn }) => {
  const [selectedOption, setSelectedOption] = useState("parent");
  const [selectedTag, setSelectedTag] = useState("");
  const [flippedCards, setFlippedCards] = useState({});
  const [filters, setFilters] = useState({});
  const [showForm, setShowForm] = useState(false);
  //const { isUserLoggedIn } = useAuth();

  // Estado para controlar si hay eventos creados
  const [hasEvents, setHasEvents] = useState(false);

  // Obtener el token de localStorage para verificar si el usuario está logueado
  isUserLoggedIn = localStorage.getItem("jwtToken") !== null;

  useEffect(() => {
    // Verifica si hay eventos en la fuente de datos
    setHasEvents(events && events.length > 0);
  }, []);

  const handleCreateSubmit = () => {
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  if (!hasEvents) {
    // Si no hay eventos, no muestra nada
    return null;
  }

  return (
    <section className="event-section">
      <div>
        {isHomeLogin && <h1 className="h1Events">Últimos Eventos</h1>}
        {/* El botón solo aparece si estamos en la página de inicio (HomeLogin) y el usuario está logueado */}
        {isHomeLogin && isUserLoggedIn && (
          <button className="filter-button" onClick={toggleForm}>
            Crea tu evento
          </button>
        )}
        <EventList eventLimit={isHomeLogin ? 4 : undefined} filters={filters} />
      </div>
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CreateEventForm onFormSuccess={handleCreateSubmit} />
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

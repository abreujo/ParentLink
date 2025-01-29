import React, { useState, useEffect } from "react";
import "../styles/EventSection.css";
import Filters from "./FiltersEvent";
import EventList from "./EventsList";
import events from "../data/events.json";
import CreateEventForm from "./EventCreationForm";
import ErrorBoundary from "./ErrorBoundary";
import { useAuth } from "../contex/AuthContext";

const EventSection = ({ isHomeLogin, isUserLoggedIn }) => {
  //const [selectedOption, setSelectedOption] = useState("parent");
  //const [selectedTag, setSelectedTag] = useState("");
  //const [flippedCards, setFlippedCards] = useState({});
  const [filters, setFilters] = useState({});
  const [showForm, setShowForm] = useState(false);
  //const { isUserLoggedIn } = useAuth();
  const { idUser } = useAuth();

  //Debuger
  console.log(
    "EventSection isHomeLogin..= " +
      isHomeLogin +
      " isUserLoggedIn..= " +
      isUserLoggedIn +
      "  idUser..=  " +
      idUser
  );

  // Estado para controlar si hay eventos creados
  const [hasEvents, setHasEvents] = useState(false);

  const [refreshEvents, setRefreshEvents] = useState(false);

  const handleEventCreated = () => {
    setRefreshEvents((prev) => !prev); // Cambiar el estado para forzar el refresco
  };

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
    // Si no hay eventos, no muestra eventos pero indica que no hay eventos para mostrar
    <section className="event-section">
      <h2>No hay eventos disponibles en este momento.</h2>
    </section>;
  }

  return (
    <section className="event-section">
      <div>
        {(isHomeLogin || isUserLoggedIn) && (
          <h1 className="h1Events">
            {isHomeLogin ? "Tus Eventos" : "Últimos Eventos"}
          </h1>
        )}
        {/* El botón solo aparece si estamos en HomeLogin y el usuario está logueado */}
        {isHomeLogin && idUser !== undefined && (
          <button className="create-button" onClick={toggleForm}>
            CREA TUS PROPIOS EVENTOS
          </button>
        )}
        {/* SE AGREGA PARA VALIDAR ERRORES DE JAVA SCRIP */}
        <ErrorBoundary>
          <EventList
            eventLimit={isHomeLogin ? undefined : 5}
            filters={filters}
            refresh={refreshEvents}
          />
        </ErrorBoundary>
      </div>
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CreateEventForm onFormSuccess={handleEventCreated} />
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

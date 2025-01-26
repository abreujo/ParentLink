import React, { useState, useEffect } from "react";
import "../styles/EventSection.css";
import Filters from "./FiltersEvent";
import EventList from "./EventsList";
import events from "../data/events.json";
import CreateEventForm from "./EventCreationForm";

const EventSection = ({ isHomeLogin, isUserLoggedIn }) => {
  const [selectedOption, setSelectedOption] = useState("parent");
  const [selectedTag, setSelectedTag] = useState("");
  const [filters, setFilters] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false); // Estado para mostrar el modal
  const [selectedEvent, setSelectedEvent] = useState(null); // Estado para el evento
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
  const handleCardClick = (event) => {
    setSelectedEvent(event); // Seleccionar el evento
    setIsCardModalOpen(true); // Mostrar el modal
  };

  // Función para cerrar el modal
  const handleCloseCardModal = () => {
    setIsCardModalOpen(false); // Cerrar el modal
    setSelectedEvent(null); // Limpiar el evento seleccionado
  };

  if (!hasEvents) {
    // Si no hay eventos, no muestra nada
    return null;
  }
  const handleJoinEvent = async (eventId) => {
    console.log("Botón Participar clicado para el evento con ID:", eventId);

    const userConfirmed = window.confirm("Confirma tu asistencia");
    if (!userConfirmed) {
      return;
    }

    const participationData = {
      user: { id: 1 }, // Aquí puedes usar el userId real o tomarlo desde un contexto global
      event: { id: eventId },
    };

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        alert("Debes iniciar sesión para participar en el evento.");
        return;
      }

      const response = await fetch("http://localhost:8081/api/participations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(participationData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al registrar la participación");
      }

      const result = await response.json();
      alert("Te has inscrito al evento correctamente.");
      console.log("Participación creada:", result);
    } catch (error) {
      console.error("Error al inscribirse:", error.message);
      alert("No se pudo completar la inscripción. " + error.message);
    }
  };

  return (
    <section className="event-section">
      <div>
        <h1 className="h1Events">
          {isHomeLogin ? "Tus Eventos" : "Últimos Eventos"}
        </h1>
        {/* El botón solo aparece si estamos en HomeLogin y el usuario está logueado */}
        {isHomeLogin && isUserLoggedIn && (
          <button className="create-button" onClick={toggleForm}>
            Crea tu evento
          </button>
        )}
        <EventList
          eventLimit={isHomeLogin ? 4 : undefined}
          filters={filters}
          onCardClick={handleCardClick}
          onJoinEvent={handleJoinEvent}
        />
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
      {/* Modal para mostrar la información completa del evento */}
      {isCardModalOpen && selectedEvent && (
        <div className="card-modal-overlay">
          <div className="card-modal-content">
            <h3>{selectedEvent.name}</h3>
            <p>{selectedEvent.description}</p>
            <ul>
              <li>
                Ubicación: {selectedEvent.location.name},{" "}
                {selectedEvent.location.country}
              </li>
              <li>Código Postal: {selectedEvent.location.postalCode}</li>
              <li>Rango de Edad: {selectedEvent.ageBracket}</li>
              <li>
                Fecha: {new Date(selectedEvent.date).toLocaleDateString()}
              </li>
            </ul>
            <button
              className="close-form-button"
              onClick={handleCloseCardModal}
            >
              Cerrar
            </button>
            <button
              className="join-button"
              onClick={(e) => {
                e.stopPropagation();
                handleJoinEvent(selectedEvent.id); // Inscripción en el evento
              }}
            >
              Participar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventSection;

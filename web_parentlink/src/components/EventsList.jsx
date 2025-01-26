import React, { useEffect, useState, useRef } from "react";
import "../styles/EventSection.css";
import "../styles/ButtonParticipa.css";

const EventList = ({ eventLimit, filters = [], onCardClick }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const eventListRef = useRef(null); // Ref para el contenedor de eventos

  const { locationName, Edad } = filters;

  // Token y idUser almacenados localmente
  const token = localStorage.getItem("jwtToken");
  const idUser = Number(localStorage.getItem("idUser"));

  if (!idUser) {
    console.error("Error: idUser no definido o no válido.");
  }

  // Función para obtener eventos
  const fetchEvents = async () => {
    try {
      let url = "http://localhost:8081/api/events";
      const urlSearchParams = new URLSearchParams();

      if (locationName) urlSearchParams.append("locationName", locationName);
      if (Edad) urlSearchParams.append("age", Edad);

      if (urlSearchParams.size) url = `${url}?${urlSearchParams.toString()}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los eventos");
      }

      const data = await response.json();

      // Agregar participantes a cada evento
      const eventsWithParticipants = await Promise.all(
        data.map(async (event) => {
          const participantsResponse = await fetch(
            `http://localhost:8081/api/events/${event.id}/participants`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const participantsData = await participantsResponse.json();
          event.participantCount = Number(participantsData) || 0; // Valor por defecto 0
          return event;
        })
      );

      setEvents(eventsWithParticipants);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (token && idUser) {
      fetchEvents();
    }
  }, [filters]);

  const handleCardClick = (event) => {
    // Ahora solo abrirás el modal o realizarás la acción que deseas
    setSelectedEvent(event); // Seleccionar el evento
    setIsCardModalOpen(true); // Mostrar el modal
  };

  const handleJoinEvent = async (eventId) => {
    console.log("Botón Participar clicado", eventId); // Verifica si el evento se está recibiendo correctamente

    const userConfirmed = window.confirm("Confirma tu asistencia");
    if (!userConfirmed) {
      return;
    }

    const userId = 1; // Supón que este ID proviene del estado global o contexto de autenticación

    const participationData = {
      user: { id: idUser },
      event: { id: eventId },
    };

    try {
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

  const handleClickOutside = (event) => {
    if (eventListRef.current && !eventListRef.current.contains(event.target)) {
      setFlippedCards({});
      setIsCardClicked(false);
    }
  };

  const eventsToRender = eventLimit ? events.slice(0, eventLimit) : events;

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={eventListRef}>
      {error && <p>Error: {error}</p>}
      <div className="event-cards-container">
        {eventsToRender.map((event, index) => (
          <div
            key={index}
            className="event-card"
            onClick={() => onCardClick(event)} // Llamamos a la función pasada desde EventSection
          >
            <div className="card-inner">
              <div className="card-front">
                <img
                  src={`https://picsum.photos/id/${event.id + 10}/300/200`}
                  alt={event.name}
                />
                <div className="event-details-front">
                  <h3>{event.name}</h3>
                  <div className="details-lines">
                    <span>
                      {event.location.name} -{" "}
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    <span>Organizado por: {event.userSystem.username}</span>
                    <span>{event.participantCount || 0} participantes</span>
                    <p>Clic para más detalles</p>
                  </div>
                </div>
              </div>
              <div className="card-back">
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <ul>
                  <li>
                    Ubicación: {event.location.name}, {event.location.country}
                  </li>
                  <li>Código Postal: {event.location.postalCode}</li>
                  <li>Rango de Edad: {event.ageBracket}</li>
                  <li>Fecha: {new Date(event.date).toLocaleDateString()}</li>
                </ul>
                <button
                  className="join-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleJoinEvent(event.id);
                  }}
                >
                  Participar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;

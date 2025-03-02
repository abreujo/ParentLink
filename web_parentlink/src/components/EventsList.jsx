import React, { useEffect, useState, useRef } from "react";
import "../styles/EventSection.css";
import "../styles/ButtonParticipa.css";

const EventList = ({ eventLimit }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [flippedCards, setFlippedCards] = useState({}); // Estado para manejar el giro de tarjetas
  const [isCardClicked, setIsCardClicked] = useState(false); // Estado para manejar si una tarjeta está clicada
  const eventListRef = useRef(null); // Ref para el contenedor de eventos

  useEffect(() => {
    // Realizar la solicitud GET a la API
    fetch("http://localhost:8081/api/events")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los eventos");
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleCardClick = (index) => {
    if (isCardClicked) return; // No hacer nada si una tarjeta ya está clicada
    setFlippedCards((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
    setIsCardClicked(true); // Marcar que una tarjeta fue clicada
  };

  const handleJoinEvent = async (eventId) => {
    const userConfirmed = window.confirm("Confirma tu asistencia");
    if (!userConfirmed) {
      console.log("El usuario canceló la inscripción.");
      return;
    }

    // Reemplaza este ID por el ID del usuario autenticado
    const userId = 1; // Supón que este ID proviene del estado global o contexto de autenticación

    const participationData = {
      user: { id: userId }, // Estructura del usuario
      event: { id: eventId }, // Estructura del evento
    };

    try {
      const response = await fetch("http://localhost:8081/api/participations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    // Si el clic fue fuera del contenedor de eventos, se cierran todas las tarjetas giradas
    if (eventListRef.current && !eventListRef.current.contains(event.target)) {
      setFlippedCards({}); // Cierra todas las tarjetas
      setIsCardClicked(false); // Permite que otras tarjetas sean clicadas nuevamente
    }
  };

  // Limitar los eventos si se pasa un límite
  const eventsToRender = eventLimit ? events.slice(0, eventLimit) : events;

  // Añadir el listener para clics fuera del contenedor de eventos
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
            className={`event-card ${flippedCards[index] ? "flipped" : ""}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-inner">
              <div className="card-front">
                <img
                  src={`https://picsum.photos/id/${event.id + 10}/300/200`}
                  alt={event.name}
                />
                <div className="event-description">
                  <h3>{event.name}</h3>
                  <p>Haga clic para ver más</p>
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
                    e.stopPropagation(); // Evitar que el click rote la tarjeta
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

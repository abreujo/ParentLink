import React, { useEffect, useState } from "react";
import "../styles/EventSection.css";
import "../styles/ButtonParticipa.css";

const EventList = ({ eventLimit, locationName }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      let url = "http://localhost:8081/api/events"; // URL base
      const urlSearchParams = new URLSearchParams();

      if (locationName)
        urlSearchParams.append("name", locationName)

      /*
      if (edad)
        urlSearchParams.append("edad", edad)
      */

      if (urlSearchParams.size)
        url=`${url}?${urlSearchParams.toString()}`

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error al obtener los eventos");
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEvents();
  }, [locationName]); // Depende de locationName para cambiar cuando se seleccione una ciudad

  const handleCardClick = (index) => {
    setFlippedCards((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleJoinEvent = async (eventId) => {
    const userConfirmed = window.confirm("Confirma tu asistencia");
    if (!userConfirmed) {
      console.log("El usuario canceló la inscripción.");
      return;
    }

    const userId = 1; // Supón que este ID proviene del estado global o contexto de autenticación

    const participationData = {
      user: { id: userId },
      event: { id: eventId },
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

  const eventsToRender = eventLimit ? events.slice(0, eventLimit) : events;

  return (
    <div>
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

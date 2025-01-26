import React, { useEffect, useState, useRef } from "react";
import "../styles/EventSection.css";
import "../styles/ButtonParticipa.css";

const EventList = ({ eventLimit, filters = [] }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [isCardClicked, setIsCardClicked] = useState(false);
  const eventListRef = useRef(null);

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

      //Debugger
      console.log("url para traer eventos en EventsList" + url);

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

      //Debugger
      console.log(
        "EventList Fecth a Eventos resultado..: " + JSON.stringify(data)
      );

      // Filtrar datos inválidos
      const validEvents = data
  .filter((event) => event && event.id)
  .sort((a, b) => new Date(a.date) - new Date(b.date));

      //Debugger
      console.log(
        "EventList Fecth a Eventos resultado con Filtro a Eventos Validos..: " +
          JSON.stringify(data)
      );

      // Agregar participantes a cada evento VALIDO
      const eventsWithParticipants = await Promise.all(
        validEvents.map(async (event) => {
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
      //Debbuger
      console.log(
        "Entra en el Error cuando intenta agregar cantidad de participantes" +
          err.message
      );
    }
  };

  useEffect(() => {
    if (token && idUser) {
      fetchEvents();
    }
  }, [filters]);

  const handleCardClick = (index) => {
    if (isCardClicked) return;
    setFlippedCards((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
    setIsCardClicked(true);
  };

  const handleJoinEvent = async (eventId) => {
    const userConfirmed = window.confirm("Confirma tu asistencia");
    if (!userConfirmed) return;

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
            className={`event-card ${flippedCards[index] ? "flipped" : ""}`}
            onClick={() => handleCardClick(index)}
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
                    <span
                      className={
                        event.userSystem.user.id === idUser
                          ? "highlighted-organizer"
                          : ""
                      }
                    >
                      {event.userSystem.user.id === idUser
                        ? `*** EVENTO PROPIO ***`
                        : `Organizado por: ${event.userSystem.username}`}
                    </span>
                    <span>{event.participantCount || 0} participantes</span>
                    <p>Clic para detalles</p>
                  </div>
                </div>
              </div>
              <div className="card-back">
                <div className="card-back-content">
                  <div className="image-container">
                    <img
                      src={`https://picsum.photos/id/${event.id + 10}/600/600`} // Imagen grande
                      alt={event.name}
                      className="large-image"
                    />
                  </div>
                  <div className="event-details">
                    <h3>{event.name}</h3>
                    <p>{event.description}</p>                    
                      <p>
                      El {new Date(event.date).toLocaleDateString()} en {event.location.name},{" "}
                      </p>
                      {/* <li>Código Postal: {event.location.postalCode}</li> */}
                      <p>Para niños de {event.ageBracket} años</p>
                      <p
  className={
    event.userSystem.user.id === idUser
      ? "highlighted-organizer"
      : ""
  }
>
  {event.userSystem.user.id === idUser
    ? `** EVENTO PROPIO **`
    : `Organizado por: ${event.userSystem.username}`}
</p>

                    <button
                      className={`join-button ${
                        event.userSystem.user.id === idUser ? "disabled" : ""
                      }`}
                      disabled={event.userSystem.user.id === idUser}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;

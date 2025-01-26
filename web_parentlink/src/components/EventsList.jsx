import React, { useEffect, useState, useRef } from "react";
import "../styles/EventSection.css";
import "../styles/ButtonParticipa.css";
import { useAuth } from "../contex/AuthContext";

const EventList = ({ eventLimit, filters = [] }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [flippedCards, setFlippedCards] = useState({}); // Estado para manejar el giro de tarjetas
  const [isCardClicked, setIsCardClicked] = useState(false); // Estado para manejar si una tarjeta está clicada
  const eventListRef = useRef(null); // Ref para el contenedor de eventos

  const { locationName, Edad } = filters;

  //const { userSystem } = useAuth(); // Aquí usamos el hook del contexto

  //INCORPORACION DE JWT PARA EN ENVIO DEL TOKEN
  useEffect(() => {
  const token = localStorage.getItem("jwtToken");

  const fetchEvents = async () => {
    let url = "http://localhost:8081/api/events";
    const urlSearchParams = new URLSearchParams();

    if (locationName) urlSearchParams.append("locationName", locationName);
    if (Edad) urlSearchParams.append("age", Edad);

    if (urlSearchParams.size) url = `${url}?${urlSearchParams.toString()}`;

    try {
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

      // Ahora obtenemos los participantes para cada evento
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
// Si el número es un string, conviértelo a número
const participantCount = Number(participantsData) || 0;  // 0 como valor por defecto si la conversión falla
event.participantCount = participantCount;
console.log(event);

          return event;
        })
      );

      setEvents(eventsWithParticipants);
    } catch (err) {
      setError(err.message);
    }
  };

  if (token) fetchEvents();
}, [filters]);
// Depende de locationName para cambiar cuando se seleccione una ciudad

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

    //console.log(userSystem);
    //const userId = userSystem?.user?.id;
    const userId = 1; // Supón que este ID proviene del estado global o contexto de autenticación
    //console.log(userId);

    const participationData = {
      user: { id: userId },
      event: { id: eventId },
    };

    try {
      //INSCRIPCION DE UN PARTICIPANTE EN UN EVENTO
      const token = localStorage.getItem("jwtToken"); // Recuperar el token almacenado
      if (!token) return;
      const response = await fetch("http://localhost:8081/api/participations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
        },
        body: JSON.stringify(participationData),
      });
      //debugger

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
  <div className="event-details-front">
    <h3>{event.name}</h3>
    <div className="details-lines">
      <span>{event.location.name} - {new Date(event.date).toLocaleDateString()}</span>
      <span>Organizado por:  {event.userSystem.username}</span>
      <span>{event.participantCount ? event.participantCount : 0} participantes</span>
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

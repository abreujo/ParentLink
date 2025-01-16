import React, { useState, useEffect, useRef } from "react";
import "../styles/EventSection.css";
import events from "../data/events.json";
import CreateEventForm from "./EventCreationForm";

const EventSection = ({ isHomeLogin }) => {
  const [selectedOption, setSelectedOption] = useState("parent");
  const [selectedTag, setSelectedTag] = useState("");
  const [flippedCards, setFlippedCards] = useState({});
  const [activeTag, setActiveTag] = useState(""); // Track which tag is clicked
  const tagRefs = useRef({}); // Refs to detect clicks outside
  const [showModal, setShowModal] = useState(false); // Estado para controlar el pop-up modal

  const tagOptions = {
    Ubicación: ["Madrid", "Barcelona", "Sevilla", "Valencia"],
    Edad: ["0-3", "4-6", "6-8", "8-10", "10-12", "+12"],
    "Tipo de evento": [
      "Naturaleza",
      "Deporte",
      "Aventura",
      "Fiesta",
      "Convivencia",
    ],
  };

  // Maneja la apertura y cierre del modal
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <section className="event-section">
      <h2>{isHomeLogin ? "Eventos" : "Encuentra tu evento"}</h2>
      <div className="filters">
        {isHomeLogin ? (
          <>
            <button className="filter-button" onClick={toggleModal}>
              Crea tu evento
            </button>
            <button
              className={`filter-button ${
                selectedOption === "join" ? "selected-join" : ""
              }`}
              onClick={() => setSelectedOption("join")}
            >
              Únete a un evento
            </button>
          </>
        ) : (
          <>
            <button
              className={`filter-button ${
                selectedOption === "parent" ? "selected-parent" : ""
              }`}
              onClick={() => setSelectedOption("parent")}
            >
              Soy madre/padre
            </button>
            <button
              className={`filter-button ${
                selectedOption === "caregiver" ? "selected-caregiver" : ""
              }`}
              onClick={() => setSelectedOption("caregiver")}
            >
              Quiero ser papá/mamá
            </button>
          </>
        )}
      </div>

      {/* Mostrar modal */}
      {showModal && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Evitar cerrar al hacer clic dentro del modal
          >
            <button className="modal-close" onClick={toggleModal}>
              ✖
            </button>
            <CreateEventForm />
          </div>
        </div>
      )}

      {/* Tarjetas de eventos */}
      <div className="event-cards-container">
        {events.map((event, index) => (
          <div
            key={index}
            className={`event-card ${flippedCards[index] ? "flipped" : ""}`}
            onClick={() =>
              setFlippedCards((prev) => ({
                ...prev,
                [index]: !prev[index],
              }))
            }
          >
            <div className="card-inner">
              <div className="card-front">
                <img src={"/" + event.img} alt={event.title} />
                <div className="event-description">
                  <h3>{event.title}</h3>
                  <p>Haga clic para ver más</p>
                </div>
              </div>
              <div className="card-back">
                <h3>{event.title}</h3>
                <ul>
                  {event.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventSection;

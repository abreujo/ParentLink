import React, { useState } from "react";
import userIcon from "../assets/images/userIcon.png"; // Asegúrate de que la ruta sea correcta
import "../styles/Sidebar.css"; // Asegúrate de tener el archivo CSS

const Sidebar = ({ username }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (eventName) => {
    setSelectedEvent(eventName); // Cambiar el estado para resaltar el evento seleccionado
  };

  return (
    <div className="sidebar">
      {/* Contenedor para el nombre del usuario y su icono */}
      <div className="user-info">
        <div className="user-info-content">
          {/* Imagen del usuario */}
          <img src={userIcon} alt="User Icon" className="user-icon" />
          {/* Nombre del usuario */}
          <h2>Hola, {username}</h2>
        </div>
      </div>

      {/* Menú de eventos */}
      <div className="sidebar-menu">
        <div
          className={`menu-item ${
            selectedEvent === "Eventos Creados" ? "selected" : ""
          }`}
          onClick={() => handleEventClick("Eventos Creados")}
        >
          <h3>Eventos creados</h3>
        </div>
        <div
          className={`menu-item ${
            selectedEvent === "Eventos Próximos" ? "selected" : ""
          }`}
          onClick={() => handleEventClick("Eventos Próximos")}
        >
          <h3>Eventos próximos</h3>
        </div>
        <div
          className={`menu-item ${
            selectedEvent === "Eventos Asistidos" ? "selected" : ""
          }`}
          onClick={() => handleEventClick("Eventos Asistidos")}
        >
          <h3>Eventos asistidos</h3>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useState } from "react";
import userIcon from "../assets/images/userIcon.png"; // Asegúrate de que la ruta sea correcta
import "../styles/Sidebar.css"; // Asegúrate de tener el archivo CSS

const Sidebar = ({ username, surname, email, location }) => {
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

      {/* Espacio entre el nombre del usuario y los datos */}
      <div className="user-details">
        <ul className="user-info-list">
          <li>
            <strong>Nombre:</strong> {username}
          </li>
          <li>
            <strong>Apellidos:</strong> {surname}
          </li>
          <li>
            <strong>Correo Electrónico:</strong> {email}
          </li>
          <li>
            <strong>Ubicación:</strong> {location}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

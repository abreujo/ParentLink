import React, { useState } from "react";
import userIcon from "../assets/images/userIcon.png"; // Asegúrate de que la ruta sea correcta
import "../styles/Sidebar.css"; // Asegúrate de tener el archivo CSS
import CardUser from "./CardUser";

const Sidebar = ({ username, surname, email, location }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (eventName) => {
    setSelectedEvent(eventName);
  };

  return (
    <>
      <CardUser></CardUser>
    </>
  );
};

export default Sidebar;

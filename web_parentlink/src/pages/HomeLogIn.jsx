import React, { useState } from "react";
import MenuLogin from "../components/MenuLogin"; // Importa MenuLogin
import Sidebar from "../components/Sidebar"; // Importa Sidebar
import EventSection from "../components/EventSection";
import WelcomeMessage from "../components/WelcomeMessage";

const HomeLogIn = () => {
  const [userName, setUserName] = useState("Carlos");

  return (
    <div>
      {/* Mostrar MenuLogin como estaba antes */}
      <MenuLogin />

      <div style={{ display: "flex" }}>
        {/* Sidebar a la izquierda */}
        <Sidebar username={userName} />

        {/* Contenido principal */}
        <div style={{ marginLeft: "250px", padding: "20px", flex: 1 }}>
          <h1>Bienvenido, {userName}!</h1>

          {/* Mostrar el mensaje de bienvenida */}
          <WelcomeMessage username={userName} />

          {/* Mostrar la sección de eventos */}
          <EventSection isHomeLogin={true} />
        </div>
      </div>
    </div>
  );
};

export default HomeLogIn;

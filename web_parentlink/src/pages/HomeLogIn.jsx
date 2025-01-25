import React, { useState } from "react";
import MenuLogin from "../components/MenuLogin"; // Importa MenuLogin
import Sidebar from "../components/Sidebar"; // Importa Sidebar
import EventSection from "../components/EventSection";
import WelcomeMessage from "../components/WelcomeMessage";
import { useAuth } from "../contex/AuthContext";
import Menu from "../components/Menu";

const HomeLogIn = () => {
  const { username } = useAuth();

  console.log("UserName...:   " + username);

  return (
    <div>
      {/* Mostrar MenuLogin como estaba antes */}

      <div style={{ display: "flex" }}>
        {/* Sidebar a la izquierda */}
        <Sidebar username={username} />

        {/* Contenido principal */}
        <div>
          {/* Mostrar el mensaje de bienvenida */}
          <WelcomeMessage username={username} />
          {/* Mostrar la sección de eventos */}
          <EventSection isHomeLogin={true} eventLimit={5} />{" "}
        </div>
      </div>
    </div>
  );
};

export default HomeLogIn;

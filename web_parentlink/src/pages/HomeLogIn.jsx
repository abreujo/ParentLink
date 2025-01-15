import React, { useState } from "react";
import EventSection from "../components/EventSection";
import MenuLogin from "../components/MenuLogin";
import WelcomeMessage from "../components/WelcomeMessage";

const HomeLogIn = () => {
  // Simulamos que el nombre de usuario se recibe tras el login
  const [userName, setUserName] = useState("Carlos"); // Aquí podrías obtenerlo de un estado global o contexto

  return (
    <div>
      <MenuLogin />
      <h1>Bienvenido, {userName}!</h1>

      {/* Mostrar el mensaje de bienvenida */}
      <WelcomeMessage username={userName} />

      {/* Mostrar la sección de eventos */}
      <EventSection isHomeLogin={true} />
    </div>
  );
};

export default HomeLogIn;

import React, { useState } from "react";
import MenuLogin from "../components/MenuLogin"; // Importa MenuLogin
import Sidebar from "../components/Sidebar"; // Importa Sidebar
import EventSection from "../components/EventSection";
import WelcomeMessage from "../components/WelcomeMessage";
import { useAuth } from "../contex/AuthContext";
import Menu from "../components/Menu";
import "../styles/HomeLogIn.css";
const HomeLogIn = () => {
  const { username } = useAuth();

  console.log("UserName...:   " + username);

  return (
    <div>
      {/* Mostrar MenuLogin como estaba antes */}
      <div className="welc">
        <WelcomeMessage username={username} />
      </div>

      <div className="wrapper-sidebar">
        <div className="side-div">
          {/* Sidebar a la izquierda */}
          <Sidebar username={username} />
        </div>
        <div className="eve">
          <EventSection isHomeLogin={true} eventLimit={5} />{" "}
        </div>
      </div>
    </div>
  );
};

export default HomeLogIn;

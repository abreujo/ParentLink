// Menu.jsx
import React from "react";
import "../styles/Menu.css";
import logo from "../assets/images/logo.jpeg";
const Menu = () => {
  return (
    <nav className="menu">
      <div className="menu-logo">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="menu-links">
        <a href="#sobre-nosotros" className="menu-link">
          Sobre Nosotros
        </a>
        <a href="#como-funciona" className="menu-link">
          ¿Cómo Funciona?
        </a>
        <a href="#espanol" className="menu-link">
          Español
        </a>
      </div>
      <div className="menu-buttons">
        <button className="btn-register">Registrarse</button>
        <button className="btn-login">Acceder</button>
      </div>
    </nav>
  );
};

export default Menu;

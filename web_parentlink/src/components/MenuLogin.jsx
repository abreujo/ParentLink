import React from "react";
import "../styles/MenuLogin.css";
import letras from "../assets/images/letrasparentlink.png";
import logo from "../assets/images/logoparentlinkdefinitivo.png";
const MenuLoggedIn = () => {
  return (
    <nav className="menu">
      {/* Logo en el lado izquierdo */}
      <div className="menu-left">
        <div className="menu-logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <img src={letras} alt="Logo Texto" className="letras-logo" />
        </div>
      </div>
      <div className="menu-links">
        <a href="#sobre-nosotros" className="menu-link">
          Sobre Nosotros
        </a>
        <a href="#como-funciona" className="menu-link">
          ¿Cómo Funciona?
        </a>
      </div>
      {/* Botones a la derecha */}
      <div className="menu-right">
        <button className="menu-button">Mi Perfil</button>
        <button className="menu-button logout">Cerrar Sesión</button>
      </div>
    </nav>
  );
};

export default MenuLoggedIn;

// Menu.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Menu.css";
import logo from "../assets/images/Logoparentlinkdefinitivo.png";
import letras from "../assets/images/letrasparentlink.png";

const Menu = () => {
  return (
    <nav className="menu">
      {/* Contenedor del logo y letras al extremo izquierdo */}
      <div className="menu-logo-container">
        <div className="menu-logo">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="letras-logo">
          <img src={letras} alt="Letras" className="letras" />
        </div>
      </div>

      {/* Contenedor de enlaces y botones al extremo derecho */}
      <div className="menu-right">
        <div className="menu-links">
          <a href="#sobre-nosotros" className="menu-link">
            Sobre Nosotros
          </a>
          <a href="#como-funciona" className="menu-link">
            ¿Cómo Funciona?
          </a>
        </div>
        <div className="menu-buttons">
          <button className="btn-register">Registrarse</button>
          {/* Botón de Acceder, envuelto en Link para redirigir a /menu-login */}
          <Link to="/menu-login">
            <button className="btn-login">Acceder</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Menu;

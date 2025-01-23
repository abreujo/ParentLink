import React from "react";
import "../styles/MenuLogin.css";
import letras from "../assets/images/letrasparentlink.png";
import logo from "../assets/images/logoparentlinkdefinitivo.png";
import { Link, useLocation } from "react-router-dom"; // Importamos useLocation

const MenuLogin = () => {
  const location = useLocation(); // Obtenemos la ubicación actual de la página

  // Lógica para mostrar "Mi Perfil" solo si no estamos en la página "/home-login"
  const showProfileButton = location.pathname !== "/home-login";

  return (
    <nav className="menu">
      {/* Logo en el lado izquierdo */}
      <div className="menu-left">
        <div className="menu-logo-container">
          {/* Logos clickeables */}
          <Link to="/">
            <img src={logo} alt="Logo" className="menu-logo" />
          </Link>
          <Link to="/">
            <img src={letras} alt="Logo Texto" className="letras" />
          </Link>
        </div>
      </div>

      {/* Botones a la derecha */}
      <div className="menu-right">
        <Link className="menu-link" to="/sobre-nosotros">
          Sobre Nosotros
        </Link>
        <Link className="menu-link" to="/como-funciona">
          ¿Cómo Funciona?
        </Link>
        <Link className="menu-highlight-link" to="/">
          Home
        </Link>
        <Link className="menu-highlight-link" to="/eventos">
          Eventos
        </Link>

        {/* Mostrar el botón "Mi Perfil" solo si no estamos en la página "/home-login" */}
        {showProfileButton && (
          <Link to="/me" className="menu-link">
            Mi Perfil
          </Link>
        )}

        <button className="menu-button logout">Cerrar Sesión</button>
      </div>
    </nav>
  );
};

export default MenuLogin;

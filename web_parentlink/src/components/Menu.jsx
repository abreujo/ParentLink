// Menu.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Menu.css";
import logo from "../assets/images/Logo.png";

const Menu = () => {
  return (
    <nav className="menu">
      <div className="menu-logo">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="menu-links">
        <Link to="/" className="menu-link">
          Sobre Nosotros
        </Link>
        <Link to="/ComoFunciona" className="menu-link">
          ¿Cómo Funciona?
        </Link>
        <li className="menu-language">
          <select>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </li>
      </div>
      <div className="menu-buttons">
        <button className="btn-register">Registrarse</button>
        <button className="btn-login">Acceder</button>
      </div>
    </nav>
  );
};

export default Menu;

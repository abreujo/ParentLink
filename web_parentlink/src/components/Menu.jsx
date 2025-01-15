import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Menu.css";
import RegistrationForm from "../components/RegistrationForm";
import logo from "../assets/images/Logoparentlinkdefinitivo.png";
import letras from "../assets/images/letrasparentlink.png";

const Menu = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleOpenRegisterForm = () => {
    setShowRegisterForm(true);
  };

  const handleCloseRegisterForm = () => {
    setShowRegisterForm(false);
  };

  return (
    <nav className="menu">
      <div className="menu-logo-container">
        <div className="logo-menu">
          <img src={logo} alt="Logo" className="menu-logo" />
        </div>
        <div className="letras-logo">
          <img src={letras} alt="Letras" className="letras" />
        </div>
      </div>

      <div className="menu-right">
        <div className="menu-links">
          <Link className="menu-link" to="/">
            Sobre Nosotros
          </Link>
          <a href="#como-funciona" className="menu-link">
            ¿Cómo Funciona?
          </a>
        </div>
        <div className="menu-buttons">
<<<<<<< HEAD
          <button className="btn-register" onClick={handleOpenRegisterForm}>
            Registrarse
          </button>
          <Link to="/menu-login">
=======
          <button className="btn-register">Registrarse</button>
          {/* Botón de Acceder, envuelto en Link para redirigir a /menu-login */}
          <Link to="/home-login">
>>>>>>> funcionalidadEventos
            <button className="btn-login">Acceder</button>
          </Link>
        </div>
      </div>

      {showRegisterForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <RegistrationForm onClose={handleCloseRegisterForm} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Menu;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Menu.css";
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";
import logo from "../assets/images/logoparentlinkdefinitivo.png";
import letras from "../assets/images/letrasparentlink.png";

const Menu = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleOpenRegisterForm = () => {
    setShowRegisterForm(true);
  };

  const handleCloseRegisterForm = () => {
    setShowRegisterForm(false);
  };

  const handleOpenLoginForm = () => {
    setShowLoginForm(true);
  };

  const handleCloseLoginForm = () => {
    setShowLoginForm(false);
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
          <button className="btn-register" onClick={handleOpenRegisterForm}>
            Registrarse
          </button>
          <button className="btn-login" onClick={handleOpenLoginForm}>
            Acceder
          </button>
        </div>
      </div>

      {showRegisterForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <RegistrationForm onClose={handleCloseRegisterForm} />
          </div>
        </div>
      )}

      {showLoginForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <LoginForm onClose={handleCloseLoginForm} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Menu;

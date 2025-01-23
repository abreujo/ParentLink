import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Menu.css";
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm"; // Імпортувати LoginForm
import logo from "../assets/images/logoparentlinkdefinitivo.png";
import letras from "../assets/images/letrasparentlink.png";

const Menu = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false); // Додати стан для LoginForm

  const handleOpenRegisterForm = () => {
    setShowRegisterForm(true);
  };

  const handleCloseRegisterForm = () => {
    setShowRegisterForm(false);
  };

  const handleOpenLoginForm = () => {
    setShowLoginForm(true); // Відкрити LoginForm
  };

  const handleCloseLoginForm = () => {
    setShowLoginForm(false); // Закрити LoginForm
  };

  // Función para desplazarse a la parte superior
  const scrollToTop = () => {
    window.scrollTo(0, 0); // Desplazamiento instantáneo al inicio
  };

  return (
    <nav className="menu">
      <div className="menu-logo-container">
        <div className="logo-menu">
          {/* Agregar onClick al logo para desplazar hacia arriba */}
          <Link to="/" onClick={scrollToTop}>
            <img src={logo} alt="Logo" className="menu-logo" />
          </Link>
        </div>
        <div className="letras-logo">
          {/* Agregar onClick al texto del logo para desplazar hacia arriba */}
          <Link to="/" onClick={scrollToTop}>
            <img src={letras} alt="Letras" className="letras" />
          </Link>
        </div>
      </div>

      <div className="menu-right">
        <div className="menu-links">
          <Link className="menu-link" to="/">
            Sobre Nosotros
          </Link>
          <Link className="menu-link" to="/comofunciona">
            ¿Cómo Funciona?
          </Link>
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

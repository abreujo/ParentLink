import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MenuLogin.css";
import letras from "../assets/images/letrasparentlink.png";
import logo from "../assets/images/logoparentlinkdefinitivo.png";
import { Link } from "react-router-dom";

const MenuLogin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
  
    localStorage.removeItem("authToken");
    localStorage.setItem("jwtToken", ""); 
    navigate("/"); 
  };

  return (
    <nav className="menu">
     
      <div className="menu-left">
        <div className="menu-logo-container">
          <Link to="/">
            <img src={logo} alt="Logo" className="menu-logo" />
          </Link>
          <Link to="/">
            <img src={letras} alt="Logo Texto" className="letras" />
          </Link>
        </div>
      </div>

  
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
        <button className="menu-button logout" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default MenuLogin;

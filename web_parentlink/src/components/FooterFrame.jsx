import React from "react";
import "../styles/FooterFrame.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import esplai from "../assets/images/Esplai.png";

const FooterFrame = () => {
  return (
    <footer className="footer-frame">
      <div className="footer-container">
        <div className="footer-section">
          <h4>ParentLink</h4>
          <p>Proyecto final del Boot Camp Java3. Fundacion Esplay</p>
        </div>
        <div className="footer-section">
          <h4>Enlaces Útiles</h4>
          <ul>
            <li>
              <Link to="/">Quiénes Somos</Link>
            </li>
            <li>
              <Link to="/services">Servicios</Link>
            </li>
            <li>
              <Link to="/Contact">Contactos</Link>
            </li>
            <li>
              <Link to="/Ods">Objetivos de Desarollo Sostenible</Link>
            </li>
            <li>
              <Link to="/DevelopmentResources">
                Recursos para el desarrollo
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contáctanos</h4>
          <p>Email: contacto@empresa.com</p>
          <p>Teléfono: +34 123 456 789</p>
        </div>
        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-logo">
          <img src={esplai} alt="Fundacion Esplai" className="footer-esplai" />
        </div>
        <div className="footer-derechos">
          <p>&copy; 2025 Tu Empresa. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterFrame;

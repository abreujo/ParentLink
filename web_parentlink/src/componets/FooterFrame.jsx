import React from "react";
import "../styles/FooterFrame.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import Contact from "../pages/Contact";

const FooterFrame = () => {
  return (
<<<<<<< Updated upstream
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
              <a href="/about">Quiénes Somos</a>
            </li>
            <li>
              <a href="/services">Servicios</a>
            </li>
            <li>
              <a href="/contact">Contacto</a>
            </li>
            <li>
              <a href="/privacy">Política de Privacidad</a>
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
=======
    <Router>
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
                <a href="/AboutPage">Quiénes Somos</a>
              </li>
              <li>
                <a href="/services">Servicios</a>
              </li>
              <li>
                <a href="/Contact">Contacto</a>
              </li>
              <li>
                <a href="/privacy">Política de Privacidad</a>
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
>>>>>>> Stashed changes
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Tu Empresa. Todos los derechos reservados.</p>
        </div>
      </footer>
    </Router>
  );
};

export default FooterFrame;

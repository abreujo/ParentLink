import React from "react";
import "../styles/FooterFrame.css";

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
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Tu Empresa. Todos los derechos reservados.</p>
        </div>
      </footer>
  );
};

export default FooterFrame;

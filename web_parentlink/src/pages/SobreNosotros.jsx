// SobreNosotros.jsx
import React from "react";
import Menu from "../components/Menu";
import "../styles/SobreNosotros.css";
import heroImage from "../assets/images/hero-about.png";
import purposeImage from "../assets/images/purpose.png";
import howItWorksImage from "../assets/images/how-it-works.png";
import servicesImage from "../assets/images/services.png";
import odsImage from "../assets/images/ods.png";
import securityImage from "../assets/images/security.png";
import goalImage from "../assets/images/goal.png";

export default function SobreNosotros() {
  return (
    <>
      {/* Hero Section */}
      <div className="sobre-hero-section">
        <div className="sobre-hero-content">
          <h1 className="sobre-hero-title">Sobre Nosotros</h1>
          <p className="sobre-hero-description">
            ParentLink es una plataforma web diseñada para favorecer la
            co-crianza y el co-cuidado infantil a familias con dificultades, así
            como para ayudar a impulsar la natalidad de una sociedad envejecida,
            fortalecer la confianza en un tejido social fragmentado y erradicar
            los altos niveles de pobreza infantil local en nuestro país.
          </p>
        </div>
        <div className="sobre-hero-image-container">
          <img
            src={heroImage}
            alt="Sobre Nosotros"
            className="sobre-hero-image"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="sobre-content-section">
        <section className="sobre-content-block">
          <div className="sobre-content-text-container">
            <h2 className="sobre-content-title">Nuestro Propósito</h2>
            <p className="sobre-content-text">
              Por su parte, este sistema busca facilitar la conciliación laboral
              y personal de familias pertenecientes a colectivos minoritarios,
              como madres solteras trabajadoras y familias LGTBI; comunidades
              que, a menudo, enfrentan desafíos como la falta de recursos para
              el cuidado infantil, riesgo de exclusión social, y la necesidad de
              brindar a sus hijos una educación inclusiva y enriquecedora.
            </p>
          </div>
          <div className="sobre-content-image-container">
            <img
              src={purposeImage}
              alt="Nuestro Propósito"
              className="sobre-content-image"
            />
          </div>
        </section>

        <section className="sobre-content-block reverse">
          <div className="sobre-content-text-container">
            <h2 className="sobre-content-title">¿Cómo Funciona?</h2>
            <p className="sobre-content-text">
              La actividad permite que los padres dejen a sus hijos con otras
              familias durante ciertas horas en las que están ocupados,
              trabajando o auto-dedicándose algo de tiempo a nivel personal,
              devolviendo el favor al cuidar a los hijos de otras familias en el
              futuro.
            </p>
            <p className="sobre-content-text">
              Antes de iniciar la colaboración, las familias deben registrarse
              en la plataforma y proporcionar detalles específicos sobre sus
              intereses, horarios y necesidades. ParentLink analiza esta
              información y ofrece a las familias participantes opciones de
              emparejamiento compatibles.
            </p>
          </div>
          <div className="sobre-content-image-container">
            <img
              src={howItWorksImage}
              alt="¿Cómo Funciona?"
              className="sobre-content-image"
            />
          </div>
        </section>

        <section className="sobre-content-block">
          <div className="sobre-content-text-container">
            <h2 className="sobre-content-title">Servicios Adicionales</h2>
            <p className="sobre-content-text">
              Una vez que se establece un "match" entre familias, para que las
              familias sigan utilizando la plataforma, se ofrecen servicios
              adicionales como seguros específicos para los niños y un sistema
              de registro de entregas que permite un seguimiento transparente y
              sirve como prueba judicial en caso necesario. Además, las familias
              cuidadoras acumulan puntos a través de sus actividades, que pueden
              canjear por recompensas y ofertas exclusivas.
            </p>
          </div>
          <div className="sobre-content-image-container">
            <img
              src={servicesImage}
              alt="Servicios Adicionales"
              className="sobre-content-image"
            />
          </div>
        </section>

        <section className="sobre-content-block reverse">
          <div className="sobre-content-text-container">
            <h2 className="sobre-content-title">Vinculación con los ODS</h2>
            <ul className="sobre-ods-list">
              <li>
                ODS 1 (Erradicación de la pobreza): Apoya a familias con
                recursos limitados al ofrecer una solución accesible para el
                cuidado infantil.
              </li>
              <li>
                ODS 5 (Igualdad de género): Facilita la inserción laboral de
                mujeres y madres solteras al reducir las barreras relacionadas
                con el cuidado de los hijos.
              </li>
              <li>
                ODS 8 (Trabajo decente y crecimiento económico): Promueve la
                conciliación laboral y fomenta redes colaborativas que
                beneficien el desarrollo económico de los hogares.
              </li>
              <li>
                ODS 10 (Reducción de desigualdades): Ayuda a colectivos
                minoritarios en riesgo de exclusión a construir comunidades de
                apoyo e inclusión.
              </li>
            </ul>
          </div>
          <div className="sobre-content-image-container">
            <img
              src={odsImage}
              alt="Vinculación con los ODS"
              className="sobre-content-image"
            />
          </div>
        </section>

        <section className="sobre-content-block reverse">
          <div className="sobre-content-text-container">
            <h2 className="sobre-content-title">Nuestro Objetivo Final</h2>
            <p className="sobre-content-text">
              Construir una red confiable y segura de familias colaborativas que
              promueva la conciliación personal-laboral y fomente comunidades
              más inclusivas y resilientes, reduciendo desigualdades y mejorando
              la calidad de vida de los niños y sus cuidadores.
            </p>
          </div>
          <div className="sobre-content-image-container">
            <img
              src={goalImage}
              alt="Nuestro Objetivo Final"
              className="sobre-content-image"
            />
          </div>
        </section>
      </div>
    </>
  );
}

import React from "react";
import "../styles/DescriptionSection.css";
import imagen1 from "../assets/images/fotofamilia.jpg";

const DescriptionSection = () => {
  return (
    <section className="description-section">
      <div className="text-content">
        <p>
          Parentlink es una plataforma en la que familias con dificultades de
          todo tipo y con hijos a su cargo pueden crear comunidades e
          interactuar entre ellas.
        </p>
        <button className="register-button">Regístrate gratis</button>
      </div>
      <div className="image-content">
        <img
          src={imagen1} /* Reemplaza con la URL de la imagen real */
          alt="Family"
        />
      </div>
    </section>
  );
};

export default DescriptionSection;

import React, { useState } from "react";
import "../styles/DescriptionSection.css";
import imagen1 from "../assets/images/fotofamilia.jpg";
import RegistrationForm from "../components/RegistrationForm";

const DescriptionSection = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleOpenRegisterForm = () => {
    setShowRegisterForm(true);
  };

  const handleCloseRegisterForm = () => {
    setShowRegisterForm(false);
  };

  return (
    <section className="description-section">
      <div className="text-content">
        <p>
          Parentlink es una plataforma en la que familias con dificultades de
          todo tipo y con hijos a su cargo pueden crear comunidades e
          interactuar entre ellas.
        </p>
        <button className="register-button" onClick={handleOpenRegisterForm}>
          Regístrate gratis
        </button>
      </div>
      <div className="image-content">
        <img
          src={imagen1} /* Reemplaza con la URL de la imagen real */
          alt="Family"
        />
      </div>

      {showRegisterForm && (
        <div className="modal-overlay">
          <div className="modal-content2">
            <RegistrationForm onClose={handleCloseRegisterForm} />
          </div>
        </div>
      )}
    </section>
  );
};

export default DescriptionSection;

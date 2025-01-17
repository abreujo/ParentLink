import React from "react";
import PropTypes from "prop-types";
import "../styles/WelcomeMessage.css";

const WelcomeMessage = ({ username }) => {
  return (
    <div className="welcome-message">
      <h1>Ahora formas parte de la comunidad Parentlink!</h1>
    </div>
  );
};

// Definir las PropTypes para validar las props del componente
WelcomeMessage.propTypes = {
  username: PropTypes.string.isRequired,
};

export default WelcomeMessage;

// En tu archivo JSX (por ejemplo, App.jsx o un componente similar)
import React from "react";
import "../styles/Body.css";
import evento from "../assets/images/imagenevento.jpg";

const HomePage = () => {
  return (
    <div className="container">
      <div className="image-container">
        <img src={evento} alt="Imagen grande" className="large-image" />
      </div>
      <div className="text-container">
        <h1>¿Qué es ParentLink?</h1>
      </div>
    </div>
  );
};

export default HomePage;

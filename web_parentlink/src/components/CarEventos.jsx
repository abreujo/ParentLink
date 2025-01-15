import React from "react";
import "../styles/CardEvento.css"; // Archivo CSS para estilos personalizados

const CardEvento = ({ name, descripcion, photo, rango, ciudad }) => {
  return (
    <div className="card-Evento">
      <img src={photo} alt={`${name}'s photo`} className="card-evento-photo" />
      <h2>{name}</h2>
      <p className="title-evento">{descripcion}</p>
      <p>Rango: {rango}</p>
      <p className="font-ciudad">Ciudad: {ciudad}</p>
    </div>
  );
};

export default CardEvento;

import React from "react";
import "../styles/CardContac.css"; // Archivo CSS para estilos personalizados

const CardContac = ({ name, title, email, phone, photo }) => {
  return (
    <div className="card">
      <img src={photo} alt={`${name}'s photo`} className="card-photo" />
      <h2>{name}</h2>
      <p className="title">{title}</p>
      <p>Email: {email}</p>
      <p>Teléfono: {phone}</p>
    </div>
  );
};

export default CardContac;

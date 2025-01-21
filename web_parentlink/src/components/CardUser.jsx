import React from "react";
import "../styles/CardUser.css"; // Archivo CSS para estilos personalizados

const CardContac = ({
  apellido,
  nombre,
  email,
  phone,
  fecha_nacimiento,
  genero,
  localizacion,
  hijos,
  nro_hijos,
}) => {
  return (
    <div className="card-user">
      <img src={photo} alt={`${name}'s photo`} className="card-photo-user" />
      <h2>{name}</h2>
      <p className="title">{title}</p>
      <p>Email: {email}</p>
      <p>Teléfono: {phone}</p>
    </div>
  );
};

export default CardContac;

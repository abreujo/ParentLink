import React from "react";
import evento from "../assets/images/eventos.jpg";
import evento2 from "../assets/images/eventos2.jpg";
import StyledList from "./StyledList";

const Services = () => {
  const tasks = [
    "Registro de Familias",
    "Busqueda de Eventos",
    "Inscipcion en Eventos",
    "Filtrar Eventos por preferencias",
  ];
  return (
    <div className="container-Services">
      <div style={{ padding: "20px" }}>
        <h1>Servicios que Prestamos...</h1>
        <StyledList items={tasks} />
      </div>
      <div className="image-service-container">
        <img src={evento} alt="" className="service-image" />
        <img src={evento2} alt="" className="service-image" />
      </div>
    </div>
  );
};

export default Services;

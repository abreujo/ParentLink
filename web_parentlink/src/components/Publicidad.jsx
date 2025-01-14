import React from "react";
import "../styles/Publicidad.css";
import publiImg from "../assets/images/marcasniños.jpg";

const Publicidad = () => {
  return (
    <div className="publicidad-container">
      {/* Bloque izquierdo */}
      <img src={publiImg} alt="Imagen de ofertas" className="oferta-imagen" />

      {/* Bloque derecho */}
      <div className="publicidad-bloque derecho">
        <h2>Consigue ofertas increíbles con Parentlink</h2>
        <ul>
          <li>Ofertas exclusivas en ropa</li>
          <li>Ahorro de material escolar</li>
          <li>Las mejores marcas para ellos</li>
        </ul>
      </div>
    </div>
  );
};

export default Publicidad;

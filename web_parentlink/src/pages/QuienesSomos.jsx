// HomePage.js
import React from "react";
import "../styles/QuienesSomos.css";
import evento from "../assets/images/imagenevento.jpg";

function QuienesSomos() {
  return (
    <div className="container-quienessomos">
      <div className="image-container">
        <img src={evento} alt="Imagen grande" className="large-image" />
      </div>
      <div className="text-container">
        <p>
          Plataforma Web diseñada para favorecer la co-crianza y el co-cuidado
          infantil a familias con dificultades, con principal énfasis en Madres
          o Padres solteros, incluso permitir la inclusión de familias
          homoparentales, con la finalidad de ayudar a impulsar la natalidad de
          una sociedad envejecida, fortalecer la confianza en un tejido social
          fragmentado y minimizar los altos niveles de pobreza infantil local en
          el país.{" "}
        </p>
      </div>
    </div>
  );
}

export default QuienesSomos;

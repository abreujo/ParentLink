import React from "react";
import "../styles/ParentLink.css"; // Archivo CSS para estilos personalizados

import cocrianza from "../assets/images/cocrianza.jpg";

function ParentLink() {
  return (
    <div className="banner">
      <div className="banner__left">
        <div className="banner-text">
          <p>
            ¡En España <b>uno</b> de cada <b>cuatro</b> niños forman parte de
            una familia monoparental. La mitad de esas familias afirman
            necesitar ayuda parar criar a sus hijos.!
          </p>
        </div>
        <div className="banner-text1">
          <p>...¿Alguna vez has pensado en la co - crianza?</p>
        </div>
      </div>
      <div className="banner-image">
        <img src={cocrianza} />
      </div>
    </div>
  );
}

export default ParentLink;

{
  /* <div className="banner">
<div className="banner-text">
  <h1>
    ¡En España uno de cada cuatro niños forman parte de una familia
    monoparental. La mitad de esas familias afirman necesitar ayuda parar
    criar a sus hijos.!
  </h1>
  <p>...¿Alguna vez has pensado en la co - crianza?</p>
</div>
<div className="banner-image">
  <img src={cocrianza} alt={`${cocrianza}'s photo`} />
</div>
</div> */
}

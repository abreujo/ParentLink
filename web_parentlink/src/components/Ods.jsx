import React from "react";
import ods from "../assets/images/ODSParentLink.jpg";

const Ods = () => {
  return (
    <div className="container-ODS">
      <div style={{ padding: "20px" }}>
        <h1>
          ParentLink contribuye con Objetivos de Desarollo Sostenible ODS...
        </h1>
      </div>
      <div className="image-ODS">
        <img src={ods} alt="" className="Ods-image" />
      </div>
    </div>
  );
};

export default Ods;

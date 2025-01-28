import React, { useState } from "react";
import "../styles/OdsNew.css";
import ods1 from "../assets/images/Ods_1.png";
import ods5 from "../assets/images/Ods_5.png";
import ods8 from "../assets/images/Ods_8.png";
import ods10 from "../assets/images/Ods_10.png";

const Ods = () => {
  const [index, setIndex] = useState(0);

  const testimonios = [
    {
      id: 1,
      subtitle: "Erradicación de la pobreza",
      title: "ODS 1",
      texto:
        "Apoya a familias con recursos limitados al ofrecer una solución accesible para el cuidado infantil.",
      imagen: ods1,
    },
    {
      id: 2,
      title: "ODS 5",
      subtitle: "Igualdad de género",
      texto:
        "Facilita la inserción laboral de mujeres y madres solteras al reducir las barreras relacionadas con el cuidado de los hijos.",
      imagen: ods5,
    },
    {
      id: 3,
      title: "ODS 8",
      subtitle: "Trabajo decente y crecimiento económico",
      texto:
        "Promueve la conciliación laboral y fomenta redes colaborativas que beneficien el desarrollo económico de los hogares.",
      imagen: ods8,
    },
    {
      id: 4,
      title: "ODS 10",
      subtitle: "Reducción de desigualdades",
      texto:
        "Ayuda a colectivos minoritarios en riesgo de exclusión a construir comunidades de apoyo e inclusión.",
      imagen: ods10,
    },
  ];

  // Функція для переходу до наступного тестимоніалу
  const nextTestimonio = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonios.length);
  };

  // Функція для переходу до попереднього тестимоніалу
  const prevTestimonio = () => {
    setIndex(
      (prevIndex) => (prevIndex - 1 + testimonios.length) % testimonios.length
    );
  };

  return (
    <div className="ods-container">
      <h2>
        Vinculación con los
        <br /> ODS
      </h2>
      <div className="ods-wrapper">
        <button onClick={prevTestimonio} className="ods-nav prev">
          &#8249;
        </button>
        <div className="ods">
          {testimonios.slice(index, index + 4).map((testimonio) => (
            <div key={testimonio.id} className="ods-card">
              <img
                src={testimonio.imagen}
                alt={`Testimonio ${testimonio.id}`}
              />
              <p>{testimonio.texto}</p>
            </div>
          ))}
        </div>
        <button onClick={nextTestimonio} className="ods-nav next">
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Ods;

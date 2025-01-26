import React, { useState } from "react";
import "../styles/Carrusel.css";
import imagen1 from "../assets/images/opinion1.jpg";
import imagen2 from "../assets/images/opinion2.jpg";
import imagen3 from "../assets/images/opinion3.jpg";

const Carrusel = () => {
  const [index, setIndex] = useState(0);

  const testimonios = [
    {
      id: 1,
      texto:
        "Gracias a Parentlink, he encontrado una comunidad de padres con los que puedo compartir responsabilidades y apoyo.”",
      imagen: imagen1,
    },
    {
      id: 2,
      texto:
        "¡Una solución increíble! Ahora puedo confiar en otros padres para cuidar a mi hijo cuando necesito un descanso.”",
      imagen: imagen2,
    },
    {
      id: 3,
      texto:
        "Es genial saber que mis hijos están con otros niños y en buenas manos mientras trabajo. ¡Recomiendo Parentlink!",
      imagen: imagen3,
    },
    {
      id: 4,
      texto:
        "Una plataforma segura y confiable para padres solteros. Me da paz saber que mi hija está con personas de confianza.”",
      imagen: imagen1,
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
    <div className="carrusel-container">
      <h2>
        Miles de familias forman parte de nuestra comunidad <br /> ¡Únete!
      </h2>
      <div className="carrusel-wrapper">
        <button onClick={prevTestimonio} className="carrusel-nav prev">
          &#8249;
        </button>
        <div className="carrusel">
          {testimonios.slice(index, index + 3).map((testimonio) => (
            <div key={testimonio.id} className="carrusel-card">
              <img
                src={testimonio.imagen}
                alt={`Testimonio ${testimonio.id}`}
              />
              <p>{testimonio.texto}</p>
              <a href="#leer-mas" className="carrusel-link">
                Leer más
              </a>
            </div>
          ))}
        </div>
        <button onClick={nextTestimonio} className="carrusel-nav next">
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Carrusel;

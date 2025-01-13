import React, { useState } from "react";
import "../styles/Carrusel.css"; // Asegúrate de tener el archivo de estilos

const Carrusel = () => {
  // Array de imágenes para el carrusel
  const images = [
    { src: "/assets/images/image1.jpg", alt: "Imagen 1" },
    { src: "/assets/images/image2.jpg", alt: "Imagen 2" },
    { src: "/assets/images/image3.jpg", alt: "Imagen 3" },
    { src: "/assets/images/image4.jpg", alt: "Imagen 4" },
    { src: "/assets/images/image5.jpg", alt: "Imagen 5" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="carrusel-container">
      {/* Botón de desplazamiento hacia atrás */}
      <button className="carrusel-btn prev" onClick={prevSlide}>
        &#10094;
      </button>

      {/* Contenedor de las imágenes del carrusel */}
      <div className="carrusel-images">
        {images.slice(currentIndex, currentIndex + 3).map((image, index) => (
          <div key={index} className="carrusel-image">
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>

      {/* Botón de desplazamiento hacia adelante */}
      <button className="carrusel-btn next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Carrusel;

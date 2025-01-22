import React from "react";
import Menu from "../components/Menu";
import "../styles/ComoFunciona.css";

// Імпорт зображень
import step1Image from "../assets/images/step1.png";
import step2Image from "../assets/images/step2.png";
import step3Image from "../assets/images/step3.png";
import step4Image from "../assets/images/step4.png";
import step5Image from "../assets/images/step5.png";
import step6Image from "../assets/images/step6.png";
import step7Image from "../assets/images/step7.png";
import heroImage from "../assets/images/hero-image.png"; // Hero зображення
import ctaImage from "../assets/images/cta-image.png"; // CTA зображення

export default function ComoFunciona() {
  const steps = [
    {
      title: "1. Regístrate y comparte tus necesidades",
      description:
        "Regístrate en ParentLink y cuéntanos sobre tus horarios y necesidades de cuidado. Con esta información, encontraremos familias compatibles contigo.",
      image: step1Image,
    },
    {
      title: "2. Encuentra una familia de confianza",
      description:
        "Explora familias cercanas que buscan el mismo apoyo y selecciona la que mejor se adapte a tus necesidades.",
      image: step2Image,
    },
    {
      title: "3. Conoce a la otra familia",
      description:
        "Organiza una reunión inicial para conocerse, hablar y garantizar que todos estén cómodos antes de compartir el cuidado de los niños.",
      image: step3Image,
    },
    {
      title: "4. Comparte el cuidado de los niños",
      description:
        "Cuando todo esté listo, comparte el cuidado de los niños mientras trabajas o disfrutas de tu tiempo personal.",
      image: step4Image,
    },
    {
      title: "5. Total transparencia y seguridad",
      description:
        "Ofrecemos herramientas para registrar entregas y recogidas de los niños, garantizando transparencia y confianza.",
      image: step5Image,
    },
    {
      title: "6. Gana puntos y recompensas",
      description:
        "Cada vez que cuides a los niños de otra familia, acumularás puntos que puedes canjear por recompensas exclusivas.",
      image: step6Image,
    },
    {
      title: "7. Todo lo que necesitas en un solo lugar",
      description:
        "Te ofrecemos servicios adicionales como verificación de identidad y seguimiento de actividades para tu tranquilidad.",
      image: step7Image,
    },
  ];

  return (
    <>
      <Menu />
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Como funciona ParentLink</h1>
          <p className="hero-description">
            La plataforma ideal para compartir el cuidado de tus hijos con otras familias. ¡Fácil, segura y confiable!
          </p>
          <button className="hero-button">Descubre Más</button>
        </div>
        <div className="hero-image-container">
          <img src={heroImage} alt="Hero" className="hero-image" />
        </div>
      </div>

      {/* Steps Section */}
      <div className="how-it-works">
        {steps.map((step, index) => (
          <section className="step" key={index}>
            <div className="step-image">
              <img src={step.image} alt={`Paso ${index + 1}`} />
            </div>
            <div className="step-content">
              <h2>{step.title}</h2>
              <p>{step.description}</p>
            </div>
          </section>
        ))}
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">¿Listo para empezar?</h2>
          <p className="cta-description">
            Regístrate ahora y únete a miles de familias que ya confían en ParentLink.
          </p>
          <button className="cta-button">Regístrate Ahora</button>
        </div>
        <div className="cta-image-container">
          <img src={ctaImage} alt="CTA" className="cta-image" />
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import "../styles/Header.css";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false); // Controla la visibilidad

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true); // Cambia el estado a visible tras 500ms
    }, 500);

    return () => clearTimeout(timeout); // Limpia el timeout si el componente se desmonta
  }, []);

  return (
    <header className="header">
      <h1
        className={`header-title ${
          isVisible ? "visible" : ""
        } patrick-hand-regular`}
      >
        ¿Has pensado alguna vez en la co-crianza?
      </h1>
    </header>
  );
};

export default Header;

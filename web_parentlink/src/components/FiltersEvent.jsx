import React, { useState, useRef, useEffect } from "react";

const Filters = ({ onFilterChange }) => {
  const [activeTag, setActiveTag] = useState(null); // Estado para el botón activo
  const tagRefs = useRef({}); // Referencias a los elementos si las necesitas
  const filterRef = useRef(null); // Ref para el contenedor de filtros (completo)

  // Opciones para cada filtro
  const tagOptions = {
    Ubicación: ["Málaga", "Barcelona", "Madrid", "Sevilla", "Cádiz"],
    Edad: ["0-3", "3-5", "6-9+", "10-12", "12-15", "+16"],
    "Tipo de evento": [
      "Picknick en el parque",
      "Tarde de bolos",
      "Ruta por el bosque",
      "Kayak para todos",
    ],
  };

  // Maneja el clic en los botones principales
  const handleTagClick = (tag) => {
    setActiveTag(activeTag === tag ? null : tag); // Alterna entre abrir/cerrar el menú
  };

  // Maneja la selección de una opción en el menú desplegable
  const handleOptionSelect = (tag, option) => {
    onFilterChange(tag, option); // Notifica al componente padre
    setActiveTag(null); // Cierra el menú desplegable
  };

  // Cierra el menú si se hace clic fuera del contenedor de filtros
  useEffect(() => {
    // Función que detecta clic fuera del componente de filtros
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setActiveTag(null); // Cierra el menú desplegable si se hace clic fuera
      }
    };

    // Añadimos el listener
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiamos el listener cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="tags" ref={filterRef}>
      {Object.keys(tagOptions).map((tag) => (
        <div key={tag} className="tag-container">
          <button
            className={`tag ${activeTag === tag ? "selected" : ""}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
          {activeTag === tag && (
            <ul className="dropdown-menu">
              {tagOptions[tag].map((option) => (
                <li
                  key={option}
                  className="dropdown-option"
                  onClick={() => handleOptionSelect(tag, option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Filters;

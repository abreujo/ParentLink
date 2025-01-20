import React, { useState, useRef } from "react";

const Filters = ({ onFilterChange }) => {
  const [activeTag, setActiveTag] = useState(null); // Estado para el botón activo
  const tagRefs = useRef({}); // Referencias a los elementos si las necesitas

  // Opciones para cada filtro
  const tagOptions = {
    Ubicación: ["Málaga", "Barcelona", "Madrid", "sevilla", "Cádiz"],
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

  return (
    <div className="tags">
      {Object.keys(tagOptions).map((tag) => (
        <div
          key={tag}
          className="tag-container"
          ref={(el) => (tagRefs.current[tag] = el)}
        >
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

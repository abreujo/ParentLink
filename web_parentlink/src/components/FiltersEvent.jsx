import React, { useState, useRef, useEffect } from "react";

const Filters = ({ onFilterChange }) => {
  const [activeTag, setActiveTag] = useState(null);
  const filterRef = useRef(null); // Ref para el contenedor de filtros (completo)
  const [tagOptions, setTagOptions] = useState({
    "Ubicación": [],
    "Edad": ["0-3", "4-6", "6-8", "8-10", "10-12", "+12"],
  });

  async function fetchLocations() {
    const response = await fetch("http://localhost:8081/api/locations");
    const locations = await response.json();
    setTagOptions(prevOptions => ({
      ...prevOptions,
      "Ubicación": locations.map(e => e.name),
    }));
  }

  useEffect(() => {
    fetchLocations();
  }, []);

  // Maneja el clic en los botones principales
  const handleTagClick = (tag) => {
    setActiveTag(activeTag === tag ? null : tag); // Alterna entre abrir/cerrar el menú
  };

 

  const handleOptionSelect = (tag, option) => {
    if (tag === "Ubicación") {
      onFilterChange({ locationName: option }); // Enviar filtro por ubicación
    } else {
      onFilterChange({ [tag]: option }); // Enviar otros filtros si es necesario
    }
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

import React, { useState, useRef, useEffect } from "react";

const Filters = ({ onFilterChange }) => {
  const [activeTag, setActiveTag] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const filterRef = useRef(null);
  const [tagOptions, setTagOptions] = useState({
    Ubicación: [],
    Edad: ["0-3", "4-6", "6-8", "8-10", "10-12", "+12"],
  });

  const token = localStorage.getItem("jwtToken");

  // Fetch para obtener ubicaciones
  async function fetchLocations() {
    const response = await fetch("http://localhost:8081/api/locations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const locations = await response.json();
    setTagOptions((prevOptions) => ({
      ...prevOptions,
      Ubicación: locations.map((e) => e.name),
    }));
  }

  useEffect(() => {
    fetchLocations();
  }, []);

  // Alternar menú desplegable
  const handleTagClick = (tag) => {
    setActiveTag(activeTag === tag ? null : tag);
  };

  // Selección de opciones
  const handleOptionSelect = (tag, option) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [tag]: option,
    }));
    onFilterChange(tag === "Ubicación" ? "locationName" : tag, option);
    setActiveTag(null);
  };

  // Eliminar un filtro específico
  const removeFilter = (tag) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      delete updatedFilters[tag];
      return updatedFilters;
    });
    onFilterChange(tag === "Ubicación" ? "locationName" : tag, null);
  };

  // Resetear todos los filtros
  const resetFilters = () => {
    setSelectedFilters({});
    onFilterChange(null, null);
  };

  // Cerrar menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setActiveTag(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={filterRef}>
      {/* Botones de tags */}
      <div className="tags">
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

      {/* Filtros seleccionados */}
      <div className="selected-filters">
        {Object.entries(selectedFilters).map(([tag, option]) => (
          <div key={tag} className="selected-filter">
            {`${tag}: ${option}`}
            <button
              className="remove-filter-button"
              onClick={() => removeFilter(tag)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;

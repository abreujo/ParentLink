import React, { useState, useEffect, useRef } from "react";
import FiltersEvent from "../components/FiltersEvent"; // Importa tu componente FiltersEvent
import EventList from "../components/EventsList"; // Importa tu componente EventList
import "../styles/EventPage.css"; // Importa el archivo CSS con el fondo

const EventPage = () => {
  const [filters, setFilters] = useState({
    locationName: null,
    Edad: null,
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para el dropdown (si es necesario)

  // Ref para detectar clics fuera del contenedor del dropdown
  const dropdownRef = useRef(null);

  // Maneja los cambios en los filtros
  const handleFilterChange = (tag, option) => {
    console.log(filters, tag, option)
    setFilters((prevFilters) => ({
      ...prevFilters,
      [tag]: option,
    }));
  };

  // Cerrar el dropdown si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Si el clic es fuera del dropdown, cierra el dropdown
        setIsDropdownOpen(false);
      }
    };

    // Escucha el evento de clic fuera de los elementos
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="event-page">
      <h1 className="event-page-title">Únete a Eventos !</h1>
      {/* Filtros en la parte superior */}
      <FiltersEvent
        onFilterChange={handleFilterChange}
        setIsDropdownOpen={setIsDropdownOpen}
        isDropdownOpen={isDropdownOpen}
        dropdownRef={dropdownRef} // Pasamos la ref para el dropdown
      />
      {/* Lista de eventos debajo */}
      <EventList filters={filters} />
    </div>
  );
};

export default EventPage;

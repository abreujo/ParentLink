import React, { useState } from "react";
import FiltersEvent from "../components/FiltersEvent"; // Importa tu componente FiltersEvent
import EventList from "../components/EventsList"; // Importa tu componente EventList

const EventPage = () => {
  const [filters, setFilters] = useState({
    Ubicación: null,
    Edad: null,
    "Tipo de evento": null,
  });

  // Maneja los cambios en los filtros
  const handleFilterChange = (tag, option) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [tag]: option,
    }));
  };

  return (
    <div className="event-page">
      <h1 className="event-page-title">Únete a Eventos !</h1>
      {/* Filtros en la parte superior */}
      <FiltersEvent onFilterChange={handleFilterChange} />
      {/* Lista de eventos debajo */}
      <EventList filters={filters} />
    </div>
  );
};

export default EventPage;

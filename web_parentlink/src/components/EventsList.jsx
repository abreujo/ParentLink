import React, { useEffect, useState } from "react";
import CardEvento from "./CarEventos";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Realizar la solicitud GET a la API
    fetch("http://localhost:8081/api/events")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los eventos");
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data); // Almacenar los eventos en el estado
      })
      .catch((err) => {
        setError(err.message); // Manejo de errores
      });
  }, []); // El array vacío asegura que la solicitud se haga solo una vez

  return (
    // LUEGO DE TENER LA INFORMACION DE TODOS LOS EVENTOS LOS PINTAMOS EN LA TARJETA
    <div>
      <h1 className="titulo-eventos">Proximos Eventos</h1>
      {error && <p>Error: {error}</p>}
      <div className="div-eventos">
        {events.map((event) => (
          <CardEvento
            key={event.id}
            name={event.name}
            descripcion={event.description}
            /* CAMBIAR CUANDO SE TENGA LA IMAGEN CARGADA DE LOS EVENTOS */
            photo={`https://picsum.photos/id/${event.id + 10}/300/200`}
            /* photo={card.photo} */
            rango={event.ageBracket}
            ciudad={`${event.location.name},  ${event.location.country} (Postal Code: `}
            postalcode={`${event.location.postalCode}`}
          />
        ))}
      </div>
    </div>

    //VERIFICAR CODIGO Y LUEGO ELIMINAR, GARANTIZAR EL USO DE TODOS LOS CAMPOS

    /*   <div>
      <h1>Lista de Eventos</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>
              {event.id}
              {event.name}
            </h3>
            <p>
              <strong>Description:</strong> {event.description}
            </p>
            <p>
              <strong>Age Bracket:</strong> {event.ageBracket}
            </p>
            <p>
              <strong>Date:</strong> {new Date(event.date).toLocaleString()}
            </p>
            <p>
              <strong>Location:</strong> {event.location.name},{" "}
              {event.location.country} (Postal Code: {event.location.postalCode}
              )
            </p>
            <img
              src={`https://picsum.photos/id/${event.id + 10}/300/200`}
              alt={event.name}
              width="200"
            />
          </li>
        ))}
      </ul>
    </div> */
  );
};

export default EventList;

// Contactos
import React from "react";
import CardEvento from "../components/CarEventos";

function Eventos() {
  const cardsData = [
    {
      name: "Caminata Playa La Malageta",
      descripcion:
        "Realizar un recorrido de 2 kilometros a lo largo de la playa empezando desde la Malagueta",
      photo: "https://picsum.photos/300/200",
      rango: "Todas las edades",
      ciudad: "Malaga",
    },
    {
      name: "Caminata Playa La Malageta",
      descripcion:
        "Realizar un recorrido de 2 kilometros a lo largo de la playa empezando desde la Malagueta",
      photo: "https://picsum.photos/300/200",
      rango: "Todas las edades",
      ciudad: "Malaga",
    },
    {
      name: "Caminata Playa La Malageta",
      descripcion:
        "Realizar un recorrido de 2 kilometros a lo largo de la playa empezando desde la Malagueta",
      photo: "https://picsum.photos/300/200",
      rango: "Todas las edades",
      ciudad: "Malaga",
    },
    {
      name: "Caminata Playa La Malageta",
      descripcion:
        "Realizar un recorrido de 2 kilometros a lo largo de la playa empezando desde la Malagueta",
      photo: "https://picsum.photos/300/200",
      rango: "Todas las edades",
      ciudad: "Malaga",
    },
  ];

  return (
    <div>
      <h1 className="titulo-eventos">Proximos Eventos</h1>
      <div className="div-eventos">
        {cardsData.map((card, index) => (
          <CardEvento
            key={index}
            name={card.name}
            descripcion={card.descripcion}
            /* CAMBIAR CUANDO SE TENGA LA IMAGEN CARGADA DE LOS EVENTOS */
            photo={`https://picsum.photos/id/${index + 10}/300/200`}
            /* photo={card.photo} */
            rango={card.rango}
            ciudad={card.ciudad}
          />
        ))}
      </div>
    </div>
  );
}

export default Eventos;

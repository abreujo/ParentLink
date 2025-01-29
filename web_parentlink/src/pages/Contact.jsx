// Contactos
import React from "react";
import CardContac from "../components/CardContac";
import pacco from "../assets/images/Pacco.png";
import myroslav from "../assets/images/Myroslav.png";
import david from "../assets/images/David.png";
import johel from "../assets/images/Johel.jpg";
import UserDetailsEntorno from "../components/UserDetailsEntorno";

function Contact() {
  const cardsData = [
    {
      name: "Pacco Gago",
      title: "LinkedIN: @paco-gago",
      email: "pacco@example.com",
      phone: "+34 621 35 90 53",
      photo: pacco,
    },
    {
      name: "Myroslav Palko",
      title: "LinkedIN: @myroslav-palko",
      email: "myropalko@gmail.com",
      phone: "+34 675 83 79 47",
      photo: myroslav,
    },
    {
      name: "David Arrabal",
      title: "LinkedIN: @davidarrabal",
      email: "david.arrabal92@gmail.com",
      phone: "+34 672 30 88 27",
      photo: david,
    },
    {
      name: "Gylmer Johel",
      title: "LinkedIN: @johel-abreu",
      email: "johel.abreu@gmail.com",
      phone: "+34 613 290 849",
      photo: johel,
    },
  ];

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {cardsData.map((card, index) => (
        <CardContac
          key={index}
          name={card.name}
          title={card.title}
          email={card.email}
          phone={card.phone}
          photo={card.photo}
        />
      ))}
      {/* Ejemplo de uso de las variables de contexto y mostrar el JSON
      <UserDetailsEntorno></UserDetailsEntorno> */}
    </div>
  );
}

export default Contact;

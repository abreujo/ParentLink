// Contactos
import React from "react";
import CardContac from "../components/CardContac";
import pacco from "../assets/images/Pacco.png";
import myroslav from "../assets/images/myroslav.png";
import david from "../assets/images/david.png";
import johel from "../assets/images/johel.jpg";
import milagros from "../assets/images/milagros.jpg";

function Contact() {
  const cardsData = [
    {
      name: "Pacco",
      title: "Desarrollador Web",
      email: "Pacco@example.com",
      phone: "+34 123 456 789",
      photo: pacco,
    },
    {
      name: "Myroslav Palko",
      title: "Diseñador Gráfico",
      email: "Myroslav@example.com",
      phone: "+34 987 654 321",
      photo: myroslav,
    },
    {
      name: "David",
      title: "Marketing Digital",
      email: "valeria@example.com",
      phone: "+34 456 789 123",
      photo: david,
    },
    {
      name: "Gylmer Johel",
      title: "Asesor",
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
    </div>
  );
}

export default Contact;

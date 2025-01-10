import React from "react";
import "../styles/StyledList.css"; // Archivo CSS para los estilos

const StyledList = ({ items }) => {
  return (
    <ul className="styled-list">
      {items.map((item, index) => (
        <li key={index} className="styled-list-item">
          <span className="list-icon">✔️</span>
          <span className="list-text">{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default StyledList;

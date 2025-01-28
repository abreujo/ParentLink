import React from "react";
import "../styles/DevelopmentResources.css";
import reactLogo from "../assets/images/react-logo.png";
import htmlLogo from "../assets/images/html-logo.png";
import cssLogo from "../assets/images/css-logo.png";
import jsLogo from "../assets/images/js-logo.png";
import springBootLogo from "../assets/images/springboot-logo.png";
import mysqlLogo from "../assets/images/mysql-logo.png";
import postmanLogo from "../assets/images/postman-logo.png";

const DevelopmentResources = () => {
  const frontendTools = [
    { name: "React (para el desarrollo del frontend)", logo: reactLogo },
    { name: "HTML (estructura del contenido)", logo: htmlLogo },
    { name: "CSS (diseño y estilos)", logo: cssLogo },
    { name: "JavaScript (funcionalidad y lógica del cliente)", logo: jsLogo },
  ];

  const backendTools = [
    { name: "Spring Boot (framework para el backend)", logo: springBootLogo },
    { name: "MySQL (gestión de la base de datos)", logo: mysqlLogo },
    { name: "Postman (herramienta para pruebas de API)", logo: postmanLogo },
  ];

  return (
    <div className="resources-container">
      <h2 className="resources-title">
        Recursos Utilizados para el Desarrollo
      </h2>

      <div className="resources-section">
        <h3 className="resources-subtitle">Frontend</h3>
        <ul className="resources-list">
          {frontendTools.map((tool, index) => (
            <li key={index} className="resource-item">
              <img
                src={tool.logo}
                alt={`${tool.name} logo`}
                className="resource-logo"
              />
              <span>{tool.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="resources-section">
        <h3 className="resources-subtitle">Backend</h3>
        <ul className="resources-list">
          {backendTools.map((tool, index) => (
            <li key={index} className="resource-item">
              <img
                src={tool.logo}
                alt={`${tool.name} logo`}
                className="resource-logo"
              />
              <span>{tool.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DevelopmentResources;

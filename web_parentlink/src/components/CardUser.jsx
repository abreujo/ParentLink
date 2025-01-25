import React, { useEffect, useState } from "react";
import fetchWithAuth from "../utils/fetchWithAuth";
import { useAuth } from "../contex/AuthContext";
import "../styles/CardUser.css";
import userIcon from "../assets/images/userIcon.png";
import { useNavigate } from "react-router-dom";

const CardUser = () => {
  const [userData, setUserData] = useState(null);
  const [childrenList, setChildrenList] = useState([]); // Estado para los hijos
  const { userId, token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithAuth(
          `http://localhost:8081/api/usersystem/${userId}`,
          token
        );
        const data = await response.json();
        setUserData(data);
        setChildrenList(data.user.childrenList || []); // Actualiza el estado de los hijos
        // Debugger
        console.log("data as JSON:", JSON.stringify(data, null, 2));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId, token]);

  const handleAddChild = (newChild) => {
    setChildrenList((prevChildren) => [...prevChildren, newChild]); // Agregar un nuevo hijo
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { username, user } = userData;

  if (!user) {
    // Mostrar tarjeta solo con datos de UserSystem
    return (
      <div className="user-card">
        <div className="card">
          {/* Imagen del usuario */}
          <img src={userIcon} alt="User Icon" className="user-icon" />
          {/* Nombre del usuario */}
          <div className="card-header">
            <h3>{username}</h3>
          </div>
          <div className="card-body">
            <p>
              <strong>Información:</strong> Aun no ha completado el registro de
              sus datos.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Datos del usuario si existen
  const { id, name, surname, email, phone, location, age, gender } = user;

  return (
    <div className="user-card">
      <div className="card">
        {/* Imagen del usuario */}
        <img src={userIcon} alt="User Icon" className="user-icon" />
        {/* Nombre del usuario */}
        <div className="card-header">
          <h3>
            {name} {surname}
          </h3>
          <p>{username}</p>
        </div>
        <div className="card-body">
          <p>
            <strong>Correo:</strong> {email}
          </p>
          <p>
            <strong>Teléfono:</strong> {phone}
          </p>
          <p>
            <strong>Edad:</strong> {age}
          </p>
          <p>
            <strong>Género:</strong> {gender}
          </p>
          <p>
            <strong>Ubicación:</strong> {location.name}, {location.country} (
            {location.postalCode})
          </p>
        </div>
        <div className="card-footer">
          <p>
            <strong>Registrar hijos</strong>
          </p>
          {childrenList && childrenList.length > 0 && (
            <div>
              <h4>Hijos:</h4>
              <ul>
                {childrenList.map((child) => (
                  <li key={child.id}>
                    {child.name} - {child.age} años ({child.gender})
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Botón para agregar un hijo */}
          <button
            onClick={() =>
              handleAddChild({
                id: Date.now(), // Generar un id único
                name: "Nuevo Hijo",
                age: 5,
                gender: "MALE",
              })
            }
          >
            Agregar hijo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardUser;

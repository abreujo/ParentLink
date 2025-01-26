import React, { useEffect, useState } from "react";
import fetchWithAuth from "../utils/fetchWithAuth";
import { useAuth } from "../contex/AuthContext";
import "../styles/CardUser.css";
import userIcon from "../assets/images/userIcon.png";
import { useNavigate } from "react-router-dom";
import ChildRegistrationFormNew from "./ChildResitrationFormNew";

const CardUser = () => {
  const [userData, setUserData] = useState(null);
  const { userId, token, idUser, updateIdUser } = useAuth();
  const navigate = useNavigate();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetchWithAuth(
        `http://localhost:8081/api/usersystem/${userId}`,
        token
      );
      const data = await response.json();

      setUserData(data);
      // Debugger
      console.log(
        "CardUser buscar datos de usuario:",
        JSON.stringify(data, null, 2)
      );
      console.log(
        "identificardo de usuario de Tabla Usuario a guardar en variable de entorno..: " +
          data.user.id
      );

      if (data.user) {
        updateIdUser(data.user.id);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, token]);

  const toggleForm = () => {
    navigate("/me/edit");
  };

  const onChildRegistered = () => {
    // Función que se llama después de registrar un hijo
    fetchData(); // Volver a obtener los datos del usuario, incluidos los hijos
  };

  const childForm = () => {
    setIsFormVisible(true); // Mostrar el formulario al hacer clic en "Registrar Hijo"
  };

  const closeForm = () => {
    setIsFormVisible(false); // Cerrar el formulario
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
            <button className="complet-perfil-button" onClick={toggleForm}>
              Completar Perfil
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Datos del usuario si existen
  const {
    id,
    name,
    surname,
    email,
    phone,
    location,
    age,
    gender,
    childrenList,
  } = user;

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
          <button className="reg-child-button" onClick={childForm}>
            Registrar Hijo
          </button>
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
        </div>
      </div>
      {isFormVisible && (
        <ChildRegistrationFormNew
          onClose={closeForm}
          onChildRegistered={onChildRegistered}
        />
      )}
    </div>
  );
};

export default CardUser;

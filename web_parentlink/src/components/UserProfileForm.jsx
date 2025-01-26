import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserProfileForm.css";
import { useAuth } from "../contex/AuthContext"; // Importa el contexto
import fetchWithAuth from "../utils/fetchWithAuth";

const UserProfileForm = () => {
  const navigate = useNavigate();
  const { userId, token } = useAuth(); // Obtén userId y token del contexto

  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    location: { postalCode: "" },
    children: false,
    userSystemId: null,
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Asigna el userId al campo userSystemId cuando esté disponible
  useEffect(() => {
    if (userId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        userSystemId: userId,
      }));
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        [name]: value,
      },
    });
  };

  const handleChildrenChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      children: value === "true",
      numberOfChildren: value === "true" ? formData.numberOfChildren : 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        throw new Error(
          "Token no disponible. Por favor, inicia sesión nuevamente."
        );
      }

      const response = await fetchWithAuth(
        "http://localhost:8081/api/users/without-children", // URL de tu API
        token, // Pasa el token como argumento
        {
          method: "POST",
          headers: { "Content-Type": "application/json" }, // Headers adicionales
          body: JSON.stringify(formData), // Convierte formData a JSON
        }
      );

      //Debugger
      console.log("UserProfileFrom..:  " + JSON.stringify(formData));

      if (response.ok) {
        navigate("/me");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error al guardar los datos.");
      }
    } catch (error) {
      setErrorMessage("Error al conectarse con el servidor.");
      console.log("Probando el envio de datos para registro del usuario");
    }
  };

  return (
    <div className="user-profile-page">
      <form className="user-profile-form" onSubmit={handleSubmit}>
        <h2>Información del Usuario</h2>

        <div className="profile-form-group">
          <label htmlFor="surname">Apellido:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="profile-form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="profile-form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="profile-form-group">
          <label htmlFor="phone">Teléfono:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="profile-form-group">
          <label htmlFor="dateOfBirth">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className="profile-form-group">
          <label htmlFor="gender">Género:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar</option>
            <option value="MALE">Masculino</option>
            <option value="FEMALE">Femenino</option>
            <option value="OTHER">Otro</option>
          </select>
        </div>

        <div className="profile-form-group">
          <label htmlFor="postalCode">Código Postal:</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.location.postalCode}
            onChange={handleLocationChange}
            required
          />
        </div>

        {errorMessage && (
          <p className="profile-error-message">{errorMessage}</p>
        )}

        <button type="submit" className="profile-submit-button">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;

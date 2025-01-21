import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserProfileForm.css";

const UserProfileForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    password: "", // Пароль повернуто
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    location: { postalCode: "", name: "", country: "" },
    children: false,
    numberOfChildren: 0,
  });

  const [errorMessage, setErrorMessage] = useState("");

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
      const response = await fetch("http://localhost:8081/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/home-login");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error al guardar los datos.");
      }
    } catch (error) {
      setErrorMessage("Error al conectarse con el servidor.");
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
          <label htmlFor="password">Contraseña (opcional):</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
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
          <label>¿Tiene hijos?</label>
          <select
            name="children"
            value={formData.children}
            onChange={handleChildrenChange}
            required
          >
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>

        {formData.children && (
          <div className="profile-form-group">
            <label htmlFor="numberOfChildren">Número de hijos:</label>
            <input
              type="number"
              id="numberOfChildren"
              name="numberOfChildren"
              min="1"
              value={formData.numberOfChildren}
              onChange={handleChange}
              required
            />
          </div>
        )}

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

        <div className="profile-form-group">
          <label htmlFor="nameLocation">Ciudad:</label>
          <input
            type="text"
            id="nameLocation"
            name="name"
            value={formData.location.name}
            onChange={handleLocationChange}
            required
          />
        </div>

        <div className="profile-form-group">
          <label htmlFor="country">País:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.location.country}
            onChange={handleLocationChange}
            required
          />
        </div>

        {errorMessage && <p className="profile-error-message">{errorMessage}</p>}

        <button type="submit" className="profile-submit-button">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;

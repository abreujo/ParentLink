import React, { useState } from "react";
import { useAuth } from "../contex/AuthContext";
import { useEffect } from "react";

const CreateEventForm = ({ onFormSuccess }) => {
  const { userId, token } = useAuth();
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    ageBracket: "",
    date: "",
    postalCode: "",
    userSystemId: null,
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      userSystemId: userId,
    }));
  }, [userId]); // Ejecuta el efecto solo cuando `userId` cambia.

  // Estado para mensajes de éxito o error
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (
      !formData.name ||
      !formData.description ||
      !formData.date ||
      !formData.postalCode
    ) {
      setErrorMessage("Por favor, complete todos los campos obligatorios.");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      //Debugger
      console.log(
        "Envio de Datos para Creacion de Eventos..:  " +
          JSON.stringify(formData)
      );
      if (response.ok) {
        setSuccessMessage("¡Evento creado con éxito!");
        onFormSuccess();
        setErrorMessage("");
        setFormData({
          name: "",
          description: "",
          image: "",
          ageBracket: "",
          date: "",
          postalCode: "",
        });
      } else {
        const errorData = await response.json(); // Intentar leer la respuesta del servidor
        setErrorMessage(
          errorData.message ||
            `Error: ${response.status} - ${response.statusText}`
        );
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setErrorMessage("Error de conexión: " + error.message);
      setSuccessMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre del Evento:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          maxLength="100"
          required
        />
      </div>

      <div>
        <label>Descripcion del Evento:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          maxLength="500"
          required
        ></textarea>
      </div>

      <div>
        <label>Imagen URL:</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Rango de Edad de Hijos para el Evento:</label>
        <select
          name="ageBracket"
          value={formData.ageBracket}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione el Rango</option>
          <option value="0-3">0-3</option>
          <option value="4-6">4-6</option>
          <option value="6-8">6-8</option>
          <option value="8-10">8-10</option>
          <option value="10-12">10-12</option>
          <option value="+12">+12</option>
        </select>
      </div>

      <div>
        <label>Fecha del Evento:</label>
        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Codigo Postal:</label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          required
        />
      </div>

      {/* Mostrar mensajes de error o éxito */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <button type="submit">Crear Evento</button>
    </form>
  );
};

export default CreateEventForm;

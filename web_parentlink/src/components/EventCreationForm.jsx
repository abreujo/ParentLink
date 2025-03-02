import React, { useState } from "react";

const CreateEventForm = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    ageBracket: "",
    date: "",
    postalCode: "",
  });

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
    if (!formData.name || !formData.description || !formData.date || !formData.postalCode) {
      setErrorMessage("Por favor, complete todos los campos obligatorios.");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    
      if (response.ok) {
        setSuccessMessage("¡Evento creado con éxito!");
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
        setErrorMessage(errorData.message || `Error: ${response.status} - ${response.statusText}`);
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
        <label>Event Name:</label>
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
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          maxLength="500"
          required
        ></textarea>
      </div>

      <div>
        <label>Image URL:</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Age Bracket:</label>
        <select
          name="ageBracket"
          value={formData.ageBracket}
          onChange={handleChange}
          required
        >
          <option value="">Select an age group</option>
          <option value="0-3">6-8</option>
          <option value="4-6">9-12</option>
          <option value="6-8">13-18</option>
          <option value="8-10">13-18</option>
          <option value="10-12">13-18</option>
          <option value="+12">13-18</option>
        </select>
      </div>

      <div>
        <label>Event Date:</label>
        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Postal Code:</label>
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

      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEventForm;

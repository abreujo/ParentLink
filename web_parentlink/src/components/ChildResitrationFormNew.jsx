import React, { useState } from "react";
import { useAuth } from "../contex/AuthContext";

const ChildRegistrationFormNew = ({ onClose, onChildRegistered }) => {
  const { token, idUser } = useAuth(); // Usa el token y userId desde el contexto
  const [formData, setFormData] = useState({
    userId: idUser || "", // Default to userId from context
    dateOfBirth: "",
    gender: "",
    name: "",
  });

  //Debugger
  console.log("ChildRegistrationFrom Variable entorno idUser.: " + idUser);
  console.log("informacion de formData..:  " + JSON.stringify(formData));

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Usar setErrorMessage
    setSuccessMessage("");

    if (!formData.name.trim() || !formData.dateOfBirth || !formData.gender) {
      setErrorMessage("Todos los campos son obligatorios.");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/children", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // Include the token
        },
        body: JSON.stringify(formData),
      });
      //Debugger
      console.log(
        "Datos enviados para el registro de Children..:  " +
          JSON.stringify(formData)
      );
      if (!response.ok) {
        throw new Error("Failed to register child");
        //Debugger
        console.log(
          "Fallo en Registro datos enviados..: " + JSON.stringify(formData)
        );
      }

      setSuccessMessage("Se Registro el hijo satisfactoriamente!"); // Usar setSuccessMessage
      //Debugger
      console.log("Registro satisfactorio");

      setFormData({
        //userId: userId || "",
        dateOfBirth: "",
        gender: "",
        name: "",
      });

      // Llamamos a la función onChildRegistered para actualizar la lista de hijos en CardUser
      if (onChildRegistered) {
        onChildRegistered(); // Actualizar la información de los hijos en CardUser
      }

      // Cerramos el formulario
      if (onClose) {
        onClose();
      }
      //await refreshUserData(); //FUNCION PARA RENDERIZAR CARUSER
    } catch (err) {
      setErrorMessage(err.message || "An error occurred. Please try again."); // Usar setErrorMessage
      //Debugger
      console.log(
        "ChildRegistrarioForm ...ERROR DE REGISTRO..: " +
          JSON.stringify(formData)
      );
    }
  };

  return (
    <div className="registration-formChil-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <button className="close-button" type="button" onClick={onClose}>
          ✖
        </button>
        <h2>Registrar Hijo</h2>

        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
          <label htmlFor="gender">Género:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar Género</option>
            <option value="MALE">Masculino</option>
            <option value="FEMALE">Femenino</option>
          </select>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button className="submit-button" type="submit">
          Registrar Hijo
        </button>
      </form>
    </div>
  );
};

export default ChildRegistrationFormNew;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Імпорт useNavigate
import "../styles/RegistrationForm.css";
import { useAuth } from "../contex/AuthContext";

function RegistrationForm({ onClose }) {
  const navigate = useNavigate(); // Ініціалізація useNavigate
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { performLogin } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      setErrorMessage("El nombre de usuario es obligatorio");
      setSuccessMessage("");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8081/api/usersystem/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();

        //debugger
        console.log(
          JSON.stringify({
            username: formData.username,
            password: formData.password,
          })
        );

        setSuccessMessage("Usuario registrado con éxito");
        setErrorMessage("");

        //Despues de hacer el registro del UserSystem se realiza el login para poder registrar el User
        await performLogin(
          formData.username,
          formData.password,
          setErrorMessage
        );

        //Se limpian las variables
        //setFormData({ username: "", password: "", confirmPassword: "" });

        navigate("/me/edit");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error al registrar usuario");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error while sending data:", error);
      setErrorMessage("Error en el servidor");
      setSuccessMessage("");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="registration-form-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <button className="close-button" type="button" onClick={onClose}>
          ✖
        </button>
        <h2>Registro</h2>
        <div className="form-group">
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group password-group">
          <label htmlFor="password">Contraseña:</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="show-password-button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>

        <div className="form-group password-group">
          <label htmlFor="confirmPassword">Confirmación de contraseña:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button className="submit-button" type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;

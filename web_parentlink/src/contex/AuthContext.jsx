import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const navigate = useNavigate();

  // Función para iniciar sesión
  const login = (newToken, newUserId) => {
    setToken(newToken);
    setUserId(newUserId);

    // Guardar el token y el ID del usuario en localStorage
    localStorage.setItem("jwtToken", newToken);
    localStorage.setItem("userId", newUserId);
  };

  // Función para cerrar sesión
  const logout = () => {
    setToken(null);
    setUserId(null);

    // Eliminar el token y el ID del usuario de localStorage
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");

    //se envia al login
    //navigate("/login");
  };

  // Función para realizar el login desde cualquier parte
  const performLogin = async (
    username,
    password,
    setErrorMessage,
    registro
  ) => {
    try {
      const response = await fetch(
        "http://localhost:8081/api/usersystem/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        login(data.token, data.userId); // Guardar token e ID en el contexto
        navigate("/me"); // Navegar al dashboard o página principal
        //Debuger
        console.log(
          "hago login y ya tengo el token..> " +
            data.token +
            "  UserId..: " +
            data.userId
        );
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error al iniciar sesión");
        logout(); // Asegurarse de que no haya datos residuales
      }
    } catch (error) {
      console.error("Error while sending data:", error);
      setErrorMessage("Error en el servidor");
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, userId, login, logout, performLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

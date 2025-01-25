import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || null
  );
  const navigate = useNavigate();

  // Función para iniciar sesión
  const login = (newToken, newUserId, newUsername) => {
    setToken(newToken);
    setUserId(newUserId);
    setUsername(newUsername);

    // Guardar en localStorage
    localStorage.setItem("jwtToken", newToken);
    localStorage.setItem("userId", newUserId);
    localStorage.setItem("username", newUsername); // Guardar el username

    //Debugger
    console.log(
      "Login" +
        "jwtToken..: " +
        newToken +
        " UserId..: " +
        newUserId +
        " UserName..: " +
        newUsername
    );
  };

  // Función para cerrar sesión
  const logout = () => {
    setToken(null);
    setUserId(null);
    setUsername(null);

    // Eliminar del localStorage
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");

    // Redirigir al login (opcional)
    navigate("/");
  };

  // Función para realizar el login desde cualquier parte
  const performLogin = async (username, password, setErrorMessage) => {
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
        login(data.token, data.userId, username); // Guardar el token, ID y username en el contexto
        //Debugger
        console.log(
          "performLogin" +
            "jwtToken..: " +
            data.token +
            " UserId..: " +
            data.userId +
            " UserName..: " +
            username
        );
        console.log(data);

        navigate("/me"); // Navegar al dashboard o página principal
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error al iniciar sesión");
        logout(); // Asegurarse de que no haya datos residuales
      }
    } catch (error) {
      //Debugger
      console.error("Error while sending data:", error);
      setErrorMessage("Error en el servidor");
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, userId, username, login, logout, performLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

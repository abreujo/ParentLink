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
  const [idUser, setIdUser] = useState(localStorage.getItem("idUser") || null);
  const navigate = useNavigate();

  // Función para iniciar sesión
  const login = (newToken, newUserId, newUsername, newidUser) => {
    setToken(newToken);
    setUserId(newUserId);
    setUsername(newUsername);
    setIdUser(newidUser);

    // Guardar en localStorage
    localStorage.setItem("jwtToken", newToken);
    localStorage.setItem("userId", newUserId);
    localStorage.setItem("username", newUsername); // Guardar el username
    localStorage.setItem("idUser", newidUser); // Guardar el username

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
    setIdUser(null); // Limpiar idUser

    // Eliminar del localStorage
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("idUser");

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
        console.log("Se envia hacer login con el username..:  " + username);
        console.log("Data en PerformLogin..: " + JSON.stringify(data));
        console.log(
          "performLogin" +
            "jwtToken..: " +
            data.token +
            " UserId..: " +
            data.userId +
            " UserName..: " +
            username
        );

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

  // Nueva función para actualizar idUser
  const updateIdUser = (newIdUser) => {
    setIdUser(newIdUser); // Actualizar el estado
    localStorage.setItem("idUser", newIdUser); // Guardar en localStorage
    console.log("idUser actualizado en AuthContext..:  ", newIdUser);
  };

  //Funcion para renderizar automarico la tarjeta de usuario
  /* const refreshUserData = async () => {
    //Debugger
    console.log("Auth Contex - refresUserData..:  " + updatedUserData);
    try {
      const response = await fetchWithAuth(
        `http://localhost:8081/api/usersystem/${userId}`,
        token
      );
      const updatedUserData = await response.json();
      setUserData(updatedUserData); // Actualiza el estado global
      //Debugger
      console.log("Auth Contex - refresUserData..:  " + updatedUserData);
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  }; */

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        username,
        idUser,
        login,
        logout,
        performLogin,
        updateIdUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

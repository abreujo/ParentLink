import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || null);

  // Función para iniciar sesión
  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("jwtToken", newToken); // Guardar el token en localStorage
  };

  // Función para cerrar sesión
  const logout = () => {
    setToken(null);
    localStorage.removeItem("jwtToken"); // Eliminar el token de localStorage
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

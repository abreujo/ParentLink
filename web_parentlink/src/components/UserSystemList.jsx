import React, { useEffect, useState } from "react";

const UserSystemList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hacer la solicitud GET a la API
    fetch("http://localhost:8081/api/usersystem/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data); // Almacenar los usuarios en el estado
      })
      .catch((err) => {
        setError(err.message); // Manejo de errores
      });
  }, []); // El array vacío asegura que la solicitud se haga solo una vez

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            ID: {user.id} - Username: {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSystemList;

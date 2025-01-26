import React, { useState, useEffect } from "react";

const UserDetails = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8081/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Datos recibidos:", data); // Verifica si los datos están llegando
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  // Debuger
  console.log("UserDetail..:" + userData);

  if (isLoading) {
    return <div>Cargando datos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>No se encontraron datos del usuario.</div>;
  }

  return (
    <div>
      <h1>Detalles del Usuario</h1>
      {userData && userData.length > 0 ? (
        userData.map((user, index) => (
          <div key={index}>
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Apellido:</strong> {user.surname}
            </p>
            <p>
              <strong>Nombre:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Teléfono:</strong> {user.phone}
            </p>
            <p>
              <strong>Fecha de nacimiento:</strong> {user.dateOfBirth}
            </p>
            <p>
              <strong>Género:</strong> {user.gender}
            </p>
            <p>
              <strong>Localización:</strong>{" "}
              {user.location
                ? `${user.location.name}, ${user.location.country} (${user.location.postalCode})`
                : "Información no disponible"}
            </p>
            <p>
              <strong>Hijos:</strong> {user.children ? "Sí" : "No"}
            </p>
            {user.children && (
              <>
                <p>
                  <strong>Número de hijos:</strong> {user.numberOfChildren}
                </p>
                <h2>Detalles de los hijos</h2>
                <ul>
                  {user.childrenList?.map((child) => (
                    <li key={child.id}>
                      <p>
                        <strong>Nombre:</strong> {child.name}
                      </p>
                      <p>
                        <strong>Edad:</strong> {child.age}
                      </p>
                      <p>
                        <strong>Fecha de nacimiento:</strong>{" "}
                        {child.dateOfBirth}
                      </p>
                      <p>
                        <strong>Género:</strong> {child.gender}
                      </p>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <p>
              <strong>Tipo de usuario:</strong> {user.userType}
            </p>
            <p>
              <strong>Edad:</strong> {user.age}
            </p>
          </div>
        ))
      ) : (
        <p>No se encontraron datos del usuario.</p>
      )}
    </div>
  );
};

export default UserDetails;

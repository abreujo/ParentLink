import React, { useEffect, useState } from "react";
import fetchWithAuth from "../utils/fetchWithAuth";
import { useAuth } from "../contex/AuthContext";

const UserDetailsEntorno = () => {
  const { token } = useAuth(); // Obtener el token del contexto
  const [data, setData] = useState(null);
  console.log(token);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchWithAuth(
          "http://localhost:8081/api/users",
          token
        );
        setData(await result.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]); // Solo se ejecuta cuando el token cambia

  return (
    <div>
      <h1>User Details</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default UserDetailsEntorno;

import React, { useEffect, useState } from "react";
import fetchWithAuth from "../utils/fetchWithAuth";
import { useAuth } from "../contex/AuthContext";
import "../styles/CardUser.css";
import userIcon from "../assets/images/userIcon.png";
import { useNavigate } from "react-router-dom";
import ChildRegistrationFormNew from "./ChildResitrationFormNew";
import { toast } from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Asegúrate de configurar el elemento raíz

const CardUser = () => {
  const [userData, setUserData] = useState(null);
  const { userId, token, idUser, updateIdUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  const fetchData = async () => {
    try {
      const response = await fetchWithAuth(
        `http://localhost:8081/api/usersystem/${userId}`,
        token
      );
      const data = await response.json();

      setUserData(data);
      // Debugger
      console.log(
        "CardUser buscar datos de usuario:",
        JSON.stringify(data, null, 2)
      );
      console.log(
        "identificardo de usuario de Tabla Usuario a guardar en variable de entorno..: " +
          data.user.id
      );

      if (data.user) {
        updateIdUser(data.user.id);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, token]);

  const toggleForm = () => {
    navigate("/me/edit");
  };

  const onChildRegistered = () => {
    // Función que se llama después de registrar un hijo
    fetchData(); // Volver a obtener los datos del usuario, incluidos los hijos
  };

  const childForm = () => {
    setIsFormVisible(true); // Mostrar el formulario al hacer clic en "Registrar Hijo"
    //Debbuger
    console.log("Se envia a mostrar el Formulario de Registro de un hijo");
  };

  const closeForm = () => {
    setIsFormVisible(false); // Cerrar el formulario
  };

  //Funcion para eliminar un hijo
  const deleteChild = async (childId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/children/${childId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        //Debbuger
        console.log(`Hijo con ID ${childId} eliminado.`);
        fetchData(); // Actualiza los datos del usuario para reflejar la eliminación
      } else {
        console.error("Error al eliminar al hijo:", response.statusText);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud de eliminación:", error);
    }
  };

  // Abre el modal de confirmación de baja
  const openModal = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Para un desplazamiento suave
    });
    setIsModalOpen(true);
  };

  // Cierra el modal de confirmación de baja
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/users/${idUser}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Usuario eliminado correctamente.");
        // Redirigir al usuario a la página de inicio o de registro
        toast.success("Se ha dado Baja correctamente de ParentLink");
        logout();
        navigate("/");
      } else {
        toast.success(
          "No se pudo eliminar el usuario. Por favor, inténtalo de nuevo."
        );
        console.error("Error al eliminar el usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud de eliminación:", error);
    }
    closeModal(); // Cierra el modal después de la acción
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { username, user } = userData;

  if (!user) {
    // Mostrar tarjeta solo con datos de UserSystem
    return (
      <div className="user-card">
        <div className="card">
          {/* Imagen del usuario */}
          <img src={userIcon} alt="User Icon" className="user-icon" />
          {/* Nombre del usuario */}
          <div className="card-header">
            <h3>{username}</h3>
          </div>
          <div className="card-user-body">
            <p>
              <strong>Información:</strong> Aun no ha completado el registro de
              sus datos.
            </p>
            <button className="complet-perfil-button" onClick={toggleForm}>
              Completar Perfil
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Datos del usuario si existen
  const {
    id,
    name,
    surname,
    email,
    phone,
    location,
    age,
    gender,
    childrenList,
  } = user;

  return (
    <div className="user-card">
      <div className="card">
        {/* Imagen del usuario */}
        <img src={userIcon} alt="User Icon" className="user-icon" />
        {/* Nombre del usuario */}
        <div className="card-header">
          <h3>
            {name} {surname}
          </h3>
          <p>{username}</p>
        </div>
        <div className="card-body">
          <p>
            <strong>Correo:</strong> {email}
          </p>
          <p>
            <strong>Teléfono:</strong> {phone}
          </p>
          <p>
            <strong>Edad:</strong> {age}
          </p>
          <p>
            <strong>Género:</strong> {gender}
          </p>
          <p>
            <strong>Ubicación:</strong> {location.name}, {location.country} (
            {location.postalCode})
          </p>
        </div>
        <div className="card-children-footer">
          <button className="reg-child-button" onClick={childForm}>
            Registrar Hijo
          </button>
          {childrenList && childrenList.length > 0 && (
            <div>
              <h4>Hijos:</h4>
              <ul className="children-list">
                {childrenList.map((child) => (
                  <li key={child.id} className="child-item">
                    <span className="child-icon">👶</span>
                    <span className="child-info">
                      <strong>{child.name}</strong> - {child.age} años (
                      {child.gender})
                    </span>
                    <button
                      className="cardUser-delete-child"
                      onClick={() => deleteChild(child.id)}
                    >
                      x
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button className="delete-account-button" onClick={openModal}>
          Darse de Baja <span className="button-subtext">ParentLink</span>
        </button>{" "}
      </div>
      {isFormVisible && (
        <ChildRegistrationFormNew
          onClose={closeForm}
          onChildRegistered={onChildRegistered}
        />
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmar Baja"
        overlayClassName="react-modal-overlay" // Clase para el overlay
        className="react-modal-content" // Clase para el contenido del modal
      >
        <h2>¿Estás seguro de que deseas darte de baja?</h2>
        <div className="button-container">
          <button className="modal-button" onClick={closeModal}>
            Cancelar
          </button>
          <button className="modal-button" onClick={deleteUser}>
            Sí, darme de baja
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CardUser;

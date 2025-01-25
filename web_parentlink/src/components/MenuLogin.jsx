import { NavLink, useNavigate } from "react-router-dom";
import "../styles/MenuLogin.css";
import letras from "../assets/images/letrasparentlink.png";
import logo from "../assets/images/logoparentlinkdefinitivo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../contex/AuthContext";

const MenuLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtener la función login del contexto
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="menu">
      <div className="menu-left">
        <div className="menu-logo-container">
          <Link to="/">
            <img src={logo} alt="Logo" className="menu-logo" />
          </Link>
          <Link to="/">
            <img src={letras} alt="Logo Texto" className="letras" />
          </Link>
        </div>
      </div>

      <div className="menu-right">
        <NavLink className="menu-link" to="/sobre-nosotros">
          Sobre Nosotros
        </NavLink>
        <NavLink className="menu-link" to="/como-funciona">
          ¿Cómo Funciona?
        </NavLink>
        <NavLink className="menu-link" to="/">
          Home
        </NavLink>
        <NavLink className="menu-link" to="/eventos">
          Eventos
        </NavLink>
        <button className="menu-button logout" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default MenuLogin;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu"; // Menú inicial
import MenuLogin from "./components/MenuLogin"; // Menú para usuarios registrados
import HomePage from "./pages/QuienesSomos";
import AboutPage from "./pages/AboutPage";
import FooterFrame from "./components/FooterFrame";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import Services from "./components/Services";
import Ods from "./components/Ods";
import ComoFunciona from "./components/ComoFunciona";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />

        <Routes>
          {/* Rutas principales */}
          <Route path="/" element={<MenuWrapper />} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Ods" element={<Ods />} />
          <Route path="/ComoFunciona" element={<ComoFunciona />} />
          <Route path="/menu-login" element={<MenuLogin />} />

          {/* Ruta para el menú de usuarios registrados */}
          <Route
            path="/dashboard"
            element={
              <>
                <MenuLogin />
                <div>Contenido del Dashboard</div>
              </>
            }
          />
        </Routes>

        <FooterFrame />
      </Router>
    </>
  );
}

export default App;

// Componente envoltorio para el menú principal
const MenuWrapper = () => {
  const navigate = useNavigate();

  // Función para manejar el clic en "Registrarse"
  const handleRegisterClick = () => {
    navigate("/dashboard"); // Redirige al menú de usuarios registrados
  };

  return <Menu onRegisterClick={handleRegisterClick} />;
};

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu"; // Menú inicial
import MenuLogin from "./components/MenuLogin"; // Menú para usuarios registrados
import HomePage from "./pages/HomePage"; // Asegúrate de que el path sea correcto
import AboutPage from "./pages/AboutPage";
import FooterFrame from "./components/FooterFrame";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import Services from "./components/Services";
import Ods from "./components/Ods";
import ComoFunciona from "./pages/ComoFunciona";
import HomeLogIn from "./pages/HomeLogIn"; // Importamos el nuevo componente
import UserSystemList from "./components/UserSystemList";
import EventList from "./components/EventsList";
import EventPage from "./pages/EventPage";

function App() {
  return (
    <>
      <Router>
        <MenuLogin></MenuLogin>
        <ScrollToTop />

        <Routes>
          {/* Rutas principales */}
          <Route path="/" element={<HomePage />} /> {/* Ruta para HomePage */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ods" element={<Ods />} />
          <Route path="/como-funciona" element={<ComoFunciona />} />
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
          {/* Nueva ruta para HomeLogIn */}
          <Route path="/home-login" element={<HomeLogIn />} />{" "}
          {/* Nueva ruta para HomeLogIn */}
          <Route path="/eventos" element={<EventPage />} />{" "}
          {/* Ruta para EventPage */}
        </Routes>

        {/* SE LLAMA AL COMPONENTE DEL FOOTER PARA QUE SE PINTE AL PIE DE PAGINA */}
        <FooterFrame />
      </Router>
    </>
  );
}

export default App;

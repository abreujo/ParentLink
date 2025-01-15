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
import ComoFunciona from "./components/ComoFunciona";
import Eventos from "./pages/Eventos";
import ParentLink from "./pages/ParentLink";


function App() {
  return (
    <>
      <Router>
<<<<<<< HEAD
<<<<<<< HEAD
        <ScrollToTop />

=======
        <ScrollToTop></ScrollToTop>
        <div>
          {" "}
          {/* <Menu></Menu> */}
          <ParentLink></ParentLink>
        </div>
>>>>>>> frametarjetasdeeventos
=======
        <Menu />
        <ScrollToTop />
>>>>>>> 585a92047e8823b87e19a480faf37b0d902d0d93
        <Routes>
          {/* Rutas principales */}
          <Route path="/" element={<HomePage />} /> {/* Ruta para HomePage */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ods" element={<Ods />} />
          <Route path="/comofunciona" element={<ComoFunciona />} />
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
<<<<<<< HEAD
<<<<<<< HEAD

        <FooterFrame />
=======
        <Eventos></Eventos>
        <FooterFrame></FooterFrame>
>>>>>>> frametarjetasdeeventos
=======
        <FooterFrame />
>>>>>>> 585a92047e8823b87e19a480faf37b0d902d0d93
      </Router>
    </>
  );
}

export default App;

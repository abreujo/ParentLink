import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Importar ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Importar estilos de react-toastify
import "./App.css";
import Menu from "./components/Menu"; // Menú inicial
import HomePage from "./pages/HomePage"; // Asegúrate de que el path sea correcto
import AboutPage from "./pages/AboutPage";
import FooterFrame from "./components/FooterFrame";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import Services from "./components/Services";
import Ods from "./components/Ods";
import ComoFunciona from "./pages/ComoFunciona";
import HomeLogIn from "./pages/HomeLogIn"; // Importamos el nuevo componente
import EventPage from "./pages/EventPage";
import UserProfileForm from "./components/UserProfileForm";
import SobreNosotros from "./pages/SobreNosotros";
import ChildRegistrationNewForm from "./components/ChildResitrationFormNew";
import DevelopmentResources from "./pages/DevelopmentResources";

function App() {
  return (
    <>
      <Menu></Menu>

      <ScrollToTop />

      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<HomePage />} /> {/* Ruta para HomePage */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/DevelopmentResources"
          element={<DevelopmentResources />}
        />
        <Route path="/services" element={<Services />} />
        <Route path="/ods" element={<Ods />} />
        <Route path="/comofunciona" element={<ComoFunciona />} />
        <Route path="/sobrenosotros" element={<SobreNosotros />} />
        <Route path="/me" element={<HomeLogIn />} />
        <Route path="/me/edit" element={<UserProfileForm />} />
        <Route path="/me/child" element={<ChildRegistrationNewForm />} />
        {/* Nueva ruta para HomeLogIn */}
        <Route path="/home-login" element={<HomeLogIn />} />{" "}
        {/* Nueva ruta para HomeLogIn */}
        <Route path="/eventos" element={<EventPage />} />{" "}
        {/* Ruta para EventPage */}
      </Routes>

      {/* Contenedor de Toastify para las notificaciones globales */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        toastClassName="custom-toast"
        className="custom-toast-container"
        progressClassName="custom-progress"
      />

      {/* SE LLAMA AL COMPONENTE DEL FOOTER PARA QUE SE PINTE AL PIE DE PAGINA */}
      <FooterFrame />
    </>
  );
}

export default App;

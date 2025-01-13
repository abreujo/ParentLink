import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Menu from "./components/Menu";
/*
Los de arriba son los imports por defecto
*/
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/QuienesSomos";
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
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <ScrollToTop></ScrollToTop>
        <div>
          {" "}
          {/* <Menu></Menu> */}
          <ParentLink></ParentLink>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Ods" element={<Ods />} />
          <Route path="/ComoFunciona" element={<ComoFunciona />} />
        </Routes>
        <Eventos></Eventos>
        <FooterFrame></FooterFrame>
      </Router>
    </>
  );
}

export default App;

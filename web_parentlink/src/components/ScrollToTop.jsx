import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto", // Puedes usar 'auto' si no quieres desplazamiento suave
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;

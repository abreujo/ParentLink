import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para mostrar una UI de respaldo
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Puedes registrar el error en un servicio de monitoreo
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Renderiza una UI alternativa en caso de error
      return <h1>Algo salió mal. Por favor, inténtalo más tarde.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

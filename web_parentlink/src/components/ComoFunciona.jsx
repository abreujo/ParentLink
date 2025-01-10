import React, { useState } from "react";

const ComoFunciona = () => {
  const [count, setCount] = useState(0); // Estado inicial del contador

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div style={styles.container}>
      <h1>Contador Interactivo</h1>
      <div style={styles.counterBox}>
        <h2 style={styles.count}>{count}</h2>
      </div>
      <div style={styles.buttons}>
        <button style={styles.button} onClick={increment}>
          Incrementar
        </button>
        <button style={styles.button} onClick={decrement}>
          Decrementar
        </button>
        <button style={styles.resetButton} onClick={reset}>
          Reiniciar
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    marginTop: "50px",
  },
  counterBox: {
    margin: "20px auto",
    width: "100px",
    height: "100px",
    border: "2px solid #572364",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
  },
  count: {
    fontSize: "2rem",
    margin: 0,
  },
  buttons: {
    marginTop: "20px",
  },
  button: {
    margin: "5px",
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#b3a0d6",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  resetButton: {
    margin: "5px",
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#572364",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ComoFunciona;

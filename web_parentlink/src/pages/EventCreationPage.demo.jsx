import React from "react";
import CreateEventForm from "./components/CreateEventForm";

const EventCreationPage = () => {
  const handleEventSubmission = async (formData) => {
    try {
      const response = await fetch("http://localhost:8081/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          image: formData.image || null,
          ageBracket: formData.ageBracket,
          date: formData.date, // Asegúrate de que el formato sea correcto
          location: {
            postalCode: formData.postalCode,
          },
        }),
      });

      if (response.ok) {
        alert("Event created successfully!");
        // Puedes redirigir o limpiar el formulario después de un éxito
        // Por ejemplo, redirigir:
        // window.location.href = "/events"; // O redirigir usando react-router
      } else {
        const errorData = await response.json();
        console.error("Error creating event:", errorData);
        alert("Error creating event. Please check the details.");
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Request failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Create a New Event</h1>
      <CreateEventForm onSubmit={handleEventSubmission} />
    </div>
  );
};

export default EventCreationPage;

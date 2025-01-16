import React from "react";
import CreateEventForm from "./components/CreateEventForm";

const EventCreationPage = () => {
  const handleEventSubmission = async (formData) => {
    try {
      const response = await fetch("http://localhost:8080/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          image: formData.image || null,
          ageBracket: formData.ageBracket,
          date: formData.date,
          location: { postalCode: formData.postalCode },
        }),
      });

      if (response.ok) {
        alert("Event created successfully!");
        // Resetear el formulario o realizar acciones adicionales
      } else {
        const errorData = await response.json();
        console.error("Error creating event:", errorData);
      }
    } catch (error) {
      console.error("Request failed:", error);
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

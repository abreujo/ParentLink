import React, { useState } from "react";

const CreateEventForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    ageBracket: "",
    date: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Llamar a la función de envío proporcionada como prop
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Event Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          maxLength="100"
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          maxLength="500"
          required
        ></textarea>
      </div>

      <div>
        <label>Image URL:</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Age Bracket:</label>
        <select
          name="ageBracket"
          value={formData.ageBracket}
          onChange={handleChange}
          required
        >
          <option value="">Select an age group</option>
          <option value="0-3">6-8</option>
          <option value="4-6">9-12</option>
          <option value="6-8">13-18</option>
          <option value="8-10">13-18</option>
          <option value="10-12">13-18</option>
          <option value="+12">13-18</option>
        </select>
      </div>

      <div>
        <label>Event Date:</label>
        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Postal Code:</label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEventForm;

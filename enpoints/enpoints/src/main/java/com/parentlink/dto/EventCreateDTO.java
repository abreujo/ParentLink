package com.parentlink.dto;

import com.parentlink.model.Event;
import com.parentlink.model.User;

import java.time.LocalDateTime;

public class EventCreateDTO {
    private String name;
    private String description;
    private String image;
    private String ageBracket;
    private LocalDateTime date;
    private String postalCode;
    private Long userSystemId; // Relación con el creador del evento

    // Constructor vacío
    public EventCreateDTO() {
    }

    // Constructor con parámetros
    public EventCreateDTO(String name, String description, String image, String ageBracket, LocalDateTime date, String postalCode, Long userSystemId) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.ageBracket = ageBracket;
        this.date = date;
        this.postalCode = postalCode;
        this.userSystemId = userSystemId;
    }

    // Getters y setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getAgeBracket() {
        return ageBracket;
    }

    public void setAgeBracket(String ageBracket) {
        this.ageBracket = ageBracket;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public Long getUserSystemId() {
        return userSystemId;
    }

    public void setUserSystemId(Long userSystemId) {
        this.userSystemId = userSystemId;
    }

    // Método para convertir de Event a EventCreateDTO
    public static EventCreateDTO fromEvent(Event event) {
        EventCreateDTO dto = new EventCreateDTO();
        dto.setName(event.getName());
        dto.setDescription(event.getDescription());
        dto.setImage(event.getImage());
        dto.setAgeBracket(event.getAgeBracket());
        dto.setDate(event.getDate());
        dto.setPostalCode(event.getLocation().getPostalCode());
        dto.setUserSystemId(event.getUserSystem().getId());
        // dto.setUser(UserDTO.fromUser(event.getUser()));
        return dto;
    }

    // Método para convertir de EventCreateDTO a Event
    public Event toEvent(User user) {
        Event event = new Event();
        event.setName(this.name);
        event.setDescription(this.description);
        event.setImage(this.image);
        event.setAgeBracket(this.ageBracket);
        event.setDate(this.date);
        // event.setUser(user); // Asignar el usuario como creador del evento
        return event;
    }
}

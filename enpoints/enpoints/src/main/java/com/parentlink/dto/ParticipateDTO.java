package com.parentlink.dto;

import com.parentlink.model.Participate;
import com.parentlink.model.User;
import com.parentlink.model.Event;

public class ParticipateDTO {
    private Long id;
    private UserDTO user;
    private EventDTO event;

    // Constructor con parámetros
    public ParticipateDTO(Long id, UserDTO user, EventDTO event) {
        this.id = id;
        this.user = user;
        this.event = event;
    }

    // Constructor vacío
    public ParticipateDTO() {
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public EventDTO getEvent() {
        return event;
    }

    public void setEvent(EventDTO event) {
        this.event = event;
    }

    // Método para convertir de Participate a ParticipateDTO
    public static ParticipateDTO fromParticipate(Participate participate) {
        ParticipateDTO dto = new ParticipateDTO();
        dto.setId(participate.getId());
        dto.setUser(UserDTO.fromUser(participate.getUser()));
        dto.setEvent(EventDTO.fromEvent(participate.getEvent()));
        return dto;
    }

}

class UserDTO {
    private Long id;
    private String name;
    private String email;

    // Constructor y métodos estáticos
    public static UserDTO fromUser(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        return dto;
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

class EventDTO {
    private Long id;
    private String name;

    // Constructor y métodos estáticos
    public static EventDTO fromEvent(Event event) {
        EventDTO dto = new EventDTO();
        dto.setId(event.getId());
        dto.setName(event.getName());
        return dto;
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

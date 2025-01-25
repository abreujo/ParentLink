package com.parentlink.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "The event name cannot be blank")
    @Size(max = 100, message = "The event name must not exceed 100 characters")
    private String name;

    @NotBlank(message = "The event description cannot be blank")
    @Size(max = 500, message = "The event description must not exceed 500 characters")
    private String description;

    //@NotBlank(message = "The event image URL cannot be blank")
    private String image;

    @NotNull(message = "Age is required")
    private String ageBracket;

    @NotNull(message = "The event date is required")
    //@FutureOrPresent(message = "The event date must be in the present or future")
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "postalCode", referencedColumnName = "postalCode", nullable = false)
    @NotNull(message = "The event location is required")
    private Location location;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Participate> participations;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(nullable = false)
    private UserSystem userSystem;

    // Constructor vacío
    public Event() {}

    // Constructor completo
    public Event(String name, String description, String image, String age, LocalDateTime date, Location location) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.ageBracket = age;
        this.date = date;
        this.location = location;
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

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public List<Participate> getParticipations() {
        return participations;
    }

    public void setParticipations(List<Participate> participations) {
        this.participations = participations;
    }

    public UserSystem getUserSystem() {
        return userSystem;
    }

    public void setUserSystem(UserSystem userSystem) {
        this.userSystem = userSystem;
    }
}

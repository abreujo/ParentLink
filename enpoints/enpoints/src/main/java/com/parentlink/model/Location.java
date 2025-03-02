package com.parentlink.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.util.Set;

@Entity
public class Location {

    @Id
    private String postalCode;

    @NotNull(message = "Name is required")  // Asegura que el nombre no sea null
    private String name;

    @NotNull(message = "Country is required")  // Asegura que el país no sea null
    private String country = "Spain";  // Valor por defecto para el país

    @OneToMany(mappedBy = "location")
    @JsonIgnore
    private Set<User> users;

    @OneToMany(mappedBy = "location")
    @JsonIgnore
    private Set<Event> events;

    // Constructor vacío
    public Location() {}

    // Constructor completo
    public Location(String postalCode, String name) {
        this.postalCode = postalCode;
        this.name = name;
        this.country = "Spain";  // Aseguramos que el país siempre será Spain
    }

    // Getters y setters
    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }
}
/*
AGREGAR POR METODO POS A LOCATION

http://localhost:8081/api/locations

{
  "postalCode": "29014",
  "name": "Malaga"
}

* */
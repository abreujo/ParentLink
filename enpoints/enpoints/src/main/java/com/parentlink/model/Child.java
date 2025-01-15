package com.parentlink.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.time.Period;

@Entity
public class Child {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_user", nullable = false)
    @NotNull(message = "User is required")
    @JsonIgnore
    private User user;

    /*
    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be a past date")
     */
    private LocalDate dateOfBirth;

    /*
    @NotNull(message = "Gender is required")
    @Enumerated(EnumType.STRING)
     */
    private Gender gender;

    @NotBlank(message = "Name is required and cannot be blank")
    @Size(min = 1, max = 100, message = "Name must be between 1 and 100 characters")
    private String name;

    // Constructor vacío
    public Child() {}

    // Constructor completo
    public Child(User user, LocalDate dateOfBirth, Gender gender, String name) {
        this.user = user;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.name = name;
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return dateOfBirth != null ? Period.between(this.dateOfBirth, LocalDate.now()).getYears() : null;
    }
}

package com.parentlink.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.Set;

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

    @NotBlank(message = "The event image URL cannot be blank")
    @Pattern(regexp = "^(https?://.*|)$", message = "The image URL must be valid")
    private String image;

    @NotNull(message = "Minimum age is required")
    @Min(value = 0, message = "Minimum age must be 0 or greater")
    private Integer minAge;

    @NotNull(message = "Maximum age is required")
    @Min(value = 0, message = "Maximum age must be 0 or greater")
    @AssertTrue(message = "Maximum age must be greater than or equal to minimum age")
    private boolean isValidAgeRange() {
        return maxAge == null || minAge == null || maxAge >= minAge;
    }
    private Integer maxAge;

    @NotNull(message = "The event date is required")
    @FutureOrPresent(message = "The event date must be in the present or future")
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "postalCode", referencedColumnName = "postalCode", nullable = false)
    @NotNull(message = "The event location is required")
    private Location location;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Participate> participations;

    // Constructor vacío
    public Event() {}

    // Constructor completo
    public Event(String name, String description, String image, Integer minAge, Integer maxAge, LocalDateTime date, Location location) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.minAge = minAge;
        this.maxAge = maxAge;
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

    public Integer getMinAge() {
        return minAge;
    }

    public void setMinAge(Integer minAge) {
        this.minAge = minAge;
    }

    public Integer getMaxAge() {
        return maxAge;
    }

    public void setMaxAge(Integer maxAge) {
        this.maxAge = maxAge;
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

    public Set<Participate> getParticipations() {
        return participations;
    }

    public void setParticipations(Set<Participate> participations) {
        this.participations = participations;
    }
}

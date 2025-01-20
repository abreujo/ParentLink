package com.parentlink.model;

import jakarta.persistence.*;

@Entity
public class Participate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_user", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_event", nullable = false)
    private Event event;

    @Column(length = 500)
    private String remark;

    @Enumerated(EnumType.STRING) // Guardamos el nombre del enum como texto en la base de datos
    private Rating rating;

    // Constructor vacío
    public Participate() {}

    // Constructor completo
    public Participate(User user, Event event, String remark, Rating rating) {
        this.user = user;
        this.event = event;
        this.remark = remark;
        this.rating = rating;
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

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Rating getRating() {
        return rating;
    }

    public void setRating(Rating rating) {
        this.rating = rating;
    }

    // Método para obtener el valor numérico del rating
    public int getRatingNumericValue() {
        return rating != null ? rating.getNumericValue() : 0;
    }
}

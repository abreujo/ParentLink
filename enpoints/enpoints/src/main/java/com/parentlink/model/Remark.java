package com.parentlink.model;

import jakarta.persistence.*;

@Entity
public class Remark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "id_participate", nullable = false)
    private Participate participate;

    private String opinionText;
    private Integer rating;

    // Constructor vacío
    public Remark() {}

    // Constructor completo
    public Remark(Participate participate, String opinionText, Integer rating) {
        this.participate = participate;
        this.opinionText = opinionText;
        this.rating = rating;
    }

    // Getters y setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Participate getParticipate() {
        return participate;
    }

    public void setParticipate(Participate participate) {
        this.participate = participate;
    }

    public String getContent() {
        return opinionText;
    }

    public void setContent(String opinionText) {
        this.opinionText = opinionText;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }
}


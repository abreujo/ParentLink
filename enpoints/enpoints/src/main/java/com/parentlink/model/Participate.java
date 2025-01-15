package com.parentlink.model;

import jakarta.persistence.*;

@Entity
public class Participate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_user", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "id_event", nullable = false)
    private Event event;

    @OneToOne(mappedBy = "participate", cascade = CascadeType.ALL)
    private Remark remark;

    // Constructor vacío
    public Participate() {}

    // Constructor completo
    public Participate(User user, Event event) {
        this.user = user;
        this.event = event;
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

    public Remark getRemark() {
        return remark;
    }

    public void setRemark(Remark remark) {
        this.remark = remark;
    }
}


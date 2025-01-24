package com.parentlink.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
@Table(name = "usersystem")
public class UserSystem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true)
    @JsonIgnoreProperties("userSystem")
    private User user; // Relación bidireccional (opcional)

    @OneToMany(mappedBy = "userSystem", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Event> events;

}
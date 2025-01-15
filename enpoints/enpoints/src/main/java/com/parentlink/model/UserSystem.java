package com.parentlink.model;


import jakarta.persistence.*;
import lombok.Data;

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
}

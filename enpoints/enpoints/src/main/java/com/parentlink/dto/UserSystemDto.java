package com.parentlink.dto;

public class UserSystemDto {
    private String username;
    private Long id;

    // Constructor
    public UserSystemDto(Long id, String username) {
        this.id = id;
        this.username = username;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}

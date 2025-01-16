package com.parentlink.dto;

public class UserSystemDto {
    private String username;


    // Constructor
    public UserSystemDto(String username) {
        this.username = username;
    }

    // Getters y Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}

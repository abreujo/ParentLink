package com.parentlink.dto;

import com.parentlink.model.Gender;
import com.parentlink.model.User;

import java.time.LocalDate;

public class ChildCreateDto {
    private LocalDate dateOfBirth;
    private Gender gender;
    private String name;
    private User user;
    private Long userId;

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getUserId() {
        return userId; // Este getter es necesario para acceder a userId
    }

    public void setUserId(Long userId) {
        this.userId = userId; // Este setter es necesario para asignar userId
    }
}
package com.parentlink.dto;

public class AuthResponse {
    private String status;
    private String message;
    private String token;
    private Long userId;

    public AuthResponse(String status, String message, String token, Long userId) {
        this.status = status;
        this.message = message;
        this.token = token;
        this.userId = userId;
    }

    // Getters y Setters
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long UserId) {
        this.userId = userId;
    }
}

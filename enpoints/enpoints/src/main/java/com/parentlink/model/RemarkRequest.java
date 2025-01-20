package com.parentlink.model;

public class RemarkRequest {
    private String remarkContent;
    private Rating rating;

    // Getters y setters

    public String getRemarkContent() {
        return remarkContent;
    }

    public void setRemarkContent(String remarkContent) {
        this.remarkContent = remarkContent;
    }

    public Rating getRating() {
        return rating;
    }

    public void setRating(Rating rating) {
        this.rating = rating;
    }
}

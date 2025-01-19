package com.parentlink.model;

public enum Rating {
    POOR(1),
    FAIR(2),
    GOOD(3),
    VERY_GOOD(4),
    EXCELLENT(5);

    private final int numericValue;

    Rating(int numericValue) {
        this.numericValue = numericValue;
    }

    public int getNumericValue() {
        return numericValue;
    }

    public static Rating fromNumericValue(int numericValue) {
        for (Rating r : Rating.values()) {
            if (r.getNumericValue() == numericValue) {
                return r;
            }
        }
        throw new IllegalArgumentException("Invalid numeric value for Rating: " + numericValue);
    }
}



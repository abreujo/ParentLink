package com.parentlink.repository;

import com.parentlink.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, String> {

    /**
     * Encuentra una ubicación basada en el código postal.
     *
     * @param postalCode El código postal de la ubicación.
     * @return Un Optional que contiene la ubicación si existe.
     */
    Optional<Location> findByPostalCode(String postalCode);
}
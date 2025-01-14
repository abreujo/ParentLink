package com.parentlink.controller;

import com.parentlink.model.Location;
import com.parentlink.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
public class LocationController {

    @Autowired
    private LocationService locationService;

    // Agregar una nueva localidad
    @PostMapping
    public ResponseEntity<Location> createLocation(@RequestBody Location location) {
        Location savedLocation = locationService.createLocation(location);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedLocation);
    }

    // Obtener todas las localidades
    @GetMapping
    public ResponseEntity<List<Location>> getAllLocations() {
        List<Location> locations = locationService.getAllLocations();
        if (locations.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(locations);
    }

    // Obtener una localidad por código postal
    @GetMapping("/{postalCode}")
    public ResponseEntity<Location> getLocationByPostalCode(@PathVariable String postalCode) {
        return locationService.getLocationByPostalCode(postalCode)
                .map(location -> ResponseEntity.ok(location))
                .orElse(ResponseEntity.notFound().build());
    }

    // Actualizar una localidad
    @PutMapping("/{postalCode}")
    public ResponseEntity<Location> updateLocation(@PathVariable String postalCode, @RequestBody Location locationDetails) {
        try {
            Location updatedLocation = locationService.updateLocation(postalCode, locationDetails);
            return ResponseEntity.ok(updatedLocation);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar una localidad
    @DeleteMapping("/{postalCode}")
    public ResponseEntity<Void> deleteLocation(@PathVariable String postalCode) {
        if (locationService.deleteLocation(postalCode)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}


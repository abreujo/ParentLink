package com.parentlink.service;

import com.parentlink.model.Location;
import com.parentlink.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    // Obtener todas las ubicaciones
    public List<Location> getAllLocations() {
        return locationRepository.findAll();  // Devuelve la lista de todas las ubicaciones
    }

    // Obtener una ubicación por su código postal
    public Optional<Location> getLocationByPostalCode(String postalCode) {
        return locationRepository.findById(postalCode);  // Busca la ubicación por código postal
    }

    // Crear una nueva ubicación
    public Location createLocation(Location location) {
        return locationRepository.save(location);  // Guarda la nueva ubicación en la base de datos
    }

    // Actualizar una ubicación
    public Location updateLocation(String postalCode, Location locationDetails) {
        // Verificar si la ubicación existe
        Optional<Location> existingLocation = locationRepository.findById(postalCode);
        if (existingLocation.isPresent()) {
            Location location = existingLocation.get();
            location.setName(locationDetails.getName());
            location.setCountry(locationDetails.getCountry());
            return locationRepository.save(location);  // Actualiza y guarda
        } else {
            throw new RuntimeException("Location not found");  // Si no se encuentra la ubicación, lanza excepción
        }
    }

    // Eliminar una ubicación
    public boolean deleteLocation(String postalCode) {
        Optional<Location> location = locationRepository.findById(postalCode);
        if (location.isPresent()) {
            locationRepository.delete(location.get());  // Elimina la ubicación de la base de datos
            return true;
        }
        return false;  // Si no se encuentra la ubicación, devuelve false
    }
}

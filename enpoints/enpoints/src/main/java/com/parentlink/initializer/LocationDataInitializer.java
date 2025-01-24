package com.parentlink.initializer;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.parentlink.model.Location;
import com.parentlink.repository.LocationRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@Component
public class LocationDataInitializer {

    @Autowired
    private LocationRepository locationRepository;

    @PostConstruct
    public void loadLocations() {
        try {
            // Leer el archivo JSON desde resources
            ObjectMapper objectMapper = new ObjectMapper();
            InputStream inputStream = getClass().getResourceAsStream("/locations.json");

            if (inputStream == null) {
                throw new RuntimeException("Archivo locations.json no encontrado en resources.");
            }

            // Mapear el contenido JSON a una lista de objetos Location
            List<Location> locations = objectMapper.readValue(inputStream, new TypeReference<List<Location>>() {});

            // Iterar sobre las ubicaciones y verificar/actualizar en la base de datos
            for (Location location : locations) {
                // Verificar si la ubicación ya existe
                Location existingLocation = locationRepository.findByPostalCode(location.getPostalCode());

                if (existingLocation != null) {
                    // Actualizar los campos necesarios en la ubicación existente
                    existingLocation.setName(location.getName());
                    existingLocation.setCountry(location.getCountry());
                    // Guardar la ubicación actualizada
                    locationRepository.save(existingLocation);
                    System.out.println("Ubicación actualizada: " + location.getPostalCode());
                } else {
                    // Insertar una nueva ubicación
                    locationRepository.save(location);
                    System.out.println("Nueva ubicación agregada: " + location.getPostalCode());
                }
            }
            System.out.println("Datos de ubicaciones cargados/actualizados correctamente.");
        } catch (Exception e) {
            System.err.println("Error al cargar datos de ubicaciones: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

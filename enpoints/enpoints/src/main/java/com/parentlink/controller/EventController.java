package com.parentlink.controller;

import com.parentlink.model.*;
import com.parentlink.service.*;
import com.parentlink.dto.EventCreateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private LocationService locationService;

    @Autowired
    private EventService eventService;

    // Obtener todos los eventos
    /*@GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }*/

    // Obtener un evento por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Optional<Event> event = eventService.getEventById(id);
        if (event.isPresent()) {
            return ResponseEntity.ok(event.get());
        } else {
            return ResponseEntity.notFound().build();  // Evento no encontrado
        }
    }

    // Crear un nuevo evento
    /*@PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event createdEvent = eventService.createEvent(event);
        return ResponseEntity.ok(createdEvent);  // Devolver el evento creado
    }*/

    @PostMapping
    public ResponseEntity<String> createEvent(@RequestBody EventCreateDTO eventCreateDTO) {
        // Buscar la ubicación por código postal
        Optional<Location> locationOptional = locationService.getLocationByPostalCode(eventCreateDTO.getPostalCode());

        if (locationOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("El código postal no existe en la base de datos.");
        }

        // Crear la entidad Event y asignar la ubicación
        Event event = new Event();
        event.setName(eventCreateDTO.getName());
        event.setDescription(eventCreateDTO.getDescription());
        event.setImage(eventCreateDTO.getImage());
        event.setAgeBracket(eventCreateDTO.getAgeBracket());
        event.setDate(eventCreateDTO.getDate());
        event.setLocation(locationOptional.get());

        // Guardar el evento
        eventService.createEvent(event);

        return ResponseEntity.ok("Evento creado con éxito.");
    }

    // Endpoint para obtener eventos filtrados
    @GetMapping
    public ResponseEntity<List<Event>> getEvents(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String age) {
        List<Event> events;
        if (name == null && age == null) {
            events = eventService.getAllEvents(); // Lógica para obtener todos los eventos
        } else {
            events = eventService.findEventsByFilters(name, age); // Lógica para filtrar
        }
        return ResponseEntity.ok(events);
    }


    // Actualizar un evento existente
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event event) {
        try {
            Event updatedEvent = eventService.updateEvent(id, event);
            return ResponseEntity.ok(updatedEvent);  // Devolver el evento actualizado
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();  // Evento no encontrado
        }
    }

    // Eliminar un evento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        try {
            eventService.deleteEvent(id);
            return ResponseEntity.noContent().build();  // El evento ha sido eliminado
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();  // Evento no encontrado
        }
    }
}
/*
JSON EVENT

http://localhost:8081/api/events

METODO POST PARA CREAR UN EVENTO
  DEBE ESTAR CREADA LA UBICACION EN LA BD

{
  "name": "Tech for children",
  "description": "Introducing children in the TechWorld.",
  "image": "Imagen",
  "ageBracket": "6-8",
  "date": "2025-05-10T10:00:00",
  "location": {
    "postalCode": "29014"
  }
}
*/

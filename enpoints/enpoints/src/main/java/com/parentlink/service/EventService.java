package com.parentlink.service;

import com.parentlink.model.Event;
import com.parentlink.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event eventDetails) {
        // Buscar el evento en la base de datos por su ID
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Event not found with id: " + id));

        // Actualizar solo los campos que no sean null en eventDetails
        if (eventDetails.getName() != null) {
            event.setName(eventDetails.getName());
        }

        if (eventDetails.getDescription() != null) {
            event.setDescription(eventDetails.getDescription());
        }

        if (eventDetails.getImage() != null) {
            event.setImage(eventDetails.getImage());
        }

        if (eventDetails.getAgeBracket() != null) {
            event.setAgeBracket(eventDetails.getAgeBracket());
        }

        if (eventDetails.getDate() != null) {
            event.setDate(eventDetails.getDate());
        }

        if (eventDetails.getLocation() != null) {
            event.setLocation(eventDetails.getLocation());
        }

        // Guardar el evento con los cambios aplicados
        return eventRepository.save(event);
    }

    // Eliminar un evento por su ID
    public void deleteEvent(Long id) {
        // Usamos NoSuchElementException para verificar la existencia del evento
        if (!eventRepository.existsById(id)) {
            throw new NoSuchElementException("Event not found with id: " + id);
        }
        eventRepository.deleteById(id);
    }

    public boolean canAddRemark(Event event) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime eventEndDate = event.getDate().plusDays(1); // Sumar un día al evento

        return currentDateTime.isAfter(eventEndDate); // Si la fecha actual es, al menos, un día después del evento
    }
}

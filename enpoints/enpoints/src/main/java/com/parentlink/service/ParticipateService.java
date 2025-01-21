package com.parentlink.service;

import com.parentlink.model.Participate;
import com.parentlink.model.Event;
import com.parentlink.model.Rating;
import com.parentlink.model.User;
import com.parentlink.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class ParticipateService {

    @Autowired
    private ParticipateRepository participateRepository;

    @Autowired
    private EventService eventService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    public List<Participate> getAllParticipations() {
        return participateRepository.findAll();
    }

    public Optional<Participate> getParticipationById(Long id) {
        return participateRepository.findById(id);
    }

    public Participate createParticipation(Participate participate) {
        // Validar que el User y el Event no sean nulos
        if (participate.getUser() == null || participate.getEvent() == null) {
            throw new IllegalArgumentException("User and Event cannot be null.");
        }

        // Verificar si ya existe una participación para el mismo User y Event
        Optional<Participate> existingParticipation = participateRepository.findByUserAndEvent(
                participate.getUser(),
                participate.getEvent()
        );
        if (existingParticipation.isPresent()) {
            throw new RuntimeException("User is already registered for this event.");
        }

        // Verificar que el User existe en la base de datos
        User user = userRepository.findById(participate.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Verificar que el Event existe en la base de datos
        Event event = eventRepository.findById(participate.getEvent().getId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        // Establecer User y Event en la participación
        participate.setUser(user);
        participate.setEvent(event);

        // Ignorar cualquier valor de remark o rating enviado en la solicitud
        participate.setRemark(null);
        participate.setRating(null);

        // Guardar la participación en la base de datos
        return participateRepository.save(participate);
    }

    public void deleteParticipation(Long id) {
        participateRepository.deleteById(id);
    }

    public Participate addRemark(Long participateId, String remarkContent, Rating rating) {
        // Buscar la participación en la base de datos
        Participate participate = participateRepository.findById(participateId)
                .orElseThrow(() -> new NoSuchElementException("Participation not found"));

        // Obtener el evento relacionado
        Event event = participate.getEvent();

        // Verificar si el evento ya ha pasado
        if (event.getDate().isAfter(LocalDateTime.now())) {
            throw new IllegalStateException("Cannot add remark for a future event.");
        }

        // Agregar la remark
        participate.setRemark(remarkContent);

        // Validación del rating (si se proporciona)
        if (rating != null) {
            // Verificamos si el valor del rating está dentro de los valores permitidos
            try {
                // Verificamos si el rating tiene un valor numérico válido
                Rating validRating = Rating.fromNumericValue(rating.getNumericValue());
                participate.setRating(validRating);
            } catch (IllegalArgumentException e) {
                throw new IllegalStateException("Invalid numeric value for Rating: " + rating.getNumericValue());
            }
        }

        // Guardar la participación actualizada
        return participateRepository.save(participate);
    }



    public List<String> getRemarksByEvent(Long eventId) {
        return participateRepository.findByEventId(eventId).stream()
                .map(Participate::getRemark)
                .filter(remark -> remark != null)
                .collect(Collectors.toList());
    }

    public List<String> getRemarksByUser(Long userId) {
        return participateRepository.findByUserId(userId).stream()
                .map(Participate::getRemark)
                .filter(remark -> remark != null)
                .collect(Collectors.toList());
    }

    // Obtener participaciones por evento
    public List<Participate> getParticipationsByEvent(Long eventId) {
        return participateRepository.findByEventId(eventId);
    }

    // Obtener participaciones por usuario
    public List<Participate> getParticipationsByUser(Long userId) {
        return participateRepository.findByUserId(userId);
    }
}
/*
JSON INSCRIBIRSE A UN EVENTO Y DEJAR UN COMENTARIO
{
  "user": {
    "id": 1
  },
  "event": {
    "id": 1
  },
  "remark": "Great event!",
  "rating": "GOOD"  // Asegúrate de que este sea un valor válido para tu enumeración de rating
}
* */
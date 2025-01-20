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


    // CREATE PARTICPATION NO DEBERÍA INCLUIR REMARK PORQUE SIMPLEMENTE NOS ESTAMOS REGISTRANDO A UN EVENTO
    // INCLUIR UNA REMARK APARTE CON ADDREMARK
    public Participate createParticipation(Participate participate) {
        // Validar que el User y el Event no sean nulos
        if (participate.getUser() == null || participate.getEvent() == null) {
            throw new IllegalArgumentException("User and Event cannot be null.");
        }
        // Verificar si ya existe una participación para el mismo User y Event
        Optional<Participate> existingParticipation = participateRepository.findByUserAndEvent(participate.getUser(), participate.getEvent());
        if (existingParticipation.isPresent()) {
            // Verificar si ya existe una remark para esa participación
            if (existingParticipation.get().getRemark() != null) {
                throw new RuntimeException("A remark has already been added for this participation.");
            }
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

        // Verificar si se requiere una remark y que la fecha del evento es válida
        if (participate.getRemark() != null && event.getDate() != null) {
            LocalDateTime eventDateTime = event.getDate(); // Suponemos que la fecha del evento es LocalDateTime
            LocalDateTime currentDateTime = LocalDateTime.now(); // Fecha y hora actuales

            // Si es necesario comparar solo la fecha sin la hora
            LocalDate eventDate = eventDateTime.toLocalDate();
            LocalDate currentDate = currentDateTime.toLocalDate();

            // Compara si la fecha actual es al menos un día posterior a la fecha del evento
            LocalDate eventDatePlusOneDay = eventDate.plusDays(1);

            if (currentDate.isBefore(eventDatePlusOneDay)) {
                throw new RuntimeException("You can only add a remark after the event date has passed by at least one day.");
            }
        }
        // Guardar la participación en la base de datos
        return participateRepository.save(participate);
    }

    public void deleteParticipation(Long id) {
        participateRepository.deleteById(id);
    }

    public Participate addRemark(Long participateId, String remarkContent, Rating rating) {
        Participate participate = participateRepository.findById(participateId)
                .orElseThrow(() -> new NoSuchElementException("Participation not found"));

        Event event = participate.getEvent();

        // Verificación de que el evento haya terminado (al menos un día después)
        if (eventService.canAddRemark(event)) {
            participate.setRemark(remarkContent);
            participate.setRating(rating); // Aquí se guarda la calificación que llega desde el controlador
            return participateRepository.save(participate); // Guarda la participación con la remark
        } else {
            throw new IllegalStateException("Cannot add remark before the event finishes");
        }
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
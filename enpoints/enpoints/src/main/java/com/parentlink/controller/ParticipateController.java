package com.parentlink.controller;

import com.parentlink.dto.ParticipateDTO;
import com.parentlink.model.Participate;
import com.parentlink.model.Rating;
import com.parentlink.service.ParticipateService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/participations")
public class ParticipateController {

    @Autowired
    private ParticipateService participateService;

    @Autowired
    public ParticipateController(ParticipateService participateService) {
        this.participateService = participateService;
    }

    @GetMapping
    public ResponseEntity<List<ParticipateDTO>> getAllParticipations() {
        List<Participate> participations = participateService.getAllParticipations();
        // Convertir a DTOs
        List<ParticipateDTO> participateDTOs = participations.stream()
                .map(ParticipateDTO::fromParticipate)
                .collect(Collectors.toList());
        return ResponseEntity.ok(participateDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Participate> getParticipationById(@PathVariable Long id) {
        return participateService.getParticipationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @PostMapping
    public ResponseEntity<?> createParticipation(@Valid @RequestBody Participate participation) {
        try {
            // Crear la participación
            Participate newParticipation = participateService.createParticipation(participation);

            // Convertir la participación a DTO para la respuesta
            ParticipateDTO newParticipationDTO = ParticipateDTO.fromParticipate(newParticipation);

            // Devolver el DTO en la respuesta con el código de estado CREATED
            return ResponseEntity.status(HttpStatus.CREATED).body(newParticipationDTO);
        } catch (RuntimeException e) {
            e.printStackTrace(); // Para verificar la excepción real en los logs
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: User is already registered for this event.");
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParticipation(@PathVariable Long id) {
        try {
            participateService.deleteParticipation(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/{id}/remark")
    public ResponseEntity<?> addRemark(@PathVariable Long id,
                                       @RequestParam String remarkContent,
                                       @RequestParam(required = false) Rating rating) {
        try {
            Participate updatedParticipation = participateService.addRemark(id, remarkContent, rating);
            return ResponseEntity.ok(updatedParticipation);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Cannot add remark.");
        }
    }


    @GetMapping("/event/{eventId}/remarks")
    public ResponseEntity<?> getRemarksByEvent(@PathVariable Long eventId) {
        try {
            // Obtenemos todas las participaciones del evento
            List<Participate> participations = participateService.getParticipationsByEvent(eventId);

            // Extraemos los remarks no nulos
            List<String> remarks = participations.stream()
                    .map(Participate::getRemark)
                    .filter(remark -> remark != null && !remark.isEmpty())
                    .collect(Collectors.toList());

            if (remarks.isEmpty()) {
                return ResponseEntity.noContent().build(); // 204 si no hay remarks
            }
            return ResponseEntity.ok(remarks); // Lista de remarks como Strings
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found: " + eventId);
        }
    }

    @GetMapping("/user/{userId}/remarks")
    public ResponseEntity<?> getRemarksByUser(@PathVariable Long userId) {
        try {
            // Obtenemos todas las participaciones del usuario
            List<Participate> participations = participateService.getParticipationsByUser(userId);

            // Extraemos los remarks no nulos
            List<String> remarks = participations.stream()
                    .map(Participate::getRemark)
                    .filter(remark -> remark != null && !remark.isEmpty())
                    .collect(Collectors.toList());

            if (remarks.isEmpty()) {
                return ResponseEntity.noContent().build(); // 204 si no hay remarks
            }
            return ResponseEntity.ok(remarks); // Lista de remarks como Strings
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found: " + userId);
        }
    }
}

/*
http://localhost:8081/api/participations
{
  "user": {
    "id": 2
  },
  "event": {
    "id": 3
  }
}
*/


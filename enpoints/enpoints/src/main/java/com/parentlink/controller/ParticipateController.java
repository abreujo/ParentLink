package com.parentlink.controller;

import com.parentlink.model.Participate;
import com.parentlink.service.ParticipateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/participations")
public class ParticipateController {

    @Autowired
    private ParticipateService participateService;

    // Obtener todas las participaciones
    @GetMapping
    public ResponseEntity<List<Participate>> getAllParticipations() {
        return ResponseEntity.ok(participateService.getAllParticipations());
    }

    // Obtener una participación por ID
    @GetMapping("/{id}")
    public ResponseEntity<Participate> getParticipationById(@PathVariable Long id) {
        return participateService.getParticipationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear una nueva participación
    @PostMapping
    public ResponseEntity<Participate> createParticipation(@RequestBody Participate participation) {
        try {
            Participate newParticipation = participateService.createParticipation(participation);
            return ResponseEntity.status(HttpStatus.CREATED).body(newParticipation);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // O devuelve un mensaje personalizado
        }
    }

    // Eliminar una participación
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParticipation(@PathVariable Long id) {
        try {
            participateService.deleteParticipation(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Añadir una remark a una participación
    @PostMapping("/{id}/remark")
    public ResponseEntity<Participate> addRemark(@PathVariable Long id, @RequestParam String remarkContent) {
        try {
            Participate updatedParticipation = participateService.addRemark(id, remarkContent);
            return ResponseEntity.ok(updatedParticipation);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // O un mensaje más detallado
        }
    }
}


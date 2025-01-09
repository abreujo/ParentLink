package com.parentlink.controller;

import com.parentlink.model.Participation;
import com.parentlink.service.ParticipationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/participations")
public class ParticipationController {

    @Autowired
    private ParticipationService participationService;

    @GetMapping
    public List<Participation> getAllParticipations() {
        return participationService.getAllParticipations();
    }

    @GetMapping("/{id}")
    public Optional<Participation> getParticipationById(@PathVariable Long id) {
        return participationService.getParticipationById(id);
    }

    @PostMapping
    public Participation createParticipation(@RequestBody Participation participation) {
        return participationService.createParticipation(participation);
    }

    @PutMapping("/{id}")
    public Participation updateParticipation(@PathVariable Long id, @RequestBody Participation participation) {
        return participationService.updateParticipation(id, participation);
    }

    @DeleteMapping("/{id}")
    public void deleteParticipation(@PathVariable Long id) {
        participationService.deleteParticipation(id);
    }
}

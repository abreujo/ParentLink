package com.parentlink.service;

import com.parentlink.model.Participation;
import com.parentlink.repository.ParticipationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParticipationService {

    @Autowired
    private ParticipationRepository participationRepository;

    public List<Participation> getAllParticipations() {
        return participationRepository.findAll();
    }

    public Optional<Participation> getParticipationById(Long id) {
        return participationRepository.findById(id);
    }

    public Participation createParticipation(Participation participation) {
        return participationRepository.save(participation);
    }

    public Participation updateParticipation(Long id, Participation participation) {
        if (participationRepository.existsById(id)) {
            participation.setId(id);
            return participationRepository.save(participation);
        } else {
            return null;  // O lanzar una excepción
        }
    }

    public void deleteParticipation(Long id) {
        participationRepository.deleteById(id);
    }
}


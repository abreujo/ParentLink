package com.parentlink.service;

import com.parentlink.model.Participate;
import com.parentlink.model.Remark;
import com.parentlink.model.Event;
import com.parentlink.repository.ParticipateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ParticipateService {

    @Autowired
    private ParticipateRepository participateRepository;

    @Autowired
    private EventService eventService;

    public List<Participate> getAllParticipations() {
        return participateRepository.findAll();
    }

    public Optional<Participate> getParticipationById(Long id) {
        return participateRepository.findById(id);
    }

    public Participate createParticipation(Participate participation) {
        // Verificamos si el usuario ya está registrado en el evento
        Optional<Participate> existingParticipation = participateRepository.findByUserAndEvent(participation.getUser(), participation.getEvent());

        if (existingParticipation.isPresent()) {
            throw new RuntimeException("User is already registered for this event.");
        }
        return participateRepository.save(participation);
    }

    public void deleteParticipation(Long id) {
        participateRepository.deleteById(id);
    }

    public Participate addRemark(Long participateId, String remarkContent) {
        Participate participate = participateRepository.findById(participateId)
                .orElseThrow(() -> new NoSuchElementException("Participation not found"));

        Event event = participate.getEvent();

        // Verificar si el evento ya ha terminado (sumamos 1 día a la fecha del evento)
        if (eventService.canAddRemark(event)) {
            Remark remark = new Remark();
            remark.setContent(remarkContent);
            remark.setParticipate(participate);
            participate.setRemark(remark);

            participateRepository.save(participate); // Guardar la participación con la remark
            return participate;
        } else {
            throw new NoSuchElementException("Cannot add remark before the event finishes");
        }
    }
}

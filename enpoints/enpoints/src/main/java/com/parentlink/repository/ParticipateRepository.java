package com.parentlink.repository;

import com.parentlink.model.Event;
import com.parentlink.model.Participate;
import com.parentlink.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ParticipateRepository extends JpaRepository<Participate, Long> {
    Optional<Participate> findByUserAndEvent(User user, Event event);

    // Buscar participaciones por ID de evento
    List<Participate> findByEventId(Long eventId);

    // Buscar participaciones por ID de usuario
    List<Participate> findByUserId(Long userId);

    @Query("SELECT COUNT(p) FROM Participate p WHERE p.event.id = :eventId")
    int countByEventId(Long eventId);
}

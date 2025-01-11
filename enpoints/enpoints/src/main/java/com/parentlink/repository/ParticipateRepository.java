package com.parentlink.repository;

import com.parentlink.model.Event;
import com.parentlink.model.Participate;
import com.parentlink.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ParticipateRepository extends JpaRepository<Participate, Long> {
    Optional<Participate> findByUserAndEvent(User user, Event event);
}

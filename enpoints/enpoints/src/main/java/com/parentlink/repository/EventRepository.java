package com.parentlink.repository;

import com.parentlink.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
    // Aquí podemos agregar métodos de consulta personalizados si es necesario
}

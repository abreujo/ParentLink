package com.parentlink.repository;

import com.parentlink.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    //List<Event> findByLocationName(String locationName); // Método de búsqueda por nombre de ubicación
    List<Event> findByLocationName(String name);

    List<Event> findByAgeBracket(String age);

    List<Event> findByLocationNameAndAgeBracket(String name, String age);

}

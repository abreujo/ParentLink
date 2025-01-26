package com.parentlink.controller;

import com.parentlink.dto.ChildCreateDto;
import com.parentlink.model.Child;
import com.parentlink.model.User;
import com.parentlink.repository.ChildRepository;
import com.parentlink.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/children")
public class ChildController {

        @Autowired
        private ChildRepository childRepository;

        @Autowired
        private UserRepository userRepository;

        @PostMapping
        public ResponseEntity<Child> createChild(@RequestBody ChildCreateDto childDTO) {
            // Obtener el usuario asociado
            User user = userRepository.findById(childDTO.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Crear y configurar el Child
            Child child = new Child();
            child.setUser(user);
            child.setDateOfBirth(childDTO.getDateOfBirth());
            child.setGender(childDTO.getGender());
            child.setName(childDTO.getName());

            // Guardar en la base de datos
            Child savedChild = childRepository.save(child);
            return ResponseEntity.ok(savedChild);
        }
    }


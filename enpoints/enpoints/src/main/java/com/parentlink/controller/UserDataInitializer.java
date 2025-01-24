package com.parentlink.controller;

import com.parentlink.dto.UserCreateDto;
import com.parentlink.model.Gender;
import com.parentlink.model.Location;
import com.parentlink.model.UserType;
import com.parentlink.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class UserDataInitializer {

    @Autowired
    private UserService userService;

    public void initializeUsers() {
        // Verificar si hay usuarios en la base de datos
        if (userService.getAllUsers().isEmpty()) {
            System.out.println("No se encontraron usuarios. Cargando datos iniciales...");
            createInitialUsers();
        } else {
            System.out.println("Usuarios ya existentes en la base de datos. No se requiere inicialización.");
        }
    }

    private void createInitialUsers() {
        // Crear un usuario de ejemplo
        UserCreateDto user1 = new UserCreateDto(
                "Pérez",
                "Carlos",
                "carlos.perez@example.com",
                "+34987654321",
                LocalDate.of(1985, 5, 20),
                Gender.MALE,
                new Location("29001", "Málaga"),
                true,
                0,
                null,
                UserType.INDIVIDUO,
                "1" // ID de UserSystem asociado (debe ser válido)
        );
        // Guardar usuarios en la base de datos
        userService.createUserWithoutChildren(user1);

        System.out.println("Datos iniciales de usuarios cargados correctamente.");
    }
}

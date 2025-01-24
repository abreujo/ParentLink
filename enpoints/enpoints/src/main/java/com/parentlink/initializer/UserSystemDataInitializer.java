package com.parentlink.initializer;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.parentlink.model.UserSystem;
import com.parentlink.repository.UserSystemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;

@Component
public class UserSystemDataInitializer {

    @Autowired
    private UserSystemRepository userSystemRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inyectar PasswordEncoder

    @PostConstruct
    public void loadUserData() {
        // Verificar si la tabla ya tiene datos
        if (userSystemRepository.count() > 0) {
            System.out.println("La tabla usersystem ya tiene datos. No se cargarán duplicados.");
            return;
        }

        try {
            // Leer el archivo JSON desde resources
            ObjectMapper objectMapper = new ObjectMapper();
            InputStream inputStream = getClass().getResourceAsStream("/usersystemdata.json");

            if (inputStream == null) {
                throw new RuntimeException("Archivo usersystemdata.json no encontrado en resources.");
            }

            // Mapear el contenido JSON a una lista de objetos UserSystem
            List<UserSystem> users = objectMapper.readValue(inputStream, new TypeReference<List<UserSystem>>() {});

            // Codificar las contraseñas antes de guardarlas
            for (UserSystem user : users) {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
            }

            // Guardar los datos en la base de datos
            userSystemRepository.saveAll(users);
            System.out.println("Datos de usuarios cargados correctamente.");
        } catch (Exception e) {
            System.err.println("Error al cargar datos de usuarios: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

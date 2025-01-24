package com.parentlink.service;

import com.parentlink.dto.UserSystemDto;
import com.parentlink.exception.UserNotFoundException;
import com.parentlink.model.UserSystem;
import com.parentlink.repository.UserSystemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserSystemService {

    @Autowired
    private UserSystemRepository userSystemRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //Implementacio para registrar un usuario
    public UserSystem register(UserSystem user) {
        // Verificar si el username ya existe
        if (userSystemRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new IllegalArgumentException("El Nombre de usuario ya existe");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userSystemRepository.save(user);
    }
    //Implementacion para hacer login
    public Optional<UserSystem> login(String username, String password) {
        Optional<UserSystem> user = userSystemRepository.findByUsername(username);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }

    //Implementacion para leer los usuarios registrados con un DTO para resguardar el Password
    public List<UserSystemDto> getAllUsers() {
        // Obtiene todos los usuarios de la base de datos
        return userSystemRepository.findAll()
                .stream()
                .map(user -> new UserSystemDto(user.getId(), user.getUsername())) // Mapea al DTO incluyendo el ID
                .collect(Collectors.toList());
    }

    //Impementacion para leer los datos de un usuario al tener el userName
    // Metodo GET para obtener el ID del usuario por nombre de usuario
    public Long getUserIdByUsername(String username) {
        Optional<UserSystem> user = userSystemRepository.findByUsername(username);
        return user.map(UserSystem::getId) // Usa map para obtener el ID de forma segura
                .orElseThrow(() -> new UserNotFoundException("Usuario con nombre de usuario '" + username + "' no encontrado"));
        //Lanza una excepcion personalizada para un mejor manejo de errores en el controlador
    }

    // Metodo para obtener un UserSystem por su ID
    public UserSystem getUserSystemById(Long id) {
        Optional<UserSystem> userSystem = userSystemRepository.findById(id);
        return userSystem.orElseThrow(() -> new RuntimeException("UserSystem not found with id: " + id));
    }
}
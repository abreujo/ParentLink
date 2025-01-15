package com.parentlink.service;

import com.parentlink.model.UserSystem;
import com.parentlink.repository.UserSystemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserSystemService {

    @Autowired
    private UserSystemRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //Implementacio para registrar un usuario
    public UserSystem register(UserSystem user) {
        // Verificar si el username ya existe
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new IllegalArgumentException("El Nombre de usuario ya existe");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    //Implementacion para hacer login
    public Optional<UserSystem> login(String username, String password) {
        Optional<UserSystem> user = userRepository.findByUsername(username);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }
}


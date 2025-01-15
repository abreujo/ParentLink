package com.parentlink.service;

/*
import com.example.demo.model.UserSystem;
import com.example.demo.repository.UserSystemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
*/

import com.parentlink.model.UserSystem;
import com.parentlink.repository.UserSystemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Service
public class UserSystemService {

    @Autowired
    private UserSystemRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserSystem register(UserSystem user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<UserSystem> login(String username, String password) {
        Optional<UserSystem> user = userRepository.findByUsername(username);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }
}



/*


public class UserSystemService {
}*/

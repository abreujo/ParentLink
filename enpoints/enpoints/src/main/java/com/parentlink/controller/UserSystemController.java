package com.parentlink.controller;


import com.parentlink.dto.ErrorResponseDto;
import com.parentlink.dto.UserSystemDto;
import com.parentlink.model.UserSystem;
import com.parentlink.service.UserSystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/usersystem")
public class UserSystemController {

    @Autowired
    private UserSystemService userSystemService;

    @GetMapping("/")
    public ResponseEntity<?> getAllUsers() {
        try {
            // Llama al servicio para obtener todos los usuarios
            List<UserSystemDto> users = userSystemService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            // Devuelve un error en caso de que algo falle
            return ResponseEntity.status(500).body(new ErrorResponseDto("Error al obtener los usuarios: " + e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserSystem user) {
        //return ResponseEntity.ok(userService.register(user));
        try {
            UserSystem registeredUser = userSystemService.register(user);
            return ResponseEntity.ok(registeredUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponseDto(e.getMessage()));
        }

    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserSystem loginRequest) {
        Optional<UserSystem> user = userSystemService.login(loginRequest.getUsername(), loginRequest.getPassword());
        return user.isPresent()
                ? ResponseEntity.ok("Login Satisfactorio!")
                : ResponseEntity.status(401).body("Nombre de usuario o Password invalido!!!");
    }
}

/*
PARA REGISTRAR UN USUARIO

http://localhost:8081/api/usersystem/register

enviando metodo post en el Body un Json con la estructura:

{
  "username": "UserName",
  "password": "Password"
}

PARA HACER LOGIN

http://localhost:8081/api/usersystem/register

enviando metodo post en el body los datos

  "username": "UserName",
  "password": "Password"

*/
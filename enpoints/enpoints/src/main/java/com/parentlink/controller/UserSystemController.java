package com.parentlink.controller;


import com.parentlink.dto.ErrorResponse;
import com.parentlink.model.UserSystem;
import com.parentlink.service.UserSystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;

@RestController
@RequestMapping("/api/usersystem")
public class UserSystemController {

    @Autowired
    private UserSystemService userSystemService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserSystem user) {
        //return ResponseEntity.ok(userService.register(user));
        try {
            UserSystem registeredUser = userSystemService.register(user);
            return ResponseEntity.ok(registeredUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }

    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        Optional<UserSystem> user = userSystemService.login(username, password);
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
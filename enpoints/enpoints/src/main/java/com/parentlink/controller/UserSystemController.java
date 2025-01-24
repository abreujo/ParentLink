package com.parentlink.controller;


import com.parentlink.dto.AuthResponse;
import com.parentlink.dto.ErrorResponseDto;
import com.parentlink.dto.UserSystemDto;
import com.parentlink.model.UserSystem;
import com.parentlink.security.JwtUtil;
import com.parentlink.service.UserSystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;


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

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserSystem loginRequest) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new AuthResponse("error", "Usuario o Password invalidos!!!", null, null));
        }

        //**********************************************************
        // Obtener el ID del usuario desde userDetails
        Long userId = userSystemService.getUserIdByUsername(loginRequest.getUsername());
        //**********************************************************
        // Cargar los detalles del usuario
        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());


        // Generar el token
        String token = jwtUtil.generateToken(loginRequest.getUsername());
        return ResponseEntity.ok(new AuthResponse("success", "Autenticación exitosa", token, userId));
    }

    // Endpoint para obtener UserSystem por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserSystemById(@PathVariable Long id) {
        try {
            // Llama al servicio para obtener el UserSystem por ID
            UserSystem userSystem = userSystemService.getUserSystemById(id);
            return ResponseEntity.ok(userSystem);
        } catch (Exception e) {
            // Devuelve un error si no se encuentra el UserSystem
            return ResponseEntity.status(404).body(new ErrorResponseDto("UserSystem not found with id: " + id));
        }
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
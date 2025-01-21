package com.parentlink.controller;


import com.parentlink.dto.AuthResponse;
import com.parentlink.dto.ErrorResponseDto;
import com.parentlink.dto.UserSystemDto;
import com.parentlink.model.UserSystem;
import com.parentlink.security.JwtUtil;
import com.parentlink.service.UserSystemService;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
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
            return ResponseEntity.status(401).body(new AuthResponse("error", "Usuario o Password invalidos!!!", null));
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
        // Generar el token
        String token = jwtUtil.generateToken(loginRequest.getUsername());
        return ResponseEntity.ok(new AuthResponse("success", "Autenticación exitosa", token));
    }
        //authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        //final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());

        //return ResponseEntity.ok(jwtUtil.generateToken(userDetails.getUsername()));
        //return jwtUtil.generateToken(loginRequest.getUsername());
        /*
        Optional<UserSystem> user = userSystemService.login(loginRequest.getUsername(), loginRequest.getPassword());
        return user.isPresent()
                ? ResponseEntity.ok("Login Satisfactorio!")
                : ResponseEntity.status(401).body("Nombre de usuario o Password invalido!!!");
        */
    //}
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
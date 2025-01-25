package com.parentlink.controller;

import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.parentlink.dto.UserCreateDto;
import com.parentlink.model.*;
import com.parentlink.service.UserService;
import io.jsonwebtoken.io.IOException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Obtener todos los usuarios
    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getAllUsers();

        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();  // Devuelve 204 No Content
        }

        return ResponseEntity.ok(users);  // Devuelve los usuarios con 200 OK
    }

    // Crear un nuevo usuario
    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody UserCreateDto user, BindingResult bindingResult) {
        // Si hay errores de validación, devolvemos los errores al cliente
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        try {
            User createdUser = userService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when creating user.");
        }
    }

    // Obtener un usuario por su ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // Devuelve 404 si no se encuentra el usuario
        }
        return ResponseEntity.ok(user);  // Devuelve el usuario con 200 OK
    }

    // Obtener un usuario por su email
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        User user = userService.getUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // Devuelve 404 si no se encuentra el usuario
        }
        return ResponseEntity.ok(user);  // Devuelve el usuario con 200 OK
    }

    // Eliminar un usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        boolean isDeleted = userService.deleteUser(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();  // Devuelve 204 No Content si la eliminación fue exitosa
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // Devuelve 404 si el usuario no existe
    }

    // Actualizar un usuario
    // Actualizar un usuario
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody User userDetails, BindingResult bindingResult) {
        // Si hay errores de validación, devolvemos los errores al cliente
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        try {
            // Verificamos si el usuario tiene hijos en el objeto userDetails
            if (userDetails.isChildren()) {
                // Si tiene hijos, actualizamos a 'FAMILIA'
                userDetails.setUserType(UserType.FAMILIA);
            } else {
                // Si no tiene hijos, actualizamos a 'INDIVIDUO'
                userDetails.setUserType(UserType.INDIVIDUO);
            }

            // Actualizamos los detalles del usuario (tipo de usuario y otros datos)
            User updatedUser = userService.updateUser(id, userDetails);

            // Si el usuario tiene hijos, actualizamos los hijos
            if (userDetails.isChildren()) {
                userService.updateChildren(updatedUser, userDetails);
            }

            return ResponseEntity.ok(updatedUser);  // Devuelve el usuario actualizado con 200 OK
        } catch (RuntimeException e) {
            // Si no se encuentra el usuario, devolvemos un 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Obtener los hijos de un usuario
    @GetMapping("/{userId}/children")
    public ResponseEntity<List<Child>> getChildrenByUserId(@PathVariable Long userId) {
        List<Child> children = userService.getChildrenByUserId(userId);
        return ResponseEntity.ok(children);  // Devuelve los hijos del usuario
    }

    //Metodo Pos para crear Usuarios sin hijos...
    @PostMapping("/without-children")
    public ResponseEntity<User> createUserWithoutChildren(@RequestBody UserCreateDto userCreateDto) {
        User user = userService.createUserWithoutChildren(userCreateDto);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/initial")
    public String createUserDataInitializer() {
        List<UserCreateDto> users = Arrays.asList(
                new UserCreateDto(
                        "Abreu",
                        "Gylmer",
                        "gylmer.abreu@gmail.com",
                        "613290849",
                        LocalDate.of(1981, 6, 20),
                        Gender.MALE,
                        new Location("29014", null),
                        false,
                        1,
                        null,
                        UserType.INDIVIDUO,
                        "1"
                ),
                new UserCreateDto(
                        "Lopez",
                        "Maria",
                        "maria.lopez@gmail.com",
                        "622334556",
                        LocalDate.of(1990, 4, 15),
                        Gender.FEMALE,
                        new Location("28001", null),
                        true,
                        2,
                        null,
                        UserType.INDIVIDUO,
                        "2"
                ),
                new UserCreateDto(
                        "Garcia",
                        "Juan",
                        "juan.garcia@gmail.com",
                        "612445678",
                        LocalDate.of(1985, 9, 10),
                        Gender.MALE,
                        new Location("08001", null),
                        true,
                        3,
                        null,
                        UserType.INDIVIDUO,
                        "3"
                ),
                new UserCreateDto(
                        "Martinez",
                        "Ana",
                        "ana.martinez@gmail.com",
                        "615556789",
                        LocalDate.of(1995, 2, 28),
                        Gender.FEMALE,
                        new Location("41003", null),
                        false,
                        4,
                        null,
                        UserType.INDIVIDUO,
                        "4"
                ),
                new UserCreateDto(
                        "Hernandez",
                        "Luis",
                        "luis.hernandez@gmail.com",
                        "610667890",
                        LocalDate.of(1988, 12, 5),
                        Gender.MALE,
                        new Location("50004", null),
                        true,
                        5,
                        null,
                        UserType.INDIVIDUO,
                        "5"
                ),
                new UserCreateDto(
                        "Smith",
                        "John",
                        "john.smith@gmail.com",
                        "654223344",
                        LocalDate.of(1992, 7, 8),
                        Gender.MALE,
                        new Location("03004", null),
                        false,
                        6,
                        null,
                        UserType.INDIVIDUO,
                        "6"
                ),
                new UserCreateDto(
                        "Johnson",
                        "Emily",
                        "emily.johnson@gmail.com",
                        "645556677",
                        LocalDate.of(1989, 11, 22),
                        Gender.FEMALE,
                        new Location("46004", null),
                        true,
                        7,
                        null,
                        UserType.INDIVIDUO,
                        "7"
                ),
                new UserCreateDto(
                        "Kumar",
                        "Raj",
                        "raj.kumar@gmail.com",
                        "700112233",
                        LocalDate.of(1983, 3, 15),
                        Gender.MALE,
                        new Location("07001", null),
                        false,
                        8,
                        null,
                        UserType.INDIVIDUO,
                        "8"
                ),
                new UserCreateDto(
                        "Lee",
                        "Ming",
                        "ming.lee@gmail.com",
                        "912345678",
                        LocalDate.of(1990, 9, 25),
                        Gender.MALE,
                        new Location("38001", null),
                        true,
                        9,
                        null,
                        UserType.INDIVIDUO,
                        "9"
                ),
                new UserCreateDto(
                        "Garcia",
                        "Laura",
                        "laura.garcia@gmail.com",
                        "677889900",
                        LocalDate.of(1987, 12, 30),
                        Gender.FEMALE,
                        new Location("26002", null),
                        true,
                        10,
                        null,
                        UserType.INDIVIDUO,
                        "10"
                )
        );
        // Recorrer la lista de usuarios y procesarlos uno a uno
        for (UserCreateDto userDto : users) {
            User user = userService.createUserWithoutChildren(userDto);
            System.out.println("Usuario creado: " + user);
        }

        return "h";

/*CODE TO UPLOAD A SINGLE TEST USER
        UserCreateDto user1 = new UserCreateDto(
                "Pérez",
                "Carlos",
                "carlos.perez@example.com",
                "+34987654321",
                LocalDate.of(1985, 5, 20),
                Gender.MALE,
                new Location("29014", null),
                true,
                0,
                null,
                UserType.INDIVIDUO,
                "1" // ID de UserSystem asociado (debe ser válido)
        );

        User user = userService.createUserWithoutChildren(user1);
        return ResponseEntity.ok(user);
  */
    }

}
    /*
    JSON USER

    http://localhost:8081/api/users

{
  "surname": "Ortega",
  "name": "Luis",
  "email": "luis.ortega@gmail.com",
  "phone": "+34987654321",
  "dateOfBirth": "1978-04-09",
  "gender": "MALE",
  "location": {
    "postalCode": "28001"
  },
  "children": true,
  "numberOfChildren": 1,
  "childrenList": [
    {
      "name": "Pepe",
      "gender": "MALE",
      "dateOfBirth": "2018-06-15"
    }
  ],
  "userSystemId": 1
}
    * */

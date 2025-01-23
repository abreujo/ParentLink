package com.parentlink.controller;

import com.parentlink.dto.UserCreateDto;
import com.parentlink.model.Child;
import com.parentlink.model.User;
import com.parentlink.model.UserType;
import com.parentlink.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

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

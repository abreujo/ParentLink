package com.parentlink.repository;

import com.parentlink.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    /*JpaRepository ya da metodos basicos como save(), findById(), deleteById(), etc.
    Pero podemos agregar consultas personalizadas como findByEmail() si es necesario.
     */
    User findByEmail(String email);

}

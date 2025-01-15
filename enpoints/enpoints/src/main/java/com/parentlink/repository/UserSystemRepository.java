package com.parentlink.repository;

import com.parentlink.model.UserSystem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserSystemRepository extends JpaRepository<UserSystem, Long> {
    Optional<UserSystem> findByUsername(String username);
}

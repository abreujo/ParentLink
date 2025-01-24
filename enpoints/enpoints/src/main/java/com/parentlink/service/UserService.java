package com.parentlink.service;

import com.parentlink.dto.ChildCreateDto;
import com.parentlink.dto.UserCreateDto;
import com.parentlink.model.User;
import com.parentlink.model.Child;
import com.parentlink.model.UserSystem;
import com.parentlink.model.UserType;
import com.parentlink.repository.UserRepository;
import com.parentlink.repository.ChildRepository;
import com.parentlink.repository.UserSystemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChildRepository childRepository;

    @Autowired
    private UserSystemRepository userSystemRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User createUser(UserCreateDto userCreateDto) {
        User user = new User();
        user.setSurname(userCreateDto.getSurname());
        user.setName(userCreateDto.getName());
        user.setEmail(userCreateDto.getEmail());
        user.setPhone(userCreateDto.getPhone());
        user.setDateOfBirth(userCreateDto.getDateOfBirth());
        user.setGender(userCreateDto.getGender());
        user.setLocation(userCreateDto.getLocation());
        user.setChildren(userCreateDto.getChildren());

        // Si el usuario tiene hijos, configuramos los detalles
        if (Boolean.TRUE.equals(userCreateDto.getChildren())) {
            user.setNumberOfChildren(userCreateDto.getNumberOfChildren());

            // Mapear y asociar hijos
            List<Child> children = new ArrayList<>();
            for (ChildCreateDto childCreateDto : userCreateDto.getChildrenList()) {
                Child child = new Child();
                child.setName(childCreateDto.getName());
                child.setGender(childCreateDto.getGender());
                child.setDateOfBirth(LocalDate.now());
                child.setUser(user);
                children.add(child);
            }
            user.setChildrenList(children);
        } else {
            // Si no tiene hijos, aseguramos que los campos relacionados estén en null
            user.setNumberOfChildren(null);
            user.setChildrenList(null);
        }

        // Validar y asociar UserSystem
        if (userCreateDto.getUserSystemId() == null) {
            throw new IllegalArgumentException("UserSystem ID must not be null");
        }
        UserSystem userSystem = userSystemRepository.findById(userCreateDto.getUserSystemId())
                .orElseThrow(() -> new IllegalArgumentException("UserSystem not found"));
        user.setUserSystem(userSystem);

        // Validar antes de guardar
        validateUser(user);

        // Guardar usuario
        user = userRepository.save(user);

        // Si tiene hijos, guardar los hijos también
        if (Boolean.TRUE.equals(user.isChildren())) {
            for (Child child : user.getChildrenList()) {
                child.setUser(user);
                childRepository.save(child);
            }
        }
        return user;
    }

    public void validateUser(User user) {
        if (user.isChildren() == null) {
            throw new IllegalArgumentException("The 'children' field cannot be null.");
        }

        if (Boolean.TRUE.equals(user.isChildren())) {
            if (user.getNumberOfChildren() == null || user.getNumberOfChildren() < 1) {
                throw new IllegalArgumentException("Number of children must be greater than 0 for family users.");
            }
            if (user.getChildrenList() == null || user.getChildrenList().isEmpty()) {
                throw new IllegalArgumentException("Family users must provide a list of children.");
            }
        } else {
            if (user.getNumberOfChildren() != null) {
                throw new IllegalArgumentException("Number of children should be null for individual users.");
            }
            if (user.getChildrenList() != null && !user.getChildrenList().isEmpty()) {
                throw new IllegalArgumentException("Individual users cannot have a list of children.");
            }
        }

        if (user.getEmail() != null && !StringUtils.hasText(user.getEmail())) {
            throw new IllegalArgumentException("The email field cannot be empty.");
        }
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public User updateUser(Long id, User userDetails) {
        if (userDetails == null) {
            throw new IllegalArgumentException("User details cannot be null");
        }

        return userRepository.findById(id).map(user -> {
            // Actualización de los datos del usuario
            user.setSurname(userDetails.getSurname());
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            user.setPhone(userDetails.getPhone());
            user.setGender(userDetails.getGender());
            user.setDateOfBirth(userDetails.getDateOfBirth());
            user.setChildren(userDetails.isChildren());
            user.setNumberOfChildren(userDetails.getNumberOfChildren());
            user.setLocation(userDetails.getLocation());

            // Actualizamos los hijos si es necesario
            updateChildren(user, userDetails);

            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void updateChildren(User user, User userDetails) {
        if (userDetails.isChildren()) {
            user.setUserType(UserType.FAMILIA);
            for (Child child : userDetails.getChildrenList()) {
                if (!user.getChildrenList().contains(child)) {
                    child.setUser(user);
                    childRepository.save(child);
                }
            }
            user.getChildrenList().removeIf(existingChild -> !userDetails.getChildrenList().contains(existingChild));
            childRepository.saveAll(user.getChildrenList());  // Guardar cambios en los hijos
        } else {
            user.setUserType(UserType.INDIVIDUO);
            user.getChildrenList().forEach(child -> child.setUser(null));
            childRepository.saveAll(user.getChildrenList());
        }
    }

    public List<Child> getChildrenByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getChildrenList();
    }



}
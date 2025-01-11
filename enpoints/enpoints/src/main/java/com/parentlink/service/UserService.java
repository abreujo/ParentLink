package com.parentlink.service;

import com.parentlink.model.User;
import com.parentlink.model.Child;
import com.parentlink.model.UserType;
import com.parentlink.repository.UserRepository;
import com.parentlink.repository.ChildRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChildRepository childRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    public User createUser(User user) {
        // Si el usuario tiene hijos, guardamos también a los hijos.
        if (user.isChildren()) {
            for (Child child : user.getChildrenList()) {
                child.setUser(user); // Asociamos el hijo con el usuario
                childRepository.save(child);  // Guardamos cada hijo
            }
        }

        // Finalmente guardamos al usuario
        return userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true; // El usuario fue eliminado exitosamente
        } else {
            return false; // El usuario no existía
        }
    }

    //REVISAR BIEN Y PROBAR ESTE MÉTODO
    public User updateUser(Long id, User userDetails) {
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

            // Llamamos a updateChildren para manejar la actualización de los hijos
            updateChildren(user, userDetails);

            // Guardamos el usuario con sus hijos actualizados
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void updateChildren(User user, User userDetails) {
        // Si el usuario tiene hijos, actualizamos la relación de hijos
        if (userDetails.isChildren()) {
            // Cambiar el tipo de usuario a "FAMILIA" si tiene hijos
            user.setUserType(UserType.FAMILIA);

            // Recorremos la lista de hijos proporcionados en userDetails
            for (Child child : userDetails.getChildrenList()) {
                // Si el hijo no está ya asociado al usuario, lo agregamos
                if (!user.getChildrenList().contains(child)) {
                    child.setUser(user);  // Asociamos el nuevo hijo con el usuario
                    childRepository.save(child);  // Guardamos el hijo
                }
            }
            // Eliminamos los hijos que ya no están en la nueva lista proporcionada
            // Se eliminan los hijos que están en la lista actual de user pero ya no están en la lista de userDetails
            user.getChildrenList().removeIf(existingChild -> !userDetails.getChildrenList().contains(existingChild));
        } else {
            // Si el usuario no tiene hijos, cambiamos el tipo de usuario a "INDIVIDUO"
            user.setUserType(UserType.INDIVIDUO);

            // Eliminamos la relación con los hijos (desasociamos todos los hijos)
            user.getChildrenList().forEach(child -> child.setUser(null));
            childRepository.saveAll(user.getChildrenList());  // Guardamos los cambios en los hijos
        }
    }

    public Set<Child> getChildrenByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getChildrenList();
    }
}

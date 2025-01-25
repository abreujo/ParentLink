package com.parentlink.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Surname is required and cannot be blank")
    @Size(max = 100, message = "Surname cannot exceed 100 characters")
    private String surname;

    @NotBlank(message = "Name is required and cannot be blank")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    private String name;

    @NotBlank(message = "Email is required and cannot be blank")
    @Email(message = "Email should be valid")
    private String email;

    @Pattern(regexp = "^\\+?[0-9]{7,15}$", message = "Phone number must be valid")
    private String phone;

    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be a past date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    @NotNull(message = "Gender is required")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @ManyToOne
    @JoinColumn(name = "postalCode", referencedColumnName = "postalCode", nullable = false)
    @NotNull(message = "Location is required")
    private Location location;

    @NotNull(message = "Children flag is required")
    private Boolean children;

    @Min(value = 1, message = "Number of children must be at least 1 when children is true")
    //@Null(message = "Number of children must be null when children is false")
    private Integer numberOfChildren;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @Size(min = 1, message = "Children list must contain at least one child when children is true")
    private List<Child> childrenList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Participate> participations;



    @Enumerated(EnumType.STRING)  // Esto asegura que se almacene como un String (INDIVIDUO o FAMILIA)
    private UserType userType;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private UserSystem userSystem;

    // Constructor vacío
    public User() {}

    // Constructor completo
    public User(String surname, String name, String password, String email, String phone, Gender gender, LocalDate dateOfBirth, Location location, Boolean children, Integer numberOfChildren, UserSystem userSystem) {
        this.surname = surname;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.location = location;
        this.children = children;
        this.numberOfChildren = numberOfChildren;
        this.userSystem = userSystem;
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Boolean isChildren() {
        return children;
    }

    public void setChildren(Boolean children) {
        this.children = children;

        // Establecer automáticamente el UserType basado en children
        if (Boolean.TRUE.equals(children)) {
            this.userType = UserType.FAMILIA;  // Usuario con hijos
        } else {
            this.userType = UserType.INDIVIDUO;  // Usuario sin hijos
            this.numberOfChildren = null; // Asegurar que numberOfChildren esté en estado válido
        }
    }

    public Integer getNumberOfChildren() {
        return numberOfChildren;
    }

    public void setNumberOfChildren(Integer numberOfChildren) {
        this.numberOfChildren = numberOfChildren;
    }

    public List<Child> getChildrenList() {
        return childrenList;
    }

    public void setChildrenList(List<Child> childrenList) {
        this.childrenList = childrenList;
    }

    public Set<Participate> getParticipations() {
        return participations;
    }

    public void setParticipations(Set<Participate> participations) {
        this.participations = participations;
    }

    public Integer getAge() {
        if (this.dateOfBirth == null) {
            return null; // O puedes devolver 0 o algún valor predeterminado si lo prefieres
        }
        return Period.between(this.dateOfBirth, LocalDate.now()).getYears();
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public UserSystem getUserSystem() {
        return userSystem;
    }

    public void setUserSystem(UserSystem userSystem) {
        this.userSystem = userSystem;
    }

    @AssertTrue(message = "Number of children must be null or greater than 0 if the user has children")
    private boolean isValidNumberOfChildren() {
        if (Boolean.TRUE.equals(children)) {
            return numberOfChildren != null && numberOfChildren > 0;
        } else {
            return numberOfChildren == null; // Aseguramos que sea nulo cuando no hay hijos
        }
    }

}

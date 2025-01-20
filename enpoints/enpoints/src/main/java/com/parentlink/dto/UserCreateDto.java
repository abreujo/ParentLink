package com.parentlink.dto;

import com.parentlink.model.*;
import java.time.LocalDate;
import java.util.List;


public class UserCreateDto {
    private String surname;
    private String name;
    private String password;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private Gender gender;
    private Location location;
    private Boolean children;
    private Integer numberOfChildren;
    private List<ChildCreateDto> childrenList;
    private UserType userType;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public Boolean getChildren() {
        return children;
    }

    public void setChildren(Boolean children) {
        this.children = children;
    }

    public Integer getNumberOfChildren() {
        return numberOfChildren;
    }

    public void setNumberOfChildren(Integer numberOfChildren) {
        this.numberOfChildren = numberOfChildren;
    }

    public List<ChildCreateDto> getChildrenList() {
        return childrenList;
    }

    public void setChildrenList(List<ChildCreateDto> childrenList) {
        this.childrenList = childrenList;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public void setId(Long id) {
    }
}

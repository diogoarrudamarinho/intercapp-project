package com.project.intercapp.dto;

import java.util.List;

import com.project.intercapp.entities.Phone;
import com.project.intercapp.entities.User;

public class UserDTO {
    
    private Long id;
    private String name;
    private String mail;
    private List<Phone> phones;

    public UserDTO(){}

    public UserDTO(User entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.mail = entity.getMail();
        this.phones = entity.getPhones();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getMail() {
        return mail;
    }

    public List<Phone> getPhones() {
        return phones;
    }

}

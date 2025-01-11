package com.project.intercapp.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.project.intercapp.entities.Phone;
import com.project.intercapp.entities.User;

public class UserDTO {
    
    private Long id;
    private String name;
    private String mail;
    private List<Long> phoneIds;

    public UserDTO(){}

    public UserDTO(User entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.mail = entity.getMail();
        this.phoneIds = entity.getPhones().stream()  
                              .map(Phone::getId)    
                              .collect(Collectors.toList());
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

    public List<Long> getPhones() {
        return phoneIds;
    }

}

package com.project.intercapp.dto;

import com.project.intercapp.entities.User;

public class UserDTO {
    
    private Long id;
    private String name;
    private String mail;

    public UserDTO(){}

    public UserDTO(User entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.mail = entity.getMail();
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

}

package com.project.intercapp.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.project.intercapp.entities.Student;

public class StudentLoginDTO{
    
    private String mail;
    private String password;


    public StudentLoginDTO(){}

    public StudentLoginDTO(Student entity){
        this.mail = entity.getMail();
        this.password = entity.getPassword();
    }

    public String getMail() {
        return mail;
    }

    public String getPassword() {
        return password;
    }

}
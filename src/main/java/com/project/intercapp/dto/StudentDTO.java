package com.project.intercapp.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.project.intercapp.entities.Phone;
import com.project.intercapp.entities.Student;

public class StudentDTO extends UserDTO{
    
    private List<Long> phoneIds;
    private String register;

    public StudentDTO(){}

    public StudentDTO(Student entity){
        super(entity);
        this.register = entity.getRegister();
        this.phoneIds = entity.getPhones().stream()  
                              .map(Phone::getId)    
                              .collect(Collectors.toList());
    }

    public String getRegister() {
        return register;
    }

    public List<Long> getPhones() {
        return phoneIds;
    }

}

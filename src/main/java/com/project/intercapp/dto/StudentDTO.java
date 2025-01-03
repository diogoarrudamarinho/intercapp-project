package com.project.intercapp.dto;

import com.project.intercapp.entities.Student;

public class StudentDTO extends UserDTO{
    
    private String register;

    public StudentDTO(){}

    public StudentDTO(Student entity){
        super(entity);
        this.register = entity.getRegister();
    }

    public String getRegister() {
        return register;
    }

    public void setRegister(String register) {
        this.register = register;
    }

}

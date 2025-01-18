package com.project.intercapp.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.project.intercapp.entities.Phone;
import com.project.intercapp.entities.Student;

public class StudentDTO{
    
    private Long id;

    private String name;
    private String mail;
    private List<Long> phonesIds;
    private String register;


    public StudentDTO(){}

    public StudentDTO(Student entity){
        this.id = entity.getId();
        this.mail = entity.getMail();
        this.name = entity.getName();
        this.register = entity.getRegister();
        this.phonesIds = entity.getPhones().stream()  
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

	public List<Long> getPhonesIds() {
		return phonesIds;
	}

	public String getRegister() {
		return register;
	}

}

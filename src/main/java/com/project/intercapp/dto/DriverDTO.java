package com.project.intercapp.dto;

import java.util.stream.Collectors;

import com.project.intercapp.entities.CPF;
import com.project.intercapp.entities.Driver;
import com.project.intercapp.entities.Phone;

public class DriverDTO extends UserDTO{
    
    private CPF cpf;

    public DriverDTO(Driver entity) {
        this.id = entity.getId();
        this.mail = entity.getMail();
        this.name = entity.getName();
        this.cpf = entity.getCPF();
        this.phonesIds = entity.getPhones().stream()  
                              .map(Phone::getId)    
                              .collect(Collectors.toList());;
    }

    public DriverDTO(){}

    public CPF getCpf() {
        return cpf;
    }


}

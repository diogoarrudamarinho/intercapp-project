package com.project.intercapp.dto;

import com.project.intercapp.entities.CPF;
import com.project.intercapp.entities.Driver;

public class DriverDTO extends UserDTO{
    
    private CPF cpf;

    public DriverDTO(Driver entity, CPF cpf) {
        super(entity);
        this.cpf = cpf;
    }

    public DriverDTO(){}

    public CPF getCpf() {
        return cpf;
    }


}

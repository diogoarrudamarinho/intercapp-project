package com.project.intercapp.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_student")
public class Student extends User{
   
    private String register;

    public Student(){
    }

    public Student(String register){
        super();
        this.register = register;
    }

    public String getRegister() {
        return register;
    }

    public void setRegister(String register) {
        this.register = register;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + ((register == null) ? 0 : register.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (!super.equals(obj))
            return false;
        if (getClass() != obj.getClass())
            return false;
        Student other = (Student) obj;
        if (register == null) {
            if (other.register != null)
                return false;
        } else if (!register.equals(other.register))
            return false;
        return true;
    }

}

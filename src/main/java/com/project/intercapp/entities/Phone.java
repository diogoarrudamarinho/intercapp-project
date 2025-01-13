package com.project.intercapp.entities;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name= "tb_phone")
public class Phone {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer ddd;
    private Long number;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    public Phone(){
    }

    public Phone(Long id, Integer ddd, Long number, Student student) {
        this.id = id;
        this.ddd = ddd;
        this.number = number;
        this.student = student;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDdd() {
        return ddd;
    }

    public void setDdd(Integer ddd) {
        this.ddd = ddd;
    }

    public Long getNumber() {
        return number;
    }

    public void setNumber(Long number) {
        this.number = number;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    @Override
    public int hashCode() {
        return Objects.hash(ddd, number, student);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Phone other = (Phone) obj;
        if (!Objects.equals(this.ddd, other.ddd)) {
            return false;
        }
        if (!Objects.equals(this.number, other.number)) {
            return false;
        }
        return Objects.equals(this.student, other.student);
    }

    public static boolean isValid(Integer ddd, Long number){
        return  (ddd > 11 && ddd < 99) &&
                (number > 20000000 && number < 999999999);
    }
}

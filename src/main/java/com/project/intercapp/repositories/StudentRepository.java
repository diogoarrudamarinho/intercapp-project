package com.project.intercapp.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.intercapp.entities.Student;

public interface StudentRepository extends JpaRepository<Student, Long>{
   
    Optional<Student> findByRegister(String register);
}

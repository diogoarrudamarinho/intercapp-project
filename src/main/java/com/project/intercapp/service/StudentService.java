package com.project.intercapp.service;

import java.util.List;

import com.project.intercapp.dto.StudentDTO;
import com.project.intercapp.entities.Student;

public interface StudentService {
    
    StudentDTO create(Student newStudent);
    StudentDTO findById(Long id);
    Student findEntityById(Long id);
    StudentDTO update(Long id, Student student);
    List<StudentDTO> findAll();


}

package com.project.intercapp.service.implementation;

import java.util.List;

import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.intercapp.dto.StudentDTO;
import com.project.intercapp.entities.Student;
import com.project.intercapp.repositories.StudentRepository;
import com.project.intercapp.service.StudentService;

@Service
public class StudentServiceImp implements StudentService{

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public StudentDTO create(Student newStudent) {
        if (newStudent.getId() != null && studentRepository.existsById(newStudent.getId()))
            throw new IllegalArgumentException("User ID already exists");

        return new StudentDTO(studentRepository.save(newStudent));
    }

    @Override
    public StudentDTO findById(Long id) {
        return new StudentDTO( studentRepository.findById(id)
                            .orElseThrow(() -> new ObjectNotFoundException(
                                                "Object not Found", id))); 
    }

    @Override
    public StudentDTO update(Long id, Student student) {

        Student newStudent = studentRepository.findById(id).get();

        newStudent.setName(student.getName());
        newStudent.setMail(student.getMail());
        newStudent.setPhones(student.getPhones());
        newStudent.setRegister(student.getRegister());

        return new StudentDTO(studentRepository.save(newStudent)); 
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentDTO> findAll() {
        return studentRepository.findAll()
                .stream().map(StudentDTO::new)
                .toList();
    }  
}

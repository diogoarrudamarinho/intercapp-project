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
    public Student findEntityById(Long studentId) {
        return studentRepository.findById(studentId)
                .orElseThrow(() -> new ObjectNotFoundException("Student not found", studentId));
    }

    @Override
    @Transactional
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
    @Transactional
    public StudentDTO update(Long id, Student newStudent) {

        Student student = studentRepository.findById(id).get();

        student.setName(newStudent.getName());
        student.setMail(newStudent.getMail());
        student.setPhones(newStudent.getPhones());
        student.setRegister(newStudent.getRegister());

        return new StudentDTO(studentRepository.save(student)); 
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentDTO> findAll() {
        return studentRepository.findAll()
                .stream().map(StudentDTO::new)
                .toList();
    }  
}

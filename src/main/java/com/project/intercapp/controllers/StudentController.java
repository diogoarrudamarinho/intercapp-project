package com.project.intercapp.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.project.intercapp.dto.StudentDTO;
import com.project.intercapp.entities.Student;
import com.project.intercapp.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping
    public ResponseEntity<StudentDTO> create(@RequestBody Student newStudent) {
        StudentDTO studentCreated = studentService.create(newStudent);
        URI location = ServletUriComponentsBuilder
                        .fromCurrentRequest()
                        .path("/{id}")
                        .buildAndExpand(studentCreated.getId())
                        .toUri();
        return ResponseEntity.created(location).body(studentCreated);    
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentDTO> update(@PathVariable Long id, @RequestBody Student newStudent) {
        return ResponseEntity.ok(studentService.update(id, newStudent));
    }

    @DeleteMapping("/delete/{register}")
    public ResponseEntity<Boolean> deleteByRegister(@PathVariable String register) {
        return ResponseEntity.ok(studentService.delete(register));
    }

    @GetMapping
    public ResponseEntity<List<StudentDTO>> findAll() {
        return ResponseEntity.ok(studentService.findAll());
    }
    
}

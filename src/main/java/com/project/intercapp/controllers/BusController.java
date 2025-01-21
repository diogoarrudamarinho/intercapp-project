package com.project.intercapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.intercapp.dto.BusDTO;
import com.project.intercapp.dto.BusMinDTO;
import com.project.intercapp.dto.BusSeatDTO;
import com.project.intercapp.entities.Bus;
import com.project.intercapp.service.BusService;

@RestController
@RequestMapping("/buses")
public class BusController {

    @Autowired
    private BusService busService;

    @PostMapping
    public ResponseEntity<BusDTO> create(@RequestBody Bus newBus) {
        return ResponseEntity.status(HttpStatus.CREATED).body(busService.create(newBus));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BusDTO> update(@PathVariable Long id, @RequestBody Bus newBus) {
        return ResponseEntity.ok(busService.update(id, newBus));
    }

    @GetMapping
    public ResponseEntity<List<BusMinDTO>> findAll() {
        return ResponseEntity.ok(busService.findAllMin());
    }

    @GetMapping("/{id}/seats")
    public ResponseEntity<BusSeatDTO> findSeatsByBus(@PathVariable Long id) {
        return ResponseEntity.ok(busService.findSeatsById(id));
    }
}
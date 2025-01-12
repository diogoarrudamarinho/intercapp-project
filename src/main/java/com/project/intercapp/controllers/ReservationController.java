package com.project.intercapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.intercapp.dto.ReservationDTO;
import com.project.intercapp.service.ReservationService;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<ReservationDTO>> findReservationsByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(reservationService.findAllByStudent(studentId));
    }

    @PostMapping("/{studentId}/reservations/{seatId}")
    public ResponseEntity<ReservationDTO> createReservation(@PathVariable Long studentId, @PathVariable Long seatId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(reservationService.create(studentId, seatId));
    }

    @PutMapping("/reservations/{reservationId}")
    public ResponseEntity<Void> cancelReservation(@PathVariable Long reservationId) {
        reservationService.cancel(reservationId);
        return ResponseEntity.noContent().build();
    } 
}

package com.project.intercapp.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.intercapp.entities.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long>{
    
    Optional<Reservation> findBySeatIdAndStatus(Long seatId, boolean status);

    Optional<Reservation> findByStudentIdAndBusIdAndStatus(Long studentId, Long busId, boolean status);
}

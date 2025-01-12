package com.project.intercapp.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.intercapp.entities.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long>{
    
    Optional<Reservation> findActiveBySeatId(Long seatId, boolean status);

    Optional<List<Reservation>> findActiveByStudent(Long studentId, boolean status);

    Optional<Reservation> findActiveByStudentIdAndBusId(Long studentId, Long busId, boolean status);
}

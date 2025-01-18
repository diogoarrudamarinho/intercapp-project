package com.project.intercapp.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.intercapp.entities.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long>{
    
    Optional<Reservation> findBySeatIdAndStatus(Long seatId, boolean status);

    Optional<List<Reservation>> findByStudentIdAndStatus(Long studentId, boolean status);

    @Query( "SELECT r FROM Reservation r " +
            "WHERE r.student.id = :studentId " +
            "AND r.seat.bus.id = :busId " +
            "AND r.status = :status")
    Optional<Reservation> findByStudentIdAndBusIdAndStatus( @Param("studentId") Long studentId, 
                                                            @Param("busId") Long busId, 
                                                            @Param("status") boolean status);

    List<Reservation> findAllByStudentId(Long studentId);
}

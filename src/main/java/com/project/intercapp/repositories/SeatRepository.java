package com.project.intercapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.intercapp.entities.Seat;

public interface SeatRepository extends JpaRepository<Seat, Long>{
    
    @Query("SELECT s FROM Seat s WHERE s.bus.id = :busId")
    List<Seat> findByBusId(Long busId);
}
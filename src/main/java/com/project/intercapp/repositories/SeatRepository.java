package com.project.intercapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.intercapp.entities.Seat;

public interface SeatRepository extends JpaRepository<Seat, Long>{
    
    List<Seat> findByBusId(Long busId);
}

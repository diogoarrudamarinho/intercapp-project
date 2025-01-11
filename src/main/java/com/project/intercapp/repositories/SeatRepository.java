package com.project.intercapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.intercapp.entities.Seat;

public interface SeatRepository extends JpaRepository<Seat, Long>{
    
}

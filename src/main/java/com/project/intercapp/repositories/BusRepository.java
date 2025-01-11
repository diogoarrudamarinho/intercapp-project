package com.project.intercapp.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.intercapp.entities.Bus;

public interface BusRepository extends JpaRepository<Bus, Long>{
    
    Optional<Bus> findByPlate(String plate);
    boolean existsByPlate(String plate);
}

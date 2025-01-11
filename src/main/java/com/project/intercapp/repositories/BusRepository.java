package com.project.intercapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.intercapp.entities.Bus;

public interface BusRepository extends JpaRepository<Bus, Long>{
    
}

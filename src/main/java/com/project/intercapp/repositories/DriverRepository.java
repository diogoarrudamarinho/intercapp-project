package com.project.intercapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.intercapp.entities.Driver;


public interface DriverRepository extends JpaRepository<Driver, Long>{
    
}

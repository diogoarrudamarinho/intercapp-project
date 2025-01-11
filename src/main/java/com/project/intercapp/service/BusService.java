package com.project.intercapp.service;

import java.util.List;

import com.project.intercapp.dto.BusDTO;
import com.project.intercapp.dto.BusMinDTO;
import com.project.intercapp.entities.Bus;

public interface BusService {
    
    BusDTO create(Bus newBus);
    BusDTO findById(Long id);
    BusDTO findByPlate(String plate);
    BusMinDTO findMinById(Long id);
    BusMinDTO findMinByPlate(String plate);
    BusDTO update(String plate, Bus bus);
    List<BusDTO> findAll();

}

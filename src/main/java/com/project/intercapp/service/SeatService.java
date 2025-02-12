package com.project.intercapp.service;

import java.util.List;

import com.project.intercapp.entities.Seat;
import com.project.intercapp.entities.Bus;

public interface SeatService {
    
    List<Seat> create(Bus bus);
    Seat findById(Long id);
    List<Seat> findByBusId(Long busId);
    List<Seat> add(Bus bus, int quantity);
    List<Seat> remove(Bus bus, int quantity);
    void removeAll(Long busId);

}

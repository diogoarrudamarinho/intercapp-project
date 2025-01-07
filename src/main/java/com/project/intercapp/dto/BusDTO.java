package com.project.intercapp.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.project.intercapp.entities.Bus;
import com.project.intercapp.entities.Seat;

public class BusDTO {
    
    private Long id;
    private String model;
    private String plate;
    private Integer capacity;
    private List<Long> seatIds; // IDs dos assentos

    public BusDTO(){}

    public BusDTO(Bus entity) {
        this.id = entity.getId();
        this.model = entity.getModel();
        this.plate = entity.getPlate();
        this.capacity = entity.getCapacity();
        this.seatIds = entity.getSeats().stream()
                             .map(Seat::getId) // Apenas IDs
                             .collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }

    public String getModel() {
        return model;
    }

    public String getPlate() {
        return plate;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public List<Long> getSeats() {
        return seatIds;
    }
}

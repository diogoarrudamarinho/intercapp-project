package com.project.intercapp.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.project.intercapp.entities.Bus;

public class BusSeatDTO {
    
    private Long id;
    private List<SeatDTO> seats;

    public BusSeatDTO() {}

    public BusSeatDTO(Bus entity) {
        this.id = entity.getId();
        this.seats = entity.getSeats().stream()
                           .map(SeatDTO::new)
                           .collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }

    public List<SeatDTO> getSeats() {
        return seats;
    }
}

package com.project.intercapp.dto;

import com.project.intercapp.entities.Seat;

public class SeatDTO {

    private Long id;
    private int number;

    public SeatDTO() {}

    public SeatDTO(Seat entity){
        this.id = entity.getId();
        this.number = entity.getNumber();
    }

    public Long getId() {
        return id;
    }

    public int getNumber() {
        return number;
    }
}

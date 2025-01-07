package com.project.intercapp.dto;

import com.project.intercapp.entities.Seat;

public class SeatDTO {

    private Long id;
    private int number;
    private Long busId;
    private Long reservationId;

    public SeatDTO() {}

    public SeatDTO(Seat entity){
        this.id = entity.getId();
        this.number = entity.getNumber();
        this.busId = entity.getBus().getId();
        this.reservationId = entity.getReservation().getId();
    }

    public Long getId() {
        return id;
    }

    public int getNumber() {
        return number;
    }

    public Long getBusId() {
        return busId;
    }

    public Long getReservationId() {
        return reservationId;
    }

}

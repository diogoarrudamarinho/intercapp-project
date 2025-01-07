package com.project.intercapp.dto;

import java.time.LocalDateTime;

import com.project.intercapp.entities.Reservation;

public class ReservationDTO {

    private Long id;
    private Long studentId;
    private Long seatId;
    private LocalDateTime reservationDate;
    private boolean status;

    public ReservationDTO(){}

    public ReservationDTO(Reservation entity) {
        this.id = entity.getId();
        this.studentId = entity.getStudent().getId(); 
        this.seatId = entity.getSeat().getId();     
        this.reservationDate = entity.getReservationDate();
        this.status = entity.getStatus();
    }

    public Long getId() {
        return id;
    }

    public Long getStudentId() {
        return studentId;
    }

    public Long getSeatId() {
        return seatId;
    }

    public LocalDateTime getReservationDate() {
        return reservationDate;
    }

    public boolean isStatus() {
        return status;
    }

}


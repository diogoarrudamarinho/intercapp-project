package com.project.intercapp.service;

import com.project.intercapp.dto.ReservationDTO;

public interface ReservationService {
    
    ReservationDTO create(Long studentId, Long seatId);
    boolean hasActiveReservation(Long studentId);
    void cancel(Long id);
}

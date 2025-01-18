package com.project.intercapp.service;

import java.util.List;

import com.project.intercapp.dto.ReservationDTO;

public interface ReservationService {
    
    ReservationDTO create(Long studentId, Long seatId);
    List<ReservationDTO> findAllByStudent(Long studentId);
    void cancel(Long id);
}

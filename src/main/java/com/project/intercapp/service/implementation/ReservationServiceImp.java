package com.project.intercapp.service.implementation;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.intercapp.dto.ReservationDTO;
import com.project.intercapp.entities.Reservation;
import com.project.intercapp.entities.Seat;
import com.project.intercapp.entities.Student;
import com.project.intercapp.repositories.ReservationRepository;
import com.project.intercapp.service.ReservationService;
import com.project.intercapp.service.SeatService;
import com.project.intercapp.service.StudentService;

@Service
public class ReservationServiceImp implements ReservationService{
    
    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private StudentService studentService;

    @Autowired
    private SeatService seatService;

    @Override
    @Transactional
    public ReservationDTO create(Long studentId, Long seatId) {

        Student student = studentService.findEntityById(studentId);

        Seat seat = seatService.findById(seatId);



        if (!isSeatAvailable(seatId)) {
            throw new IllegalArgumentException("Seat is already reserved");
        }

        if (hasActiveReservation(student.getId(), seat.getBus().getId())) {
            throw new IllegalArgumentException("Student already has an active reservation for this bus");
        }
        
        Reservation reservation = new Reservation(null, seat, student);
        reservation.setStatus(true);
        reservation.setReservationDate(LocalDateTime.now());
        
        return new ReservationDTO(reservationRepository.save(reservation));
    }

    @Override
    @Transactional
    public void cancel(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                                .orElseThrow(() -> new ObjectNotFoundException("Reservation not found", id));

        reservation.setStatus(false);
        reservationRepository.save(reservation);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReservationDTO> findAllByStudent(Long studentId) {
        return reservationRepository.findAllByStudentId(studentId)
                                            .stream()
                                            .map(ReservationDTO::new)
                                            .toList();
    }

    private boolean isSeatAvailable(Long seatId) {
        return reservationRepository.findBySeatIdAndStatus(seatId, true).isEmpty();
    }

    private boolean hasActiveReservation(Long studentId, Long busId) {
        return reservationRepository.findByStudentIdAndBusIdAndStatus(studentId, busId, true).isPresent();
    }
}

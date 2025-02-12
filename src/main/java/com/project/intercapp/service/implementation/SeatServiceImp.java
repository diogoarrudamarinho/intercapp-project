package com.project.intercapp.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.intercapp.entities.Bus;
import com.project.intercapp.entities.Seat;
import com.project.intercapp.repositories.SeatRepository;
import com.project.intercapp.service.SeatService;

@Service
public class SeatServiceImp implements SeatService{
    
    @Autowired
    private SeatRepository seatRepository;

    @Override
    @Transactional
    public List<Seat> create(Bus bus) {
        
        List<Seat> seats = new ArrayList<>();

        for (int i = 1; i <= bus.getCapacity(); i++){
            Seat seat = new Seat();
            seat.setNumber(i);
            seat.setBus(bus); 
            seats.add(seat);
        }
        
        return seatRepository.saveAll(seats);
    }

    @Override
    @Transactional
    public void removeAll(Long busId) {
        List<Seat> seats = seatRepository.findByBusId(busId);
        
        seatRepository.deleteAll(seats);
    }
    
    @Override
    public Seat findById(Long id){
        return seatRepository.findById(id)
                             .orElseThrow(() -> new ObjectNotFoundException(
                                                    "Object Not Found", id)); 
    }

    @Override
    public List<Seat> findByBusId(Long busId){
        return seatRepository.findByBusId(busId);
    }

    @Override
    @Transactional
    public List<Seat> add(Bus bus, int quantity){

        List<Seat> seats = seatRepository.findByBusId(bus.getId());

        for (int i = seats.size() + 1; i <= quantity; i++){
            Seat seat = new Seat();
            seat.setNumber(i);
            seat.setBus(bus); 
            seats.add(seat);
        }

        return seatRepository.saveAll(seats);
    }

    @Override 
    @Transactional
    public List<Seat> remove(Bus bus, int quantity){

        List<Seat> seats = bus.getSeats();
        List<Seat> toRemove = seats.subList(seats.size() - quantity, seats.size());

        seats.removeAll(toRemove);
        seatRepository.deleteAll(toRemove);

        return seats;
    }
}

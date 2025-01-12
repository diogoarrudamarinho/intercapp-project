package com.project.intercapp.service.implementation;

import java.util.List;

import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.intercapp.dto.BusDTO;
import com.project.intercapp.dto.BusMinDTO;
import com.project.intercapp.entities.Bus;
import com.project.intercapp.entities.Seat;
import com.project.intercapp.repositories.BusRepository;
import com.project.intercapp.service.BusService;
import com.project.intercapp.service.SeatService;


@Service
public class BusServiceImp implements BusService {
    
    @Autowired
    private BusRepository busRepository;

    @Autowired
    private SeatService seatService;
    
    @Override
    @Transactional
    public BusDTO create(Bus newBus){
        if (newBus.getPlate() != null && busRepository.existsByPlate(newBus.getPlate()))
            throw new IllegalArgumentException("Bus already exists");

        Bus bus = busRepository.save(newBus);

        List<Seat> seats = seatService.create(bus);
        bus.setSeats(seats);

        return new BusDTO(bus);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Bus bus = busRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Bus not found", id));

        seatService.removeAll(bus.getId());

        busRepository.delete(bus);
    }

    @Override
    public BusDTO findById(Long id) {
        return new BusDTO(busRepository.findById(id)
                          .orElseThrow(() -> new ObjectNotFoundException(
                                                 "Object not Found", id)));
    }

    @Override
    public BusDTO findByPlate(String plate) {
        return new BusDTO(busRepository.findByPlate(plate)
                          .orElseThrow(() -> new IllegalArgumentException(
                                                 "Object " + plate + " not Found")));
    }

    @Override
    public BusMinDTO findMinByPlate(String plate) {
        return new BusMinDTO(busRepository.findByPlate(plate)
                             .orElseThrow(() -> new IllegalArgumentException(
                                                    "Object " + plate + " not Found")));
                    
    }

    @Override
    public BusMinDTO findMinById(Long id) {
        return new BusMinDTO(busRepository.findById(id)
                            .orElseThrow(() -> new ObjectNotFoundException(
                                                "Object not Found", id)));
    }
    
    @Override
    @Transactional
    public BusDTO update(Long id, Bus newBus){

        Bus bus = busRepository.findById(id).get();

        bus.setModel(newBus.getModel());
        bus.setPlate(newBus.getPlate());

        List<Seat> seats = bus.getSeats();

        if (newBus.getCapacity() > bus.getCapacity())
            seats = seatService.add(bus, newBus.getCapacity());
        else if (newBus.getCapacity() < bus.getCapacity())
            seats = seatService.remove(bus, bus.getCapacity() - newBus.getCapacity());    
        
        bus.setCapacity(newBus.getCapacity());
        bus.setSeats(seats);
       
        return new BusDTO(busRepository.save(bus)); 
    }

    @Override
    @Transactional(readOnly = true)
    public List<BusDTO> findAll(){
        return busRepository.findAll()
                            .stream().map(BusDTO::new)
                            .toList();                                             
    }

    @Override
    @Transactional(readOnly = true)
    public List<BusMinDTO> findAllMin(){
        return busRepository.findAll()
                            .stream().map(BusMinDTO::new)
                            .toList();                                             
    }
}

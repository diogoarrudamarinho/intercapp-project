package com.project.intercapp.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.intercapp.dto.ScheduleDTO;
import com.project.intercapp.entities.Schedule;
import com.project.intercapp.repositories.ScheduleRepository;
import com.project.intercapp.service.ScheduleService;

@Service
public class ScheduleServiceImp implements ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Override
    @Transactional
    public ScheduleDTO create(Schedule newSchedule) {
        return new ScheduleDTO(scheduleRepository.save(newSchedule));
    }

    @Override
    @Transactional
    public ScheduleDTO update(Long id, Schedule newSchedule) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Schedule not found", id));

        schedule.setDepartureTime(newSchedule.getDepartureTime());
        schedule.setArrivalTime(newSchedule.getArrivalTime());
        schedule.setRoute(newSchedule.getRoute());
        schedule.setBus(newSchedule.getBus());

        return new ScheduleDTO(scheduleRepository.save(schedule));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ScheduleDTO> findAll() {
        return scheduleRepository.findAll().stream().map(ScheduleDTO::new).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ScheduleDTO findById(Long id) {
        return new ScheduleDTO(scheduleRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Schedule not found", id)));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Schedule not found", id));
        scheduleRepository.delete(schedule);
    }
}
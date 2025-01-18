package com.project.intercapp.service;

import java.util.List;

import com.project.intercapp.dto.ScheduleDTO;
import com.project.intercapp.entities.Schedule;

public interface ScheduleService {
    ScheduleDTO create(Schedule newSchedule);
    ScheduleDTO update(Long id, Schedule newSchedule);
    List<ScheduleDTO> findAll();
    ScheduleDTO findById(Long id);
    void delete(Long id);
}
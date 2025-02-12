package com.project.intercapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.intercapp.dto.ScheduleDTO;
import com.project.intercapp.entities.Bus;
import com.project.intercapp.entities.Schedule;
import com.project.intercapp.service.BusService;
import com.project.intercapp.service.ScheduleService;

@RestController
@RequestMapping("/schedules")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @Autowired
    private BusService busService;

    @PostMapping
    public ResponseEntity<ScheduleDTO> create(@RequestBody ScheduleDTO newSchedule) {
        Bus bus = busService.findEntityById(newSchedule.getBusId());
        Schedule schedule = new Schedule();
        schedule.setDepartureTime(newSchedule.getDepartureTime());
        schedule.setArrivalTime(newSchedule.getArrivalTime());
        schedule.setRoute(newSchedule.getRoute());
        schedule.setBus(bus);
        return ResponseEntity.status(HttpStatus.CREATED).body(scheduleService.create(schedule));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ScheduleDTO> update(@PathVariable Long id, @RequestBody Schedule newSchedule) {
        return ResponseEntity.ok(scheduleService.update(id, newSchedule));
    }

    @GetMapping
    public ResponseEntity<List<ScheduleDTO>> findAll() {
        return ResponseEntity.ok(scheduleService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScheduleDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(scheduleService.findById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        scheduleService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
package com.project.intercapp.dto;

import java.time.LocalDateTime;

import com.project.intercapp.entities.Schedule;

public class ScheduleDTO {

    private Long id;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private String route;
    private Long busId;

    public ScheduleDTO() {
    }

    public ScheduleDTO(Schedule entity) {
        this.id = entity.getId();
        this.departureTime = entity.getDepartureTime();
        this.arrivalTime = entity.getArrivalTime();
        this.route = entity.getRoute();
        this.busId = entity.getBus().getId();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(LocalDateTime departureTime) {
        this.departureTime = departureTime;
    }

    public LocalDateTime getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(LocalDateTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public Long getBusId() {
        return busId;
    }

    public void setBusId(Long busId) {
        this.busId = busId;
    }
}
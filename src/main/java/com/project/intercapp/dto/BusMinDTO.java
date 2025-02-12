package com.project.intercapp.dto;

import com.project.intercapp.entities.Bus;

public class BusMinDTO {
    
    private Long id;
    private String model;
    private String plate;
    private Integer capacity;

    public BusMinDTO() {}

    public BusMinDTO(Bus entity){
        this.id = entity.getId();
        this.model = entity.getModel();
        this.plate = entity.getPlate();
        this.capacity = entity.getCapacity();
    }

    public Long getId() {
        return id;
    }

    public String getModel() {
        return model;
    }

    public String getPlate() {
        return plate;
    }

    public Integer getCapacity() {
        return capacity;
    }

}

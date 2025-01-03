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

    public void setId(Long id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getPlate() {
        return plate;
    }

    public void setPlate(String plate) {
        this.plate = plate;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

}

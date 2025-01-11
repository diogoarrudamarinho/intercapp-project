package com.project.intercapp.dto;

import com.project.intercapp.entities.Phone;

public class PhoneDTO {

    private Long id;
    private Integer ddd;
    private Long number;
    private Long userId;

    public PhoneDTO() {}

    public PhoneDTO(Phone entity) {
        this.id = entity.getId();
        this.ddd = entity.getDdd();
        this.number = entity.getNumber();
        this.userId = entity.getUser().getId();
    }

    public Long getId() {
        return id;
    }

    public Integer getDdd() {
        return ddd;
    }

    public Long getNumber() {
        return number;
    }

    public Long getUserId() {
        return userId;
    }
}

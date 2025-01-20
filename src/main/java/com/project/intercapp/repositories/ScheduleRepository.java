package com.project.intercapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.intercapp.entities.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
}
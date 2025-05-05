package com.richard.calendar.dtos;

public record EventDTO (
    Long id,
    String title,
    String date,
    String startHour,
    String endHour,
    Long projectId,
    String projectName,
    PropertyDTO[] propertyDTO
) {}


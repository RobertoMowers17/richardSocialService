package com.richard.calendar.dtos;

public record EventDTO (
    Long id,
    String title,
    String date,
    Long projectId,
    String projectName
) {}


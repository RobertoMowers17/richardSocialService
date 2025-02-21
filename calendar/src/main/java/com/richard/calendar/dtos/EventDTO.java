package com.richard.calendar.dtos;

import java.util.List;

public record EventDTO (
    Long id,
    String title,
    String date,
    Long projectId,
    String projectName,
    List<EventPropertiesDTO> eventProperties
) {}


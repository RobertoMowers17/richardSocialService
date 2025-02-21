package com.richard.calendar.dtos;

import java.util.List;

public record ProjectDTO(
    Long id,
    String name,
    List<EventDTO> events 
) {}


package com.richard.calendar.dtos;

public record EventPropertiesDTO(
    Long id,
    Long eventId,
    Long propertyId,
    String propertyName,
    String value
) {}

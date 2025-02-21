package com.richard.calendar.mappers;

import com.richard.calendar.dtos.EventPropertiesDTO;
import com.richard.calendar.models.EventProperty;

public class EventPropertiesMapper {
    public static EventPropertiesDTO toDTO(EventProperty eventProperty) {
        return new EventPropertiesDTO(
            eventProperty.getId(),
            eventProperty.getEvent().getId(),
            eventProperty.getProperty().getId(),
            eventProperty.getProperty().getName(),
            eventProperty.getValue()
        );
    }

    public static EventProperty toEntity(EventPropertiesDTO dto) {
        EventProperty eventProperty = new EventProperty();
        eventProperty.setId(dto.id());
        eventProperty.setValue(dto.value());
        return eventProperty;
    }
}

package com.richard.calendar.mappers;

import java.util.stream.Collectors;

import com.richard.calendar.dtos.EventDTO;
import com.richard.calendar.models.Event;
import com.richard.calendar.models.Project;

public class EventMapper {
    public static EventDTO toDTO(Event event) {
        return new EventDTO(
                event.getId(),
                event.getTitle(),
                event.getDate(),
                event.getProject() != null ? event.getProject().getId() : null,  // Si project es null, asigna null
                event.getProject() != null ? event.getProject().getName() : null, // Lo mismo para el nombre
                event.getEventProperties() != null
                        ? event.getEventProperties().stream().map(EventPropertiesMapper::toDTO).collect(Collectors.toList())
                        : null
        );
    }

    public static Event toEntity(EventDTO eventDTO, Project project) {
        Event event = new Event();
        event.setId(eventDTO.id());
        event.setTitle(eventDTO.title());
        event.setDate(eventDTO.date());
        event.setProject(project); // Asigna el proyecto relacionado
        return event;
    }
}

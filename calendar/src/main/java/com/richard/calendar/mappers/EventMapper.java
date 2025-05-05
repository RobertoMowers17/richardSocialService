package com.richard.calendar.mappers;

import com.richard.calendar.dtos.EventDTO;
import com.richard.calendar.dtos.PropertyDTO;
import com.richard.calendar.models.Event;
import com.richard.calendar.models.Project;

public class EventMapper {
    public static EventDTO toDTO(Event event) {
        PropertyDTO[] properties = event.getEventProperties() != null
                ? event.getEventProperties().stream()
                    .map(p -> new PropertyDTO(
                        p.getProperty().getId(),
                        p.getProperty().getName(), 
                        p.getValue()))
                    .toArray(PropertyDTO[]::new)
                : new PropertyDTO[0];

        return new EventDTO(
                event.getId(),
                event.getTitle(),
                event.getDate(),
                event.getStartHour(),
                event.getEndHour(),
                event.getProject() != null ? event.getProject().getId() : null,  // Si project es null, asigna null
                event.getProject() != null ? event.getProject().getName() : null,
                properties
        );
    }

    public static Event toEntity(EventDTO eventDTO, Project project) {
        Event event = new Event();
        event.setId(eventDTO.id());
        event.setTitle(eventDTO.title());
        event.setDate(eventDTO.date());
        event.setStartHour(eventDTO.startHour());
        event.setEndHour(eventDTO.endHour());
        event.setProject(project); // Asigna el proyecto relacionado
        return event;
    }
}

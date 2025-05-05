package com.richard.calendar.services;

import com.richard.calendar.dtos.EventDTO;
import com.richard.calendar.dtos.PropertyDTO;
import com.richard.calendar.mappers.EventMapper;
import com.richard.calendar.models.Event;
import com.richard.calendar.models.EventProperty;
import com.richard.calendar.models.Property;
import com.richard.calendar.models.Project;
import com.richard.calendar.repositories.EventRepository;
import com.richard.calendar.repositories.ProjectRepository;
import com.richard.calendar.repositories.PropertyRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final ProjectRepository projectRepository;
    private final PropertyRepository propertyRepository;

    public EventService(
        EventRepository eventRepository,
        ProjectRepository projectRepository,
        PropertyRepository propertyRepository
    ) {
        this.eventRepository = eventRepository;
        this.projectRepository = projectRepository;
        this.propertyRepository = propertyRepository;
    }

    // Obtener todos los eventos como DTOs
    public List<EventDTO> getAllEvents() {
        return eventRepository.findAll().stream()
                .map(EventMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<EventDTO> getEventsPerMonth(int year, int month) {
        try {
            String startDate = LocalDate.of(year, month, 1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            String endDate = LocalDate.of(year, month, YearMonth.of(year, month).lengthOfMonth()).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    
            return eventRepository.findEventsByMonth(startDate, endDate).stream()
                    .map(EventMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace(); // Esto imprimirá el stack trace en la consola
            throw new RuntimeException("Error fetching events", e);
        }
    }
    

    public EventDTO getEventById(Long id) {
        Event event = eventRepository.findById(id).orElse(null);
        return event != null ? EventMapper.toDTO(event) : null;
    }

    public EventDTO createEvent(EventDTO eventDTO) {
        // 1. Buscar proyecto
        Project project = projectRepository.findById(eventDTO.projectId())
                .orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado con ID: " + eventDTO.projectId()));

        // 2. Convertir a entidad base
        Event event = EventMapper.toEntity(eventDTO, project);

        // 3. Asociar propiedades
        if (eventDTO.propertyDTO() != null) {
            List<EventProperty> props = java.util.Arrays.stream(eventDTO.propertyDTO())
                .map(dto -> {
                    Property property = propertyRepository.findById(dto.id())
                        .orElseThrow(() -> new IllegalArgumentException("Propiedad no encontrada con ID: " + dto.id()));

                    EventProperty ep = new EventProperty();
                    ep.setEvent(event);
                    ep.setProperty(property);
                    ep.setValue(dto.description()); // description como value
                    ep.setDescription(dto.name()); // opcional
                    return ep;
                }).collect(Collectors.toList());

            event.setEventProperties(props);
        }

        // 4. Guardar evento completo
        Event savedEvent = eventRepository.save(event);
        return EventMapper.toDTO(savedEvent);
    }
}

package com.richard.calendar.services;

import com.richard.calendar.dtos.EventDTO;
import com.richard.calendar.mappers.EventMapper;
import com.richard.calendar.models.Event;
import com.richard.calendar.repositories.EventRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    // Obtener todos los eventos como DTOs
    public List<EventDTO> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return events.stream()
                     .map(EventMapper::toDTO) // Convertir cada entidad a DTO
                     .collect(Collectors.toList());
    }

    public List<EventDTO> getEventsPerMonth(int year, int month) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        String startDate = LocalDate.of(year, month, 1).format(formatter);
        String endDate = LocalDate.of(year, month, YearMonth.of(year, month).lengthOfMonth()).format(formatter);

        List<Event> events = eventRepository.findEventsByMonth(startDate, endDate);

        System.out.println(startDate);
        System.out.println(endDate);
        System.out.println(events);
        return events.stream()
                    .map(EventMapper::toDTO)
                    .collect(Collectors.toList());
    }

    // Obtener un evento por ID como DTO
    public EventDTO getEventById(Long id) {
        Event event = eventRepository.findById(id).orElse(null);
        return event != null ? EventMapper.toDTO(event) : null; // Convertir la entidad a DTO
    }

    // Crear un evento a partir de un DTO
    public EventDTO createEvent(EventDTO eventDTO) {
        // Convertir el DTO a entidad
        Event event = EventMapper.toEntity(eventDTO, null);
        Event savedEvent = eventRepository.save(event);
        return EventMapper.toDTO(savedEvent); // Convertir la entidad guardada a DTO
    }
}

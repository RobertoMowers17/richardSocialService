package com.richard.calendar.controllers;

import com.richard.calendar.dtos.EventDTO;
import com.richard.calendar.services.EventService;

import java.util.List;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "*") 
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    public String getMethodName(@RequestParam String param) {
        return new String();
    }

    @GetMapping
    public List<EventDTO> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/bymonth")
    public List<EventDTO> getEventsPerMonth(@RequestParam("year") int year, @RequestParam("month") int month) {
        return eventService.getEventsPerMonth(year, month);

    }
    

    @GetMapping("/{id}")
    public EventDTO obtenerEventos(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    @PostMapping
    public EventDTO crearEvento(@RequestBody EventDTO event) {
        return eventService.createEvent(event);
    }
}


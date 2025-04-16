package com.richard.calendar.models;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "event_properties")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventProperty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String value;

    private String description;
    
    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @ManyToOne
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

}

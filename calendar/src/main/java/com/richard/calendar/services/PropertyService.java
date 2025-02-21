package com.richard.calendar.services;

import com.richard.calendar.dtos.PropertyDTO;
import com.richard.calendar.mappers.PropertyMapper;
import com.richard.calendar.models.Property;
import com.richard.calendar.repositories.PropertyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PropertyService {
    private final PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    // Obtener todas las propiedades como DTOs
    public List<PropertyDTO> getAllProperties() {
        List<Property> properties = propertyRepository.findAll();
        return properties.stream()
                         .map(PropertyMapper::toDTO) // Convertir cada entidad a DTO
                         .collect(Collectors.toList());
    }

    // Obtener una propiedad por ID como DTO
    public PropertyDTO getPropertyById(Long id) {
        Property property = propertyRepository.findById(id).orElse(null);
        return property != null ? PropertyMapper.toDTO(property) : null; // Convertir la entidad a DTO
    }

    // Crear una propiedad a partir de un DTO
    public PropertyDTO createProperty(PropertyDTO propertyDTO) {
        // Convertir el DTO a entidad
        Property property = PropertyMapper.toEntity(propertyDTO);
        Property savedProperty = propertyRepository.save(property);
        return PropertyMapper.toDTO(savedProperty); // Convertir la entidad guardada a DTO
    }
}

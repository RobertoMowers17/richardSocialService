package com.richard.calendar.mappers;

import com.richard.calendar.dtos.PropertyDTO;
import com.richard.calendar.models.Property;

public class PropertyMapper {
    public static PropertyDTO toDTO(Property property) {
        return new PropertyDTO(
            property.getId(),
            property.getName(),
            property.getDescription()
        );
    }

    public static Property toEntity(PropertyDTO propertyDTO) {
        Property property = new Property();
        property.setId(propertyDTO.id());
        property.setName(propertyDTO.name());
        property.setDescription(propertyDTO.description());
        return property;
    }
}

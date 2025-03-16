package com.richard.calendar.controllers;


import java.util.*;

import org.springframework.http.ResponseEntity;

//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.*;

import com.richard.calendar.dtos.PropertyDTO;
import com.richard.calendar.services.PropertyService;



@RestController
@RequestMapping("/properties")
@CrossOrigin(origins = "*") 
public class PropertyController {
    private final PropertyService propertyService;

public PropertyController(PropertyService propertyService) {
    this.propertyService = propertyService;
}


    @GetMapping
    public List<PropertyDTO> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @GetMapping("/{id}")
    public PropertyDTO getPropertyById(@PathVariable Long id) {
        return propertyService.getPropertyById(id);
    }

    @PostMapping
    public PropertyDTO createProperty(@RequestBody PropertyDTO property) {
        return propertyService.createProperty(property);
    }

    @PutMapping("/{id}")
    public PropertyDTO updateProperty(@PathVariable Long id, @RequestBody PropertyDTO propertyDTO) {
        return propertyService.updateProperty(id, propertyDTO);
    }
	
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
    boolean deleted = propertyService.deleteProperty(id);
    if (deleted) {
        return ResponseEntity.noContent().build();
    } else {
        return ResponseEntity.notFound().build();
    }
}

}

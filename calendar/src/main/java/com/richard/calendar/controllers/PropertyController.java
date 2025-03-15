package com.richard.calendar.controllers;

import java.util.*;

//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.*;

import com.richard.calendar.dtos.PropertyDTO;
import com.richard.calendar.services.PropertyService;



@RestController
@RequestMapping("/properties")
@CrossOrigin(origins = "*") 
public class PropertyController {
    private final PropertyService propertieService;

    public PropertyController(PropertyService propertieService) {
        this.propertieService = propertieService;
    }

    @GetMapping
    public List<PropertyDTO> getAllProperties() {
        return propertieService.getAllProperties();
    }

    @GetMapping("/{id}")
    public PropertyDTO getPropertieById(@PathVariable Long id) {
        return propertieService.getPropertyById(id);
    }

    @PostMapping
    public PropertyDTO createPropertie(@RequestBody PropertyDTO property) {
        return propertieService.createProperty(property);
    }

    @DeleteMapping("/{id}")
    public String deletePropertie(@PathVariable Long id) {
        return propertieService.deleteProperty(id);
    }

}

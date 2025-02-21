package com.richard.calendar.controllers;

import java.util.*;

import org.springframework.web.bind.annotation.*;

import com.richard.calendar.dtos.ProjectDTO;
import com.richard.calendar.services.ProjectService;


@RestController
@RequestMapping("/projects")
@CrossOrigin(origins = "*") 
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<ProjectDTO> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    public ProjectDTO getProjects(@PathVariable Long id) {
        return projectService.getProjectById(id);
    }

    @PostMapping
    public ProjectDTO createProject(@RequestBody ProjectDTO project) {
        return projectService.createProject(project);
    }
}

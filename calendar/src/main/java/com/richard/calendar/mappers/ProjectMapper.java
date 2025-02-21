package com.richard.calendar.mappers;

import com.richard.calendar.dtos.ProjectDTO;
import com.richard.calendar.models.Project;

import java.util.stream.Collectors;

public class ProjectMapper {
    public static ProjectDTO toDTO(Project project) {
        return new ProjectDTO(
            project.getId(),
            project.getName(),
            project.getEvents() != null 
                ? project.getEvents().stream().map(EventMapper::toDTO).collect(Collectors.toList()) 
                : null
        );
    }

    public static Project toEntity(ProjectDTO projectDTO) {
        Project project = new Project();
        project.setId(projectDTO.id());
        project.setName(projectDTO.name());
        return project;
    }
}


package com.richard.calendar.mappers;

import com.richard.calendar.dtos.ProjectDTO;
import com.richard.calendar.models.Project;

public class ProjectMapper {
    public static ProjectDTO toDTO(Project project) {
        return new ProjectDTO(
            project.getId(),
            project.getName()
        );
    }

    public static Project toEntity(ProjectDTO projectDTO) {
        Project project = new Project();
        project.setId(projectDTO.id());
        project.setName(projectDTO.name());
        return project;
    }
}


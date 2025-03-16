package com.richard.calendar.services;

import com.richard.calendar.dtos.ProjectDTO;
import com.richard.calendar.mappers.ProjectMapper;
import com.richard.calendar.models.Project;
import com.richard.calendar.repositories.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    // Obtener todos los proyectos como DTOs
    public List<ProjectDTO> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return projects.stream()
                       .map(ProjectMapper::toDTO) // Convertir cada entidad a DTO
                       .collect(Collectors.toList());
    }

    // Obtener un proyecto por ID como DTO
    public ProjectDTO getProjectById(Long id) {
        Project project = projectRepository.findById(id).orElse(null);
        return project != null ? ProjectMapper.toDTO(project) : null; // Convertir la entidad a DTO
    }

    // Crear un proyecto a partir de un DTO
    public ProjectDTO createProject(ProjectDTO projectDTO) {
        // Convertir el DTO a entidad
        Project project = ProjectMapper.toEntity(projectDTO);
        Project savedProject = projectRepository.save(project);
        return ProjectMapper.toDTO(savedProject); // Convertir la entidad guardada a DTO
    }

     // Actualizar un proyecto
public ProjectDTO updateProject(Long id, ProjectDTO projectDTO) {
    return projectRepository.findById(id).map(project -> {
        project.setName(projectDTO.name());
        Project updatedProject = projectRepository.save(project);
        return ProjectMapper.toDTO(updatedProject);
    }).orElse(null); // Retorna null si el proyecto no existe
}

// Eliminar un proyecto
public void deleteProject(Long id) {
    projectRepository.deleteById(id);
}

}

import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableContainerComponent } from '../../../shared/tableComponent/table-container/table-container.component';
import { ProjectModalComponent } from '../projects-modal/project-modal.component';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-projects-p-content',
  imports: [CommonModule, TableContainerComponent, ProjectModalComponent],
  templateUrl: './projects-p-content.component.html',
  styleUrl: './projects-p-content.component.css'
})
export class ProjectsPContentComponent implements OnInit{

  projects: Project[] = [];
  selectedProject: Project | null = null; // Para almacenar el proyecto seleccionado
  isModalOpen = false; // Controla si el modal está abierto o cerrado

  headers = [
    { label: 'ID', key: 'id' },
    { label: 'Proyecto', key: 'name' }, 
    { label: 'Descripción', key: 'description' },
    { label: 'Acciones', key: 'actions' }
  ];


  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (error) => {
        console.error('Error al cargar proyectos:', error);
      }
    });
  }

  openModal(project?: Project): void {
    console.log('openModal', this.isModalOpen);
    if (project) {
      this.selectedProject = { ...project };
    } else {
      this.selectedProject = null; 
    }
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
  
  createOrUpdateProject(projectData: any): void {
    if (this.selectedProject && this.selectedProject.id) {
      // Actualizar
      this.projectService.updateProject(this.selectedProject.id, projectData).subscribe({
        next: (updatedProject) => {
          // Actualizamos en la lista local
          const index = this.projects.findIndex(p => p.id === updatedProject.id);
          if (index !== -1) this.projects[index] = updatedProject;
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al actualizar el proyecto:', error);
        }
      });
    } else {
      // Crear
      this.projectService.createProject(projectData).subscribe({
        next: (newProject) => {
          this.projects.push(newProject);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al crear el proyecto:', error);
        }
      });
    }
  }
  

}

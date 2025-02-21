import { Component, OnInit } from '@angular/core';
import { TableContainerComponent } from '../../../shared/tableComponent/table-container/table-container.component';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-projects-p-content',
  imports: [TableContainerComponent],
  templateUrl: './projects-p-content.component.html',
  styleUrl: './projects-p-content.component.css'
})
export class ProjectsPContentComponent implements OnInit{

  projects: Project[] = [];

  headers = [
    { label: 'ID', key: 'id' },
    { label: 'Proyecto', key: 'name' }
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
  

}

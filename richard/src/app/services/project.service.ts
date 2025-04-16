import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/projects';

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }
  
  // Crear un nuevo proyecto
  createProject(projectData: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, projectData);
  }

  // Actualizar un proyecto existente
  updateProject(projectId: number, projectData: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${projectId}`, projectData);
  }

  // Eliminar un proyecto
  deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${projectId}`);
  }
}

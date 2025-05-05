import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { PropertyService } from '../../../services/property.service';
import { Project } from '../../../models/project.model';
import { Property } from '../../../models/property.model';

@Component({
  selector: 'app-calendar-modal',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.scss']
})
export class CalendarModalComponent implements OnInit, OnChanges {
  @Input() defaultDate: Date | null = null;
  @Output() eventSaved = new EventEmitter<any>();

  eventForm: FormGroup;
  projects: Project[] = [];
  availableProperties: Property[] = [];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private propertyService: PropertyService
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      startHour: ['', Validators.required],
      endHour: ['', Validators.required],
      projectId: [null, Validators.required],
      properties: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadProjects();
    this.loadProperties();
    this.setDefaultDate(); // Establecer la fecha inicial al cargar
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultDate']) {
      this.setDefaultDate(); // Actualizar la fecha cuando cambia defaultDate
    }
  }

  private setDefaultDate(): void {
    if (this.defaultDate) {
      this.eventForm.patchValue({
        date: this.formatDate(this.defaultDate)
      });
    }
  }

  // Getter para propiedades dinámicas
  get properties(): FormArray {
    return this.eventForm.get('properties') as FormArray;
  }

  addProperty(): void {
    this.properties.push(
      this.fb.group({
        propertyId: [null, Validators.required],
        value: ['', Validators.required]
      })
    );
  }

  removeProperty(index: number): void {
    this.properties.removeAt(index);
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (projects) => this.projects = projects,
      error: (err) => console.error('Error cargando proyectos:', err)
    });
  }

  loadProperties(): void {
    this.propertyService.getAllProperties().subscribe({
      next: (props) => this.availableProperties = props,
      error: (err) => console.error('Error cargando propiedades:', err)
    });
  }

  submit(): void {
    if (this.eventForm.valid) {
      console.log('Valor del formulario al hacer submit:', this.eventForm.value);
      this.eventSaved.emit(this.eventForm.value); // ✅ Emitimos TODO el valor del formulario
      this.eventForm.reset();
      this.properties.clear();
    }
  }

  // Función para formatear la fecha al formato de input type="date" (YYYY-MM-DD)
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
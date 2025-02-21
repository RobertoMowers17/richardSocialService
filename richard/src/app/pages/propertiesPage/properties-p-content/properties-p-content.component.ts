import { Component, OnInit } from '@angular/core';
import { Property } from '../../../models/property.model';
import { PropertyService } from '../../../services/property.service';
import { CommonModule } from '@angular/common';
import { TableContainerComponent } from '../../../shared/tableComponent/table-container/table-container.component';

@Component({
  selector: 'app-properties-p-content',
  imports: [CommonModule, TableContainerComponent],
  templateUrl: './properties-p-content.component.html',
  styleUrl: './properties-p-content.component.css'
})
export class PropertiesPContentComponent implements OnInit {

  properties: Property[] = [];

  headers = [
    { label: 'ID', key: 'id' },
    { label: 'Propiedad', key: 'name' },
    { label: 'Descripción', key: 'description' }
  ];

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
      this.loadProperties();
  }

  loadProperties(): void {
    this.propertyService.getAllProperties().subscribe({
      next: (data) => {
        this.properties = data;
      },
      error: (error) => {
        console.error('Error al cargar propiedades', error);
      }
    })
  }

}
